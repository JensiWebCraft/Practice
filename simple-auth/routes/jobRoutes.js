import { Router } from "express";
import {
  createJob,
  getMyJobs,
  updateJob,
  deleteJob,
  getJobById,
  getAllJobs,
} from "../controller/jobController.js";
import protect from "../middleware/authMiddleware.js";
import authorizeRole from "../middleware/roleMiddleware.js";
const router = Router();

router.post("/create", protect, authorizeRole("company"), createJob);
router.get("/my", protect, authorizeRole("company"), getMyJobs);
router.put("/:id", protect, authorizeRole("company"), updateJob);
router.delete("/:id", protect, authorizeRole("company"), deleteJob);

router.get("/:id", getJobById);
router.get("/", getAllJobs);

export default router;
