# 📜 Salt Lake City Directory OCR App

A web application that performs OCR on historical 1890 Salt Lake City Directory pages (PDFs or images) using Google Gemini AI and exports structured data to Excel.

---

## 🗂️ Project Structure

```
directory-ocr/
├── backend/
│   ├── main.py           # FastAPI backend with Gemini OCR + Excel export
│   ├── requirements.txt
│   └── .env              # ← ADD YOUR GEMINI API KEY HERE
├── frontend/
│   ├── src/
│   │   ├── App.js        # Main React app (vintage newspaper aesthetic)
│   │   └── index.js
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   └── .env              # Frontend API URL config
└── README.md
```

---

## ⚙️ Setup

### 1. Get a Gemini API Key

Go to https://aistudio.google.com/app/apikey and create a free API key.

### 2. Configure the Backend

Edit `backend/.env`:
```
GEMINI_API_KEY=your_actual_key_here
PORT=8000
```

### 3. Install Backend Dependencies

```bash
cd backend
pip install -r requirements.txt

# If you get errors, try:
pip install -r requirements.txt --break-system-packages

# For pdf2image, you also need poppler:
# macOS:
brew install poppler
# Ubuntu/Debian:
sudo apt-get install poppler-utils
# Windows:
# Download from: https://github.com/oschwartz10612/poppler-windows/releases
```

### 4. Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

## 🚀 Running the App

### Start the Backend

```bash
cd backend
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

Backend will be available at http://localhost:8000
Start a new terminal
### Start the Frontend

```bash
cd frontend
npm start
```

Frontend will open at http://localhost:3000

---

## 📋 How It Works

1. **Upload** a PDF or image file of a directory page
2. Click **Extract Entries** — the backend:
   - Converts PDFs to high-res images (300 DPI)
   - Sends each image to Gemini 2.0 Flash with a specialized OCR prompt
   - Parses the structured JSON response
3. **View** results in a searchable, sortable table in the browser
4. Click **Download Excel** to get a formatted `.xlsx` file

### Output Columns

| Column | Description |
|--------|-------------|
| Last Name | Family name |
| First Name | Given name (with titles like Miss, Mrs) |
| Occupation | Job title (abbreviations expanded) |
| Company / Affiliation | Employer or business name |
| Business Address | Work address if listed |
| Status | boards (bds) / residence (res) / rooms (rms) |
| Address | Home/boarding address |
| Flag | Special notes |

---

## 🔧 API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Health check |
| POST | `/ocr` | Upload file → return JSON records |
| POST | `/export` | Upload file → return Excel directly |
| POST | `/export-from-records` | Send JSON records → return Excel |

---

## 💡 Tips

- Higher resolution scans produce better results
- The app processes **all pages** in a multi-page PDF
- Gemini expands abbreviations automatically (clk→clerk, bds→boards, res→residence, etc.)
- Use the **search bar** to filter the results table before downloading
- Click column headers to **sort** the results

---

## 🛠️ Tech Stack

- **Frontend**: React 18, custom CSS (vintage aesthetic)
- **Backend**: FastAPI (Python)
- **OCR**: Google Gemini 2.0 Flash Vision
- **PDF Processing**: pdf2image + Pillow
- **Excel Export**: openpyxl
