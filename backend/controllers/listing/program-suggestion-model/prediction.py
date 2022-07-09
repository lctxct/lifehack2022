from lbl2vec import Lbl2Vec
import pandas as pd
from gensim.utils import simple_preprocess
from gensim.parsing.preprocessing import strip_tags
from gensim.models.doc2vec import TaggedDocument
import json, random, sys

class ProgramSuggestion:
    def __init__(self):
        # load model
        self.model = Lbl2Vec.load("data/model")
        self.load_labels()
        self.load_programs()

    def load_labels(self):
        self.labels = pd.read_csv('data/dataset_keywords.csv',sep=';')
        self.labels['keywords'] = self.labels['keywords'].apply(lambda x: x.split(' '))
        self.labels['keywords'] = self.labels['keywords'].apply(lambda description_keywords: [keyword.lower() for keyword in description_keywords])
        self.labels['number_of_keywords'] = self.labels['keywords'].apply(lambda row: len(row))

    def load_programs(self):
        with open("data/programs.json", 'r') as f:
            self.programs = json.load(f)

    def preprocess_data(self, title, description):
        def tokenize(doc):
            return simple_preprocess(strip_tags(doc), deacc=True, min_len=2, max_len=15)
        df = pd.DataFrame([[title, description]], columns=["title", "article"])
        df['tagged_docs'] = df.apply(lambda row: TaggedDocument(tokenize(str(row['title']) + '. ' + str(row['article'])), [str(row.name)]), axis=1)
        return df

    def get_suggestions(self, title, description):
        df = self.preprocess_data(title, description)
        r = self.model.predict_new_docs(tagged_docs=df['tagged_docs']).iloc[0]
        first_cat, second_cat = '', ''
        first_cat_score, second_cat_score = -999, -999
        for i in range(5):
            score = float(r['label_%d' % i])
            if score > first_cat_score:
                first_cat_score, first_cat = score, self.labels.iloc[i]['class_name']
            elif score > second_cat_score:
                second_cat_score, second_cat = score, self.labels.iloc[i]['class_name']

        p1 = random.sample(self.programs.get(first_cat), 2)
        p2 = random.sample(self.programs.get(second_cat), 1)
        p = p1 + p2
        return p

obj = ProgramSuggestion()
pred = obj.get_suggestions(title=sys.argv[1], description=sys.argv[2])
print(json.dumps(pred))