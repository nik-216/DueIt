import React, { useState } from 'react';
import './Updateassign.css';
import { useNavigate, useLocation } from 'react-router-dom';

function Updateassign() {
    const navigate = useNavigate();
    const location = useLocation();
    const assignmentNumber = location.state?.assignment_ID || 'No Assignment Selected';
    const [students, setStudents] = useState([
        {
            id: 'XYZ',
            section: 'XYZ',
            name: 'Name 1',
            submissionDate: '20-11-2024',
            status: 'Submitted',
        },
        {
            id: '',
            section: '',
            name: 'Name 1',
            submissionDate: '',
            status: 'Not Submitted',
        },
    ]);

    // Function to handle input changes for ID and section
    const handleInputChange = (index, field, value) => {
        const updatedStudents = [...students];
        updatedStudents[index][field] = value;
        setStudents(updatedStudents);
    };

    // Function to handle submission
    const handleSubmitClick = (index) => {
        const student = students[index];
        if (student.id.trim() && student.section.trim()) {
            const updatedStudents = [...students];
            updatedStudents[index].status = 'Submitted';
            updatedStudents[index].submissionDate = new Date().toISOString().split('T')[0]; // Set current date
            setStudents(updatedStudents);
        } else {
            alert('Please enter both ID and Section before submitting.');
        }
    };

    const handleLogo12Click = () => {
        navigate('/student'); // Navigate to the student page
    };

    return (
        <div id="bg1">
            <div id="DUEIT12" onClick={handleLogo12Click} style={{ cursor: 'pointer' }}>
                <img src="/logo.png" alt="Logo" style={{ width: '200px', height: 'auto' }} />
            </div>
            <div id="bg2">
                <div id="text12">
                    <h1>{assignmentNumber}</h1>
                </div>
                <div className="table-container12">
                    <table className="assignment-table12">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Section</th>
                                <th>Name</th>
                                <th>Submission Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, index) => (
                                <tr key={index}>
                                    <td>
                                        {student.status === 'Submitted' ? (
                                            student.id
                                        ) : (
                                            <input
                                                type="text"
                                                value={student.id}
                                                placeholder="Enter ID"
                                                onChange={(e) => handleInputChange(index, 'id', e.target.value)}
                                            />
                                        )}
                                    </td>
                                    <td>
                                        {student.status === 'Submitted' ? (
                                            student.section
                                        ) : (
                                            <input
                                                type="text"
                                                value={student.section}
                                                placeholder="Enter Section"
                                                onChange={(e) => handleInputChange(index, 'section', e.target.value)}
                                            />
                                        )}
                                    </td>
                                    <td>{student.name}</td>
                                    <td>{student.submissionDate || 'N/A'}</td>
                                    <td>{student.status}</td>
                                    <td>
                                        {student.status === 'Not Submitted' ? (
                                            <button
                                                onClick={() => handleSubmitClick(index)}
                                                style={{ color: '#000000', fontSize: '16px', cursor: 'pointer' }}>
                                                Submit
                                            </button>
                                        ) : (
                                            '—'
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Updateassign;
