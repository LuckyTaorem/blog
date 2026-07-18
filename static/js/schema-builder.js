document.addEventListener("DOMContentLoaded", () => {
  const schemaTypeSelector = document.getElementById('schemaTypeSelector');
  const dynamicFormContainer = document.getElementById('dynamicFormContainer');
  const codeOutput = document.getElementById('codeOutput');
  const copyBtn = document.getElementById('copyCodeBtn');
  const testBtn = document.getElementById('testRichResultsBtn');
  const formatRadios = document.getElementsByName('outputFormat');

  // AI & History Variables
  const generateAiBtn = document.getElementById('generateAiBtn');
  const aiPrompt = document.getElementById('aiPrompt');
  const aiError = document.getElementById('aiError');
  let storedTries = localStorage.getItem('schemaAiTries');
  let aiTries = storedTries !== null ? parseInt(storedTries) : 3;
  let aiGeneratedSchema = null; 

  let currentSchema = 'faq';
  let currentManualSchemaObj = {};

  // --- HISTORY LOGIC (24 HOUR LOCAL STORAGE) ---
  let schemaHistory = JSON.parse(localStorage.getItem('schemaHistory')) || [];

  function cleanAndRenderHistory() {
    const now = new Date().getTime();
    schemaHistory = schemaHistory.filter(item => now - item.timestamp < 86400000);
    localStorage.setItem('schemaHistory', JSON.stringify(schemaHistory));

    const historyList = document.getElementById('historyList');
    
    if (schemaHistory.length === 0) {
      historyList.innerHTML = '<div class="text-secondary small fst-italic">No recent schemas. Generated schemas will appear here.</div>';
      return;
    }

    historyList.innerHTML = schemaHistory.map((item, index) => {
      const timeStr = new Date(item.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
      return `
        <button class="btn btn-sm btn-outline-secondary text-start d-flex justify-content-between align-items-center history-item" data-index="${index}">
          <span class="text-truncate fw-bold text-light" style="max-width: 75%;">${item.label}</span>
          <span class="small text-info" style="font-size: 0.75rem;">${timeStr}</span>
        </button>
      `;
    }).join('');

    document.querySelectorAll('.history-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = e.currentTarget.getAttribute('data-index');
        const restoredSchema = schemaHistory[idx].schema;
        
        aiGeneratedSchema = restoredSchema; 
        renderFormFromObject(restoredSchema); 
        generateOutput();
      });
    });
  }

  function saveToHistory(schemaObj, sourceLabel) {
    const type = schemaObj['@type'] || 'Schema';
    const typeName = Array.isArray(type) ? type[0] : type;
    const finalLabel = `${sourceLabel}: ${typeName}`;

    if (schemaHistory.length > 0 && JSON.stringify(schemaHistory[0].schema) === JSON.stringify(schemaObj)) {
      return;
    }

    schemaHistory.unshift({
      schema: schemaObj,
      label: finalLabel,
      timestamp: new Date().getTime()
    });

    if (schemaHistory.length > 15) schemaHistory.pop();
    cleanAndRenderHistory();
  }

  document.getElementById('clearHistoryBtn').addEventListener('click', () => {
    schemaHistory = [];
    cleanAndRenderHistory();
  });

  // --- AI LOGIC ---
  function updateAiUI() {
    document.getElementById('aiTries').textContent = aiTries;
    if (aiTries <= 0) {
      generateAiBtn.disabled = true;
      generateAiBtn.innerHTML = '<i class="fas fa-ban me-2"></i>Limit Reached';
    }
  }

  generateAiBtn.addEventListener('click', async () => {
    if (aiTries <= 0 || !aiPrompt.value.trim()) return;

    aiError.classList.add('d-none');
    generateAiBtn.disabled = true;
    generateAiBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Generating...';

    try {
      const res = await fetch('https://resume-ats-api.vercel.app/api/generate-schema', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: aiPrompt.value,
          schemaHint: currentSchema 
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate schema");

      aiGeneratedSchema = data.schema;
      renderFormFromObject(data.schema);
      generateOutput();
      saveToHistory(data.schema, "AI"); 

      aiTries--;
      localStorage.setItem('schemaAiTries', aiTries);
      updateAiUI();

    } catch (err) {
      aiError.textContent = err.message;
      aiError.classList.remove('d-none');
    } finally {
      if (aiTries > 0) {
        generateAiBtn.disabled = false;
        generateAiBtn.innerHTML = '<i class="fas fa-magic me-2"></i>Generate Schema';
      }
    }
  });

  // --- DYNAMIC FORM ENGINE (WITH NESTED ARRAY LOOPING) ---
  const schemaExamples = {
    article: `{ "@context": "https://schema.org", "@type": "NewsArticle", "headline": "Title of a News Article", "image": [ "https://example.com/photos/1x1/photo.jpg" ], "datePublished": "2026-03-29T08:00:00+08:00", "dateModified": "2026-03-29T09:20:00+08:00", "author": [{ "@type": "Person", "name": "Taorem Lucky Singh", "url": "https://example.com/profile/lucky123" }] }`,
    books: `{ "@context": "https://schema.org", "@type": "DataFeed", "dataFeedElement": [ { "@context": "https://schema.org", "@type": "Book", "@id": "https://example.com/work/the_catcher_in_the_rye", "url": "https://example.com/work/the_catcher_in_the_rye", "name": "The Catcher in the Rye", "author": { "@type": "Person", "name": "J.D. Salinger" } } ] }`,
    breadcrumb: `{ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Books", "item": "https://example.com/books" }] }`,
    Carousel: `{ "@context":"https://schema.org", "@type":"ItemList", "itemListElement":[ { "@type":"ListItem", "position":1, "url":"https://example.com/cookie.html" } ] }`,
    dataset: `{ "@context":"https://schema.org/", "@type":"Dataset", "name":"NCDC Storm Events Database", "description":"Storm Data description...", "url":"https://catalog.data.gov/dataset", "keywords":[ "ATMOSPHERE", "CYCLONES" ], "creator":{ "@type":"Organization", "name":"NOAA" } }`,
    forum: `{ "@context": "https://schema.org", "@type": "DiscussionForumPosting", "headline": "Very Popular Thread", "comment": [{ "@type": "Comment", "text": "This should not be this popular" }] }`,
    Quiz: `{ "@context": "https://schema.org/", "@type": "Quiz", "about": { "@type": "Thing", "name": "Cell Transport" }, "hasPart": [ { "@context": "https://schema.org/", "@type": "Question", "eduQuestionType": "Flashcard", "text": "Fact about cell membrane.", "acceptedAnswer": { "@type": "Answer", "text": "cell membrane" } } ] }`,
    EmployerAggregateRating: `{ "@context" : "https://schema.org/", "@type": "EmployerAggregateRating", "itemReviewed": { "@type": "Organization", "name" : "Best Coffee Shop" }, "ratingValue": 91, "bestRating": 100, "worstRating": 1, "ratingCount" : "10561" }`,
    Event: `{ "@context": "https://schema.org", "@type": "Event", "name": "Adventures of Kira", "startDate": "2026-07-21T19:00-05:00", "location": { "@type": "Place", "name": "Stadium", "address": { "@type": "PostalAddress", "streetAddress": "100 West Dr" } }, "offers": { "@type": "Offer", "price": 30, "priceCurrency": "USD" } }`,
    Image: `{ "@context": "https://schema.org/", "@type": "ImageObject", "contentUrl": "https://example.com/photo.jpg", "creator": { "@type": "Person", "name": "Brixton Brownstone" } }`,
    JobPosting: `{ "@context" : "https://schema.org/", "@type" : "JobPosting", "title" : "Software Engineer", "datePosted" : "2026-01-18", "hiringOrganization" : { "@type" : "Organization", "name" : "Google" }, "baseSalary": { "@type": "MonetaryAmount", "currency": "USD", "value": { "@type": "QuantitativeValue", "value": 40.00, "unitText": "HOUR" } } }`,
    LocalBusiness: `{ "@context": "https://schema.org", "@type": "Restaurant", "name": "Dave's Steak House", "telephone": "+12122459600", "servesCuisine": "American", "priceRange": "$$$", "address": { "@type": "PostalAddress", "streetAddress": "148 W 51st St" } }`,
    Organization: `{ "@context": "https://schema.org", "@type": "Organization", "url": "https://www.example.com", "name": "Example Corporation", "email": "contact@example.com" }`,
    Recipe: `{ "@context": "https://schema.org/", "@type": "Recipe", "name": "Non-Alcoholic Piña Colada", "author": { "@type": "Person", "name": "Mary Stone" }, "prepTime": "PT1M", "recipeIngredient": [ "400ml of pineapple juice", "ice" ] }`,
    Video: `{ "@context": "https://schema.org", "@type": "VideoObject", "name": "Self-driving bicycle", "uploadDate": "2026-03-31T08:00:00+08:00", "duration": "PT1M54S", "contentUrl": "https://www.example.com/video.mp4" }`,
    Movie: `{ "@context":"https://schema.org", "@type":"ItemList", "itemListElement":[ { "@type":"ListItem", "position":1, "url":"https://example.com/a-star-is-born.html" } ] }`,
    Product: `{ "@context": "https://schema.org/", "@type": "Product", "name": "Executive Anvil", "description": "Sleeker than ACME's Classic Anvil", "aggregateRating": { "@type": "AggregateRating", "ratingValue": 4.4, "reviewCount": 89 } }`,
    faq: `{ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [ { "@type": "Question", "name": "Example Question?", "acceptedAnswer": { "@type": "Answer", "text": "Example Answer." } } ] }`,
    course: `{ "@context": "https://schema.org", "@type": "Course", "name": "Intro to CS", "description": "Basics of CS.", "provider": { "@type": "Organization", "name": "University of Tech" } }`
  };

  function renderFormFromObject(schemaObj) {
    currentManualSchemaObj = JSON.parse(JSON.stringify(schemaObj));
    
    let html = '<div class="row g-3">';
    html += buildDynamicInputs(currentManualSchemaObj, '');
    html += '</div>';
    
    dynamicFormContainer.innerHTML = html;

    // Attach listeners to input fields
    document.querySelectorAll('.dynamic-schema-input').forEach(input => {
      input.addEventListener('input', handleDynamicInput);
    });

    // Attach listeners for dynamic Add/Delete Array items
    document.querySelectorAll('.add-array-item').forEach(btn => btn.addEventListener('click', handleAddArrayItem));
    document.querySelectorAll('.delete-array-item').forEach(btn => btn.addEventListener('click', handleDeleteArrayItem));
  }

  function renderDynamicForm() {
    currentSchema = schemaTypeSelector.value;
    const templateStr = schemaExamples[currentSchema] || schemaExamples['faq'];
    
    try {
      const parsedTemplate = JSON.parse(templateStr);
      renderFormFromObject(parsedTemplate);
      
      aiGeneratedSchema = null; 
      generateOutput(currentManualSchemaObj);
    } catch (e) {
      console.error("Error parsing schema template:", e);
    }
  }

  // Helper to prevent quotes/special characters from breaking input interactivity
  function escapeHTML(str) {
      if (str === null || str === undefined) return '';
      return String(str)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
  }

  function buildDynamicInputs(obj, pathPrefix) {
    let html = '';
    for (const key in obj) {
      if (key === '@context') continue; 
      
      const val = obj[key];
      const currentPath = pathPrefix ? `${pathPrefix}.${key}` : key;
      const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

      if (Array.isArray(val)) {
        // --- RENDER DYNAMIC LIST/ARRAY ITEMS ---
        html += `<div class="col-12 border border-info border-opacity-50 rounded-3 p-3 mt-3 mb-2 bg-body-tertiary">
                   <h6 class="small fw-bold text-info mb-3"><i class="fas fa-list me-2"></i>${label}</h6>
                   <div class="row g-3">`;
                   
        val.forEach((item, index) => {
          const itemPath = `${currentPath}.${index}`;
          
          // Clean outline button without absolute positioning
          const deleteBtn = val.length > 1 
              ? `<button type="button" class="btn btn-outline-danger btn-sm delete-array-item" data-path="${itemPath}"><i class="fas fa-trash me-1"></i>Remove</button>` 
              : '';

          // Flexbox header groups the badge and button safely above the inputs
          html += `<div class="col-12 bg-body border border-secondary border-opacity-25 rounded p-3 shadow-sm mb-2">
                     <div class="d-flex justify-content-between align-items-center mb-3">
                       <span class="badge bg-secondary opacity-75">Item ${index + 1}</span>
                       ${deleteBtn}
                     </div>
                     <div class="row g-2">`;
                     
          if (typeof item === 'object' && item !== null) {
            html += buildDynamicInputs(item, itemPath); 
          } else {
            html += `<div class="col-12">
                       <input type="text" class="form-control form-control-sm border-subtle dynamic-schema-input" data-type="primitive" data-path="${itemPath}" value="${escapeHTML(item)}">
                     </div>`;
          }
          html += `  </div>
                   </div>`;
        });
        
        // Fixed Add Button: Added type="button"
        html += `  </div>
                   <button type="button" class="btn btn-outline-info btn-sm fw-bold w-100 mt-3 add-array-item" data-path="${currentPath}">
                     <i class="fas fa-plus me-2"></i>Add Another ${label} Item
                   </button>
                 </div>`;

      } else if (typeof val === 'object' && val !== null) {
        // Nested objects
        html += `<div class="col-12 border-start border-info border-3 ps-3 mt-3 mb-2">
                   <h6 class="small fw-bold text-info mb-2">${label}</h6>
                   <div class="row g-2 position-relative" style="z-index: 2;">${buildDynamicInputs(val, currentPath)}</div>
                 </div>`;
      } else {
        // Standard Input escaped to prevent un-interactable DOM corruption
        html += `<div class="col-12 col-md-6 position-relative" style="z-index: 2;">
                   <label class="form-label small fw-bold text-body">${label}</label>
                   <input type="text" class="form-control form-control-sm border-subtle dynamic-schema-input bg-body text-body" data-type="primitive" data-path="${currentPath}" value="${escapeHTML(val)}">
                 </div>`;
      }
    }
    return html;
  }

  // --- ARRAY CLONING & MODIFICATION LOGIC ---
  function generateBlankTemplate(obj) {
    if (Array.isArray(obj)) return [];
    if (typeof obj === 'object' && obj !== null) {
        const clone = {};
        for (let k in obj) {
            // Preserve structural markers, empty out actual values
            if (k === '@context' || k === '@type') clone[k] = obj[k];
            else clone[k] = generateBlankTemplate(obj[k]);
        }
        return clone;
    }
    return ""; // Convert primitive values to empty strings
  }

  function handleAddArrayItem(e) {
    const path = e.currentTarget.getAttribute('data-path');
    const parts = path.split('.');
    let arr = currentManualSchemaObj;
    
    // Traverse to the array location
    for (let i = 0; i < parts.length; i++) { arr = arr[parts[i]]; }
    
    if (Array.isArray(arr) && arr.length > 0) {
      // Create an exact mathematical clone of the first item, but empty its values
      const blankItem = generateBlankTemplate(arr[0]);
      arr.push(blankItem);
      
      // Rebuild UI and update Code
      renderFormFromObject(currentManualSchemaObj);
      generateOutput();
    }
  }

  function handleDeleteArrayItem(e) {
    const path = e.currentTarget.getAttribute('data-path');
    const parts = path.split('.');
    const indexToRemove = parseInt(parts.pop()); 
    let arr = currentManualSchemaObj;
    
    // Traverse to the parent array
    for (let i = 0; i < parts.length; i++) { arr = arr[parts[i]]; }
    
    if (Array.isArray(arr)) {
      arr.splice(indexToRemove, 1);
      renderFormFromObject(currentManualSchemaObj);
      generateOutput();
    }
  }

  // --- STANDARD INPUT LOGIC ---
  function handleDynamicInput(e) {
    const path = e.target.getAttribute('data-path');
    let val = e.target.value;

    const parts = path.split('.');
    let current = currentManualSchemaObj;
    
    // Traverse to the target property (works identically for objects and arrays)
    for (let i = 0; i < parts.length - 1; i++) {
      current = current[parts[i]];
    }
    current[parts[parts.length - 1]] = val;

    aiGeneratedSchema = null;
    generateOutput(currentManualSchemaObj);
  }

  function generateOutput(manualObj = null) {
    const activeSchema = aiGeneratedSchema ? aiGeneratedSchema : (manualObj || currentManualSchemaObj);
    const schemaName = aiGeneratedSchema ? "ai_schema" : currentSchema;
    
    if (!aiGeneratedSchema && schemaExamples[currentSchema]) {
       const templateRoot = JSON.parse(schemaExamples[currentSchema]);
       activeSchema['@context'] = templateRoot['@context'];
       activeSchema['@type'] = templateRoot['@type'];
    }

    const isPhp = document.getElementById('formatPhp').checked;
    const formattedJson = JSON.stringify(activeSchema, null, 2);

    if (isPhp) {
      codeOutput.textContent = `/**\n * Filter to add custom ${schemaName.toUpperCase()} Schema Data\n */\nadd_filter( 'rank_math/json_ld', function( $data, $jsonld ) {\n    $data['${schemaName}'] = ${formattedJson.replace(/\n/g, '\n    ')};\n    return $data;\n}, 99, 2 );`;
    } else {
      codeOutput.textContent = `\x3Cscript type="application/ld+json">\n${formattedJson}\n\x3C/script>`;
    }
    
    codeOutput.style.color = "#4af626"; 
  }

  // --- LIVE CODE EDITING & SYNTAX VALIDATION ---
  codeOutput.addEventListener('input', () => {
    const text = codeOutput.textContent;
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[0]);
        aiGeneratedSchema = parsed; 
        codeOutput.style.color = "#4af626"; 
      } catch (e) {
        codeOutput.style.color = "#ff6b6b"; 
      }
    } else {
      codeOutput.style.color = "#ff6b6b"; 
    }
  });

  schemaTypeSelector.addEventListener('change', renderDynamicForm);

  formatRadios.forEach(radio => radio.addEventListener('change', () => generateOutput(currentManualSchemaObj)));

  copyBtn.addEventListener('click', async () => {
    const textToCopy = codeOutput.textContent.replace(/<\/script\\>/g, '</script>');
    try {
      await navigator.clipboard.writeText(textToCopy);
      
      if (!aiGeneratedSchema) saveToHistory(currentManualSchemaObj, "Manual");

      const originalHTML = copyBtn.innerHTML;
      copyBtn.classList.replace('btn-primary', 'btn-success');
      copyBtn.innerHTML = '<i class="fas fa-check me-2"></i>Copied!';
      setTimeout(() => {
        copyBtn.classList.replace('btn-success', 'btn-primary');
        copyBtn.innerHTML = originalHTML;
      }, 2000);
    } catch(err) {
      alert("Failed to copy. Please select the text manually.");
    }
  });

  testBtn.addEventListener('click', async () => {
    const richResultsWindow = window.open('https://search.google.com/test/rich-results', '_blank');
    const textToCopy = codeOutput.textContent.replace(/<\/script\\>/g, '</script>');
    try {
      await navigator.clipboard.writeText(textToCopy);
      
      if (!aiGeneratedSchema) saveToHistory(currentManualSchemaObj, "Manual");

      const originalHTML = testBtn.innerHTML;
      testBtn.classList.replace('btn-outline-info', 'btn-success');
      testBtn.innerHTML = '<i class="fas fa-check me-2"></i>Copied! Paste there.';
      setTimeout(() => {
        testBtn.classList.replace('btn-success', 'btn-outline-info');
        testBtn.innerHTML = originalHTML;
      }, 3000);
    } catch(err) {
      console.error(err);
    }
  });

  // Initialize
  updateAiUI();
  cleanAndRenderHistory();
  renderDynamicForm(); 
});