"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtSign = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtSign = (user) => {
    const payload = {
        sub: user._id,
        username: user.username,
        isAdmin: user.isAdmin
    };
    const secret = process.env.JWT_SECRET;
    return jsonwebtoken_1.default.sign(payload, secret, { expiresIn: '1h' });
};
exports.jwtSign = jwtSign;
