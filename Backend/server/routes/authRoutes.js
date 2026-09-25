import express from "express";
import {registerStudent, loginUsers, refreshToken, getAllStudent, getAllCanteenStaff} from "../Controllers/authController.js";
import {authenticateToken, authorizeAdmin} from "../middleware/authMiddleware.js";
import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" +file.originalname);
    }
})

const upload = multer({storage});


const router = express.Router();

router.post("/register", upload.single("photo"),registerStudent);
router.post("/login", loginUsers);
router.post("/refreshToken", refreshToken);
router.get("/studentData", authenticateToken, authorizeAdmin, getAllStudent);
router.get("/staffData", authenticateToken, authorizeAdmin, getAllCanteenStaff);

export default router;