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
                FROM classes c
                JOIN courses cr ON c.course_ID = cr.course_ID
                WHERE c.class_ID IN 
                    (SELECT sc.class_ID
                    FROM student_class sc
                    WHERE sc.student_ID = ?)`,
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
        LEFT JOIN assignments a ON c.course_ID = a.course_ID
        LEFT JOIN student_class sc ON c.class_ID = sc.class_ID
        LEFT JOIN students s ON sc.student_ID = s.student_ID
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

app.post('/api/addclass', verifyToken, (req, res) => {
    const { userId } = req;
    const { coursecode, department, classroom, batch } = req.body;

    // Basic validation
    if (!coursecode || !department || !classroom || !batch) {
        return res.status(400).json({ error: 'All fields are required!' });
    }

    const class_ID = 'CL' + coursecode.slice(-4, -1) + department.slice(0, 2) + classroom.slice(-3);
    console.log('Generated class_ID:', class_ID);

    db.query(
        `CALL AddClass (?, ?, ?, ?, ?)`,
        [class_ID, classroom, batch, coursecode, userId],
        (err, results) => {
            if (err) {
                console.error('Database Query Error:', err.message);
                return res.status(500).json({
                    message: 'Database query failed',
                    error: err.message, // Include the error message for debugging
                });
            }
            return res.status(201).json({ message: 'Class registered successfully', classID: class_ID });
        }
    );
});

app.get('/api/fetchstudents/:classId', (req, res) => {
    const { classId } = req.params; // Get classId from URL parameters

    const query = `
        SELECT sc.student_ID, c.num_st
        FROM student_class sc
        JOIN classes c ON sc.class_ID = c.class_ID
        WHERE sc.class_ID = ?;
    `;

    db.query(query, [classId], (err, results) => {
        if (err) {
            console.error('Error fetching students:', err.message);
            return res.status(500).json({ message: 'Database query failed' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'No students found for this class' });
        }

        // Return the student list along with num_st
        res.json({ students: results, num_st: results[0]?.num_st });
    });
});


// Add a student to a class
app.post('/api/addstudent', (req, res) => {
    const { classId, studentId } = req.body;

    const insertQuery = `
        INSERT INTO student_class (class_ID, student_ID) 
        VALUES (?, ?);
    `;

    db.query(insertQuery, [classId, studentId], (err, results) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ message: 'Student already enrolled in this class' });
            }
            console.error('Error inserting student:', err.message);
            return res.status(500).json({ message: 'Failed to add student to class' });
        }

        res.status(201).json({ message: 'Student successfully added to class' });
    });
});

app.post('/api/removestudent', (req, res) => {
    const { classId, studentId } = req.body;

    const insertQuery = `
        DELETE FROM student_class
        WHERE student_ID = ? and class_ID = ?;
    `;

    db.query(insertQuery, [studentId, classId], (err, results) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ message: 'Student already enrolled in this class' });
            }
            console.error('Error inserting student:', err.message);
            return res.status(500).json({ message: 'Failed to remove student to class' });
        }

        res.status(201).json({ message: 'Student successfully removed to class' });
    });
});

app.post('/api/addassignment', (req, res) => {
    const { title, description, releaseDate, dueDate, maxMarks, class_ID } = req.body;

    // Validate required fields
    if (!title || !description || !releaseDate || !dueDate || !maxMarks || !class_ID) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const assignment_ID = 'AS' + releaseDate.slice(0, 2) + 'CS' + (Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000);

    // Query to fetch course_ID from classes table
    const getCourseIdQuery = `SELECT course_ID FROM classes WHERE class_ID = ?`;

    db.query(getCourseIdQuery, [class_ID], (err, results) => {
        if (err) {
            console.error('Error fetching course_ID:', err.message);
            return res.status(500).json({ message: 'Database query failed' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Class not found' });
        }

        const course_ID = results[0].course_ID;

        // Insert the assignment into assignments table
        const insertAssignmentQuery = `
            INSERT INTO assignments 
            VALUES (?, ?, ?, ?, ?, ?, ?);
        `;

        db.query(insertAssignmentQuery, [assignment_ID, title, description, releaseDate, dueDate, maxMarks, course_ID], (err, results) => {
            if (err) {
                console.error('Error adding assignment:', err.message);
                return res.status(500).json({ message: 'Database query failed' });
            }

            res.status(201).json({ message: 'Assignment added successfully', assignment_ID });
        });
    });
});

app.get('/api/submissions/:assignmentID', (req, res) => {
    const { assignmentID } = req.params;

    if (!assignmentID) {
        return res.status(400).json({ message: 'Assignment ID is required.' });
    }

    const query = `
        SELECT 
            s.student_ID,
            s.sub_date AS submissionDate,  
            s.marks_alloted
        FROM submissions AS s
        WHERE s.assignment_id = ?
    `;

    db.query(query, [assignmentID], (err, results) => {
        if (err) {
            console.error('Error fetching submissions:', err);
            return res.status(500).json({ message: 'Error fetching submissions.' });
        }

        const submissions = results.map((row) => ({
            studentID: row.student_ID,
            submissionDate: row.submissionDate,
            marks: row.marks_alloted,
        }));

        res.json({ submissions: submissions });
    });
});

// Update marks for a specific submission
app.post('/api/updateMarks', (req, res) => {
    const { assignmentID, studentId, marks } = req.body;
    console.log( assignmentID, studentId, marks)
    // Check if the user is a teacher (only teachers can update marks)
    // if (role !== 'Teacher') {
    //     return res.status(403).json({ message: 'Access denied. Only teachers can update marks.' });
    // }

    // Validate required fields
    if (!assignmentID || !studentId || !marks) {
        return res.status(400).json({ message: 'Assignment ID, student ID, and marks are required' });
    }

    // Update the marks for the specific student and assignment
    const query = `
        UPDATE submissions
        SET marks_alloted = ?
        WHERE assignment_id = ? AND student_ID = ?;
    `;

    db.query(query, [marks, assignmentID, studentId], (err, results) => {
        if (err) {
            console.error('Error updating marks:', err.message);
            return res.status(500).json({ message: 'Database query failed' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Submission not found or marks not updated' });
        }

        res.status(200).json({ message: 'Marks updated successfully' });
    });
});

app.get('/api/submissionCount/:assignmentID', async (req, res) => {
    const { assignmentID } = req.params;
    
    try {
        // Count the number of submissions for the given assignmentID
        const count = await Submission.countDocuments({ assignmentID });

        // Send the count in the response
        res.status(200).json({ submissionCount: count });
    } catch (error) {
        console.error('Error fetching submission count:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get('/api/student-classes', verifyToken, (req, res) => {
    const { userId } = req;

    const query = `
        SELECT 
            c.class_ID, c.course_ID, c.classroom, 
            co.isa1, co.isa2, co.esa,
            a.assignment_ID, a.release_date, a.due_date, a.title
        FROM classes c
        JOIN courses co ON c.course_ID = co.course_ID
        LEFT JOIN assignments a ON c.course_ID = a.course_ID
        LEFT JOIN student_class sc ON c.class_ID = sc.class_ID
        LEFT JOIN students s ON sc.student_ID = s.student_ID
        WHERE s.student_ID = ?
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
                    assignments: new Map(),
                };
            }

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

app.get('/api/class-details/:classID', (req, res) => {
    const { classID } = req.params; // Get classID from URL parameters

    const assignmentQuery = `
        SELECT a.assignment_ID, a.release_date AS startDate, a.due_date AS dueDate, a.title
        FROM assignments a
        JOIN classes cl ON cl.course_ID = a.course_ID
        WHERE class_ID = ?;
    `;

    const examDatesQuery = `
        SELECT isa1, isa2, esa
        FROM classes
        JOIN courses ON courses.course_ID = classes.course_ID
        WHERE class_ID = ?;
    `;

    // Execute both queries
    db.query(assignmentQuery, [classID], (assignmentErr, assignmentResults) => {
        if (assignmentErr) {
            console.error('Error fetching assignments:', assignmentErr.message);
            return res.status(500).json({ message: 'Database query failed for assignments' });
        }

        db.query(examDatesQuery, [classID], (examErr, examResults) => {
            if (examErr) {
                console.error('Error fetching exam dates:', examErr.message);
                return res.status(500).json({ message: 'Database query failed for exam dates' });
            }

            if (examResults.length === 0) {
                return res.status(404).json({ message: 'Exam dates not found for this class' });
            }

            // Prepare the response data
            const response = {
                assignments: assignmentResults,
                examDates: {
                    isa1: examResults[0]?.isa1,
                    isa2: examResults[0]?.isa2,
                    esa: examResults[0]?.esa,
                },
            };

            res.json(response);
        });
    });
});

app.post('/api/submit-assignment', verifyToken, (req, res) => {
    const { userId } = req;
    const { assignment_ID, class_ID } = req.body; // Get assignment_ID and class_ID from body
    const submissionDate = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format

    if (!userId || !assignment_ID || !class_ID) {
        return res.status(400).json({ message: 'Student ID, Assignment ID, and Class ID are required' });
    }

    const submission_ID = 'SUB' + (Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000);
    // console.log(submission_ID);

    const query = `
        INSERT INTO submissions
        VALUES (?, ?, ?, ?, ?, ?);
    `;

    db.query(query, [submission_ID, submissionDate, 0, userId, assignment_ID, class_ID], (err, result) => {
        if (err) {
            console.error('Error submitting assignment:', err.message);
            return res.status(500).json({ message: 'Error submitting assignment' });
        }

        res.status(200).json({ message: 'Assignment submitted successfully' });
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
