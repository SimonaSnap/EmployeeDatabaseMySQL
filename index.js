const inquirer = require('inquirer');
const mysql2 = require("mysql2");
require("console.table");
const { newDep } = require("./deparments")
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
        database: process.env.DB_NAME
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
                db.query("SELECT depName AS department FROM department", function (err, results)
                {
                    console.log(results);
                    menu();
                })

            }
            else if (response.menu === "View All Departments")
            {
                db.query("SELECT depName AS department FROM department", function (err, results)
                {
                    console.log(results);
                    menu();
                })

            }
            else if (response.menu === "Add Department")
            {
                newDep();
            }

        })
};


module.exports = db;