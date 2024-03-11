const { query } = require('./db');
const inquirer = require('inquirer');

async function viewAllDepartments() {
  try {
    const sql = `SELECT id, name AS Department FROM department`;
    const res = await query(sql);
    console.table(res);
  } catch (err) {
    console.error(err);
  }
}

async function viewAllRoles() {
  try {
    const sql = `
      SELECT role.id, role.title AS role, role.salary, department.name AS department
      FROM role
      INNER JOIN department ON department.id = role.department_id
    `;
    const res = await query(sql);
    console.table(res);
  } catch (err) {
    console.error(err);
  }
}

async function viewAllEmployees() {
  try {
    const sql = `
      SELECT employee.id, employee.first_name, employee.last_name, 
        role.title AS role, department.name AS department, role.salary, 
        CONCAT(manager.first_name, ' ', manager.last_name) AS manager
      FROM employee
      LEFT JOIN employee manager ON manager.id = employee.manager_id
      INNER JOIN role ON role.id = employee.role_id
      INNER JOIN department ON department.id = role.department_id
      ORDER BY employee.id;
    `;
    const res = await query(sql);
    console.table(res);
  } catch (err) {
    console.error(err);
  }
}

async function viewEmployeesByManager() {
  try {
    const managers = await query(
      'SELECT id, first_name, last_name FROM employee WHERE manager_id IS NULL'
    );

    const { managerId } = await inquirer.prompt({
      type: 'list',
      name: 'managerId',
      message: 'Select the manager to view employees:',
      choices: managers.map((manager) => ({
        name: `${manager.first_name} ${manager.last_name}`,
        value: manager.id,
      })),
    });

    const [rows] = await query('SELECT * FROM employee WHERE manager_id = ?', [
      managerId,
    ]);
    console.table(rows);
  } catch (error) {
    console.error('Error viewing employees by manager:', error.message);
  }
}

async function viewEmployeesByDepartment() {
  try {
    const departments = await query('SELECT * FROM department');

    const { departmentId } = await inquirer.prompt({
      type: 'list',
      name: 'departmentId',
      message: 'Select the department to view employees:',
      choices: departments.map((department) => ({
        name: department.name,
        value: department.id,
      })),
    });

    const [rows] = await query(
      'SELECT * FROM employee WHERE role_id IN (SELECT id FROM role WHERE department_id = ?)',
      [departmentId]
    );
    console.table(rows);
  } catch (error) {
    console.error('Error viewing employees by department:', error.message);
  }
}

async function viewDepartmentBudget() {
  try {
    const departments = await query('SELECT * FROM department');

    const { departmentId } = await inquirer.prompt({
      type: 'list',
      name: 'departmentId',
      message: 'Select the department to view budget:',
      choices: departments.map((department) => ({
        name: department.name,
        value: department.id,
      })),
    });

    const [result] = await query(
      'SELECT SUM(salary) AS total_budget FROM role WHERE department_id = ?',
      [departmentId]
    );
    console.log(
      `Total utilized budget for the department: $${result[0].total_budget}`
    );
  } catch (error) {
    console.error('Error viewing department budget:', error.message);
  }
}

module.exports = {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  viewEmployeesByManager,
  viewEmployeesByDepartment,
  viewDepartmentBudget,
};
