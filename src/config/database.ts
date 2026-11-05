import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const {
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASSWORD
} = process.env;

if (!DB_HOST || !DB_PORT || !DB_USER || !DB_PASSWORD) {
    throw new Error('Missing database environment variables');
}

const db = mysql.createPool({
    host: DB_HOST,
    port: Number(DB_PORT),
    user: DB_USER,
    password: DB_PASSWORD,

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default db;