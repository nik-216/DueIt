import React, { useState } from 'react';
import './viewassign.css';
import { useNavigate , useLocation } from 'react-router-dom';

function Viewassign() {
    const navigate = useNavigate();
    const location = useLocation();
    const assignmentNumber = location.state?.assignmentNumber || 'No Assignment Selected';
    const [selectedClass, setSelectedClass] = useState('');
    const [classrooms, setClassrooms] = useState(['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5']);
    const [students, setStudents] = useState([
        { 
            name: 'Name 1', 
            startDate: '19-11-2024', 
            submissionDate: '20-11-2024', 
            title: 'DA Hackathon', 
            marks: '', 
            status: 'Submitted' 
        },
        { 
            name: 'Name 2', 
            startDate: '19-11-2024', 
            submissionDate: '', 
            title: 'DA Hackathon', 
            marks: '', 
            status: 'Not Submitted' 
        },
        { 
            name: 'Name 3', 
            startDate: '19-11-2024', 
            submissionDate: '21-11-2024', 
            title: 'DA Hackathon', 
            marks: '', 
            status: 'Submitted' 
        }
    ]); 
    const handleClassNameClick = (className) => {
        setSelectedClass(className);
    };

    const handleMarksChange = (index, value) => {
        const updatedStudents = [...students];
        updatedStudents[index].marks = value;
        setStudents(updatedStudents);
    };
    const handleEnter11Click = () => {
        alert('Marks updated');
    };
    const handleLogo11Click = () => {
        navigate('/teachers'); // Navigates to the home page
    };

    return (
        <div id="bg1">
            <div id="DUEIT11" onClick={handleLogo11Click} style={{ cursor: 'pointer' }}>
                <img src="/logo.png" alt="pic" style={{ width: '200px', height: 'auto' }} />
            </div>
            <div id="bg2">
                <div id="text11">
                    <h1>{assignmentNumber}</h1>
                </div>

                <div id="similar" style={{ textAlign: 'center', marginBottom: '30px', fontWeight: 'bold' }}>
                    <span>Classroom: {selectedClass || 'None Selected'}</span>
                    <span style={{ margin: '0 20px' }}>Title: {students.length > 0 ? students[0].title : 'N/A'}</span>
                    <span>Start Date: {students.length > 0 ? students[0].startDate : 'N/A'}</span>
                </div>

                <div id="classroom-box11">
                    <div id="classroom-text11">Classroom</div>
                    <div id="classroom11">
                        {classrooms.map((classroom, index) => (
                            <button
                                key={index}
                                className="class-button11"
                                onClick={() => handleClassNameClick(classroom)}
                            >
                                {classroom}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="table-container11">
                    <table className="assignment-table11">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Submission Date</th>
                                <th>Status</th>
                                <th>Allot Marks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, index) => (
                                <tr key={index}>
                                    <td>{student.name}</td>
                                    <td>{student.submissionDate || 'N/A'}</td>
                                    <td>{student.status}</td>
                                    <td>
                                        <input 
                                            type="number" 
                                            value={student.marks} 
                                            max={10} 
                                            min={0} 
                                            placeholder="0-10"
                                            onChange={(e) => handleMarksChange(index, e.target.value)} 
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div id="enter11">
                    <button className="toggle-button11" onClick={handleEnter11Click} style={{ color: '#6BC5D2', fontSize: '20px' }}>
                     ENTER</button>
                </div>
            </div>
        </div>
    );
}

export default Viewassign;
