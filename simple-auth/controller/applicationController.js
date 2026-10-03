import Application from "../models/Application.js";
import Job from "../models/Job.js";
<<<<<<< HEAD
import Company from "../models/Company.js";
=======
>>>>>>> 72928728f7df4df51b78d019f6c19f45d98f8661

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
<<<<<<< HEAD
};

export const getApplicationById = async (req, res) => {
    try {
        const { id } = req.params;

        const application = await Application.findById(id)
            .populate(
                "job",
                "title description jobType workMode experience location salaryMin salaryMax skills applicationDeadline company"
            )
            .populate(
                "candidate",
                "fullName email phone skills resume"
            );

        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found",
            });
        }

        // Check authorization
        if (req.user.role === "jobseeker") {
            // Job seeker can only see their own application
            if (
                !application.candidate ||
                application.candidate._id.toString() !==
                req.user.userId.toString()
            ) {
                return res.status(403).json({
                    success: false,
                    message: "You are not allowed to view this application",
                });
            }
        }

        if (req.user.role === "company") {
            // Company can only see applications for its own jobs
            const company = await Company.findOne({
                owner: req.user.userId,
            });

            if (!company) {
                return res.status(404).json({
                    success: false,
                    message: "Company profile not found",
                });
            }

            if (
                !application.job ||
                application.job.company.toString() !==
                company._id.toString()
            ) {
                return res.status(403).json({
                    success: false,
                    message: "You are not allowed to view this application",
                });
            }
        }

        res.status(200).json({
            success: true,
            application,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateApplicationStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const allowedStatuses = [
            "Pending",
            "Shortlisted",
            "Rejected",
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid application status",
            });
        }

        const application = await Application.findById(id);

        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found",
            });
        }

        const company = await Company.findOne({
            owner: req.user.userId,
        });

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company profile not found",
            });
        }

        const job = await Job.findById(application.job);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }

        if (job.company.toString() !== company._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to update this application",
            });
        }

        application.status = status;

        await application.save();

        res.status(200).json({
            success: true,
            message: `Application ${status.toLowerCase()} successfully`,
            application,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
=======
>>>>>>> 72928728f7df4df51b78d019f6c19f45d98f8661
};