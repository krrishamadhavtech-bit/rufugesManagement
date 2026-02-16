import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { updateLanguage } from "../../services/auth";
import "./Header.css";

const ViewModal = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [scrolled, setScrolled] = useState(false);
    const [activeTab, setActiveTab] = useState("home");
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
    const settingsRef = useRef(null);

    const navItems = ["Home", "About Us", "Contact Us", "News Corner", "Upcoming Events", "Settings"];

    // Settings menu items
    const settingsItems = [
        { icon: "fa-globe", label: "Language", action: () => navigate("/onboarding/language") },
        { icon: "fa-location-dot", label: "Change Location", action: () => navigate("/location") },
        { icon: "fa-circle-info", label: "About Us", action: () => navigate("/about-us") },
        { icon: "fa-comment", label: "Feedback", description: "Report problems or suggest improvements", action: () => navigate("/feedback") },
        { icon: "fa-shield", label: "Privacy Policy", action: () => navigate("/privacy-policy") },
        { icon: "fa-address-book", label: "Contact Information", action: () => navigate("/contact-us") },
    ];

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (settingsRef.current && !settingsRef.current.contains(event.target)) {
                setSettingsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Scroll spy effect - activates nav tab based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);

            // Only run scroll spy on home page
            if (location.pathname === "/home" || location.pathname === "/") {
                const scrollPosition = window.scrollY + 150; // Offset for header

                // Find all section elements
                const sections = navItems
                    .map(item => item.toLowerCase().replace(/\s+/g, '-'))
                    .filter(id => document.getElementById(id));

                let current = activeTab;

                sections.forEach(id => {
                    const element = document.getElementById(id);
                    if (element) {
                        if (scrollPosition >= element.offsetTop) {
                            current = id;
                        }
                    }
                });

                if (current !== activeTab) {
                    setActiveTab(current);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        // Initial call to set active section on load
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [location.pathname, navItems, activeTab]);

    // Handle hash in URL on page load
    useEffect(() => {
        if ((location.pathname === "/home" || location.pathname === "/") && location.hash) {
            const id = location.hash.substring(1);
            const element = document.getElementById(id);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
                setActiveTab(id);
            }
        }
    }, [location]);

    const handleNavClick = (item) => {
        const sectionId = item.toLowerCase().replace(/\s+/g, '-');

        // Don't navigate for Settings - just open dropdown
        if (item === "Settings") {
            setSettingsOpen(!settingsOpen);
            return;
        }

        setActiveTab(sectionId);

        if (sectionId === "home" || sectionId === "about-us" || sectionId === "contact-us") {
            if (location.pathname !== "/home" && location.pathname !== "/") {
                navigate(`/home#${sectionId}`);
            } else {
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
                // Update URL without page reload
                window.history.pushState(null, '', `/home#${sectionId}`);
            }
        } else {
            // For other links like news, events
            navigate(`/${sectionId}`);
        }
    };

    const handleSettingsItemClick = (action) => {
        action();
        setSettingsOpen(false);
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate("/", { replace: true });
    };

    const handleLanguageChange = async (langCode) => {
        try {
            const response = await updateLanguage(langCode);
            if (response.statusCode === 200 || response.success) {
                alert(`Language updated to ${langCode === 'en' ? 'English' : langCode === 'hi' ? 'Hindi' : 'Gujarati'}`);
                // Refresh or update state as needed
                window.location.reload(); // Simple way to apply language change globally
            }
        } catch (error) {
            console.error("Language update failed:", error);
            alert("Failed to update language.");
        }
    };

    return {
        scrolled,
        activeTab,
        settingsOpen,
        settingsRef,
        navItems,
        settingsItems,
        handleNavClick,
        handleSettingsItemClick,
        handleLogout,
        setSettingsOpen,
        setActiveTab,
        setScrolled,
        navigate,
        languageMenuOpen,
        setLanguageMenuOpen,
        handleLanguageChange
    }
};

export default ViewModal;