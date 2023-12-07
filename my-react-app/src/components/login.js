// src/components/login.js
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './login.css';


const Login = () => {
    let navigate = useNavigate();

    const allowedEmails = ["avirala16@tamu.edu", "devrpatel04@tamu.edu", "ishaan2947@tamu.edu", "jack.payne@tamu.edu", "shreyask25@tamu.edu"]; // List of allowed emails

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
  
    return (
      <div className="login">
        
          <h1 className="title" style={{color: 'white'}}>Welcome</h1>
          <div className = "backButton">
      <button onClick={() => navigate('/')}>Back</button>
      </div>
      
          <div className="googleAuth">
            <p>Please Sign in</p>
          <GoogleOAuthProvider clientId="241129987927-u7tu85kmdrs0ref1delh9gal1p3b75s5.apps.googleusercontent.com">
          <GoogleLogin
             onSuccess={handleLoginSuccess}
             onError={handleLoginFailure}
            />
    </GoogleOAuthProvider>
          </div>
          
      </div>
    );
  };
  
  export default Login;