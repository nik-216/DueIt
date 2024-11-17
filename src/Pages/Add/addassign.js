// Home.js
import React, { useState } from 'react';
import './addassign.css';
import { useNavigate } from 'react-router-dom';

function Addassign() {
    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const [selectedStudent, setSelectedStudent] = useState('');
    const [title7, setTitle7] = useState('');
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
    
    const handleEnter7Click = () => {
        if (!title7 || !description || !releasedate || !duedate || !maxmarks ) {
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
                <div id="text7">
                    <p>Add Assignment</p>
                </div>
                    <div className="form-all-fields7">
                        <div className="form-item7">
                            <label htmlFor="title7" className="form-label7">Title:</label>
                            <input id="title7" className="input-field7" type="text" placeholder="Enter title" value={title7} onChange={(e) => setTitle7(e.target.value)} />
                        </div>
                        <div className="form-item7">
                            <label htmlFor="description" className="form-label7">Description:</label>
                            <input id="description"  className="input-field7" rows="4" type="text" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} style={{ height: '100px'}} />
                        </div>
                        <div className="form-item7">
                            <label htmlFor="releasedate" className="form-label7">Release Date:</label>
                            <input id="releasedate"  className="input-field7" type="text" value={releasedate} onChange={(e) => setReleasedate(e.target.value)} />
                        </div>
                        <div className="form-item7">
                            <label htmlFor="duedate" className="form-label7">Due Date:</label>
                            <input id="duedate"  className="input-field7" type="text" placeholder="Enter Due Date" value={duedate} onChange={(e) => setDuedate(e.target.value)} />
                        </div>
                        <div className="form-item7">
                            <label htmlFor="maxmarks" className="form-label7">Max marks:</label>
                            <input id="maxmarks" className="input-field7" type="text" placeholder="Enter Max marks" value={maxmarks} onChange={(e) => setMaxmarks(e.target.value)}/>
                        </div>
                    </div>
                    <div id="name-box7">
                        <div id="student-text7">Students</div>
                        <div id="name1-button" className="name-button7" onClick={() => handleStudentClick('Name 1')}>
                            Name 1
                        </div>
                        <div id="name2-button" className="name-button7" onClick={() => handleStudentClick('Name 2')}>
                            Name 2
                        </div>
                        <div id="name3-button" className="name-button7" onClick={() => handleStudentClick('Name 3')}>
                            Name 3
                        </div>
                    </div>
                    <button id="add-student-button7" onClick={() => handleAddStudentClick('+ Student')}>
                        + Student
                    </button>
                    <div id="enter7">
                        <button className="toggle-button7" onClick={handleEnter7Click} style={{ color: '#6BC5D2', fontSize: '20px' }}>
                            ENTER
                        </button>
                    </div>
            </div>
        </div>
    );
}

export default Addassign;
