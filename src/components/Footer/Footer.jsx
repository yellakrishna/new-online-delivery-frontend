import React from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="footer-content">
        
        {/* Left Section */}
        <div className="footer-left">
          <img src={assets.logo} alt="Fish Company Logo" className="footer-logo" />
          <p className="footer-text">
            Delivering fresh, high-quality fish from the Alampur River to your doorstep.
            Our passion is to bring the taste of the river to your family’s table.
          </p>
          <div className="footer-social">
            <a href="#"><img src={assets.facebook_icon} alt="Facebook" /></a>
            <a href="#"><img src={assets.twitter_icon} alt="Twitter" /></a>
            <a href="#"><img src={assets.linkedin_icon} alt="LinkedIn" /></a>
          </div>
        </div>

        {/* Center Section */}
        <div className="footer-center">
          <h2>Quick Links</h2>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="/menu">Menu</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="footer-right">
          <h2>Contact Us</h2>
          <ul>
            <li>📍 Alampur Fish Market</li>
            <li>📞 +91 75698 1855*</li>
            <li>📧 FishCompany@gmail.com</li>
          </ul>
        </div>
      </div>

      <hr />

      <p className="footer-bottom">
        © {new Date().getFullYear()} Fish Company — All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
