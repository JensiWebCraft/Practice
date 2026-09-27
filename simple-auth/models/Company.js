import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
    {
        // Which user owns this company
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        // Basic Information
        companyName: {
            type: String,
            required: true,
            trim: true,
        },

        companyEmail: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },

        companyPhone: {
            type: String,
            trim: true,
        },

        companyWebsite: {
            type: String,
            trim: true,
        },

        companyLogo: {
            type: String,
        },

        companyDescription: {
            type: String,
            required: true,
        },

        // Company Details
        industry: {
            type: String,
            required: true,
        },

        companySize: {
            type: String,
            enum: [
                "1-10",
                "11-50",
                "51-200",
                "201-500",
                "501-1000",
                "1001-5000",
                "5000+",
            ],
            required: true,
        },

        foundedYear: {
            type: Number,
        },

        companyType: {
            type: String,
            enum: [
                "Startup",
                "Private",
                "Public",
                "Government",
                "Non-Profit",
            ],
            required: true,
        },

        // Location
        country: {
            type: String,
            required: true,
        },

        state: {
            type: String,
            required: true,
        },

        city: {
            type: String,
            required: true,
        },

        address: {
            type: String,
        },

        pincode: {
            type: String,
        },

        // Social Links
        socialLinks: {
            linkedin: String,
            twitter: String,
            facebook: String,
            instagram: String,
        },

        // HR Information
        hrName: {
            type: String,
        },

        hrEmail: {
            type: String,
        },

        hrPhone: {
            type: String,
        },

        isVerified: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Company = mongoose.model("Company", companySchema);
export default Company;