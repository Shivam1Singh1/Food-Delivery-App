import React from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';

const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={assets.logo} alt="" />
                    <p>Indulge in every bite with our app – where every meal is a delightful journey of flavors. Taste the magic, one dish at a time.</p>
                    <div className="footer-social-icon">
                        <img src={assets.facebook_icon} alt="Facebook" />
                        <img src={assets.twitter_icon} alt="Twitter" />
                        <img src={assets.linkedin_icon} alt="LinkedIn" />
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul><li>+91 9129172281</li>
                        <li>shivamsingh16mar@gmail.com</li></ul>
                </div>
            </div>
            <hr />
            <p className="footer-copyright">
                &copy; 2024 Tomato Food App. All rights reserved.
            </p>
        </div>
    );
}

export default Footer;
