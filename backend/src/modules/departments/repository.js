const pool = require('../../config/db');
async function createDepartment(name, createdBy) {
  const res = await pool.query('INSERT INTO departments (name, created_by) VALUES ($1,$2) RETURNING *', [name,createdBy]);
  return res.rows[0];
}
async function getAll() { return (await pool.query('SELECT * FROM departments WHERE deleted_at IS NULL')).rows; }
module.exports = { createDepartment, getAll };
