import { sql } from '@/app/utils/db';

type User = {
    id: number;
    email: string;
  };
  
  export async function findByEmail(email: string): Promise<User | null> {
    const result = await sql<User[]>`
      SELECT * FROM users WHERE email = ${email} LIMIT 1
    `;
    return result[0] ?? null;
  }