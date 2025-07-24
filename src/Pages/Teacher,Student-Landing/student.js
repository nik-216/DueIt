import React, { useEffect, useState } from 'react';
import './student.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Student() {
    const [selectedClass, setSelectedClass] = useState(''); // State to store the selected class name
    const [classrooms, setClassrooms] = useState([]); // State to store classroom data
    const [assignments, setAssignments] = useState([]); // State to store assignments
    const [examDates, setExamDates] = useState({}); // State to store exam dates
    const navigate = useNavigate();

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // YYYY-MM-DD format
    };

    // Fetch classroom data on component mount
    useEffect(() => {
        const fetchClassrooms = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('No token found in localStorage');
                return;
            }

            try {
                const response = await axios.get('http://localhost:8000/api/student/home_student', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response && response.data) {
                    setClassrooms(response.data.classes || []);
                }
            } catch (error) {
                console.error('Error fetching classrooms:', error);
            }
        };

        fetchClassrooms();
    }, []);

    // Fetch assignments and exam dates when a class is selected
    useEffect(() => {
        if (selectedClass) {
            const fetchClassDetails = async () => {
                const token = localStorage.getItem('token');

                try {
                    const response = await axios.get(`http://localhost:8000/api/student/class-details/${selectedClass}`,{} ,{
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (response && response.data) {
                        const { assignments, examDates } = response.data;
                        setAssignments(assignments);
                        setExamDates(examDates);
                    }
                } catch (error) {
                    console.error('Error fetching class details:', error);
                }
            };

            fetchClassDetails();
        }
    }, [selectedClass]);

    // Handle assignment submit click
    const handleSubmitAssignment = async (assignment_ID, class_ID) => {
        const token = localStorage.getItem('token');
        const submissionData = { assignment_ID, class_ID };
    
        try {
            const response = await axios.post('http://localhost:8000/api/student/submit-assignment', submissionData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            if (response.data.message === 'Assignment submitted successfully') {
                alert('Assignment submitted successfully');
            }
        } catch (error) {
            console.error('Error submitting assignment:', error);
            alert('Failed to submit assignment. Please try again.');
        }
    };    

    // Handle classroom button click
    const handleClassClick = (className) => {
        setSelectedClass(className);
    };

    // Handle logout
    const handleLogoutClick = () => {
        localStorage.removeItem('token'); // Clear token on logout
        navigate('/signin'); // Navigate to sign-in page
    };

    return (
        <div id='bg1'>
            <div id="DUEIT">
                <img src="/logo.png" alt="pic" style={{ width: '200px', height: 'auto' }} />
            </div>
            <div id="LOGOUT" onClick={handleLogoutClick} style={{ cursor: 'pointer' }}>
                <img src="/logout.png" alt="pic" style={{ width: '50px', height: 'auto' }} />
            </div>
            <div id='bg2'>
                {/* Display selected class */}
                <div id='text10'>
                    <p>{selectedClass ? `Class: ${selectedClass}` : 'Select a Class'}</p>
                </div>

                {/* Classroom Section */}
                <div id='classroom-box10'>
                    <div id='classroom-text10'>Classroom</div>
                    <div id="classroom10">
                        {classrooms.length > 0 ? (
                            classrooms.map((cls) => (
                                <button
                                    key={cls.class_ID}
                                    id={`class-${cls.class_ID}`}
                                    className="class-button5"
                                    onClick={() => handleClassClick(cls.class_ID)}
                                >
                                    {cls.course_name}
                                </button>
                            ))
                        ) : (
                            <p>No classes assigned yet.</p>
                        )}
                    </div>
                </div>

                {/* ISA Section */}
                <div id='isa-box10'>
                    <div id='isa1' className='exams10'>ISA 1: {formatDate(examDates.isa1) || 'N/A'}</div>
                    <div id='isa2' className='exams10'>ISA 2: {formatDate(examDates.isa2) || 'N/A'}</div>
                    <div id='esa' className='exams10'>ESA: {formatDate(examDates.esa) || 'N/A'}</div>
                </div>

                {/* Assignment Table Section */}
                <div className="table-container10">
                    <table className="assignment-table10">
                        <thead>
                            <tr>
                                <th>ASSIGNMENT</th>
                                <th>START DATE</th>
                                <th>DUE DATE</th>
                                <th>TITLE</th>
                                <th>SUBMIT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assignments.map((assignment, index) => (
                                <tr key={index}>
                                    <td>{assignment.assignment_ID}</td>
                                    <td>{formatDate(assignment.startDate)}</td>
                                    <td>{formatDate(assignment.dueDate)}</td>
                                    <td>{assignment.title}</td>
                                    <td>
                                        <button onClick={() => handleSubmitAssignment(assignment.assignment_ID, selectedClass)}>
                                            SUBMIT
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Student;
