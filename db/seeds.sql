INSERT INTO department (depName)
VALUES ("Administration"),
       ("Sales"),
       ("Engineering"),
       ("Legal"),
       ("Finance");

INSERT INTO empRole (title, salary, department_id)
VALUES ("Salesperson", 80000, 2),
       ("Software Engineer", 120000, 3),
       ("Accountant", 125000, 5),
       ("Lawyer", 190000, 4),
       ("Lead Engineer", 210000, 3);

       
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Martina", "Sophism", 5, NULL),
       ("Steven", "Carmicheal", 1, NULL),
       ("Jennifer", "Bludwig", 2, 1),
       ("Sawyer", "Glasgow", 3,  NULL),
       ("Famina", "Djury", 4, NULL);
       