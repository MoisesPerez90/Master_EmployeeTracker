const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const {main_menu, department_info, role_info, employee_info, employee_update} = require('./utils/questions');
const {frontImage} = require('./utils/welcome_index');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password : "123",
        database: "employee_tracker_db"
    },
    console.log("Connected to the employee_tracker_db database")
)

function displayTables(data){
    switch (data.mainMenu){
        case "View All Departments":
            db.query("SELECT * from department", (err, result) => {
                console.log(data.mainMenu);
                console.table(result);
                startapp();
            });
            break;
        case "View All Roles":
            db.query(`
            SELECT role.id, role.title, department.name AS department, role.salary 
            FROM role
            JOIN department ON role.department = department.id`
            , (err, result) => {
                console.log(data.mainMenu);
                console.table(result);
                startapp();
            });
            break;
        case "View All Employees":
            db.query(`
            SELECT emp1.id, emp1.first_name, emp1.last_name, 
            role.title, department.name, role.salary, 
            CONCAT(emp2.first_name,' ', emp2.last_name) AS manager
            FROM employee AS emp1 
            JOIN role ON emp1.role_id = role.id 
            JOIN department ON role.department = department.id
            LEFT JOIN employee AS emp2 ON emp1.manager_id = emp2.id
            `
            , (err, result) => {
                console.log(data.mainMenu);
                console.table(result);
                startapp();
            });
            break;
        case "Add Department":
            addDepartment();
            break;
        case "Add Role":
            addRole();
            break;
        case "Add Employee":
            addEmployee();
            break;
        case "Update Employee Role":
            updateEmployee();
            break;
        case "Quit":
            db.end();
            break;
    }
}

function startapp() {
    inquirer
        .prompt(main_menu)
        .then((response) => {
            displayTables(response);
        })
}

function addDepartment(){
    inquirer
        .prompt(department_info)
        .then((response) =>{
            db.query("INSERT INTO department (name) VALUES (?)", response.name, (err, result) => {
                console.log(`The ${response.name} department has been added to the data base`);
                startapp();
            })
        })
}

function addRole(){
    db.query("SELECT name FROM department", (err, result) =>{
        let departmentNames = result.map(item => item.name);
        role_info.push({
            type : 'list',
            name : 'department',
            message : "What's the role's department?",
            choices: departmentNames
        }); 
        
        inquirer
        .prompt(role_info)
        .then((response) => {
            new index(response).department();        
        })
    })
};

function addEmployee(){
    db.query("SELECT title FROM role", (err, result) => {
        let roleNames = result.map(item => item.title);
        employee_info.push({
        type : 'list',
        name : 'roleTitle',
        message : `What's the employee's role?`,
        choices : roleNames
        });
        
        db.query(`
        SELECT CONCAT(emp.first_name,' ', emp.last_name) AS manager 
        FROM employee AS emp 
        WHERE manager_id IS NULL`, (err, result) =>{
            let managerNames = result.map(item => item.manager);
            managerNames.push("Do not have a manager");
            employee_info.push({
                type : 'list',
                name : 'managerID',
                message : `What's the employee's manager?`,
                choices : managerNames
            })

        inquirer
            .prompt(employee_info)
            .then((response) => {
                new index(response).role()
            })
        })

    })
}

function updateEmployee(){
    db.query("SELECT CONCAT (first_name, ' ', last_name) AS employee FROM employee", (err, result) =>{
        let employeeNames = result.map(item => item.employee);
        employee_update.push({
            type : 'list',
            name : 'employeeName',
            message : `Which employee's role do you want to update?`,
            choices : employeeNames
        })

        db.query("SELECT title FROM role", (err, result) =>{
            let roles2update = result.map(item => item.title);
            employee_update.push({
                type : 'list',
                name : 'newrole',
                message : `Which role do you want to assign the selected employee?`,
                choices : roles2update
            })

            inquirer
            .prompt(employee_update)
            .then((response) => {
                new index(response).employee();
            })
        })
    })
}

class index{
    constructor (response){
        this.response = response;
    }

    department(){
        db.query("SELECT * FROM department", (err, result) =>{
            result.map((item) => {
                if (item.name == this.response.department){ 
                    new insert2DB(this.response).role(item.id);
                }
            });
        })
    }

    role(){
        db.query("SELECT id, title FROM role", (err, result) =>{
            result.map((item)=>{
                if (item.title == this.response.roleTitle){
                    this.manager(item.id);
                }
            })
        })
    }

    manager(roleID){
        if (this.response.managerID == "Do not have a manager"){
            new insert2DB(this.response).employee(roleID, "NULL");
        }

        db.query("SELECT id, CONCAT(emp.first_name,' ', emp.last_name) AS name FROM employee AS emp", (err, result) =>{
            result.map((item)=>{
                if (item.name == this.response.managerID){
                    new insert2DB(this.response).employee(roleID, item.id);
                }
            })
        })
    }

    employee(){
        db.query("SELECT id, CONCAT (first_name, ' ', last_name) AS employee FROM employee", (err, result) =>{
            result.map((item) =>{
                if (item.employee == this.response.employeeName){
                    this.role2update(item.id);
                }
            })
        })
    }

    role2update(employeeID){
        db.query("SELECT id, title FROM role", (err, result) =>{
            result.map((item)=>{
                if (item.title == this.response.newrole){
                    // console.log(employeeID , item.id);
                    new insert2DB(this.response).updateRole(employeeID, item.id);
                }
            })
        })
    }
}

class insert2DB{
    constructor(response){
        this.response = response;
    }

    role(departmentID){
        db.query("INSERT INTO role (title, salary, department) VALUES (?, ?, ?)", [this.response.name, this.response.salary, departmentID], (err, result) => {
            if (err){
                console.error(err);
            }
            else{
                console.log(`The ${this.response.name} role has been added to the data base`);
                startapp(); 
            }
        });  
    }

    employee(roleID, managerID){
        if (managerID == "NULL"){
            db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, NULL)", [this.response.firstname, this.response.lastname, roleID], (err, result) => {
                if (err){
                    console.error(err);
                }
                else{
                    console.log(`${this.response.firstname} has been added to the employees list`),
                    startapp();
                }
            })
        }
        else{
            db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [this.response.firstname, this.response.lastname, roleID, managerID], (err, result) => {
                if (err){
                    console.error(err);
                }
                else{
                    console.log(`${this.response.firstname} has been added to the employees list`),
                    startapp();
                }
            })
        }
    }

    updateRole(employeeID, roleID){
        db.query("UPDATE employee SET role_id = ? where id = ?", [roleID, employeeID], (err, result) =>{
            if (err){
                console.error(err);
            }
            else{
                console.log(`The role of ${this.response.employeeName} has been updated`);
                startapp(); 
            }
        })
    }

}

console.log(frontImage);
startapp();