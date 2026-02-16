import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../../services/auth";
import { resetAuthState } from "../../../redux/slices/authSlice";
import "./style.css";
import loginBg from "../../../assets/homepage.jpg";

function ForgotPassword() {
    const dispatch = useDispatch();
    const { loading, error, success } = useSelector((state) => state.auth);
    const [email, setEmail] = useState("");

    useEffect(() => {
        dispatch(resetAuthState());
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(forgotPassword(email));
        if (forgotPassword.fulfilled.match(result)) {
            console.log("Success:", result.payload);
        }
    };

    return (
        <div
            className="forgot-container"
            style={{ backgroundImage: `url(${loginBg})` }}
        >
            <div className="forgot-card">

                <h2 className="forgot-title">Reset Password</h2>

                {!success ? (
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

                            {error && <p className="error-message">{error}</p>}

                            <button type="submit" className="forgot-button" disabled={loading}>
                                {loading ? "Sending..." : "Send Reset Link"}
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="success-message">
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
