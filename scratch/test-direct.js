const { Pool } = require('pg');
require('dotenv').config();

async function test() {
  const directUrl = "postgresql://postgres:Arnavbansal%402007@db.wvinhlvothymsluvenmd.supabase.co:5432/postgres";
  console.log("Testing direct connection to:", directUrl);
  const pool = new Pool({ 
    connectionString: directUrl,
    ssl: {
      rejectUnauthorized: false
    }
  });
  try {
    const client = await pool.connect();
    console.log("Successfully connected to direct host!");
    const res = await client.query('SELECT now()');
    console.log("Query result:", res.rows[0]);
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
