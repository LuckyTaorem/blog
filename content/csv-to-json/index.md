---
title: "CSV to JSON Transformer"
description: "Live browser-based CSV parsing and JSON schema transformation tool."
---

<style>
  /* Force the layout to break out of the theme's narrow markdown container */
  .full-bleed-layout {
    width: 100vw;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    padding-left: 2rem;
    padding-right: 2rem;
  }
  .sidebar-overflow{
    z-index:0;
  }
  .col.col-md-3.col-lg-2.d-none.d-md-block.pt-5{
    z-index:-5;
  }

  /* Custom UI/UX Polish */
  .tool-card {
    border: 1px solid var(--bs-border-color-translucent);
    border-radius: 1rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    background-color: var(--bs-body-bg);
  }
  .table-wrapper {
    border: 1px solid var(--bs-border-color-translucent);
    border-radius: 0.75rem;
    overflow-x: auto; /* Changed from hidden to auto for horizontal scroll */
  }
  
  /* Add this to force dropdowns to stay wide even if column name is 1 character */
  .type-selector {
    min-width: 140px;
  }
  .code-editor-header {
    background-color: #2d2d2d;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #404040;
  }
  .code-editor-body {
    background-color: #1e1e1e;
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
    color: #4af626; /* Terminal Green */
  }
  .dashed-dropzone {
    border: 2px dashed var(--bs-border-color);
    border-radius: 0.75rem;
    background-color: var(--bs-tertiary-bg);
    transition: all 0.2s ease-in-out;
  }
  .dashed-dropzone:hover {
    border-color: var(--bs-primary);
    background-color: var(--bs-primary-bg-subtle);
  }
  .step-badge {
    width: 32px; 
    height: 32px; 
    font-weight: 700;
  }
  
  /* Add more padding on extra-large screens */
  @media (min-width: 1200px) {
    .full-bleed-layout {
      padding-left: 5rem;
      padding-right: 5rem;
    }
  }
</style>

<div class="full-bleed-layout py-4">
  
  <!-- Tool Intro -->
  <div class="row mb-4">
    <div class="col-12">
      <h2 id="datatransformer" class="fw-bolder mb-1">Data Transformer</h2>
      <p class="text-muted">Instantly convert, refine, and type-cast CSV data into structured JSON.</p>
    </div>
  </div>

  <div class="row g-4">
    <!-- LEFT COLUMN: Input & Table Engine (Adjusted to 7 columns for better balance) -->
    <div class="col-lg-6">
      <div class="d-flex flex-column gap-4 pe-2" style="max-height: calc(100vh - 180px); overflow-y: auto; overflow-x: hidden;">
        <!-- STEP 1: Input Panel -->
        <div class="tool-card p-4 p-xl-5">
          <div class="d-flex align-items-center mb-4">
            <div class="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3 step-badge">1</div>
            <h5 class="fw-bold mb-0">Input Data</h5>
          </div>
          <!-- Dropzone UI -->
          <div class="dashed-dropzone p-4 mb-4 text-center position-relative">
            <i class="fas fa-cloud-upload-alt fs-2 text-primary mb-2"></i>
            <h6 class="fw-bold mb-1">Select a .csv file</h6>
            <p class="small text-muted mb-3">Data is processed locally in your browser.</p>
            <input type="file" id="csvFileInput" class="form-control form-control-sm mx-auto" style="max-width: 250px;" accept=".csv">
          </div>
          <div class="d-flex align-items-center mb-3">
            <hr class="flex-grow-1 opacity-25">
            <span class="mx-3 text-muted small fw-bold text-uppercase" style="letter-spacing: 1px;">Or paste raw text</span>
            <hr class="flex-grow-1 opacity-25">
          </div>
          <textarea id="csvInput" class="form-control bg-body text-body font-monospace mb-4 shadow-none" rows="4" placeholder="id,name,role&#10;1,Taorem Lucky Singh,Developer" style="font-size: 0.875rem; border-color: var(--bs-border-color-translucent);"></textarea>
          <div class="row g-2 mb-4 bg-body-tertiary p-3 rounded-3 border border-secondary-subtle shadow-sm fade-in">
            <div class="col-md-4">
              <label class="small fw-bolder mb-1 text-muted text-uppercase" style="letter-spacing: 0.5px;">Delimiter</label>
              <select id="delimiterSelect" class="form-select form-select-sm shadow-none border-secondary-subtle fw-medium text-body">
                <option value=",">Auto / Comma (,)</option>
                <option value="\t">Tab (\t)</option>
                <option value=";">Semicolon (;)</option>
                <option value="|">Pipe (|)</option>
              </select>
            </div>
            <div class="col-md-4">
              <label class="small fw-bolder mb-1 text-muted text-uppercase" style="letter-spacing: 0.5px;">Format</label>
              <select id="formatSelect" class="form-select form-select-sm shadow-none border-secondary-subtle fw-medium text-body">
                <option value="2">Pretty (Indented)</option>
                <option value="0">Minified (Compact)</option>
              </select>
            </div>
            <div class="col-md-4">
              <label class="small fw-bolder mb-1 text-muted text-uppercase" style="letter-spacing: 0.5px;">Options</label>
              <div class="form-check form-switch pt-1">
                <input class="form-check-input shadow-none cursor-pointer" type="checkbox" id="trimData" checked>
                <label class="form-check-label small fw-medium text-body cursor-pointer" for="trimData">Trim Whitespace</label>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-between align-items-center mt-2">
            <button id="clearBtn" class="btn btn-outline-danger px-3 py-2 fw-bold shadow-sm modern-btn"><i class="fas fa-trash-alt me-2"></i>Reset</button>
            <button id="parseBtn" class="btn btn-primary px-4 py-2 fw-bold shadow-sm modern-btn hover-lift"><i class="fas fa-cogs me-2"></i>Process Data</button>
          </div>
        </div>
        <!-- STEP 2: Interactive Table Panel -->
        <div id="tablePanel" class="tool-card p-4 p-xl-5 d-none">
          <div class="d-flex align-items-center mb-2">
            <div class="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3 step-badge">2</div>
            <h5 class="fw-bold mb-0">Refine Data Types</h5>
          </div>
          <p class="text-muted small mb-4 ms-5">Adjust the column schemas below. The output will automatically recalculate.</p>
          <div class="table-responsive table-wrapper">
            <table class="table table-hover table-borderless mb-0 align-middle">
              <thead id="tableHead" class="table-light border-bottom">
                <!-- JS will inject dynamic dropdowns here -->
              </thead>
              <tbody id="tableBody" class="small">
                <!-- JS will inject data rows here -->
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <!-- RIGHT COLUMN: Live JSON Output (Adjusted to 5 columns for wider view) -->
    <div class="col-lg-6">
      <div class="sticky-top pe-2" style="top: 100px; z-index: 1;">
        <div class="tool-card border-0 d-flex flex-column shadow-lg" style="height: calc(100vh - 120px);">
          <!-- Code IDE Header -->
          <div class="code-editor-header d-flex justify-content-between align-items-center">
            <div class="d-flex gap-2">
              <div class="rounded-circle bg-danger" style="width: 12px; height: 12px;"></div>
              <div class="rounded-circle bg-warning" style="width: 12px; height: 12px;"></div>
              <div class="rounded-circle bg-success" style="width: 12px; height: 12px;"></div>
            </div>
            <div class="d-flex align-items-center gap-2">
              <span class="text-secondary small fw-bold font-monospace">output.json</span>
              <span id="recordCount" class="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill" style="font-size: 0.7rem;">0 items</span>
            </div>
            <div class="d-flex gap-2">
              <button id="copyJsonBtn" class="btn btn-sm btn-outline-light border-0" title="Copy JSON" style="padding: 0.25rem 0.5rem;"><i class="fas fa-copy"></i></button>
              <button id="downloadJsonBtn" class="btn btn-sm btn-light text-dark fw-bold" title="Download JSON" style="padding: 0.25rem 0.75rem;"><i class="fas fa-download me-1"></i>.json</button>
            </div>
          </div>
          <!-- Code IDE Body -->
          <div class="code-editor-body p-4 overflow-auto flex-grow-1">
            <pre id="jsonOutput" class="m-0 h-100" style="white-space: pre-wrap; word-break: break-word; font-family: 'JetBrains Mono', 'Fira Code', monospace; font-size: 0.85rem;"></pre>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>

<!-- Load External Libraries & Custom Script -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.4.1/papaparse.min.js"></script>
<script src="/js/csv-transformer.js"></script>