const pool = require('../config/db');
const fs = require('fs');
const path = require('path');
async function migrate() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const dir = path.join(__dirname,'..','..','migrations');
    const files = fs.readdirSync(dir).filter(f=>f.endsWith('.sql')).sort();
    for(const file of files) {
      const sql = fs.readFileSync(path.join(dir,file),'utf8');
      await client.query(sql);
      console.log(`Migration: ${file}`);
    }
    await client.query('COMMIT');
    console.log('Migrations done');
  } catch(e) { await client.query('ROLLBACK'); throw e; }
  finally { client.release(); }
}
migrate().then(()=>process.exit(0)).catch(()=>process.exit(1));
