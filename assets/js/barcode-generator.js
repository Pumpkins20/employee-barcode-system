// Barcode Generator Module

function generateEmployeeCards() {
    const container = document.getElementById('employee-list');
    if (!container) return;
    
    container.innerHTML = '';

    const allEmployees = getAllEmployees();
    
    allEmployees.forEach(emp => {
        const card = createEmployeeCard(emp);
        container.appendChild(card);
        
        // Generate barcode setelah card ditambahkan ke DOM
        generateBarcode(emp.id);
    });
}

function createEmployeeCard(emp) {
    const card = document.createElement('div');
    card.className = 'employee-card';
    card.innerHTML = `
        <h3>${emp.name}</h3>
        <p><strong>ID:</strong> ${emp.id}</p>
        <p><strong>Posisi:</strong> ${emp.position}</p>
        <p><strong>Departemen:</strong> ${emp.department}</p>
        <div class="barcode-container">
            <svg id="barcode-${emp.id}"></svg>
        </div>
        <button class="btn-download" onclick="downloadBarcode('${emp.id}', '${emp.name}')">
            📥 Download Barcode
        </button>
    `;
    return card;
}

function generateBarcode(empId) {
    const barcodeElement = document.querySelector(`#barcode-${empId}`);
    if (!barcodeElement) return;

    try {
        JsBarcode(barcodeElement, empId, {
            format: 'CODE128',
            width: 2,
            height: 60,
            displayValue: true,
            fontSize: 14,
            margin: 10,
            background: '#ffffff',
            lineColor: '#000000'
        });
    } catch (error) {
        console.error('Error generating barcode:', error);
    }
}

function downloadBarcode(empId, empName) {
    const svg = document.querySelector(`#barcode-${empId}`);
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Fill white background
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        
        // Create download link
        const link = document.createElement('a');
        link.download = `barcode_${empId}_${empName.replace(/\s/g, '_')}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
}