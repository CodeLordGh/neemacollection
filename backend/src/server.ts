import express, { Application } from "express";
import mongoose from "mongoose";
import session from 'express-session';
import passport from "./utils/auth.strategy";
import cors from "cors";
import * as dotenv from "dotenv";
import orderRouter from "./routes/order.route";
import http from "http";
import { Server } from "socket.io";
import router from "./routes/auth.route";
import cookieParser from "cookie-parser";
import productRoute from "./routes/product.route";
import { Product } from "./Models/product.model";
import cartRoute from "./routes/cart.route";
import walletRouter from "./routes/wallet.route";
import { imageUpload, upload } from "./utils/imageUpload";
import { isAdmin, isAuthenticated } from "./utils/auth.middleware";

dotenv.config(); // Load environment variables from .env

const app: Application = express();
const port = process.env.PORT || 3000;

const server = http.createServer(app); // Ensure server uses express app

const db_connect = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@neema.acaijrr.mongodb.net/?retryWrites=true&w=majority&appName=Neema`;

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],},
});

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
  name: 'jwt',
  secret: process.env.COOKIE_SECRET as string || 'secret',
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

app.use(passport.initialize());
app.use(passport.session());

// Error handling middleware
app.use((err: any, req: any, res: any, next: any) => {
  if (err) {
    const message = err.message || 'Unauthorized';
    res.status(401).send(message);
  }
  next();
});

app.use("/api", router);
app.use("/api", productRoute);
app.use("/api", orderRouter);
app.use("/api", cartRoute);
app.use("/api", walletRouter);
app.post("/api/image/upload", upload.array("my_files"), imageUpload);

io.on("connection", socket => {
  console.log(`connected: ${socket.id}`);
  socket.on("get_all_products", async () => {
    try {
      const products = await Product.find({});
      if (products.length === 0) {
        socket.emit("get_all_products_response", { message: "No products found" });
      } else {
        socket.emit("get_all_products_response", products);
      }
    } catch (error) {
      console.log(error);
      socket.emit("get_all_products_response", { message: "Error retrieving products" });
    }
  });

  socket.on("disconnect", () => console.log("User disconnected", socket.id));
});

mongoose.connect(db_connect)
  .then(() => console.log("Connected to MongoDB"))
  .then(() => server.listen(port, () => {
    console.log(`Server running on port ${port} http://localhost:${port}`);
  }))
  .catch(error => console.error("Error connecting to MongoDB:", error));

export default app;