process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const sql = `
-- Enable RLS on all tables
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "EnrolledCourse" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "CompletedMission" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "UserAchievement" ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any to prevent errors on re-run
DROP POLICY IF EXISTS "Public access for Users" ON "User";
DROP POLICY IF EXISTS "Public access for EnrolledCourse" ON "EnrolledCourse";
DROP POLICY IF EXISTS "Public access for CompletedMission" ON "CompletedMission";
DROP POLICY IF EXISTS "Public access for UserAchievement" ON "UserAchievement";

-- Create basic policies (since Prisma uses the superuser, these are mainly to secure the REST API)
CREATE POLICY "Enable read access for all users" ON "User" FOR SELECT USING (true);
CREATE POLICY "Enable read access for all courses" ON "EnrolledCourse" FOR SELECT USING (true);
CREATE POLICY "Enable read access for all missions" ON "CompletedMission" FOR SELECT USING (true);
CREATE POLICY "Enable read access for all achievements" ON "UserAchievement" FOR SELECT USING (true);
`;

async function setupRLS() {
  try {
    console.log('Enabling RLS...');
    await pool.query(sql);
    console.log('RLS successfully enabled with basic read policies!');
  } catch (err) {
    console.error('Error enabling RLS:', err.stack);
  } finally {
    await pool.end();
  }
}

setupRLS();
