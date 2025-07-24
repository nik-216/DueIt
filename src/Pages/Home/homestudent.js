import React from 'react';
import './homestudent.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Homestudent() {
    const [name5, setName5] = useState("User");
    const [classes, setClasses] = useState([]); // State to store classes
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
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
                    setName5(response.data.name || "User");
                    setClasses(response.data.classes || []);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, []);

    const handleClassClick = (classID) => {
        localStorage.setItem('classID', classID);
        navigate(`/student`); // Navigate to a class-specific route
    };

    return (
        <div id='bg1'>
            <div id="DUEIT">
                <img src="/logo.png" alt="pic" style={{ width: '200px', height: 'auto' }} />
            </div>
            <div id='bg2'>
                <div id='text5'>
                    <p>Hi<br />Welcome Back<br />{name5}!</p>
                </div>
                <div id='classroom5'>
                    <div id='classroom-text5'>Your Classes</div>
                    <div id="classroom55">
                        {classes.length > 0 ? (
                            classes.map((cls) => (
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
            </div>
        </div>
    );
}

export default Homestudent;
