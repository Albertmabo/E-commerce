import express from "express";
const app = express();

// routes import
import productRoutes from "./src/routes/product.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import vendorRoutes from "./src/routes/vendorShop.routes.js";
import CustomError from "./src/utils/CustomError.js"
import routeNotFound from "./src/middlewares/routeNotFound.middleware.js"
import globalErrorHandler from "./src/middlewares/globalErrorHandler.middleware.js"

// middleware
app.use(express.json());
// routes
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/vendors", vendorRoutes);

app.use("/test", (req,res,next)=>{
    throw new CustomError(`Testing cusotmerror and global error`, 400)
})

// rotue not found 
app.use(routeNotFound)
// Global error handler 
app.use(globalErrorHandler)
export default app;
