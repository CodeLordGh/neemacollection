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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_session_1 = __importDefault(require("express-session"));
const auth_strategy_1 = __importDefault(require("./utils/auth.strategy"));
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
const order_route_1 = __importDefault(require("./routes/order.route"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const product_route_1 = __importDefault(require("./routes/product.route"));
const product_model_1 = require("./Models/product.model");
const cart_route_1 = __importDefault(require("./routes/cart.route"));
const wallet_route_1 = __importDefault(require("./routes/wallet.route"));
const imageUpload_1 = require("./utils/imageUpload");
dotenv.config(); // Load environment variables from .env
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const server = http_1.default.createServer(app); // Ensure server uses express app
const db_connect = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@neema.acaijrr.mongodb.net/?retryWrites=true&w=majority&appName=Neema`;
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type", "Authorization"],
    },
});
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)({
    name: 'jwt',
    secret: process.env.COOKIE_SECRET || 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        path: '/',
    }
}));
app.use(auth_strategy_1.default.initialize());
app.use(auth_strategy_1.default.session());
// Error handling middleware
app.use((err, req, res, next) => {
    if (err) {
        const message = err.message || 'Unauthorized';
        res.status(401).send(message);
    }
    next();
});
app.use("/api", auth_route_1.default);
app.use("/api", product_route_1.default);
app.use("/api", order_route_1.default);
app.use("/api", cart_route_1.default);
app.use("/api", wallet_route_1.default);
app.post("/api/image/upload", imageUpload_1.upload.array("my_files"), imageUpload_1.imageUpload);
io.on("connection", socket => {
    console.log(`connected: ${socket.id}`);
    socket.on("get_all_products", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const products = yield product_model_1.Product.find({});
            if (products.length === 0) {
                socket.emit("get_all_products_response", { message: "No products found" });
            }
            else {
                socket.emit("get_all_products_response", products);
            }
        }
        catch (error) {
            console.log(error);
            socket.emit("get_all_products_response", { message: "Error retrieving products" });
        }
    }));
    socket.on("disconnect", () => console.log("User disconnected", socket.id));
});
mongoose_1.default.connect(db_connect)
    .then(() => console.log("Connected to MongoDB"))
    .then(() => server.listen(port, () => {
    console.log(`Server running on port ${port} http://localhost:${port}`);
}))
    .catch(error => console.error("Error connecting to MongoDB:", error));
exports.default = app;
