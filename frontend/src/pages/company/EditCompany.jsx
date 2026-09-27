import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditCompany.css"; // Added CSS import

function EditCompany() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        companyName: "",
        companyEmail: "",
        companyPhone: "",
        companyWebsite: "",
        companyDescription: "",

        industry: "",
        companySize: "",
        foundedYear: "",
        companyType: "",

        country: "",
        state: "",
        city: "",
        address: "",
        pincode: "",

        linkedin: "",
        twitter: "",
        facebook: "",
        instagram: "",

        hrName: "",
        hrEmail: "",
        hrPhone: "",
    });

    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    // 1. Get existing company
    const getMyCompany = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/company/me",
                {
                    withCredentials: true,
                }
            );

            const company = response.data.company;

            setFormData({
                companyName: company.companyName || "",
                companyEmail: company.companyEmail || "",
                companyPhone: company.companyPhone || "",
                companyWebsite: company.companyWebsite || "",
                companyDescription: company.companyDescription || "",

                industry: company.industry || "",
                companySize: company.companySize || "",
                foundedYear: company.foundedYear || "",
                companyType: company.companyType || "",

                country: company.country || "",
                state: company.state || "",
                city: company.city || "",
                address: company.address || "",
                pincode: company.pincode || "",

                linkedin: company.socialLinks?.linkedin || "",
                twitter: company.socialLinks?.twitter || "",
                facebook: company.socialLinks?.facebook || "",
                instagram: company.socialLinks?.instagram || "",

                hrName: company.hrName || "",
                hrEmail: company.hrEmail || "",
                hrPhone: company.hrPhone || "",
            });
        } catch (error) {
            console.log(error);
            setMessage(
                error.response?.data?.message || "Failed to load company"
            );
            setIsError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getMyCompany();
    }, []);

    // 2. Handle input change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // 3. Update company
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setIsError(false);

        try {
            const response = await axios.put(
                "http://localhost:5000/api/company/me",
                formData,
                {
                    withCredentials: true,
                }
            );

            setMessage("Company updated successfully!");
            setIsError(false);

            // Go back to dashboard
            setTimeout(() => {
                navigate("/company/dashboard");
            }, 1500);

        } catch (error) {
            console.log(error);
            setMessage(
                error.response?.data?.message ||
                "Failed to update company"
            );
            setIsError(true);
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading company data...</p>
            </div>
        );
    }

    return (
        <div className="company-edit-page">
            <div className="edit-container">
                <div className="edit-header">
                    <h1>Edit Company Profile</h1>
                    <p>Update your company's details and public information.</p>
                </div>

                {message && (
                    <div className={isError ? "error-msg" : "success-msg"}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    {/* ================= BASIC INFORMATION ================= */}
                    <div className="form-section">
                        <h2>Basic Information</h2>
                        <div className="form-grid">
                            <div className="form-group full-width">
                                <label>Company Name</label>
                                <input
                                    type="text"
                                    name="companyName"
                                    placeholder="Enter company name"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Company Email</label>
                                <input
                                    type="email"
                                    name="companyEmail"
                                    placeholder="contact@company.com"
                                    value={formData.companyEmail}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Company Phone</label>
                                <input
                                    type="tel"
                                    name="companyPhone"
                                    placeholder="+1 234 567 8900"
                                    value={formData.companyPhone}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group full-width">
                                <label>Website</label>
                                <input
                                    type="url"
                                    name="companyWebsite"
                                    placeholder="https://www.yourwebsite.com"
                                    value={formData.companyWebsite}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group full-width">
                                <label>Description</label>
                                <textarea
                                    name="companyDescription"
                                    placeholder="Tell candidates about your company..."
                                    value={formData.companyDescription}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* ================= COMPANY DETAILS ================= */}
                    <div className="form-section">
                        <h2>Company Details</h2>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Industry</label>
                                <input
                                    type="text"
                                    name="industry"
                                    placeholder="e.g. IT & Software, Healthcare"
                                    value={formData.industry}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Company Size</label>
                                <select
                                    name="companySize"
                                    value={formData.companySize}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Company Size</option>
                                    <option value="1-10">1-10</option>
                                    <option value="11-50">11-50</option>
                                    <option value="51-200">51-200</option>
                                    <option value="201-500">201-500</option>
                                    <option value="501-1000">501-1000</option>
                                    <option value="1001-5000">1001-5000</option>
                                    <option value="5000+">5000+</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Founded Year</label>
                                <input
                                    type="number"
                                    name="foundedYear"
                                    placeholder="YYYY"
                                    value={formData.foundedYear}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Company Type</label>
                                <select
                                    name="companyType"
                                    value={formData.companyType}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Company Type</option>
                                    <option value="Startup">Startup</option>
                                    <option value="Private">Private</option>
                                    <option value="Public">Public</option>
                                    <option value="Government">Government</option>
                                    <option value="Non-Profit">Non-Profit</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* ================= LOCATION ================= */}
                    <div className="form-section">
                        <h2>Location</h2>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Country</label>
                                <input
                                    type="text"
                                    name="country"
                                    placeholder="Country"
                                    value={formData.country}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>State/Province</label>
                                <input
                                    type="text"
                                    name="state"
                                    placeholder="State"
                                    value={formData.state}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>City</label>
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    value={formData.city}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Pincode/Zip Code</label>
                                <input
                                    type="text"
                                    name="pincode"
                                    placeholder="Zip Code"
                                    value={formData.pincode}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group full-width">
                                <label>Address</label>
                                <textarea
                                    name="address"
                                    placeholder="Full Street Address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    style={{ minHeight: "80px" }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* ================= SOCIAL LINKS ================= */}
                    <div className="form-section">
                        <h2>Social Links</h2>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>LinkedIn</label>
                                <input
                                    type="url"
                                    name="linkedin"
                                    placeholder="LinkedIn URL"
                                    value={formData.linkedin}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Twitter</label>
                                <input
                                    type="url"
                                    name="twitter"
                                    placeholder="Twitter URL"
                                    value={formData.twitter}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Facebook</label>
                                <input
                                    type="url"
                                    name="facebook"
                                    placeholder="Facebook URL"
                                    value={formData.facebook}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Instagram</label>
                                <input
                                    type="url"
                                    name="instagram"
                                    placeholder="Instagram URL"
                                    value={formData.instagram}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* ================= HR INFORMATION ================= */}
                    <div className="form-section">
                        <h2>HR Information</h2>
                        <div className="form-grid">
                            <div className="form-group full-width">
                                <label>HR Name</label>
                                <input
                                    type="text"
                                    name="hrName"
                                    placeholder="Contact Person Name"
                                    value={formData.hrName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>HR Email</label>
                                <input
                                    type="email"
                                    name="hrEmail"
                                    placeholder="hr@company.com"
                                    value={formData.hrEmail}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>HR Phone</label>
                                <input
                                    type="tel"
                                    name="hrPhone"
                                    placeholder="+1 234 567 8900"
                                    value={formData.hrPhone}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* ================= BUTTONS ================= */}
                    <div className="form-actions">
                        <button
                            type="button"
                            className="btn-cancel"
                            onClick={() => navigate("/company/dashboard")}
                        >
                            Cancel
                        </button>

                        <button type="submit" className="btn-submit">
                            Save Changes
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default EditCompany;