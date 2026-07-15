const { Pool } = require('pg');
const config = require('./index');
const logger = require('../logger');

const pool = new Pool({
  connectionString: config.databaseUrl || process.env.DATABASE_URL,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  database:
    process.env.DB_NAME ||
    (process.env.NODE_ENV === 'test' ? 'internops_test' : 'internops'),
  max: config.dbPoolMax || 20,
  idleTimeoutMillis: 30000,
});

pool.on('error', (err) => {
  logger.error({ err }, 'Unexpected error on idle database client');
});

module.exports = pool;
