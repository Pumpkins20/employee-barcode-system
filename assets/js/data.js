const employees = [
    {
        id: 'EMP001',
        name: 'Budi Santoso',
        position: 'Senior Developer',
        department: 'IT',
        email: 'budi.santoso@company.com',
        phone: '081234567890',
        joinDate: '2020-01-15',
        status: 'active'
    },
    {
        id: 'EMP002',
        name: 'Siti Nurhaliza',
        position: 'HR Manager',
        department: 'Human Resources',
        email: 'siti.nurhaliza@company.com',
        phone: '081234567891',
        joinDate: '2019-05-20',
        status: 'active'
    },
    {
        id: 'EMP003',
        name: 'Ahmad Dahlan',
        position: 'Marketing Executive',
        department: 'Marketing',
        email: 'ahmad.dahlan@company.com',
        phone: '081234567892',
        joinDate: '2021-03-10',
        status: 'active'
    },
    {
        id: 'EMP004',
        name: 'Dewi Kusuma',
        position: 'Finance Analyst',
        department: 'Finance',
        email: 'dewi.kusuma@company.com',
        phone: '081234567893',
        joinDate: '2020-08-01',
        status: 'active'
    },
    {
        id: 'EMP005',
        name: 'Rizki Pratama',
        position: 'UI/UX Designer',
        department: 'Design',
        email: 'rizki.pratama@company.com',
        phone: '081234567894',
        joinDate: '2022-01-05',
        status: 'active'
    },
    {
        id: 'EMP006',
        name: 'Linda Wijaya',
        position: 'Operations Manager',
        department: 'Operations',
        email: 'linda.wijaya@company.com',
        phone: '081234567895',
        joinDate: '2018-11-12',
        status: 'active'
    },
    {
        id: 'EMP007',
        name: 'Andi Wijaya',
        position: 'Product Manager',
        department: 'Product',
        email: 'andi.wijaya@company.com',
        phone: '081234567896',
        joinDate: '2021-07-20',
        status: 'active'
    },
    {
        id: 'EMP008',
        name: 'Maya Sari',
        position: 'Data Analyst',
        department: 'IT',
        email: 'maya.sari@company.com',
        phone: '081234567897',
        joinDate: '2022-03-15',
        status: 'active'
    }
];

// Fungsi helper untuk mendapatkan data karyawan
function getEmployeeById(id) {
    return employees.find(emp => emp.id === id);
}

function getAllEmployees() {
    return employees;
}