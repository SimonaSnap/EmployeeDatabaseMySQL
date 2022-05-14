require("console.table");
require("dotenv").config();
const inquirer = require('inquirer');

function allEmployees(db, cb)
{

    db.query(`SELECT employee.id AS ID,
    employee.first_name AS "First Name", 
    employee.last_name AS "Last Name",
    empRole.title AS "Role",
    department.depName AS "Department",
    empRole.salary AS "Salary",
    CONCAT (manager.first_name, " ", manager.last_name) AS "Manager"
    FROM employee
    LEFT JOIN empRole ON employee.role_id = empRole.id
    LEFT JOIN department ON empRole.department_id = department.id
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id`, function (err, results)
    {
        if (err)
        {
            console.log(err)
        }
        console.table(results);
        cb();
    })
};

function newEmp(db, cb)
{
    const listRole = [];
    db.query("SELECT title FROM empRole", (err, results) =>
    {
        if (err)
        {
            console.log(err);
        }
        results.forEach((object) =>
        {
            listRole.push(object.title);
        })
        //console.log(listRole);
    });

    const listEmp = ["None"];
    db.query(`SELECT first_name FROM employee`, (err, results) =>
    {
        if (err)
        {
            console.log(err);
        }
        results.forEach((object) =>
        {
            listEmp.push(object.first_name);
        })
        //console.log(listEmp);
    });

    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the employee's first name? ",
                name: "firstName"
            },
            {
                type: "input",
                message: "What is the employee's last name? ",
                name: "lastName"
            },
            {
                type: "list",
                message: "What is the employee's title? ",
                name: "title",
                choices: listRole
            },
            {
                type: "list",
                message: "Who is this employee's manager? ",
                name: "manager",
                choices: listEmp

            }
        ])
        .then((data) =>
        {
            const sql = "SELECT id from empRole WHERE title = ?";
            const idRole = data.title;
            db.query(sql, idRole, (err, result) =>
            {
                if (err)
                {
                    console.log(err);
                }
                // console.log(result[0].id)
                // console.log(data.firstName)
                // console.log(data.lastName)

                if (data.manager == "None")
                {

                } else
                {
                    const nextSql = "SELECT id from employee WHERE first_name = ?";
                    const manName = data.manager;
                    db.query(nextSql, manName, (err, nextResults) =>
                    {
                        if (err)
                        {
                            console.log(err)
                        }

                        console.log(result[0].id)
                        console.log(data.firstName)
                        console.log(data.lastName)
                        console.log(nextResults[0].id)
                        const titleId = result[0].id;
                        const first = data.firstName;
                        const last = data.lastName;
                        var manId = nextResults[0].id;
                    })
                }
            })
        })
}

module.exports = { allEmployees, newEmp };

//`SELECT movies.movie_name AS movie, reviews.review FROM reviews LEFT JOIN movies ON reviews.movie_id = movies.id ORDER BY movies.movie_name;`