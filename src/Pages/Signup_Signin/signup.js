import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';

function Signup() {
    const [role, setRole] = useState(0); // 0 for Student, 1 for Teacher
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [semester, setSemester] = useState('');
    const [title, setTitle] = useState('');
    const navigate = useNavigate();

    const handleRoleClick = (selectedRole) => {
        setRole(selectedRole === 'Teacher' ? 1 : 0);
    };

    const handleEnterClick = async () => {
    if (!id || !password || !confirmPassword || !name || !department) {
        alert('Please enter ID, Password, and confirm your password');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    try {
        const response = await axios.post('http://localhost:8000/api/auth/signup', {
            id,
            password,
            role: role === 1 ? 'Teacher' : 'Student',
            name,
            department,
            semester,
            title
        });

        if (response.data && response.data.message === 'User registered successfully') {
            alert('Signup successful! You can now log in.');
            navigate('/signin');
        } else {
            alert('Signup failed: ' + response.data.message);
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
        alert('Signup failed: ' + errorMessage);
    }
};

    return (
        <div id='bg1'>
            <div id="DUEIT">
                <img src="/logo.png" alt="pic"style={{ width: '200px', height: 'auto' }}/>
            </div>
            <div id='bg2'>
                <div id='signup1'>SIGN UP</div>
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


                <div id="name"><p>Name</p></div>
                <div id="name-box">
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name" />
                </div>

                <div id="department"><p>Department</p></div>
                <div id="department-box">
                    <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="Enter Department" />
                </div>
                {role === 0 && (
                    <div id="semester">
                        <p>Semester</p>
                    </div>
                )}
                {role === 0 && (
                    <div id="semester-box">
                    <input type="text" value={semester} onChange={(e) => setSemester(e.target.value)} placeholder="Enter semester"/>
                    </div>
                )}
                {role === 1 && (
                    <div id="title"><p>Title</p>
                </div>
                )}
                {role === 1 && (
                    <div id="title-box">
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter title"/>
                    </div>
                )}



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
                    <p>Re-enter Password</p>
                </div>
                <div id="re_password-box">
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter password"/>
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
