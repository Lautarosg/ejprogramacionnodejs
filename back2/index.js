// index.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

// Connect to existing SQLite database
const db = new sqlite3.Database(path.join(__dirname, 'empleados.db'), (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to SQLite database');
    }
});

// Endpoint to get all employees
app.get('/empleados', (req, res) => {
    db.all('SELECT * FROM empleados', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});