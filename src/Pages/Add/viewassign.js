import React, { useState, useEffect } from 'react';
import './viewassign.css';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function Viewassign() {
    const navigate = useNavigate();
    const location = useLocation();
    const assignmentID = location.state?.assignmentID || 'No Assignment Selected';
    const selectedClass = location.state?.class_ID || 'No Class Selected';
    const title = location.state?.title || 'No Assignment Selected';
    const [students, setStudents] = useState([]);
    const [submissionCount, setSubmissionCount] = useState(0); // State to hold submission count
    const [marksUpdated, setMarksUpdated] = useState(false);

    useEffect(() => {
        // Fetch submissions for the assignment
        const fetchSubmissions = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/submissions/${assignmentID}`);
                setStudents(response.data.submissions);
            } catch (error) {
                console.error('Error fetching submissions:', error);
            }
        };

        // Fetch the submission count for the assignment
        const fetchSubmissionCount = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/submissions/count/${assignmentID}`);
                setSubmissionCount(response.data.submissionCount);
            } catch (error) {
                console.error('Error fetching submission count:', error);
            }
        };

        if (assignmentID !== 'No Assignment Selected') {
            fetchSubmissions();
            fetchSubmissionCount();
        }
    }, [assignmentID]);

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    const handleBackClick = () => {
        navigate('/teachers');
    };

    const handleMarksChange = (index, value) => {
        const updatedStudents = [...students];
        updatedStudents[index].marks = value;
        setStudents(updatedStudents);
        setMarksUpdated(true);
    };

    const handleEnterClick = () => {
        if (marksUpdated) {
            students.forEach((student) => {
                if (student.marks) {
                    axios.post(`http://localhost:8000/api/updateMarks`, {
                        assignmentID: assignmentID,
                        studentId: student.studentID,
                        marks: student.marks,
                    }).then(() => {
                        console.log('Marks updated for', student.studentID);
                    }).catch((error) => {
                        console.error('Error updating marks:', error);
                    });
                }
            });
        } else {
            alert('No changes made');
        }
    };

    const handleLogoClick = () => {
        navigate('/teachers');
    };

    return (
        <div id="bg1">
            <div id="DUEIT11" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
                <img src="/logo.png" alt="pic" style={{ width: '200px', height: 'auto' }} />
            </div>
            <div id="bg2">
                <div id="text11">
                    <h1>{assignmentID}</h1>
                </div>

                <div id="similar" style={{ textAlign: 'center', marginBottom: '30px', fontWeight: 'bold' }}>
                    <span>Classroom: {selectedClass || 'None Selected'}</span>
                    <span style={{ margin: '0 20px' }}>Title: {title}</span>
                    <span>Submissions: {submissionCount}</span>
                </div>
                <div className="table-container11">
                    <table className="assignment-table11">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Submission Date</th>
                                <th>Allot Marks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, index) => (
                                <tr key={index}>
                                    <td>{student.studentID || 'N/A'}</td>
                                    <td>{formatDate(student.submissionDate) || 'N/A'}</td>
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
                    <button className="toggle-button11" onClick={handleEnterClick} style={{ color: '#6BC5D2', fontSize: '20px' }}>
                        ENTER
                    </button>
                </div>
                <div id="back11">
                    <button className="toggle-button11" onClick={handleBackClick} style={{ color: '#6BC5D2', fontSize: '20px' }}>
                        BACK
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Viewassign;
