require("console.table");
require("dotenv").config();
const inquirer = require('inquirer');
const mysql2 = require("mysql2");

function allRoles(db, cb)
{

    db.query(`SELECT empRole.id AS "ID",
    empRole.title AS "Title", 
    department.depName AS "Department",
    empRole.salary AS "Salary"
    FROM empRole 
    LEFT JOIN department ON empRole.department_id = department.id`, function (err, results)
    {
        if (err)
        {
            console.log(err)
        }
        console.table(results);
        cb();
    })
};

const db = mysql2.createConnection(
    {
        host: "localhost",
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    //console.log("Connected to company_db database")
);


function newRole(db, cb)
{
    const listDep = [];
    db.query("SELECT depName FROM department", (err, results) =>
    {
        if (err)
        {
            console.log(err);
        }
        results.forEach((object) =>
        {
            listDep.push(object.depName);
        })

        inquirer
            .prompt([
                {
                    type: "input",
                    message: "what is the role title?",
                    name: "title"
                },
                {
                    type: "input",
                    message: "what is the salary of this role?",
                    name: "salary"
                },
                {
                    type: "list",
                    message: "What department does this role belong to?",
                    name: "depart",
                    choices: listDep,
                }
            ])
            .then(
                (data) =>
                {
                    const sql = "SELECT id FROM department WHERE depName = ?"
                    const idDep = data.depart
                    db.query(sql, idDep, (err, results) =>
                    {
                        if (err)
                        {
                            console.log(err);
                        }
                        // console.log(results[0].id);
                        // console.log(data.salary)
                        // console.log(data.title)
                        const roleTitle = data.title;
                        const roleSalary = parseInt(data.salary);
                        const roleDep = results[0].id;
                        const roleSql = "INSERT INTO empRole (title, salary, department_id) VALUES (?, ?, ?)";
                        db.query(roleSql, [roleTitle, roleSalary, roleDep], (err, finish) =>
                        {
                            if (err)
                            {
                                console.log(err)
                            }
                            //console.log(finish);
                            cb();
                        })
                    })
                }
            )
    })
};
module.exports = { allRoles, newRole }