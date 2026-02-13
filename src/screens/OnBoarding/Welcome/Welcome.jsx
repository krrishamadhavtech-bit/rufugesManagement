import { Link } from "react-router-dom";
import "../onboarding.css";
import loginBg from "../../../assets/homepage.jpg";

function Welcome() {
    return (
        <div className="onboarding-container" style={{ backgroundImage: `url(${loginBg})` }}>
            <div className="onboarding-card">

                <div className="progress-dots">
                    <span className="active"></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <h2 className="onboarding-title">
                    Welcome to Sammen
                </h2>

                <p className="onboarding-text">
                    A trusted platform helping newcomers, refugees,
                    and immigrants access reliable services,
                    essential information, and supportive communities in Denmark.
                </p>

                <Link to="/onboarding/language">
                    <button className="onboarding-button">
                        Get Started
                    </button>
                </Link>

            </div>
        </div>
    );
}

export default Welcome;
