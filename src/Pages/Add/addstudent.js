import React, { useState, useEffect } from 'react';
import './addstudent.css';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function Addstudent() {
    const navigate = useNavigate();
    const location = useLocation();
    const { class_ID } = location.state; // Get class_ID from location state

    const [selectedStudent, setSelectedStudent] = useState('');
    const [students, setStudents] = useState([]);
    const [id9, setId9] = useState('');

    // Fetch students in the class on component mount
    useEffect(() => {
        if (class_ID) {
            fetchStudentsInClass();
        } else {
            alert('Class ID is missing.');
            navigate('/teachers'); // Redirect to the teacher's page if class_ID is missing
        }
    }, [class_ID]);

        const fetchStudentsInClass = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/fetchstudents/${class_ID}`);
                setStudents(response.data.students || []);
            } catch (error) {
                console.error('Error fetching students:', error);
                alert('Failed to fetch students.');
            }
        };
    

    const handleStudentClick9 = (student) => {
        setSelectedStudent(student); // Set selected student on click
    };

    const handleEnterClick9 = async () => {
        if (!id9) {
            alert('Please enter an ID before proceeding.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/addstudent', {
                classId: class_ID,
                studentId: id9,
            });
            alert('Student added successfully!');
            setId9(''); // Clear input field
            fetchStudentsInClass(); // Refresh the student list
        } catch (error) {
            console.error('Error adding student:', error);
            alert(error.response?.data?.message || 'Failed to add student.');
        }
    };

    const handleLogo9Click = () => {
        navigate('/teachers'); // Navigate to the teacher's page
    };

    return (
        <div id="bg1">
            <div id="DUEIT9" onClick={handleLogo9Click} style={{ cursor: 'pointer' }}>
                <img src="/logo.png" alt="pic" style={{ width: '200px', height: 'auto' }} />
            </div>
            <div id="bg2">
                <div id="text9">
                    <p>Add Student to Class: {class_ID}</p>
                </div>
                <div className="form-all9">
                    <div className="form-item9">
                        <label htmlFor="id9" className="form-label9">ID:</label>
                        <input
                            id="id9"
                            className="input-field9"
                            type="text"
                            placeholder="Enter student ID"
                            value={id9}
                            onChange={(e) => setId9(e.target.value)}
                        />
                    </div>
                </div>
                <div id="name-box9">
                <div id="student-text9">Students</div>
                    {students.length === 0 ? (
                        <p>No students in this class.</p>
                    ) : (
                        students.map((student, index) => (
                            <div
                                key={index}
                                id={`name${index + 1}-button`}
                                className={`name-button9 ${selectedStudent === student.student_ID ? 'selected' : ''}`}
                                onClick={() => handleStudentClick9(student)}
                            >
                                {student.student_ID}
                            </div>
                        ))
                    )}
                </div>
                <div id="enter9">
                    <button
                        className="toggle-button9"
                        onClick={handleEnterClick9}
                        style={{ color: '#6BC5D2', fontSize: '20px' }}
                    >
                        ENTER
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Addstudent;
