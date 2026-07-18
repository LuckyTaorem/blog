---
title: "Free Web Scraper & SEO Audit Tool | Extract Data Instantly"
description: "Use our free online web scraper to instantly extract images, videos, links, SEO metadata, and network requests from any website."
---
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Deep Web Scraper",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Any",
  "description": "An advanced, free browser-based tool to dynamically scrape and extract text, links, images, videos, SEO metadata, and HTTP network requests from any given URL.",
  "offers": { "@type": "Offer", "price": "0.00", "priceCurrency": "USD" },
  "featureList": ["JavaScript Execution", "SEO Auditing", "HTTP Request Sniffing", "Raw JSON Export", "Schema Parsing"]
}
</script>
<style>
  .sidebar-overflow { z-index: 0; }
  .col.col-md-3.col-lg-2.d-none.d-md-block.pt-5 { z-index: -5; }
  .full-bleed-layout { width: 100vw; position: relative; left: 50%; right: 50%; margin-left: -50vw; margin-right: -50vw; padding-left: 2rem; padding-right: 2rem; }
  .tool-card { border: 1px solid var(--bs-border-color-translucent); border-radius: 1rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); background-color: var(--bs-body-bg); transition: box-shadow 0.3s ease; }
  .tool-card:hover { box-shadow: 0 12px 24px -5px rgba(0,0,0,0.1); }
  .modern-btn { font-weight: 600; letter-spacing: 0.5px; transition: transform 0.2s ease, box-shadow 0.2s ease; }
  .modern-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 15px rgba(0,0,0,0.1); }
  .nav-pills .nav-link { border-radius: 0.5rem; font-weight: 500; color: var(--bs-body-color); margin-right: 0.25rem; transition: all 0.2s ease; }
  .nav-pills .nav-link:hover { background-color: var(--bs-secondary-bg); transform: translateY(-1px); }
  .hover-lift { transition: transform 0.2s ease, box-shadow 0.2s ease; }
  .hover-lift:hover { transform: translateY(-3px); box-shadow: 0 8px 15px rgba(0,0,0,0.1) !important; z-index: 2; }
  details summary { cursor: pointer; user-select: none; transition: color 0.2s ease; outline: none; }
  details summary:hover { color: var(--bs-primary) !important; }
  details summary::-webkit-details-marker { display: none; }
  .fade-in-up { animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
  .pulse-loader { animation: pulseAnim 1.5s infinite; }
  @keyframes pulseAnim { 0% { transform: scale(0.95); opacity: 0.8; } 50% { transform: scale(1.05); opacity: 1; } 100% { transform: scale(0.95); opacity: 0.8; } }
  .list-group-item { transition: background-color 0.2s ease; }
  @media (min-width: 1200px) { .full-bleed-layout { padding-left: 5rem; padding-right: 5rem; } }
</style>
<div class="full-bleed-layout py-5">
  <div id="historyModal" class="position-fixed top-0 start-0 w-100 h-100 d-none justify-content-center align-items-center" style="background: rgba(0,0,0,0.6); z-index: 1055; backdrop-filter: blur(4px);">
    <div class="bg-body p-4 rounded-4 shadow-lg w-100 mx-3 fade-in-up" style="max-width: 600px; max-height: 80vh; display: flex; flex-direction: column;">
      <div class="d-flex justify-content-between align-items-center mb-4"><h5 class="fw-bolder mb-0 text-body"><i class="fas fa-history me-2 text-primary"></i>Recent Extractions</h5><button class="btn-close hover-lift" id="closeHistoryBtn"></button></div>
      <div id="historyList" class="list-group overflow-auto flex-grow-1 shadow-sm rounded-3"></div>
    </div>
  </div>
  <div class="row justify-content-center mb-4 fade-in-up">
    <div class="col-lg-8 text-center">
      <div class="d-inline-flex align-items-center bg-primary-subtle text-primary px-3 py-1 rounded-pill small fw-bold mb-3 shadow-sm hover-lift"><i class="fas fa-bolt me-2 text-warning"></i>Lightning Fast DOM Extraction</div>
      <h2 id="scraper-main-title" class="fw-bolder display-6 mb-3 text-body">Deep Web Scraper & Auditor</h2>
      <p class="text-body-secondary fs-5 mb-2">Execute JavaScript, audit SEO metrics, track networks, and extract assets instantly.</p>
      <p class="text-body-secondary small fw-bold mb-4">Scrapes remaining today: <strong id="scrapeTriesDisplay" class="text-primary fs-6 px-1">3</strong>/ 3</p>
      <div class="d-flex flex-column flex-sm-row gap-2 bg-body border border-secondary-subtle rounded-4 p-2 shadow-sm mb-2 text-start transition-all hover-lift">
        <div class="d-flex align-items-center flex-grow-1 px-3 py-1">
          <i class="fas fa-search text-primary fs-5 me-3"></i><input type="url" id="targetUrl" class="form-control text-body border-0 bg-transparent shadow-none p-0 w-100 fs-6" placeholder="Paste target URL (https://...)" style="outline: none;" required>
        </div>
        <button class="btn btn-primary rounded-3 modern-btn px-4 py-3 py-sm-2 flex-shrink-0" id="scrapeBtn"><i class="fas fa-magic me-2"></i>Extract Data</button>
      </div>
      <div id="errorMessage" class="alert alert-danger mt-3 small fw-bold d-none shadow-sm rounded-3 text-start border-0 border-start border-4 border-danger fade-in-up"><i class="fas fa-exclamation-triangle me-2"></i><span id="errorText"></span></div>
    </div>
  </div>
  <div class="row g-4 justify-content-center">
    <div id="loadingOverlay" class="col-lg-8 d-none flex-column align-items-center justify-content-center text-body tool-card p-5 my-4 text-center fade-in-up border-primary border-top border-4">
      <div class="position-relative mb-4 pulse-loader">
        <div class="spinner-border text-primary" style="width: 4rem; height: 4rem; border-width: 0.3rem;" role="status"></div>
        <i class="fas fa-globe position-absolute top-50 start-50 translate-middle text-primary fs-5"></i>
      </div>
      <h4 class="fw-bolder mb-2 text-primary">Initializing Cloud Browser</h4>
      <p class="text-body-secondary mb-0">Navigating to URL, rendering JavaScript payload, sniffing traffic, and evaluating SEO nodes.</p>
      <p class="small text-body-secondary fw-bold mt-3 bg-body-tertiary px-3 py-1 rounded-pill d-inline-block border"><i class="fas fa-stopwatch me-2 text-warning"></i>This deeply thorough scan takes up to 15 seconds.</p>
    </div>
    <div class="col-12 d-none" id="resultsPanel">
      <div class="d-flex align-items-center justify-content-between mb-3 px-2 fade-in-up">
        <h5 class="fw-bold mb-0 text-body-secondary"><i class="fas fa-chart-pie me-2"></i>Extraction Results</h5>
        <div class="d-flex gap-2">
          <button id="viewHistoryBtn" class="btn btn-sm btn-outline-primary rounded-pill fw-bold px-3 modern-btn"><i class="fas fa-list me-1"></i>History</button>
          <button id="clearHistoryBtn" class="btn btn-sm btn-outline-danger rounded-pill fw-bold px-3 modern-btn"><i class="fas fa-trash-alt me-1"></i>Clear All</button>
        </div>
      </div>
      <div class="tool-card p-4 p-md-5 fade-in-up border-top border-4 border-success">
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 border-bottom pb-4 gap-3 border-secondary-subtle">
          <div><h4 id="resTitle" class="fw-bolder mb-2 text-body">Page Title</h4><a href="#" target="_blank" id="resUrl" class="text-primary text-decoration-none fw-bold small hover-lift d-inline-block"><i class="fas fa-external-link-alt me-2"></i>Open Original Source</a></div>
          <button id="downloadJson" class="btn btn-success modern-btn shadow-sm rounded-pill px-4 py-2"><i class="fas fa-file-download me-2"></i>Download JSON</button>
        </div>
        <ul class="nav nav-pills mb-4 overflow-auto flex-nowrap pb-2" style="white-space: nowrap;" id="scraperTabs" role="tablist">
          <li class="nav-item" role="presentation"><button class="nav-link active shadow-sm fw-bold" data-bs-toggle="pill" data-bs-target="#tab-seo" type="button"><i class="fas fa-search-dollar me-2 text-primary"></i>SEO Audit</button></li>
          <li class="nav-item" role="presentation"><button class="nav-link shadow-sm fw-bold" data-bs-toggle="pill" data-bs-target="#tab-text" type="button"><i class="fas fa-font me-2"></i>Text (<span id="count-text">0</span>)</button></li>
          <li class="nav-item" role="presentation"><button class="nav-link shadow-sm fw-bold" data-bs-toggle="pill" data-bs-target="#tab-images" type="button"><i class="fas fa-image me-2"></i>Images (<span id="count-images">0</span>)</button></li>
          <li class="nav-item" role="presentation"><button class="nav-link shadow-sm fw-bold" data-bs-toggle="pill" data-bs-target="#tab-links" type="button"><i class="fas fa-link me-2"></i>Links (<span id="count-links">0</span>)</button></li>
          <li class="nav-item" role="presentation"><button class="nav-link shadow-sm fw-bold" data-bs-toggle="pill" data-bs-target="#tab-videos" type="button"><i class="fas fa-video me-2"></i>Videos (<span id="count-videos">0</span>)</button></li>
          <li class="nav-item" role="presentation"><button class="nav-link shadow-sm fw-bold" data-bs-toggle="pill" data-bs-target="#tab-network" type="button"><i class="fas fa-network-wired me-2"></i>Network (<span id="count-network">0</span>)</button></li>
          <li class="nav-item" role="presentation"><button class="nav-link shadow-sm fw-bold" data-bs-toggle="pill" data-bs-target="#tab-raw" type="button"><i class="fas fa-code me-2"></i>Raw JSON</button></li>
        </ul>
        <div class="tab-content border-top pt-4 border-secondary-subtle" id="scraperTabsContent">
          <div class="tab-pane fade show active" id="tab-seo"><div id="out-seo"></div></div>
          <div class="tab-pane fade" id="tab-text"><div class="row g-3" id="out-text"></div><div id="pag-text"></div></div>
          <div class="tab-pane fade" id="tab-images"><div class="row g-4" id="out-images"></div><div id="pag-images"></div></div>
          <div class="tab-pane fade" id="tab-links"><div class="list-group shadow-sm rounded-3" id="out-links"></div><div id="pag-links"></div></div>
          <div class="tab-pane fade" id="tab-videos"><div class="list-group shadow-sm rounded-3" id="out-videos"></div><div id="pag-videos"></div></div>
          <div class="tab-pane fade" id="tab-network"><div class="list-group shadow-sm rounded-3" id="out-network"></div><div id="pag-network"></div></div>
          <div class="tab-pane fade" id="tab-raw"><pre id="out-raw" class="bg-body-secondary text-body p-4 rounded-4 shadow-inner fade-in-up border-start border-4 border-success" style="max-height: 500px; overflow-y: auto; font-family: monospace;"></pre></div>
        </div>
      </div>
    </div>
  </div>
</div>
<script>
// document.addEventListener('click', function(e) {
//   const summary = e.target.closest('summary');
//   if (!summary) return;
//   const currentDetails = summary.parentElement;
//   if (!currentDetails.hasAttribute('open')) {
//     const parentContainer = currentDetails.closest('.tab-pane');
//     if (parentContainer) {
//       parentContainer.querySelectorAll('details[open]').forEach(openDetail => { if (openDetail !== currentDetails) openDetail.removeAttribute('open'); });
//     }
//   }
// });
window.curPage = { text: 1, images: 1, links: 1, videos: 1, network: 1 };
window.scrapeHistoryList = [];
window.currentScrapeData = null;
window.changePage = function(tab, dir) { window.curPage[tab] += dir; window.updateTab(tab); };
window.renderSEO = function(data) {
  const seo = data.seo;
  const titleLen = data.metadata.title.length;
  const descLen = seo.metaDescription === 'Not Found' ? 0 : seo.metaDescription.length;
  const isIndexable = seo.robots.toLowerCase().includes('noindex') ? '<span class="badge bg-danger shadow-sm">NoIndex</span>' : '<span class="badge bg-success shadow-sm">Indexable</span>';
  let schemaHtml = seo.schemas.length > 0 
    ? seo.schemas.map((s, i) => `<details class="mb-2 bg-body rounded border"><summary class="small fw-bolder text-primary p-2 bg-primary-subtle rounded d-flex align-items-center"><i class="fas fa-angle-right me-2"></i>LD-JSON Schema #${i+1}</summary><pre class="bg-body-secondary text-body p-3 m-0 rounded-bottom small overflow-auto" style="max-height:200px;">${JSON.stringify(s, null, 2)}</pre></details>`).join('')
    : '<p class="text-body-secondary small mb-0"><i class="fas fa-exclamation-circle me-1"></i>No Schema.org JSON-LD found.</p>';
  let structureHtml = seo.headingStructure.length > 0 
    ? seo.headingStructure.map(h => {
        let margin = h.tag === 'h1' ? '0' : h.tag === 'h2' ? 'ms-3' : h.tag === 'h3' ? 'ms-4' : h.tag === 'h4' ? 'ms-5' : 'ms-5 ps-3';
        return `<div class="${margin} border-start border-2 border-primary ps-2 py-1 mb-1 small text-truncate text-body" title="${h.text}"><span class="badge bg-secondary me-2">${h.tag.toUpperCase()}</span>${h.text}</div>`;
      }).join('')
    : '<p class="text-body-secondary small mb-0">No HTML headings detected.</p>';
  document.getElementById('out-seo').innerHTML = `
    <div class="row g-4 fade-in-up">
      <div class="col-lg-6">
        <div class="p-4 bg-body-tertiary rounded-4 border h-100 hover-lift">
          <h6 class="fw-bolder mb-3 text-primary border-bottom border-secondary-subtle pb-2"><i class="fas fa-tags me-2"></i>Meta Data Analysis</h6>
          <div class="mb-3">
            <div class="d-flex justify-content-between mb-1"><strong class="small text-body">Title Tag:</strong> <small class="fw-bold px-2 py-1 rounded bg-body border ${titleLen > 0 && titleLen <= 60 ? 'text-success border-success' : 'text-danger border-danger'}">${titleLen} chars</small></div>
            <div class="p-3 bg-body rounded-3 border small text-break lh-sm shadow-sm text-body">${data.metadata.title}</div>
          </div>
          <div class="mb-3">
            <div class="d-flex justify-content-between mb-1"><strong class="small text-body">Meta Description:</strong> <small class="fw-bold px-2 py-1 rounded bg-body border ${descLen > 0 && descLen <= 160 ? 'text-success border-success' : 'text-danger border-danger'}">${descLen} chars</small></div>
            <div class="p-3 bg-body rounded-3 border small text-break lh-sm shadow-sm text-body">${seo.metaDescription}</div>
          </div>
          <div>
            <strong class="small d-block mb-1 text-body">Keywords:</strong>
            <div class="p-3 bg-body rounded-3 border small text-break text-body-secondary shadow-sm">${seo.metaKeywords}</div>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="p-4 bg-body-tertiary rounded-4 border h-100 hover-lift">
          <h6 class="fw-bolder mb-3 text-info border-bottom border-secondary-subtle pb-2"><i class="fas fa-link me-2"></i>URL & Crawlability</h6>
          <div class="mb-4">
            <strong class="small d-block mb-2 text-body">Search Engine Directives:</strong>
            <div class="d-flex align-items-center gap-2 p-2 bg-body rounded border shadow-sm">${isIndexable} <small class="text-body-secondary font-monospace">${seo.robots}</small></div>
          </div>
          <div class="mb-4">
            <strong class="small d-block mb-2 text-body">Canonical Tag:</strong>
            <div class="p-3 bg-body rounded-3 border small text-break text-body-secondary font-monospace shadow-sm">${seo.canonicalUrl}</div>
          </div>
          <div>
            <strong class="small d-block mb-2 text-body">Scraped Target:</strong>
            <div class="p-3 bg-body rounded-3 border small text-break text-primary fw-bold font-monospace shadow-sm">${data.metadata.url}</div>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="p-4 bg-body-tertiary rounded-4 border h-100 hover-lift d-flex flex-column">
          <h6 class="fw-bolder mb-3 text-warning border-bottom border-secondary-subtle pb-2"><i class="fas fa-heading me-2"></i>Heading Tag Hierarchy</h6>
          <div class="d-flex flex-wrap gap-2 mb-3">
            <span class="badge bg-primary shadow-sm">H1: ${seo.headingCounts.h1}</span>
            <span class="badge bg-secondary shadow-sm">H2: ${seo.headingCounts.h2}</span>
            <span class="badge bg-info text-dark shadow-sm">H3: ${seo.headingCounts.h3}</span>
            <span class="badge bg-dark shadow-sm">H4: ${seo.headingCounts.h4}</span>
            <span class="badge bg-light text-dark border shadow-sm">H5: ${seo.headingCounts.h5}</span>
            <span class="badge bg-light text-dark border shadow-sm">H6: ${seo.headingCounts.h6}</span>
          </div>
          <div class="bg-body p-3 rounded-3 border shadow-sm flex-grow-1 overflow-auto" style="max-height: 250px;">
            ${structureHtml}
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="row g-4 h-100">
          <div class="col-12">
            <div class="p-4 bg-body-tertiary rounded-4 border hover-lift">
              <h6 class="fw-bolder mb-3 text-success border-bottom border-secondary-subtle pb-2"><i class="fas fa-image me-2"></i>Image Alt Optimization</h6>
              <div class="d-flex justify-content-between align-items-center mb-2"><span class="small fw-bold text-body">Total Discovered Images:</span> <span class="badge bg-secondary shadow-sm px-3">${seo.imageStats.total}</span></div>
              <div class="d-flex justify-content-between align-items-center mb-2"><span class="small fw-bold text-success">Images With Alt Text:</span> <span class="badge bg-success shadow-sm px-3">${seo.imageStats.withAlt}</span></div>
              <div class="d-flex justify-content-between align-items-center"><span class="small fw-bold text-danger">Images Missing Alt Text:</span> <span class="badge bg-danger shadow-sm px-3">${seo.imageStats.withoutAlt}</span></div>
            </div>
          </div>
          <div class="col-12">
            <div class="p-4 bg-body-tertiary rounded-4 border hover-lift flex-grow-1 h-100">
              <h6 class="fw-bolder mb-3 text-danger border-bottom border-secondary-subtle pb-2"><i class="fas fa-code me-2"></i>Structured Data (Schema)</h6>
              ${schemaHtml}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  document.querySelectorAll('#out-seo details').forEach(d => {
    d.addEventListener('toggle', function() {
      const icon = this.querySelector('summary i');
      if(this.open) { icon.classList.replace('fa-angle-right', 'fa-angle-down'); } else { icon.classList.replace('fa-angle-down', 'fa-angle-right'); }
    });
  });
};
window.updateTab = function(tab) {
  if (!window.currentScrapeData) return;
  const d = window.currentScrapeData.content[tab === 'text' ? 'texts' : tab] || [];
  const paginated = d.slice((window.curPage[tab] - 1) * 50, window.curPage[tab] * 50);
  let h = '';
  if (tab === 'text') h = paginated.map((t,i) => `<div class="col-12 fade-in-up" style="animation-delay: ${i*0.02}s"><div class="p-4 bg-body-tertiary rounded-3 border hover-lift"><span class="badge bg-secondary mb-3 text-uppercase letter-spacing-1 px-2 py-1 shadow-sm">${t.tag}</span><p class="mb-0 text-body fs-6 lh-lg">${t.text}</p></div></div>`).join('');
  if (tab === 'images') h = paginated.map((img,i) => `<div class="col-6 col-md-4 col-lg-3 fade-in-up" style="animation-delay: ${i*0.02}s"><div class="border p-2 rounded-4 h-100 d-flex flex-column align-items-center justify-content-center bg-body shadow-sm hover-lift"><img src="${img.src}" class="img-fluid rounded-3 mb-3 w-100" style="height: 140px; object-fit: cover; border: 1px solid var(--bs-border-color-translucent);"><small class="text-truncate w-100 d-block text-body-secondary text-center fw-bold px-2" title="${img.alt}">${img.alt}</small></div></div>`).join('');
  if (tab === 'links') h = paginated.map((l,i) => `<a href="${l.href}" target="_blank" class="list-group-item bg-body list-group-item-action d-flex flex-column flex-md-row justify-content-between align-items-md-center p-3 px-4 border-start-0 border-end-0 hover-lift fade-in-up" style="animation-delay: ${i*0.01}s"><span class="text-truncate pe-md-4 fw-bolder mb-1 mb-md-0 text-primary fs-6">${l.text || 'No Anchor Text Detected'}</span><small class="text-body-secondary text-truncate bg-body-tertiary px-2 py-1 rounded" style="max-width: 100%; font-family: monospace;">${l.href}</small></a>`).join('');
  if (tab === 'videos') h = paginated.length > 0 ? paginated.map((v,i) => `<a href="${v}" target="_blank" class="list-group-item bg-body list-group-item-action p-4 border-start-0 border-end-0 hover-lift fade-in-up d-flex align-items-center" style="animation-delay: ${i*0.02}s"><i class="fas fa-play-circle fs-3 me-3 text-danger shadow-sm rounded-circle bg-body"></i><span class="text-primary text-truncate fw-bold fs-6">${v}</span></a>`).join('') : `<div class="alert alert-secondary border-0 text-center py-4 fade-in-up"><i class="fas fa-video-slash fs-2 mb-3 text-body-secondary d-block"></i><span class="text-body">No video or iframe sources detected on this page.</span></div>`;
  if (tab === 'network') h = paginated.length > 0 ? paginated.map((req,i) => {
    const statusColor = req.status >= 400 ? 'bg-danger' : (req.status >= 300 ? 'bg-warning text-dark' : 'bg-success');
    return `<div class="list-group-item bg-body p-4 border-start-0 border-end-0 fade-in-up" style="animation-delay: ${i*0.01}s"><div class="d-flex align-items-center gap-2 mb-3"><span class="badge ${statusColor} shadow-sm px-2 py-1 fs-6">${req.status}</span><span class="badge bg-secondary text-uppercase shadow-sm px-2 py-1">${req.method}</span><span class="badge bg-info text-dark shadow-sm px-2 py-1">${req.type}</span></div><small class="text-body-secondary d-block text-break mb-4 bg-body-tertiary p-2 rounded border" style="font-family: monospace;">${req.url}</small><div class="row g-3"><div class="col-md-6"><details class="w-100 bg-body rounded border"><summary class="small fw-bolder text-primary p-2 d-flex align-items-center bg-primary-subtle rounded"><i class="fas fa-angle-right me-2 transition-transform"></i>Request Headers</summary><pre class="bg-body-secondary text-body p-3 m-0 rounded-bottom small overflow-auto" style="max-height: 250px;">${JSON.stringify(req.reqHeaders, null, 2)}</pre></details></div><div class="col-md-6"><details class="w-100 bg-body rounded border"><summary class="small fw-bolder text-primary p-2 d-flex align-items-center bg-primary-subtle rounded"><i class="fas fa-angle-right me-2 transition-transform"></i>Response Headers</summary><pre class="bg-body-secondary text-body p-3 m-0 rounded-bottom small overflow-auto" style="max-height: 250px;">${JSON.stringify(req.resHeaders, null, 2)}</pre></details></div></div></div>`;
  }).join('') : `<div class="alert alert-secondary border-0 text-center py-4 fade-in-up"><i class="fas fa-network-wired fs-2 mb-3 text-body-secondary d-block"></i><span class="text-body">No network requests tracked.</span></div>`;
  document.getElementById(`out-${tab}`).innerHTML = h;
  const tot = Math.ceil(d.length / 50);
  document.getElementById(`pag-${tab}`).innerHTML = tot > 1 ? `<div class="d-flex justify-content-center align-items-center mt-5 gap-3 bg-body-tertiary p-3 rounded-4 shadow-sm w-auto mx-auto d-inline-flex"><button class="btn btn-primary modern-btn fw-bold px-3" onclick="changePage('${tab}', -1)" ${window.curPage[tab] === 1 ? 'disabled' : ''}><i class="fas fa-chevron-left me-2"></i>Prev</button><span class="small fw-bolder text-body-secondary bg-body px-3 py-1 rounded shadow-sm border">Page ${window.curPage[tab]} of ${tot}</span><button class="btn btn-primary modern-btn fw-bold px-3" onclick="changePage('${tab}', 1)" ${window.curPage[tab] === tot ? 'disabled' : ''}>Next<i class="fas fa-chevron-right ms-2"></i></button></div>` : '';
  if (tab === 'network') {
    document.querySelectorAll('#out-network details').forEach(d => {
      d.addEventListener('toggle', function() {
        const icon = this.querySelector('summary i');
        if(this.open) { icon.classList.replace('fa-angle-right', 'fa-angle-down'); } else { icon.classList.replace('fa-angle-down', 'fa-angle-right'); }
      });
    });
  }
};
window.loadHistoryItem = function(index) {
  const item = window.scrapeHistoryList[index];
  if (item) { window.currentScrapeData = item.data; document.getElementById('targetUrl').value = item.url; renderData(item.data); document.getElementById('resultsPanel').classList.remove('d-none'); }
  document.getElementById('historyModal').classList.replace('d-flex', 'd-none');
};
document.addEventListener("DOMContentLoaded", () => {
  const API_ENDPOINT = 'https://resume-ats-api.vercel.app/api/scrape';
  let scrapeTries = localStorage.getItem('scrapeTries') !== null ? parseInt(localStorage.getItem('scrapeTries')) : 3;
  const scrapeBtn = document.getElementById('scrapeBtn');
  const targetUrl = document.getElementById('targetUrl');
  const loadingOverlay = document.getElementById('loadingOverlay');
  const resultsPanel = document.getElementById('resultsPanel');
  const errorText = document.getElementById('errorText');
  function updateUI() {
    document.getElementById('scrapeTriesDisplay').innerText = scrapeTries;
    if (scrapeTries <= 0) { scrapeBtn.disabled = true; scrapeBtn.classList.replace('btn-primary', 'btn-secondary'); scrapeBtn.innerHTML = '<i class="fas fa-ban me-2"></i>Limit Reached'; } else { scrapeBtn.disabled = false; scrapeBtn.classList.replace('btn-secondary', 'btn-primary'); scrapeBtn.innerHTML = '<i class="fas fa-magic me-2"></i>Extract Data'; }
  }
  function loadHistory() {
    try {
      const history = localStorage.getItem('scrapeHistoryList');
      if (history) { window.scrapeHistoryList = JSON.parse(history); if (window.scrapeHistoryList.length > 0) { window.currentScrapeData = window.scrapeHistoryList[0].data; targetUrl.value = window.scrapeHistoryList[0].url; renderData(window.currentScrapeData); resultsPanel.classList.remove('d-none'); } }
    } catch (e) { localStorage.removeItem('scrapeHistoryList'); }
  }
  updateUI(); loadHistory();
  document.getElementById('viewHistoryBtn').addEventListener('click', () => {
    document.getElementById('historyList').innerHTML = window.scrapeHistoryList.length === 0 ? '<div class="text-body-secondary small text-center p-5 bg-body-tertiary rounded-3 border"><i class="fas fa-folder-open fs-2 mb-3 d-block text-secondary"></i>No extraction history available yet.</div>' : window.scrapeHistoryList.map((item, index) => `<button class="list-group-item bg-body list-group-item-action p-4 d-flex flex-column align-items-start border-start-0 border-end-0 hover-lift mb-2 rounded shadow-sm" onclick="loadHistoryItem(${index})"><strong class="text-truncate mb-2 text-primary w-100 text-start fs-5">${item.title}</strong><small class="text-body-secondary text-truncate w-100 text-start bg-body-tertiary p-1 rounded font-monospace">${item.url}</small><small class="text-body-secondary mt-3 fw-bold bg-secondary-subtle px-2 py-1 rounded-pill" style="font-size: 0.75rem;"><i class="fas fa-clock me-2 text-primary"></i>${item.date}</small></button>`).join('');
    document.getElementById('historyModal').classList.replace('d-none', 'd-flex');
  });
  document.getElementById('closeHistoryBtn').addEventListener('click', () => { document.getElementById('historyModal').classList.replace('d-flex', 'd-none'); });
  document.getElementById('clearHistoryBtn').addEventListener('click', () => { localStorage.removeItem('scrapeHistoryList'); window.scrapeHistoryList = []; window.currentScrapeData = null; resultsPanel.classList.add('d-none'); targetUrl.value = ''; });
  scrapeBtn.addEventListener('click', async () => {
    if (scrapeTries <= 0) return;
    const url = targetUrl.value.trim();
    if (!url || !url.startsWith('http')) { errorText.textContent = "Please enter a valid URL starting with http:// or https://"; document.getElementById('errorMessage').classList.remove('d-none'); return; }
    document.getElementById('errorMessage').classList.add('d-none'); resultsPanel.classList.add('d-none'); loadingOverlay.classList.remove('d-none'); loadingOverlay.classList.add('d-flex'); scrapeBtn.disabled = true;
    try {
      const response = await fetch(API_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url }) });
      const data = await response.json();
      if (data.remainingScrapes !== undefined) { scrapeTries = data.remainingScrapes; localStorage.setItem('scrapeTries', scrapeTries.toString()); }
      if (!response.ok) { throw new Error(data.error || `HTTP Error: ${response.status}`); }
      window.currentScrapeData = data;
      const newItem = { title: data.metadata.title || 'Unknown Title', url: data.metadata.url || url, date: new Date().toLocaleString(), data: data };
      window.scrapeHistoryList.unshift(newItem);
      if (window.scrapeHistoryList.length > 5) window.scrapeHistoryList.pop();
      try { localStorage.setItem('scrapeHistoryList', JSON.stringify(window.scrapeHistoryList)); } catch (e) { window.scrapeHistoryList = [newItem]; localStorage.setItem('scrapeHistoryList', JSON.stringify(window.scrapeHistoryList)); }
      updateUI(); renderData(data); resultsPanel.classList.remove('d-none');
    } catch (err) { errorText.textContent = err.message; document.getElementById('errorMessage').classList.remove('d-none'); updateUI(); } finally { loadingOverlay.classList.remove('d-flex'); loadingOverlay.classList.add('d-none'); }
  });
  function renderData(data) {
    window.curPage = { text: 1, images: 1, links: 1, videos: 1, network: 1 };
    document.getElementById('resTitle').textContent = data.metadata.title || 'Unknown Title'; document.getElementById('resUrl').href = data.metadata.url;
    document.getElementById('count-text').textContent = data.counts.texts; document.getElementById('count-images').textContent = data.counts.images;
    document.getElementById('count-links').textContent = data.counts.links; document.getElementById('count-videos').textContent = data.counts.videos;
    document.getElementById('count-network').textContent = data.counts.network || 0;
    window.renderSEO(data);
    ['text', 'images', 'links', 'videos', 'network'].forEach(tab => window.updateTab(tab));
    document.getElementById('out-raw').textContent = JSON.stringify(data, null, 2);
    const seoTab = new bootstrap.Tab(document.querySelector('button[data-bs-target="#tab-seo"]'));
    seoTab.show();
  }
  document.getElementById('downloadJson').addEventListener('click', async function() {
    if (!window.currentScrapeData) return;
    const btn = this; const originalHtml = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-circle-notch fa-spin me-2"></i>Packaging JSON...'; btn.disabled = true; btn.classList.replace('btn-success', 'btn-secondary');
    await new Promise(resolve => setTimeout(resolve, 400));
    const blob = new Blob([JSON.stringify(window.currentScrapeData, null, 2)], { type: "application/json" });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `scraped_data_${new Date().getTime()}.json`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    btn.classList.replace('btn-secondary', 'btn-outline-success'); btn.innerHTML = '<i class="fas fa-check-double me-2"></i>Downloaded!';
    setTimeout(() => { btn.innerHTML = originalHtml; btn.classList.replace('btn-outline-success', 'btn-success'); btn.disabled = false; }, 2500);
  });
});
</script>