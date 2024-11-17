import React, { useState } from 'react';
import './addstudent.css';

function Addstudent() {
    
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
                        <div className="form-item2">
                            <label htmlFor="id2" className="form-label2">id:</label>
                            <input id="id2" className="input-field2" type="text" placeholder="Enter id" value={id} onChange={(e) => setId(e.target.value)} />
                        </div>
                    </div>
                    <div id="name-box3">
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
                    <div id="enter1">
                        <button className="toggle-button3" onClick={handleEnterClick} style={{ color: '#6BC5D2', fontSize: '20px' }}>
                            ENTER
                        </button>
                    </div>
            </div>
        </div>
    );
}

export default Addstudent;
