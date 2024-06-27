import { Request, Response, Router } from "express";
import { dashboard, login, logout, register } from "../Controllers/auth.controller";
import { isAdmin, isAuthenticated } from "../utils/auth.middleware";
const router = Router();

router.post("/auth/register", register)
router.post('/auth/login', login)
router.get('/auth/logout', logout)
router.get('/auth/profile', isAuthenticated ,dashboard)
router.get("/auth", isAuthenticated, (req: any, res: Response) => {

    if(req.user.isAdmin){
        res.status(200).json({isAdmin: true, isAuthenticated: true})
    }

    res.status(200).json({isAdmin: false, isAuthenticated: true})
})

export default router