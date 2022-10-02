import pkg from 'pg';
import dotenv from "dotenv";

dotenv.config();

const {Pool} = pkg

const user = 'postgres';
const password = '27081945';
const host = 'localhost';
const port = 5432;
const database = 'boardcamp';

const connection = new Pool({
    //connectionString: process.env.DATABASE_URL,
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '27081945',
    database: 'boardcamp'
  });

  export default connection