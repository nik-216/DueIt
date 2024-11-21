import React, { useState, useEffect } from 'react';
import './teachers.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Teachers() {
    const [allClasses, setAllClasses] = useState({});
    const [selectedClass, setSelectedClass] = useState('');
    const [classDetails, setClassDetails] = useState(null);
    const navigate = useNavigate();

    // Fetch all classes on initial load
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchAllClasses(token);
        }
    }, []);

    // Fetch all class information
    const fetchAllClasses = async (token) => {
        try {
            const response = await axios.get('http://localhost:8000/api/teacher-classes', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setAllClasses(response.data);
            const storedClass = localStorage.getItem('classID');
            if (storedClass && response.data[storedClass]) {
                setSelectedClass(storedClass);
                setClassDetails(response.data[storedClass]);
            }
        } catch (error) {
            console.error('Error fetching all classes:', error);
        }
    };

    // Select a class and update state
    const handleClassNameClick = (classID) => {
        setSelectedClass(classID);
        setClassDetails(allClasses[classID]);
        localStorage.setItem('classID', classID);
    };

    // Format date strings
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // YYYY-MM-DD format
    };

    // Navigate to different routes
    const handleAddClassClick = () => navigate('/addclass');
    const handleAddAssignClick = () => navigate('/addassign', { state: { class_ID: selectedClass }});
    const handleAddStudentClick = () =>navigate('/addstudent', { state: { class_ID: selectedClass }} );
    const handleAssignmentClick = (assignmentID) =>
        navigate('/viewassign', { state: { assignmentID } });
    const handleLogoutClick = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('classID');
        navigate('/signin');
    };

    return (
        <div id="bg1">
            <div id="DUEIT">
                <img src="/logo.png" alt="Logo" style={{ width: '200px', height: 'auto' }} />
            </div>
            <div id="LOGOUT" onClick={handleLogoutClick} style={{ cursor: 'pointer' }}>
                <img src="/logout.png" alt="Logout" style={{ width: '50px', height: 'auto' }} />
            </div>
            <div id="bg2">
                <div id="text6">
                    <p>{selectedClass ? `Class: ${selectedClass}` : 'Select a class to view details'}</p>
                </div>
                <div id="classroom-box6">
                    <div id="classroom-text6">Classroom</div>
                    <div id="classroom6">
                        {Object.keys(allClasses).length > 0 ? (
                            Object.keys(allClasses).map((classID) => (
                                <button
                                    key={classID}
                                    className={`class-button6 ${selectedClass === classID ? 'active' : ''}`}
                                    onClick={() => handleClassNameClick(classID)}
                                >
                                    {allClasses[classID].course_ID} - {allClasses[classID].classroom}
                                </button>
                            ))
                        ) : (
                            <p>Loading classrooms...</p>
                        )}
                    </div>
                    <button id="add-classroom-button6" className="class-button6" onClick={handleAddClassClick}>
                        + Classroom
                    </button>
                </div>
                {classDetails && (
                    <>
                        <div id="isa-box6">
                            <div id="isa1" className="exams6">
                                ISA1: {formatDate(classDetails.exams.isa1_date)}
                            </div>
                            <div id="isa2" className="exams6">
                                ISA2: {formatDate(classDetails.exams.isa2_date)}
                            </div>
                            <div id="esa" className="exams6">
                                ESA: {formatDate(classDetails.exams.esa_date)}
                            </div>
                        </div>
                        <div id="name-box6">
                            {classDetails.students.map((name, index) => (
                                <div key={index} className="name-button6">
                                    {name}
                                </div>
                            ))}
                            <div className="add-student6" onClick={handleAddStudentClick}>
                                + Student
                            </div>
                        </div>
                        <div className="table-container6">
                            <table className="assignment-table6">
                                <thead>
                                    <tr>
                                        <th>Assignment</th>
                                        <th>Start Date</th>
                                        <th>Due Date</th>
                                        <th>Title</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {classDetails.assignments.map((assignment) => (
                                        <tr
                                            key={assignment.assignment_ID}
                                            onClick={() => handleAssignmentClick(assignment.assignment_ID)}
                                        >
                                            <td>{assignment.assignment_ID}</td>
                                            <td>{formatDate(assignment.start_date)}</td>
                                            <td>{formatDate(assignment.due_date)}</td>
                                            <td>{assignment.title}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="add-assignment6" onClick={handleAddAssignClick}>
                                + Assignment
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Teachers;
