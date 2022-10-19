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
