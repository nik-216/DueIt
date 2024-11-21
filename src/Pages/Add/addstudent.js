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
    const [numStudents, setNumStudents] = useState(0); // Track number of students in the class

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
            setNumStudents(response.data.num_st || 0); // Set number of students
        } catch (error) {
            console.error('Error fetching students:', error);
            alert('Failed to fetch students.');
        }
    };
    
    const handleDoneClick9 = (student) => {
        navigate('/teachers');
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

    const handleRemoveClick9 = async () => {
        if (!id9) {
            alert('Please enter an ID before proceeding.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/removestudent', {
                classId: class_ID,
                studentId: id9,
            });
            alert('Student removed successfully!');
            setId9(''); // Clear input field
            fetchStudentsInClass(); // Refresh the student list
        } catch (error) {
            console.error('Error removing student:', error);
            alert(error.response?.data?.message || 'Failed to remove student.');
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
                <div id="student-info">
                    <p>Number of Students in Class: {numStudents}</p> {/* Display num_st */}
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
                <div id="ADD9">
                    <button
                        className="toggle-button9"
                        onClick={handleEnterClick9 }
                        style={{ color: '#6BC5D2', fontSize: '20px' }}
                    >
                        +
                    </button>
                </div>
                <div id="SUB9">
                    <button
                        className="toggle-button9"
                        onClick={handleRemoveClick9 }
                        style={{ color: '#6BC5D2', fontSize: '20px' }}
                    >
                        -
                    </button>
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
                            >
                                {student.student_ID}
                            </div>
                        ))
                    )}
                </div>
                <div id="enter9">
                    <button
                        className="toggle-button9"
                        onClick={handleDoneClick9}
                        style={{ color: '#6BC5D2', fontSize: '20px' }}
                    >
                        DONE
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Addstudent;
