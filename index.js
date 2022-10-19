const inquirer = require('inquirer');
const cTable = require('console.table');

const { getDepartments, addDepartment } = require('./utils/department');
const { getRoles, addRole } = require('./utils/role');
const { getEmployees, addEmployee, updateEmployee } = require('./utils/employee');

const mainQuestions = [
    {
        type: 'list',
        name: 'next',
        message: 'Please select what you would like to do.',
        choices: ['View All Departments', 'Add Department','View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role','Quit']

    }
];

