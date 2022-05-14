const inquirer = require('inquirer');
const mysql2 = require("mysql2");
require("console.table");
const { viewDep, newDep } = require("./deparments")
const { allEmployees, newEmp } = require("./employees")
const { allRoles, newRole, updateRole } = require("./roles")
require("dotenv").config()

//console.table([{ name: "andrew", age: "26" }, { name: "simona", age: "23" }])
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