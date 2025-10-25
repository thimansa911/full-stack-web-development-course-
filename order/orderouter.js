import express from "express";
import { createOrder, getOrders } from "./ordercontroller.js";
import { AdminUpdateOrderStatus } from "./ordercontroller.js";

const orderRouter = express.Router();

orderRouter.post("/", createOrder);
orderRouter.get("/", getOrders);
orderRouter.patch("/:orderId", AdminUpdateOrderStatus);

export default orderRouter;
