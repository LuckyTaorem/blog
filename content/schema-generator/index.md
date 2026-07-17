---
title: "Free JSON-LD SEO Schema Generator | AI & Live Preview"
description: "Generate complex JSON-LD schema markup instantly using AI or our manual builders. Copy raw HTML or export as WordPress PHP filters."
type: "page"
---

<!-- Custom WebApplication Schema for SEO -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Live JSON-LD Schema Generator",
  "description": "Generate complex JSON-LD schema markup instantly. Features AI generation, live preview, syntax validation, and WordPress PHP export.",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web browser",
  "url": "https://ltdeveloperblogs.github.io/schema-generator/",
  "provider": {
    "@type": "Person",
    "name": "Taorem Lucky Singh",
    "jobTitle": "WordPress and PHP Developer"
  },
  "featureList": [
    "AI Schema Generation",
    "Live Code Preview",
    "Real-time Syntax Validation",
    "24-Hour Local History",
    "FAQ Schema Generation",
    "Course Schema Generation",
    "WordPress PHP Filter Export"
  ],
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
</script>

<style>
  /* Force the layout to break out of the theme's narrow reading column */
  .schema-layout-breakout {
    width: 95vw;
    max-width: 1400px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    padding: 0 1rem;
  }
</style>

<!-- Replace your old container-fluid div with this -->
<div class="schema-layout-breakout py-5">
  <div class="text-center mb-5">
    <h2 id="schemaBuilderTitle" class="fw-bold text-primary"><i class="fas fa-code me-2"></i>Visual JSON-LD Schema Builder</h2>
    <p class="text-body-secondary">Build complex nested schema in real-time. Export as standard HTML or WordPress PHP filters.</p>
  </div>

  <div class="row g-4">
    <!-- LEFT COLUMN: Form Inputs -->
    <div class="col-lg-5">
      <!-- AI Generator Panel -->
      <div class="card shadow-sm border-0 bg-dark text-light rounded-4 p-4 mb-4 border border-info border-2">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="fw-bold mb-0 text-info"><i class="fas fa-sparkles me-2"></i>Create with AI</h5>
          <span class="badge bg-info text-dark">Tries: <span id="aiTries">3</span>/3</span>
        </div>
        <textarea id="aiPrompt" class="form-control mb-3" rows="3" placeholder="e.g. Generate FAQ schema for 3 questions about automated web pipelines..."></textarea>
        <button id="generateAiBtn" class="btn btn-info fw-bold w-100 text-dark">
          <i class="fas fa-magic me-2"></i>Generate Schema
        </button>
        <div id="aiError" class="alert alert-danger small fw-bold mt-3 mb-0 py-2 d-none"></div>
      </div>
      <!-- NEW: History Panel (24 Hours) -->
      <div class="card shadow-sm border-0 bg-dark text-light rounded-4 p-4 mb-4 border border-secondary">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="fw-bold mb-0 text-light"><i class="fas fa-history me-2"></i>Recent Schemas (24h)</h5>
          <button id="clearHistoryBtn" class="btn btn-outline-secondary btn-sm py-0">Clear</button>
        </div>
        <div id="historyList" class="d-flex flex-column gap-2" style="max-height: 150px; overflow-y: auto;">
          <!-- JavaScript will inject history items here -->
        </div>
      </div>
      <!-- Standard Manual Form -->
      <div class="card shadow-sm border-0 bg-body-tertiary rounded-4 p-4">
        <div class="h5 fw-bold mb-3 border-bottom pb-2">Manual Builder</div>
        <label class="form-label small fw-bold">Select Schema Type</label>
        <select id="schemaTypeSelector" class="form-select mb-4 border-subtle">
          <option value="faq">FAQ Page</option>
          <option value="article">Article / Blog Post</option>
          <option value="course">Course</option>
        </select>
        <div id="dynamicFormContainer"></div>
      </div>
    </div>
    <!-- RIGHT COLUMN: Live Code Output -->
    <div class="col-lg-7">
      <div class="card shadow-sm border-0 bg-dark text-light rounded-4 p-0 h-100 overflow-hidden">
        <!-- Output Toolbar -->
        <div class="d-flex flex-wrap justify-content-between align-items-center bg-black p-3 border-bottom border-secondary gap-3">
          <!-- Format Toggle -->
          <div class="btn-group" role="group">
            <input type="radio" class="btn-check" name="outputFormat" id="formatJson" value="json" checked autocomplete="off">
            <label class="btn btn-outline-light btn-sm fw-bold" for="formatJson">&lt;script&gt; HTML</label>
            <input type="radio" class="btn-check" name="outputFormat" id="formatPhp" value="php" autocomplete="off">
            <label class="btn btn-outline-light btn-sm fw-bold" for="formatPhp">PHP (Rank Math)</label>
          </div>
          <!-- Action Buttons -->
          <div class="d-flex gap-2">
            <button id="testRichResultsBtn" class="btn btn-outline-info btn-sm fw-bold" title="Copies code and opens Google Rich Results Test">
              <i class="fab fa-google me-2"></i>Test Code
            </button>
            <button id="copyCodeBtn" class="btn btn-primary btn-sm fw-bold">
              <i class="fas fa-copy me-2"></i>Copy
            </button>
          </div>
        </div>
        <!-- Code Display / Live Editor -->
        <div class="p-4 position-relative" style="background-color: #1e1e1e; height: 100%; min-height: 550px; overflow-y: auto;">
          <!-- Visual hint for users -->
          <span class="badge bg-secondary position-absolute top-0 end-0 m-3 opacity-50 user-select-none">
            <i class="fas fa-edit me-1"></i>Editable
          </span>
          <!-- Added contenteditable="true" and outline:none -->
          <pre><code id="codeOutput" contenteditable="true" spellcheck="false" style="color: #4af626; font-family: 'Courier New', Courier, monospace; font-size: 14px; white-space: pre-wrap; word-break: break-all; outline: none;">
// Select a schema type to begin...
          </code></pre>
        </div>
      </div>
    </div>
  </div>
</div>
<script src="/js/schema-builder.js"></script>