const { Pool } = require('pg');
require('dotenv').config();

async function test() {
  console.log("Testing connection to:", process.env.DATABASE_URL);
  const pool = new Pool({ 
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
  try {
    const client = await pool.connect();
    console.log("Successfully connected!");
    const res = await client.query('CREATE TABLE IF NOT EXISTS _prisma_test (id serial primary key)');
    console.log("Table created successfully!");
    await client.query('DROP TABLE _prisma_test');
    console.log("Table dropped successfully!");
    client.release();
  } catch (err) {
    console.error("Connection failed:", err.message);
    if (err.detail) console.error("Detail:", err.detail);
    if (err.hint) console.error("Hint:", err.hint);
  } finally {
    await pool.end();
  }
}

test();
