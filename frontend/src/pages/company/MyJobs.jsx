import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import "../../pages/jobseeker/JobUI.css"; // Reuse Job UI CSS
import Layout from "../../components/Layout";

const MyJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const fetchMyJobs = async () => {
        try {
            const response = await api.get(
                "/api/jobs/my"
            );

            setJobs(response.data.jobs);
        } catch (error) {
            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to load jobs"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this job?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            const response = await api.delete(
                `/api/jobs/${id}`
            );

            alert(response.data.message);

            setJobs((prevJobs) =>
                prevJobs.filter((job) => job._id !== id)
            );
        } catch (error) {
            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to delete job"
            );
        }
    };

    useEffect(() => {
        fetchMyJobs();
    }, []);

    // Removed loading block to prevent flash
    return (
        <Layout role="company">
            <div className="job-page-container">
                <div className="job-card-wrapper">
                    <div className="job-header">
                        <h1>My Posted Jobs</h1>
                        <button
                            className="btn-primary"
                            style={{ flex: "none" }}
                            onClick={() => navigate("/company/jobs/create")}
                        >
                            + Create Job
                        </button>
                    </div>

                    {jobs.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>
                            <p>You have not created any jobs yet.</p>
                        </div>
                    ) : (
                        <div className="jobs-grid">
                            {jobs.map((job) => (
                                <div className="job-card" key={job._id}>
                                    <h2 className="job-title">{job.title}</h2>
                                    
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
                                        <strong>Vacancies:</strong>
                                        <span>{job.vacancies}</span>
                                    </div>

                                    <div className="job-detail-row">
                                        <strong>Skills:</strong>
                                        <span>{job.skills?.join(", ")}</span>
                                    </div>

                                    <div className="job-actions">
                                        <button
                                            className="btn-secondary"
                                            onClick={() => navigate(`/jobs/${job._id}`)}
                                        >
                                            View
                                        </button>

                                        <button
                                            className="btn-primary"
                                            onClick={() => navigate(`/company/jobs/edit/${job._id}`)}
                                        >
                                            Edit
                                        </button>

                                        <button 
                                            className="btn-danger"
                                            onClick={() => handleDelete(job._id)}
                                        >
                                            Delete
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

export default MyJobs;