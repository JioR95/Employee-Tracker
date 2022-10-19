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

const addRoleQuestions =[ 
    {
        type:'input',
        name:'roleName',
        message: 'Enter name of roles.',
        validate: roleNameInput => {
            if(roleNameInput) {
                return true;
            } else {
                console.log('Enter name of roles.');
                return false;
            }
        }
    },
    {
        type:'input',
        name: 'roleSalary',
        message: 'Enter the salary for the role.',
        validate: roleSalaryInput => {
            if(roleSalaryInput) {
                return ture;
            } else {
                console.log('Enter the salary for new role.');
                return false;
            }
        }

    }
]