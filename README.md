# FORGEX-AI 🚀

FORGEX-AI is a full-stack, enterprise-grade AI Document Intelligence workspace. It allows users to upload massive PDF documents, extract high-fidelity text and images, and query them instantly using cutting-edge Vision-Language Models (VLMs) via Retrieval-Augmented Generation (RAG).

## 🌟 Key Features

- **Advanced Document Processing:** Extracts text and images from PDFs instantly using PyMuPDF.
- **Custom RAG Engine:** Built-in TF-IDF vector retrieval system for ultra-fast, local semantic search without relying on expensive external vector databases.
- **Multimodal AI Reasoning:** Seamlessly integrates with OpenRouter to route complex queries and images to powerful AI models (e.g., Nvidia Nemotron, Google Gemini, and Ling 3.0).
- **Secure Authentication:** Complete SQLite-backed user authentication system featuring login, signup, and magic-link workflows.
- **Stunning UI/UX:** Built with Next.js 15, Tailwind CSS, and Framer Motion for a sleek, responsive, and animated user interface inspired by premium SaaS platforms.
- **Full Settings Dashboard:** Includes billing tiers, API key management, dark/light mode toggles, and secure knowledge base clearing.

## 🛠️ Tech Stack

**Frontend:**
- [Next.js 15](https://nextjs.org/) (App Router)
- React 19
- Tailwind CSS
- Framer Motion
- React Markdown (for rich AI responses)

**Backend:**
- Python 3
- Flask & Flask-CORS
- PyMuPDF (Document processing)
- SQLite (Database management)
- Python-dotenv (Secrets management)

## 🚀 Getting Started

### Prerequisites
Make sure you have **Node.js** and **Python 3.10+** installed on your machine.

### 1. Clone the repository
```bash
git clone https://github.com/PRAVIN-AC/FORGEX-AI.git
cd FORGEX-AI
