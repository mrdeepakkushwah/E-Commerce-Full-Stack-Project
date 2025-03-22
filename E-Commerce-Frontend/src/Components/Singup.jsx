import React, { useState } from "react";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import "./signup.css";

const Signup = () => {

  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    email: "",
    profilePic: null,
    phoneNo: "",
    password: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/signupUser",formData);

      if (response.data.msg === 'User Created Successfully') {
        toast.success(' User Signup Successfully 😊!');
        setFormData({
          fName: "",
          lName: "",
          email: "",
          profilePic:"",
          phoneNo: "",
          password: "",
          address: "",
        });
      }
    } catch (err) {
      const errMsg = err.response?.data?.msg || 'Something went wrong';
      toast.error(`Error: ${errMsg}`);
    }
  };

  return (
    <div className="signup-container">
      <ToastContainer position="top-right" autoClose={2500} />
      <form onSubmit={handleSubmit} className="signup-form">
        <h1>Signup</h1>
        <input
          type="text"
          name="fName"
          placeholder="First Name"
          value={formData.fName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lName"
          placeholder="Last Name"
          value={formData.lName}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="profilePic"
          placeholder="Profile Picture URL"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="phoneNo"
          placeholder="Phone Number"
          value={formData.phoneNo}
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
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <button type="submit">Signup</button>
        {/* <ToastContainer /> */}
      </form>
    </div>
  );
};

export default Signup;
