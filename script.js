const employeeForm = document.getElementById('employeeForm');
const employeeTable = document.getElementById('employeeTable');
const searchInput = document.getElementById('searchInput');

let employees = JSON.parse(localStorage.getItem('employees')) || [];
let editIndex = -1;
let sortDirection = { name: true, designation: true };

renderTable();

// Add or update employee
employeeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const designation = document.getElementById('designation').value;

    const employee = { name, designation };

    if (editIndex >= 0) {
        employees[editIndex] = employee;
        editIndex = -1;
        employeeForm.querySelector('button').textContent = 'Add Employee';
    } else {
        employees.push(employee);
    }

    localStorage.setItem('employees', JSON.stringify(employees));
    employeeForm.reset();
    renderTable();
});

// Search employees
searchInput.addEventListener('input', () => {
    renderTable(searchInput.value.toLowerCase());
});

// Render employee table
function renderTable(filter = '') {
    employeeTable.innerHTML = '';
    employees.forEach((emp, index) => {
        if (emp.name.toLowerCase().includes(filter) || emp.designation.toLowerCase().includes(filter)) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${emp.name}</td>
                <td>${emp.designation}</td>
                <td>
                    <button class="edit-btn" onclick="editEmployee(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteEmployee(${index})">Delete</button>
                </td>
            `;
            employeeTable.appendChild(row);
        }
    });
}

// Delete employee
function deleteEmployee(index) {
    employees.splice(index, 1);
    localStorage.setItem('employees', JSON.stringify(employees));
    renderTable(searchInput.value.toLowerCase());
}

// Edit employee
function editEmployee(index) {
    document.getElementById('name').value = employees[index].name;
    document.getElementById('designation').value = employees[index].designation;
    employeeForm.querySelector('button').textContent = 'Update Employee';
    editIndex = index;
}

// Sort table
function sortTable(column) {
    employees.sort((a, b) => {
        if(a[column].toLowerCase() < b[column].toLowerCase()) return sortDirection[column] ? -1 : 1;
        if(a[column].toLowerCase() > b[column].toLowerCase()) return sortDirection[column] ? 1 : -1;
        return 0;
    });
    sortDirection[column] = !sortDirection[column];
    renderTable(searchInput.value.toLowerCase());
}
