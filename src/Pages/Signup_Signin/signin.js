import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signin.css';

function Signin() {
    const [role, setRole] = useState(0); // 0 for Student, 1 for Teacher
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRoleClick = (selectedRole) => {
        setRole(selectedRole === 'Teacher' ? 1 : 0);
    };

    const handleEnterClick = async () => {
        if (!id || !password) {
            alert('Please enter both ID and Password');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/signin', {
                id,
                password,
                role: role === 1 ? 'Teacher' : 'Student'
            });
            localStorage.setItem('token', response.data.token);
            console.log('Login successful, Token:', response.data.token);
            // console.log(localStorage.getItem('token'));
            if (role === 1) {
                navigate('/hometeacher'); // Teacher's landing page
            } else {
                navigate('/homestudent'); // Student's landing page
            }
        } catch (error) {
            const errorMessage = error.response && error.response.data && error.response.data.message 
                ? error.response.data.message 
                : 'An error occurred. Please try again.';
            alert('Login failed: ' + errorMessage);
        }
    };

    return (
        <div id='bg1'>
            <div id="DUEIT">
                <img src="/logo.png" alt="pic" />
            </div>
            <div id='bg2'>
                <div id='signin'>SIGN IN</div>
                <div id='sign_in'>
                    <img src="/sign_in.png" alt="pic" />
                </div>
                <div id="hello">
                    <button
                        id="teacher-button"
                        className="toggle-button"
                        style={{ color: role === 1 ? '#6BC5D2' : 'white', fontSize: '30px' }}
                        onClick={() => handleRoleClick('Teacher')}
                    >
                        Teacher
                    </button>
                    <button
                        id="student-button"
                        className="toggle-button"
                        style={{ color: role === 0 ? '#6BC5D2' : 'white', fontSize: '30px' }}
                        onClick={() => handleRoleClick('Student')}
                    >
                        Student
                    </button>
                </div>
                <div id="id"><p>ID</p></div>
                <div id="id-box">
                    <input type="text" value={id} onChange={(e) => setId(e.target.value)} placeholder="Enter ID" />
                </div>
                <div id="password">
                    <p>Password</p>
                </div>
                <div id="password-box">
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
                </div>
                <div id="enter">
                    <button className="toggle-button" onClick={handleEnterClick} style={{ color: 'white', fontSize: '30px' }}>
                        ENTER
                    </button>
                </div>
                <div id='signup'>
                    <p>Don't have an account? <a href="/signup" style={{ color: '#6BC5D2', textDecoration: 'underline' }}>Signup</a></p>
                </div>
            </div>
        </div>
    );
}

export default Signin;
