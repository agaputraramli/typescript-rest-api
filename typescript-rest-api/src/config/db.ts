import { Pool } from 'pg';

export const db = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'public',
  password: 'Selamat7',
  port: 5432,
});