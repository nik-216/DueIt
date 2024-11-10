// Home.js
// import axios from 'axios';
import React from 'react';
import './hometeacher.css';

function Hometeacher() {
    return (
        <div id='bg1'>
            <div id="DUEIT">
                <img src="/logo.png" alt="pic" style={{ width: '200px', height: 'auto' }}/>
            </div>
            <div id='bg2'>
                <div id='text'><p>Hi<br/>Welcome Back<br/>Name!</p></div>
                <div id='classroom1'>
                <div id='classroom-text'>Classroom</div>
                <div id="classroom2">
                    <button id="class1-button" className="class-button">Class 1</button>
                    <button id="class2-button" className="class-button">Class 2</button>
                    <button id="class3-button" className="class-button">Class 3</button>
                    <button id="class4-button" className="class-button">Class 4</button>
                </div>
                <button id="add-classroom-button" className="class-button">+ Classroom</button>
            </div>
            </div>
        </div>
    );
}

export default Hometeacher;