import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./JobUI.css";

const MyApplications = () => {
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMyApplications = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/applications/my",
                { withCredentials: true }
            );
            setApplications(response.data.applications);
        } catch (err) {
            console.error(err);
            setError("Failed to load applications");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyApplications();
    }, []);

    if (loading) {
        return (
            <div className="job-page-container">
                <div className="job-card-wrapper" style={{ textAlign: 'center' }}>
                    <h2>Loading your applications...</h2>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="job-page-container">
                <div className="job-card-wrapper" style={{ textAlign: 'center', color: '#ef4444' }}>
                    <h2>{error}</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="job-page-container">
            <div className="job-card-wrapper" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h1 style={{ marginBottom: '2rem' }}>My Applications</h1>

                {applications.length === 0 ? (
                    <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#666' }}>
                        You haven't applied to any jobs yet.
                    </p>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {applications.map((app) => (
                            <div key={app._id} style={{ 
                                padding: '1.5rem', 
                                border: '1px solid #ddd', 
                                borderRadius: '12px',
                                backgroundColor: '#fff',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                            }}>
                                <h3 style={{ margin: '0 0 0.5rem 0', color: '#1a1a2e' }}>
                                    {app.job?.title || "Job Unavailable"}
                                </h3>
                                <p style={{ margin: '0 0 1rem 0', color: '#555' }}>
                                    <strong>Status:</strong> <span style={{
                                        color: app.status === 'Pending' ? '#d97706' : 
                                               app.status === 'Accepted' ? '#16a34a' : 
                                               app.status === 'Rejected' ? '#ef4444' : '#2563eb',
                                        fontWeight: 'bold'
                                    }}>{app.status}</span>
                                </p>
                                <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: '#666' }}>
                                    Applied on: {new Date(app.createdAt).toLocaleDateString()}
                                </p>
                                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                                    <button 
                                        className="btn-secondary" 
                                        style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                                        onClick={() => app.job?._id && navigate(`/jobs/${app.job._id}`)}
                                    >
                                        View Job
                                    </button>
                                    <button 
                                        className="btn-primary" 
                                        style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', width: 'auto' }}
                                        onClick={() => navigate(`/applications/${app._id}`)}
                                    >
                                        Application Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyApplications;
