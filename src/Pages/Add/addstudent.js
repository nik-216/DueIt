// Home.js
import React, { useState } from 'react';
import './home.css';

function Home() {
    
    const [selectedStudent, setSelectedStudent] = useState('');
    const [id, setId] = useState('');
    const handleStudentClick = (className) => {
        setSelectedStudent(className);
    };

    const handleEnterClick = () => {
        if (!id ) {
            alert('Please enter id before proceeding.');
        } else {
            alert('Enter Works');
        }
    };
    

    return (
        <div id="bg1">
            <div id="DUEIT">
                <img src="/logo.png" alt="pic" style={{ width: '200px', height: 'auto' }} />
            </div>
            <div id="bg2">
                <div id="text2">
                    <p>Add Student</p>
                </div>
                    <div className="form-all">
                        <div className="form-item">
                            <label htmlFor="id" className="form-label">id:</label>
                            <input id="id" className="input-field" type="text" placeholder="Enter id" value={id} onChange={(e) => setId(e.target.value)} />
                        </div>
                    </div>
                    <div id="name-box">
                        <div id="student-text">Students</div>
                        <div id="name1-button" className="name-button" onClick={() => handleStudentClick('Name 1')}>
                            Name 1
                        </div>
                        <div id="name2-button" className="name-button" onClick={() => handleStudentClick('Name 2')}>
                            Name 2
                        </div>
                        <div id="name3-button" className="name-button" onClick={() => handleStudentClick('Name 3')}>
                            Name 3
                        </div>
                    </div>
                    <button id="add-student-button" onClick={() => handleStudentClick('+ Student')}>
                        + Student
                    </button>
                    <div id="enter1">
                        <button className="toggle-button" onClick={handleEnterClick} style={{ color: '#6BC5D2', fontSize: '20px' }}>
                            ENTER
                        </button>
                    </div>
            </div>
        </div>
    );
}

export default Home;
