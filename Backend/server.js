import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import path from "path";
import authRoutes from "./server/routes/authRoutes.js";
import orderRoutes from "./server/routes/orderRoutes.js";
import menuRoutes from "./server/routes/menuRoutes.js";
import adminRoutes from "./server/routes/adminRoutes.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/authRoutes", authRoutes);
app.use("/orderRoutes", orderRoutes);
app.use(
    "/uploads/menu",
    express.static(path.join(process.cwd(), "uploads/menu"))
);
app.use("/menuRoutes", menuRoutes);
app.use("/adminRoutes", adminRoutes);

const PORT = process.env.Port || 5000

app.listen(PORT, () => {
    console.log(`server is running http://localhost:${PORT}`);
})