const inquirer = require('inquirer');
const mysql2 = require("mysql2");
require("console.table");
require("dotenv").config()
const db = require("./index")

function newDep()
{
    inquirer
        .prompt(
            {
                type: "input",
                message: "department name?",
                name: "names"
            }
        ).then(
            (data) =>
            {
                const depname = data.names
                const sql = "INSERT INTO department (depName) VALUES (?)";
                db.query(sql, depname, function (err, results)
                {
                    if (err)
                    {
                        console.log(err)
                    }
                    console.log(results);
                    menu();
                })
            }
        )
};

module.exports = { newDep }