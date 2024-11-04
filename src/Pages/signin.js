import React from 'react';
import './signin.css';
import logo from './logo.png';

function Signin() {
    // Function to handle button clicks for Teacher and Student
    const handleRoleClick = (role) => {
        const teacherButton = document.getElementById('teacher-button');
        const studentButton = document.getElementById('student-button');

        // Reset button colors
        teacherButton.style.color = 'white';
        studentButton.style.color = 'white';

        // Set the clicked button color
        if (role === 'Teacher') {
            teacherButton.style.color = '#6BC5D2';
        } else {
            studentButton.style.color = '#6BC5D2';
        }
    };

    const handleEnterClick = () => {
        // Retrieve values from input fields
        const srn = document.getElementById('text-box').value;
        const password = document.getElementById('pass-box').value;

        // Only proceed if both fields are filled
        if (srn && password) {
            console.log('Entering...');
            // Add your logic for the Enter button here
        } else {
            alert('Please enter both SRN and Password');
        }
    };

    return (
        <div id='bg1'>
            <div id="DUEIT" style={{ backgroundImage: `url(${logo})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', height: '100px' }}></div>
            <div id='bg2'>
                <div id='signin'>SIGN IN</div>
                <div id='sign_in'></div>
                <div id="hello">
                    <button id="teacher-button" className="toggle-button" style={{ color: 'white',fontFamily: 'Marcellus',fontSize: '30px' }} onClick={() => handleRoleClick('Teacher')}>Teacher</button>
                    <button id="student-button" className="toggle-button" style={{ color: 'white',fontFamily: 'Marcellus',fontSize: '30px' }} onClick={() => handleRoleClick('Student')}>Student</button>
                </div>
                <div id="srn"><p>srn</p></div>
                <div id="srn-box">
                    <input type="text" id="text-box" placeholder="Enter srn" /></div>
                <div id="password">
                    <p>Password</p>
                </div>
                <div id="password-box">
                    <input type="password" id="pass-box" placeholder="Enter password" />
                </div>
                <div id="enter">
                    <button className="toggle-button" onClick={handleEnterClick} style={{ color: 'white',fontSize: '30px' }}>ENTER</button>
                </div>
                <div id='signup'>
                    <p>Don't have an account? <a href="/signup" style={{ color: '#6BC5D2', textDecoration: 'underline' }}> Signup</a></p>
                </div>
            </div>
        </div>
    );
}

export default Signin;