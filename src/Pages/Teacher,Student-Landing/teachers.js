import React, { useState } from 'react';
import './teachers.css';
import { useNavigate } from 'react-router-dom';

function Teachers() {
    const [selectedClass, setSelectedClass] = useState(''); 
    const [isa1Date, setIsa1Date] = useState('');
    const [isa2Date, setIsa2Date] = useState('');
    const [esaDate, setEsaDate] = useState('');
    const [names, setNames] = useState(['Name 1', 'Name 2', 'Name 3']); // Initial list of names
    const [classrooms, setClassrooms] = useState(['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5']); // Initial list of classrooms
    const [assignments, setAssignments] = useState([
        { assignmentnumber: 'Assignment-1', startDate: '19-11-2024', dueDate: '1-12-2024', title: 'DA Hackathon' },
        { assignmentnumber: 'Assignment-2', startDate: '19-11-2024', dueDate: '1-12-2024', title: 'ML Challenge' }
    ]); // Initial list of assignments

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

    const handleAssignmentClick = (assignmentNumber) => {
        navigate('/viewassign', { state: { assignmentNumber } }); // Pass assignment number via state
    };
    const handleLogout6Click = () => {
        navigate('/signin'); // Navigates to the home page
    };

    return (
        <div id='bg1'>
            <div id="DUEIT">
                <img src="/logo.png" alt="pic" style={{ width: '200px', height: 'auto' }} />
            </div>
            <div id="LOGOUT" onClick={handleLogout6Click} style={{ cursor: 'pointer' }}>
                <img src="/logout.png" alt="pic" style={{ width: '50px', height: 'auto' }} />
            </div>
            <div id='bg2'>
                <div id='text6'>
                    <p>{selectedClass ? ` ${selectedClass}` : ''}</p>
                </div>
                <div id='classroom-box6'>
                    <div id='classroom-text6'>Classroom</div>
                    <div id="classroom6">
                        {classrooms.map((classroom, index) => (
                            <button
                                key={index}
                                className="class-button6"
                                onClick={() => handleClassNameClick(classroom)}
                            >
                                {classroom}
                            </button>
                        ))}
                    </div>
                    <button id="add-classroom-button6" className="class-button6" onClick={handleAddClassClick}>+ Classroom</button>
                </div>
                <div id='isa-box6'>
                    <div id='isa1' className='exams6'>isa1: {isa1Date ? isa1Date : 'loading'}</div>
                    <div id='isa2' className='exams6'>isa2: {isa2Date ? isa2Date : 'loading'}</div>
                    <div id='esa' className='exams6'>esa: {esaDate ? esaDate : 'loading'}</div>
                </div>
                <div id="name-box6">
                    {names.map((name, index) => (
                        <div key={index} className='name-button6'>{name}</div>
                    ))}
                </div>

                <div className="table-container6">
                    <table className="assignment-table6">
                        <thead>
                            <tr>
                                <th>ASSIGNMENT</th>
                                <th>START DATE</th>
                                <th>DUE DATE</th>
                                <th>TITLE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assignments.map((assignment) => (
                                <tr 
                                    key={assignment.assignmentnumber} 
                                    onClick={() => handleAssignmentClick(assignment.assignmentnumber)} // Pass assignment number
                                >
                                    <td>{assignment.assignmentnumber}</td>
                                    <td>{assignment.startDate}</td>
                                    <td>{assignment.dueDate}</td>
                                    <td>{assignment.title}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="add-assignment6" onClick={handleAddAssignClick}>+ assignment</div>
                </div>
            </div>
        </div>
    );
}

export default Teachers;
