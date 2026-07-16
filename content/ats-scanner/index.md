---
title: "AI Resume ATS Scanner"
description: "Upload your resume to check your ATS score and get actionable feedback."
type: "page"
---

<!-- Client-Side Parsing Libraries -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.4.21/mammoth.browser.min.js"></script>
<script>
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
</script>

<div class="container my-5">
  
  <!-- Dynamic Error Alert (Replaces window.alert) -->
  <div id="errorAlert" class="alert alert-danger d-none shadow-sm mb-4" role="alert">
    <strong><i class="fas fa-exclamation-triangle me-2"></i>Error:</strong> <span id="errorMessage"></span>
  </div>

  <!-- Upload Section -->
  <div id="uploadSection" class="card p-5 shadow-sm border-0 bg-body-tertiary rounded-4">
    <div class="text-center mb-4">
      <h3 id="ResumeIntelligenceScanner" class="fw-bold text-primary mb-2">Resume Intelligence Scanner</h3>
      <p class="text-body-secondary">Upload your <strong>.pdf</strong> or <strong>.docx</strong> resume. (Limit: 1 scan per 24 hours)</p>
    </div>
    <div class="mb-4 max-w-md mx-auto">
      <input type="file" id="resumeFile" class="form-control form-control-lg border-subtle" accept=".pdf, .docx" />
    </div>
    <button id="analyzeBtn" class="btn btn-primary btn-lg w-100 fw-bold rounded-3" onclick="processFile()">
      <i class="fas fa-magic me-2"></i>Analyze Resume
    </button>
  </div>

  <!-- Cooldown Warning -->
  <div id="cooldownSection" class="alert alert-warning text-center d-none shadow-sm p-4 rounded-4">
    <h4 class="fw-bold"><i class="fas fa-hourglass-half me-2"></i>Cooldown Active</h4>
    <p class="mb-0">You have already scanned a resume today. You can scan another one in <strong id="timeRemaining"></strong>.</p>
  </div>

  <!-- Loading Spinner -->
  <div id="loading" class="text-center my-5 d-none">
    <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status"></div>
    <h5 class="mt-3 text-body-secondary" id="loadingText">Extracting text from file...</h5>
  </div>

  <!-- Results Dashboard -->
  <div id="resultsLayout" class="mt-5 d-none">
    <div class="row g-4">
      <div class="col-md-4 text-center">
        <div class="card p-4 shadow-sm border-0 h-100 bg-body-tertiary rounded-4">
          <h6 class="text-body-secondary text-uppercase tracking-wide fw-bold">Target Role</h6>
          <h3 id="resRole" class="text-body fw-bold my-3">-</h3>
          <hr class="border-secondary opacity-25">
          <h6 class="text-body-secondary text-uppercase tracking-wide mt-3 fw-bold">ATS Score</h6>
          <div class="display-1 fw-bold text-primary" id="resScore">0</div>
          <span class="text-body-secondary mt-2">out of 100</span>
        </div>
      </div>
      <div class="col-md-8">
        <div class="card p-4 shadow-sm border-0 h-100 bg-body-tertiary rounded-4">
          <h4 class="fw-bold mb-4">Detailed Breakdown</h4>
          <div class="mb-4">
            <h6 class="fw-bold text-body"><i class="fas fa-align-left text-primary me-2"></i>Formatting & Structure</h6>
            <p id="feedFormat" class="text-body-secondary mb-0"></p>
          </div>
          <div class="mb-4">
            <h6 class="fw-bold text-body"><i class="fas fa-key text-primary me-2"></i>Keyword Optimization</h6>
            <p id="feedKeywords" class="text-body-secondary mb-0"></p>
          </div>
          <div>
            <h6 class="fw-bold text-body"><i class="fas fa-chart-line text-primary me-2"></i>Impact & Achievements</h6>
            <p id="feedImpact" class="text-body-secondary mb-0"></p>
          </div>
        </div>
      </div>
    </div>
    <div class="row g-4 mt-2">
      <div class="col-md-6">
        <div class="card p-4 shadow-sm border-0 border-top border-success border-4 h-100 bg-body-tertiary rounded-4">
          <h5 class="text-success fw-bold"><i class="fas fa-rocket me-2"></i>Key Strengths</h5>
          <ul id="listStrengths" class="text-body-secondary mb-0 ps-3 mt-3"></ul>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card p-4 shadow-sm border-0 border-top border-danger border-4 h-100 bg-body-tertiary rounded-4">
          <h5 class="text-danger fw-bold"><i class="fas fa-exclamation-circle me-2"></i>Areas for Improvement</h5>
          <ul id="listWeaknesses" class="text-body-secondary mb-0 ps-3 mt-3"></ul>
        </div>
      </div>
    </div>
    <div class="card p-4 mt-4 shadow-sm border-0 border-top border-warning border-4 bg-body-tertiary rounded-4">
      <h5 class="text-warning fw-bold"><i class="fas fa-search me-2"></i>Missing Core Keywords</h5>
      <p class="text-body-secondary small">Adding these industry terms can significantly increase your response rate.</p>
      <div id="badgeKeywords" class="d-flex flex-wrap gap-2 mt-2"></div>
    </div>
    <div class="card p-4 mt-4 shadow-sm bg-primary-subtle border-0 rounded-4">
      <h5 class="fw-bold text-primary mb-3"><i class="fas fa-tools me-2"></i>Actionable Next Steps</h5>
      <ol id="listSteps" class="mb-0 ps-3 text-body-secondary"></ol>
    </div>
  </div>
</div>

<script>
// ==========================================
// CONFIGURATION: Set your Vercel API URL here
// ==========================================
const API_URL = 'https://resume-ats-api.vercel.app/api/analyze';

// UI Error Handler Helper
function showError(msg) {
  const errBox = document.getElementById('errorAlert');
  document.getElementById('errorMessage').innerText = msg;
  errBox.classList.remove('d-none');
}

function hideError() {
  document.getElementById('errorAlert').classList.add('d-none');
}

// 24h Lock Initialization
document.addEventListener("DOMContentLoaded", () => {
  const lastScan = localStorage.getItem('lastScanTime');
  if (lastScan) {
    const timePassed = Date.now() - parseInt(lastScan);
    const cooldownPeriod = 24 * 60 * 60 * 1000;

    if (timePassed < cooldownPeriod) {
      document.getElementById('uploadSection').classList.add('d-none');
      document.getElementById('cooldownSection').classList.remove('d-none');
      const hoursLeft = Math.ceil((cooldownPeriod - timePassed) / (1000 * 60 * 60));
      document.getElementById('timeRemaining').innerText = hoursLeft + ' hours';
    } else {
      localStorage.removeItem('lastScanTime');
    }
  }
});

// Main Logic
async function processFile() {
  hideError();
  const fileInput = document.getElementById('resumeFile');
  if (!fileInput.files.length) return showError('Please select a PDF or DOCX file.');

  const file = fileInput.files[0];
  const fileExtension = file.name.split('.').pop().toLowerCase();

  if (fileExtension !== 'pdf' && fileExtension !== 'docx') {
    return showError('Only .pdf and .docx files are allowed.');
  }

  const btn = document.getElementById('analyzeBtn');
  const loader = document.getElementById('loading');
  const loadText = document.getElementById('loadingText');
  
  btn.disabled = true;
  loader.classList.remove('d-none');

  try {
    let extractedText = '';
    if (fileExtension === 'pdf') {
      loadText.innerText = "Extracting text from PDF...";
      extractedText = await extractTextFromPDF(file);
    } else if (fileExtension === 'docx') {
      loadText.innerText = "Extracting text from DOCX...";
      extractedText = await extractTextFromDOCX(file);
    }

    if (!extractedText.trim()) throw new Error("Could not extract text. Make sure the file contains text, not just images.");

    loadText.innerText = "AI is analyzing your profile matrix...";
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resumeText: extractedText })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Server Error: Check your API Key and Vercel KV settings.');
    }

    localStorage.setItem('lastScanTime', Date.now().toString());

    document.getElementById('resRole').innerText = data.detectedRole;
    document.getElementById('resScore').innerText = data.atsScore;
    document.getElementById('feedFormat').innerText = data.breakdown.formatting.feedback;
    document.getElementById('feedKeywords').innerText = data.breakdown.keywords.feedback;
    document.getElementById('feedImpact').innerText = data.breakdown.impact.feedback;

    mapListToUI('listStrengths', data.strengths);
    mapListToUI('listWeaknesses', data.weaknesses);
    mapListToUI('listSteps', data.actionableSteps);

    const badgeContainer = document.getElementById('badgeKeywords');
    badgeContainer.innerHTML = '';
    data.missingKeywords.forEach(kw => {
      badgeContainer.innerHTML += `<span class="badge bg-secondary text-light me-2 mb-2 p-2 fs-6 rounded-pill">${kw}</span>`;
    });

    document.getElementById('uploadSection').classList.add('d-none');
    document.getElementById('resultsLayout').classList.remove('d-none');

  } catch (err) {
    showError(err.message);
  } finally {
    btn.disabled = false;
    loader.classList.add('d-none');
  }
}

function mapListToUI(elementId, arrayData) {
  const ul = document.getElementById(elementId);
  ul.innerHTML = '';
  if (arrayData && arrayData.length > 0) {
    arrayData.forEach(item => {
      ul.innerHTML += `<li class="mb-2">${item}</li>`;
    });
  } else {
    ul.innerHTML = '<li>No data provided.</li>';
  }
}

async function extractTextFromPDF(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let fullText = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const strings = content.items.map(item => item.str);
    fullText += strings.join(' ') + '\n';
  }
  return fullText;
}

async function extractTextFromDOCX(file) {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer: arrayBuffer });
  return result.value;
}
</script>