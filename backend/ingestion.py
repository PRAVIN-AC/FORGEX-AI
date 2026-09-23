import fitz  # PyMuPDF
import pytesseract
from PIL import Image
import io

# Configure Tesseract path for Windows (installed via winget)
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

# Global in-memory storage for our document chunks
DOCUMENT_KNOWLEDGE_BASE = []

def process_pdf(filepath: str, filename: str):
    """Reads a PDF and extracts text, falling back to OCR for scanned images."""
    global DOCUMENT_KNOWLEDGE_BASE
    
    DOCUMENT_KNOWLEDGE_BASE = [c for c in DOCUMENT_KNOWLEDGE_BASE if c['document'] != filename]
    
    unique_files = list(set([c['document'] for c in DOCUMENT_KNOWLEDGE_BASE]))
    if len(unique_files) >= 5:
        file_to_remove = unique_files[0]
        DOCUMENT_KNOWLEDGE_BASE = [c for c in DOCUMENT_KNOWLEDGE_BASE if c['document'] != file_to_remove]
    
    doc = fitz.open(filepath)
    chunks = []
    
    for i, page in enumerate(doc):
        # Generate an image of the page for true Multimodal AI (Gemini)
        pix = page.get_pixmap(dpi=150)
        page_img = Image.open(io.BytesIO(pix.tobytes("png")))
        
        # 1. Try native text extraction
        text = page.get_text()
        
        # 2. If no native text (scanned PDF or images), run Optical Character Recognition (OCR)
        if not text or len(text.strip()) < 50:
            try:
                text = pytesseract.image_to_string(page_img)
            except Exception as e:
                print(f"Tesseract OCR Failed: {e}. Falling back to Gemini Multimodal.")
                text = "[Image-based PDF Page - Sent to Gemini Vision for Analysis]"
                
        if text:
            # Preserve structure by keeping \n, and group into slightly larger chunks (10 lines)
            lines = [line.strip() for line in text.split('\n') if line.strip()]
            chunk_size = 10
            # If the page is just an image, chunk it as one single block
            if "Gemini Vision" in text:
                lines = [text]
                chunk_size = 1
                
            for j in range(0, len(lines), chunk_size):
                chunk_lines = lines[j:j+chunk_size]
                clean_para = "\n".join(chunk_lines)
                if len(clean_para) > 10:
                    chunks.append({
                        "id": f"{filename}_p{i+1}_{j}",
                        "document": filename,
                        "page": i + 1,
                        "content": clean_para,
                        "image": page_img  # Store the image for Multimodal reasoning!
                    })
                    
    if not chunks:
        raise ValueError("Could not extract any text or run OCR. Ensure Tesseract is installed.")
                
    DOCUMENT_KNOWLEDGE_BASE.extend(chunks)
    return len(chunks)

def get_knowledge_base():
    return DOCUMENT_KNOWLEDGE_BASE
