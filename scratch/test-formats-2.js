const { Pool } = require('pg');
require('dotenv').config();

async function test() {
  const formats = [
    "postgresql://postgres:Arnavbansal%402007@wvinhlvothymsluvenmd.pooler.supabase.com:6543/postgres?sslmode=require&pgbouncer=true",
    "postgresql://postgres:Arnavbansal%402007@wvinhlvothymsluvenmd.pooler.supabase.com:5432/postgres?sslmode=require"
  ];

  for (const url of formats) {
    console.log("\n--- Testing format:", url);
    const pool = new Pool({ 
      connectionString: url,
      ssl: {
        rejectUnauthorized: false
      }
    });
    try {
      const client = await pool.connect();
      console.log("SUCCESS!");
      client.release();
      break;
    } catch (err) {
      console.error("FAILED:", err.message);
    } finally {
      await pool.end();
    }
  }
}

test();
