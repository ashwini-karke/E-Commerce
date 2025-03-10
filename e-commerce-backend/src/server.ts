import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db"; // Import MongoDB connection
import userRoutes from "./routes/userRoutes"; // Import user routes
import productRoutes from "./routes/productRoutes";
import { setupSwagger } from "../swagger"; // Import Swagger setup
import cartRoutes from "./routes/cartRoutes";
import orderRoutes from "./routes/orderRoutes";

dotenv.config();
connectDB(); // Connect to MongoDB

const app = express();
app.use(express.json());

// Enable CORS for all routes
app.use(cors()); // You can configure it to restrict specific domains if needed

app.use(express.json());

// Setup API Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// Setup Swagger
setupSwagger(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
