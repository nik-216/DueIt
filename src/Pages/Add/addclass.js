import React, { useState } from 'react';
import './addclass.css';

function Addclass() {
    const [selectedStudent, setSelectedStudent] = useState('');
    const [coursecode, setCoursecode] = useState('');
    const [section, setSection] = useState('');
    const [department, setDepartment] = useState('');
    const [semester, setSemester] = useState('');
    const [classroom, setClassroom] = useState('');
    const [batch, setBatch] = useState('');
    const [isa1, setIsa1] = useState('');
    const [isa2, setIsa2] = useState('');
    const [esa, setEsa] = useState('');
    const navigate = useNavigate();

    const handleStudentClick = (className) => {
        setSelectedStudent(className);
    };

    const handleEnterClick = () => {
        if (!coursecode || !section || !department || !semester || !classroom || !batch || !isa1 || !isa2 || !esa) {
            alert('Please enter all values before proceeding.');
        } else {
            alert('Enter Works');
            navigate('./hometeacher.js')
        }
    };
    

    return (
        <div id="bg1">
            <div id="DUEIT">
                <img src="/logo.png" alt="pic" style={{ width: '200px', height: 'auto' }} />
            </div>
            <div id="bg2">
                <div id="text2">
                    <p>Add Class</p>
                </div>
                    <div className="form-container">
                        <div className="form-item">
                            <label htmlFor="coursecode" className="form-label">Course Code:</label>
                            <input id="coursecode" className="input-field" type="text" placeholder="Enter course code" value={coursecode} onChange={(e) => setCoursecode(e.target.value)} />
                        </div>
                        <div className="form-item">
                            <label htmlFor="section" className="form-label">Section:</label>
                            <input id="section"  className="input-field" type="text" placeholder="Enter section" value={section} onChange={(e) => setSection(e.target.value)} />
                        </div>
                        <div className="form-item">
                            <label htmlFor="department" className="form-label">Department:</label>
                            <input id="department"  className="input-field" type="text" placeholder="Enter department" value={department} onChange={(e) => setDepartment(e.target.value)} />
                        </div>
                        <div className="form-item">
                            <label htmlFor="semester" className="form-label">Semester:</label>
                            <input id="semester" className="input-field" type="text" placeholder="Enter semester" value={semester} onChange={(e) => setSemester(e.target.value)} />
                        </div>
                        <div className="form-item">
                            <label htmlFor="classroom" className="form-label">Classroom:</label>
                            <input id="classroom" className="input-field" type="text" placeholder="Enter classroom" value={classroom} onChange={(e) => setClassroom(e.target.value)}/>
                        </div>
                        <div className="form-item">
                            <label htmlFor="batch" className="form-label">Batch:</label>
                            <input id="batch" className="input-field" type="text" placeholder="Enter batch" value={batch} onChange={(e) => setBatch(e.target.value)} />
                        </div>
                        <div className="form-item">
                            <label htmlFor="isa1" className="form-label">ISA1:</label>
                            <input id="isa1" className="input-field" type="text" placeholder="Enter ISA1" value={isa1} onChange={(e) => setIsa1(e.target.value)} />
                        </div>
                        <div className="form-item">
                            <label htmlFor="isa2" className="form-label">ISA2:</label>
                            <input id="isa2" className="input-field" type="text" placeholder="Enter ISA2" value={isa2} onChange={(e) => setIsa2(e.target.value)}/>
                        </div>
                        <div className="form-item">
                            <label htmlFor="esa" className="form-label">ESA:</label>
                            <input id="esa" className="input-field"type="text" placeholder="Enter ESA" value={esa} onChange={(e) => setEsa(e.target.value)}/>
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

export default Addclass;
