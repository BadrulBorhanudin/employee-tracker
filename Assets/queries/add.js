const { query } = require('./db');
const inquirer = require('inquirer');

async function addDepartment() {
  try {
    const answers = await inquirer.prompt({
      type: 'input',
      name: 'departmentName',
      message: 'Enter the name of the department:',
    });

    await query('INSERT INTO department (name) VALUES (?)', [
      answers.departmentName,
    ]);
    console.log('Department added successfully.');
  } catch (error) {
    console.error('Error adding department:', error.message);
  }
}

async function addRole() {
  try {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'roleName',
        message: 'Enter the name of the role:',
      },
      {
        type: 'input',
        name: 'roleSalary',
        message: 'Enter the salary for the role:',
      },
      {
        type: 'input',
        name: 'departmentId',
        message: 'Enter the department ID for the role:',
      },
    ]);

    await query(
      'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
      [answers.roleName, answers.roleSalary, answers.departmentId]
    );
    console.log('Role added successfully.');
  } catch (error) {
    console.error('Error adding role:', error.message);
  }
}

async function addEmployee() {
  try {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'firstName',
        message: 'Enter the first name of the employee:',
      },
      {
        type: 'input',
        name: 'lastName',
        message: 'Enter the last name of the employee:',
      },
      {
        type: 'input',
        name: 'roleId',
        message: 'Enter the role ID for the employee:',
      },
      {
        type: 'input',
        name: 'managerId',
        message: 'Enter the manager ID for the employee:',
      },
    ]);

    await query(
      'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
      [answers.firstName, answers.lastName, answers.roleId, answers.managerId]
    );
    console.log('Employee added successfully.');
  } catch (error) {
    console.error('Error adding employee:', error.message);
  }
}

module.exports = { addDepartment, addRole, addEmployee };
