import { Router } from "express";
import {
  createCompany,
  getMyCompany,
  updateMyCompany,
} from "../controller/companyController.js";
import protect from "../middleware/authMiddleware.js";
import authorizeRole from "../middleware/roleMiddleware.js";

const router = Router();

router.post("/create", protect, authorizeRole("company"), createCompany);
router.get("/me", protect, authorizeRole("company"), getMyCompany);
router.put("/me", protect, authorizeRole("company"), updateMyCompany);

export default router;
