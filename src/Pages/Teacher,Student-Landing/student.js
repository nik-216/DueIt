import React, { useState } from 'react';
import './teachers.css';
import { useNavigate } from 'react-router-dom';

function Student() {
    const [selectedClass, setSelectedClass] = useState(''); // State to store the selected class name
    const navigate = useNavigate();

    // Example data for classrooms, names, and assignments
    const [classrooms, setClassrooms] = useState(['Class 1', 'Class 2', 'Class 3', 'Class 4']);
    const [names, setNames] = useState(['Name 1', 'Name 2', 'Name 3']);
    const [assignments, setAssignments] = useState([
        { assignmentnumber: 'Assignment - 1', startDate: '19-11-2024', dueDate: '01-12-2024', title: 'DA Hackathon' },
        { assignmentnumber: 'Assignment - 2', startDate: '20-11-2024', dueDate: '02-12-2024', title: 'ML Challenge' },
    ]);

    const handleAssignmentstudentClick = (assignmentNumber) => {
        navigate('/Updateassign', { state: { assignmentNumber } }); // Pass assignment number via state
    };

    // Function to handle classroom button click
    const handleClass10Click = (className) => {
        setSelectedClass(className);
    };

    // Function to handle logout
    const handleLogout10Click = () => {
        navigate('/signin'); // Navigates to the home page
    };

    return (
        <div id='bg1'>
            <div id="DUEIT">
                <img src="/logo.png" alt="pic" style={{ width: '200px', height: 'auto' }} />
            </div>
            <div id="LOGOUT" onClick={handleLogout10Click} style={{ cursor: 'pointer' }}>
                <img src="/logout.png" alt="pic" style={{ width: '50px', height: 'auto' }} />
            </div>
            <div id='bg2'>
                {/* Display selected class */}
                <div id='text10'>
                    <p>{selectedClass ? ` ${selectedClass}` : ''}</p>
                </div>

                {/* Classroom Section */}
                <div id='classroom-box10'>
                    <div id='classroom-text10'>Classroom</div>
                    <div id="classroom10">
                        {classrooms.map((classroom, index) => (
                            <button
                                key={index}
                                id={`class${index + 1}-button`}
                                className="class-button10"
                                onClick={() => handleClass10Click(classroom)}
                            >
                                {classroom}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ISA Section */}
                <div id='isa-box5'>
                    <div id='isa1' className='exams10'>isa1:</div>
                    <div id='isa2' className='exams10'>isa2:</div>
                    <div id='esa' className='exams10'>esa:</div>
                </div>

                {/* Names Section */}
                <div id="name-box10">
                    {names.map((name, index) => (
                        <div key={index} id={`name${index + 1}-button`} className='name-button10'>
                            {name}
                        </div>
                    ))}
                </div>

                {/* Assignment Table Section */}
                <div className="table-container10">
                    <table className="assignment-table10">
                        <thead>
                            <tr>
                                <th>ASSIGNMENT</th>
                                <th>START DATE</th>
                                <th>DUE DATE</th>
                                <th>TITLE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assignments.map((assignment, index) => (
                                <tr key={index} onClick={() => handleAssignmentstudentClick(assignment.assignmentnumber)}>
                                    <td>{assignment.assignmentnumber}</td>
                                    <td>{assignment.startDate}</td>
                                    <td>{assignment.dueDate}</td>
                                    <td>{assignment.title}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Student;
