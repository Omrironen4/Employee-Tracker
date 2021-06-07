const mysql = require('mysql');
const inquirer = require('inquirer');
require('dotenv').config;
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',

    port: 3306,

    user: 'root',

    password: 'Woodstock69!',

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

const viewAllEmp = () => {
    const query = 'SELECT first_name, last_name, role_id, manager_id FROM employee WHERE ? ? ? ?';
    connection.query(query,)
    // console.table([
    //     {
    //       name: ,
    //       age: 10
    //     }, {
    //       name: 'bar',
    //       age: 20
    //     }
    //   ]);
}

const addEmployee = () => {

    inquirer
        .prompt({
            name: 'name',
            type: 'input',
            message: 'What is the employees first name?'
        })
        .then((answer) => {
            const query = 'INSERT INTO employee SET ?';
            connection.query(query, { first_name: answer.name }, (err, res) => {
                if (err) throw err;
                console.table([
                    {
                        name: answer.name,
                        age: 10
                    }
                ]);

            })
        })


}
