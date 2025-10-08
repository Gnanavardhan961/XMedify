import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import './Footer.css'; // Import your Footer styles

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top container">
        {/* Brand & Social Links */}
        <div className="footer-brand">
          <h2 className="footer-logo">XMedify</h2>
          <p>Providing quality medical care to patients worldwide.</p>
          <div className="social-links">
            <a href="#" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* Footer Links */}
        <div className="footer-links">
          <div className="footer-column">
            <h4>About</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Our Pricing</a></li>
              <li><a href="#">Our Gallery</a></li>
              <li><a href="#">Appointments</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Specialties</h4>
            <ul>
              <li><a href="#">Orthology</a></li>
              <li><a href="#">Neurology</a></li>
              <li><a href="#">Dental Care</a></li>
              <li><a href="#">Ophthalmology</a></li>
              <li><a href="#">Cardiology</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Support</h4>
            <ul>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Feedback</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>© 2023 XMedify. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
