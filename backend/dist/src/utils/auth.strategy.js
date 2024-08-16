"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_jwt_1 = require("passport-jwt");
const passport_local_1 = require("passport-local");
const passport_1 = __importDefault(require("passport"));
const bcrypt = __importStar(require("bcrypt"));
const user_model_1 = require("../Models/user.model");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
// passport local strategy
passport_1.default.use(new passport_local_1.Strategy({ usernameField: "email" }, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.UserModel.findOne({ email });
        if (!user) {
            return done(null, false, { message: "Incorrect email." });
        }
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
    }
    catch (error) {
        console.error(error);
        return done(error);
    }
})));
const opts = {
    secretOrKey: process.env.JWT_SECRET || '',
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([
        passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
        (req) => {
            const { jwt } = req.session;
            // console.log(req.session)
            return jwt;
        },
    ]),
};
// passport JwtStrategy
passport_1.default.use(new passport_jwt_1.Strategy(opts, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.UserModel.findById(payload.sub);
        if (!user) {
            return done(null, false, { message: "User not found." });
        }
        return done(null, user);
    }
    catch (error) {
        console.error(error);
        return done(error);
    }
})));
//serialize user
passport_1.default.serializeUser((user, done) => {
    done(null, user._id);
});
//deserialize user
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.UserModel.findById(id);
        if (!user) {
            return done(null, false);
        }
        done(null, user);
    }
    catch (error) {
        console.error(error);
        done(error);
    }
}));
exports.default = passport_1.default;
