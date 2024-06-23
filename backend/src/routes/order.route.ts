import * as orderController from "../Controllers/order.controller";
import { Router } from "express";
import { isAuthenticated } from "../utils/auth.middleware";

const orderRouter = Router();

orderRouter.post("/orders", isAuthenticated,  orderController.createOrder);
orderRouter.get("/orders", isAuthenticated, orderController.getOrders);
orderRouter.put("/orders/:id", isAuthenticated, orderController.updateOrder);
orderRouter.delete("/orders/:id", isAuthenticated, orderController.deleteOrder);
orderRouter.get("/orders/:id", isAuthenticated, orderController.getOderById);

export default orderRouter;