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
                <button onClick={toggleView} className={isLogin ? "toggle-button" : "toggle-button-2"}>
                    {isLogin ? "Go to Login" : "Go to Signup"}
                </button>
            </div>
        </div>
    );
};

export default LoginAndSignup;
