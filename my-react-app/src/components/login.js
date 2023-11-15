// src/components/login.js
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import './login.css';


const Login = () => {
    let navigate = useNavigate();

const handleLoginSuccess = (credentialResponse) => {
    console.log(credentialResponse);
    navigate('/cashier'); // Redirect to cashier component
};

const handleLoginFailure = () => {
    console.log('Login Failed');
};
  
    return (
      <div className="login">
        
          <h1 className="title">Welcome</h1>
          <div className = "backButton">
      <button onClick={() => navigate('/')}>Back</button>
      </div>
          <div className="googleAuth">
          <GoogleOAuthProvider clientId="241129987927-u7tu85kmdrs0ref1delh9gal1p3b75s5.apps.googleusercontent.com">
          <GoogleLogin
             onSuccess={handleLoginSuccess}
             onError={handleLoginFailure}
            />
    </GoogleOAuthProvider>;
          </div>
      </div>
    );
  };
  
  export default Login;