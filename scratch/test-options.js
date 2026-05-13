const { Pool } = require('pg');
require('dotenv').config();

async function test() {
  const url = "postgresql://postgres:Arnavbansal%402007@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?sslmode=require&pgbouncer=true&options=reference%3Dwvinhlvothymsluvenmd";
  console.log("Testing format with options=reference:", url);
  const pool = new Pool({ 
    connectionString: url,
    ssl: {
      rejectUnauthorized: false
    }
  });
  try {
    const client = await pool.connect();
    console.log("SUCCESS!");
    const res = await client.query('SELECT now()');
    console.log("Time:", res.rows[0]);
    client.release();
  } catch (err) {
    console.error("FAILED:", err.message);
  } finally {
    await pool.end();
  }
}

test();
