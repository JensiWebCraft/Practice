import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./EditCompany.css"; // Reuse form layout

const EditJob = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        jobType: "",
        workMode: "",
        experience: "",
        salaryMin: "",
        salaryMax: "",
        location: "",
        skills: "",
        vacancies: 1,
        applicationDeadline: "",
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    // Get existing job
    const fetchJob = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/jobs/${id}`
            );

            const job = response.data.job;

            setFormData({
                title: job.title || "",
                description: job.description || "",
                jobType: job.jobType || "",
                workMode: job.workMode || "",
                experience: job.experience || "",
                salaryMin: job.salaryMin || "",
                salaryMax: job.salaryMax || "",
                location: job.location || "",
                skills: job.skills?.join(", ") || "",
                vacancies: job.vacancies || 1,
                applicationDeadline: job.applicationDeadline
                    ? job.applicationDeadline.split("T")[0]
                    : "",
            });
        } catch (error) {
            console.log(error);
            setMessage(error.response?.data?.message || "Failed to load job");
            setIsError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJob();
    }, [id]);

    // Handle input
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Update job
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setIsError(false);

        try {
            setSaving(true);

            const response = await axios.put(
                `http://localhost:5000/api/jobs/${id}`,
                {
                    ...formData,

                    salaryMin: Number(formData.salaryMin),
                    salaryMax: Number(formData.salaryMax),
                    vacancies: Number(formData.vacancies),

                    skills: formData.skills
                        .split(",")
                        .map((skill) => skill.trim())
                        .filter(Boolean),
                },
                {
                    withCredentials: true,
                }
            );

            setMessage(response.data.message || "Job updated successfully!");
            setIsError(false);

            setTimeout(() => {
                navigate("/company/jobs");
            }, 1000);
        } catch (error) {
            console.log(error);
            setMessage(error.response?.data?.message || "Failed to update job");
            setIsError(true);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading job details...</p>
            </div>
        );
    }

    return (
        <div className="company-edit-page">
            <div className="edit-container">
                <div className="edit-header">
                    <h1>Edit Job</h1>
                    <p>Update the details of your job posting.</p>
                </div>

                {message && (
                    <div className={isError ? "error-msg" : "success-msg"}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="form-section">
                        <h2>Job Information</h2>
                        <div className="form-grid">
                            
                            <div className="form-group full-width">
                                <label>Job Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group full-width">
                                <label>Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Job Type</label>
                                <select
                                    name="jobType"
                                    value={formData.jobType}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Job Type</option>
                                    <option value="Full Time">Full Time</option>
                                    <option value="Part Time">Part Time</option>
                                    <option value="Internship">Internship</option>
                                    <option value="Contract">Contract</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Work Mode</label>
                                <select
                                    name="workMode"
                                    value={formData.workMode}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Work Mode</option>
                                    <option value="Onsite">Onsite</option>
                                    <option value="Remote">Remote</option>
                                    <option value="Hybrid">Hybrid</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Experience (e.g., 1-2 Years)</label>
                                <input
                                    type="text"
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Minimum Salary (₹)</label>
                                <input
                                    type="number"
                                    name="salaryMin"
                                    value={formData.salaryMin}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Maximum Salary (₹)</label>
                                <input
                                    type="number"
                                    name="salaryMax"
                                    value={formData.salaryMax}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group full-width">
                                <label>Skills (comma separated)</label>
                                <input
                                    type="text"
                                    name="skills"
                                    value={formData.skills}
                                    onChange={handleChange}
                                    placeholder="React, Node.js, MongoDB"
                                />
                            </div>

                            <div className="form-group">
                                <label>Vacancies</label>
                                <input
                                    type="number"
                                    name="vacancies"
                                    min="1"
                                    value={formData.vacancies}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Application Deadline</label>
                                <input
                                    type="date"
                                    name="applicationDeadline"
                                    value={formData.applicationDeadline}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button
                            type="button"
                            className="btn-cancel"
                            onClick={() => navigate("/company/jobs")}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn-submit"
                            disabled={saving}
                        >
                            {saving ? "Updating..." : "Update Job"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default EditJob;