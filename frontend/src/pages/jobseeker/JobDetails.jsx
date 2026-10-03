import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./JobUI.css";

const JobDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);

    const [isApplying, setIsApplying] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [applyData, setApplyData] = useState({
        resume: "",
        coverLetter: ""
    });
    const [message, setMessage] = useState(null);
    const [isError, setIsError] = useState(false);

    const fetchJob = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/jobs/${id}`, { withCredentials: true }
            );

            setJob(response.data.job);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJob();
    }, [id]);

    const handleApplyChange = (e) => {
        setApplyData({
            ...applyData,
            [e.target.name]: e.target.value
        });
    };

    const handleApplySubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setMessage(null);
        setIsError(false);

        try {
            const response = await axios.post(
                "http://localhost:5000/api/applications",
                {
                    jobId: id,
                    resume: applyData.resume,
                    coverLetter: applyData.coverLetter
                },
                { withCredentials: true }
            );

            setMessage("Application submitted successfully!");
            setTimeout(() => {
                navigate("/dashboard"); // or maybe to My Applications if it exists
            }, 2000);
            
        } catch (error) {
            console.log(error);
            setIsError(true);
            setMessage(error.response?.data?.message || "Failed to submit application.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="job-page-container">
                <div className="job-card-wrapper" style={{ textAlign: 'center' }}>
                    <h2>Loading job details...</h2>
                </div>
            </div>
        );
    }

    if (!job) {
        return (
            <div className="job-page-container">
                <div className="job-card-wrapper" style={{ textAlign: 'center' }}>
                    <h2>Job not found</h2>
                    <button className="btn-secondary" style={{ marginTop: '1rem', width: 'auto' }} onClick={() => navigate(-1)}>Go Back</button>
                </div>
            </div>
        );
    }

    return (
        <div className="job-page-container">
            <div className="job-card-wrapper">
                
                <div className="details-header">
                    <h1>{job.title}</h1>
                    <h3>{job.company?.companyName}</h3>
                    <div className="job-badges">
                        <span className="badge">{job.jobType}</span>
                        <span className="badge">{job.workMode}</span>
                        <span className="badge">Vacancies: {job.vacancies}</span>
                    </div>
                </div>

                <div className="details-description">
                    <h3 style={{ marginTop: 0, marginBottom: '1rem', color: '#1a1a2e' }}>Job Description</h3>
                    <p style={{ whiteSpace: 'pre-wrap' }}>{job.description}</p>
                </div>

                <div className="details-grid">
                    <div className="detail-box">
                        <span className="label">Location</span>
                        <span className="value">{job.location}</span>
                    </div>

                    <div className="detail-box">
                        <span className="label">Experience Required</span>
                        <span className="value">{job.experience}</span>
                    </div>

                    <div className="detail-box">
                        <span className="label">Salary Range</span>
                        <span className="value">₹{job.salaryMin} - ₹{job.salaryMax}</span>
                    </div>

                    <div className="detail-box">
                        <span className="label">Application Deadline</span>
                        <span className="value">
                            {new Date(job.applicationDeadline).toLocaleDateString()}
                        </span>
                    </div>
                    
                    <div className="detail-box" style={{ gridColumn: 'span 2' }}>
                        <span className="label">Required Skills</span>
                        <span className="value" style={{ color: '#d97706' }}>
                            {job.skills?.join(" • ")}
                        </span>
                    </div>
                </div>

                {!isApplying ? (
                    <div className="job-actions" style={{ justifyContent: 'center', maxWidth: '400px', margin: '0 auto' }}>
                        <button className="btn-secondary" onClick={() => navigate(-1)}>
                            Back
                        </button>
                        <button className="btn-primary" onClick={() => setIsApplying(true)}>
                            Apply Now
                        </button>
                    </div>
                ) : (
                    <div style={{ background: '#fef9c3', padding: '2rem', borderRadius: '16px', marginTop: '2rem' }}>
                        <h3 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#d97706' }}>Submit Your Application</h3>
                        
                        {message && (
                            <div style={{ padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', backgroundColor: isError ? '#fee2e2' : '#dcfce7', color: isError ? '#ef4444' : '#16a34a', fontWeight: 'bold' }}>
                                {message}
                            </div>
                        )}

                        <form onSubmit={handleApplySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontWeight: 600, color: '#333' }}>Resume Link *</label>
                                <input 
                                    type="url" 
                                    name="resume"
                                    required 
                                    value={applyData.resume}
                                    onChange={handleApplyChange}
                                    placeholder="e.g. Google Drive or Portfolio link" 
                                    style={{ padding: '0.85rem', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', outline: 'none' }}
                                />
                            </div>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontWeight: 600, color: '#333' }}>Cover Letter (Optional)</label>
                                <textarea 
                                    name="coverLetter"
                                    value={applyData.coverLetter}
                                    onChange={handleApplyChange}
                                    placeholder="Why are you a good fit for this role?" 
                                    style={{ padding: '0.85rem', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', minHeight: '120px', resize: 'vertical', outline: 'none' }}
                                />
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <button type="button" className="btn-secondary" onClick={() => setIsApplying(false)} disabled={submitting}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn-primary" disabled={submitting}>
                                    {submitting ? "Submitting..." : "Confirm Application"}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

            </div>
        </div>
    );
};

export default JobDetails;