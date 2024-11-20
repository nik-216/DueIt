const argon2 = require('argon2');

async function generateInserts() {
    const password = '111';

    // Hash the password
    const hashedPassword = await argon2.hash(password);

    // Sample data for students
    const students = [
        { student_ID: 'PES1UG22CS111', name: 'Alice Johnson', semester: 3, department: 'CSE' },
        { student_ID: 'PES1UG22CS222', name: 'Bob Smith', semester: 3, department: 'ECE' },
        { student_ID: 'PES1UG22CS333', name: 'Charlie Brown', semester: 3, department: 'CSE' },
        { student_ID: 'PES1UG22CS444', name: 'David Bowie', semester: 3, department: 'ECE' },
    ];

    // Sample data for teachers
    const teachers = [
        { teacher_ID: 'TEA001', name: 'Dr. Emily White', title: 'Prof.', department: 'CSE' },
        { teacher_ID: 'TEA002', name: 'Dr. James Green', title: 'Assoc.', department: 'ECE' },
        { teacher_ID: 'TEA003', name: 'Dr. Sarah Black', title: 'Asst.', department: 'CSE' },
        { teacher_ID: 'TEA004', name: 'Dr. Sophie Mustard', title: 'Prof.', department: 'ECE' },
    ];

    // Generate SQL inserts for students
    console.log('-- Inserts for students');
    console.log(`INSERT INTO students (student_ID, name, semester, department, password) VALUES`)
    students.forEach(student => {
        console.log(`('${student.student_ID}', '${student.name}', ${student.semester}, '${student.department}', '${hashedPassword}')`);
    });

    // Generate SQL inserts for teachers
    console.log('-- Inserts for teachers');
    console.log(`INSERT INTO teachers (teacher_ID, name, title, department, password) VALUES`)
    teachers.forEach(teacher => {
        console.log(`('${teacher.teacher_ID}', '${teacher.name}', '${teacher.title}', '${teacher.department}', '${hashedPassword}')`);
    });
}

generateInserts().catch(err => console.error(err));
