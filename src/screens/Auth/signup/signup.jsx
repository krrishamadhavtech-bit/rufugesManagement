import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetAuthState } from "../../../redux/slices/authSlice";
import { registerUser } from "../../../services/auth";
import "./style.css";
import loginBg from "../../../assets/homepage.jpg";

function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        language: "en"
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [validationError, setValidationError] = useState("");

    const { loading, error, success } = useSelector((state) => state.auth);

    useEffect(() => {
        if (success) {
            navigate("/"); // Navigate to login screen
            dispatch(resetAuthState());
        }
    }, [success, navigate, dispatch]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (validationError) setValidationError("");
    };

    const handleSignup = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setValidationError("Passwords do not match!");
            return;
        }
        dispatch(registerUser({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            language: formData.language
        }));
    };

    return (
        <div
            className="signup-container"
            style={{ backgroundImage: `url(${loginBg})` }}
        >
            <div className="signup-card">

                <h2 className="signup-title">Create Account</h2>
                <p className="signup-subtitle">
                    Join the community in Denmark
                </p>

                <form onSubmit={handleSignup}>
                    <div className="input-group">
                        <i className="fa-solid fa-user"></i>
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

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

                    <div className="input-group">
                        <i className="fa-solid fa-lock"></i>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        <i
                            className={`fa-solid ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"} password-toggle`}
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        ></i>
                    </div>

                    <div className="input-group">
                        <i className="fa-solid fa-globe"></i>
                        <select
                            name="language"
                            value={formData.language}
                            onChange={handleChange}
                            required
                        >
                            <option value="en">English</option>
                            <option value="da">Dansk</option>
                            <option value="ar">Arabic</option>
                            <option value="uk">Ukrainian</option>
                        </select>
                    </div>

                    {(error || validationError) && <p className="error-message">{error || validationError}</p>}

                    <button type="submit" disabled={loading}>
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>
                </form>

                <span className="signup-footer">
                    Already have an account?{" "}
                    <Link to="/">Login</Link>
                </span>

            </div>
        </div>
    )
}

export default Signup;
