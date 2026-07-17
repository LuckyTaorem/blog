---
title: "Free AI Resume Scanner & Cover Letter Generator | Check ATS Score"
description: "Upload your resume to our free AI ATS scanner. Get an instant score, match job descriptions, find missing keywords, and generate tailored cover letters."
type: "page"
images: 
  - "/images/ats-thumbnail.png"
---

<!-- Custom WebApplication Schema for SEO -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "AI Resume ATS Scanner & Cover Letter Generator",
  "description": "An AI-powered Applicant Tracking System (ATS) resume scanner and cover letter generator that provides instant compatibility scores, targeted job description matching, keyword optimization, and downloadable PDF reports.",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web browser",
  "url": "https://ltdeveloperblogs.github.io/ats-scanner/",
  "provider": {
    "@type": "Person",
    "name": "Taorem Lucky Singh",
    "jobTitle": "WordPress and PHP Developer"
  },
  "featureList": [
    "Instant ATS Score Calculation",
    "Target Job Description Matching",
    "Missing Keyword Detection",
    "Spelling and Grammar Checks",
    "Actionable Resume Feedback",
    "AI Cover Letter Generation",
    "Downloadable PDF Reports"
  ],
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "description": "100% Free Resume Scan and Cover Letter Generation"
  }
}
</script>

<!-- Client-Side Parsing Libraries -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.4.21/mammoth.browser.min.js"></script>
<script src="https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit" async defer></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

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
    <!-- Upgraded Job Description Matcher -->
    <div class="mb-4 max-w-md mx-auto w-100 form-floating shadow-sm rounded-4">
      <textarea id="jobDescription" class="form-control border-0 bg-body-secondary w-100" placeholder="Paste the job description here..." style="height: 120px; border-radius: 1rem; resize: none;"></textarea>
      <label for="jobDescription" class="text-body-secondary fw-bold small">
        <i class="fas fa-briefcase me-2 text-primary"></i>Target Job Description (Optional)
      </label>
    </div>
    <div id="recaptcha-wrapper" class="mb-4 d-flex justify-content-center">
      <div id="recaptcha-container"></div>
    </div>
    <button id="analyzeBtn" class="btn btn-primary btn-lg w-100 fw-bold rounded-3" onclick="processFile()" disabled>
      <i class="fas fa-magic me-2"></i>Analyze Resume
    </button>
  </div>

  <!-- Cooldown Warning -->
  <div id="cooldownSection" class="alert alert-warning text-center d-none shadow-sm p-4 rounded-4">
    <h4 class="fw-bold"><i class="fas fa-hourglass-half me-2"></i>Cooldown Active</h4>
    <p class="mb-0">You have already scanned a resume today. You can scan another one in <strong id="timeRemaining"></strong>.</p>
  </div>

  <div id="coverLetterSection" class="card p-5 mt-5 shadow-sm border-0 bg-body-tertiary rounded-4 d-none">
    <div class="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3 border-bottom pb-3">
      <div>
        <h4 class="fw-bold mb-1"><i class="fas fa-robot text-primary me-2"></i>AI Cover Letter Generator</h4>
        <p class="text-body-secondary mb-0">Tries remaining today: <strong id="clTries" class="text-primary">3</strong>/3</p>
      </div>
      <a href="/cover-letter-generator/" class="btn btn-outline-secondary btn-sm fw-bold rounded-pill px-3">
        <i class="fas fa-file-upload me-2"></i>Use a Different Resume
      </a>
    </div>
    <div class="row g-3 mb-4">
      <div class="col-md-6">
        <label class="form-label fw-bold small">Company Name</label>
        <input type="text" id="clCompany" class="form-control" placeholder="e.g. Google">
      </div>
      <div class="col-md-6">
        <label class="form-label fw-bold small">Job Title</label>
        <input type="text" id="clTitle" class="form-control" placeholder="e.g. Senior PHP Developer">
      </div>
      <div class="col-12">
        <label class="form-label fw-bold small">Job Description</label>
        <textarea id="clDescription" class="form-control" rows="4" placeholder="Paste the job description here..."></textarea>
      </div>
    </div>
    <!-- NEW: Inline Error Box -->
    <div id="clErrorBox" class="alert alert-danger d-none py-2 mt-3 small fw-bold"></div>
    <button id="generateClBtn" class="btn btn-success fw-bold w-100 mb-4" onclick="generateCoverLetter()">
      <i class="fas fa-magic me-2"></i>Generate Cover Letter
    </button>
    <div id="clOutputSection" class="d-none">
      <label class="form-label fw-bold small">Generated Cover Letter</label>
      <textarea id="clOutput" class="form-control mb-2" rows="12" readonly></textarea>
      <!-- UPGRADED: Copy Button -->
      <button id="copyClBtn" class="btn btn-outline-secondary btn-sm fw-bold" onclick="copyCoverLetter()">
        <i class="fas fa-copy me-2"></i>Copy to Clipboard
      </button>
    </div>
  </div>

  <!-- Loading Spinner -->
  <div id="loading" class="text-center my-5 d-none">
    <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status"></div>
    <h5 class="mt-3 text-body-secondary" id="loadingText">Extracting text from file...</h5>
  </div>

  <!-- Results Dashboard -->
  <div id="resultsLayout" class="mt-5 d-none">
    <!-- Action Bar (PDF & Cover Letter) -->
    <div id="pdfActionButtons" class="d-flex flex-wrap gap-3 justify-content-end mb-4" data-html2canvas-ignore="true">
      <button id="downloadPdfBtn" class="btn btn-outline-primary fw-bold rounded-pill px-4" onclick="downloadPDF()">
        <i class="fas fa-download me-2"></i>Download PDF Report
      </button>
      <button class="btn btn-primary fw-bold rounded-pill px-4" onclick="openCoverLetterPanel()">
        <i class="fas fa-pen-nib me-2"></i>Generate Cover Letter
      </button>
    </div>
    <div class="card p-4 shadow-sm border-0 bg-body-tertiary rounded-4 mb-4">
      <h5 class="fw-bold mb-3"><i class="fas fa-chart-pie text-primary me-2"></i>Score Analytics</h5>
      <div style="position: relative; height:300px; width:100%">
        <canvas id="atsChart"></canvas>
      </div>
    </div>
    <div class="card p-4 shadow-sm border-0 bg-body-tertiary rounded-4 mb-4">
      <h4 class="fw-bold mb-4"><i class="fas fa-file-contract text-primary me-2"></i>Extracted Resume Data</h4>
      <div class="row g-4 mb-4">
        <div class="col-md-4">
          <h6 class="fw-bold text-body border-bottom pb-2">Contact & Links</h6>
          <p class="mb-1 text-body-secondary"><i class="fas fa-envelope me-2"></i><span id="extEmail"></span></p>
          <p class="mb-3 text-body-secondary"><i class="fas fa-phone me-2"></i><span id="extPhone"></span></p>
          <div id="extSocials" class="d-flex flex-wrap gap-2"></div>
        </div>
        <div class="col-md-4">
          <h6 class="fw-bold text-body border-bottom pb-2">Education & Schooling</h6>
          <ul id="extEducation" class="text-body-secondary ps-3 small mb-0"></ul>
        </div>
        <div class="col-md-4">
          <h6 class="fw-bold text-body border-bottom pb-2">Certifications</h6>
          <ul id="extCertifications" class="text-body-secondary ps-3 small mb-0"></ul>
        </div>
      </div>
      <div class="row g-4">
        <div class="col-md-6">
          <h6 class="fw-bold text-body border-bottom pb-2">Work Experience</h6>
          <ul id="extWork" class="text-body-secondary ps-3 small mb-0"></ul>
        </div>
        <div class="col-md-6">
          <h6 class="fw-bold text-body border-bottom pb-2">Projects Detected</h6>
          <ul id="extProjects" class="text-body-secondary ps-3 small mb-0"></ul>
        </div>
      </div>
    </div>
    <div class="card p-4 shadow-sm border-0 border-top border-info border-4 bg-body-tertiary rounded-4 mb-4">
      <h5 class="text-info fw-bold"><i class="fas fa-spell-check me-2"></i>Spelling, Grammar & Quality Check</h5>
      <div class="row g-4 mt-1">
        <div class="col-md-6">
          <h6 class="fw-bold text-body">Spelling & Grammar Issues</h6>
          <ul id="listGrammar" class="text-body-secondary ps-3 small mb-0"></ul>
        </div>
        <div class="col-md-6">
          <h6 class="fw-bold text-body">General Quality Feedback</h6>
          <ul id="listQuality" class="text-body-secondary ps-3 small mb-0"></ul>
        </div>
      </div>
    </div>
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
const CL_API_URL = 'https://resume-ats-api.vercel.app/api/cover-letter';
// NEW: Global State
let globalResumeText = "";
let globalReportData = null;
let atsChartInstance = null;
let storedTries = localStorage.getItem('clTries');
let coverLetterTries = storedTries !== null ? parseInt(storedTries) : 3;
let recaptchaWidgetId;
function renderRecaptcha() {
  const htmlTheme = document.documentElement.getAttribute("data-bs-theme") || 'light';
  const wrapper = document.getElementById("recaptcha-wrapper");
  const analyzeBtn = document.getElementById("analyzeBtn");
  // To prevent ghost iframes, we completely wipe and rebuild the HTML container
  wrapper.innerHTML = '<div id="recaptcha-container"></div>';
  analyzeBtn.disabled = true;
  recaptchaWidgetId = grecaptcha.render('recaptcha-container', {
    'sitekey': '6LeDECYtAAAAAMUFxP8A8zQv2NhFMMtn1DSpM8-L', // Your Site Key
    'theme': htmlTheme === 'dark' ? 'dark' : 'light',
    'callback': function(token) {
      analyzeBtn.disabled = false; // Enable when solved
    },
    'expired-callback': function() {
      analyzeBtn.disabled = true; // Disable if it expires
    }
  });
}
// Render when Google API loads
window.onRecaptchaLoad = function() {
  renderRecaptcha();
};
// Rebuild when the user toggles dark mode
const observer = new MutationObserver(() => {
  if (typeof grecaptcha !== "undefined") {
    renderRecaptcha();
  }
});
observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-bs-theme"] });
// UI Error Handler Helper
function showError(msg) {
  const errBox = document.getElementById('errorAlert');
  document.getElementById('errorMessage').innerText = msg;
  errBox.classList.remove('d-none');
}
function hideError() {
  document.getElementById('errorAlert').classList.add('d-none');
}
function updateCoverLetterUI() {
  document.getElementById('clTries').innerText = coverLetterTries;
  if (coverLetterTries <= 0) {
    const btn = document.getElementById('generateClBtn');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-ban me-2"></i>Limit Reached (Try again tomorrow)';
  }
}
// 24h Lock Initialization & State Recovery
document.addEventListener("DOMContentLoaded", () => {
  const lastScan = localStorage.getItem('lastScanTime');
  const savedResume = localStorage.getItem('savedResumeText');
  if (lastScan) {
    const timePassed = Date.now() - parseInt(lastScan);
    const cooldownPeriod = 24 * 60 * 60 * 1000;
    if (timePassed < cooldownPeriod) {
      document.getElementById('uploadSection').classList.add('d-none');
      document.getElementById('cooldownSection').classList.remove('d-none');
      const hoursLeft = Math.ceil((cooldownPeriod - timePassed) / (1000 * 60 * 60));
      document.getElementById('timeRemaining').innerText = hoursLeft + ' hours';
      // NEW: Restore Cover Letter access during cooldown
      if (savedResume) {
        globalResumeText = savedResume;
        // Restore full report data for the PDF generator
        const savedReport = localStorage.getItem('savedReportData');
        if (savedReport) {
           globalReportData = JSON.parse(savedReport);
        }
        document.getElementById('coverLetterSection').classList.remove('d-none');
        document.getElementById('clDescription').value = localStorage.getItem('savedJD') || '';
        document.getElementById('clCompany').value = localStorage.getItem('savedCompany') || '';
        document.getElementById('clTitle').value = localStorage.getItem('savedTitle') || '';
        // Ensure the button state is correct on page load
        updateCoverLetterUI();
      }
    } else {
      localStorage.removeItem('lastScanTime');
      localStorage.removeItem('savedResumeText');
    }
  }
});
// Main Logic
async function processFile() {
  hideError();
  const recaptchaResponse = grecaptcha.getResponse(recaptchaWidgetId);
  if (!recaptchaResponse) {
    return showError('Please complete the reCAPTCHA verification.');
  }
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
    // NEW: Save text globally for the Cover Letter generator
    globalResumeText = extractedText;
    const jdText = document.getElementById('jobDescription').value;
    loadText.innerText = "AI is analyzing your profile matrix...";
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        resumeText: extractedText,
        jobDescription: jdText,
        sendEmailReport: true
        })
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Server Error: Check your API Key and Vercel KV settings.');
    }
    // Lock UI & Store Cooldown & Persist Data
    localStorage.setItem('lastScanTime', Date.now().toString());
    localStorage.setItem('savedResumeText', globalResumeText);
    globalReportData = data; // Save to memory
    localStorage.setItem('savedReportData', JSON.stringify(data)); // Save to browser storage
    localStorage.setItem('savedJD', jdText);
    // --- Populate Extracted Data ---
    document.getElementById('extEmail').innerText = data.extractedData.email;
    document.getElementById('extPhone').innerText = data.extractedData.phone;
    // Map Social Links
    const socialContainer = document.getElementById('extSocials');
    socialContainer.innerHTML = '';
    if (data.extractedData.socialLinks && data.extractedData.socialLinks.length > 0) {
      data.extractedData.socialLinks.forEach(link => {
        socialContainer.innerHTML += `<span class="badge bg-secondary-subtle text-secondary border border-secondary-subtle rounded-pill"><i class="fas fa-link me-1"></i>${link}</span>`;
      });
    } else {
      socialContainer.innerHTML = '<span class="text-muted small">No links found</span>';
    }
    // Map Extracted Lists
    mapListToUI('extEducation', data.extractedData.education);
    mapListToUI('extCertifications', data.extractedData.certifications);
    mapListToUI('extWork', data.extractedData.workExperience);
    mapListToUI('extProjects', data.extractedData.projects);
    // Map Grammar and Quality Checks
    mapListToUI('listGrammar', data.qualityCheck.spellingAndGrammarIssues);
    mapListToUI('listQuality', data.qualityCheck.generalFeedback);
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
    renderChart(data.breakdown.formatting.score, data.breakdown.keywords.score, data.breakdown.impact.score);
    document.getElementById('uploadSection').classList.add('d-none');
    document.getElementById('resultsLayout').classList.remove('d-none');
  } catch (err) {
    showError(err.message);
    grecaptcha.reset(recaptchaWidgetId);
    btn.disabled = true; 
  } finally {
    loader.classList.add('d-none');
  }
}
function mapListToUI(elementId, arrayData) {
  const ul = document.getElementById(elementId);
  ul.innerHTML = '';
  if (arrayData && arrayData.length > 0) {
    arrayData.forEach(item => {
      // Removed the 'mb-2' class from the <li> here since Bootstrap flex handles the gap now
      ul.innerHTML += `<li>${item}</li>`;
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
// --- NEW: Chart.js Initialization ---
function renderChart(formatScore, keywordScore, impactScore) {
  const ctx = document.getElementById('atsChart').getContext('2d');
  if (atsChartInstance) atsChartInstance.destroy();
  atsChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Formatting', 'Keywords', 'Impact'],
      datasets: [{
        label: 'Category Score',
        data: [formatScore, keywordScore, impactScore],
        backgroundColor: ['rgba(54, 162, 235, 0.5)', 'rgba(75, 192, 192, 0.5)', 'rgba(153, 102, 255, 0.5)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: { y: { beginAtZero: true, max: 100 } }
    }
  });
}
// --- UPGRADED: Professional PDF Export Logic ---
function downloadPDF() {
  const btn = document.getElementById('downloadPdfBtn');
  const originalHTML = btn.innerHTML;
  if (!globalReportData) {
    return alert("Report data is missing. Please scan a resume first.");
  }
  // Show Loading State
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Generating Document...';
  const data = globalReportData;
  // 1. Create container (Removed fixed width and padding to fix clipping)
  const pdfContainer = document.createElement('div');
  pdfContainer.style.fontFamily = 'Helvetica, Arial, sans-serif';
  pdfContainer.style.color = '#000000';      
  pdfContainer.style.background = '#ffffff'; 
  pdfContainer.style.lineHeight = '1.6';
  // 2. Build the linear, page-break-safe HTML layout 
  pdfContainer.innerHTML = `
    <div style="color: #0d6efd; text-align: center; margin-bottom: 5px; font-size: 28px; font-weight: bold;">Resume ATS Report</div>
    <div style="text-align: center; color: #555; margin-top: 0; font-size: 18px; font-weight: bold;">Target Role: ${data.detectedRole}</div>
    <hr style="margin: 20px 0; border: 1px solid #ddd;">
    <div style="margin-bottom: 30px;">
        <div style="margin: 0; color: #333; font-size: 22px; font-weight: bold;">Overall ATS Score: <span style="color: #0d6efd;">${data.atsScore}/100</span></div>
        <p style="margin: 5px 0 0 0; font-size: 14px; color: #555;"><strong>Email:</strong> ${data.extractedData.email} &nbsp;|&nbsp; <strong>Phone:</strong> ${data.extractedData.phone}</p>
    </div>
    <div style="margin-bottom: 25px; page-break-inside: avoid;">
        <div style="border-bottom: 2px solid #0d6efd; padding-bottom: 5px; font-size: 18px; font-weight: bold; margin-bottom: 10px;">Score Breakdown</div>
        <p style="margin: 8px 0; font-size: 14px;"><strong>Formatting:</strong> ${data.breakdown.formatting.score}/100 - ${data.breakdown.formatting.feedback}</p>
        <p style="margin: 8px 0; font-size: 14px;"><strong>Keywords:</strong> ${data.breakdown.keywords.score}/100 - ${data.breakdown.keywords.feedback}</p>
        <p style="margin: 8px 0; font-size: 14px;"><strong>Impact:</strong> ${data.breakdown.impact.score}/100 - ${data.breakdown.impact.feedback}</p>
    </div>
    <div style="margin-bottom: 25px; page-break-inside: avoid;">
        <div style="border-bottom: 2px solid #198754; padding-bottom: 5px; font-size: 18px; color: #198754; font-weight: bold; margin-bottom: 10px;">Key Strengths</div>
        <ul style="margin: 10px 0; padding-left: 20px; font-size: 14px;">
            ${data.strengths.map(s => `<li style="margin-bottom: 6px;">${s}</li>`).join('')}
        </ul>
    </div>
    <div style="margin-bottom: 25px; page-break-inside: avoid;">
        <div style="border-bottom: 2px solid #dc3545; padding-bottom: 5px; font-size: 18px; color: #dc3545; font-weight: bold; margin-bottom: 10px;">Areas for Improvement</div>
        <ul style="margin: 10px 0; padding-left: 20px; font-size: 14px;">
            ${data.weaknesses.map(s => `<li style="margin-bottom: 6px;">${s}</li>`).join('')}
        </ul>
    </div>
    <div style="margin-bottom: 25px; page-break-inside: avoid;">
        <div style="border-bottom: 2px solid #ffc107; padding-bottom: 5px; font-size: 18px; color: #b28602; font-weight: bold; margin-bottom: 10px;">Missing Core Keywords</div>
        <p style="font-size: 14px; margin: 10px 0;">${data.missingKeywords.join(', ')}</p>
    </div>
    <div style="margin-bottom: 25px; page-break-inside: avoid;">
        <div style="border-bottom: 2px solid #0d6efd; padding-bottom: 5px; font-size: 18px; font-weight: bold; margin-bottom: 10px;">Actionable Next Steps</div>
        <ol style="margin: 10px 0; padding-left: 20px; font-size: 14px;">
            ${data.actionableSteps.map(s => `<li style="margin-bottom: 6px;">${s}</li>`).join('')}
        </ol>
    </div>
  `;
  // 3. Feed the pristine container into html2pdf
  const opt = {
    margin:       0.5, // 0.5 inch margins all around protects against edge clipping
    filename:     'ATS_Resume_Report.pdf',
    image:        { type: 'jpeg', quality: 1 }, 
    html2canvas:  { 
      scale: 2, 
      scrollY: 0,        // Fixes the massive top gap
      windowWidth: 800   // Enforces a consistent virtual canvas width
    },
    jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' },
    pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
  };
  html2pdf().set(opt).from(pdfContainer).save().then(() => {
    // Restore Button State
    btn.disabled = false;
    btn.innerHTML = originalHTML;
  });
}
// --- NEW: Cover Letter Generator Logic ---
function openCoverLetterPanel() {
  document.getElementById('coverLetterSection').classList.remove('d-none');
  document.getElementById('coverLetterSection').scrollIntoView({ behavior: 'smooth' });
  document.getElementById('clTries').innerText = coverLetterTries;
  updateCoverLetterUI();
  // Pre-fill JD if they provided one earlier
  const initialJD = document.getElementById('jobDescription').value;
  if(initialJD) document.getElementById('clDescription').value = initialJD;
}
async function generateCoverLetter() {
  const errBox = document.getElementById('clErrorBox');
  errBox.classList.add('d-none'); // Hide previous errors
  if (coverLetterTries <= 0) return;
  if (!globalResumeText) {
    errBox.innerText = "Please upload and scan a resume first.";
    errBox.classList.remove('d-none');
    return;
  }
  const company = document.getElementById('clCompany').value;
  const title = document.getElementById('clTitle').value;
  const jd = document.getElementById('clDescription').value;
  const btn = document.getElementById('generateClBtn');
  if(!company || !title) {
    errBox.innerText = "Please provide the Company Name and Job Title.";
    errBox.classList.remove('d-none');
    return;
  }
  localStorage.setItem('savedCompany', company);
  localStorage.setItem('savedTitle', title);
  localStorage.setItem('savedJD', jd);
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Generating...';
  try {
    const response = await fetch(CL_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resumeText: globalResumeText, company, title, jobDescription: jd })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to generate cover letter.');
    document.getElementById('clOutput').value = data.coverLetter;
    document.getElementById('clOutputSection').classList.remove('d-none');
    coverLetterTries--;
    localStorage.setItem('clTries', coverLetterTries.toString());
    updateCoverLetterUI();
  } catch (err) {
    errBox.innerText = err.message;
    errBox.classList.remove('d-none');
  } finally {
    // FIX: Safely reset the button state after success or failure
    if (coverLetterTries > 0) {
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-magic me-2"></i>Generate Cover Letter';
    }
  }
}
function copyCoverLetter() {
  const outputText = document.getElementById('clOutput').value;
  navigator.clipboard.writeText(outputText);
  const btn = document.getElementById('copyClBtn');
  const originalHTML = btn.innerHTML;
  // Turn green and show "Copied!"
  btn.classList.replace('btn-outline-secondary', 'btn-success');
  btn.innerHTML = '<i class="fas fa-check me-2"></i>Copied!';
  // Revert back after 2 seconds
  setTimeout(() => {
    btn.classList.replace('btn-success', 'btn-outline-secondary');
    btn.innerHTML = originalHTML;
  }, 2000);
}
</script>