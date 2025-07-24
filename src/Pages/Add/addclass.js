import React, { useState } from 'react';
import './addclass.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Addclass() {
    // const [selectedStudents, setSelectedStudents] = useState([]);
    const [coursecode, setCoursecode] = useState('');
    const [department8, setDepartment8] = useState('');
    const [classroom8, setClassroom8] = useState('');
    const [batch, setBatch] = useState('');
    const navigate = useNavigate();
    const [class_ID, setClass_ID] = useState('');

    const handleStudentClick = (name) => {
        navigate('/addstudent', { state: { class_ID }} );
    };

    const handleEnter8Click = () => {
        if (!coursecode || !department8 || !classroom8 || !batch) {
            alert('Please enter all values before proceeding.');
            return;
        }

        const classData = {
            coursecode,
            department: department8,
            classroom: classroom8,
            batch,
        };
        

        const token = localStorage.getItem('token'); // Retrieve the JWT token from local storage

        axios.post('http://localhost:8000/api/teacher/addclass', classData, {
            headers: {
                Authorization: `Bearer ${token}`, // Add the token to the Authorization header
            },
        })
            .then((response) => {
                setClass_ID(response.data.classID || "");
                alert('Class added successfully!');
                navigate('/addstudent', { state: { class_ID: response.data.classID } });
            })
            .catch((error) => {
                console.error('Error adding class:', error);
                alert(error.response?.data?.error || 'Failed to add class.');
            });
    };

    const handleLogo8Click = () => {
        navigate('/teachers'); // Navigates to the home page
    };

    return (
        <div id="bg1">
            <div id="DUEIT8" onClick={handleLogo8Click} style={{ cursor: 'pointer' }}>
                <img src="/logo.png" alt="pic" style={{ width: '200px', height: 'auto' }} />
            </div>
            <div id="bg2">
                <div id="text8">
                    <p>Add Class</p>
                </div>
                <div className="form-container8">
                    <div className="form-column8">
                        <div className="form-item8">
                            <label htmlFor="coursecode" className="form-label8">Course Code:</label>
                            <input id="coursecode" className="input-field8" type="text" placeholder="Enter course code" value={coursecode} onChange={(e) => setCoursecode(e.target.value)} />
                        </div>
                        <div className="form-item8">
                            <label htmlFor="department8" className="form-label8">Department:</label>
                            <input id="department8" className="input-field8" type="text" placeholder="Enter department" value={department8} onChange={(e) => setDepartment8(e.target.value)} />
                        </div>
                        <div className="form-item8">
                            <label htmlFor="classroom8" className="form-label8">Classroom:</label>
                            <input id="classroom8" className="input-field8" type="text" placeholder="Enter classroom" value={classroom8} onChange={(e) => setClassroom8(e.target.value)} />
                        </div>
                        <div className="form-item8">
                            <label htmlFor="batch" className="form-label8">Batch:</label>
                            <input id="batch" className="input-field8" type="text" placeholder="Enter batch" value={batch} onChange={(e) => setBatch(e.target.value)} />
                        </div>
                    </div>
                </div>
                {/* <button id="add-student-button8" onClick={() => handleStudentClick('+ Student')}>
                    + Student
                </button> */}
                <div id="enter8">
                    <button className="toggle-button8" onClick={handleEnter8Click} style={{ color: '#6BC5D2', fontSize: '20px' }}>
                        + Student
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Addclass;
