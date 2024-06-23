import { Router } from "express";
import { isAuthenticated } from "../utils/auth.middleware";
import { addToCart, getCart, removeFromCart } from "../Controllers/cart.controller";

const cartRoute = Router()

cartRoute.post("/addtocart", isAuthenticated, addToCart )
cartRoute.get("/getcart", isAuthenticated, getCart)
cartRoute.delete("/removefromcart", isAuthenticated, removeFromCart)


export default cartRoute