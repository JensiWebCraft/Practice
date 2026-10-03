import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";

const CompanyApplications = () => {
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updatingId, setUpdatingId] = useState(null);

    const fetchApplications = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/applications/company",
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

    const handleStatusChange = async (appId, newStatus) => {
        setUpdatingId(appId);
        try {
            await axios.patch(
                `http://localhost:5000/api/applications/${appId}/status`,
                { status: newStatus },
                { withCredentials: true }
            );
            
            // Update local state
            setApplications(applications.map(app => 
                app._id === appId ? { ...app, status: newStatus } : app
            ));
        } catch (err) {
            console.error(err);
            alert("Failed to update status");
        } finally {
            setUpdatingId(null);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);
    // Removed loading block to prevent flash

    if (error) {
        return (
            <Layout role="company">
                <div style={{ padding: '2rem', textAlign: 'center', color: '#ef4444' }}>
                    <h2>{error}</h2>
                </div>
            </Layout>
        );
    }

    return (
        <Layout role="company">
            <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Received Applications</h1>
                <button 
                    onClick={() => navigate('/company/dashboard')}
                    style={{ padding: '0.5rem 1rem', background: '#e5e7eb', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Back to Dashboard
                </button>
            </div>

            {applications.length === 0 ? (
                <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#666' }}>
                    You haven't received any applications yet.
                </p>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {applications.map((app) => (
                        <div key={app._id} style={{ 
                            padding: '1.5rem', 
                            border: '1px solid #ddd', 
                            borderRadius: '8px',
                            backgroundColor: '#fff',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                                <div>
                                    <h3 style={{ margin: '0 0 0.5rem 0', color: '#1a1a2e' }}>
                                        {app.candidate?.fullName || "Unknown Candidate"} 
                                        <span style={{ fontSize: '0.9rem', fontWeight: 'normal', color: '#666', marginLeft: '0.5rem' }}>
                                            applied for
                                        </span> {app.job?.title || "Unknown Job"}
                                    </h3>
                                    
                                    <p style={{ margin: '0 0 0.25rem 0', color: '#555' }}>
                                        <strong>Email:</strong> {app.candidate?.email}
                                    </p>
                                    <p style={{ margin: '0 0 0.25rem 0', color: '#555' }}>
                                        <strong>Phone:</strong> {app.candidate?.phone || "N/A"}
                                    </p>
                                    
                                    {app.resume && (
                                        <p style={{ margin: '0.5rem 0 0 0' }}>
                                            <a href={app.resume} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 'bold' }}>
                                                View Resume ↗
                                            </a>
                                        </p>
                                    )}
                                    
                                    {app.coverLetter && (
                                        <div style={{ marginTop: '1rem', padding: '1rem', background: '#f8fafc', borderRadius: '4px', borderLeft: '4px solid #cbd5e1' }}>
                                            <strong>Cover Letter:</strong>
                                            <p style={{ margin: '0.5rem 0 0 0', whiteSpace: 'pre-wrap', fontSize: '0.95rem' }}>
                                                {app.coverLetter}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div style={{ minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: '#666' }}>
                                        Applied: {new Date(app.createdAt).toLocaleDateString()}
                                    </p>
                                    
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.25rem', fontWeight: 'bold' }}>Update Status:</label>
                                        <select 
                                            value={app.status}
                                            onChange={(e) => handleStatusChange(app._id, e.target.value)}
                                            disabled={updatingId === app._id}
                                            style={{
                                                width: '100%',
                                                padding: '0.5rem',
                                                borderRadius: '4px',
                                                border: '1px solid #ccc',
                                                backgroundColor: app.status === 'Pending' ? '#fef3c7' : 
                                                                 app.status === 'Shortlisted' ? '#dcfce7' : 
                                                                 app.status === 'Rejected' ? '#fee2e2' : '#fff'
                                            }}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Shortlisted">Shortlisted</option>
                                            <option value="Rejected">Rejected</option>
                                        </select>
                                    </div>
                                    <button 
                                        onClick={() => navigate(`/applications/${app._id}`)}
                                        style={{ 
                                            padding: '0.5rem', 
                                            background: '#1e293b', 
                                            color: 'white', 
                                            border: 'none', 
                                            borderRadius: '4px', 
                                            cursor: 'pointer',
                                            fontSize: '0.9rem',
                                            marginTop: '0.5rem'
                                        }}
                                    >
                                        Full Details &rarr;
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            </div>
        </Layout>
    );
};

export default CompanyApplications;
