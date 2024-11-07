import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';

function Signup() {
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
        const response = await axios.post('http://localhost:5000/api/signin', {
            id,
            password,
            role: role === 1 ? 'Teacher' : 'Student'
        });

        // Log the full response to inspect its structure
        console.log('Response:', response);

        // Ensure response.data is defined before accessing
        if (response.data && response.data.token) {
            console.log('Login successful, Token:', response.data.token);
            navigate('/home'); // Use absolute path here
        } else {
            alert('Login failed: Invalid response from server.');
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
        alert('Login failed: ' + errorMessage);
    }
};


    return (
        <div id='bg1'>
            <div id="DUEIT">
                <img src="/logo.png" alt="pic"style={{ width: '200px', height: 'auto' }}/>
            </div>
            <div id='bg2'>
                <div id='signup1'>SIGN UP</div>
                <div id='sign_up'>
                    <img src="/sign_in.png" alt="pic" />
                </div>
                <div id="hello">
                    <button
                        id="teacher-button"
                        className="toggle-button"
                        style={{ color: role === 1 ? '#6BC5D2' : 'white', fontSize: '25px' }}
                        onClick={() => handleRoleClick('Teacher')}
                    >
                        Teacher
                    </button>
                    <button
                        id="student-button"
                        className="toggle-button"
                        style={{ color: role === 0 ? '#6BC5D2' : 'white', fontSize: '25px' }}
                        onClick={() => handleRoleClick('Student')}
                    >
                        Student
                    </button>
                </div>
                <div id="id1"><p>ID</p></div>
                <div id="id-box1">
                    <input type="text" value={id} onChange={(e) => setId(e.target.value)} placeholder="Enter ID" />
                </div>
                <div id="password1">
                    <p>Password</p>
                </div>
                <div id="password-box1">
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
                </div>
                <div id="re_password">
                    <p>re-enter password</p>
                </div>
                <div id="re_password-box">
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="re-enter password" />
                </div>
                <div id="enter">
                    <button className="toggle-button" onClick={handleEnterClick} style={{ color: 'white', fontSize: '20px' }}>
                        ENTER
                    </button>
                </div>
                <div id='signup2'>
                    <p>have an account? <a href="/signin" style={{ color: '#6BC5D2', textDecoration: 'underline' }}>Signin</a></p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
