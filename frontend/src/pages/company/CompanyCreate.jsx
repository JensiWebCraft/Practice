import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../../components/Layout";
import { Building2, Info, MapPin, Share2, Users, CheckCircle2 } from "lucide-react";
import "./CompanyCreate.css";

function CompanyCreate() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

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

    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setIsError(false);
        setMessage("");

        try {
            await axios.post(
                "http://localhost:5000/api/company/create",
                formData,
                {
                    withCredentials: true,
                }
            );

            setMessage("Company created successfully! Redirecting...");
            
            setTimeout(() => {
                navigate("/company/dashboard", { replace: true });
            }, 1500);

        } catch (error) {
            console.log(error);
            setIsError(true);
            setMessage(
                error.response?.data?.message ||
                "Failed to create company"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout role="company">
            <div className="company-create-container">
                <div className="company-create-header">
                    <h1>Let's setup your company</h1>
                    <p>Fill in the details below to complete your company profile.</p>
                </div>

                {message && (
                    <div className={isError ? "error-message" : "success-message"}>
                        {message}
                    </div>
                )}

                <div className="company-form-card">
                    <form onSubmit={handleSubmit}>
                        
                        {/* Basic Info */}
                        <div className="form-section">
                            <h2 className="section-title">
                                <Building2 size={22} className="section-icon" /> 
                                Basic Information
                            </h2>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label className="form-label">Company Name *</label>
                                    <input type="text" name="companyName" className="form-input" placeholder="e.g. Acme Corp" value={formData.companyName} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Company Email *</label>
                                    <input type="email" name="companyEmail" className="form-input" placeholder="contact@company.com" value={formData.companyEmail} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Company Phone</label>
                                    <input type="tel" name="companyPhone" className="form-input" placeholder="+1 (555) 000-0000" value={formData.companyPhone} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Website URL</label>
                                    <input type="url" name="companyWebsite" className="form-input" placeholder="https://www.company.com" value={formData.companyWebsite} onChange={handleChange} />
                                </div>
                                <div className="form-group full-width">
                                    <label className="form-label">Company Description</label>
                                    <textarea name="companyDescription" className="form-textarea" placeholder="Tell us a little bit about what your company does..." value={formData.companyDescription} onChange={handleChange} />
                                </div>
                            </div>
                        </div>

                        {/* Details */}
                        <div className="form-section">
                            <h2 className="section-title">
                                <Info size={22} className="section-icon" /> 
                                Company Details
                            </h2>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label className="form-label">Industry</label>
                                    <input type="text" name="industry" className="form-input" placeholder="e.g. IT & Software" value={formData.industry} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Company Size</label>
                                    <select name="companySize" className="form-select" value={formData.companySize} onChange={handleChange}>
                                        <option value="">Select Company Size</option>
                                        <option value="1-10">1-10 Employees</option>
                                        <option value="11-50">11-50 Employees</option>
                                        <option value="51-200">51-200 Employees</option>
                                        <option value="201-500">201-500 Employees</option>
                                        <option value="501-1000">501-1000 Employees</option>
                                        <option value="1000+">1000+ Employees</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Founded Year</label>
                                    <input type="number" name="foundedYear" className="form-input" placeholder="e.g. 2015" value={formData.foundedYear} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Company Type</label>
                                    <select name="companyType" className="form-select" value={formData.companyType} onChange={handleChange}>
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

                        {/* Location */}
                        <div className="form-section">
                            <h2 className="section-title">
                                <MapPin size={22} className="section-icon" /> 
                                Location
                            </h2>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label className="form-label">Country</label>
                                    <input type="text" name="country" className="form-input" placeholder="e.g. United States" value={formData.country} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">State/Province</label>
                                    <input type="text" name="state" className="form-input" placeholder="e.g. California" value={formData.state} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">City</label>
                                    <input type="text" name="city" className="form-input" placeholder="e.g. San Francisco" value={formData.city} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Postal / Zip Code</label>
                                    <input type="text" name="pincode" className="form-input" placeholder="e.g. 94105" value={formData.pincode} onChange={handleChange} />
                                </div>
                                <div className="form-group full-width">
                                    <label className="form-label">Full Address</label>
                                    <textarea name="address" className="form-textarea" style={{minHeight: '80px'}} placeholder="Street address..." value={formData.address} onChange={handleChange} />
                                </div>
                            </div>
                        </div>

                        {/* HR / Contact */}
                        <div className="form-section">
                            <h2 className="section-title">
                                <Users size={22} className="section-icon" /> 
                                HR Information
                            </h2>
                            <div className="form-grid">
                                <div className="form-group full-width">
                                    <label className="form-label">HR / Contact Name</label>
                                    <input type="text" name="hrName" className="form-input" placeholder="e.g. Jane Doe" value={formData.hrName} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">HR Email</label>
                                    <input type="email" name="hrEmail" className="form-input" placeholder="hr@company.com" value={formData.hrEmail} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">HR Phone</label>
                                    <input type="tel" name="hrPhone" className="form-input" placeholder="+1 (555) 111-1111" value={formData.hrPhone} onChange={handleChange} />
                                </div>
                            </div>
                        </div>

                        {/* Social */}
                        <div className="form-section">
                            <h2 className="section-title">
                                <Share2 size={22} className="section-icon" /> 
                                Social Links (Optional)
                            </h2>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label className="form-label">LinkedIn</label>
                                    <input type="url" name="linkedin" className="form-input" placeholder="https://linkedin.com/company/..." value={formData.linkedin} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Twitter</label>
                                    <input type="url" name="twitter" className="form-input" placeholder="https://twitter.com/..." value={formData.twitter} onChange={handleChange} />
                                </div>
                            </div>
                        </div>

                        <div className="submit-container">
                            <button type="submit" className="submit-btn" disabled={loading}>
                                <CheckCircle2 size={20} />
                                {loading ? "Creating..." : "Save Company Profile"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default CompanyCreate;