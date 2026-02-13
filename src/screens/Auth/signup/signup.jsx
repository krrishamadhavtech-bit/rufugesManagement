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
    });

    const { loading, error, success } = useSelector((state) => state.auth);

    useEffect(() => {
        if (success) {
            navigate("/onboarding/welcome");
            dispatch(resetAuthState());
        }
    }, [success, navigate, dispatch]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = (e) => {
        e.preventDefault();
        dispatch(registerUser({
            email: formData.email,
            password: formData.password,
            name: formData.name // Although prompt only mentioned email/pass, common to include name
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
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {error && <p className="error-message" style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>{error}</p>}

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
