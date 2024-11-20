import React, { useState } from 'react';
import './addstudent.css';
import { useNavigate } from 'react-router-dom';

function Addstudent() {
    const [selectedStudent, setSelectedStudent] = useState('');
    const navigate = useNavigate();
    const [id9, setId9] = useState('');
    const students = ['Name 1', 'Name 2', 'Name 3']; // Array of student names

    const handleStudentClick9 = (className) => {
        setSelectedStudent(className);
    };

    const handleEnterClick9 = () => {
        if (!id9) {
            alert('Please enter id before proceeding.');
        } else {
            alert('Enter Works');
            navigate('/teachers')
        }
    };
    const handleLogo9Click = () => {
        navigate('/teachers'); // Navigates to the home page
    };


    return (
        <div id="bg1">
            <div id="DUEIT9" onClick={handleLogo9Click} style={{ cursor: 'pointer' }}>
                <img src="/logo.png" alt="pic" style={{ width: '200px', height: 'auto' }} />
            </div>
            <div id="bg2">
                <div id="text9">
                    <p>Add Student</p>
                </div>
                <div className="form-all9">
                    <div className="form-item9">
                        <label htmlFor="id9" className="form-label9">id:</label>
                        <input
                            id="id9"
                            className="input-field9"
                            type="text"
                            placeholder="Enter id"
                            value={id9}
                            onChange={(e) => setId9(e.target.value)}
                        />
                    </div>
                </div>
                <div id="name-box9">
                    <div id="student-text9">Students</div>
                    {students.map((student, index) => (
                        <div
                            key={index}
                            id={`name${index + 1}-button`}
                            className="name-button9"
                            onClick={() => handleStudentClick9(student)}
                        >
                            {student}
                        </div>
                    ))}
                </div>
                <div id="enter9">
                    <button
                        className="toggle-button9"
                        onClick={handleEnterClick9}
                        style={{ color: '#6BC5D2', fontSize: '20px' }}
                    >
                        ENTER
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Addstudent;
