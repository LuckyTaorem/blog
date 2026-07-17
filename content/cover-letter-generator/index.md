---
title: "Free AI Cover Letter Generator | Tailored to Job Descriptions"
description: "Upload your resume, enter a job title, and instantly generate a highly personalized, professional cover letter for free."
type: "page"
---

<!-- Custom WebApplication Schema for SEO -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Free AI Cover Letter Generator",
  "description": "Upload your resume, paste a job description, and instantly generate a highly personalized, professional cover letter for free using AI.",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web browser",
  "url": "https://ltdeveloperblogs.github.io/cover-letter-generator/",
  "provider": {
    "@type": "Person",
    "name": "Taorem Lucky Singh",
    "jobTitle": "WordPress and PHP Developer"
  },
  "featureList": [
    "Instant AI Cover Letter Generation",
    "Target Job Description Matching",
    "Automated Resume Data Extraction",
    "One-Click Copy to Clipboard",
    "No Sign-Up Required"
  ],
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "description": "100% Free AI Cover Letter Generation"
  }
}
</script>

<!-- Client-Side Parsing Libraries -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.4.21/mammoth.browser.min.js"></script>
<script>
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
</script>

<div class="container my-5 max-w-lg mx-auto">
  
  <!-- Error Alert -->
  <div id="clErrorBox" class="alert alert-danger d-none shadow-sm mb-4 fw-bold small"></div>

  <div class="card p-5 shadow-sm border-0 bg-body-tertiary rounded-4">
    <div class="text-center mb-4">
      <h3 class="fw-bold text-primary mb-2"><i class="fas fa-pen-nib me-2"></i>AI Cover Letter Generator</h3>
      <p class="text-body-secondary">Tries remaining today: <strong id="clTries" class="text-primary">3</strong>/3</p>
    </div>
    <!-- Input Form -->
    <div class="row g-4 mb-4">
      <div class="col-12">
        <label class="form-label fw-bold small"><i class="fas fa-file-upload me-2 text-primary"></i>1. Upload Your Resume (.pdf or .docx)</label>
        <input type="file" id="resumeFile" class="form-control border-subtle" accept=".pdf, .docx" />
      </div>
      <div class="col-md-6">
        <label class="form-label fw-bold small"><i class="fas fa-building me-2 text-primary"></i>2. Company Name</label>
        <input type="text" id="clCompany" class="form-control border-subtle" placeholder="e.g. Google">
      </div>
      <div class="col-md-6">
        <label class="form-label fw-bold small"><i class="fas fa-user-tag me-2 text-primary"></i>3. Job Title</label>
        <input type="text" id="clTitle" class="form-control border-subtle" placeholder="e.g. Senior PHP Developer">
      </div>
      <div class="col-12">
        <label class="form-label fw-bold small"><i class="fas fa-briefcase me-2 text-primary"></i>4. Target Job Description (Optional)</label>
        <textarea id="clDescription" class="form-control border-subtle" rows="4" placeholder="Paste the job description here for higher accuracy..."></textarea>
      </div>
    </div>
    <button id="generateClBtn" class="btn btn-success btn-lg fw-bold w-100 mb-4 rounded-3" onclick="generateStandaloneCoverLetter()">
      <i class="fas fa-magic me-2"></i>Generate Cover Letter
    </button>
    <!-- Output Section -->
    <div id="clOutputSection" class="d-none mt-4 border-top border-2 pt-4">
      <label class="form-label fw-bold small">Generated Cover Letter</label>
      <textarea id="clOutput" class="form-control mb-3 bg-white" rows="12" readonly></textarea>
      <button id="copyClBtn" class="btn btn-outline-secondary fw-bold btn-sm" onclick="copyCoverLetter()">
        <i class="fas fa-copy me-2"></i>Copy to Clipboard
      </button>
    </div>
  </div>
</div>

<script>
const CL_API_URL = 'https://resume-ats-api.vercel.app/api/cover-letter';

// 1. Sync Tries from LocalStorage
let storedTries = localStorage.getItem('clTries');
let coverLetterTries = storedTries !== null ? parseInt(storedTries) : 3;

document.addEventListener("DOMContentLoaded", () => {
  updateCoverLetterUI();
});

function updateCoverLetterUI() {
  document.getElementById('clTries').innerText = coverLetterTries;
  if (coverLetterTries <= 0) {
    const btn = document.getElementById('generateClBtn');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-ban me-2"></i>Limit Reached (Try again tomorrow)';
  }
}

// 2. File Extraction Helpers
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

// 3. Main Generation Logic
async function generateStandaloneCoverLetter() {
  const errBox = document.getElementById('clErrorBox');
  errBox.classList.add('d-none'); 

  if (coverLetterTries <= 0) return;

  const fileInput = document.getElementById('resumeFile');
  const company = document.getElementById('clCompany').value;
  const title = document.getElementById('clTitle').value;
  const jd = document.getElementById('clDescription').value;
  const btn = document.getElementById('generateClBtn');

  if (!fileInput.files.length) {
    errBox.innerText = "Please upload your resume file first.";
    errBox.classList.remove('d-none');
    return;
  }
  
  if (!company || !title) {
    errBox.innerText = "Please provide the Company Name and Job Title.";
    errBox.classList.remove('d-none');
    return;
  }

  const file = fileInput.files[0];
  const fileExtension = file.name.split('.').pop().toLowerCase();
  
  if (fileExtension !== 'pdf' && fileExtension !== 'docx') {
    errBox.innerText = 'Only .pdf and .docx files are allowed.';
    errBox.classList.remove('d-none');
    return;
  }

  btn.disabled = true;
  btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Extracting & Generating...';

  try {
    // Extract text from the uploaded file on the fly
    let extractedText = '';
    if (fileExtension === 'pdf') {
      extractedText = await extractTextFromPDF(file);
    } else if (fileExtension === 'docx') {
      extractedText = await extractTextFromDOCX(file);
    }

    if (!extractedText.trim()) throw new Error("Could not extract text. Make sure the file contains text, not just images.");

    // Send payload to Vercel API
    const response = await fetch(CL_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resumeText: extractedText, company, title, jobDescription: jd })
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to generate cover letter.');
    
    // Display result
    document.getElementById('clOutput').value = data.coverLetter;
    document.getElementById('clOutputSection').classList.remove('d-none');
    
    // Deduct try and sync globally
    coverLetterTries--;
    localStorage.setItem('clTries', coverLetterTries.toString());
    updateCoverLetterUI();
    
  } catch (err) {
    errBox.innerText = err.message;
    errBox.classList.remove('d-none');
  } finally {
    if (coverLetterTries > 0) {
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-magic me-2"></i>Generate Cover Letter';
    }
  }
}

// 4. Copy to Clipboard Utility
function copyCoverLetter() {
  const outputText = document.getElementById('clOutput').value;
  navigator.clipboard.writeText(outputText);
  
  const btn = document.getElementById('copyClBtn');
  const originalHTML = btn.innerHTML;
  
  btn.classList.replace('btn-outline-secondary', 'btn-success');
  btn.innerHTML = '<i class="fas fa-check me-2"></i>Copied!';
  
  setTimeout(() => {
    btn.classList.replace('btn-success', 'btn-outline-secondary');
    btn.innerHTML = originalHTML;
  }, 2000);
}
</script>