import React, { useState } from "react";
import "./login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert('User Login Successfully');
   
    // clear data after login
    setFormData({ email: "", password: "" });

    // try {
    //   const response = await fetch("http://localhost:3000/api/login", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(formData),
    //   });

    //   const data = await response.json();
    //   if (response.ok) {
    //     alert("Login successful!");
    //   } else {
    //     alert(`Login failed: ${data.message}`);
    //   }
    // } catch (err) {
    //   alert(`Error: ${err.message}`);
    // }
  };

  return (
    <div className="container-lg">
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
