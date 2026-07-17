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
  let aiTries = parseInt(localStorage.getItem('schemaAiTries')) || 3;
  let aiGeneratedSchema = null; 

  let currentSchema = 'faq';
  let faqItems = [{ q: '', a: '' }];
  let courseItems = [{ name: '', desc: '', provider: '', url: '' }];

  // --- HISTORY LOGIC (24 HOUR LOCAL STORAGE) ---
  let schemaHistory = JSON.parse(localStorage.getItem('schemaHistory')) || [];

  function cleanAndRenderHistory() {
    const now = new Date().getTime();
    // Keep only items less than 24 hours old (86,400,000 milliseconds)
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

    // Attach click listeners to restore history
    document.querySelectorAll('.history-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = e.currentTarget.getAttribute('data-index');
        aiGeneratedSchema = schemaHistory[idx].schema; // Restore state
        generateOutput();
      });
    });
  }

  function saveToHistory(schemaObj, sourceLabel) {
    const type = schemaObj['@type'] || 'Schema';
    const typeName = Array.isArray(type) ? type[0] : type;
    const finalLabel = `${sourceLabel}: ${typeName}`;

    // Prevent saving consecutive identical schemas
    if (schemaHistory.length > 0 && JSON.stringify(schemaHistory[0].schema) === JSON.stringify(schemaObj)) {
      return;
    }

    schemaHistory.unshift({
      schema: schemaObj,
      label: finalLabel,
      timestamp: new Date().getTime()
    });

    if (schemaHistory.length > 15) schemaHistory.pop(); // Keep array size manageable
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
        // Add schemaHint to the payload
        body: JSON.stringify({ 
          prompt: aiPrompt.value,
          schemaHint: currentSchema 
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate schema");

      aiGeneratedSchema = data.schema;
      generateOutput();
      saveToHistory(data.schema, "AI"); // Save to history

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

  // --- MANUAL FORM LOGIC (HTML Strings) ---
  const schemaForms = {
    faq: '\x3Cdiv id="faqList">\x3C/div>\x3Cbutton id="addFaqBtn" class="btn btn-outline-primary btn-sm fw-bold mt-2 w-100">\x3Ci class="fas fa-plus me-2">\x3C/i>Add Another Question\x3C/button>',
    article: '\x3Cdiv class="row g-3">\x3Cdiv class="col-12">\x3Clabel class="form-label small fw-bold">Headline\x3C/label>\x3Cinput type="text" id="artHeadline" class="form-control border-subtle schema-input" placeholder="e.g. Advanced PHP Architecture">\x3C/div>\x3Cdiv class="col-12">\x3Clabel class="form-label small fw-bold">Description (Optional)\x3C/label>\x3Ctextarea id="artDesc" class="form-control border-subtle schema-input" rows="2" placeholder="Brief article summary...">\x3C/textarea>\x3C/div>\x3Cdiv class="col-md-6">\x3Clabel class="form-label small fw-bold">Author Name\x3C/label>\x3Cinput type="text" id="artAuthor" class="form-control border-subtle schema-input" placeholder="e.g. Taorem Lucky Singh">\x3C/div>\x3Cdiv class="col-md-6">\x3Clabel class="form-label small fw-bold">Publisher\x3C/label>\x3Cinput type="text" id="artPublisher" class="form-control border-subtle schema-input" placeholder="e.g. Tech AI Magazine">\x3C/div>\x3Cdiv class="col-md-6">\x3Clabel class="form-label small fw-bold">Date Published\x3C/label>\x3Cinput type="date" id="artDate" class="form-control border-subtle schema-input">\x3C/div>\x3Cdiv class="col-md-6">\x3Clabel class="form-label small fw-bold">Feature Image URL\x3C/label>\x3Cinput type="url" id="artImage" class="form-control border-subtle schema-input" placeholder="https://...">\x3C/div>\x3C/div>',
    course: '\x3Cdiv id="courseList">\x3C/div>\x3Cbutton id="addCourseBtn" class="btn btn-outline-primary btn-sm fw-bold mt-2 w-100">\x3Ci class="fas fa-plus me-2">\x3C/i>Add Another Course\x3C/button>'
  };

  function renderForm() {
    currentSchema = schemaTypeSelector.value;
    dynamicFormContainer.innerHTML = schemaForms[currentSchema];

    if (currentSchema === 'faq') {
      renderFaqList();
      document.getElementById('addFaqBtn').addEventListener('click', () => {
        faqItems.push({ q: '', a: '' });
        renderFaqList();
        generateOutput();
      });
    } else if (currentSchema === 'course') {
      renderCourseList();
      document.getElementById('addCourseBtn').addEventListener('click', () => {
        courseItems.push({ name: '', desc: '', provider: '', url: '' });
        renderCourseList();
        generateOutput();
      });
    }

    document.querySelectorAll('.schema-input').forEach(input => {
      input.addEventListener('input', () => {
        aiGeneratedSchema = null; 
        generateOutput();
      });
    });

    aiGeneratedSchema = null; 
    generateOutput();
  }

  function renderFaqList() {
    const faqList = document.getElementById('faqList');
    faqList.innerHTML = faqItems.map((item, index) => {
      let deleteBtn = index > 0 ? '\x3Cbutton class="btn btn-sm text-danger p-0 delete-faq" data-index="' + index + '">\x3Ci class="fas fa-trash">\x3C/i>\x3C/button>' : '';
      return '\x3Cdiv class="card p-3 mb-3 bg-body-tertiary border-secondary shadow-sm">\x3Cdiv class="d-flex justify-content-between align-items-center mb-2">\x3Clabel class="form-label small fw-bold mb-0 text-body">Question ' + (index + 1) + '\x3C/label>' + deleteBtn + '\x3C/div>\x3Cinput type="text" class="form-control mb-2 schema-input faq-q bg-body text-body" data-index="' + index + '" value="' + item.q + '" placeholder="Question text...">\x3Ctextarea class="form-control schema-input faq-a bg-body text-body" data-index="' + index + '" rows="2" placeholder="Answer text...">' + item.a + '\x3C/textarea>\x3C/div>';
    }).join('');

    document.querySelectorAll('.faq-q, .faq-a').forEach(input => {
      input.addEventListener('input', (e) => {
        aiGeneratedSchema = null;
        const idx = e.target.getAttribute('data-index');
        if (e.target.classList.contains('faq-q')) faqItems[idx].q = e.target.value;
        if (e.target.classList.contains('faq-a')) faqItems[idx].a = e.target.value;
        generateOutput();
      });
    });

    document.querySelectorAll('.delete-faq').forEach(btn => {
      btn.addEventListener('click', (e) => {
        aiGeneratedSchema = null;
        const idx = e.currentTarget.getAttribute('data-index');
        faqItems.splice(idx, 1);
        renderFaqList();
        generateOutput();
      });
    });
  }

  function renderCourseList() {
    const courseList = document.getElementById('courseList');
    courseList.innerHTML = courseItems.map((item, index) => {
      let deleteBtn = index > 0 ? '\x3Cbutton class="btn btn-sm text-danger p-0 delete-course" data-index="' + index + '">\x3Ci class="fas fa-trash">\x3C/i>\x3C/button>' : '';
      return '\x3Cdiv class="card p-3 mb-3 bg-body-tertiary border-secondary shadow-sm">\x3Cdiv class="d-flex justify-content-between align-items-center mb-3">\x3Clabel class="form-label small fw-bold mb-0 text-body">Course ' + (index + 1) + '\x3C/label>' + deleteBtn + '\x3C/div>\x3Cdiv class="row g-2">\x3Cdiv class="col-12">\x3Cinput type="text" class="form-control form-control-sm schema-input course-name bg-body text-body" data-index="' + index + '" value="' + item.name + '" placeholder="Course Name">\x3C/div>\x3Cdiv class="col-12">\x3Ctextarea class="form-control form-control-sm schema-input course-desc bg-body text-body" data-index="' + index + '" rows="2" placeholder="Brief description...">' + item.desc + '\x3C/textarea>\x3C/div>\x3Cdiv class="col-md-6">\x3Cinput type="text" class="form-control form-control-sm schema-input course-provider bg-body text-body" data-index="' + index + '" value="' + item.provider + '" placeholder="Provider/Institute">\x3C/div>\x3Cdiv class="col-md-6">\x3Cinput type="url" class="form-control form-control-sm schema-input course-url bg-body text-body" data-index="' + index + '" value="' + item.url + '" placeholder="Course URL">\x3C/div>\x3C/div>\x3C/div>';
    }).join('');

    document.querySelectorAll('.course-name, .course-desc, .course-provider, .course-url').forEach(input => {
      input.addEventListener('input', (e) => {
        aiGeneratedSchema = null;
        const idx = e.target.getAttribute('data-index');
        if (e.target.classList.contains('course-name')) courseItems[idx].name = e.target.value;
        if (e.target.classList.contains('course-desc')) courseItems[idx].desc = e.target.value;
        if (e.target.classList.contains('course-provider')) courseItems[idx].provider = e.target.value;
        if (e.target.classList.contains('course-url')) courseItems[idx].url = e.target.value;
        generateOutput();
      });
    });

    document.querySelectorAll('.delete-course').forEach(btn => {
      btn.addEventListener('click', (e) => {
        aiGeneratedSchema = null;
        const idx = e.currentTarget.getAttribute('data-index');
        courseItems.splice(idx, 1);
        renderCourseList();
        generateOutput();
      });
    });
  }

  function buildJsonLD() {
    if (currentSchema === 'faq') {
      return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqItems.map(item => ({
          "@type": "Question",
          "name": item.q || "Your Question Here",
          "acceptedAnswer": { "@type": "Answer", "text": item.a || "Your Answer Here" }
        }))
      };
    } else if (currentSchema === 'article') {
      let schemaObj = {
        "@context": "https://schema.org",
        "@type": "ScholarlyArticle",
        "headline": document.getElementById('artHeadline')?.value || "Article Headline",
        "author": { "@type": "Person", "name": document.getElementById('artAuthor')?.value || "Author Name" },
        "publisher": { "@type": "Organization", "name": document.getElementById('artPublisher')?.value || "Publisher Name" }
      };
      const desc = document.getElementById('artDesc')?.value;
      const date = document.getElementById('artDate')?.value;
      const image = document.getElementById('artImage')?.value;
      if (desc) schemaObj.description = desc;
      if (date) schemaObj.datePublished = date;
      if (image) schemaObj.image = image;
      return schemaObj;
    } else if (currentSchema === 'course') {
      const courses = courseItems.map(item => {
        let c = {
          "@context": "https://schema.org",
          "@type": "Course",
          "name": item.name || "Course Name",
          "description": item.desc || "Course description...",
          "provider": { "@type": "Organization", "name": item.provider || "Institute Name" }
        };
        if (item.url) c.url = item.url;
        return c;
      });
      return courses.length === 1 ? courses[0] : courses;
    }
  }

  function generateOutput() {
    const rawJson = aiGeneratedSchema ? aiGeneratedSchema : buildJsonLD();
    const schemaName = aiGeneratedSchema ? "ai_schema" : currentSchema;
    const isPhp = document.getElementById('formatPhp').checked;
    const formattedJson = JSON.stringify(rawJson, null, 2);

    if (isPhp) {
      codeOutput.textContent = `/**\n * Filter to add custom ${schemaName.toUpperCase()} Schema Data\n */\nadd_filter( 'rank_math/json_ld', function( $data, $jsonld ) {\n    $data['${schemaName}'] = ${formattedJson.replace(/\n/g, '\n    ')};\n    return $data;\n}, 99, 2 );`;
    } else {
      codeOutput.textContent = `\x3Cscript type="application/ld+json">\n${formattedJson}\n\x3C/script>`;
    }
    
    codeOutput.style.color = "#4af626"; // Reset color to green on fresh generation
  }

  // --- LIVE CODE EDITING & SYNTAX VALIDATION (FIXED) ---
  codeOutput.addEventListener('input', () => {
    const text = codeOutput.textContent;
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[0]);
        aiGeneratedSchema = parsed; 
        codeOutput.style.color = "#4af626"; // Green if valid
      } catch (e) {
        codeOutput.style.color = "#ff6b6b"; // Red if parsing fails
      }
    } else {
      codeOutput.style.color = "#ff6b6b"; // Red if a curly brace is missing completely
    }
  });

  schemaTypeSelector.addEventListener('change', () => {
    faqItems = [{ q: '', a: '' }];
    courseItems = [{ name: '', desc: '', provider: '', url: '' }];
    renderForm();
  });

  formatRadios.forEach(radio => radio.addEventListener('change', generateOutput));

  copyBtn.addEventListener('click', async () => {
    const textToCopy = codeOutput.textContent.replace(/<\/script\\>/g, '</script>');
    try {
      await navigator.clipboard.writeText(textToCopy);
      
      // Save manual creations to history on copy
      if (!aiGeneratedSchema) saveToHistory(buildJsonLD(), "Manual");

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
      
      if (!aiGeneratedSchema) saveToHistory(buildJsonLD(), "Manual");

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
  renderForm();
});