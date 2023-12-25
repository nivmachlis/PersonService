// db.js
const { Pool } = require('pg');
const dotenv = require('dotenv');
const fs = require('fs')

dotenv.config();
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

async function initializeDatabase() {
  try {
    console.info({"user": process.env.POSTGRES_USER,
      "host": process.env.POSTGRES_HOST,
      "database": process.env.POSTGRES_DB,
      "password": process.env.POSTGRES_PASSWORD,
      "port": process.env.POSTGRES_PORT}
      );
    const tableExistsQuery = 'SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = $1)';
    const result = await pool.query(tableExistsQuery, ['persons']);
    const tableExists = result.rows[0].exists;

    if (!tableExists) {
      const createTableQuery = fs.readFileSync('./SQL/create_persons_table.sql', 'utf8');
      await pool.query(createTableQuery);
      console.log('Persons table created successfully.');
    } else {
      console.log('Persons table already exists.');
    }
  } catch (error) {
    console.error('Error initializing database:', error.message);
  }
}

module.exports = { pool, initializeDatabase };
