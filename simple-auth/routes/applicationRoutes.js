import { Router } from "express";
import { applyJob, getMyApplications, getCompanyApplications, getApplicationById, updateApplicationStatus } from "../controller/applicationController.js";
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
router.get("/:id", protect, getApplicationById)
router.patch(
    "/:id/status",
    protect,
    authorizeRole("company"),
    updateApplicationStatus
);

export default router