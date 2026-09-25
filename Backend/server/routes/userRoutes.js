import express from "express";
import { AdminInfo , StudentInfo} from "../Controllers/userController.js";
import { authenticateToken , authorizeAdmin} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/admin/:id", authenticateToken,authorizeAdmin, AdminInfo);
router.get("/student/:id", authenticateToken, StudentInfo);

export default router;