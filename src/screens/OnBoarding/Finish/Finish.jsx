import { Link } from "react-router-dom";
import "../onboarding.css";
import loginBg from "../../../assets/homepage.jpg";

function Finish() {
    return (
        <div className="onboarding-container" style={{ backgroundImage: `url(${loginBg})` }}>
            <div className="onboarding-card">

                <div className="progress-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span className="active"></span>
                </div>

                <h2 className="onboarding-title">
                    You're All Set!
                </h2>

                <p className="onboarding-text">
                    Let’s start exploring services and
                    building your new journey in Denmark.
                </p>

                <Link to="/">
                    <button className="onboarding-button">
                        Go to Login
                    </button>
                </Link>

            </div>
        </div>
    );
}

export default Finish;
