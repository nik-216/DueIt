// Navigate.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './navigate.css';

function Navigate() {
    const navigate = useNavigate();

    const handleNavigateClick = () => {
        navigate('/home'); // Navigate to the Home page
    };

    return (
        <div id="navigate-container">
            <button id="navigate-btn" onClick={handleNavigateClick}>
                <img src="/logo.png" alt="DUEIT Logo" className="navigate-logo" />
            </button>
        </div>
    );
}

export default Navigate;
