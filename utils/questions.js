const main_menu = [
    {
        type : 'list',
        name : 'mainMenu',
        message : "What would you like to do?",
        choices : ['View All Departments', 'View All Roles', 'View All Employees',
         'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role', 'Quit']
    }
];

const department_info = [
    {
        type : 'input',
        name : 'name',
        message : `What's the department name?`
    }
]

const role_info = [
    {
        type : 'input',
        name : 'name',
        message : `What's the role's name?`
    },
    {
        type : 'input',
        name : 'salary',
        message : `What's the role's salary?`
    }
]

const employee_info = [
    {
        type : 'input',
        name : 'firstname',
        message : `What's the employee's first name?`
    },
    {
        type : 'input',
        name : 'lastname',
        message : `What's the employee's last name?`
    }
]

const employee_update = [
    // {
        // type : 'list',
        // name : 'employeeName',
        // message : `Which employee's role do you want to update?`,
        // choices : employeeNames
    // },
    // {
        // type : 'list',
        // name : 'newrole',
        // message : `Which role do you want to assign the selected employee?`,
        // choices : roles2update
    // },
]

module.exports = {main_menu, department_info, role_info, employee_info, employee_update};