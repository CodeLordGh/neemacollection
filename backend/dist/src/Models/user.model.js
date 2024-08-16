"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fakeDB = exports.UserModel = exports.UserSchema = void 0;
// src\Model\user.model.ts
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
// mongoose schema
exports.UserSchema = new mongoose_2.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true,
        match: /^[a-zA-Z\s]*$/
    },
    wallet: { type: Number, default: 0, min: 0 },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    orders: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Order"
        }],
    phone: { type: String },
    deliveryType: { type: String },
    address: { type: String },
}, { timestamps: true });
// save in mongodb database
exports.UserModel = mongoose_1.default.model("User", exports.UserSchema);
