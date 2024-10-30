import React from 'react';
import './landing.css';
import logo from './logo.png'; // Make sure this is the correct path to your logo

function Landing() {
    return (
        <div id="background">
            <div id="dueit" style={{ backgroundImage: `url(${logo})` }}></div>
            <div id="track" style={{ fontFamily: 'Marcellus' }}>
                <b>Track all your assignments</b>
            </div>
            <div id="signin">
                <button type="button" id="signin-btn">SIGN IN</button>  
            </div>
        </div>
    );
}

export default Landing;
