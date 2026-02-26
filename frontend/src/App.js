import { useState, useCallback } from "react";

const COLUMNS = [
  { key: "last_name",        label: "Last Name" },
  { key: "first_name",       label: "First Name" },
  { key: "occupation",       label: "Occupation" },
  { key: "company",          label: "Company / Affiliation" },
  { key: "business_address", label: "Business Address" },
  { key: "status",           label: "Status" },
  { key: "address",          label: "Address" },
  { key: "flag",             label: "Flag" },
];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Cinzel:wght@400;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #f5f0e8;
    font-family: 'EB Garamond', Georgia, serif;
  }

  .app {
    min-height: 100vh;
    background: #f5f0e8;
    background-image:
      radial-gradient(ellipse at 20% 50%, rgba(139,90,43,0.06) 0%, transparent 60%),
      radial-gradient(ellipse at 80% 20%, rgba(101,67,33,0.05) 0%, transparent 50%);
    color: #2c1810;
    position: relative;
  }

  .app::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
    opacity: 0.6;
  }

  /* ── MASTHEAD ── */
  .masthead {
    border-bottom: 3px double #8b5a2b;
    padding: 0 0 0;
    position: relative;
    z-index: 1;
    background: #f0e8d8;
  }

  .masthead-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 48px;
    border-bottom: 1px solid #c8a87a;
    font-family: 'EB Garamond', serif;
    font-size: 11.5px;
    color: #7a5535;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .masthead-date { font-style: italic; letter-spacing: 0.05em; text-transform: none; }

  .masthead-center {
    text-align: center;
    padding: 28px 48px 22px;
  }

  .masthead-eyebrow {
    font-family: 'Cinzel', serif;
    font-size: 10px;
    letter-spacing: 0.35em;
    color: #8b5a2b;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .masthead-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(36px, 5vw, 62px);
    font-weight: 700;
    color: #1a0e06;
    letter-spacing: 0.04em;
    line-height: 1;
    margin-bottom: 6px;
  }

  .masthead-rule {
    display: flex;
    align-items: center;
    gap: 12px;
    justify-content: center;
    margin: 10px 0;
  }

  .masthead-rule-line {
    height: 1px;
    width: 120px;
    background: linear-gradient(to right, transparent, #8b5a2b, transparent);
  }

  .masthead-rule-diamond {
    width: 6px; height: 6px;
    background: #8b5a2b;
    transform: rotate(45deg);
    flex-shrink: 0;
  }

  .masthead-sub {
    font-family: 'EB Garamond', serif;
    font-size: 15px;
    color: #7a5535;
    font-style: italic;
    letter-spacing: 0.05em;
  }

  .masthead-bottom {
    display: flex;
    justify-content: center;
    gap: 32px;
    padding: 8px 48px 12px;
    font-family: 'Cinzel', serif;
    font-size: 9.5px;
    letter-spacing: 0.25em;
    color: #8b5a2b;
    text-transform: uppercase;
    border-top: 1px solid #d4b896;
  }

  /* ── MAIN CONTENT ── */
  .main {
    max-width: 1160px;
    margin: 0 auto;
    padding: 40px 32px 60px;
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  /* ── UPLOAD SECTION ── */
  .upload-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    border: 1px solid #c8a87a;
    background: #faf6ee;
    box-shadow: 0 2px 20px rgba(101,67,33,0.1), inset 0 1px 0 rgba(255,255,255,0.8);
  }

  @media (max-width: 700px) {
    .upload-grid { grid-template-columns: 1fr; }
  }

  .upload-left {
    padding: 36px 36px;
    border-right: 1px solid #c8a87a;
  }

  .upload-right {
    padding: 36px 36px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 16px;
    background: #f5efe3;
  }

  .section-label {
    font-family: 'Cinzel', serif;
    font-size: 9px;
    letter-spacing: 0.35em;
    color: #8b5a2b;
    text-transform: uppercase;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .section-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(to right, #c8a87a, transparent);
  }

  .dropzone {
    border: 1.5px dashed #b89060;
    background: rgba(245,240,232,0.5);
    min-height: 220px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.25s ease;
    position: relative;
    overflow: hidden;
  }

  .dropzone:hover {
    border-color: #8b5a2b;
    background: rgba(139,90,43,0.04);
  }

  .dropzone-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 24px;
    text-align: center;
  }

  .dropzone-icon {
    width: 52px;
    height: 52px;
    border: 1.5px solid #c8a87a;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 4px;
  }

  .dropzone-icon svg { color: #8b5a2b; }

  .dropzone-title {
    font-family: 'Playfair Display', serif;
    font-size: 17px;
    color: #2c1810;
    font-weight: 600;
  }

  .dropzone-sub {
    font-size: 13px;
    color: #7a5535;
    font-style: italic;
    line-height: 1.5;
  }

  .dropzone-formats {
    font-family: 'Cinzel', serif;
    font-size: 8.5px;
    letter-spacing: 0.3em;
    color: #a07850;
    text-transform: uppercase;
    margin-top: 4px;
  }

  .preview-img {
    max-height: 280px;
    max-width: 100%;
    object-fit: contain;
  }

  .pdf-preview {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 24px;
  }

  .pdf-icon {
    font-size: 48px;
    line-height: 1;
  }

  .pdf-name {
    font-family: 'EB Garamond', serif;
    font-size: 14px;
    color: #5a3a1a;
    font-style: italic;
    text-align: center;
    max-width: 200px;
    word-break: break-all;
  }

  .file-meta {
    margin-top: 10px;
    font-size: 12px;
    color: #9a7050;
    font-style: italic;
    text-align: center;
  }

  /* ── INSTRUCTIONS PANEL ── */
  .instructions {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .instruction-item {
    display: flex;
    gap: 14px;
    align-items: flex-start;
  }

  .instruction-num {
    font-family: 'Cinzel', serif;
    font-size: 10px;
    width: 22px;
    height: 22px;
    border: 1px solid #c8a87a;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #8b5a2b;
    flex-shrink: 0;
    margin-top: 1px;
  }

  .instruction-text {
    font-size: 14px;
    color: #4a2e12;
    line-height: 1.5;
  }

  .instruction-text strong {
    font-family: 'Playfair Display', serif;
    font-weight: 600;
    color: #2c1810;
  }

  .page-range-label {
    font-family: 'Cinzel', serif;
    font-size: 9px;
    letter-spacing: 0.25em;
    color: #8b5a2b;
    text-transform: uppercase;
    display: block;
    margin-bottom: 6px;
  }

  .page-range-input {
    width: 100%;
    background: #faf6ee;
    border: 1px solid #c8a87a;
    padding: 9px 14px;
    font-family: 'EB Garamond', serif;
    font-size: 14px;
    color: #2c1810;
    outline: none;
    transition: border-color 0.2s;
  }

  .page-range-input:focus { border-color: #8b5a2b; }
  .page-range-input::placeholder { color: #b89060; font-style: italic; }

  /* ── EXTRACT BUTTON ── */
  .extract-btn {
    width: 100%;
    background: #2c1810;
    border: none;
    color: #e8d4a8;
    padding: 18px 32px;
    font-family: 'Cinzel', serif;
    font-size: 13px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.25s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 16px rgba(44,24,16,0.25);
  }

  .extract-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(200,160,80,0.15) 0%, transparent 60%);
    pointer-events: none;
  }

  .extract-btn:hover:not(:disabled) {
    background: #3d2218;
    box-shadow: 0 6px 24px rgba(44,24,16,0.35);
    transform: translateY(-1px);
  }

  .extract-btn:disabled {
    opacity: 0.45;
    cursor: not-allowed;
    transform: none;
  }

  .btn-ornament { color: #c8a87a; font-size: 16px; }

  @keyframes spin { to { transform: rotate(360deg); } }
  .spinner {
    display: inline-block;
    width: 16px; height: 16px;
    border: 2px solid rgba(200,168,122,0.3);
    border-top-color: #c8a87a;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  /* ── STATUS BAR ── */
  .status-bar {
    background: #f0e8d8;
    border: 1px solid #c8a87a;
    padding: 12px 20px;
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 13.5px;
    color: #5a3a1a;
    font-style: italic;
  }

  .status-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: #8b5a2b;
    flex-shrink: 0;
    animation: pulse 1.5s ease-in-out infinite;
  }

  @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }

  .error-bar {
    background: #fdf0ee;
    border: 1px solid #c8785a;
    border-left: 4px solid #a03820;
    padding: 14px 20px;
    color: #7a2810;
    font-size: 14px;
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }

  .error-icon { font-size: 16px; flex-shrink: 0; margin-top: 1px; }

  /* ── RESULTS ── */
  .results-section {
    border: 1px solid #c8a87a;
    background: #faf6ee;
    box-shadow: 0 2px 20px rgba(101,67,33,0.1);
  }

  .results-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 28px;
    border-bottom: 1px solid #d4b896;
    flex-wrap: wrap;
    gap: 12px;
    background: #f0e8d8;
  }

  .results-title-block {}

  .results-title {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    color: #1a0e06;
    font-weight: 600;
  }

  .results-meta {
    font-size: 13px;
    color: #8b6040;
    font-style: italic;
    margin-top: 2px;
  }

  .results-actions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .action-btn {
    border: 1px solid #c8a87a;
    background: #faf6ee;
    color: #2c1810;
    padding: 9px 18px;
    font-family: 'EB Garamond', serif;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 7px;
  }

  .action-btn:hover { background: #f0e4cc; border-color: #8b5a2b; }

  .action-btn-primary {
    background: #2c1810;
    color: #e8d4a8;
    border-color: #2c1810;
    font-family: 'Cinzel', serif;
    font-size: 11px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    padding: 9px 20px;
  }

  .action-btn-primary:hover { background: #3d2218; border-color: #3d2218; color: #e8d4a8; }

  /* ── TABLE ── */
  .table-wrap {
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13.5px;
    min-width: 880px;
  }

  thead tr {
    background: #ede3d4;
    border-bottom: 2px solid #c8a87a;
  }

  th {
    padding: 11px 14px;
    text-align: left;
    font-family: 'Cinzel', serif;
    font-size: 8.5px;
    letter-spacing: 0.25em;
    color: #5a3a1a;
    text-transform: uppercase;
    font-weight: 600;
    white-space: nowrap;
    border-right: 1px solid #d4b896;
  }

  th:last-child { border-right: none; text-align: center; }
  th.th-num { text-align: center; color: #a07850; width: 40px; }

  tbody tr {
    border-bottom: 1px solid #e4d8c4;
    transition: background 0.15s;
  }

  tbody tr:hover { background: rgba(200,168,122,0.1); }
  tbody tr:nth-child(even) { background: rgba(139,90,43,0.03); }
  tbody tr:nth-child(even):hover { background: rgba(200,168,122,0.1); }

  td {
    padding: 9px 14px;
    color: #2c1810;
    vertical-align: top;
    max-width: 200px;
    border-right: 1px solid #ede3d4;
    font-size: 13.5px;
    line-height: 1.4;
  }

  td:last-child { border-right: none; text-align: center; }
  td.td-num { color: #a07850; font-size: 11px; text-align: center; font-family: 'Cinzel', serif; }

  .null-val { color: #c8b090; font-style: italic; }

  .cell-input {
    background: #fdf8f0;
    border: 1px solid #8b5a2b;
    padding: 3px 8px;
    font-family: 'EB Garamond', serif;
    font-size: 13.5px;
    color: #2c1810;
    width: 100%;
    outline: none;
    box-shadow: 0 0 0 2px rgba(139,90,43,0.15);
  }

  .del-btn {
    background: none;
    border: none;
    color: #c8a87a;
    cursor: pointer;
    font-size: 13px;
    padding: 2px 6px;
    transition: color 0.2s;
    line-height: 1;
  }

  .del-btn:hover { color: #a03820; }

  /* ── FOOTER ── */
  .footer {
    text-align: center;
    padding: 24px;
    border-top: 3px double #c8a87a;
    font-family: 'EB Garamond', serif;
    font-size: 12.5px;
    color: #9a7050;
    letter-spacing: 0.12em;
    font-style: italic;
    position: relative;
    z-index: 1;
    background: #f0e8d8;
  }

  /* ── PAGE RANGE ── */
  .page-range-wrap {
    margin-top: 4px;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .fade-in { animation: fadeIn 0.4s ease forwards; }
`;

export default function App() {
  const [file, setFile]               = useState(null);
  const [preview, setPreview]         = useState(null);
  const [pageRange, setPageRange]     = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [records, setRecords]         = useState(null);
  const [error, setError]             = useState(null);
  const [progress, setProgress]       = useState("");
  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue]     = useState("");

  const handleFile = useCallback((f) => {
    if (!f) return;
    const allowed = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
    if (!allowed.includes(f.type)) { setError("Please upload a JPEG, PNG, WEBP, or PDF file."); return; }
    setFile(f); setRecords(null); setError(null);
    if (f.type !== "application/pdf") {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(f);
    } else { setPreview(null); }
  }, []);

  const onDrop = useCallback((e) => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }, [handleFile]);

  const processFile = async () => {
    if (!file) { setError("Please upload a file first."); return; }
    setIsProcessing(true); setError(null);
    setProgress("Sending to server…");
    try {
      const formData = new FormData();
      formData.append("file", file);
      if (pageRange.trim()) formData.append("page_range", pageRange.trim());
      setProgress("Running Gemini OCR — this may take 15–30 seconds…");
      const res  = await fetch("/ocr", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Server error");
      setRecords(data.records);
      setProgress("");
    } catch (err) {
      setError(err.message.includes("fetch")
        ? "Cannot connect to backend. Make sure the server is running on port 8000."
        : err.message);
      setProgress("");
    } finally { setIsProcessing(false); }
  };

  const downloadExcel = async () => {
    if (!records) return;
    setIsExporting(true);
    try {
      const res = await fetch("/export-from-records", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(records),
      });
      if (!res.ok) throw new Error("Export failed");
      const blob = await res.blob();
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement("a");
      a.href = url; a.download = "salt_lake_directory_1890.xlsx"; a.click();
      URL.revokeObjectURL(url);
    } catch (err) { setError(err.message); }
    finally { setIsExporting(false); }
  };

  const downloadCSV = () => {
    if (!records) return;
    const header = COLUMNS.map(c => c.label).join(",");
    const rows   = records.map(r =>
      COLUMNS.map(c => JSON.stringify(r[c.key] ?? "")).join(",")
    );
    const blob = new Blob([header + "\n" + rows.join("\n")], { type: "text/csv" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url; a.download = "directory_records.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  const startEdit  = (ri, key, val) => { setEditingCell({ ri, key }); setEditValue(val ?? ""); };
  const commitEdit = () => {
    if (!editingCell) return;
    setRecords(prev => {
      const u = [...prev];
      u[editingCell.ri] = { ...u[editingCell.ri], [editingCell.key]: editValue || null };
      return u;
    });
    setEditingCell(null);
  };
  const deleteRow = (i)  => setRecords(prev => prev.filter((_, idx) => idx !== i));
  const addRow    = ()   => setRecords(prev => [
    ...prev,
    Object.fromEntries(COLUMNS.map(c => [c.key, null])),
  ]);
  const reset     = ()   => { setFile(null); setPreview(null); setRecords(null); setError(null); setProgress(""); setPageRange(""); };

  const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <>
      <style>{css}</style>
      <div className="app">

        {/* ── MASTHEAD ── */}
        <header className="masthead">
          <div className="masthead-top">
            <span>R. L. Polk &amp; Co. · Established 1870</span>
            <span className="masthead-date">Digitization Session · {today}</span>
            <span>Powered by Gemini AI</span>
          </div>
          <div className="masthead-center">
            <p className="masthead-eyebrow">Historical Record Digitizer</p>
            <h1 className="masthead-title">Directory OCR</h1>
            <div className="masthead-rule">
              <div className="masthead-rule-line" />
              <div className="masthead-rule-diamond" />
              <div className="masthead-rule-line" />
            </div>
            <p className="masthead-sub">Salt Lake City Directory · 1890 · Automated Transcription</p>
          </div>
          <div className="masthead-bottom">
            <span>Upload</span>
            <span>·</span>
            <span>Extract</span>
            <span>·</span>
            <span>Review</span>
            <span>·</span>
            <span>Export</span>
          </div>
        </header>

        {/* ── MAIN ── */}
        <main className="main">

          {/* ── UPLOAD + INSTRUCTIONS ── */}
          <div className="upload-grid">
            <div className="upload-left">
              <div className="section-label">Document Upload</div>
              <div
                className="dropzone"
                onDrop={onDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => document.getElementById("fi").click()}
              >
                {preview ? (
                  <img src={preview} alt="preview" className="preview-img" />
                ) : file ? (
                  <div className="pdf-preview">
                    <div className="pdf-icon">📑</div>
                    <p className="pdf-name">{file.name}</p>
                  </div>
                ) : (
                  <div className="dropzone-inner">
                    <div className="dropzone-icon">
                      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M12 12V4m0 0L8 8m4-4l4 4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="dropzone-title">Upload Directory Page</p>
                    <p className="dropzone-sub">Drag &amp; drop a PDF or image file<br/>or click to browse</p>
                    <p className="dropzone-formats">JPEG · PNG · WEBP · PDF</p>
                  </div>
                )}
              </div>
              <input id="fi" type="file" accept="image/jpeg,image/png,image/webp,application/pdf"
                style={{ display: "none" }} onChange={(e) => handleFile(e.target.files[0])} />
              {file && <p className="file-meta">{file.name} ({(file.size / 1024).toFixed(1)} KB)</p>}
            </div>

            <div className="upload-right">
              <div className="section-label">Instructions</div>
              <div className="instructions">
                <div className="instruction-item">
                  <div className="instruction-num">I</div>
                  <p className="instruction-text">Upload a <strong>scanned page</strong> from the 1890 Salt Lake City Directory — JPEG, PNG, or PDF accepted.</p>
                </div>
                <div className="instruction-item">
                  <div className="instruction-num">II</div>
                  <p className="instruction-text">For PDFs, specify a <strong>page range</strong> (e.g. <em>1–3</em>) or leave blank to process all pages.</p>
                </div>
                <div className="instruction-item">
                  <div className="instruction-num">III</div>
                  <p className="instruction-text">Click <strong>Extract Entries</strong> and wait while Gemini AI reads and transcribes each record.</p>
                </div>
                <div className="instruction-item">
                  <div className="instruction-num">IV</div>
                  <p className="instruction-text"><strong>Review &amp; edit</strong> the table, then export to Excel or CSV for archival use.</p>
                </div>
              </div>

              <div className="page-range-wrap">
                <label className="page-range-label">Page range (PDF only)</label>
                <input
                  className="page-range-input"
                  value={pageRange}
                  onChange={(e) => setPageRange(e.target.value)}
                  placeholder="e.g. 1 or 1–5 (blank = all)"
                />
              </div>

              <button
                className="extract-btn"
                onClick={processFile}
                disabled={isProcessing || !file}
              >
                {isProcessing ? (
                  <><div className="spinner" /> {progress || "Processing…"}</>
                ) : (
                  <><span className="btn-ornament">✦</span> Extract Directory Entries <span className="btn-ornament">✦</span></>
                )}
              </button>
            </div>
          </div>

          {/* ── STATUS / ERROR ── */}
          {isProcessing && progress && (
            <div className="status-bar">
              <div className="status-dot" />
              {progress}
            </div>
          )}

          {error && (
            <div className="error-bar">
              <span className="error-icon">⚠</span>
              <span>{error}</span>
            </div>
          )}

          {/* ── RESULTS TABLE ── */}
          {records && (
            <section className="results-section fade-in">
              <div className="results-header">
                <div className="results-title-block">
                  <h2 className="results-title">Directory Entries</h2>
                  <p className="results-meta">{records.length} {records.length === 1 ? "record" : "records"} extracted · Double-click any cell to edit</p>
                </div>
                <div className="results-actions">
                  <button className="action-btn" onClick={addRow}>+ Add Row</button>
                  <button className="action-btn" onClick={downloadCSV}>↓ CSV</button>
                  <button
                    className="action-btn action-btn-primary"
                    onClick={downloadExcel}
                    disabled={isExporting}
                  >
                    {isExporting ? "Exporting…" : "↓ Download Excel"}
                  </button>
                  <button className="action-btn" onClick={reset} title="Start over">↺ New File</button>
                </div>
              </div>

              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th className="th-num">#</th>
                      {COLUMNS.map(c => <th key={c.key}>{c.label}</th>)}
                      <th>Del</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((row, ri) => (
                      <tr key={ri}>
                        <td className="td-num">{ri + 1}</td>
                        {COLUMNS.map(({ key }) => (
                          <td key={key} onDoubleClick={() => startEdit(ri, key, row[key])}>
                            {editingCell?.ri === ri && editingCell?.key === key ? (
                              <input
                                autoFocus
                                className="cell-input"
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                onBlur={commitEdit}
                                onKeyDown={(e) => e.key === "Enter" && commitEdit()}
                              />
                            ) : (
                              <span className={row[key] ? "" : "null-val"}>{row[key] ?? "—"}</span>
                            )}
                          </td>
                        ))}
                        <td>
                          <button className="del-btn" onClick={() => deleteRow(ri)} title="Delete row">✕</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </main>

        {/* ── FOOTER ── */}
        <footer className="footer">
          R. L. Polk &amp; Co.'s Salt Lake City Directory · 1890 · Historical OCR Digitization Tool
        </footer>

      </div>
    </>
  );
}