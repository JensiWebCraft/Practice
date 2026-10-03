import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import api from "../api/axios";

const ApplicationDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchApplicationDetails = async () => {
        try {
            const response = await api.get(
                `/api/applications/${id}`,
                { withCredentials: true }
            );
            setApplication(response.data.application);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Failed to load application details");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplicationDetails();
    }, [id]);

    // Let's guess the role from the response structure or just use a generic layout. 
    // Usually companies view this more thoroughly.
    const layoutRole = window.location.pathname.includes("company") ? "company" : "jobseeker";

    if (loading) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'system-ui, sans-serif' }}>
                <h2>Loading application details...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#ef4444', fontFamily: 'system-ui, sans-serif' }}>
                <h2>{error}</h2>
                <button
                    onClick={() => navigate(-1)}
                    style={{ marginTop: '1rem', padding: '0.5rem 1rem', cursor: 'pointer' }}
                >
                    Go Back
                </button>
            </div>
        );
    }

    if (!application) {
        return <div style={{ padding: '2rem', textAlign: 'center' }}>Application not found</div>;
    }

    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
            <button
                onClick={() => navigate(-1)}
                style={{ padding: '0.5rem 1rem', background: '#e5e7eb', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '2rem' }}
            >
                &larr; Back
            </button>

            <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', border: '1px solid #ddd', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                <div style={{ borderBottom: '1px solid #eee', paddingBottom: '1.5rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <h1 style={{ margin: '0 0 0.5rem 0', color: '#1a1a2e' }}>Application Details</h1>
                        <p style={{ margin: 0, color: '#666' }}>
                            Submitted on {new Date(application.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                    <span style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '999px',
                        fontWeight: 'bold',
                        backgroundColor: application.status === 'Pending' ? '#fef3c7' :
                            application.status === 'Shortlisted' ? '#dcfce7' :
                                application.status === 'Rejected' ? '#fee2e2' : '#fff',
                        color: application.status === 'Pending' ? '#d97706' :
                            application.status === 'Shortlisted' ? '#16a34a' :
                                application.status === 'Rejected' ? '#ef4444' : '#000'
                    }}>
                        {application.status}
                    </span>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ margin: '0 0 1rem 0', color: '#333' }}>Job Information</h3>
                    <p style={{ margin: '0 0 0.5rem 0' }}><strong>Title:</strong> {application.job?.title}</p>
                    <p style={{ margin: '0 0 0.5rem 0' }}><strong>Type:</strong> {application.job?.jobType} | {application.job?.workMode}</p>
                    <p style={{ margin: '0 0 0.5rem 0' }}><strong>Location:</strong> {application.job?.location}</p>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ margin: '0 0 1rem 0', color: '#333' }}>Applicant Information</h3>
                    <p style={{ margin: '0 0 0.5rem 0' }}><strong>Name:</strong> {application.candidate?.fullName}</p>
                    <p style={{ margin: '0 0 0.5rem 0' }}><strong>Email:</strong> {application.candidate?.email}</p>
                    <p style={{ margin: '0 0 0.5rem 0' }}><strong>Phone:</strong> {application.candidate?.phone || "N/A"}</p>
                    {application.resume && (
                        <p style={{ margin: '1rem 0 0 0' }}>
                            <a href={application.resume} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 'bold' }}>
                                View Resume ↗
                            </a>
                        </p>
                    )}
                </div>

                {application.coverLetter && (
                    <div>
                        <h3 style={{ margin: '0 0 1rem 0', color: '#333' }}>Cover Letter</h3>
                        <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #cbd5e1', whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                            {application.coverLetter}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ApplicationDetails;
