import express from "express"
const app = express();

// routes import
import Product from "./src/routes/product.routes.js"
import User from "./src/routes/user.routes.js"
import Vendor from "./src/routes/vendor.routes.js"

// middleware
app.use(express.json());
// routes
app.use('/api/v1/products',Product );
app.use('/api/v1/users', User)
app.use('/api/v1/vendors', Vendor)


export default app;