---
title: "Free Web Scraper Tool | Extract Images, Links & Text Instantly"
description: "Use our free online web scraper to instantly extract images, videos, links, and text from any website. Bypasses JavaScript rendering dynamically."
---
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Deep Web Scraper",
  "operatingSystem": "WebBrowser",
  "applicationCategory": "DeveloperApplication",
  "description": "A free browser-based tool to dynamically scrape and extract text, links, images, and videos from any given URL.",
  "offers": { "@type": "Offer", "price": "0.00", "priceCurrency": "USD" }
}
</script>
<style>
  .sidebar-overflow { z-index: 0; }
  .col.col-md-3.col-lg-2.d-none.d-md-block.pt-5 { z-index: -5; }
  .full-bleed-layout { width: 100vw; position: relative; left: 50%; right: 50%; margin-left: -50vw; margin-right: -50vw; padding-left: 2rem; padding-right: 2rem; }
  .tool-card { border: 1px solid var(--bs-border-color-translucent); border-radius: 1rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); background-color: var(--bs-body-bg); }
  .nav-pills .nav-link { border-radius: 0.5rem; font-weight: 500; color: var(--bs-body-color); margin-right: 0.25rem; }
  @media (min-width: 1200px) { .full-bleed-layout { padding-left: 5rem; padding-right: 5rem; } }
</style>
<div class="full-bleed-layout py-5">
  <!-- History Modal Overlay -->
  <div id="historyModal" class="position-fixed top-0 start-0 w-100 h-100 d-none justify-content-center align-items-center" style="background: rgba(0,0,0,0.6); z-index: 1055;">
    <div class="bg-body p-4 rounded-4 shadow-lg w-100 mx-3" style="max-width: 600px; max-height: 80vh; display: flex; flex-direction: column;">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h5 class="fw-bolder mb-0"><i class="fas fa-history me-2 text-primary"></i>Recent Extractions</h5>
        <button class="btn-close" id="closeHistoryBtn"></button>
      </div>
      <div id="historyList" class="list-group overflow-auto flex-grow-1 shadow-sm rounded-3"></div>
    </div>
  </div>
  <div class="row justify-content-center mb-4">
    <div class="col-lg-8 text-center">
      <div class="d-inline-flex align-items-center bg-primary-subtle text-primary px-3 py-1 rounded-pill small fw-bold mb-3"><i class="fas fa-bolt me-2"></i>Lightning Fast DOM Extraction</div>
      <h2 id="scraper-main-title" class="fw-bolder display-6 mb-3">Deep Web Scraper</h2>
      <p class="text-muted fs-5 mb-2">Execute JavaScript and extract all underlying assets instantly.</p>
      <p class="text-body-secondary small fw-bold mb-4">Scrapes remaining today: <strong id="scrapeTriesDisplay" class="text-primary fs-6">3</strong>/3</p>
      <!-- Mobile Responsive Search Bar -->
      <div class="d-flex flex-column flex-sm-row gap-2 bg-body border border-secondary rounded-4 p-2 shadow-sm mb-2 text-start">
        <div class="d-flex align-items-center flex-grow-1 px-2 py-1">
          <i class="fas fa-search text-muted fs-5 me-3"></i>
          <input type="url" id="targetUrl" class="form-control border-0 bg-transparent shadow-none p-0 w-100 fs-6" placeholder="Paste target URL (https://...)" style="outline: none;" required>
        </div>
        <button class="btn btn-primary rounded-3 fw-bold px-4 py-2 flex-shrink-0" id="scrapeBtn">Extract Data</button>
      </div>
      <div id="errorMessage" class="alert alert-danger mt-3 small fw-bold d-none shadow-sm rounded-3 text-start"><i class="fas fa-exclamation-triangle me-2"></i><span id="errorText"></span></div>
    </div>
  </div>
  <div class="row g-4 justify-content-center">
    <div id="loadingOverlay" class="col-lg-8 d-none flex-column align-items-center justify-content-center text-body tool-card p-5 my-4 text-center">
      <div class="spinner-border text-primary mb-3" style="width: 3.5rem; height: 3.5rem; border-width: 0.25rem;" role="status"></div>
      <h4 class="fw-bolder mb-2">Initializing Cloud Browser...</h4>
      <p class="text-muted mb-0">Navigating to URL, rendering JavaScript, and parsing DOM nodes.</p>
      <p class="small text-primary fw-bold mt-2"><i class="fas fa-stopwatch me-1"></i>This can take up to 15 seconds.</p>
    </div>
    <div class="col-12 d-none" id="resultsPanel">
      <div class="d-flex align-items-center justify-content-between mb-3 px-2">
        <h5 class="fw-bold mb-0 text-muted"><i class="fas fa-search me-2"></i>Extraction Results</h5>
        <div class="d-flex gap-2">
          <button id="viewHistoryBtn" class="btn btn-sm btn-outline-primary rounded-pill fw-bold px-3"><i class="fas fa-list me-1"></i>History</button>
          <button id="clearHistoryBtn" class="btn btn-sm btn-outline-danger rounded-pill fw-bold px-3"><i class="fas fa-trash-alt me-1"></i>Clear All</button>
        </div>
      </div>
      <div class="tool-card p-4 p-md-5">
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 border-bottom pb-4 gap-3">
          <div>
            <h4 id="resTitle" class="fw-bolder mb-1 text-body">Page Title</h4>
            <a href="#" target="_blank" id="resUrl" class="text-primary text-decoration-none fw-bold small"><i class="fas fa-external-link-alt me-1"></i>Open Original Source</a>
          </div>
          <button id="downloadJson" class="btn btn-success fw-bold shadow-sm rounded-pill px-4 py-2"><i class="fas fa-file-download me-2"></i>Download JSON</button>
        </div>
        <ul class="nav nav-pills mb-4" id="scraperTabs" role="tablist">
          <li class="nav-item" role="presentation"><button class="nav-link active shadow-sm" data-bs-toggle="pill" data-bs-target="#tab-text" type="button"><i class="fas fa-font me-2"></i>Text (<span id="count-text">0</span>)</button></li>
          <li class="nav-item" role="presentation"><button class="nav-link shadow-sm" data-bs-toggle="pill" data-bs-target="#tab-images" type="button"><i class="fas fa-image me-2"></i>Images (<span id="count-images">0</span>)</button></li>
          <li class="nav-item" role="presentation"><button class="nav-link shadow-sm" data-bs-toggle="pill" data-bs-target="#tab-links" type="button"><i class="fas fa-link me-2"></i>Links (<span id="count-links">0</span>)</button></li>
          <li class="nav-item" role="presentation"><button class="nav-link shadow-sm" data-bs-toggle="pill" data-bs-target="#tab-videos" type="button"><i class="fas fa-video me-2"></i>Videos (<span id="count-videos">0</span>)</button></li>
          <li class="nav-item" role="presentation"><button class="nav-link shadow-sm" data-bs-toggle="pill" data-bs-target="#tab-raw" type="button"><i class="fas fa-code me-2"></i>Raw JSON</button></li>
        </ul>
        <div class="tab-content border-top pt-4" id="scraperTabsContent">
          <div class="tab-pane fade show active" id="tab-text"><div class="row g-3" id="out-text"></div><div id="pag-text"></div></div>
          <div class="tab-pane fade" id="tab-images"><div class="row g-3" id="out-images"></div><div id="pag-images"></div></div>
          <div class="tab-pane fade" id="tab-links"><div class="list-group shadow-sm" id="out-links"></div><div id="pag-links"></div></div>
          <div class="tab-pane fade" id="tab-videos"><div class="list-group shadow-sm" id="out-videos"></div><div id="pag-videos"></div></div>
          <div class="tab-pane fade" id="tab-raw"><pre id="out-raw" class="bg-dark text-success p-4 rounded-4 shadow-inner" style="max-height: 500px; overflow-y: auto; font-family: monospace;"></pre></div>
        </div>
      </div>
    </div>
  </div>
</div>
<script>
window.curPage = { text: 1, images: 1, links: 1, videos: 1 };
window.scrapeHistoryList = [];
window.currentScrapeData = null;
window.changePage = function(tab, dir) { window.curPage[tab] += dir; window.updateTab(tab); };
window.updateTab = function(tab) {
  if (!window.currentScrapeData) return;
  const d = window.currentScrapeData.content[tab === 'text' ? 'texts' : tab];
  const paginated = d.slice((window.curPage[tab] - 1) * 50, window.curPage[tab] * 50);
  let h = '';
  if (tab === 'text') h = paginated.map(t => `<div class="col-12"><div class="p-3 bg-body-tertiary rounded-3 border"><span class="badge bg-secondary mb-2 text-uppercase letter-spacing-1">${t.tag}</span><p class="mb-0 text-body fs-6">${t.text}</p></div></div>`).join('');
  if (tab === 'images') h = paginated.map(img => `<div class="col-6 col-md-4 col-lg-3"><div class="border p-2 rounded-3 h-100 d-flex flex-column align-items-center justify-content-center bg-body-tertiary shadow-sm"><img src="${img.src}" class="img-fluid rounded mb-2" style="max-height: 120px; object-fit: cover; width: 100%;"><small class="text-truncate w-100 d-block text-muted text-center" title="${img.alt}">${img.alt}</small></div></div>`).join('');
  if (tab === 'links') h = paginated.map(l => `<a href="${l.href}" target="_blank" class="list-group-item list-group-item-action d-flex flex-column flex-md-row justify-content-between align-items-md-center p-3"><span class="text-truncate pe-md-3 fw-bold mb-1 mb-md-0 text-primary">${l.text || 'No Anchor Text'}</span><small class="text-muted text-truncate" style="max-width: 100%;">${l.href}</small></a>`).join('');
  if (tab === 'videos') h = paginated.length > 0 ? paginated.map(v => `<a href="${v}" target="_blank" class="list-group-item list-group-item-action text-primary text-truncate p-3 fw-bold"><i class="fas fa-play-circle me-2 text-danger"></i>${v}</a>`).join('') : `<div class="alert alert-secondary border-0"><i class="fas fa-info-circle me-2"></i>No video or iframe sources detected on this page.</div>`;
  document.getElementById(`out-${tab}`).innerHTML = h;
  const tot = Math.ceil(d.length / 50);
  document.getElementById(`pag-${tab}`).innerHTML = tot > 1 ? `<div class="d-flex justify-content-center align-items-center mt-4 gap-3"><button class="btn btn-sm btn-outline-primary fw-bold" onclick="changePage('${tab}', -1)" ${window.curPage[tab] === 1 ? 'disabled' : ''}><i class="fas fa-chevron-left me-1"></i>Prev</button><span class="small fw-bold text-muted">Page ${window.curPage[tab]} of ${tot}</span><button class="btn btn-sm btn-outline-primary fw-bold" onclick="changePage('${tab}', 1)" ${window.curPage[tab] === tot ? 'disabled' : ''}>Next<i class="fas fa-chevron-right ms-1"></i></button></div>` : '';
};
window.loadHistoryItem = function(index) {
  const item = window.scrapeHistoryList[index];
  if (item) {
    window.currentScrapeData = item.data;
    document.getElementById('targetUrl').value = item.url;
    renderData(item.data);
    document.getElementById('resultsPanel').classList.remove('d-none');
  }
  document.getElementById('historyModal').classList.replace('d-flex', 'd-none');
};
document.addEventListener("DOMContentLoaded", () => {
  const API_ENDPOINT = 'https://resume-ats-api.vercel.app/api/scrape';
  let storedTries = localStorage.getItem('scrapeTries');
  let scrapeTries = storedTries !== null ? parseInt(storedTries) : 3;
  const scrapeBtn = document.getElementById('scrapeBtn');
  const targetUrl = document.getElementById('targetUrl');
  const loadingOverlay = document.getElementById('loadingOverlay');
  const resultsPanel = document.getElementById('resultsPanel');
  const errorMessage = document.getElementById('errorMessage');
  const errorText = document.getElementById('errorText');
  const triesDisplay = document.getElementById('scrapeTriesDisplay');
  const historyModal = document.getElementById('historyModal');
  const historyListUI = document.getElementById('historyList');
  function updateUI() {
    triesDisplay.innerText = scrapeTries;
    if (scrapeTries <= 0) {
      scrapeBtn.disabled = true;
      scrapeBtn.innerHTML = '<i class="fas fa-ban me-2"></i>Limit Reached';
    } else {
      scrapeBtn.disabled = false;
      scrapeBtn.innerHTML = 'Extract Data';
    }
  }
  function loadHistory() {
    const history = localStorage.getItem('scrapeHistoryList');
    if (history) {
      try {
        window.scrapeHistoryList = JSON.parse(history);
        if (window.scrapeHistoryList.length > 0) {
          window.currentScrapeData = window.scrapeHistoryList[0].data;
          targetUrl.value = window.scrapeHistoryList[0].url;
          renderData(window.currentScrapeData);
          resultsPanel.classList.remove('d-none');
        }
      } catch (e) { localStorage.removeItem('scrapeHistoryList'); }
    }
  }
  updateUI();
  loadHistory();
  document.getElementById('viewHistoryBtn').addEventListener('click', () => {
    if (window.scrapeHistoryList.length === 0) {
      historyListUI.innerHTML = '<div class="text-muted small text-center p-4 bg-body-tertiary rounded-3 border">No extraction history available yet.</div>';
    } else {
      historyListUI.innerHTML = window.scrapeHistoryList.map((item, index) => `<button class="list-group-item list-group-item-action p-3 d-flex flex-column align-items-start border-start-0 border-end-0" onclick="loadHistoryItem(${index})"><strong class="text-truncate mb-1 text-primary w-100 text-start">${item.title}</strong><small class="text-muted text-truncate w-100 text-start">${item.url}</small><small class="text-muted mt-2 fw-bold" style="font-size: 0.75rem;"><i class="fas fa-clock me-1"></i>${item.date}</small></button>`).join('');
    }
    historyModal.classList.replace('d-none', 'd-flex');
  });
  document.getElementById('closeHistoryBtn').addEventListener('click', () => { historyModal.classList.replace('d-flex', 'd-none'); });
  document.getElementById('clearHistoryBtn').addEventListener('click', () => {
    localStorage.removeItem('scrapeHistoryList');
    window.scrapeHistoryList = [];
    window.currentScrapeData = null;
    resultsPanel.classList.add('d-none');
    targetUrl.value = '';
  });
  scrapeBtn.addEventListener('click', async () => {
    if (scrapeTries <= 0) return;
    const url = targetUrl.value.trim();
    if (!url || !url.startsWith('http')) {
      errorText.textContent = "Please enter a valid URL starting with http:// or https://";
      errorMessage.classList.remove('d-none');
      return;
    }
    errorMessage.classList.add('d-none');
    resultsPanel.classList.add('d-none');
    loadingOverlay.classList.remove('d-none');
    loadingOverlay.classList.add('d-flex');
    scrapeBtn.disabled = true;
    try {
      const response = await fetch(API_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url }) });
      if (!response.ok) { const errData = await response.json(); throw new Error(errData.error || `HTTP Error: ${response.status}`); }
      const data = await response.json();
      window.currentScrapeData = data;
      const newItem = { title: data.metadata.title || 'Unknown Title', url: data.metadata.url || url, date: new Date().toLocaleString(), data: data };
      window.scrapeHistoryList.unshift(newItem);
      if (window.scrapeHistoryList.length > 5) window.scrapeHistoryList.pop();
      try { localStorage.setItem('scrapeHistoryList', JSON.stringify(window.scrapeHistoryList)); } 
      catch (e) { window.scrapeHistoryList = [newItem]; localStorage.setItem('scrapeHistoryList', JSON.stringify(window.scrapeHistoryList)); }
      scrapeTries--;
      localStorage.setItem('scrapeTries', scrapeTries.toString());
      updateUI();
      renderData(data);
      resultsPanel.classList.remove('d-none');
    } catch (err) {
      errorText.textContent = err.message;
      errorMessage.classList.remove('d-none');
      updateUI();
    } finally {
      loadingOverlay.classList.remove('d-flex');
      loadingOverlay.classList.add('d-none');
    }
  });
  function renderData(data) {
    window.curPage = { text: 1, images: 1, links: 1, videos: 1 };
    document.getElementById('resTitle').textContent = data.metadata.title || 'Unknown Title';
    document.getElementById('resUrl').href = data.metadata.url;
    document.getElementById('count-text').textContent = data.counts.texts;
    document.getElementById('count-images').textContent = data.counts.images;
    document.getElementById('count-links').textContent = data.counts.links;
    document.getElementById('count-videos').textContent = data.counts.videos;
    window.updateTab('text');
    window.updateTab('images');
    window.updateTab('links');
    window.updateTab('videos');
    document.getElementById('out-raw').textContent = JSON.stringify(data, null, 2);
  }
  document.getElementById('downloadJson').addEventListener('click', () => {
    if (!window.currentScrapeData) return;
    const blob = new Blob([JSON.stringify(window.currentScrapeData, null, 2)], { type: "application/json" });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `scraped_data_${new Date().getTime()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
});
</script>