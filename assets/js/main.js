// Main Application Logic

document.addEventListener('DOMContentLoaded', function() {
    console.log('Employee Barcode System initialized');
    
    // Initialize tab switching
    initTabSwitching();
    
    // Generate employee cards on page load
    generateEmployeeCards();
});

function initTabSwitching() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            switchTab(tabName);
        });
    });
}

function switchTab(tabName) {
    // Remove active class from all buttons and contents
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });

    // Add active class to selected tab
    const activeButton = document.querySelector(`[data-tab="${tabName}"]`);
    const activeContent = document.getElementById(`${tabName}-tab`);
    
    if (activeButton) activeButton.classList.add('active');
    if (activeContent) activeContent.classList.add('active');

    // Handle scanner based on tab
    if (tabName === 'scan') {
        setTimeout(() => startScanner(), 300);
    } else {
        stopScanner();
    }
}

// Make functions globally accessible for inline onclick handlers
window.downloadBarcode = downloadBarcode;
window.switchTab = switchTab;