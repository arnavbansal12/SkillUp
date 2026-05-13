import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();

async function main() {
  console.log('Using URL:', process.env.DATABASE_URL);
  const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL
  } as any);

  try {
    console.log('Connecting to database...');
    await prisma.$connect();
    console.log('Connected successfully!');
  } catch (error) {
    console.error('Connection failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
