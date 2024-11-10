import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './Pages/Landing/landing';
import Signin from './Pages/Signup_Signin/signin';
import Navigate from './Pages/Navigate/Navigate';
import Hometeacher from './Pages/Home/hometeacher'; 
import Homestudent from './Pages/Home/homestudent';
import Signup from './Pages/Signup_Signin/signup';


function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/navigate" element={<Navigate />} /> 
                    <Route path="/hometeacher" element={<Hometeacher />} />
                    <Route path="/homestudent" element={<Homestudent />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;