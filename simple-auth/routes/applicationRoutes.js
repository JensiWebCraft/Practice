import { Router } from "express";
<<<<<<< HEAD
import { applyJob, getMyApplications, getCompanyApplications, getApplicationById, updateApplicationStatus } from "../controller/applicationController.js";
=======
import { applyJob, getMyApplications, getCompanyApplications } from "../controller/applicationController.js";
>>>>>>> 72928728f7df4df51b78d019f6c19f45d98f8661
import authorizeRole from "../middleware/roleMiddleware.js";
import protect from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", protect, authorizeRole("jobseeker"), applyJob);
router.get(
    "/my",
    protect,
    authorizeRole("jobseeker"),
    getMyApplications
);
router.get("/company", protect, authorizeRole("company"), getCompanyApplications);
<<<<<<< HEAD
router.get("/:id", protect, getApplicationById)
router.patch(
    "/:id/status",
    protect,
    authorizeRole("company"),
    updateApplicationStatus
);
=======
>>>>>>> 72928728f7df4df51b78d019f6c19f45d98f8661

export default router