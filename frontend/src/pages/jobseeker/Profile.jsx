import React, { useState, useEffect } from "react";
import { User, Mail, Shield, Briefcase, Calendar } from "lucide-react";
import Layout from "../../components/Layout";
import api from "../../api/axios";

function Profile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get("/api/auth/profile");
                setProfile(response.data.user);
            } catch (err) {
                console.error("Failed to fetch profile", err);
                setError("Could not load profile data.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    // Card Styles
    const cardStyle = {
        padding: '2rem',
        borderRadius: '16px',
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        maxWidth: '600px',
        margin: '0 auto',
        marginTop: '2rem'
    };

    const rowStyle = {
        display: 'flex',
        alignItems: 'center',
        padding: '1rem 0',
        borderBottom: '1px solid #f1f5f9'
    };

    const iconBoxStyle = {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: '#eef2ff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '1rem',
        color: '#4f46e5'
    };

    return (
        <Layout role="jobseeker">
            <div style={{ padding: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem', color: '#1a1a2e', textAlign: 'center' }}>My Profile</h1>
                <p style={{ color: '#7a7a8e', textAlign: 'center' }}>Manage your personal information.</p>

                {loading ? (
                    <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading profile...</p>
                ) : error ? (
                    <p style={{ textAlign: 'center', marginTop: '2rem', color: '#dc2626' }}>{error}</p>
                ) : (
                    <div style={cardStyle}>

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
                            <div style={{
                                width: '100px',
                                height: '100px',
                                borderRadius: '50%',
                                backgroundColor: '#4f46e5',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '2.5rem',
                                fontWeight: 'bold',
                                marginBottom: '1rem'
                            }}>
                                {profile?.name?.charAt(0).toUpperCase()}
                            </div>
                            <h2 style={{ margin: 0, color: '#1a1a2e', fontSize: '1.5rem' }}>{profile?.name}</h2>
                            <span style={{
                                backgroundColor: '#dcfce7',
                                color: '#166534',
                                padding: '0.25rem 0.75rem',
                                borderRadius: '9999px',
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                marginTop: '0.5rem',
                                textTransform: 'capitalize'
                            }}>
                                {profile?.role}
                            </span>
                        </div>

                        <div style={{ marginTop: '1rem' }}>
                            <div style={rowStyle}>
                                <div style={iconBoxStyle}><User size={20} /></div>
                                <div>
                                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>Full Name</p>
                                    <p style={{ margin: 0, fontWeight: '500', color: '#1e293b' }}>{profile?.name}</p>
                                </div>
                            </div>

                            <div style={rowStyle}>
                                <div style={iconBoxStyle}><Mail size={20} /></div>
                                <div>
                                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>Email Address</p>
                                    <p style={{ margin: 0, fontWeight: '500', color: '#1e293b' }}>{profile?.email}</p>
                                </div>
                            </div>

                            <div style={{ ...rowStyle, borderBottom: 'none' }}>
                                <div style={iconBoxStyle}><Calendar size={20} /></div>
                                <div>
                                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>Joined On</p>
                                    <p style={{ margin: 0, fontWeight: '500', color: '#1e293b' }}>
                                        {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'N/A'}
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </Layout>
    );
}

export default Profile;
