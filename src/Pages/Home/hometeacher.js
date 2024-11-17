import React from 'react';
import './hometeacher.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Hometeacher() {
    const [name, setName] = useState("User");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token'); // Retrieve token from localStorage
    
            if (!token) {
                console.error('No token found in localStorage');
                return;
            }
    
            try {
                console.log("Sending token:", `Bearer ${token}`); // Log the token being sent
                const response = await axios.get('http://localhost:8000/api/home', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Attach token in Authorization header
                    },
                });

                if (response && response.data && response.data.name) {
                    setName(response.data.name); // Set the name if available in response
                } else {
                    console.warn("No name property in response:", response.data);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                if (error.response) {
                    console.error('Server responded with:', error.response.status, error.response.data);
                } else {
                    console.error('Error Message:', error.message);
                }
            }
        };
    
        fetchUserData(); // Call the function to fetch user data
    }, []);
    const handleClassButton4Click = () => {
        navigate('/teachers');
    };
    const handleAddClassroom4Click = () => {
        navigate('/teachers'); 
    };

    return (
        <div id='bg1'>
            <div id="DUEIT">
                <img src="/logo.png" alt="pic" style={{ width: '200px', height: 'auto' }}/>
            </div>
            <div id='bg2'>
                <div id='text4'>
                    <p>Hi<br />Welcome Back<br />{name}!</p>
                </div>
                <div id='classroom4'>
                <div id='classroom-text4'>Classroom</div>
                <div id="classroom44">
                    <button id="class1-button" className="class-button4" onClick={handleClassButton4Click}>Class 1</button>
                    <button id="class2-button" className="class-button4" onClick={handleClassButton4Click}>Class 2</button>
                    <button id="class3-button" className="class-button4" onClick={handleClassButton4Click}>Class 3</button>
                    <button id="class4-button" className="class-button4" onClick={handleClassButton4Click}>Class 4</button>
                </div>
                <button id="add-classroom-button4" className="class-button4" onClick={handleAddClassroom4Click}>+ Classroom</button>
            </div>
            </div>
        </div>
    );
}

export default Hometeacher;