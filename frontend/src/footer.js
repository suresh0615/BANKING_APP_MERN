import React from 'react';
import './footer.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Company Information */}
                <div className="footer-column">
                    <h3>BANK OF INDIA</h3>
                    <p>Gold loan</p>
                    <p>Home loan</p>
                    <p>Vechile loan</p>
                    <p>life insurance</p>
                    <p></p>
                </div>

                {/* Quick Links */}
                <div className="footer-column">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About Us</a></li>
                        {/* <li><a href="/services"></a></li> */}
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </div>

                {/* Social Media */}
                <div className="footer-column">
                    <h3>Follow Us</h3>
                    <ul className="social-icons">
                        <li>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faFacebookF} />
                            </a>
                        </li>
                        <li>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faTwitter} />
                            </a>
                        </li>
                        <li>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faInstagram} />
                            </a>
                        </li>
                        <li>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faLinkedinIn} />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="footer-bottom">
                <p>&copy; 2024 MSc Computer Science. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
