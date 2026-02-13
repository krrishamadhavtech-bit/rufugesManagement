import { Link } from "react-router-dom";
import "../onboarding.css";
import loginBg from "../../../assets/homepage.jpg";

function LanguageSelector() {
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
                    <button className="language-button">English</button>
                    <button className="language-button">Dansk</button>
                    <button className="language-button">Arabic</button>
                    <button className="language-button">Ukrainian</button>
                </div>

                <Link to="/onboarding/manual">
                    <button className="onboarding-button">
                        Continue
                    </button>
                </Link>

            </div>
        </div>
    );
}

export default LanguageSelector;
