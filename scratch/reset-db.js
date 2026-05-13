process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function resetDB() {
  try {
    console.log('Resetting all tables...');
    await pool.query(`
      TRUNCATE TABLE "User", "EnrolledCourse", "CompletedMission", "UserAchievement" CASCADE;
    `);
    console.log('Database successfully reset!');
  } catch (err) {
    console.error('Error resetting database:', err.stack);
  } finally {
    await pool.end();
  }
}

resetDB();
