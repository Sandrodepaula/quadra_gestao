
try {
    require('dotenv').config();
} catch (error) {
    // dotenv is optional during local development when the project uses direct config defaults.
}

const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'quadra_gestao',
    password: process.env.DB_PASSWORD || 'admin',
    port: Number(process.env.DB_PORT || 5433),
});

module.exports = { pool };
