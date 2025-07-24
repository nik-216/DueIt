const express = require('express');
const router = express.Router();
const db = require('../database/db');

// Add assignment
router.post('/addassignment', (req, res) => {
    const { title, description, releaseDate, dueDate, maxMarks, class_ID } = req.body;

    if (!title || !description || !releaseDate || !dueDate || !maxMarks || !class_ID) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const assignment_ID = 'AS' + releaseDate.slice(0, 2) + 'CS' + Math.floor(1000 + Math.random() * 9000);

    const courseQuery = `SELECT course_ID FROM classes WHERE class_ID = ?`;

    db.query(courseQuery, [class_ID], (err, result) => {
        if (err || !result.length) return res.status(500).json({ message: 'Course ID fetch failed' });

        const course_ID = result[0].course_ID;
        const insertQuery = `
            INSERT INTO assignments 
            VALUES (?, ?, ?, ?, ?, ?, ?);
        `;

        db.query(insertQuery, [assignment_ID, title, description, releaseDate, dueDate, maxMarks, course_ID], (err) => {
            if (err) return res.status(500).json({ message: 'Failed to add assignment' });
            res.status(201).json({ message: 'Assignment added successfully', assignment_ID });
        });
    });
});

// Get submissions for an assignment
router.get('/submissions/:assignmentID', (req, res) => {
    const { assignmentID } = req.params;

    const query = `
        SELECT student_ID, sub_date AS submissionDate, marks_alloted
        FROM submissions
        WHERE assignment_id = ?;
    `;

    db.query(query, [assignmentID], (err, results) => {
        if (err) return res.status(500).json({ message: 'Failed to fetch submissions' });

        const formatted = results.map(row => ({
            studentID: row.student_ID,
            submissionDate: row.submissionDate,
            marks: row.marks_alloted,
        }));

        res.json({ submissions: formatted });
    });
});

// Update submission marks
router.post('/updateMarks', (req, res) => {
    const { assignmentID, studentId, marks } = req.body;

    if (!assignmentID || !studentId || marks === undefined) {
        return res.status(400).json({ message: 'Assignment ID, student ID, and marks are required' });
    }

    const query = `
        UPDATE submissions
        SET marks_alloted = ?
        WHERE assignment_id = ? AND student_ID = ?;
    `;

    db.query(query, [marks, assignmentID, studentId], (err, results) => {
        if (err) return res.status(500).json({ message: 'Database query failed' });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'No matching submission found' });

        res.status(200).json({ message: 'Marks updated successfully' });
    });
});

// Submission count
router.get('/submissions/count/:assignmentID', (req, res) => {
    const assignmentID = req.params.assignmentID;

    const query = `SELECT COUNT(*) AS submissionCount FROM submissions WHERE assignment_ID = ?`;

    db.query(query, [assignmentID], (err, result) => {
        if (err) return res.status(500).json({ message: 'Error fetching submission count' });
        res.status(200).json({ submissionCount: result[0].submissionCount });
    });
});

router.get('/submissionCount/:assignmentID', async (req, res) => {
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



module.exports = router;
