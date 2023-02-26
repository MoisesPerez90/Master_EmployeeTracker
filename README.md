# 12 SQL: Employee Tracker

## Task

Developers frequently have to create interfaces that allow non-developers to easily view and interact with information stored in databases. These interfaces are called **content management systems (CMS)**. This app helps you precisly in this issue, this app had been created to build a command-line application from scratch to manage a company's employee database, using Node.js, Inquirer, and MySQL.

## User Story

```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria

```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```

The design of the database schema is shown in the following image:
![image](https://user-images.githubusercontent.com/118077086/221436506-26ef765d-c880-40b5-b7c4-3f7f14e4e51e.png)

An example of the behavior of the app would be presented in the following video link and the next images:
https://drive.google.com/file/d/1BZ0XdAuXV8BVvn-FjEckM44pctdZT-wU/view?usp=sharing

![image](https://user-images.githubusercontent.com/118077086/221436605-217ee08c-256e-4dee-987c-a27ee0726f85.png)
![image](https://user-images.githubusercontent.com/118077086/221436620-018528c2-8f00-43c7-889a-b1beedbafb86.png)
![image](https://user-images.githubusercontent.com/118077086/221436630-cd78bbf8-19f2-46dd-bb2b-0ad21d81128f.png)





