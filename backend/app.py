import os
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS

from ingestion import process_pdf, get_knowledge_base
from retrieval import retrieve_context
from reasoning import generate_response

import sqlite3
import random
import string
import datetime

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# --- DATABASE SETUP ---
def init_db():
    conn = sqlite3.connect('auth.db')
    c = conn.cursor()
    # Add name column if we haven't already. Easiest is just recreate table if needed or add column.
    # Since it's a dev hackathon, we can drop and recreate or just alter.
    try:
        c.execute('''ALTER TABLE users ADD COLUMN name TEXT''')
    except:
        # If it fails, column exists or table doesn't exist
        pass
    c.execute('''CREATE TABLE IF NOT EXISTS users (email TEXT PRIMARY KEY, name TEXT, code TEXT, token TEXT, expires_at DATETIME)''')
    conn.commit()
    conn.close()

init_db()

@app.route('/api/auth/send', methods=['POST'])
def auth_send():
    data = request.get_json()
    email = data.get('email')
    name = data.get('name', '') # Optional for login, required for signup
    if not email:
        return jsonify({"error": "Email is required"}), 400
        
    code = ''.join(random.choices(string.digits, k=6))
    
    print(f"\n{'='*50}\n[EMAIL SENT TO {email}]\nYOUR VERIFICATION CODE IS: {code}\n{'='*50}\n")
    
    conn = sqlite3.connect('auth.db')
    c = conn.cursor()
    expires_at = datetime.datetime.now() + datetime.timedelta(minutes=10)
    
    # Check if user exists
    c.execute("SELECT name FROM users WHERE email=?", (email,))
    row = c.fetchone()
    if row:
        # Existing user, just update code
        c.execute("UPDATE users SET code=?, expires_at=? WHERE email=?", (code, expires_at, email))
    else:
        # New user
        c.execute("INSERT INTO users (email, name, code, expires_at) VALUES (?, ?, ?, ?)", (email, name, code, expires_at))
        
    conn.commit()
    conn.close()
    
    return jsonify({"message": "Verification code sent to email (check backend terminal)"}), 200

@app.route('/api/auth/verify', methods=['POST'])
def auth_verify():
    data = request.get_json()
    email = data.get('email')
    code = data.get('code')
    
    conn = sqlite3.connect('auth.db')
    c = conn.cursor()
    c.execute("SELECT name, code, expires_at FROM users WHERE email=?", (email,))
    row = c.fetchone()
    
    if not row:
        conn.close()
        return jsonify({"error": "No verification code requested for this email"}), 400
        
    name, db_code, expires_at = row
    expires_at_dt = datetime.datetime.strptime(expires_at, "%Y-%m-%d %H:%M:%S.%f")
    
    # Universal bypass code for hackathon testing
    if code == "000000":
        pass
    else:
        if datetime.datetime.now() > expires_at_dt:
            conn.close()
            return jsonify({"error": "Verification code expired"}), 400
            
        if db_code != code:
            conn.close()
            return jsonify({"error": "Invalid verification code"}), 400
        
    token = ''.join(random.choices(string.ascii_letters + string.digits, k=32))
    c.execute("UPDATE users SET token=?, code=NULL WHERE email=?", (token, email))
    conn.commit()
    conn.close()
    
    return jsonify({"token": token, "email": email, "name": name}), 200

@app.route('/api/clear', methods=['POST'])
def clear_kb():
    import ingestion
    ingestion.DOCUMENT_KNOWLEDGE_BASE.clear()
    return jsonify({"message": "Knowledge base cleared successfully"}), 200

@app.route('/api/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    if file:
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        # Process the PDF into our Knowledge Base
        try:
            chunks_added = process_pdf(filepath, filename)
            return jsonify({
                "message": f"File {filename} uploaded successfully",
                "chunks": chunks_added
            }), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json()
    query = data.get('query', '')
    
    # 1. Retrieve relevant contexts
    kb = get_knowledge_base()
    top_contexts = retrieve_context(query, kb)
    
    # 2. Generate response (Extractive RAG)
    response_data = generate_response(query, top_contexts)
    
    return jsonify(response_data)

if __name__ == '__main__':
    app.run(port=5000, debug=True)
