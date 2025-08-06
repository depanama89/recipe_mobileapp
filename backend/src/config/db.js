import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from "../db/schema.js"
import { ENV } from './env.js';

const pool=new Pool({
    connectionString:ENV.DATABASE_URL
})

export const db=drizzle(pool,{schema})