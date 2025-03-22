import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "./contact.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNo: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/addContact",formData);

      if (response.data.msg === "Contact form submitted successfully") {
        toast.success("Thank you for reaching out! We will get back to you soon.");
        setFormData({
          name: "",
          email: "",
          phoneNo: "",
          message: "",
        });
      }
    } catch (error) {
      const errMsg = error.response?.data?.msg || "Something went wrong";
      toast.error(`Error: ${errMsg}`);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
              <ToastContainer position="top-right" autoClose={2500}  closeOnClick={true} draggable={true}/>

      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="name">Name:</label>
          <br />
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Your Name"
            required
            style={{ width: "100%", padding: "10px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="email">Email:</label>
          <br />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="phoneNo">Phone No:</label>
          <br />
          <input
            type="number"
            id="phoneNo"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
            placeholder="Enter Phone Number"
            required
            style={{ width: "100%", padding: "10px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="message">Message:</label>
          <br />
          <input
          type="text"
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Please let us know why you want to contact us by typing in this message box."
            required
            className="custom-textarea"
          />
        </div>
        <button
          type="submit"
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactPage;
