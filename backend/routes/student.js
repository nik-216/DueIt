const express = require('express');
const router = express.Router();
const db = require('../database/db');
const { verifyToken } = require('../middleware/auth');

// Get student home data
router.get('/home_student', verifyToken, (req, res) => {
    const { userId } = req;

    db.query(`SELECT name FROM students WHERE student_id = ?`, [userId], (err, results) => {
        if (err) return res.status(500).json({ message: 'Database query failed' });
        if (!results.length) return res.status(404).json({ message: 'User not found' });

        const { name } = results[0];

        const classQuery = `
            SELECT c.class_ID, cr.course_name
            FROM classes c
            JOIN courses cr ON c.course_ID = cr.course_ID
            WHERE c.class_ID IN (
                SELECT sc.class_ID FROM student_class sc WHERE sc.student_ID = ?
            )`;

        db.query(classQuery, [userId], (err, classResults) => {
            if (err) return res.status(500).json({ message: 'Database query failed' });
            res.json({ name, classes: classResults });
        });
    });
});

// Get student's enrolled classes with assignments
router.get('/student-classes', verifyToken, (req, res) => {
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
                    assignments: new Map(),
                };
            }

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
            cls.assignments = Array.from(cls.assignments.values());
        });

        res.json(classes);
    });
});

// Fetch assignment and exam details for a class
router.get('/class-details/:classID', (req, res) => {
    const { classID } = req.params;

    const assignmentQuery = `
        SELECT a.assignment_ID, a.release_date AS startDate, a.due_date AS dueDate, a.title
        FROM assignments a
        JOIN classes cl ON cl.course_ID = a.course_ID
        WHERE cl.class_ID = ?;
    `;

    const examQuery = `
        SELECT isa1, isa2, esa
        FROM classes
        JOIN courses ON courses.course_ID = classes.course_ID
        WHERE class_ID = ?;
    `;

    db.query(assignmentQuery, [classID], (errA, assignmentResults) => {
        if (errA) return res.status(500).json({ message: 'Failed to fetch assignments' });

        db.query(examQuery, [classID], (errE, examResults) => {
            if (errE) return res.status(500).json({ message: 'Failed to fetch exam dates' });
            if (!examResults.length) return res.status(404).json({ message: 'Exam data not found' });

            res.json({
                assignments: assignmentResults,
                examDates: examResults[0],
            });
        });
    });
});

// Submit assignment
router.post('/submit-assignment', verifyToken, (req, res) => {
    const { userId } = req;
    const { assignment_ID, class_ID } = req.body;
    const submissionDate = new Date().toISOString().split('T')[0];
    const submission_ID = 'SUB' + Math.floor(1000 + Math.random() * 9000);

    if (!assignment_ID || !class_ID) {
        return res.status(400).json({ message: 'Assignment ID and Class ID are required' });
    }

    const query = `
        INSERT INTO submissions 
        VALUES (?, ?, ?, ?, ?, ?);
    `;

    db.query(query, [submission_ID, submissionDate, 0, userId, assignment_ID, class_ID], (err) => {
        if (err) return res.status(500).json({ message: 'Failed to submit assignment' });
        res.status(200).json({ message: 'Assignment submitted successfully' });
    });
});

module.exports = router;
