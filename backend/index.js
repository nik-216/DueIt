const express = require('express');
const mysql = require('mysql2');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000; // Default to 8000 if PORT is not set in .env

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Adjust this to match your frontend's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
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

// Function to hash password with Argon2
const hashPassword = async (password) => {
    try {
        return await argon2.hash(password);
    } catch (err) {
        throw new Error('Failed to hash password');
    }
};

// Middleware to verify token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(403).json({ message: 'No token provided.' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Failed to authenticate token' });
        }
        req.userId = decoded.Userid;
        req.role = decoded.role;
        next();
    });
};

// Login route
app.post('/api/signin', async (req, res) => {
    const { id, password, role } = req.body;
    const tableName = role === 'Student' ? 'students' : 'teachers';
    const idColumn = role === 'Student' ? 'student_id' : 'teacher_id';

    db.query(
        `SELECT * FROM ${tableName} WHERE ${idColumn} = ?`,
        [id],
        async (err, results) => {
            if (err) return res.status(500).json({ message: 'Database query failed' });
            if (results.length === 0) return res.status(401).json({ message: 'Invalid ID or role' });

            const user = results[0];
            try {
                const isMatch = await argon2.verify(user.password, password);
                if (!isMatch) return res.status(401).json({ message: 'Incorrect password' });

                const token = jwt.sign({ Userid: id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.json({ token });
            } catch (error) {
                res.status(500).json({ message: 'Error verifying password' });
            }
        }
    );
});

// Signup route
app.post('/api/signup', async (req, res) => {
    const { id, password, role, name, department, semester, title } = req.body;
    const tableName = role === 'Student' ? 'students' : 'teachers';
    const idColumn = role === 'Student' ? 'student_id' : 'teacher_id';
    const additionalField = role === 'Student' ? semester : title;

    try {
        const hashedPassword = await hashPassword(password);

        db.query(
            `INSERT INTO ${tableName} VALUES (?, ?, ?, ?, ?)`,
            [id, name, additionalField, department, hashedPassword],
            (err, results) => {
                if (err) {
                    console.error('Database Query Error:', err.message);
                    return res.status(500).json({ message: 'Failed to register user' });
                }
                res.json({ message: 'User registered successfully' });
            }
        );
    } catch (error) {
        res.status(500).json({ message: 'Error processing registration', error: error.message });
    }
});

// Home route for students
app.get('/api/home_student', verifyToken, (req, res) => {
    const { userId } = req;

    db.query(
        `SELECT name FROM students WHERE student_id = ?`,
        [userId],
        (err, results) => {
            if (err) return res.status(500).json({ message: 'Database query failed' });
            if (results.length === 0) return res.status(404).json({ message: 'User not found' });

            const { name } = results[0];

            db.query(
                `SELECT c.class_ID, cr.course_name 
                 FROM student_class sc
                 JOIN classes c ON sc.class_ID = c.class_ID
                 JOIN courses cr ON c.course_ID = cr.course_ID
                 WHERE sc.student_ID = ?`,
                [userId],
                (err, classResults) => {
                    if (err) return res.status(500).json({ message: 'Database query failed' });

                    res.json({ name, classes: classResults });
                }
            );
        }
    );
});

// Home route for teachers
app.get('/api/home_teacher', verifyToken, (req, res) => {
    const { userId, role } = req;

    if (role !== 'Teacher') {
        return res.status(403).json({ message: 'Access denied. Only teachers can access this route.' });
    }

    db.query(
        `SELECT name FROM teachers WHERE teacher_id = ?`,
        [userId],
        (err, results) => {
            if (err) return res.status(500).json({ message: 'Database query failed' });
            if (results.length === 0) return res.status(404).json({ message: 'Teacher not found' });

            const teacherName = results[0].name;

            db.query(
                `SELECT class_ID, course_ID, classroom, batch 
                 FROM classes 
                 WHERE teacher_ID = ?`,
                [userId],
                (err, classResults) => {
                    if (err) return res.status(500).json({ message: 'Failed to fetch classes' });

                    res.json({ name: teacherName, classes: classResults });
                }
            );
        }
    );
});

// Teacher's class details
app.get('/api/teacher-classes', verifyToken, (req, res) => {
    const { userId } = req;

    const query = `
        SELECT 
            c.class_ID, c.course_ID, c.classroom, 
            co.isa1, co.isa2, co.esa,
            a.assignment_ID, a.release_date, a.due_date, a.title,
            s.name AS student_name
        FROM classes c
        JOIN courses co ON c.course_ID = co.course_ID
        LEFT JOIN assignments a ON co.course_ID = a.course_ID
        JOIN student_class sc ON c.class_ID = sc.class_ID
        JOIN students s ON sc.student_ID = s.student_ID
        WHERE c.teacher_ID = ?
        ORDER BY c.class_ID;`;

    db.query(query, [userId], (err, results) => {
        if (err) return res.status(500).json({ message: 'Database query failed' });
        if (results.length === 0) return res.status(404).json({ message: 'No classes found for the teacher' });

        // Transform the data
        const classes = results.reduce((acc, row) => {
            if (!acc[row.class_ID]) {
                acc[row.class_ID] = {
                    class_ID: row.class_ID,
                    course_ID: row.course_ID,
                    classroom: row.classroom,
                    exams: {
                        isa1_date: row.isa1,
                        isa2_date: row.isa2,
                        esa_date: row.esa,
                    },
                    students: new Set(),
                    assignments: new Map(),
                };
            }

            // Add unique students
            acc[row.class_ID].students.add(row.student_name);

            // Add assignments
            if (row.assignment_ID) {
                acc[row.class_ID].assignments.set(row.assignment_ID, {
                    assignment_ID: row.assignment_ID,
                    start_date: row.release_date,
                    due_date: row.due_date,
                    title: row.title,
                });
            }

            return acc;
        }, {});

        // Convert Sets and Maps to Arrays for the response
        Object.values(classes).forEach(cls => {
            cls.students = Array.from(cls.students); // Convert Set to Array
            cls.assignments = Array.from(cls.assignments.values()); // Convert Map to Array
        });

        res.json(classes);
    });
});


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'An internal server error occurred' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
