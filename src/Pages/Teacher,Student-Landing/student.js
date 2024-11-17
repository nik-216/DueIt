import React, { useState } from 'react';
import './teachers.css';

function Student() {
    const [selectedClass, setSelectedClass] = useState(''); // State to store the selected class name

    // Function to handle button click and update the selected class
    const handleClassClick = (className) => {
        setSelectedClass(className);
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
                        <button id="class1-button" className="class-button" onClick={() => handleClassClick('Class 1')}>Class 1</button>
                        <button id="class2-button" className="class-button" onClick={() => handleClassClick('Class 2')}>Class 2</button>
                        <button id="class3-button" className="class-button" onClick={() => handleClassClick('Class 3')}>Class 3</button>
                        <button id="class4-button" className="class-button" onClick={() => handleClassClick('Class 4')}>Class 4</button>
                    </div>
                </div>
                    <div id='isa-box'>
                        <div id='isa1' className='exams'>isa1:</div>
                        <div id='isa2' className='exams'>isa2:</div>
                        <div id='esa' className='exams'>esa:</div>
                    </div>
                    <div id="name-box1">
                        <div id='name1-button' className='name-button'>Name 1</div>
                        <div id='name2-button' className='name-button'>Name 2</div>
                        <div id='name3-button' className='name-button'>Name 3</div>
                    </div>

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
                    </table>
                    </div>

            </div>
        </div>
    );
}

export default Student;
