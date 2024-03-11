-- Insert departments
INSERT INTO department (name)
VALUES  ("Sales"),
        ("Engineering"),
        ("Finance"),
        ("HR");

-- Insert roles
INSERT INTO role (title, salary, department_id)
VALUES  ("Sales Manager", 100000, 1),
        ("Salesperson", 80000, 1),
        ("Software Lead Engineer", 150000, 2),
        ("Software Engineer", 120000, 2),
        ("Account Manager", 160000, 3),
        ("Accountant", 125000, 3),
        ("HR Manager", 100000, 4),
        ("Office Admin", 70000, 4);

-- Insert employees
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("John", "Doe", 1, null),
        ("Robert", "Kwok", 2, 1),
        ("Taylor", "Swiff", 3, null),
        ("Chris", "Daughtree", 4, 3),
        ("Britney", "Spear", 5, null),
        ("Maria", "Sharapavo", 6, 5),
        ("Karen", "Kewl", 7, null),
        ("Alicia", "Key", 8, 7);

