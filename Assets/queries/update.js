const { query } = require('./db');
const inquirer = require('inquirer');

async function updateEmployeeRole() {
  try {
    const employees = await query(
      'SELECT id, first_name, last_name FROM employee'
    );
    const roles = await query('SELECT id, title FROM role');

    const { employeeId, roleId } = await inquirer.prompt([
      {
        type: 'list',
        name: 'employeeId',
        message: 'Select the employee you want to update:',
        choices: employees.map((employee) => ({
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id,
        })),
      },
      {
        type: 'list',
        name: 'roleId',
        message: 'Select the new role:',
        choices: roles.map((role) => ({
          name: role.title,
          value: role.id,
        })),
      },
    ]);

    await query('UPDATE employee SET role_id = ? WHERE id = ?', [
      roleId,
      employeeId,
    ]);
    console.log('Employee role updated successfully.');
  } catch (error) {
    console.error('Error updating employee role:', error.message);
  }
}

async function updateEmployeeManager() {
  try {
    const employees = await query(
      'SELECT id, first_name, last_name FROM employee WHERE manager_id IS NOT NULL'
    );
    const managers = await query(
      'SELECT id, first_name, last_name FROM employee WHERE manager_id IS NULL'
    );

    const { employeeId, managerId } = await inquirer.prompt([
      {
        type: 'list',
        name: 'employeeId',
        message: 'Select the employee you want to update:',
        choices: employees.map((employee) => ({
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id,
        })),
      },
      {
        type: 'list',
        name: 'managerId',
        message: 'Select the new manager:',
        choices: managers.map((manager) => ({
          name: `${manager.first_name} ${manager.last_name}`,
          value: manager.id,
        })),
      },
    ]);

    await query('UPDATE employee SET manager_id = ? WHERE id = ?', [
      managerId,
      employeeId,
    ]);
    console.log('Employee manager updated successfully.');
  } catch (error) {
    console.error('Error updating employee manager:', error.message);
  }
}

module.exports = { updateEmployeeRole, updateEmployeeManager };
