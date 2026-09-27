import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CompanyDashboard.css";

function CompanyDashboard() {
    const navigate = useNavigate();
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);

    const getmycompany = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:5000/api/company/me", {
                withCredentials: true,
            });
            setCompany(response.data.company);
        } catch (error) {
            console.error("Error fetching company data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getmycompany();
    }, []);

    if (loading) {
        return (
            <div className="dashboard-loading">
                <div className="spinner"></div>
                <p>Loading Dashboard...</p>
            </div>
        );
    }

    if (!company) {
        return (
            <div className="dashboard-loading">
                <p>No company data available.</p>
            </div>
        );
    }

    return (
        <div className="dashboard-layout">
            {/* Sidebar */}
            <aside className="dashboard-sidebar">
                <div className="sidebar-logo">
                    <h2>WorkFlow</h2>
                </div>
                <nav className="sidebar-nav">
                    <ul>
                        <li className="active" onClick={() => navigate("/company/dashboard")}><span className="icon">📊</span> Dashboard</li>
                        <li onClick={() => navigate("/company/edit")}><span className="icon">🏢</span> Company Profile</li>
                        <li onClick={() => navigate("/company/jobs")}><span className="icon">💼</span> Manage Jobs</li>
                        <li onClick={() => alert("Applicants page coming soon!")}><span className="icon">👥</span> Applicants</li>
                        <li onClick={() => alert("Settings coming soon!")}><span className="icon">⚙️</span> Settings</li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="dashboard-main">
                {/* Navbar */}
                <header className="dashboard-navbar">
                    <div className="nav-search">
                        <input type="text" placeholder="Search..." />
                    </div>
                    <div className="nav-profile">
                        <span className="notification-bell">🔔</span>
                        <div className="avatar">{company.companyName.charAt(0)}</div>
                        <span className="profile-name">{company.companyName}</span>
                    </div>
                </header>

                <div className="dashboard-content">
                    <div className="welcome-banner">
                        <div>
                            <h1>Welcome back, {company.companyName} 👋</h1>
                            <p>Here is what's happening with your company today.</p>
                        </div>
                        <button
                            onClick={() => navigate("/company/jobs/create")}
                        >
                            Create Job
                        </button>
                    </div>



                    <div className="dashboard-bottom-grid">
                        {/* Profile Card */}
                        <div className="profile-card">
                            <div className="profile-header">
                                <h3>Company Profile</h3>
                                <button
                                    className="btn-secondary"
                                    onClick={() => navigate("/company/edit")}
                                >
                                    Edit
                                </button>
                            </div>
                            <div className="profile-details">
                                <div className="detail-item">
                                    <span className="label">Email</span>
                                    <span className="value">{company.companyEmail}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="label">Industry</span>
                                    <span className="value">{company.industry}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="label">Company Size</span>
                                    <span className="value">{company.companySize}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="label">Location</span>
                                    <span className="value">{company.city}, {company.state}</span>
                                </div>
                                <div className="detail-item full-width">
                                    <span className="label">Description</span>
                                    <p className="value description">{company.companyDescription || "No description provided yet."}</p>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </main>
        </div>
    );
}

export default CompanyDashboard;