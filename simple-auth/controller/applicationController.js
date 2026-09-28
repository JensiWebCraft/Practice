import Application from "../models/Application.js";
import Job from "../models/Job.js";

export const applyJob = async (req, res) => {
    try {
        const { jobId, resume, coverLetter } = req.body;


        if (!jobId) {
            return res.status(400).json({
                success: false,
                message: "Job ID is required",
            });
        }


        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }


        if (new Date(job.applicationDeadline) < new Date()) {
            return res.status(400).json({
                success: false,
                message: "Application deadline has passed",
            });
        }

        const existingApplication = await Application.findOne({
            job: jobId,
            candidate: req.user.userId,
        });

        if (existingApplication) {
            return res.status(400).json({
                success: false,
                message: "You have already applied for this job",
            });
        }

        const application = await Application.create({
            job: jobId,
            candidate: req.user.userId,
            resume,
            coverLetter,
        });

        res.status(201).json({
            success: true,
            message: "Job application submitted successfully",
            application,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getMyApplications = async (req, res) => {
    try {
        const applications = await Application.find({
            candidate: req.user.userId,
        })
            .populate(
                "job",
                "title jobType workMode location salaryMin salaryMax applicationDeadline"
            )
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: applications.length,
            applications,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getCompanyApplications = async (req, res) => {
    try {
        const company = await Company.findOne({
            owner: req.user.userId,
        });

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company profile not found",
            });
        }

        const jobs = await Job.find({
            company: company._id,
        }).select("_id");

        const jobIds = jobs.map((job) => job._id);

        const applications = await Application.find({
            job: { $in: jobIds },
        })
            .populate(
                "job",
                "title jobType workMode location"
            )
            .populate(
                "candidate",
                "fullName email phone skills resume"
            )
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: applications.length,
            applications,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};