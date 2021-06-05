const mysql = require('mysql');
const inquiewe = require('inquirer');
require('dotenv').config;


const connection = mysql.createConnection({
    host: 'localhost', 

    port: 3306, 

    user: 'root', 

    password: process.env.myPassword,
});