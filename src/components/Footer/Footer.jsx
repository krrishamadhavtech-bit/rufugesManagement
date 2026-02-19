import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const scrollToSection = (sectionId) => {
        if (location.pathname !== "/home") {
            navigate(`/home#${sectionId}`);
        } else {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <footer className="site-footer">
            <div className="footer-content">
                <div className="footer-brand">
                    <div className="logo" onClick={() => navigate("/home")} style={{ cursor: "pointer" }}>
                        <span className="logo-dot">●</span>
                        <span className="logo-text">RAHA</span>
                    </div>
                    <p>Compassionate Service for All People Everywhere</p>
                </div>

                <div className="footer-links">
                    <div className="footer-column">
                        <h4>Organization</h4>
                        <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('about-us'); }}>About Us</a>
                        <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('contact-us'); }}>Contact</a>
                    </div>
                    <div className="footer-column">
                        <h4>Content</h4>
                        <a href="#">Categories</a>
                        <a href="/news-corner">News</a>
                        <a href="/upcoming-events">Events</a>
                    </div>
                    <div className="footer-column">
                        <h4>Support</h4>
                        <a href="#">Donate</a>
                        <a href="#">Volunteer</a>
                        <a href="#">Partnerships</a>
                        <a href="#">FAQ</a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© 2026 Raha. All rights reserved.</p>
                <p className="site-credit">sit site</p>
            </div>
        </footer>
    );
};

export default Footer;