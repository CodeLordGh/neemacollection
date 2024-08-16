"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.isAuthenticated = void 0;
const auth_strategy_1 = __importDefault(require("../utils/auth.strategy"));
const isAuthenticated = (req, res, next) => {
    auth_strategy_1.default.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(401).json({ message: info.message });
        }
        req.user = user;
        next();
    })(req, res, next);
};
exports.isAuthenticated = isAuthenticated;
const isAdmin = (req, res, next) => {
    req.user.isAdmin ? next() : res.json({ message: `You are not allowed to perform this action` });
};
exports.isAdmin = isAdmin;
