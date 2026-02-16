import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../onboarding.css";
import loginBg from "../../../assets/homepage.jpg";

function LanguageSelector() {
    const navigate = useNavigate();
    const [selectedLang, setSelectedLang] = useState("en");

    const languages = [
        { name: "English", code: "en" },
        { name: "Dansk", code: "da" },
        { name: "Arabic", code: "ar" },
        { name: "Ukrainian", code: "uk" }
    ];

    const handleContinue = () => {
        navigate("/onboarding/manual");
    };

    return (
        <div className="onboarding-container" style={{ backgroundImage: `url(${loginBg})` }}>
            <div className="onboarding-card">

                <div className="progress-dots">
                    <span></span>
                    <span className="active"></span>
                    <span></span>
                    <span></span>
                </div>

                <h2 className="onboarding-title">
                    Choose Your Language
                </h2>

                <div className="language-grid">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            className={`language-button ${selectedLang === lang.code ? "active" : ""}`}
                            onClick={() => setSelectedLang(lang.code)}
                            style={{
                                border: selectedLang === lang.code ? "2px solid var(--primary)" : "1px solid #ddd",
                                background: selectedLang === lang.code ? "rgba(56, 169, 163, 0.1)" : "black"
                            }}
                        >
                            {lang.name}
                        </button>
                    ))}
                </div>

                <button className="onboarding-button" onClick={handleContinue}>
                    Continue
                </button>

            </div>
        </div>
    );
}

export default LanguageSelector;
