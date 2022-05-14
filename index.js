const inquirer = require('inquirer');
const mysql2 = require("mysql2");
require("console.table");
const { viewDep, newDep } = require("./scripts/deparments")
const { allEmployees, newEmp } = require("./scripts/employees")
const { allRoles, newRole, updateRole } = require("./scripts/roles")
require("dotenv").config()
//requiring all of the things used in this file
//the consts on lines 4, 5, 6 are all functions that do the individual action items that are in the menu
//i wrote the functions on different files for clarity reasons

const topMenu = [{
    type: "list",
    message: "What would you like to do? ",
    name: "menu",
    choices: [
        "View All Employees",
        "View All Departments",
        "View All Roles",
        "Add Employee",
        "Add Department",
        "Add Role",
        "Update Employee Role",
        "Done"
    ]
}];
//a list prompt that will be inserted to the menu inquirer and this is what will be the backbone of the application

const db = mysql2.createConnection(
    {
        host: "localhost",
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: 3306
    },
    //console.log("Connected to company_db database")
    menu()
);
//this sets up the connection to the database/ the backend part of this application
//this also launches the menu function once the connection has been made

function menu()
{
    inquirer
        .prompt(topMenu)
        .then((response) =>
        {
            if (response.menu === "View All Employees")
            {
                allEmployees(db, menu);
            }
            else if (response.menu === "View All Departments")
            {
                viewDep(db, menu)
            }
            else if (response.menu === "View All Roles")
            {
                allRoles(db, menu)
            }
            else if (response.menu === "Add Employee")
            {
                newEmp(db, menu);
            }
            else if (response.menu === "Add Department")
            {
                newDep(db, menu);
            }
            else if (response.menu === "Add Role")
            {
                newRole(db, menu);
            }
            else if (response.menu === "Update Employee Role")
            {
                updateRole(db, menu);
            }
            else if (response.menu === "Done")
            {
                process.exit();
            }
        })
};
//this is the actual inquirer launch, with each choice option connecting to a different function that would perform different actions then cb to launch the menu function again
//the only option that doens't have the callback is Done, at that point process.exit() will take the user out of the application 