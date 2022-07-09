import sys, json
from sentence_transformers import SentenceTransformer, util

searchQuery = sys.argv[0]
searchData = json.loads(sys.argv[1])

model = SentenceTransformer('msmarco-distilbert-base-v4')

query_embedding = model.encode(searchQuery)
corpus = searchData

corpus_embeddings = model.encode(corpus, convert_to_tensor=True)
hits = util.semantic_search(query_embedding, corpus_embeddings, top_k=5)
hits = hits[0]      #Get the hits for the first query
for hit in hits:
  print(corpus[hit['corpus_id']], "(Score: {:.4f})".format(hit['score']))
