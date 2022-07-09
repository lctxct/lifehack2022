'''
    Unsupervised text classification model
    Based on Tim Schopf's implementation at https://towardsdatascience.com/unsupervised-text-classification-with-lbl2vec-6c5e040354de
'''
import pandas as pd
from gensim.utils import simple_preprocess
from gensim.parsing.preprocessing import strip_tags
from gensim.models.doc2vec import TaggedDocument
from sklearn.model_selection import train_test_split
from lbl2vec import Lbl2Vec
from sklearn.metrics import f1_score, accuracy_score
import numpy as np
import json, random

# load labels with keywords
labels = pd.read_csv('dataset_keywords.csv',sep=';')
labels['keywords'] = labels['keywords'].apply(lambda x: x.split(' '))
labels['keywords'] = labels['keywords'].apply(lambda description_keywords: [keyword.lower() for keyword in description_keywords])
labels['number_of_keywords'] = labels['keywords'].apply(lambda row: len(row))
print(labels)

def tokenize(doc):
    return simple_preprocess(strip_tags(doc), deacc=True, min_len=2, max_len=15)

# load data
df = pd.read_csv("dataset.csv", names=['title', 'article'], skip_blank_lines=True, encoding_errors='replace', header=None)
# df.drop(labels='title',axis='columns').
df.drop_duplicates()
train, test = train_test_split(df, test_size=0.025, shuffle=True, random_state=21)
train['data_set_type'] = 'train'
test['data_set_type'] = 'test'
corpus = pd.concat([train,test]).reset_index(drop=True)
corpus['tagged_docs'] = corpus.apply(lambda row: TaggedDocument(tokenize(str(row['title']) + '. ' + str(row['article'])), [str(row.name)]), axis=1)
corpus['doc_key'] = corpus.index.astype(str)
print(corpus.head())

# model training
Lbl2Vec_model = Lbl2Vec(keywords_list=list(labels.keywords), tagged_documents=corpus['tagged_docs'][corpus['data_set_type'] == 'train'], min_count = 2, similarity_threshold=0.90, min_num_docs = 50, epochs=30)
Lbl2Vec_model.fit()
Lbl2Vec_model.save('model')

# predict similarity scores of new test documents
new_docs_lbl_similarities = Lbl2Vec_model.predict_new_docs(tagged_docs=corpus['tagged_docs'][corpus['data_set_type']=='test'])

# merge with articles
info = corpus[['doc_key', 'article']]
predictions = pd.merge(info, new_docs_lbl_similarities, left_on="doc_key", right_on="doc_key")
print(predictions)

# map to programs
# my brain dying kenna write proper code alrd
results = pd.DataFrame(data=None, columns=['article', 'first_cat', 'second_cat', 'programs'])
with open("programs.json", 'r') as f:
    programs = json.load(f)

for idx, r in predictions.iterrows():
    first_cat, second_cat = '', ''
    first_cat_score, second_cat_score = -999, -999
    scores = {}

    # get categories with highest scores
    for i in range(5):
        score = float(r['label_%d' % i])
        if score > first_cat_score:
            first_cat_score, first_cat = score, labels.iloc[i]['class_name']
        elif score > second_cat_score:
            second_cat_score, second_cat = score, labels.iloc[i]['class_name']
    
    # map to 2 programs from first category and 1 program from second category
    p1 = random.sample(programs.get(first_cat), 2)
    p2 = random.sample(programs.get(second_cat), 1)
    p = p1 + p2
    results.loc[idx] = [r['article'], first_cat, second_cat, p]

print(results)
results.to_csv("predictions.csv")