import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./EditCompany.css"; // Reuse form layout
import Layout from "../../components/Layout";

const CreateJob = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        jobType: "Full Time",
        workMode: "Onsite",
        experience: "Fresher",
        salaryMin: "",
        salaryMax: "",
        location: "",
        skills: "",
        vacancies: 1,
        applicationDeadline: ""
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setIsError(false);

        try {
            setLoading(true);
            const response = await axios.post("http://localhost:5000/api/jobs/create", {
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

            setMessage("Job Created Successfully!!!");
            setIsError(false);

            setTimeout(() => {
                navigate("/company/jobs");
            }, 1000);
        }
        catch (error) {
            console.log(error);
            setMessage(error.response?.data?.message || "Failed to create job");
            setIsError(true);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Layout role="company">
            <div className="company-edit-page">
                <div className="edit-container">
                    <div className="edit-header">
                        <h1>Create New Job</h1>
                        <p>Post a new job opening for your company.</p>
                    </div>

                    {message && (
                        <div className={isError ? "error-msg" : "success-msg"}>
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>

                        <div className="form-section">
                            <h2>Job Details</h2>
                            <div className="form-grid">

                                <div className="form-group full-width">
                                    <label>Job Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="e.g. Senior Frontend Engineer"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group full-width">
                                    <label>Job Description</label>
                                    <textarea
                                        name="description"
                                        placeholder="Describe the role, responsibilities, and requirements..."
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Job Type</label>
                                    <select
                                        name="jobType"
                                        value={formData.jobType}
                                        onChange={handleChange}
                                    >
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
                                        <option value="Onsite">Onsite</option>
                                        <option value="Remote">Remote</option>
                                        <option value="Hybrid">Hybrid</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Experience Needed</label>
                                    <input
                                        type="text"
                                        name="experience"
                                        placeholder="e.g. 1-2 Years or Fresher"
                                        value={formData.experience}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Location</label>
                                    <input
                                        type="text"
                                        name="location"
                                        placeholder="e.g. Mumbai, Maharashtra"
                                        value={formData.location}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Minimum Salary (₹)</label>
                                    <input
                                        type="number"
                                        name="salaryMin"
                                        placeholder="e.g. 400000"
                                        value={formData.salaryMin}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Maximum Salary (₹)</label>
                                    <input
                                        type="number"
                                        name="salaryMax"
                                        placeholder="e.g. 800000"
                                        value={formData.salaryMax}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group full-width">
                                    <label>Required Skills (Comma separated)</label>
                                    <input
                                        type="text"
                                        name="skills"
                                        placeholder="React, Node.js, MongoDB"
                                        value={formData.skills}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Number of Vacancies</label>
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
                                        required
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
                                disabled={loading}
                            >
                                {loading ? "Creating..." : "Create Job"}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default CreateJob;