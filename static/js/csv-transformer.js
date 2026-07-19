document.addEventListener("DOMContentLoaded", () => {
  const csvInput = document.getElementById('csvInput');
  const csvFileInput = document.getElementById('csvFileInput');
  const parseBtn = document.getElementById('parseBtn');
  const tablePanel = document.getElementById('tablePanel');
  const tableHead = document.getElementById('tableHead');
  const tableBody = document.getElementById('tableBody');
  const jsonOutput = document.getElementById('jsonOutput');
  const copyJsonBtn = document.getElementById('copyJsonBtn');
  const downloadJsonBtn=document.getElementById("downloadJsonBtn"),delimiterSelect=document.getElementById("delimiterSelect"),formatSelect=document.getElementById("formatSelect"),trimData=document.getElementById("trimData"),clearBtn=document.getElementById("clearBtn"),recordCount=document.getElementById("recordCount");
  let rawData=[];
  let headers = [];
  let columnTypes = {}; 

  const dataTypes = [
    { value: 'string', label: 'Text (String)' },
    { value: 'number', label: 'Number' },
    { value: 'boolean', label: 'Boolean (true/false)' },
    { value: 'date', label: 'Date / Time' },
    { value: 'currency', label: 'Currency (Strip symbols)' },
    { value: 'percentage', label: 'Percentage (to Decimal)' },
    { value: 'array', label: 'Array (split by ;)' },
    { value: 'json', label: 'JSON Object' },
    { value: 'null', label: 'Null' }
  ];

  // 1. Parse CSV
  parseBtn.addEventListener("click",()=>{let a=csvInput.value.trim();if(!a)return alert("Please enter or upload CSV data first.");Papa.parse(a,{header:!0,skipEmptyLines:!0,delimiter:","===delimiterSelect.value?"":delimiterSelect.value,transform:function(b){return trimData.checked?b.trim():b},complete:function(b){b.errors.length&&console.warn("CSV Parsing Errors:",b.errors);rawData=b.data;headers=b.meta.fields;headers.forEach(c=>{columnTypes[c]||(columnTypes[c]="string")});tablePanel.classList.remove("d-none");recordCount.textContent=`${rawData.length} items`;renderTablePreview();generateJsonOutput()}})});clearBtn.addEventListener("click",()=>{csvInput.value="";csvFileInput.value="";rawData=[];headers=[];columnTypes={};tablePanel.classList.add("d-none");jsonOutput.textContent="";recordCount.textContent="0 items"});formatSelect.addEventListener("change",generateJsonOutput);

  // Handle File Uploads
  csvFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
      csvInput.value = event.target.result;
      parseBtn.click();
    };
    reader.readAsText(file);
  });

  // 2. Render Table
  function renderTablePreview() {
    let headHtml = '<tr>';
    headers.forEach(header => {
      let optionsHtml = dataTypes.map(type => 
        `<option value="${type.value}" ${columnTypes[header] === type.value ? 'selected' : ''}>${type.label}</option>`
      ).join('');

      headHtml += `
        <th class="align-middle">
          <div class="mb-1 text-primary small fw-bold">${header}</div>
          <select class="form-select form-select-sm border-secondary type-selector" data-header="${header}">
            ${optionsHtml}
          </select>
        </th>`;
    });
    headHtml += '</tr>';
    tableHead.innerHTML = headHtml;

    document.querySelectorAll('.type-selector').forEach(select => {
      select.addEventListener('change', (e) => {
        const header = e.target.getAttribute('data-header');
        columnTypes[header] = e.target.value;
        generateJsonOutput();
      });
    });

    let bodyHtml = '';
    const previewData = rawData.slice(0, 10);
    
    previewData.forEach(row => {
      bodyHtml += '<tr>';
      headers.forEach(header => {
        const safeVal = String(row[header] || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        bodyHtml += `<td class="text-truncate" style="max-width: 150px;" title="${safeVal}">${safeVal}</td>`;
      });
      bodyHtml += '</tr>';
    });

    if (rawData.length > 10) {
      bodyHtml += `<tr><td colspan="${headers.length}" class="text-center text-muted small fst-italic">... and ${rawData.length - 10} more rows hidden for performance.</td></tr>`;
    }
    
    tableBody.innerHTML = bodyHtml;
  }

  // 3. Transformation Engine
  function generateJsonOutput() {
    if (rawData.length === 0) return;

    const transformedData = rawData.map(row => {
      let newRow = {};
      
      headers.forEach(header => {
        let val = row[header];
        const type = columnTypes[header];

        try {
          if (val === undefined || val === '') {
             newRow[header] = (type === 'null') ? null : "";
             return;
          }

          switch (type) {
            case 'number':
              // Removes commas from standard excel numbers before converting
              newRow[header] = Number(String(val).replace(/,/g, ''));
              break;
            case 'boolean':
              const lowerVal = String(val).toLowerCase().trim();
              newRow[header] = (lowerVal === 'true' || lowerVal === '1' || lowerVal === 'yes');
              break;
            case 'date':
              // Converts standard Excel date strings to standardized ISO format
              const parsedDate = new Date(val);
              newRow[header] = isNaN(parsedDate) ? val : parsedDate.toISOString();
              break;
            case 'currency':
              // Strips out $, €, £, and commas, keeping only the raw numerical value
              newRow[header] = Number(String(val).replace(/[^0-9.-]+/g, ""));
              break;
            case 'percentage':
              // Strips the % symbol and converts to a true decimal (e.g., 85% -> 0.85)
              newRow[header] = Number(String(val).replace(/%/g, "")) / 100;
              break;
            case 'array':
              newRow[header] = String(val).split(';').map(item => item.trim()).filter(item => item !== '');
              break;
            case 'json':
              newRow[header] = JSON.parse(val);
              break;
            case 'null':
              newRow[header] = null;
              break;
            default:
              newRow[header] = String(val);
          }
        } catch (err) {
          newRow[header] = String(val);
        }
      });
      
      return newRow;
    });

    jsonOutput.textContent=JSON.stringify(transformedData,null,parseInt(formatSelect.value))}

  // 4. Export Utilities
  copyJsonBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(jsonOutput.textContent);
      const originalHTML = copyJsonBtn.innerHTML;
      copyJsonBtn.innerHTML = '<i class="fas fa-check me-1"></i>Copied!';
      copyJsonBtn.classList.replace('btn-outline-success', 'btn-success');
      setTimeout(() => {
        copyJsonBtn.innerHTML = originalHTML;
        copyJsonBtn.classList.replace('btn-success', 'btn-outline-success');
      }, 2000);
    } catch (err) {
      alert("Failed to copy text.");
    }
  });

  downloadJsonBtn.addEventListener('click', () => {
    if (!jsonOutput.textContent) return;
    
    const blob = new Blob([jsonOutput.textContent], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "transformed_data.json";
    document.body.appendChild(a);
    a.click();
    
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
});