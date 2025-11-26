import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.NEON_DB_URI,
  ssl: { rejectUnauthorized: false },
});

export default pool;
