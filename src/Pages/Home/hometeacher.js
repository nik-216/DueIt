import React from 'react';
import './hometeacher.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Hometeacher() {
    const [name4, setName4] = useState("User");
    const [classes, setClasses] = useState([]); // State to store the teacher's classes
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTeacherData = async () => {
            const token = localStorage.getItem('token'); // Retrieve token from localStorage
    
            if (!token) {
                console.error('No token found in localStorage');
                return;
            }
    
            try {
                console.log("Sending token:", `Bearer ${token}`); // Log the token being sent
                const response = await axios.get('http://localhost:8000/api/teacher/home_teacher', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Attach token in Authorization header
                    },
                });

                if (response && response.data) {
                    setName4(response.data.name || "User"); // Set the name
                    setClasses(response.data.classes || []); // Set the classes
                    localStorage.setItem('classes', classes)
                } else {
                    console.warn("Unexpected response format:", response.data);
                }
            } catch (error) {
                console.error('Error fetching teacher data:', error);
                if (error.response) {
                    console.error('Server responded with:', error.response.status, error.response.data);
                } else {
                    console.error('Error Message:', error.message);
                }
            }
        };
    
        fetchTeacherData(); // Call the function to fetch teacher data
    }, []);

    const handleClassClick = (classId) => {
        localStorage.setItem('classID', classId);
        navigate('/teachers');
    };

    const handleAddClassroomClick = () => {
        navigate('/addclass');
    };

    return (
        <div id='bg1'>
            <div id="DUEIT">
                <img src="/logo.png" alt="pic" style={{ width: '200px', height: 'auto' }} />
            </div>
            <div id='bg2'>
                <div id='text4'>
                    <p>Hi<br />Welcome Back<br />{name4}!</p>
                </div>
                <div id='classroom4'>
                    <div id='classroom-text4'>Classroom</div>
                    <div id="classroom44">
                        {classes.length > 0 ? (
                            classes.map((classItem) => (
                                <button 
                                    key={classItem.class_ID}
                                    id={`class-${classItem.class_ID}-button`}
                                    className="class-button4"
                                    onClick={() => handleClassClick(classItem.class_ID)}
                                >
                                    {classItem.course_ID} - {classItem.classroom}
                                </button>
                            ))
                        ) : (
                            <p>No classes assigned</p>
                        )}
                    </div>
                    <button id="add-classroom-button4" className="class-button4" onClick={handleAddClassroomClick}>
                        + Classroom
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Hometeacher;
