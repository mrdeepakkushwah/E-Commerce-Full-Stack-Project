import React, { useState } from "react";
// import "./signup.css";

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
    const { name, value, files } = e.target;
    // If we have files (file input), update the state with the file object
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });
    alert("Signup Form Successfully");
    try {
      const response = await fetch("http://localhost:4000/signupUser", {
        method: "POST",
        body: formDataObj,
      });

      const data = await response.json();
      if (response.ok) {
        alert("Signup successful!");
        setFormData({
          fName: "",
          lName: "",
          email: "",
          profilePic: null,
          phoneNo: "",
          password: "",
          address: "",
        });
      } else {
        alert(`Signup failed: ${data.msg}`);
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="signup-form" method="post" action='http://localhost:4000/signupUser'>
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
      </form>
    </div>
  );
};

export default Signup;
