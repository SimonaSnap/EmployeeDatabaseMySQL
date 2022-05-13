require("console.table");
require("dotenv").config()

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
    inquirer
        .prompt(
            {
                type: "input",
                message: "what is the role title?",
                name: "title"
            },
            {
                type: "input",
                message: "what is the salary of this role?",
                name: "salary"
            }
        ).then(
            (data) =>
            {
                const roleTitle = data.title
                const sql = "INSERT INTO empRole (title) VALUES (?)";
                db.query(sql, roleTitle, function (err, results)
                {
                    if (err)
                    {
                        console.log(err)
                    }
                    console.log(results);
                    cb();
                })
            }
        )
};

module.exports = { allRoles, newRole }