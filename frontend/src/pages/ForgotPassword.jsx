import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function ForgotPassword() {

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        try {
            const response = await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
            console.log(response.data);

            setMessage(response.data.message);

            if (response.data.resetToken) {
                setTimeout(() => {
                    navigate(`/reset-password/${response.data.resetToken}`);
                }, 800);
            }
        }
        catch (err) {
            console.error(err);

            setError(
                err.response?.data?.message || "Something went wrong"
            );
        }
    };

    return (

        <div className="auth-page">
            <div className="auth-card">

                <div className="auth-header">
                    <h1>Forgot Password?</h1>
                    <p>Enter your email to reset your password</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>

                    <div className="input-field">
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>


                    {message && (
                        <p style={{ color: "green" }}>
                            {message}
                        </p>
                    )}

                    {error && (
                        <p style={{ color: "red" }}>
                            {error}
                        </p>
                    )}

                    <button className="auth-btn" type="submit">
                        Send Reset Link
                    </button>

                </form>

                <div className="auth-footer">
                    Remember your password?{" "}
                    <Link to="/login">Login</Link>
                </div>

            </div>
        </div>

    );
}

export default ForgotPassword;