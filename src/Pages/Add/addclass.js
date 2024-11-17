import React, { useState } from 'react';
import './addclass.css';
import { useNavigate } from 'react-router-dom';

function Addclass() {
    const [selectedStudent, setSelectedStudent] = useState('');
    const [coursecode, setCoursecode] = useState('');
    const [section, setSection] = useState('');
    const [department1, setDepartment] = useState('');
    const [semester1, setSemester] = useState('');
    const [classroom, setClassroom] = useState('');
    const [batch, setBatch] = useState('');
    const [isa1, setIsa1] = useState('');
    const [isa2, setIsa2] = useState('');
    const [esa, setEsa] = useState('');
    const navigate = useNavigate();

    const handleStudentClick = () => {
        navigate('/addstudent')
    };

    const handleEnterClick = () => {
        if (!coursecode || !section || !department1 || !semester1 || !classroom || !batch || !isa1 || !isa2 || !esa) {
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
                    <div className="form-container1">
                    <div className='form-column1'>
                        <div className="form-item1">
                            <label htmlFor="coursecode" className="form-label1">Course Code:</label>
                            <input id="coursecode" className="input-field1" type="text" placeholder="Enter course code" value={coursecode} onChange={(e) => setCoursecode(e.target.value)} />
                        </div>
                        <div className="form-item1">
                            <label htmlFor="section" className="form-label1">Section:</label>
                            <input id="section"  className="input-field1" type="text" placeholder="Enter section" value={section} onChange={(e) => setSection(e.target.value)} />
                        </div>
                        <div className="form-item1">
                            <label htmlFor="department" className="form-label1">Department:</label>
                            <input id="department1"  className="input-field1" type="text" placeholder="Enter department" value={department1} onChange={(e) => setDepartment(e.target.value)} />
                        </div>
                        <div className="form-item1">
                            <label htmlFor="semester" className="form-label1">Semester:</label>
                            <input id="semester1" className="input-field1" type="text" placeholder="Enter semester" value={semester1} onChange={(e) => setSemester(e.target.value)} />
                        </div>
                        <div className="form-item1">
                            <label htmlFor="classroom" className="form-label1">Classroom:</label>
                            <input id="classroom" className="input-field1" type="text" placeholder="Enter classroom" value={classroom} onChange={(e) => setClassroom(e.target.value)}/>
                        </div>
                        <div className="form-item1">
                            <label htmlFor="batch" className="form-label1">Batch:</label>
                            <input id="batch" className="input-field1" type="text" placeholder="Enter batch" value={batch} onChange={(e) => setBatch(e.target.value)} />
                        </div>
                        </div>
                        <div className='form-column1'>
                        <div className="form-item1">
                            <label htmlFor="isa1" className="form-label1">ISA1:</label>
                            <input id="isa1" className="input-field1" type="text" placeholder="Enter ISA1" value={isa1} onChange={(e) => setIsa1(e.target.value)} />
                        </div>
                        <div className="form-item1">
                            <label htmlFor="isa2" className="form-label1">ISA2:</label>
                            <input id="isa2" className="input-field1" type="text" placeholder="Enter ISA2" value={isa2} onChange={(e) => setIsa2(e.target.value)}/>
                        </div>
                        <div className="form-item1">
                            <label htmlFor="esa" className="form-label1">ESA:</label>
                            <input id="esa" className="input-field1"type="text" placeholder="Enter ESA" value={esa} onChange={(e) => setEsa(e.target.value)}/>
                        </div>
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
                    <button id="add-student-button" onClick={() => handleStudentClick('+ Student')}>
                        + Student
                    </button>
                    <div id="enter3">
                        <button className="toggle-button1" onClick={handleEnterClick} style={{ color: '#6BC5D2', fontSize: '20px' }}>
                            ENTER
                        </button>
                    </div>
            </div>
        </div>
    );
}

export default Addclass;
