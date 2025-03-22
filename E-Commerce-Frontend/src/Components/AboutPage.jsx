import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"; // Social media icons from Lucide-react
import "./about.css";
import { NavLink } from "react-router-dom";

const AboutPage = () => {
    return (
        <div className="about-container">
            <h1>About Us</h1>
            <div className="about-content">
                <h3>Company Name: DeepakKushwahBazaar Company Pvt. Ltd.</h3>
                <p>Author: Deepak Kushwah</p>
                <p>Email: deepakkushwah475110.com</p>
                <p>Contact: +91 9109001109</p>
                <p>© {new Date().getFullYear()} DeepakKushwahBazaar Company. All rights reserved.</p>

                <div className="social-icons">
                    <h3>Follow Us:</h3>
                    <NavLink to="https://www.facebook.com/MrDeepakKushwahJi" target="_blank" rel="noopener noreferrer">
                        <Facebook size={24} />
                    </NavLink>
                    <NavLink to="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                        <Twitter size={24} />
                    </NavLink>
                    <NavLink to="https://www.instagram.com/deepak_g_official/" target="_blank" rel="noopener noreferrer">
                        <Instagram size={24} />
                    </NavLink>
                    <NavLink to="https://www.linkedin.com/in/deepakoffical/" target="_blank" rel="noopener noreferrer">
                        <Linkedin size={24} />
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
