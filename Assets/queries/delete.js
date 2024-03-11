const { query } = require('../../index');
const inquirer = require('inquirer');

async function deleteDepartment() {
  try {
    const departments = await query('SELECT * FROM department');

    const { departmentId } = await inquirer.prompt({
      type: 'list',
      name: 'departmentId',
      message: 'Select the department to delete:',
      choices: departments.map((department) => ({
        name: department.name,
        value: department.id,
      })),
    });

    await query('DELETE FROM department WHERE id = ?', [departmentId]);
    console.log('Department deleted successfully.');
  } catch (error) {
    console.error('Error deleting department:', error.message);
  }
}

async function deleteRole() {
  try {
    const roles = await query('SELECT * FROM role');

    const { roleId } = await inquirer.prompt({
      type: 'list',
      name: 'roleId',
      message: 'Select the role to delete:',
      choices: roles.map((role) => ({
        name: role.title,
        value: role.id,
      })),
    });

    await query('DELETE FROM role WHERE id = ?', [roleId]);
    console.log('Role deleted successfully.');
  } catch (error) {
    console.error('Error deleting role:', error.message);
  }
}

async function deleteEmployee() {
  try {
    const employees = await query('SELECT * FROM employee');

    const { employeeId } = await inquirer.prompt({
      type: 'list',
      name: 'employeeId',
      message: 'Select the employee to delete:',
      choices: employees.map((employee) => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
      })),
    });

    await query('DELETE FROM employee WHERE id = ?', [employeeId]);
    console.log('Employee deleted successfully.');
  } catch (error) {
    console.error('Error deleting employee:', error.message);
  }
}

module.exports = { deleteDepartment, deleteRole, deleteEmployee };
