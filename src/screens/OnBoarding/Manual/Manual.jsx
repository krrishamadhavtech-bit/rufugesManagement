import { Link } from "react-router-dom";
import "../onboarding.css";
import loginBg from "../../../assets/homepage.jpg";

function Manual() {
    return (
        <div className="onboarding-container" style={{ backgroundImage: `url(${loginBg})` }}>
            <div className="onboarding-card">

                <div className="progress-dots">
                    <span></span>
                    <span></span>
                    <span className="active"></span>
                    <span></span>
                </div>

                <h2 className="onboarding-title">
                    How It Works
                </h2>

                <p className="onboarding-text" style={{ textAlign: 'left', display: 'inline-block' }}>
                    ✔ Find verified services near you<br />
                    ✔ Access translated resources<br />
                    ✔ Connect with community support<br />
                    ✔ Get updates about legal & housing help
                </p>

                <Link to="/onboarding/finish">
                    <button className="onboarding-button">
                        Next
                    </button>
                </Link>

            </div>
        </div>
    );
}

export default Manual;
