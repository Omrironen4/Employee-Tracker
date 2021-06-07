const mysql = require('mysql');
const inquirer = require('inquirer');
require('dotenv').config();
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',

    port: 3306,

    user: 'root',

    password: process.env.myPassword,

    database: 'employee_tracker'
});

connection.connect((err) => {
    if (err) throw err;
    runSearch();
});


const runSearch = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View All Epmployees',
                'View All Employees By Department',
                'View All Employees By Manager',
                'Add Employee',
                'Remove Employee',
                'Update Employee Role',
                'Update Employee Manager',
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case 'View All Epmployees':
                    viewAllEmp();
                    break;

                case 'View All Employees By Department':
                    viewAllByDep();
                    break;

                case 'View All Employees By Manager':
                    viewAllByMan();
                    break;

                case 'Add Employee':
                    addEmployee();
                    break;

                case 'Remove Employee':
                    removeEmployee();
                    break;

                case 'Update Employee Role':
                    updateRole();
                    break;

                case 'Update Employee Manager':
                    updateManager();
                    break;

                default:
                    console.log(`Invalid action ${answer.action}`);
                    break;
            }
        });
}

const viewAllEmp = () => {}

const addEmployee = () => {}

