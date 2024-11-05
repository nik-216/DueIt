import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './Pages/Landing/landing';
import Signin from './Pages/Signup_Signin/signin';
import Navigate from './Pages/Navigate/Navigate';
import Home from './Pages/Home/home'; // Path to Home.js

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/navigate" element={<Navigate />} /> 
                    <Route path="/home" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;