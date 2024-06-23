import { Request, Response, Router } from "express";
import { dashboard, login, logout, register } from "../Controllers/auth.controller";
import { isAuthenticated } from "../utils/auth.middleware";
const router = Router();

router.post("/auth/register", register)
router.post('/auth/login', login)
router.get('/auth/logout', logout)
router.get('/auth/profile', isAuthenticated ,dashboard)

export default router