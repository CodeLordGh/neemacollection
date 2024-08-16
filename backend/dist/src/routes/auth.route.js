"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../Controllers/auth.controller");
const auth_middleware_1 = require("../utils/auth.middleware");
const router = (0, express_1.Router)();
router.post("/auth/register", auth_controller_1.register);
router.post('/auth/login', auth_controller_1.login);
router.get('/auth/logout', auth_controller_1.logout);
router.get('/auth/profile', auth_middleware_1.isAuthenticated, auth_controller_1.dashboard);
router.get("/auth", auth_middleware_1.isAuthenticated, (req, res) => {
    if (req.user.isAdmin) {
        res.status(200).json({ isAdmin: true, isAuthenticated: true });
    }
    res.status(200).json({ isAdmin: false, isAuthenticated: true });
});
exports.default = router;
