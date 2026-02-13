import { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import loginBg from "../../../assets/homepage.jpg";

function ForgotPassword() {
    const [submitted, setSubmitted] = useState(false);
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div
            className="forgot-container"
            style={{ backgroundImage: `url(${loginBg})` }}
        >
            <div className="forgot-card">

                <h2 className="forgot-title">Reset Password</h2>

                {!submitted ? (
                    <>
                        <p className="forgot-text">
                            Enter your registered email address and we will send you a reset link.
                        </p>

                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <i className="fa-solid fa-envelope"></i>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <button type="submit" className="forgot-button">
                                Send Reset Link
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="success-message">
                        <i className="fa-solid fa-circle-check"></i>
                        <p>
                            A password reset link has been sent to your email.
                        </p>
                    </div>
                )}

                <div className="back-link">
                    <Link to="/">← Back to Login</Link>
                </div>

            </div>
        </div>
    );
}

export default ForgotPassword;
