import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { completeOnboarding } from "../../../services/auth";
import "../onboarding.css";
import loginBg from "../../../assets/homepage.jpg";

function Finish() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [localLoading, setLocalLoading] = useState(false);
    const [localError, setLocalError] = useState("");

    const handleWelcome = async () => {
        setLocalLoading(true);
        setLocalError("");

        try {
            const resultAction = await dispatch(completeOnboarding());

            if (completeOnboarding.fulfilled.match(resultAction)) {
                navigate("/home", { replace: true });
            } else {
                setLocalError(resultAction.payload || "Failed to complete onboarding.");
            }
        } catch (err) {
            setLocalError("Something went wrong. Please try again.");
        } finally {
            setLocalLoading(false);
        }
    };

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

                {localError && <p className="error-message">{localError}</p>}

                <button
                    className="onboarding-button"
                    onClick={handleWelcome}
                    disabled={localLoading}
                >
                    {localLoading ? "Finalizing..." : "Welcome"}
                </button>

            </div>
        </div>
    );
}

export default Finish;
