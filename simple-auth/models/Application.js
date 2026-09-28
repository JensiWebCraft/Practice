import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
    {
        job: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
            required: true,
        },

        candidate: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        resume: {
            type: String,
            required: true,
        },

        coverLetter: {
            type: String,
            trim: true,
        },

        status: {
            type: String,
            enum: ["Pending", "Shortlisted", "Rejected"],
            default: "Pending",
        },
    },
    {
        timestamps: true,
    }
);

applicationSchema.index(
    { job: 1, candidate: 1 },
    { unique: true }
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;

