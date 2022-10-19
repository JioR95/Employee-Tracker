const inquirer = require('inquirer');
const cTable = require('console.table');
const { getDepartmentsArray } = require('./department');

async function getRoles() {
    const mysql = require('mysql2/promise');
    const conn = await mysql.createConnection({ 
        host: 'localhost',
        user: 'root',
        password: 'Jae0327!',
        database: 'employee_tracker'
    });
    const [rows, fields] = await conn.execute(`SELECT roles.id, roles.title, departments.name AS department, roles.salary
    FROM roles LEFT JOIN departments ON roles.departments_id = departments.id`);
    await conn.end();
    return rows;
}