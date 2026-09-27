import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    jobType: {
      type: String,
      enum: ["Full Time", "Part Time", "Internship", "Contract"],
      required: true,
    },

    workMode: {
      type: String,
      enum: ["Onsite", "Remote", "Hybrid"],
      required: true,
    },

    experience: {
      type: String,
      required: true,
    },

    salaryMin: {
      type: Number,
    },

    salaryMax: {
      type: Number,
    },

    location: {
      type: String,
      required: true,
    },

    skills: {
      type: [String],
      required: true,
    },

    vacancies: {
      type: Number,
      default: 1,
    },

    applicationDeadline: {
      type: Date,
      required: true,
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
