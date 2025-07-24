const express = require('express');
const router = express.Router();
const db = require('../database/db');
const jwt = require('jsonwebtoken');
const { hashPassword, verifyPassword } = require('../utils/hash');
require('dotenv').config();

// Signin
router.post('/signin', async (req, res) => {
    const { id, password, role } = req.body;
    const table = role === 'Student' ? 'students' : 'teachers';
    const column = role === 'Student' ? 'student_id' : 'teacher_id';

    db.query(`SELECT * FROM ${table} WHERE ${column} = ?`, [id], async (err, results) => {
        if (err) return res.status(500).json({ message: 'Database query failed' });
        if (!results.length) return res.status(401).json({ message: 'Invalid ID or role' });

        try {
            const isValid = await verifyPassword(results[0].password, password);
            if (!isValid) return res.status(401).json({ message: 'Incorrect password' });

            const token = jwt.sign({ Userid: id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        } catch {
            res.status(500).json({ message: 'Error verifying password' });
        }
    });
});

// Signup
router.post('/signup', async (req, res) => {
    const { id, password, role, name, department, semester, title } = req.body;
    const table = role === 'Student' ? 'students' : 'teachers';
    const field = role === 'Student' ? semester : title;

    try {
        const hashedPassword = await hashPassword(password);
        db.query(`INSERT INTO ${table} VALUES (?, ?, ?, ?, ?)`, [id, name, field, department, hashedPassword], (err) => {
            if (err) return res.status(500).json({ message: 'Failed to register user' });
            res.json({ message: 'User registered successfully' });
        });
    } catch (error) {
        res.status(500).json({ message: 'Error processing registration' });
    }
});

module.exports = router;
