import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import { Plus, Mail, Building, Users, MapPin, FileText, Briefcase, CheckSquare } from "lucide-react";
import "./CompanyDashboard.css";
import api from "../../api/axios";

function CompanyDashboard() {
    const navigate = useNavigate();
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);
    const [jobsCount, setJobsCount] = useState(0);
    const [applicationsCount, setApplicationsCount] = useState(0);

    const getDashboardData = async () => {
        try {
            setLoading(true);

            // Fetch company data
            const companyRes = await api.get("/api/company/me", {
                withCredentials: true,
            });
            setCompany(companyRes.data.company);

            // Fetch jobs data for stats
            try {
                const jobsRes = await api.get("/api/jobs/my", {
                    withCredentials: true,
                });
                setJobsCount(jobsRes.data?.jobs?.length || 0);
            } catch (jobErr) {
                console.error("Could not fetch jobs for stats", jobErr);
            }

            // Fetch applications data for stats
            try {
                const appRes = await api.get("/api/applications/company", {
                    withCredentials: true,
                });
                setApplicationsCount(appRes.data?.applications?.length || 0);
            } catch (appErr) {
                console.error("Could not fetch applications for stats", appErr);
            }

        } catch (error) {
            console.error("Error fetching company data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getDashboardData();
    }, []);

    if (loading) {
        return (
            <Layout role="company">
                <div style={{ minHeight: '60vh' }}></div>
            </Layout>
        );
    }

    if (!company) {
        return (
            <Layout role="company">
                <div className="dashboard-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center' }}>
                    <div style={{ background: 'white', padding: '3rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', maxWidth: '500px' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1a1a2e' }}>Welcome to WorkFlow!</h2>
                        <p style={{ color: '#7a7a8e', marginBottom: '2rem', lineHeight: '1.5' }}>
                            You haven't set up your company profile yet. Create one now to start posting jobs and managing applicants.
                        </p>
                        <button
                            className="btn-primary"
                            onClick={() => navigate("/company/create")}
                        >
                            Create Company Profile
                        </button>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout role="company">
            <div className="dashboard-content">
                <div className="welcome-banner">
                    <div>
                        <h1>Welcome back, {company.companyName} 👋</h1>
                        <p>Here is what's happening with your company today.</p>
                    </div>
                    <div>
                        <button
                            className="btn-create-job"
                            onClick={() => navigate("/company/jobs/create")}
                        >
                            <span className="btn-icon"><Plus size={18} strokeWidth={3} /></span>
                            Create Job
                        </button>
                    </div>
                </div>

                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon yellow"><Briefcase size={28} /></div>
                        <div className="stat-info">
                            <h3>Total Jobs Posted</h3>
                            <h2>{jobsCount}</h2>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon blue"><Users size={28} /></div>
                        <div className="stat-info">
                            <h3>Total Applications</h3>
                            <h2>{applicationsCount}</h2>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon green"><CheckSquare size={28} /></div>
                        <div className="stat-info">
                            <h3>Active Jobs</h3>
                            <h2>{jobsCount}</h2>
                        </div>
                    </div>
                </div>

                <div className="dashboard-bottom-grid">
                    {/* Profile Card */}
                    <div className="profile-card">
                        <div className="profile-header">
                            <h3>Company Profile</h3>
                            <div>
                                <button
                                    className="btn-secondary"
                                    onClick={() => navigate("/company/edit")}
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                        <div className="profile-details">
                            <div className="detail-item">
                                <div className="detail-icon"><Mail size={20} /></div>
                                <div className="detail-text">
                                    <span className="label">Email</span>
                                    <span className="value">{company.companyEmail}</span>
                                </div>
                            </div>
                            <div className="detail-item">
                                <div className="detail-icon"><Building size={20} /></div>
                                <div className="detail-text">
                                    <span className="label">Industry</span>
                                    <span className="value">{company.industry}</span>
                                </div>
                            </div>
                            <div className="detail-item">
                                <div className="detail-icon"><Users size={20} /></div>
                                <div className="detail-text">
                                    <span className="label">Company Size</span>
                                    <span className="value">{company.companySize}</span>
                                </div>
                            </div>
                            <div className="detail-item">
                                <div className="detail-icon"><MapPin size={20} /></div>
                                <div className="detail-text">
                                    <span className="label">Location</span>
                                    <span className="value">{company.city}, {company.state}</span>
                                </div>
                            </div>
                            <div className="detail-item full-width">
                                <div className="detail-icon"><FileText size={20} /></div>
                                <div className="detail-text">
                                    <span className="label">Description</span>
                                    <p className="value description">{company.companyDescription || "No description provided yet."}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default CompanyDashboard;