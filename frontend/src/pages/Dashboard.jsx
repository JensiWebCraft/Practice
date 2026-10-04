import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, CheckCircle, Clock, XCircle } from "lucide-react";
import Layout from "../components/Layout";
import api from "../api/axios";

function Dashboard() {
    const navigate = useNavigate();

    // You had this here, but note that the actual Logout button is inside Layout.jsx
    // and Layout.jsx has its own handleLogout function!
    const handleLogout = async () => {
        try {
            const response = await api.post("/api/auth/logout", {}, {
                withCredentials: true,
            });
            navigate("/login");
        } catch (err) {
            console.log(err);
        }
    }

    const [stats, setStats] = useState({
        total: 0,
        accepted: 0,
        pending: 0,
        rejected: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await api.get("/api/applications/my", {
                    withCredentials: true,
                });

                const apps = response.data.applications || [];

                let accepted = 0;
                let pending = 0;
                let rejected = 0;

                apps.forEach(app => {
                    if (app.status === 'Accepted') accepted++;
                    else if (app.status === 'Rejected') rejected++;
                    else pending++;
                });

                setStats({
                    total: apps.length,
                    accepted,
                    pending,
                    rejected
                });
            } catch (err) {
                console.error("Failed to fetch applications", err);
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);

    // Card Styles
    const cardStyle = {
        padding: '1.5rem',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
    };

    return (
        <Layout role="jobseeker">
            <div style={{ padding: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem', color: '#1a1a2e' }}>Welcome to Dashboard 🎉</h1>
                <p style={{ color: '#7a7a8e', marginBottom: '2rem' }}>Here is an overview of your job applications.</p>

                {loading ? (
                    <p>Loading your stats...</p>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                        gap: '1.5rem',
                        marginBottom: '2rem'
                    }}>
                        {/* Total Applied */}
                        <div style={{ ...cardStyle, backgroundColor: '#eef2ff' }}>
                            <Briefcase size={24} color="#4f46e5" style={{ marginBottom: '0.5rem' }} />
                            <h2 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#1e3a8a', margin: 0 }}>
                                {stats.total}
                            </h2>
                            <p style={{ color: '#4b5563', margin: 0, fontWeight: 500 }}>Applied Jobs</p>
                        </div>

                        {/* Shortlisted / Accepted */}
                        <div style={{ ...cardStyle, backgroundColor: '#f0fdf4' }}>
                            <CheckCircle size={24} color="#16a34a" style={{ marginBottom: '0.5rem' }} />
                            <h2 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#166534', margin: 0 }}>
                                {stats.accepted}
                            </h2>
                            <p style={{ color: '#4b5563', margin: 0, fontWeight: 500 }}>Shortlisted</p>
                        </div>

                        {/* Pending */}
                        <div style={{ ...cardStyle, backgroundColor: '#fffbeb' }}>
                            <Clock size={24} color="#d97706" style={{ marginBottom: '0.5rem' }} />
                            <h2 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#92400e', margin: 0 }}>
                                {stats.pending}
                            </h2>
                            <p style={{ color: '#4b5563', margin: 0, fontWeight: 500 }}>Pending</p>
                        </div>

                        {/* Rejected */}
                        <div style={{ ...cardStyle, backgroundColor: '#fef2f2' }}>
                            <XCircle size={24} color="#dc2626" style={{ marginBottom: '0.5rem' }} />
                            <h2 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#991b1b', margin: 0 }}>
                                {stats.rejected}
                            </h2>
                            <p style={{ color: '#4b5563', margin: 0, fontWeight: 500 }}>Rejected</p>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}

export default Dashboard;