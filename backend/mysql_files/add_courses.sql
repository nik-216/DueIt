USE DueIt;

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
        WHERE c.class_ID = 'CL251CS221' AND c.teacher_ID = 'TEA001';

SELECT 
        c.class_ID, c.course_ID, c.classroom,
        co.isa1 AS isa1_date, co.isa2 AS isa2_date, co.esa AS esa_date
        FROM classes c
        JOIN courses co ON c.course_ID = co.course_ID
        WHERE c.class_ID = 'CL251CS221' AND c.teacher_ID = 'TEA001';

            SELECT 
                a.assignment_ID, a.release_date AS start_date, 
                a.due_date, a.title
            FROM assignments a
            WHERE a.course_ID = ;

SELECT 
    s.student_ID,
    s.sub_date AS submissionDate,  
    s.marks_alloted
FROM submissions AS s
WHERE s.assignment_id = 'AS22CS2111';

UPDATE submissions
        SET marks_alloted = 6
        WHERE assignment_id = 'AS22CS2111'  AND student_ID = 'PES1UG22CS111';

select * from student_class;

DELETE FROM student_class WHERE student_ID = 'PES1UG22CS555' and class_ID = 'CL243CS113';

SELECT 
            c.class_ID, c.course_ID, c.classroom, 
            co.isa1, co.isa2, co.esa,
            a.assignment_ID, a.release_date, a.due_date, a.title
        FROM classes c
        JOIN courses co ON c.course_ID = co.course_ID
        LEFT JOIN assignments a ON c.course_ID = a.course_ID
        LEFT JOIN student_class sc ON c.class_ID = sc.class_ID
        LEFT JOIN students s ON sc.student_ID = s.student_ID
        WHERE s.student_ID = 'PES1UG22CS111'
        ORDER BY c.class_ID;


SELECT a.assignment_ID, a.release_date AS startDate, a.due_date AS dueDate, a.title
        FROM assignments a
        JOIN classes cl ON cl.course_ID = a.course_ID
        WHERE class_ID = 'CL251CS221'
        ;

SELECT isa1, isa2, esa
        FROM classes
        JOIN courses ON courses.course_ID = classes.`course_ID`
        WHERE class_ID = ?