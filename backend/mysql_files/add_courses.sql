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