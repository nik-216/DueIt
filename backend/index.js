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
    allowedHeaders: ['Content-Type', 'Authorization'], // Ensure Authorization is allowed
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

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']; // lowercase 'authorization'

    if (!authHeader) {
        return res.status(403).json({ message: 'No token provided.' });
    }
    // console.log(authHeader)

    const token = authHeader.split(' ')[1]; // Extract token from header
    // console.log(token)

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Failed to authenticate token' });
        }
        req.userId = decoded.Userid; // Make sure to match `id` here as used in the sign-in token creation
        req.role = decoded.role;
        next();
    });
};

// Login route
app.post('/api/signin', async (req, res) => {
    const { id, password, role } = req.body;
    
    // Select table and ID column based on role
    const tableName = role === 'Student' ? 'students' : 'teachers';
    const idColumn = role === 'Student' ? 'student_id' : 'teacher_id';

    // Fetch user by ID
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
                const token = jwt.sign({ Userid: id, role: role }, process.env.JWT_SECRET, {
                    expiresIn: '1h',
                });

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

    // Select table and ID column based on role
    const tableName = role === 'Student' ? 'students' : 'teachers';
    const idColumn = role === 'Student' ? 'student_id' : 'teacher_id';
    const diff_col = role === 'Student' ? semester : title

    try {
        const hashedPassword = await hashPassword(password);

        // Insert new user into the database
        db.query(
            `INSERT INTO ${tableName} VALUES (?, ?, ?, ?, ?)`,
            [id, name, diff_col, department, hashedPassword],
            (err, results) => {
                if (err) {
                    console.error('Database Query Error:', err.message);
                    return res.status(500).json({ message: 'Failed to register user', error: err.message });
                }
                res.json({ message: 'User registered successfully' });
            }
        );
    } catch (error) {
        console.error('Error in Registration Process:', error.message);
        res.status(500).json({ message: 'Error processing registration', error: error.message });
    }
});

app.get('/api/home_student', verifyToken, (req, res) => {
    const { userId, role } = req;
    console.log("Token verified, userId:", userId, "role:", role);

    db.query(
        `SELECT name FROM students WHERE student_id = ?`,
        [userId],
        (err, results) => {
            if (err) {
                console.error('Database query error:', err);
                return res.status(500).json({ message: 'Database query failed' });
            }
            if (results.length === 0) {
                console.log('User not found');
                return res.status(404).json({ message: 'User not found' });
            }

            const { name } = results[0];

            db.query(
                `SELECT c.class_ID, cr.course_name 
                 FROM student_class sc
                 JOIN classes c ON sc.class_ID = c.class_ID
                 JOIN courses cr ON c.course_ID = cr.course_ID
                 WHERE sc.student_ID = ?`,
                [userId],
                (err, classResults) => {
                    if (err) {
                        console.error('Database query error:', err);
                        return res.status(500).json({ message: 'Database query failed' });
                    }

                    res.json({
                        name,
                        classes: classResults, // Send the classes along with the student's name
                    });
                }
            );
        }
    );
});


app.get('/api/home_teacher', verifyToken, (req, res) => {
    const { userId, role } = req;

    if (role !== 'Teacher') {
        return res.status(403).json({ message: 'Access denied. Only teachers can access this route.' });
    }

    db.query(
        `SELECT name FROM teachers WHERE teacher_id = ?`, 
        [userId], 
        (err, results) => {
            if (err) {
                console.error('Database query error:', err);
                return res.status(500).json({ message: 'Database query failed' });
            }

            if (results.length === 0) {
                console.log('User not found');
                return res.status(404).json({ message: 'Teacher not found' });
            }

            const teacherName = results[0].name;

            // Fetch classes assigned to the teacher with course ID and classroom
            db.query(
                `SELECT class_ID, course_ID, classroom, batch FROM classes WHERE teacher_ID = ?`, 
                [userId], 
                (err, classResults) => {
                    if (err) {
                        console.error('Database query error:', err);
                        return res.status(500).json({ message: 'Failed to fetch classes' });
                    }

                    res.json({
                        name: teacherName,
                        classes: classResults, // Return the list of classes
                    });
                }
            );
        }
    );
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
