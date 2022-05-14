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
                    const sql = "SELECT id FROM department WHERE depName = ?";
                    const idDep = data.depart;
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
                                console.log(err);
                            }
                            //console.log(finish);
                            cb();
                        })
                    })
                }
            )
    })
};

function updateRole(db, cb)
{
    selectEmpNames = () =>
    {
        return new Promise((resolve, reject) =>
        {
            db.query("SELECT first_name FROM employee", (error, elements) =>
            {
                if (error)
                {
                    return reject(error);
                }

                return resolve(elements);
            })
        })
    }

    selectRoleTitles = () =>
    {
        return new Promise((resolve, reject) =>
        {
            db.query("SELECT title FROM empRole", (error, titles) =>
            {
                if (error)
                {
                    return reject(error);
                }
                //console.log(titles);
                return resolve(titles);
            })
        })
    }

    async function followQueries()
    {
        const result1 = await selectEmpNames();
        const result2 = await selectRoleTitles();

        const promises = [result1, result2];
        try
        {
            const results = await Promise.all(promises);

            nameArr = [];
            result1.forEach((object) =>
            {
                nameArr.push(object.first_name)
            })
            //console.log(nameArr)

            titleArr = [];
            result2.forEach((object) =>
            {
                titleArr.push(object.title)
            })
            //console.log(titleArr)

            inquirer
                .prompt([
                    {
                        type: "list",
                        message: "Whose role do you want to update? ",
                        name: "person",
                        choices: nameArr
                    },
                    {
                        type: "list",
                        message: "Which role would you like to assign? ",
                        name: "newRole",
                        choices: titleArr
                    }
                ])
                .then((data) =>
                {
                    const sql = "SELECT id from empRole WHERE title = ?";
                    const roleName = data.newRole;
                    db.query(sql, roleName, (err, result) =>
                    {
                        if (err)
                        {
                            console.log(err);
                        }
                        //console.log(result);
                        const person = data.person;
                        const newRole = result[0].id;
                        const sql = `UPDATE employee SET role_id = ? WHERE first_name = ?`;
                        db.query(sql, [newRole, person], (err, results) =>
                        {
                            if (err)
                            {
                                console.log(err);
                            }
                            //console.log(results);
                            cb();
                        })

                    })
                })
        }
        catch (error)
        {
            console.log(error)
        }
    }

    // console.log("before await");
    followQueries();
    // console.log("after await");
}


module.exports = { allRoles, newRole, updateRole }