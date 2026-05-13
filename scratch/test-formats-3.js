const { Pool } = require('pg');
require('dotenv').config();

async function test() {
  const formats = [
    "postgresql://wvinhlvothymsluvenmd.postgres:Arnavbansal%402007@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?sslmode=require&pgbouncer=true",
    "postgresql://postgres.wvinhlvothymsluvenmd:Arnavbansal%402007@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?sslmode=require&pgbouncer=true",
    "postgresql://postgres:Arnavbansal%402007@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?sslmode=require&pgbouncer=true"
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
