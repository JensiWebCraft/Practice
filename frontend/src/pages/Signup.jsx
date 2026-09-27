import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../App.css";

function Signup() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "jobseeker"
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", formData);
      console.log(response.data);

    } catch (err) {
      console.log(err);
    }

    navigate("/login");
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Create Account</h1>
          <p>Join us and get started</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="input-field">
            <span className="field-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="5" />
                <path d="M20 21a8 8 0 0 0-16 0" />
              </svg>
            </span>
            <input type="text" placeholder="Full Name" name="name" value={formData.name} onChange={handleChange} />
          </div>

          {/* Email */}
          <div className="input-field">
            <span className="field-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </span>
            <input type="email" placeholder="Email Address" name="email" value={formData.email} onChange={handleChange} />
          </div>

          {/* Password */}
          <div className="input-field">
            <span className="field-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </span>
            <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
          </div>

          {/* Role Selector */}
          <div className="role-selector-container">
            <label className="role-label">I am joining as:</label>
            <div className="role-options">
              <button
                type="button"
                className={`role-option-btn ${formData.role === "jobseeker" ? "active" : ""}`}
                onClick={() => setFormData({ ...formData, role: "jobseeker" })}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span>Job Seeker</span>
              </button>

              <button
                type="button"
                className={`role-option-btn ${formData.role === "company" ? "active" : ""}`}
                onClick={() => setFormData({ ...formData, role: "company" })}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="16" height="16" x="4" y="4" rx="2" />
                  <path d="M9 18v-4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4" />
                  <path d="M9 8h.01M15 8h.01M9 12h.01M15 12h.01" />
                </svg>
                <span>Company</span>
              </button>
            </div>
          </div>

          <button className="auth-btn" type="submit">Sign Up</button>
        </form>

        <div className="auth-footer">
          Already have an account?&nbsp;&nbsp;<Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  )
}

export default Signup;