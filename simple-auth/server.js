import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import companyRoutes from "./routes/companyRoutes.js";
import JobRoutes from "./routes/jobRoutes.js";
import ApplicationRoutes from "./routes/applicationRoutes.js";

// Load environment variables
dotenv.config();

const app = express();
app.use(cookieParser());

// Connect to database
connectDB();

app.use(
  cors({
    origin: "https://practice-lake-delta.vercel.app/",
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "server is running!!!!!" });
});

app.use("/api/auth", authRoutes);

app.use("/api/company", companyRoutes);

app.use("/api/jobs", JobRoutes);

app.use("/api/applications", ApplicationRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
