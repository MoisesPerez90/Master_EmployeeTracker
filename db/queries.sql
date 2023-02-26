-- VIEW ALL DEPARTMENTS
-- SELECT * from department;

-- VIEW ALL ROLES
-- SELECT role.id, role.title, department.name AS department, role.salary 
-- FROM role 
-- JOIN department ON role.department = department.id;

-- VIEW ALL EMPLOYEES
-- SELECT emp1.id, emp1.first_name, emp1.last_name, 
-- role.title, department.name, role.salary, 
-- CONCAT(emp2.first_name,' ', emp2.last_name) AS manager
-- FROM employee AS emp1 
-- JOIN role ON emp1.role_id = role.id 
-- JOIN department ON role.department = department.id
-- LEFT JOIN employee AS emp2 ON emp1.manager_id = emp2.id;

-- ADD DEPARTMENT
-- INSERT INTO department (name)
--     VALUES ("Service");

-- ADD ROLE
-- INSERT INTO role (title, salary, department)
--     VALUES ("Customer Service", "80000", "Service");

-- ADD EMPLOYEE
-- INSERT INTO employee (first_name, last_name, role_id, manager_id)
--     VALUES ("Sam", "Kash", "9", "3");