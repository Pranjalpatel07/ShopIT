import express from "express";
import cors from "cors"
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoute.js";
import productRouter from "./routes/productRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";
import analyticsRouter from "./routes/analyticsRoutes.js";
dotenv.config();
connectDB();

const app = express();

app.use(cors({
    origin:  "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("ShopIt API is running");
})

// AUTHENTICATION Route
app.use("/api/auth",authRouter);

// PRODUCTS Route
app.use("/api/products", productRouter);

// ORDERS Route
app.use("/api/orders", orderRouter);

// PAYMENT Route
app.use("/api/payment", paymentRouter);

// ANALYTICS Route
app.use("/api/analytics", analyticsRouter);






app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})