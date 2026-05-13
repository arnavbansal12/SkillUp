const { Pool } = require('pg');
require('dotenv').config();

async function test() {
  const directUrl = "postgresql://postgres:Arnavbansal%402007@wvinhlvothymsluvenmd.supabase.co:5432/postgres?sslmode=require";
  console.log("Testing connection to:", directUrl);
  const pool = new Pool({ 
    connectionString: directUrl,
    ssl: {
      rejectUnauthorized: false
    }
  });
  try {
    const client = await pool.connect();
    console.log("SUCCESS! Connected to wvinhlvothymsluvenmd.supabase.co");
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
