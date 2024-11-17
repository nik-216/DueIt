import React, { useState } from 'react';
import './addclass.css';
import { useNavigate } from 'react-router-dom';

function Addclass() {
    const [selectedStudent, setSelectedStudent] = useState('');
    const [coursecode, setCoursecode] = useState('');
    const [section, setSection] = useState('');
    const [department8, setDepartment8] = useState('');
    const [semester8, setSemester8] = useState('');
    const [classroom8, setClassroom8] = useState('');
    const [batch, setBatch] = useState('');
    const [isa1, setIsa1] = useState('');
    const [isa2, setIsa2] = useState('');
    const [esa, setEsa] = useState('');
    const navigate = useNavigate();

    const handleStudentClick = () => {
        navigate('/addstudent')
    };

    const handleEnter8Click = () => {
        if (!coursecode || !section || !department8 || !semester8 || !classroom8 || !batch || !isa1 || !isa2 || !esa) {
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
                <div id="text8">
                    <p>Add Class</p>
                </div>
                    <div className="form-container8">
                    <div className='form-column8'>
                        <div className="form-item8">
                            <label htmlFor="coursecode" className="form-label8">Course Code:</label>
                            <input id="coursecode" className="input-field8" type="text" placeholder="Enter course code" value={coursecode} onChange={(e) => setCoursecode(e.target.value)} />
                        </div>
                        <div className="form-item8">
                            <label htmlFor="section" className="form-label8">Section:</label>
                            <input id="section"  className="input-field8" type="text" placeholder="Enter section" value={section} onChange={(e) => setSection(e.target.value)} />
                        </div>
                        <div className="form-item8">
                            <label htmlFor="department8" className="form-label8">Department:</label>
                            <input id="department8"  className="input-field8" type="text" placeholder="Enter department" value={department8} onChange={(e) => setDepartment8(e.target.value)} />
                        </div>
                        <div className="form-item8">
                            <label htmlFor="semester8" className="form-label8">Semester:</label>
                            <input id="semester8" className="input-field8" type="text" placeholder="Enter semester" value={semester8} onChange={(e) => setSemester8(e.target.value)} />
                        </div>
                        <div className="form-item8">
                            <label htmlFor="classroom8" className="form-label8">Classroom:</label>
                            <input id="classroom8" className="input-field8" type="text" placeholder="Enter classroom" value={classroom8} onChange={(e) => setClassroom8(e.target.value)}/>
                        </div>
                        <div className="form-item8">
                            <label htmlFor="batch" className="form-label8">Batch:</label>
                            <input id="batch" className="input-field8" type="text" placeholder="Enter batch" value={batch} onChange={(e) => setBatch(e.target.value)} />
                        </div>
                        </div>
                        <div className='form-column8'>
                        <div className="form-item8">
                            <label htmlFor="isa1" className="form-label8">ISA1:</label>
                            <input id="isa1" className="input-field8" type="text" placeholder="Enter ISA1" value={isa1} onChange={(e) => setIsa1(e.target.value)} />
                        </div>
                        <div className="form-item8">
                            <label htmlFor="isa2" className="form-label8">ISA2:</label>
                            <input id="isa2" className="input-field8" type="text" placeholder="Enter ISA2" value={isa2} onChange={(e) => setIsa2(e.target.value)}/>
                        </div>
                        <div className="form-item8">
                            <label htmlFor="esa" className="form-label8">ESA:</label>
                            <input id="esa" className="input-field8"type="text" placeholder="Enter ESA" value={esa} onChange={(e) => setEsa(e.target.value)}/>
                        </div>
                        </div>
                    </div>
                    <div id="name-box8">
                        <div id="student-text8">Students</div>
                        <div id="name1-button" className="name-button8" onClick={() => handleStudentClick('Name 1')}>
                            Name 1
                        </div>
                        <div id="name2-button" className="name-button8" onClick={() => handleStudentClick('Name 2')}>
                            Name 2
                        </div>
                        <div id="name3-button" className="name-button8" onClick={() => handleStudentClick('Name 3')}>
                            Name 3
                        </div>
                    </div>
                    <button id="add-student-button8" onClick={() => handleStudentClick('+ Student')}>
                        + Student
                    </button>
                    <div id="enter8">
                        <button className="toggle-button8" onClick={handleEnter8Click} style={{ color: '#6BC5D2', fontSize: '20px' }}>
                            ENTER
                        </button>
                    </div>
            </div>
        </div>
    );
}

export default Addclass;
