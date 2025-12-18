import express from "express"
const app = express();

// routes import
import Product from "./src/routes/product.routes.js"

// middleware
app.use(express.json());
// routes
app.use('/api/v1/products',Product );


export default app;