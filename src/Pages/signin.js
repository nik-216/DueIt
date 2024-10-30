import React from 'react';
import './signin.css';

function Signin() {
    // Function to toggle color for the clicked button
    const toggleColor = (e) => {
        // Check the current color of the button and toggle it
        e.target.style.color = e.target.style.color === 'white' ? '#6BC5D2' : 'white';
    };

    return (
        <div id='bg1'>
            <div id='dueit'></div>
            <div id='bg2'>
                <div id='signin' >SIGN IN</div>
                <div id='sign_in'></div>
                <div className="SignIn">
                    <button className="toggle-button" onClick={toggleColor}>Teacher</button>
                    <button className="toggle-button" onClick={toggleColor}>Student</button>
                </div>
                <div id="srn">
                    <p>srn</p>
                </div>
                <div id="srn-box">
                    <input type="text" id="text-box" placeholder="Enter srn"></input>
                </div>
                <div id="password">
                    <p>Password</p>
                </div>
                <div id="password-box">
                    <input type="password" id="pass-box" placeholder="Enter password"></input>
                </div>
                <div id="enter">
                    <button type="submit" id="submit-btn">ENTER</button>  
                </div>
                <div id='signup'>
                    <p>Don't have an account? Signup</p>
                </div>
            </div>
        </div>
    );
}

export default Signin;
