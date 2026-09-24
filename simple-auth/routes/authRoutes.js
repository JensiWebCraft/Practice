import { Router } from "express";
const router = Router();
import {
  signup,
  login,
  getprofile,
  logout,
  forgotPassword,
  resetPassword,
} from "../controller/authController.js";
import { protect } from "../middleware/authMiddleware.js";

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", protect, getprofile);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
