// src/components/managerlogin.js
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';
import './login.css';


const Login = () => {
    let navigate = useNavigate();
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');

    const allowedEmails = ["avirala16@tamu.edu", "devrpatel04@tamu.edu", "ishaan2947@tamu.edu",	"jack.payne@tamu.edu", "shreyask25@tamu.edu"]; // List of allowed emails



    const handleLoginSuccess = (credentialResponse) => {
        console.log(credentialResponse);
    
        try {
            const decodedResponse = jwtDecode(credentialResponse.credential);
            console.log(decodedResponse);
    
            const userEmail = decodedResponse.email;
    
            if (allowedEmails.includes(userEmail)) {
                navigate('/cashier');
            } else {
                alert('Access Denied: Please enter a valid email');
                
            }
        } catch (error) {
            console.error('Error decoding token:', error);
        }
    };
    

    const handleLoginFailure = () => {
        alert('Access Denied: Please enter a valid email');
    };
  

    const handleManualLogin = (e) => {
        e.preventDefault();
        if (userId === 'manager' && password === 'managing') {
            navigate('/manager');
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <div className="login">
            <h1 className="title" style={{color: 'white'}}>Welcome</h1>
            <div className="backButton">
                <button onClick={() => navigate('/')}>Back</button>
            </div>

            <div className="googleAuth">
                <p>Please Sign in with Google</p>
                <GoogleOAuthProvider clientId="241129987927-u7tu85kmdrs0ref1delh9gal1p3b75s5.apps.googleusercontent.com">
                    <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginFailure} />
                </GoogleOAuthProvider>
            </div>

            <div className="manualAuth">
                <p>or manually login as cashier</p>
                <form onSubmit={handleManualLogin}>
                    <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="User ID" />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
  };
  
  export default Login;
