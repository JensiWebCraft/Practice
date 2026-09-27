import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", formData, {
                withCredentials: true,
            });
            console.log(response.data);

            const role = response.data.user.role;

            if (role === "company") {
                navigate("/company/dashboard");

            } else {
                navigate("/dashboard");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-header">
                    <h1>Welcome Back</h1>
                    <p>Log in to your account</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    {/* Email */}
                    <div className="input-field">
                        <span className="field-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="4" width="20" height="16" rx="2" />
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                            </svg>
                        </span>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Password */}
                    <div className="input-field">
                        <span className="field-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                        </span>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="forgot-link">
                        <Link to="/forgot-password">
                            Forgot password?
                        </Link>
                    </div>

                    <button className="auth-btn" type="submit">Log In</button>
                </form>

                <div className="auth-footer">
                    Don&apos;t have an account?&nbsp;&nbsp;<Link to="/signup">Sign up</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;