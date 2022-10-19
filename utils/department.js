const inquirer = require('inquirer');

const getName = [{
    type: 'input',
    name: 'name',
    message: 'Enter name of the department.',
    validate: nameInput => {
        if (nameInput) {
            return true;
        } else {
            console.log('Enter the name of the department.');
            return false;
        }
    }
}];
async function getDepartments() {
    const mysql = require('mysql2/promise');
    const conn = await mysql.createConnection({ 
        host: 'localhost',
        user: 'root',
        password: 'Jae0327!',
        database: 'employee-tracker'
    });
    const [rows, fields] = await conn.execute(`SELECT * FROM departments`);
    await conn.end();
    return rows;
}

