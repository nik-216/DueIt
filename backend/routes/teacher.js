const express = require('express');
const router = express.Router();
const db = require('../database/db');
const { verifyToken } = require('../middleware/auth');

// Teacher home
router.get('/home_teacher', verifyToken, (req, res) => {
    const { userId, role } = req;

    if (role !== 'Teacher') {
        return res.status(403).json({ message: 'Access denied. Only teachers can access this route.' });
    }

    db.query(`SELECT name FROM teachers WHERE teacher_id = ?`, [userId], (err, results) => {
        if (err) return res.status(500).json({ message: 'Database query failed' });
        if (!results.length) return res.status(404).json({ message: 'Teacher not found' });

        const teacherName = results[0].name;

        db.query(`SELECT class_ID, course_ID, classroom, batch FROM classes WHERE teacher_ID = ?`, [userId], (err, classResults) => {
            if (err) return res.status(500).json({ message: 'Failed to fetch classes' });

            res.json({ name: teacherName, classes: classResults });
        });
    });
});

// Teacher classes with assignments and students
router.get('/teacher-classes', verifyToken, (req, res) => {
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
        ORDER BY c.class_ID;
    `;

    db.query(query, [userId], (err, results) => {
        if (err) return res.status(500).json({ message: 'Database query failed' });

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

            if (row.student_name) acc[row.class_ID].students.add(row.student_name);

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

        Object.values(classes).forEach(cls => {
            cls.students = Array.from(cls.students);
            cls.assignments = Array.from(cls.assignments.values());
        });

        res.json(classes);
    });
});

router.post('/addclass', verifyToken, (req, res) => {
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

router.get('/fetchstudents/:classId', (req, res) => {
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

        // Return the student list along with num_st
        res.json({ students: results, num_st: results[0]?.num_st });
    });
});


// Add a student to a class
router.post('addstudent', (req, res) => {
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

router.post('/removestudent', (req, res) => {
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

        res.status(201).json({ message: 'Student successfully removed from class' });
    });
});

module.exports = router;
