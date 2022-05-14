require("console.table");
require("dotenv").config()

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
        //console.table(results);
        cb();
    })
};

module.exports = allEmployees;

//`SELECT movies.movie_name AS movie, reviews.review FROM reviews LEFT JOIN movies ON reviews.movie_id = movies.id ORDER BY movies.movie_name;`