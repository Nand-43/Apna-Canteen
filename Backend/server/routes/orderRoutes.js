import express from "express";
import {getOrders, createOrder, getSingleOrder,  getStudentOrders , updateOrder, updateOrderStatus,deleteOrder} from "../Controllers/orderController.js";
import {authenticateToken, authorizeAdmin} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/all", authenticateToken ,getOrders);
router.get("/myOrders", authenticateToken, getStudentOrders);
router.post("/create", authenticateToken, createOrder);
router.get("/singleOrder/:id", authenticateToken, getSingleOrder);
router.put("/updateOrder/:id", authenticateToken, updateOrder);
router.patch("/updateStatus/:id/status",  authenticateToken,authorizeAdmin, updateOrderStatus)
router.delete("/deleteOrder/:id", authenticateToken, deleteOrder)

export default router;