import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/loginUser', formData);

      if (response.data.msg === 'Login Successfully') {
        toast.success(' User Login Successfully 😊!');
        // clear data after login
        setFormData({ email: "", password: "" });
      }
    } catch (error) {
      const errMsg = error.response?.data?.msg || 'Something went wrong';
      toast.error(errMsg)
    }
  }


  return (
    <div className="container-lg">
      <ToastContainer position="top-right" autoClose={2500} />
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h1>Login</h1>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
          <div className="forget-container">
            <a href="#">Reset Password ?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
