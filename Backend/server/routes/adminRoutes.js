import express from "express";
import {getAdminDashboard} from "../Controllers/adminController.js";
import { authenticateToken, authorizeAdmin} from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/dashboard", authenticateToken, authorizeAdmin, getAdminDashboard)

export default router