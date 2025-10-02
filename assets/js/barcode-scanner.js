// Barcode Scanner Module

let html5QrCode = null;
let isScanning = false;

function startScanner() {
    // Stop existing scanner if running
    if (html5QrCode && isScanning) {
        html5QrCode.stop().then(() => {
            initScanner();
        }).catch(() => {
            initScanner();
        });
    } else {
        initScanner();
    }
}

function stopScanner() {
    if (html5QrCode && isScanning) {
        html5QrCode.stop().then(() => {
            isScanning = false;
            console.log('Scanner stopped');
        }).catch(err => {
            console.error('Error stopping scanner:', err);
        });
    }
}

function initScanner() {
    const readerElement = document.getElementById('reader');
    if (!readerElement) return;

    html5QrCode = new Html5Qrcode("reader");
    
    const config = {
        fps: 10,
        qrbox: { width: 250, height: 150 },
        aspectRatio: 1.777778
    };

    html5QrCode.start(
        { facingMode: "environment" },
        config,
        onScanSuccess,
        onScanFailure
    ).then(() => {
        isScanning = true;
        console.log('Scanner started successfully');
    }).catch(err => {
        console.error('Scanner error:', err);
        showScanResult('error', 'Tidak dapat mengakses kamera. Pastikan Anda memberikan izin akses kamera.');
    });
}

function onScanSuccess(decodedText, decodedResult) {
    console.log('Scanned:', decodedText);
    
    const employee = getEmployeeById(decodedText);
    
    if (employee) {
        showScanResult('success', '✓ Barcode berhasil di-scan!');
        displayEmployeeDetail(employee);
        
        // Optional: Stop scanner after successful scan
        // stopScanner();
    } else {
        showScanResult('error', `✗ Karyawan tidak ditemukan: ${decodedText}`);
        hideEmployeeDetail();
    }
}

function onScanFailure(error) {
    // Tidak perlu menampilkan error untuk setiap scan attempt
    // console.log('Scan failure:', error);
}

function showScanResult(type, message) {
    const resultDiv = document.getElementById('scan-result');
    if (!resultDiv) return;

    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <p class="${type === 'success' ? 'success-msg' : 'error-msg'}">
            ${message}
        </p>
    `;

    // Auto hide after 3 seconds for success
    if (type === 'success') {
        setTimeout(() => {
            resultDiv.style.display = 'none';
        }, 3000);
    }
}

function displayEmployeeDetail(emp) {
    const detailDiv = document.getElementById('employee-detail');
    if (!detailDiv) return;

    const joinDate = new Date(emp.joinDate).toLocaleDateString('id-ID', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    });

    detailDiv.innerHTML = `
        <h2>👤 Detail Karyawan</h2>
        <div class="detail-item">
            <span class="detail-label">Nama:</span>
            <span>${emp.name}</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">ID Karyawan:</span>
            <span>${emp.id}</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">Posisi:</span>
            <span>${emp.position}</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">Departemen:</span>
            <span>${emp.department}</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">Email:</span>
            <span>${emp.email}</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">Telepon:</span>
            <span>${emp.phone}</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">Tanggal Bergabung:</span>
            <span>${joinDate}</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">Status:</span>
            <span class="status-badge status-${emp.status}">
                ${emp.status.toUpperCase()}
            </span>
        </div>
    `;
    
    detailDiv.classList.add('show');
}

function hideEmployeeDetail() {
    const detailDiv = document.getElementById('employee-detail');
    if (detailDiv) {
        detailDiv.classList.remove('show');
    }
}