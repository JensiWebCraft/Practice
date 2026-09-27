import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CompanyCreate() {
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

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:5000/api/company/create",
                formData,
                {
                    withCredentials: true,
                }
            );

            console.log(response.data);

            setMessage("Company created successfully");

            navigate("/company/dashboard", {
                replace: true,
            });
        } catch (error) {
            console.log(error);

            setMessage(
                error.response?.data?.message ||
                "Failed to create company"
            );
        }
    };

    return (
        <div>
            <h1>Create Company</h1>

            {message && <p>{message}</p>}

            <form onSubmit={handleSubmit}>

                <h2>Basic Information</h2>

                <input
                    type="text"
                    name="companyName"
                    placeholder="Company Name"
                    value={formData.companyName}
                    onChange={handleChange}
                />

                <input
                    type="email"
                    name="companyEmail"
                    placeholder="Company Email"
                    value={formData.companyEmail}
                    onChange={handleChange}
                />

                <input
                    type="tel"
                    name="companyPhone"
                    placeholder="Company Phone"
                    value={formData.companyPhone}
                    onChange={handleChange}
                />

                <input
                    type="url"
                    name="companyWebsite"
                    placeholder="Company Website"
                    value={formData.companyWebsite}
                    onChange={handleChange}
                />

                <textarea
                    name="companyDescription"
                    placeholder="Company Description"
                    value={formData.companyDescription}
                    onChange={handleChange}
                />

                <h2>Company Details</h2>

                <input
                    type="text"
                    name="industry"
                    placeholder="Industry"
                    value={formData.industry}
                    onChange={handleChange}
                />

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

                <input
                    type="number"
                    name="foundedYear"
                    placeholder="Founded Year"
                    value={formData.foundedYear}
                    onChange={handleChange}
                />

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

                <h2>Location</h2>

                <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={formData.country}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                />

                <textarea
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                />

                <h2>Social Links</h2>

                <input
                    type="url"
                    name="linkedin"
                    placeholder="LinkedIn"
                    value={formData.linkedin}
                    onChange={handleChange}
                />

                <input
                    type="url"
                    name="twitter"
                    placeholder="Twitter"
                    value={formData.twitter}
                    onChange={handleChange}
                />

                <input
                    type="url"
                    name="facebook"
                    placeholder="Facebook"
                    value={formData.facebook}
                    onChange={handleChange}
                />

                <input
                    type="url"
                    name="instagram"
                    placeholder="Instagram"
                    value={formData.instagram}
                    onChange={handleChange}
                />

                <h2>HR Information</h2>

                <input
                    type="text"
                    name="hrName"
                    placeholder="HR Name"
                    value={formData.hrName}
                    onChange={handleChange}
                />

                <input
                    type="email"
                    name="hrEmail"
                    placeholder="HR Email"
                    value={formData.hrEmail}
                    onChange={handleChange}
                />

                <input
                    type="tel"
                    name="hrPhone"
                    placeholder="HR Phone"
                    value={formData.hrPhone}
                    onChange={handleChange}
                />

                <button type="submit">
                    Create Company
                </button>

            </form>
        </div>
    );
}

export default CompanyCreate;