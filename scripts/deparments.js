const inquirer = require('inquirer');
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
};
//selects everything in the department table to give a table about all the departments and their corresponding id numbers

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
//creates a new department taking the new department from the user input in the inquirer prompt

module.exports = { viewDep, newDep };