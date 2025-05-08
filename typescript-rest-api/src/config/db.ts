import { Pool } from 'pg';

export const db = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'public',
  password: 'postgres',
  port: 5432,
});