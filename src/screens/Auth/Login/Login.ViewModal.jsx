import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetAuthState } from "../../../redux/slices/authSlice";
import { loginUser } from "../../../services/auth";
const ViewModal = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { loading, error, success, user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (success) {
            if (user?.role === 'admin') {
                navigate("/admin/dashboard", { replace: true });
            } else if (user?.onboardingCompleted) {
                navigate("/home", { replace: true });
            } else {
                navigate("/onboarding/welcome", { replace: true });
            }
            dispatch(resetAuthState());
        }
    }, [success, navigate, dispatch, user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email: formData.email, password: formData.password }));
    };
    return {
        formData,
        handleChange,
        handleLogin,
        loading,
        error,
        success
    }
}

export default ViewModal