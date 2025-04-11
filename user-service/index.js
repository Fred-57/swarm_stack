const fs = require('fs');
const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = process.env.PORT || 3000;

// Lire les secrets à partir des fichiers
const postgresUser = fs.readFileSync('/run/secrets/postgres_user', 'utf8').trim();
const postgresPassword = fs.readFileSync('/run/secrets/postgres_password', 'utf8').trim();

const pool = new Pool({
  user: postgresUser,
  host: process.env.POSTGRES_HOST || 'postgres',
  database: process.env.POSTGRES_DB || 'users_db',
  password: postgresPassword,
  port: 5432,
});

app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

app.listen(port, () => {
  console.log(`User service listening at http://localhost:${port}`);
});
