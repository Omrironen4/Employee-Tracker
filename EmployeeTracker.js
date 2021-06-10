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
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add Department',
                'Add Role',
                'Add Employee',
                'Update Employee Role',
                'Update Employee Manager', //bonus
                'View Employees by manager', //bonus
                'Delete Departments', //bonus
                'Delete Roles', //bonus
                'Delete Emplpoyees', //bonus
                'View Combined Department Salary', //bonus
            ],
        })
        .then((answer) => {
            switch (answer.action) {

                case 'View All Departments':
                    viewAllByDep();
                    break;

                case 'View All Roles':
                    viewAllRoles();
                    break;

                case 'View All Employees':
                    viewAllEmp();
                    break;

                case 'Add Department':
                    addDep();
                    break;

                case 'Add Role':
                    addRole();
                    break;

                case 'Add Employee':
                    addEmployee();
                    break;

                case 'Update Employee Role':
                    updateRole();
                    break;
               
                default:
                    console.log(`Invalid action ${answer.action}`);
                    break;
            }
        });
}


const viewAllByDep = () => {
    const query = 'SELECT department.id, department.name FROM department ORDER BY id';
    connection.query(query, (err, res) => {
        if (err) throw (err);
        console.table(res);
        runSearch();
    });
}

const viewAllRoles = () => {
  connection.query('SELECT role.id, role.title, role.salary, department.name AS department FROM role LEFT JOIN department ON role.department_id = department.id', (err, res) => {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
};


const viewAllEmp = () => {
    const query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee AS manager RIGHT JOIN employee ON employee.manager_id = manager.id LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id`;
    connection.query(query, (err, res) => {
        if (err) throw (err);
        console.table(res);
        runSearch();
    });
};


const addDep = () => {

};

const addRole = () => {

};

const addEmployee = async () => {

};

const updateRole = () => {

};




