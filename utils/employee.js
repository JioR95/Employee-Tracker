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