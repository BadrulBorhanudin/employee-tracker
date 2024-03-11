// index.js
const mysql = require('mysql2');
const inquirer = require('inquirer');
const { addDepartment, addRole, addEmployee } = require('./Assets/queries/add');
const {
  deleteDepartment,
  deleteRole,
  deleteEmployee,
} = require('./Assets/queries/delete');
const {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  viewEmployeesByManager,
  viewEmployeesByDepartment,
  viewDepartmentBudget,
} = require('./Assets/queries/view');
const {
  updateEmployeeRole,
  updateEmployeeManager,
} = require('./Assets/queries/update');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'employee_tracker_db',
});

function query(sql, values = []) {
  return new Promise((resolve, reject) => {
    db.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
}

module.exports = { query };

async function main() {
  try {
    // Connect to the database
    await db.connect();

    console.log('Employee Tracker is ready!');

    // Display menu and handle user input
    while (true) {
      const { choice } = await inquirer.prompt({
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: [
          'View All Departments',
          'View All Roles',
          'View All Employees',
          'Add a Department',
          'Add a Role',
          'Add an Employee',
          'Update an Employee Role',
          'Update Employee Managers',
          'View Employees by Manager',
          'View Employees by Department',
          'Delete Department',
          'Delete Role',
          'Delete Employee',
          'View Department Budget',
          'Exit',
        ],
      });

      switch (choice) {
        case 'View All Departments':
          await viewAllDepartments();
          break;
        case 'View All Roles':
          await viewAllRoles();
          break;
        case 'View All Employees':
          await viewAllEmployees();
          break;
        case 'Add a Department':
          await addDepartment();
          break;
        case 'Add a Role':
          await addRole();
          break;
        case 'Add an Employee':
          await addEmployee();
          break;
        case 'Update an Employee Role':
          await updateEmployeeRole();
          break;
        case 'Update Employee Managers':
          await updateEmployeeManager();
          break;
        case 'View Employees by Manager':
          await viewEmployeesByManager();
          break;
        case 'View Employees by Department':
          await viewEmployeesByDepartment();
          break;
        case 'Delete Department':
          await deleteDepartment();
          break;
        case 'Delete Role':
          await deleteRole();
          break;
        case 'Delete Employee':
          await deleteEmployee();
          break;
        case 'View Department Budget':
          await viewDepartmentBudget();
          break;
        case 'Exit':
          console.log('Goodbye!');
          process.exit();
        default:
          console.log('Invalid choice. Please try again.');
      }
    }
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    // Close the database connection when done
    await db.end();
  }
}

// Start the application
main();
