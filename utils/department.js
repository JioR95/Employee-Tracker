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
        database: 'employee_tracker'
    });
    const [rows, fields] = await conn.execute(`SELECT * FROM department`);
    await conn.end();
    return rows;
}


async function addDepartment() {
    let name = await inquirer.prompt(getName);
    const mysql = require('mysql2/promise');
    const conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Jae0327!',
        database: 'employee_tracker'
    });
    const [rows, fields] = await conn.execute(`INSERT INTO department (name) VALUES (?)`, [name.name]);
    await conn.end();
    console.log(`The ${name.name} department was added!`)
    return;
}


async function getDepartment() {
    const mysql = require('mysql2/promise');
    const conn = await mysql.createConnection({ 
        host: 'localhost',
        user: 'root',
        password: 'Jae0327!',
        database: 'employee_tracker'
    });


    const [rows, fields] = await conn.execute(`SELECT * FROM department`);
    await conn.end();
    return rows;
}


async function addDepartment() {
    let name = await inquirer.prompt(getName);
    const mysql = require('mysql2/promise');
    const conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Jae0327!',
        database: 'employee_tracker'
    });
    const [rows, fields] = await conn.execute(`INSERT INTO department (name) VALUES (?)`, [name.name]);
    await conn.end();
    console.log(`The ${name.name} department has now been added!`)
    return;
}


async function getDepartmentsArray() {
    let departments = await getDepartments();
    var result = [];
    for(var i = 0; i<departments.length; i++) {
        result.push(departments[i].name);
    }
    return result;
}


module.exports = { getDepartments, addDepartment,getDepartmentsArray};