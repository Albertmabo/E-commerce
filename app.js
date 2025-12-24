import express from "express";
const app = express();

// routes import
import productRoutes from "./src/routes/product.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import vendorRoutes from "./src/routes/vendorShop.routes.js";

// middleware
app.use(express.json());
// routes
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/vendors", vendorRoutes);


export default app;
