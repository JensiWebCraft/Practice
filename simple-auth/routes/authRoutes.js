import { Router } from "express";
const router = Router();
import {
  signup,
  login,
  getprofile,
  logout,
} from "../controller/authController.js";
import { protect } from "../middleware/authMiddleware.js";

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", protect, getprofile);
router.post("/logout", logout);

export default router;
