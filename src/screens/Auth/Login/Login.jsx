import { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import loginBg from "../../../assets/homepage.jpg";
import useViewModal from "./Login.ViewModal";

function Login() {
    const { formData, handleChange, handleLogin, loading, error, success } = useViewModal();
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div
            className="signup-container"
            style={{ backgroundImage: `url(${loginBg})` }}
        >
            <div className="signup-card">

                <h2 className="signup-title">Welcome Back !!</h2>

                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <i className="fa-solid fa-envelope"></i>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <i className="fa-solid fa-lock"></i>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <i
                            className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"} password-toggle`}
                            onClick={() => setShowPassword(!showPassword)}
                        ></i>
                    </div>

                    <div className="forgot-link">
                        <Link to="/forgot-password">
                            Forgot Password?
                        </Link>
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <button type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <span className="signup-footer">
                    Don't have an account?{" "}
                    <Link to="/signup">Sign up</Link>
                </span>

            </div>
        </div>
    )
}

export default Login
