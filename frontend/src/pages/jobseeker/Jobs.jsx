import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./JobUI.css";
import Layout from "../../components/Layout";
import api from "../../api/axios";

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const fetchJobs = async () => {
        try {
            const response = await api.get(
                "/api/jobs"
            );

            setJobs(response.data.jobs);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    // Removed loading block to prevent flash

    return (
        <Layout role="jobseeker">
            <div className="job-page-container">
                <div className="job-card-wrapper">
                    <div className="job-header">
                        <h1>Available Jobs</h1>
                    </div>

                    {jobs.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>
                            <p>No jobs available at the moment.</p>
                        </div>
                    ) : (
                        <div className="jobs-grid">
                            {jobs.map((job) => (
                                <div className="job-card" key={job._id}>
                                    <h2 className="job-title">{job.title}</h2>
                                    <h4 className="job-company">{job.company?.companyName}</h4>

                                    <div className="job-badges">
                                        <span className="badge">{job.jobType}</span>
                                        <span className="badge">{job.workMode}</span>
                                    </div>

                                    <div className="job-detail-row">
                                        <strong>Location:</strong>
                                        <span>{job.location}</span>
                                    </div>

                                    <div className="job-detail-row">
                                        <strong>Experience:</strong>
                                        <span>{job.experience}</span>
                                    </div>

                                    <div className="job-detail-row">
                                        <strong>Salary:</strong>
                                        <span>₹{job.salaryMin} - ₹{job.salaryMax}</span>
                                    </div>

                                    <div className="job-detail-row">
                                        <strong>Skills:</strong>
                                        <span>{job.skills?.join(", ")}</span>
                                    </div>

                                    <div className="job-actions">
                                        <button
                                            className="btn-primary"
                                            onClick={() => navigate(`/jobs/${job._id}`)}
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Jobs;