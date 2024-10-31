// import React from 'react';
// import './landing.css';
// import logo from './logo.png'; // Make sure this is the correct path to your logo

// function Landing() {
//     return (
//         <div id="background">
//             <div id="dueit" style={{ backgroundImage: url`url(${logo})` }}></div>
//             <div id="track" style={{ fontFamily: 'Marcellus' }}>
//                 <b>Track all your assignments</b>
//             </div>
//             <div id="signin">
//                 <button type="button" id="signin-btn">SIGN IN</button>  
//             </div>
//         </div>
//     );
// }

// export default Landing;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './landing.css';
import logo from './logo.png';

function Landing() {
    const navigate = useNavigate();

    const handleSignInClick = () => {
        navigate('/signin'); // Navigate to the SignIn page
    };

    return (
        <div id="background">
            <div id="dueit" style={{ backgroundImage: `url(${logo})` }}></div>
            <div id="track" style={{ fontFamily: 'Marcellus' }}>
                <b>Track all your assignments</b>
            </div>
            <div id="signin">
                <button type="button" id="signin-btn" onClick={handleSignInClick}>
                    SIGN IN
                </button>  
            </div>
        </div>
    );
}

export default Landing;
