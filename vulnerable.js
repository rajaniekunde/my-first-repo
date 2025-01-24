// vulnerable.js

// Example of a security vulnerability (SQL Injection)
const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');

app.get('/user', (req, res) => {
    const userId = req.query.id; // User input directly in SQL query
    const query = `SELECT * FROM users WHERE id = '${userId}'`; // Vulnerable to SQL Injection
    db.all(query, (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(rows);
        }
    });
});

app.listen(3000, () => console.log('App listening on port 3000'));
