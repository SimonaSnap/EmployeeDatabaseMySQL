const inquirer = require('inquirer');
const mysql2 = require("mysql2");
require("console.table");
require("dotenv").config()

function viewDep(db, cb)
{
    db.query("SELECT id, depName AS department FROM department", function (err, results)
    {
        if (err)
        {
            console.log(err)
        }
        console.table(results);
        cb();
    })
}

function newDep(db, cb)
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
                    //console.log(results);
                    cb();
                })
            }
        )
};

module.exports = { viewDep, newDep };