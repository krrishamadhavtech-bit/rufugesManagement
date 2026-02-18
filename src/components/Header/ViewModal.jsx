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
    const navItems = ["Home", "About Us", "Contact Us", "News Corner", "Upcoming Events", "Settings"];
    const validTabs = navItems.map(item => item.toLowerCase().replace(/\s+/g, '-'));

    const [scrolled, setScrolled] = useState(false);
    const [activeTab, setActiveTab] = useState(() => {
        const path = window.location.pathname === "/" ? "home" : window.location.pathname.substring(1);
        const sectionId = path.split('/')[0];
        if (window.location.hash) return window.location.hash.substring(1);
        return validTabs.includes(sectionId) ? sectionId : "home";
    });
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const settingsRef = useRef(null);

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
            // Close mobile menu if clicked outside header
            if (mobileMenuOpen && !document.querySelector('.site-header').contains(event.target)) {
                setMobileMenuOpen(false);
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

    // Sync active tab with URL changes (handles refresh, back/forward, and direct navigation)
    useEffect(() => {
        const path = location.pathname === "/" ? "home" : location.pathname.substring(1);
        const sectionId = path.split('/')[0];

        if (location.pathname === "/home" || location.pathname === "/") {
            const hashId = location.hash.substring(1);
            if (hashId && validTabs.includes(hashId)) {
                setActiveTab(hashId);
                // Scroll to hash element if it exists
                const element = document.getElementById(hashId);
                if (element) {
                    setTimeout(() => {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                }
            } else {
                setActiveTab("home");
            }
        } else if (validTabs.includes(sectionId)) {
            setActiveTab(sectionId);
        }
    }, [location.pathname, location.hash]);

    const handleNavClick = (item) => {
        const sectionId = item.toLowerCase().replace(/\s+/g, '-');

        // Don't navigate for Settings - just open dropdown
        if (item === "Settings") {
            setSettingsOpen(!settingsOpen);
            return;
        }

        setMobileMenuOpen(false); // Close mobile menu on click

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
        handleLanguageChange,
        mobileMenuOpen,
        setMobileMenuOpen
    }
};

export default ViewModal;