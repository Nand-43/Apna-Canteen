import express from "express";
import {createMenu, getMenu, getSingleMenu, updateMenu, deleteMenu, toggleButton } from "../Controllers/menuController.js";
import  {authenticateToken, authorizeAdmin} from "../middleware/authMiddleware.js"
import multer from "multer";
import {fileURLToPath} from "url";
import path from "path";

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(_dirname, "../../uploads/menu/"));
    },  

    filename: (req, file, cb) => {
        const uniqueName = 
        Date.now() + "-" +file.originalname;

        cb(null, uniqueName);
    }
})

const  menuUpload = multer({
    storage: storage
})

const router = express.Router();
router.post(
    "/testUpload",
    menuUpload.single("image"),
    (req, res) => {

        console.log("FILE:", req.file);
        console.log("BODY:", req.body);

        if (!req.file) {
            return res.status(400).json({
                error: "No file received"
            });
        }

        res.json({
            message: "Image uploaded successfully",
            file: req.file
        });
    }
);
router.post("/createMenu", menuUpload.single("image"), authenticateToken,  createMenu);
router.get("/accessMenu", authenticateToken, getMenu);
router.get("/singleMenu/:id", authenticateToken, getSingleMenu);
router.put("/updateMenu/:id",menuUpload.single("image"), authenticateToken, authorizeAdmin, updateMenu);
router.delete("/deleteMenu/:id", authenticateToken, authorizeAdmin, deleteMenu);
router.put("/toggleButton/:id", authenticateToken, authorizeAdmin, toggleButton);
export default router; 