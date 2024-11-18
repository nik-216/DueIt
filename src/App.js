import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './Pages/Landing/landing';
import Signin from './Pages/Signup_Signin/signin';
import Navigate from './Pages/Navigate/Navigate';
import Hometeacher from './Pages/Home/hometeacher'; 
import Homestudent from './Pages/Home/homestudent';
import Signup from './Pages/Signup_Signin/signup';
import Teachers from './Pages/Teacher,Student-Landing/teachers';
import Student from './Pages/Teacher,Student-Landing/student';
import Addclass from './Pages/Add/addclass';
import Addassign from './Pages/Add/addassign';
import Addstudent from './Pages/Add/addstudent';


function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    {/* <Route path="/" element={<Hometeacher />} /> */}
                    <Route path="/" element={<Landing />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/navigate" element={<Navigate />} /> 
                    <Route path="/hometeacher" element={<Hometeacher />} />
                    <Route path="/homestudent" element={<Homestudent />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/teachers" element={<Teachers />} />
                    <Route path="/student" element={<Student />} />
                    <Route path="/addclass" element={<Addclass />} />
                    <Route path="/addassign" element={<Addassign />} />
                    <Route path="/addstudent" element={<Addstudent />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
