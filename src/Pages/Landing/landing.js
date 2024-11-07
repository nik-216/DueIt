import React from 'react';
import { useNavigate } from 'react-router-dom';
import './landing.css';
// import Signin from './signin';

function Landing() {
    const navigate = useNavigate();

    const handleSignInClick = () => {
        navigate('./signin'); // Navigate to the SignIn page
    };

    return (
        <div id="background">
            <div id="dueit">
                <img src="/logo.png" alt="pic" />
            </div>
            <div id="track">
                <b>Track all your assignments</b>
            </div>
            <div id="sign-in">
                <button type="button" id="signin-btn-landing" onClick={handleSignInClick}>
                    SIGN IN
                </button>  
            </div>
        </div>
    );
}

export default Landing;
