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

    },
];

const promptUser = () => {
    return inquirer.prompt(mainQuestions);
}

async function startApp() {
    let isFinished = false;

    while(!isFinished) {
        let next = await promptUser();
        if(next.next === 'View All Department') {
            let departments = await getDepartments();
            console.log(``);
            await console.table(departments);
        } else if(next.next === 'Add Department') {
            await addDepartment();
        } else if(next.next === 'View All Employee') {
            let employees = await getEmployees();
            console.log(``);
            await console.table(employees);
        }else if(next.next === 'Add Employee') {
            await addEmployee();
        } else if(next.next === 'Update Employee Role') {
            await updateEmployee();
        } else if(next.next === 'View All Role') {
            let roles = await getRoles();
            console.log(``);
            await console.table(roles);
        } else if(next.next === 'Add Role') {
            await addRole();
        } else {
            isFinished = true;
        }
        console.log(``);
    }
}

startApp();