import React, { useState } from "react";
import Login from "../Components/Login.jsx";
import Signup from "../Components/Singup.jsx";
import "./LoginAndSignup.css";

const LoginAndSignup = () => {
    const [isLogin, setIsLogin] = useState(true);

    const toggleView = () => {
        setIsLogin(!isLogin);
    };
    
    return (
        <div className="container">
            <div className="form-container">
                {isLogin ? <Signup /> :<Login/> }
                <button onClick={toggleView} className="toggle-button">
                    {isLogin ? "Go to Login" : "Go to Signup"}
                </button>
            </div>
        </div>
    );
};

export default LoginAndSignup;
