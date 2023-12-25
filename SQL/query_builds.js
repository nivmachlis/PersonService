// queryBuilder.js
const { pool } = require('./postgresql');

async function getAll(table) {
  try {
    const result = await pool.query(`SELECT * FROM ${table}`);
    return result.rows;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching data');
  }
}

async function create(table, columns, values) {
  try {
    const result = await pool.query(`INSERT INTO ${table}(${columns.join(', ')}) VALUES(${values.map((_, i) => `$${i + 1}`).join(', ')}) RETURNING *`, values);
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error('Error creating record');
  }
}

async function update(table, idColumn, id, updates) {
  try {
    const updateSet = Object.entries(updates).map(([key, value], i) => `${key} = $${i + 1}`).join(', ');
    const result = await pool.query(`UPDATE ${table} SET ${updateSet} WHERE ${idColumn} = $${Object.keys(updates).length + 1} RETURNING *`, [...Object.values(updates), id]);
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error('Error updating record');
  }
}

async function remove(table, idColumn, id) {
  try {
    const result = await pool.query(`DELETE FROM ${table} WHERE ${idColumn} = $1 RETURNING *`, [id]);
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error('Error deleting record');
  }
}

async function getByColumns(table, columns) {
    try {
      const keys = Object.keys(columns);
      const values = keys.map((key) => columns[key]);
      const whereClause = keys.map((key, index) => `${key} = $${index + 1}`).join(' AND ');
  
      const result = await pool.query(`SELECT * FROM ${table} WHERE ${whereClause}`, values);
      return result.rows;
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching data by columns');
    }
  }

module.exports = { getAll, create, update, remove, getByColumns };
