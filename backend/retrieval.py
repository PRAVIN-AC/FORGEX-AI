import math
from collections import Counter

def tokenize(text: str):
    import re
    # Lowercase and extract alphanumeric words
    tokens = re.findall(r'\w+', text.lower())
    # Very basic stemming: if a word ends in 's', add the singular version too
    # This prevents the need for dangerous substring matching
    expanded_tokens = []
    for t in tokens:
        expanded_tokens.append(t)
        if len(t) > 3 and t.endswith('s'):
            expanded_tokens.append(t[:-1])
    return expanded_tokens

def retrieve_context(query: str, knowledge_base: list, top_k: int = 3):
    if not knowledge_base:
        return []
        
    query_tokens = set(tokenize(query))
    if not query_tokens:
        return []

    # Calculate Term Frequencies (TF) and Document Frequencies (DF)
    df = Counter()
    doc_tfs = []
    
    for chunk in knowledge_base:
        tokens = tokenize(chunk["content"])
        tf = Counter(tokens)
        doc_tfs.append(tf)
        for token in set(tokens):
            df[token] += 1
            
    N = len(knowledge_base)
    
    # Calculate scores
    scored_chunks = []
    for idx, chunk in enumerate(knowledge_base):
        score = 0.0
        tf = doc_tfs[idx]
        doc_length = sum(tf.values())
        
        for q_token in query_tokens:
            if q_token in tf:
                # Exact match (which now includes basic singular/plural stemming)
                term_frequency = tf[q_token] / doc_length if doc_length > 0 else 0
                inverse_doc_frequency = math.log(N / (df.get(q_token, 1) + 1)) + 1
                score += term_frequency * inverse_doc_frequency
                        
        if score > 0:
            scored_chunks.append({
                "chunk": chunk,
                "score": score
            })
            
    # Sort by descending score
    scored_chunks.sort(key=lambda x: x["score"], reverse=True)
    
    # Fallback: if no exact keyword match, just return the first chunk so we always have context
    if not scored_chunks and knowledge_base:
        return [{"chunk": knowledge_base[0], "score": 0.05}]
        
    return scored_chunks[:top_k]
