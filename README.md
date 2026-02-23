# E-Commerce Backend API

RESTful API for an e-commerce platform built with Node.js, Express, and MongoDB (Atlas). Features secure authentication, role-based access control, and  product and order management.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [API Endpoints](#api-documentation)
- [Project Structure](#project-structure)
- [Security Features](#security-features)
- [Database Schema](#database-schema)
- [Scripts](#scripts)
- [Screenshots](#screenshots)

---

## Features

### Core Functionality

- **User Authentication** - JWT-based secure authentication with refresh tokens
- **Role-Based Access Control (RBAC)** - Admin, User and Vendor roles with different permissions
- **Product Management** - Complete CRUD operations for products
- **Shopping Cart** - Add, update, remove items calculation
- **Order Management** - Create orders with real-time price calculation (discounts)
- **User Profiles** - Manage user information and addresses

### Advanced Features

- **Password Security** - Bcrypt hashing
- **Input Validation** - Joi schema validation on all endpoints
- **Rate Limiting** - Prevent brute force and DDoS attacks
- **HTTP Security Headers** - Helmet.js integration
- **Centralized Error Handling** - Environment-specific error responses
- **Cookie-based Auth** - Secure HttpOnly cookies for tokens

---

## Tech Stack

**Backend:**

- [Node.js](https://nodejs.org/) - Runtime environment
- [Express.js](https://expressjs.com/) - Web framework
- [MongoDB](https://www.mongodb.com/) - NoSQL database
- [Mongoose](https://mongoosejs.com/) - MongoDB ODM

**Authentication & Security:**

- [JSON Web Tokens (JWT)](https://jwt.io/) - Secure authentication
- [bcrypt](https://www.npmjs.com/package/bcrypt) - Password hashing
- [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) - Rate limiting
- [Helmet.js](https://helmetjs.github.io/) - HTTP security headers
- [Joi](https://joi.dev/) - Input validation

**Development Tools:**

- [Nodemon](https://nodemon.io/) - Auto-restart during development
- [dotenv](https://www.npmjs.com/package/dotenv) - Environment configuration

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository**

```bash
https://github.com/Albertmabo/E-commerce.git
cd E-commerce
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

```bash
# Create .env files
touch .env.development
touch .env.production
```

4. **Configure your environment variables** (see [Environment Variables](#environment-variables))

5. **Configure MongoDB Atlas**

- Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a new cluster (free tier available)
- Create a database user with username and password
- Whitelist your IP address (or use `0.0.0.0/0` for development)
- Get your connection string and add it to `.env.development`:

```bash
# MongoDB Atlas Connection String
URL=mongodb+srv://username:password@cluster0.abc123.mongodb.net/ecommerce?retryWrites=true&w=majority
```

**Replace:**

- `username` - Your MongoDB Atlas username
- `password` - Your MongoDB Atlas password
- `cluster0.abc123` - Your actual cluster name
- `ecommerce` - Your database name

**Example:**

```bash
URL=mongodb+srv://john:MySecurePass123@cluster0.mongodb.net/mystore?retryWrites=true&w=majority
```

6. **Run the application**

```bash
# Development mode
npm run dev

# Production mode
npm run prod
```

The server will start on `http://localhost:3000` (or your configured PORT)

---

## Environment Variables

Create `.env.development` and `.env.production` files in the root directory:

```env
# Server Configuration
NODE_ENV=development
PORT=3000

# Database Configuration
URL=mongodb+srv://username:password@cluster0.abc123.mongodb.net/ecommerce?retryWrites=true&w=majority

# JWT Configuration
SECRET_STRING=your_secret_key_here_replace_this
LOGIN_EXPIRES=7d
```

Create similar setup for `.env.production`

---

## API Documentation

### Base URL

```
Development: http://localhost:3000/api/v1

```

## API Endpoints

### Authentication

- `POST /api/v1/users/signup` - Register new user
- `POST /api/v1/users/login` - Login user

### Products

- `GET /api/v1/products` - Get all products
- `GET /api/v1/products/:id` - Get single product
- `POST /api/v1/products` - Create product (Vendor)
- `PATCH /api/v1/products/:id` - Update product (Vendor)
- `DELETE /api/v1/products/:id` - Delete product (Vendot & Admin)

#### Vendors

- `GET /api/v1/vendors` – Retrieve all vendors
- `GET /api/v1/vendors/:id` – Retrieve a single vendor
- `POST /api/v1/vendors` – Create a new vendor
- `PATCH /api/v1/vendors/:id` – Update a vendor
- `DELETE /api/v1/vendors/:id` – Delete a vendor

### Cart

- `GET /api/v1/cart` - Get user cart (User)
- `POST /api/v1/cart` - Add to cart (User)
- `DELETE /api/v1/cart/` - Delete Cart(User)
<!-- - `PATCH /api/v1/cart/:itemId` - Update cart item -->

### Orders

- `GET /api/v1/order` - Get user orders(User)
- `POST /api/v1/order` - Create order (User)
<!-- - `GET /api/v1/orders/:id` - Get order details -->

## <!-- - `PATCH /api/v1/orders/:id/status` - Update order status (Admin) -->

### Authentication Endpoints

#### Register User

```http
POST /api/v1/users/signup
Content-Type: application/json

{
    "firstName": "John",
    "middleName": "Blank",
    "lastName": "Doe",
    "email": "jdb@gmail.com",
    "phoneNo": "+97798726374589",
    "role": "user",
    "address": "789 Pokhara Road, Nepal",
    "dateOfBirth": "1992-11-10",
    "password": "ZA3)-]i441Un",
    "confirmPassword": "ZA3)-]i441Un"
}

Response: 201 Created
{
    "success": true,
    "message": "User created successfully",
    "data": {
        "user": {
            "firstName": "John",
            "middleName": "Blank",
            "lastName": "Doe",
            "email": "jdb@gmail.com",
            "phoneNo": "+97798726374589",
            "role": "user",
            "address": "789 Pokhara Road, Nepal",
            "dateOfBirth": "1992-11-10T00:00:00.000Z",
            "_id": "*************",
            "createdAt": "2026-02-20T11:05:10.109Z",
            "updatedAt": "2026-02-20T11:05:10.109Z",
            "__v": 0
        }
    }
}

```

#### Token

JWT is issued on signup/login and stored in an HttpOnly cookie.
The cookie is automatically sent with subsequent requests.

#### Cookie (Postman view)

```http
Cookies:
jwt=<JWT_TOKEN>
```

#### Cookie Attributes

```http
Attribute	Value
Name	        jwt
Value           <JWT_TOKEN>
Domain	        127.0.0.1
Path	        /
Expires	        Fri, 20 Feb 2026 11:35:10 GMT
HttpOnly	true
Secure	        false

```

---

#### Login

```http
POST /api/v1/users/login
Content-Type: application/json


{
    "email": "jdb@gmail.com",
    "password": "ZA3)-]i441Un"
}

Response: 200 OK
{
    "success": true,
    "message": "User logged in successfully",
    "data": {
        "user": {
            "_id": "*************",
            "firstName": "John",
            "middleName": "Blank",
            "lastName": "Doe",
            "email": "jdb@gmail.com",
            "phoneNo": "+97798726374589",
            "role": "user",
            "address": "789 Pokhara Road, Nepal",
            "dateOfBirth": "1992-11-10T00:00:00.000Z",
            "createdAt": "2026-02-20T11:05:10.109Z",
            "updatedAt": "2026-02-20T11:05:10.109Z",
            "__v": 0
        }
    }
}
```

#### Cookie (Postman view)

```http
Cookies:
jwt=<JWT_TOKEN>
```

#### Cookie Attributes

```http
Attribute	Value
Name	        jwt
Value           <JWT_TOKEN>
Domain	        127.0.0.1
Path	        /
Expires	        Fri, 20 Feb 2026 11:35:10 GMT
HttpOnly	true
Secure	        false

```

---

### Product Endpoints

#### Get All Products

```http
GET /api/v1/products

Response: 200 OK
{
  "success": true,
  "message": "Product retrived successfully",
  "data": [...],
  "meta": {
        "total": 10
    }

}
```

#### Get Single Product

```http
GET /api/v1/products/:id

Response: 200 OK
{
    "success": true,
    "message": "Product retrived successfully",
    "data": {
        "ram": {
            "size": 32,
            "speed": 5600,
            "ramType": "DDR5"
        },
        "storage": {
            "storageType": "SSD",
            "storageSize": 1024
        },
        "display": {
            "displayType": "IPS",
            "displaySize": 16,
            "displayResolution": "2560x1440"
        },
        "graphicCard": {
            "graphicCardBrand": "NVDIA",
            "graphicVram": 8,
            "tgp": 140,
            "series": "RTX 40 Series"
        },
        "battery": {
            "capacity": 90
        },
        "_id": "**************",
        "name": "ASUS ROG Strix G16",
        "price": 2200,
        "rating": "4.7",
        "os": "Windows",
        "brand": "ASUS",
        "type": "High End",
        "category": "Gaming",
        "inStock": true,
        "processor": "Intel Core i9 13980HX",
        "weight": 2.5,
        "warranty": 2,
        "featured": true,
        "createdBy": "************",
        "discount": 10,
        "createdAt": "2026-02-16T06:31:48.255Z",
        "updatedAt": "2026-02-16T06:31:48.255Z",
        "__v": 0
    }
}
```

#### Create Product (Vendor Only)

```http
POST /api/v1/products
Authorization: Bearer <vedndor_token>
Content-Type: application/json

{
    "success": true,
    "message": "Product created successfully",
    "data": {
        "name": "Microsoft Surface Laptop 4",
        "price": 1200,
        "rating": "4.3",
        "os": "Windows",
        "brand": "Microsoft",
        "type": "Mid Range",
        "category": "Business",
        "inStock": true,
        "processor": "Intel Core i5-1240P",
        "ram": {
            "size": 16,
            "speed": 3200,
            "ramType": "DDR4"
        },
        "storage": {
            "storageType": "SSD",
            "storageSize": 512
        },
        "display": {
            "displayType": "LED",
            "displaySize": 13.5,
            "displayResolution": "2560x1440"
        },
        "graphicCard": {
            "graphicCardBrand": "Intel",
            "graphicVram": 2,
            "tgp": 35,
            "series": "Intel Iris Xe"
        },
        "battery": {
            "capacity": 50
        },
        "weight": 1.3,
        "warranty": 1,
        "featured": false,
        "createdBy": "****************",
        "productImage": "surface_laptop5.jpg",
        "discount": 0,
        "_id": "*****************",
        "createdAt": "2026-02-21T04:30:07.435Z",
        "updatedAt": "2026-02-21T04:30:07.435Z",
        "__v": 0
    }
}

Response: 201 Created
```

#### Update Product (Vednor Only)

```http
PATCH /api/v1/products/:id
Authorization: Bearer <vedndor_token>

Response: 200 OK
{
    "success": true,
    "message": "Product updated successfully",
    "data": {
        "ram": {
            "size": 16,
            "speed": 3200,
            "ramType": "DDR4"
        },
        "storage": {
            "storageType": "SSD",
            "storageSize": 512
        },
        "display": {
            "displayType": "LED",
            "displaySize": 13.5,
            "displayResolution": "2560x1440"
        },
        "graphicCard": {
            "graphicCardBrand": "Intel",
            "graphicVram": 2,
            "tgp": 35,
            "series": "Intel Iris Xe"
        },
        "battery": {
            "capacity": 50
        },
        "_id": "*******************",
        "name": "Microsoft Surface Laptop 4",
        "price": 1300,
        "rating": "4.3",
        "os": "Windows",
        "brand": "Microsoft",
        "type": "Mid Range",
        "category": "Business",
        "inStock": true,
        "processor": "Intel Core i5-1240P",
        "weight": 1.3,
        "warranty": 1,
        "featured": false,
        "createdBy": "*****************",
        "productImage": "surface_laptop5.jpg",
        "discount": 0,
        "createdAt": "2026-02-21T04:30:07.435Z",
        "updatedAt": "2026-02-21T04:34:26.702Z",
        "__v": 0
    }
}
```

#### Delete Product (Admin OR Vedor)

```http
DELETE /api/v1/products/:id
Authorization: Bearer <admin_token / vendor_token>

Response: 200Ok

{
    "success": true,
    "message": "Product deleted successfully",
    "data": null
}

```

---
### Vednor Endpoints

#### Create vendor Shop (Vednor)
```http
POST /api/v1/vednor
Authorization: Bearer <token>

{
    "shopName": "Tech Haven",
    "address": "123 Silicon Street, Kathmandu, Nepal",
    "ratings": "4.5",
    "shopRegistrationNumber": "REG-2025-001",
    "isVerified": true
}

Response: 201 Created
{
{
    "success": true,
    "message": "Vendor Shop created successfully",
    "data": {
        "user": "*******************",
        "shopName": "Tech Haven",
        "address": "123 Silicon Street, Kathmandu, Nepal",
        "ratings": "4.5",
        "shopRegistrationNumber": "REG-2025-001",
        "isVerified": true,
        "_id": "****************",
        "createdAt": "2026-02-23T18:32:45.872Z",
        "updatedAt": "2026-02-23T18:32:45.872Z",
        "__v": 0
    }
}
```

#### GET vendor Shop (Vedndor)
```http
GET /api/v1/vednor
Authorization: Bearer <token>

{
    "shopName": "Tech Haven",
    "address": "123 Silicon Street, Kathmandu, Nepal",
    "ratings": "4.5",
    "shopRegistrationNumber": "REG-2025-001",
    "isVerified": true
}

Response: 201 Created
{
    "success": true,
    "message": "Vendor Shop retrived successfully",
    "data": {
        "_id": ""*********************",",
        "user": {
            "_id": "*********************",
            "firstName": "alx",
            "middleName": "Kumar",
            "lastName": "Thapa",
            "email": "ake@gamdil.com",
            "phoneNo": "+9779823456789",
            "role": "vendor",
            "address": "789 Pokhara Road, Nepal",
            "dateOfBirth": "1992-11-10T00:00:00.000Z",
            "createdAt": "2026-02-23T18:02:16.192Z",
            "updatedAt": "2026-02-23T18:02:16.192Z",
            "__v": 0
        },
        "shopName": "Tech Haven",
        "address": "123 Silicon Street, Kathmandu, Nepal",
        "ratings": "4.5",
        "shopRegistrationNumber": "REG-2025-001",
        "isVerified": true,
        "createdAt": "2026-02-23T18:16:31.115Z",
        "updatedAt": "2026-02-23T18:16:31.115Z",
        "__v": 0
    }
}
```

### Update vendor Shop (Vedndor)
```http
PATCH /api/v1/vednor
Authorization: Bearer <token>

{
    "shopName": "Tech Haven",
    "address": "123 Silicoaaaaaa Street, Kathmandu, Nepal",
    "ratings": "4.5",
    "shopRegistrationNumber": "REG-2025-001",
    "isVerified": true
}

Response: 200 OK
{
    "success": true,
    "message": "Vendor Shop Updated successfully",
    "data": {
        "_id": "699c9d4d494283bccb89a87a",
        "user": "699c96283fe1291ad2dbd26c",
        "shopName": "Tech Haven",
        "address": "123 Silicoaaaaaa Street, Kathmandu, Nepal",
        "ratings": "4.5",
        "shopRegistrationNumber": "REG-2025-001",
        "isVerified": true,
        "createdAt": "2026-02-23T18:32:45.872Z",
        "updatedAt": "2026-02-23T18:41:00.112Z",
        "__v": 0
    }
}
```
### Delete vendor Shop (Vedndor & admin)
```http
DELETE /api/v1/vednor
Authorization: Bearer <token>

Response: 200 OK
{
    "success": true,
    "message": "Vendor Shop Deleted successfully",
    "data": null
}


```
---
### Cart Endpoints

#### Get User Cart (User)

```http
GET /api/v1/cart
Authorization: Bearer <token>

Response: 200 OK
{
    "message": "Cart retrieved successfully",
    "data": {
        "cartItems": [
            {
                "productId": "699934cf6372ecdb3982f05a",
                "quantity": 2,
                "_id": "699936af6372ecdb3982f06d"
            },
            {
                "productId": "69724d4f999b1191d0aee893",
                "quantity": 2,
                "_id": "699936af6372ecdb3982f06e"
            }
        ]
    },
    "meta": {
        "noOfItems": 2
    }
}
```

#### Add to Cart (User)

```http
POST /api/v1/cart
Authorization: Bearer <token>
Content-Type: application/json

{
    "success": true,
    "data": {
        "cart": {
            "user": "69983fe64727eeab5d0fe024",
            "items": [
                {
                    "productId": "699934cf6372ecdb3982f05a",
                    "quantity": 2,
                    "_id": "699936af6372ecdb3982f06d"
                },
                {
                    "productId": "69724d4f999b1191d0aee893",
                    "quantity": 2,
                    "_id": "699936af6372ecdb3982f06e"
                }
            ],
            "_id": "699936af6372ecdb3982f06c",
            "__v": 0
        }
    }
}
Response: 200 OK
```

#### Update Cart Item

```http
PATCH /api/v1/cart
Authorization: Bearer <token>

Response: 200 OK
{
    "success": true,
    "data": {
        "cart": {
            "_id": "699936af6372ecdb3982f06c",
            "user": "69983fe64727eeab5d0fe024",
            "items": [
                {
                    "productId": "699934cf6372ecdb3982f05a",
                    "quantity": 22,
                    "_id": "6999373f6372ecdb3982f07b"
                },
                {
                    "productId": "69724d4f999b1191d0aee893",
                    "quantity": 13,
                    "_id": "6999373f6372ecdb3982f07c"
                }
            ],
            "__v": 0
        }
    }
}

```

#### Remove from Cart

```http
DELETE /api/v1/cart/:itemId
Authorization: Bearer <token>

Response: 200 OK
{
    "success": true,
    "data": {
        "cart": {
            "_id": "699936af6372ecdb3982f06c",
            "user": "69983fe64727eeab5d0fe024",
            "items": [
                {
                    "productId": "699934cf6372ecdb3982f05a",
                    "quantity": 22,
                    "_id": "699937626372ecdb3982f086"
                }
            ],
            "__v": 0
        }
    }
}
```

---

### Order Endpoints

#### Create Order

```http
POST /api/v1/orders
Authorization: Bearer <token>
Content-Type: application/json

Response: 201 Created
{
    "message": "order places successfully",
    "order": {
        "user": {
            "_id": "69983fe64727eeab5d0fe024",
            "firstName": "John",
            "middleName": "Blank",
            "lastName": "Doe",
            "email": "jdb@gmail.com",
            "phoneNo": "+97798726374589",
            "address": "789 Pokhara Road, Nepal"
        },
        "items": [
            {
                "productId": "69724daa999b1191d0aee8a8",
                "quantity": 45,
                "_id": "699c0b3efe6964cfc3ead1b4"
            },
            {
                "productId": "6992b9d48c19b51df0c4d583",
                "quantity": 3333,
                "_id": "699c0b3efe6964cfc3ead1b5"
            },
            {
                "productId": "699934cf6372ecdb3982f05a",
                "quantity": 566,
                "_id": "699c0b3efe6964cfc3ead1b6"
            }
        ],
        "total": 21735140,
        "payment": {
            "paymentType": "COD",
            "prePaid": false
        },
        "orderStatus": "Processing",
        "_id": "699c783159431a6f4e47897a",
        "__v": 0
    }
}
```

#### Get User Orders

```http
GET /api/v1/orders
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "data": [...]
}
```

<!--
#### Get Order by ID
```http
GET /api/v1/orders/:id
Authorization: Bearer <token>

Response: 200 OK
``` -->

<!-- #### Update Order Status (Admin Only)
```http
PATCH /api/v1/orders/:id/status
Authorization: Bearer <admin_token>

{
  "status": "shipped"
}

Response: 200 OK
```

--- -->

---

## Project Structure

```
ecommerce-backend/
├── src/
│   ├── db/
│   │   └── connect.js                 # Database connection
│   ├── controllers/
│   │   ├── auth.controller.js    # Authentication logic
│   │   ├── product.controller.js # Product CRUD
│   │   ├── cart.controller.js    # Cart management
│   │   ├── order.controller.js   # Order processing
│   │   └── vendorShop.controller.js    # Vednor shop operation

│   ├── middleware/
│   │   ├── protect.middleware.js        # JWT verification / route protection
│   │   ├── rbac.middleware.js           # Role-based access control
│   │   ├── rateLimiting.middleware.js   # Rate limiting
│   │   ├── globalErrorHandler.middleware.js # Global error handler
│   │   └── routeNotFound.middleware.js  # 404 handler for undefined routes
│   ├── models/
│   │   ├── user.js         # User schema
│   │   ├── product.js      # Product schema
│   │   ├── cart.js         # Cart schema
│   │   ├── order.js        # Order schema
│   │   └── vendorShop.js   # Vendor shop schema
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── product.routes.js
│   │   ├── cart.routes.js
│   │   ├── order.routes.js
│   │   └── vendorShop.routes.js
│   ├── utils/
│   │   ├── asyncErrorHandler.js       # Async error wrapper
│   │   ├── CustomError.js           # Custom error class
│   │   └── sighToken.js         # for token
├── .env.development
├── .env.production
├── app.js
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js                     # Entry point

package-lock.json
```

---

## Security Features

### Authentication & Authorization

- **JWT Tokens**: Stateless authentication access tokens
- **Password Hashing**: bcrypt with 12 salt rounds
- **Role-Based Access Control**: Admin Vedor and User roles with permission checks

### API Security

- **Rate Limiting**:
  - General API: 1000 requests per 60 minutes
  - Auth endpoints: 5 requests per 60 minutes
- **HTTP Headers**: Helmet.js for XSS, clickjacking protection
- **Input Validation**: Joi input validate all user input

### Data Protection

- **Cookie Security**: HttpOnly, Secure
- **Environment Variables**: Sensitive data never hardcoded

---

## Database Schema

### User Model

```javascript
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: [3, "First Name cannot be be less then 3"],
      maxlength: [20, "First Name cannot be greater then 20 character"],
    },
    middleName: {
      type: String,
      minlength: [3, "Middle Name cannot be be less then 3"],
      maxlength: [20, "Middle Name cannot be greater then 20 character"],
    },
    lastName: {
      type: String,
      required: true,
      minlength: [3, "Last Name cannot be be less then 3"],
      maxlength: [20, "Last Name cannot be greater then 20 character"],
    },
    email: {
      type: String,
      required: [true, "E-mail cannot be empty"],
      unique: true,
    },
    phoneNo: {
      type: String,
      required: [true, "Phone No cannot be empty"],
    },

    role: {
      type: String,
      enum: ["admin", "user", "vendor"],
      default: "user",
      required: true,
    },

    address: {
      type: String,
      required: [true, "Address cannot be empty"],
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Date of birth cannot be empty"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, "Please enter Confirm password"],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "Password and confirm password should be same",
      },
    },
    isPasswordChangedAt: Date,
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
});

userSchema.methods.comparePasswordInDb = async function (
  inputtedPassword,
  savedPassword,
) {
  return await bcrypt.compare(inputtedPassword, savedPassword);
};

userSchema.methods.passwordStatus = function (JWTTime) {
  if (this.isPasswordChangedAt) {
    const time = this.isPasswordChangedAt.getTime() / 1000;
    return JWTTime < time;
  }
  return false;
};

const User = mongoose.model("User", userSchema);
export default User;
```

### Product Model

```javascript
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Must provide name"],
      maxlength: [60, "Name cannot be longer than 60 characters"],
      minlength: [4, "Name must be greater than 3 characters"],
      unique: true,
    },
    price: {
      type: Number,
      required: [true, "Must provide price"],
      min: [0, "Price cannot be less then zero"],
    },
    rating: {
      type: String,
    },
    os: {
      type: String,
      trim: true,
      enum: ["Windows", "Mac", "Linux"],
      required: [true, "Must provide OS"],
    },
    brand: {
      type: String,
      enum: [
        "Acer",
        "Apple",
        "ASUS",
        "Dell",
        "Lenovo",
        "HP",
        "MSI",
        "Razer",
        "Microsoft",
      ],
      required: [true, "Must provide the brand name"],
      trim: true,
    },
    type: {
      type: String,
      enum: ["Entry Level", "Mid Range", "High End"],
      required: [true, "Must provide the type"],
      trim: true,
    },
    category: {
      type: String,
      enum: ["Gaming", "Business", "Ultrabook", "2-in-1"],
      trim: true,
      required: true,
    },
    inStock: {
      type: Boolean,
      default: false,
    },
    processor: {
      type: String,
      trim: true,
      maxlength: [60, "Processor Name cannot be longer than 60 characters"],
      minlength: [4, "Processor Name must be greater than 3 characters"],
      required: [true, "Must provide the processor detail"],
    },
    ram: {
      size: {
        type: Number,
        required: [true, "Must provide ram size"],
        max: [99, "Ram size cannot be greater then 99 GB"],
        min: [1, "Ram size cannot be less then  then 1 GB"],
      },
      speed: {
        type: Number,
        required: [true, "Must provide ram speed"],
      },
      ramType: {
        trim: true,
        type: String,
        enum: ["DDR3", "DDR4", "DDR5"],
        required: [true, "Must Provide ram type"],
      },
    },
    storage: {
      storageType: {
        type: String,
        trim: true,
        enum: ["HDD", "SSD"],
        required: [true, "Must provide storage type"],
      },
      storageSize: {
        type: Number,
        min: [1, "Storage size should be at lest 1 GB"],
        max: [9999, "Storage size cannot be more then 9999 GB"],
        required: [true, "Must provide storage size"],
      },
    },
    display: {
      displayType: {
        type: String,
        trim: true,
        emum: ["IPS", "OLED", "LED"],
        required: [true, "Must provide display type"],
      },
      displaySize: {
        type: Number,
        min: [10, "The minimum display size must be 10 inch"],
        max: [20, "The maximum display size cannt be more then 20 inch"],
        required: [true, "Must provide display Size"],
      },
      displayResolution: {
        type: String,
        trim: true,
        enum: [
          "1366x768",
          "1920x1080",
          "2560x1440",
          "3840x2160",
          "2880x1800",
          "3072x1920",
        ],
        required: [true, "Must provide the display resolution"],
      },
    },
    graphicCard: {
      graphicCardBrand: {
        type: String,
        enum: ["Intel", "AMD", "NVDIA"],
        trim: true,
        required: [true, "Must Provide graphic card Brand"],
      },
      graphicVram: {
        type: Number,
        max: [99, "Graphic v ram cannot be more then 99 GB"],
        min: [1, "Graphic v ram cannot be less then 1 GB"],
        required: [true, "Must provide graph v ram"],
      },
      tgp: {
        type: Number,
        max: [200, "TGP cannot be greater then 200 Watts"],
        min: [20, "TGP cannot be less then 20 Watts"],
      },
      series: {
        type: String,
        trim: true,
        enum: [
          "RTX 50 Series",
          "RTX 40 Series",
          "RTX 30 Series",
          "RTX 20 Series",
          "Radeon RX 7000 Series",
          "Radeon RX 6000 Series",
          "Radeon RX 5000 Series",
          "Radeon RX Vega Series",
          "Intel Iris Xe",
          "Intel Arc A Series",
        ],
      },
    },
    battery: {
      capacity: {
        type: Number,
        required: [true, "Must provide battery capicity"],
        max: [120, "The maximum battery capacity is 120 Watt hour"],
        min: [20, "The minimum battery capaitcy is 20 watt hour"],
      },
    },
    weight: {
      type: Number,
      required: true,
      max: [6, "Laptop cannot be more then 6 kg"],
      min: [1, "Laptop cannot be less then 1 kg"],
    },
    warranty: {
      type: Number,
      default: 1,
      min: [0, "Warrenty cannot be less then 0 year"],
      max: [3, "wattenty cannot be more then 3 year"],
      required: [true, "Must provide the warranty detail"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    createdBy: String,
    productImage: {
      type: String,
    },
    discount: {
      type: Number,
      max: [100, "Discount cannot be greater then 100 %"],
      min: [0, "Discount cannot be less then 0%"],
      default: 0,
    },
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);
export default Product;
```

### Order Model

```javascript
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User must be asscociated with a Orders"],
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Please provide the product for the order"],
      },
      quantity: {
        type: Number,
        required: [true, "Please provide the product quantity"],
        validate: {
          validator: function (value) {
            return value > 0;
          },
          message: "Product quantity cannot be Zero or less then 0",
        },
      },
    },
  ],
  total: {
    type: Number,
    required: [true, "Total price cannot be empty"],
  },
  payment: {
    paymentType: {
      default: "COD",
      type: String,
      enum: ["COD", "MobileBanking"],
      // required: [true, "Must provide Payment type"]
    },
    prePaid: {
      type: Boolean,
      default: false,
    },
  },
  orderStatus: {
    type: String,
    default: "Processing",
    required: [true, "Must provide order status "],
    enum: ["Processing", "Shipped", "Delivered"],
  },
});

orderSchema.pre("save", function () {
  if (this.payment.paymentType === "MobileBanking") {
    this.payment.prePaid = true;
  }
});

const Order = mongoose.model("Order", orderSchema);
export default Order;

```

### Cart Model

```javascript
import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User must be asscociated with a cart"],
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Please provide the product for the cart"],
      },
      quantity: {
        type: Number,
        required: [true, "Please provide the product quantity"],
        validate: {
          validator: function (value) {
            return value > 0;
          },
          message: "Product quantity cannot be Zero or less then 0",
        },
      },
    },
  ],
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
```

### Vedor Shop Model

```javascript
import mongoose from "mongoose";

const vendorShopSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    shopName: {
      type: String,
      mixlength: [30, "Shop name cannot be more then 30"],
      minlength: [3, "Shop name cannot be less then 2"],
      required: [true, "Shop Name cannot be empty"],
      trim: true,
    },
    address: {
      type: String,
      required: true,
    },
    ratings: {
      type: String,
    },
    shopRegistrationNumber: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const VendorShop = mongoose.model("VendorShop", vendorShopSchema);
export default VendorShop;
```

---

## Scripts

```bash
# Development with auto-reload
npm run dev

# Production
npm start


```

---

## Screenshots

### API Testing in Postman

![Postman Screenshot](./screenshots/postman1.png)
![Postman Screenshot](./screenshots/postman2.png)

---
