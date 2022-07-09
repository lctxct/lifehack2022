import sys, json
from sentence_transformers import SentenceTransformer, util


model = SentenceTransformer('msmarco-distilbert-base-v4')

searchQuery = sys.argv[1]
query_embedding = model.encode(searchQuery)
corpus = json.loads(sys.argv[2])

corpus_embeddings = model.encode(corpus, convert_to_tensor=True)
hits = util.semantic_search(query_embedding, corpus_embeddings, top_k=5)
hits = hits[0]      #Get the hits for the first query
hitIDs = []
highest = 0
highestID = 0
for hit in hits:
    if (hit['score'] > highest):
        highest = hit['score']
        highestID = hit['corpus_id']
    if (hit['score'] > 0.4): 
        hitIDs.append(hit['corpus_id'])

if (len(hitIDs) == 0):
    hitIDs.append(highestID)

print(json.dumps(hitIDs))