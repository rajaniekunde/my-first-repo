// vulnerable.js

// Example of security vulnerabilities (SQL Injection, XSS, Insecure Deserialization)
const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const db = new sqlite3.Database(':memory:');
app.use(bodyParser.json()); // For parsing JSON input

// SQL Injection Vulnerability
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

// XSS (Cross-Site Scripting) Vulnerability
app.get('/search', (req, res) => {
    const searchTerm = req.query.q; // User input displayed without sanitization
    res.send(`<h1>Search Results for: ${searchTerm}</h1>`); // Vulnerable to XSS
});

// Insecure Deserialization Vulnerability
app.post('/parse', (req, res) => {
    const data = req.body.data; // User-controlled serialized input
    try {
        const parsedData = JSON.parse(data); // Vulnerable to insecure deserialization
        res.json(parsedData);
    } catch (error) {
        res.status(400).send('Invalid JSON');
    }
});

app.listen(3000, () => console.log('App listening on port 3000'));
