// Home.js
import React, { useState } from 'react';
import './addassign.css';
import { Navigate, useNavigate } from 'react-router-dom';

function Addassign() {
    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const [selectedStudent, setSelectedStudent] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [releasedate, setReleasedate] = useState(getCurrentDate());
    const [duedate, setDuedate] = useState('');
    const [maxmarks, setMaxmarks] = useState('');
    const navigate = useNavigate();

    const handleAddStudentClick = () => {
        navigate('/addstudent');
    };
    const handleStudentClick = (className) => {
        setSelectedStudent(className);
    };
    
    const handleEnter3Click = () => {
        if (!title || !description || !releasedate || !duedate || !maxmarks ) {
            alert('Please enter all values before proceeding.');
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
                    <p>Add Assignment</p>
                </div>
                    <div className="form-all-fields">
                        <div className="form-item">
                            <label htmlFor="title" className="form-label">Title:</label>
                            <input id="title1" className="input-field" type="text" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="form-item">
                            <label htmlFor="description" className="form-label">Description:</label>
                            <input id="description"  className="input-field" rows="4" type="text" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} style={{ height: '100px'}} />
                        </div>
                        <div className="form-item">
                            <label htmlFor="releasedate" className="form-label">Release Date:</label>
                            <input id="releasedate"  className="input-field" type="text" value={releasedate} onChange={(e) => setReleasedate(e.target.value)} />
                        </div>
                        <div className="form-item">
                            <label htmlFor="duedate" className="form-label">Due Date:</label>
                            <input id="duedate"  className="input-field" type="text" placeholder="Enter Due Date" value={duedate} onChange={(e) => setDuedate(e.target.value)} />
                        </div>
                        <div className="form-item">
                            <label htmlFor="maxmarks" className="form-label">Max marks:</label>
                            <input id="maxmarks" className="input-field" type="text" placeholder="Enter Max marks" value={maxmarks} onChange={(e) => setMaxmarks(e.target.value)}/>
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
                    <button id="add-student-button" onClick={() => handleAddStudentClick('+ Student')}>
                        + Student
                    </button>
                    <div id="enter3">
                        <button className="toggle-button3" onClick={handleEnter3Click} style={{ color: '#6BC5D2', fontSize: '20px' }}>
                            ENTER
                        </button>
                    </div>
            </div>
        </div>
    );
}

export default Addassign;
