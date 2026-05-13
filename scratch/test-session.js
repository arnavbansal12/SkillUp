const { Pool } = require('pg');
require('dotenv').config();

async function test() {
  const url = "postgresql://postgres.wvinhlvothymsluvenmd:Arnavbansal%402007@aws-0-ap-south-1.pooler.supabase.com:5432/postgres?sslmode=require";
  console.log("Testing format Session Mode (5432):", url);
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
