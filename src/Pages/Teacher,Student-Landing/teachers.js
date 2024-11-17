import React, { useState } from 'react';
import './teachers.css';
import { useNavigate } from 'react-router-dom';


function Teachers() {
    const [selectedClass, setSelectedClass] = useState(''); 
    const [isa1Date, setIsa1Date] = useState('');
    const [isa2Date, setIsa2Date] = useState('');
    const [esaDate, setEsaDate] = useState('');
    // const [names, setNames] = useState([]);
    // const [assignments, setAssignments] = useState([]);
    const navigate = useNavigate();

    const handleClassNameClick = (className) => {
        setSelectedClass(className);
    };
    const handleAddClassClick = () => {
        navigate('/addclass');
    };
    const handleAddAssignClick = () => {
        navigate('/addassign'); 
    };

    return (
        <div id='bg1'>
            <div id="DUEIT">
                <img src="/logo.png" alt="pic" style={{ width: '200px', height: 'auto' }}/>
            </div>
            <div id='bg2'>
                <div id='text1'>
                    <p>{selectedClass ? ` ${selectedClass}` : ''}</p>
                </div>
                <div id='classroom-box'>
                    <div id='classroom-text'>Classroom</div>
                    <div id="classroom2">
                        <button id="class1-button" className="class-button" onClick={() => handleClassNameClick('Class 1')}>Class 1</button>
                        <button id="class2-button" className="class-button" onClick={() => handleClassNameClick('Class 2')}>Class 2</button>
                        <button id="class3-button" className="class-button" onClick={() => handleClassNameClick('Class 3')}>Class 3</button>
                        <button id="class4-button" className="class-button" onClick={() => handleClassNameClick('Class 4')}>Class 4</button>
                    </div>
                    <button id="add-classroom-button" className="class-button" onClick={handleAddClassClick}>+ Classroom</button>
                </div>
                    <div id='isa-box'>
                        <div id='isa1' className='exams' >isa1: {isa1Date ? isa1Date : 'loading'}</div>
                        <div id='isa2' className='exams'>isa2: {isa2Date ? isa2Date : 'loading'}</div>
                        <div id='esa' className='exams'>esa: {esaDate ? esaDate : 'loading'}</div>
                    </div>
                    <div id="name-box2">
                        <div id='name1-button' className='name-button'>Name 1</div>
                        <div id='name2-button' className='name-button'>Name 2</div>
                        <div id='name3-button' className='name-button'>Name 3</div>
                    </div>

                    {/* <div id="name-box2">
                    {names.length > 0 ? ( names.map((name, index) => (
                            <div key={index} className="name-button">
                                {name}
                            </div>
                        )) ) : (
                        <div>Loading names...</div>
                        )}
                    </div> */}

                    <div className="table-container">
                    <table className="assignment-table">
                    <thead>
                        <tr>
                        <th>ASSIGNMENT</th>
                        <th>START DATE</th>
                        <th>DUE DATE</th>
                        <th>TITLE</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>Assignment - 1</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        </tr>
                    </tbody>

                    {/* <tbody>
                            {assignments.length > 0 ? (
                                assignments.map((assignment, index) => (
                                    <tr key={index}>
                                        <td>{assignment.assignment}</td>
                                        <td>{assignment.startDate}</td>
                                        <td>{assignment.dueDate}</td>
                                        <td>{assignment.title}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">Loading assignments...</td>
                                </tr>
                            )}
                        </tbody> */}


                    </table>
                    <div className="add-assignment" onClick={handleAddAssignClick}>+ assignment</div>
                    </div>

            </div>
        </div>
    );
}

export default Teachers;
