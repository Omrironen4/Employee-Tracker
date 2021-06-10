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
    // can you explain the AS department here.. why is that being said? Is it neccessary/
    connection.query('SELECT role.id, role.title, role.salary, department.name AS department FROM role LEFT JOIN department ON role.department_id = department.id', (err, res) => {
        if (err) throw err;
        console.table(res);
        runSearch();
    });
};

// What is the CONCAT manager.first_name? why AS manager
const viewAllEmp = () => {
    const query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee AS manager RIGHT JOIN employee ON employee.manager_id = manager.id LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id`;
    connection.query(query, (err, res) => {
        if (err) throw (err);
        console.table(res);
        runSearch();
    });
};

// ADD DEPARTMENT
const addDep = () => {
    inquirer
        .prompt({
            name: 'department_input',
            type: 'input',
            message: 'What department would you like to add?'
        })
        .then((answer) => {
            connection.query(
                'INSERT INTO department SET ?',
                {
                    name: answer.department_input
                },
                (err) => {
                    if (err) throw err;
                    console.log(`Added ${answer.department_input} department to the database`);
                    viewAllByDep();
                }
            );
        });
};

// ADD ROLE 
const addRole = () => {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        const departmentArray = res.map(x => ({
            name: x.name,
            value: x.id
        }));
        // console.log(departmentArray);

        inquirer
            .prompt([
                {
                    name: 'title',
                    type: 'input',
                    message: 'What is the title of the role?',
                },
                {
                    name: 'salary',
                    type: 'input',
                    message: 'What is the salary of the role?',
                },
                {
                    name: 'departmentId',
                    type: 'list',
                    message: 'What department is the role in?',
                    choices: departmentArray,
                }
            ])
            .then((answer) => {
                connection.query(
                    'INSERT INTO role SET ?',
                    {
                        title: answer.title,
                        salary: answer.salary,
                        department_id: answer.departmentId
                    },
                    (err) => {
                        if (err) throw err;
                        console.log(`Added ${answer.title} role to the database`);
                        runSearch();
                        
                    }
                );
            });
    });
};

// ADD EMPLOYEE
const addEmployee = () => {
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        const employeeRole = res.map(x => ({
            name: x.title,
            value: x.id
        }));
        connection.query('SELECT * FROM employee', (err, res) => {
            if (err) throw err;
            const employeeManager = res.map(x => ({
                name: x.first_name,
                value: x.manager_id
            }));


            inquirer
                .prompt([
                    {
                        name: 'firstName',
                        type: 'input',
                        message: `What is the employee's first name?`
                    },
                    {
                        name: 'lastName',
                        type: 'input',
                        message: `What is the employee's last name?`
                    },
                    {
                        name: 'roleId',
                        type: 'list',
                        message: `What is the employee's role?`,
                        choices: employeeRole
                    },
                    {
                        name: 'managerId',
                        type: 'list',
                        message: `Who is the employee's manager?`,
                        choices: employeeManager
                    }
                ])
                .then((answer) => {
                    connection.query(
                        'INSERT INTO employee SET ?',
                        {
                            first_name: answer.firstName,
                            last_name: answer.lastName,
                            role_id: answer.roleId,
                            manager_id: answer.managerId
                        },
                        (err) => {
                            if (err) throw err;
                            console.log(`Added ${answer.firstName} ${answer.lastName} to the database`);
                            runSearch();
                        }
                    )
                });
        });
    });
};

// UPDATE ROLE 
const updateRole = () => {
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        const employeeRoleArray = res.map(x => ({
            name: x.first_name,
            value: x.role_id
        }));

        connection.query('SELECT * FROM role', (err, res) => {
            if (err) throw err;
            const roleArray = res.map(x => ({
                name: x.title,
                value: x.id
            }));

            inquirer
                .prompt([
                    {
                        name: 'id',
                        type: 'list',
                        message: `Which employee's role do you want to update?`,
                        choices: employeeRoleArray
                    },
                    {
                        name: 'roleId',
                        type: 'list',
                        message: `What is the employee's new role?`,
                        choices: roleArray
                    }
                ])
                .then((answer) => {
                    connection.query(
                        'UPDATE employee SET ? WHERE ?',
                        [
                            {
                                role_id: answer.roleId
                            },
                            {
                                id: answer.id,
                            }
                        ],
                        (err) => {
                            if (err) throw err;
                            console.log(`Updated employee's role`);
                            viewAllEmp();
                        }
                    );
                });
        });
    });
};




