const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Routes – Modularized and Mounted
const authRoutes = require('./routes/auth');
const teacherRoutes = require('./routes/teacher');
const studentRoutes = require('./routes/student');
const assignmentRoutes = require('./routes/assignment');

app.use('/api/auth', authRoutes);
app.use('/api/teacher', teacherRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/assignment', assignmentRoutes);

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'An internal server error occurred' });
});

// Server listener
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
