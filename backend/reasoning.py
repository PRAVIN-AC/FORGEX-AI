import requests
import base64
import io
import os

OPENROUTER_API_KEY = os.environ.get("OPENROUTER_API_KEY", "")
if os.path.exists(".env"):
    with open(".env", "r") as f:
        for line in f:
            if line.startswith("OPENROUTER_API_KEY="):
                OPENROUTER_API_KEY = line.strip().split("=", 1)[1]

def generate_response(query: str, retrieved_contexts: list) -> dict:
    if not retrieved_contexts:
        return {
            "answer": "I don't have any documents uploaded yet, or I couldn't find an answer to that in the uploaded documents.",
            "source": None,
            "confidence": 0
        }
        
    best_match = retrieved_contexts[0]
    chunk = best_match["chunk"]
    score = best_match["score"]
    
    # Calculate a mock confidence (0-100) based on the score
    if score == 0.05:
        confidence = 65
    else:
        # Scale actual matches much higher (85 to 96 range as requested)
        confidence = min(96, max(85, int(85 + (score * 20))))
    
    source_citation = f"{chunk['document']}, Page {chunk['page']}"
    
    try:
        # Convert PIL Image to Base64 and Compress heavily for the free tier API
        buffered = io.BytesIO()
        img_to_send = chunk["image"].convert("RGB")
        img_to_send.thumbnail((800, 800)) # Resize to prevent payload limits
        img_to_send.save(buffered, format="JPEG", quality=70)
        base64_image = base64.b64encode(buffered.getvalue()).decode('utf-8')
        
        prompt = f"You are an enterprise AI. Answer the user's query using the provided PDF page image and extracted text context. Be concise and accurate. If the answer is not in the context or image, say you don't know.\n\nQuery: {query}\n\nExtracted Text Context:\n{chunk['content']}"
        
        headers = {
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "Content-Type": "application/json"
        }
        
        # Using Ling 3.0 Flash VL as requested
        payload = {
            "model": "inclusionai/ling-3.0-flash-vl",
            "messages": [
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": prompt
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/jpeg;base64,{base64_image}"
                            }
                        }
                    ]
                }
            ]
        }
        
        # Added a 15-second timeout to prevent infinite hanging
        response = requests.post("https://openrouter.ai/api/v1/chat/completions", headers=headers, json=payload, timeout=15)
        
        if response.status_code == 200:
            data = response.json()
            if "choices" in data:
                answer = data["choices"][0]["message"]["content"]
            elif "error" in data:
                answer = f"(OpenRouter API Error: {data['error'].get('message', 'Unknown Error')})\n\nFallback Extracted Context:\n{chunk['content']}"
            else:
                answer = f"(OpenRouter Unknown Response: {data})\n\nFallback Extracted Context:\n{chunk['content']}"
        else:
            answer = f"(OpenRouter API Error {response.status_code}: {response.text})\n\nFallback Extracted Context:\n{chunk['content']}"
            
    except Exception as e:
        answer = f"(System Error: {e})\n\nFallback Extracted Context:\n{chunk['content']}"
    
    return {
        "answer": answer,
        "source": source_citation,
        "confidence": confidence
    }
