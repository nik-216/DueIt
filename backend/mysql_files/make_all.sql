CREATE DATABASE IF NOT EXISTS DueIt;
use DueIt;

CREATE TABLE IF NOT EXISTS students(
    student_ID varchar(13) PRIMARY KEY,
    name varchar(30),
    semester int,
    department varchar(10),
    password varchar(255)
);

CREATE TABLE IF NOT EXISTS teachers(
    teacher_ID varchar(13) PRIMARY KEY,
    name varchar(30),
    title varchar(10),
    department varchar(10),
    password varchar(255)
);

CREATE TABLE IF NOT EXISTS courses(
    course_ID varchar(13) PRIMARY KEY,
    course_name varchar(50),
    department varchar(10),
    semester int,
    isa1 date,
    isa2 date,
    esa date
);

CREATE TABLE IF NOT EXISTS classes(
    class_ID varchar(13) PRIMARY KEY,
    num_st int,
    classroom varchar(5),
    batch varchar(7),
    course_ID varchar(13),
    teacher_ID varchar(13),
    FOREIGN KEY (teacher_ID) REFERENCES teachers(teacher_ID),
    FOREIGN KEY (course_ID) REFERENCES courses(course_ID)
);

CREATE TABLE IF NOT EXISTS assignments(
    assignment_ID varchar(13) PRIMARY KEY,
    title varchar(100),
    description varchar(200),
    release_date date,
    due_date date,
    max_marks int,
    course_ID varchar(13),
    FOREIGN KEY (course_ID) REFERENCES courses(course_ID)
);

CREATE TABLE IF NOT EXISTS submissions(
    submission_ID varchar(13) PRIMARY KEY,
    sub_date date,
    sub_time time,
    marks_alloted int,
    student_ID varchar(13),
    assignment_ID varchar(13),
    class_ID varchar(13),
    FOREIGN KEY (student_ID) REFERENCES students(student_ID),
    FOREIGN KEY (assignment_ID) REFERENCES assignments(assignment_ID),
    FOREIGN KEY (class_ID) REFERENCES classes(class_ID)
);

CREATE TABLE IF NOT EXISTS student_class(
    student_ID varchar(13),
    class_ID varchar(13),
    FOREIGN KEY (student_ID) REFERENCES students(student_ID),
    FOREIGN KEY (class_ID) REFERENCES classes(class_ID)
)

-- CREATION DONE YAY!!

INSERT INTO courses values
    ('UE22CS251A', 'Digital Design and Computer Organization', 'CSE', 3, '2024-10-20', '2024-12-10' ,'2024-12-21'),
    ('UE22CS252A', 'Data Structures and its Applications', 'CSE', 3, '2024-10-21', '2024-12-11' ,'2024-12-23'),
    ('UE22CS241A', 'Statistics for Data Science', 'CSE', 3, '2024-10-22', '2024-12-12' ,'2024-12-25'),
    ('UE22CS242A', 'Web Technologies', 'CSE', 3, '2024-10-23', '2024-12-13' ,'2024-12-27'),
    ('UE22CS243A', 'Automata Formal Languages and Logic', 'CSE', 3, '2024-10-24', '2024-12-14' ,'2024-12-29'),
    ('UE22EC251A', 'Analog Circuit Design', 'ECE', 3, '2024-10-20', '2024-12-10' ,'2024-12-21'),
    ('UE22EC252A', 'Computer Aided Digital Design', 'ECE', 3, '2024-10-21', '2024-12-11' ,'2024-12-23'),
    ('UE22EC241A', 'Mathematics For Electronics Engineers', 'ECE', 3, '2024-10-22', '2024-12-12' ,'2024-12-25'),
    ('UE22EC242A', 'Network Analysis and Synthesis', 'ECE', 3, '2024-10-23', '2024-12-13' ,'2024-12-27'),
    ('UE22EC243A', 'Signals and Systems', 'ECE', 3, '2024-10-24', '2024-12-14' ,'2024-12-29')

INSERT INTO students (student_ID, name, semester, department, password) VALUES
    ('PES1UG22CS111', 'Alice Johnson', 3, 'CSE', '$argon2id$v=19$m=65536,t=3,p=4$ZeYLsUGRdx1dh1Z7JYMX+w$ifeRkF7icxXzZ9sXznMLawAyU6QsqspxWpuyYG5jsD4'),
    ('PES1UG22CS222', 'Bob Smith', 3, 'ECE', '$argon2id$v=19$m=65536,t=3,p=4$ZeYLsUGRdx1dh1Z7JYMX+w$ifeRkF7icxXzZ9sXznMLawAyU6QsqspxWpuyYG5jsD4'),
    ('PES1UG22CS333', 'Charlie Brown', 3, 'CSE', '$argon2id$v=19$m=65536,t=3,p=4$ZeYLsUGRdx1dh1Z7JYMX+w$ifeRkF7icxXzZ9sXznMLawAyU6QsqspxWpuyYG5jsD4'),
    ('PES1UG22CS444', 'David Bowie', 3, 'ECE', '$argon2id$v=19$m=65536,t=3,p=4$ZeYLsUGRdx1dh1Z7JYMX+w$ifeRkF7icxXzZ9sXznMLawAyU6QsqspxWpuyYG5jsD4'),
    ('PES1UG22CS555', 'Elona Holmes', 3, 'CSE', '$argon2id$v=19$m=65536,t=3,p=4$ZeYLsUGRdx1dh1Z7JYMX+w$ifeRkF7icxXzZ9sXznMLawAyU6QsqspxWpuyYG5jsD4');

INSERT INTO teachers (teacher_ID, name, title, department, password) VALUES
    ('TEA001', 'Dr. Emily White', 'Prof.', 'CSE', '$argon2id$v=19$m=65536,t=3,p=4$ZeYLsUGRdx1dh1Z7JYMX+w$ifeRkF7icxXzZ9sXznMLawAyU6QsqspxWpuyYG5jsD4'),
    ('TEA002', 'Dr. James Green', 'Assoc.', 'ECE', '$argon2id$v=19$m=65536,t=3,p=4$ZeYLsUGRdx1dh1Z7JYMX+w$ifeRkF7icxXzZ9sXznMLawAyU6QsqspxWpuyYG5jsD4'),
    ('TEA003', 'Dr. Sarah Black', 'Asst.', 'CSE', '$argon2id$v=19$m=65536,t=3,p=4$ZeYLsUGRdx1dh1Z7JYMX+w$ifeRkF7icxXzZ9sXznMLawAyU6QsqspxWpuyYG5jsD4'),
    ('TEA004', 'Dr. Sophie Mustard', 'Prof.', 'ECE', '$argon2id$v=19$m=65536,t=3,p=4$ZeYLsUGRdx1dh1Z7JYMX+w$ifeRkF7icxXzZ9sXznMLawAyU6QsqspxWpuyYG5jsD4');

INSERT INTO classes VALUES
    ('CL251CS221', 0, '206', '2022-26', 'UE22CS251A', 'TEA001'),
    ('CL252CS222', 0, '116', '2022-26', 'UE22CS252A', 'TEA001'),
    ('CL241CS223', 0, '202', '2022-26', 'UE22CS241A', 'TEA003'),
    ('CL242CS224', 0, '002', '2022-26', 'UE22CS242A', 'TEA003'),
    ('CL243CS225', 0, '304', '2022-26', 'UE22CS243A', 'TEA003'),
    ('CL251CS231', 0, '604', '2022-26', 'UE22EC251A', 'TEA002'),
    ('CL252CS232', 0, '517', '2022-26', 'UE22EC252A', 'TEA002'),
    ('CL241CS233', 0, '406', '2022-26', 'UE22EC241A', 'TEA004'),
    ('CL242CS234', 0, '802', '2022-26', 'UE22EC242A', 'TEA004'),
    ('CL243CS235', 0, '501', '2022-26', 'UE22EC243A', 'TEA004');

INSERT INTO assignments VALUES
    ('AS22CS2111', 'Unit 3 Worksheet', 'Complete task 1 and 2', '2024-9-10', '2024-9-20', 5, 'UE22CS251A'),
    ('AS22CS2121', 'Unit 4 Worksheet', 'Complete task 1, 2 and 3', '2024-11-10', '2024-10-25', 7, 'UE22CS251A'),
    ('AS22CS2211', 'Unit 3 Quiz', 'Complete task 1 and 2', '2024-9-10', '2024-9-20', 5, 'UE22CS252A'),
    ('AS22CS2151', 'Unit 4 Quiz', 'Complete task 1 and 2', '2024-11-10', '2024-10-25', 10, 'UE22CS252A');

INSERT INTO submissions VALUES
    ('SUB1000', '2024-9-17', '14:30:00', 5, 'PES1UG22CS111', 'AS22CS2111', 'CL251CS221'),
    ('SUB1001', '2024-9-13', '11:33:00', 4, 'PES1UG22CS333', 'AS22CS2111', 'CL251CS221'),
    ('SUB1002', '2024-9-17', '9:23:00', 0, 'PES1UG22CS111', 'AS22CS2211', 'CL252CS222'),
    ('SUB1003', '2024-9-13', '6:13:00', 0, 'PES1UG22CS333', 'AS22CS2211', 'CL252CS222');

INSERT into student_class VALUES
    ('PES1UG22CS111', 'CL251CS221'),
    ('PES1UG22CS333', 'CL251CS221'),
    ('PES1UG22CS111', 'CL252CS222'),
    ('PES1UG22CS333', 'CL252CS222');

