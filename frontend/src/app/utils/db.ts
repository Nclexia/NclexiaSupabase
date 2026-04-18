import { Pool } from 'pg';
import postgres from 'postgres'

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
})

const connectionString = process.env.DATABASE_URL
if (!connectionString) throw new Error('DATABASE_URL is not defined');

export const sql = postgres(connectionString, {
  ssl: { rejectUnauthorized: false }, // required for Supabase
});
async function testConnection() {
  try {
    const result = await sql`SELECT NOW()`;
    console.log('DB connected! Server time:', result[0].now);
  } catch (err) {
    console.error('DB connection failed:', err);
  }
}

 testConnection();


export const query = (text: string, params?: any[]) => {
  return pool.query(text, params);
};

