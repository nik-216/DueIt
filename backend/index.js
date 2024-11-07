// backend/index.js
const express = require('express');
const mysql = require('mysql2');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect(err => {
    if (err) throw err;
    console.log("Connected to MySQL Database");
});

// Route to handle login
app.post('/api/signin', async (req, res) => {
    const { id, password, role } = req.body;
    
    // Choose the table and ID column based on role
    const tableName = role === 0 ? 'students' : 'teachers';
    const idColumn = role === 0 ? 'student_id' : 'teacher_id';

    // Fetch user by ID and Role
    db.query(
        `SELECT * FROM ${tableName} WHERE ${idColumn} = ?`,
        [id],
        async (err, results) => {
            if (err) return res.status(500).json({ message: 'Database query failed' });

            if (results.length === 0) {
                return res.status(401).json({ message: 'Invalid ID or role' });
            }

            const user = results[0];

            try {
                // Verify password with Argon2
                const isMatch = await argon2.verify(user.password, password);
                if (!isMatch) {
                    return res.status(401).json({ message: 'Incorrect password' });
                }

                // Generate JWT
                const token = jwt.sign({ id: user[idColumn], role: role }, process.env.JWT_SECRET, {
                    expiresIn: '1h',
                });

                res.json({ token });
            } catch (error) {
                res.status(500).json({ message: 'Error verifying password' });
            }
        }
    );
});

// Hash a password using Argon2
const hashPassword = async (password) => {
    try {
        return await argon2.hash(password);
    } catch (err) {
        throw new Error('Failed to hash password');
    }
};

// Example usage in a registration route
app.post('/api/signup', async (req, res) => {
    const { id, password, role } = req.body;

    // Choose the table and ID column based on role
    const tableName = role === 0 ? 'students' : 'teachers';
    const idColumn = role === 0 ? 'student_id' : 'teacher_id';

    try {
        const hashedPassword = await hashPassword(password);
        
        db.query(
            `INSERT INTO ${tableName} (${idColumn}, password, role) VALUES (?, ?, ?)`,
            [id, hashedPassword, role],
            (err, results) => {
                if (err) return res.status(500).json({ message: 'Failed to register user' });
                res.json({ message: 'User registered successfully' });
            }
        );
    } catch (error) {
        res.status(500).json({ message: 'Error hashing password' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
