const inquirer = require('inquirer');
const cTable = require('console.table');
const { getRolesArray } = require('./role');

async function getEmployees() {
    const mysql = require('mysql2/promise');
    const conn = await mysql.createConnection({ 
        host: 'localhost',
        user: 'root',
        password: 'Jae0327!!',
        database: 'employee_tracker'
    });

    const [rows, fields] = await conn.execute(`SELECT employees.id, employees.first_name AS 'first name', employees.last_name AS 'last name', roles.title AS position, departments.name AS department, roles.salary AS salary, concat(m.first_name, ' ', m.last_name) AS manager
    FROM employees
    LEFT JOIN roles ON employees.role_id = roles.id
    LEFT JOIN employees AS m ON employees.employee_id = m.id
    JOIN departments ON roles.departments_id = departments.id`);
    await conn.end();
    return rows;
}

async function getEmployeesArray() {
    let employees = await getEmployees();
    let result = [];
    for(var i = 0; i<employees.length; i++) {
        result.push(employees[i]['first name'] + ' ' + employees[i]['last name']);
    }
    return result;
}

async function addEmployee() {
    let roles = await getRolesArray();
    let managers = await getEmployeesArray();
    let employee = await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: "Enter employee's first name.",
            validate: firstNameInput => {
                if(firstNameInput) {
                    return true;
                } else {
                    console.log("Enter the employee's first name.");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'last_name',
            message: "Enter employee's last name.",
            validate: lastNameInput => {
                if(lastNameInput) {
                    return true;
                } else {
                    console.log("Enter the employee's last name.");
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'role',
            message: "Pick a role for the employee: ",
            choices: roles
        },
        {
            type: 'list',
            name: 'manager',
            message: "Pick the manager for this employee: ",
            choices: managers
        }
    ]);
    const mysql = require('mysql2/promise');
    const conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Jae0327!',
        database: 'employee_tracker'
    });

    let roleID = roles.indexOf(employee.role);
    let managerID = managers.indexOf(employee.manager);
    roleID += 1;
    managerID += 1;
    const [rows, fields] = await conn.execute(`INSERT INTO employees (first_name, last_name, role_id, employee_id) VALUES (?,?,?,?)`, [employee.first_name, employee.last_name, roleID, managerID]);
    await conn.end();
    console.log("");
    console.log(`Employee ${employee.first_name} ${employee.last_name} is now added!`);
    return;
};

async function updateEmployee() {
    let roles = await getRolesArray();
    let employees = await getEmployeesArray();
    let employeeUpdate = await inquirer.prompt([
        {
            type: 'list',
            name: 'employee',
            message: " Choose an employee you would like to update: ",
            choices: employees
        },
        {
            type: 'list',
            name: 'role',
            message: "Choose employee's new role: ",
            choices: roles
        }
    ]);

    const mysql = require('mysql2/promise');
    const conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Jae0327!',
        database: 'employee_tracker'
    });

    let roleID = roles.indexOf(employeeUpdate.role);
    let employeeID = employees.indexOf(employeeUpdate.employee);
    roleID += 1;
    employeeID += 1;
    const [rows, fields] = await conn.execute(`UPDATE employees SET role_id = ? WHERE id = ?`, [roleID, employeeID]);
    await conn.end();
    console.log("");
    console.log(`role is now updated!`);
    return;
}

module.exports = {getEmployees,addEmployee,updateEmployee};