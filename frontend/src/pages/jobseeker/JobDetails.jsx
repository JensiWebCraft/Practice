import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./JobUI.css";

const JobDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchJob = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/jobs/${id}`
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

                <div className="job-actions" style={{ justifyContent: 'center', maxWidth: '400px', margin: '0 auto' }}>
                    <button className="btn-secondary" onClick={() => navigate(-1)}>
                        Back
                    </button>
                    <button className="btn-primary">
                        Apply Now
                    </button>
                </div>

            </div>
        </div>
    );
};

export default JobDetails;