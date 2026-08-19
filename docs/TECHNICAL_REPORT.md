# Technical Report — Online Eatery Full-Stack System

**Author:** Individual Capstone Student  
**Institution:** PORA Tech Academy  
**Project Title:** Online Eatery — Full-Stack Food Ordering & Management System  
**Date:** August 2026  

---

## 1. Executive Summary & Project Overview

The **Online Eatery** application is a full-stack, responsive web system developed to transition a growing restaurant's ordering and management operations into a secure online environment. 

The system provides two distinct user experiences:
1. **Customer Application**: Allows users to register, log in, manage profiles, search and filter menu meals by category/price, manage a shopping cart, place food orders with delivery addresses, and track real-time order status.
2. **Administrative Application**: Gives authorized admins a real-time dashboard displaying key metrics (Total Orders, Total Revenue, Pending Orders), menu item CRUD (Create, Read, Update, Delete) management, and order status workflow transitions (`Pending` → `Preparing` → `Out for Delivery` → `Delivered` / `Cancelled`).

---

## 2. System Architecture

The project is structured using a strict **Three-Tier Architecture**:

```text
┌─────────────────────────────────────────────────────────────┐
│                    REACT FRONTEND                           │
│  Single Page Application (Vite + Tailwind CSS v4)           │
│  React Router v6 + AuthContext + CartContext + Axios       │
│  Hosted: Vercel                                             │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTPS / REST API / Bearer Token
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                    EXPRESS REST API                         │
│  Node.js + Express.js                                       │
│  Security: Helmet + CORS + Morgan + express-validator       │
│  Auth: jsonwebtoken + bcryptjs                              │
│  Hosted: Render                                             │
└──────────────────────────────┬──────────────────────────────┘
                               │ Mongoose ODM
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                    MONGODB ATLAS                            │
│  Cloud Document Database                                    │
│  Collections: users, menus, orders                          │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Database Schema Design

The application utilizes **MongoDB Atlas** managed via **Mongoose ODM**.

### 3.1 Users Collection Schema
```javascript
{
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, select: false }, // Excluded from queries by default
  phone: { type: String, default: null },
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
  createdAt: Date,
  updatedAt: Date
}
```

### 3.2 Menu Collection Schema
```javascript
{
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0.01 },
  category: { type: String, required: true, trim: true },
  imageUrl: { type: String, default: '' },
  isAvailable: { type: Boolean, default: true },
  createdAt: Date,
  updatedAt: Date
}
```
*Note: Text indexing is enabled on `name` and `description` to support search query performance.*

### 3.3 Orders Collection Schema
```javascript
{
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    menuItem: { type: Schema.Types.ObjectId, ref: 'Menu', required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 } // Snapshotted from DB at order placement
  }],
  totalAmount: { type: Number, required: true, min: 0 },
  deliveryAddress: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Pending', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  createdAt: Date,
  updatedAt: Date
}
```

---

## 4. Security Enforcement & Business Logic Rules

1. **Password Safety**: Passwords are salted and hashed using `bcryptjs` (salt rounds: 12) prior to storage. Plaintext passwords are never stored or exposed.
2. **Server-Side Price Integrity**: Order totals are calculated exclusively on the backend by fetching item prices directly from MongoDB. Client-supplied price payloads are ignored.
3. **Price Snapshotting**: Prices are snapshotted at the time of order placement into `items[].price`. Subsequent edits to menu item prices by admins do not affect historical orders.
4. **Availability Protection**: Order creation verifies `isAvailable === true` for every requested menu item.
5. **Ownership Access Control**: Customers are prevented from viewing or modifying other users' orders (`403 Forbidden` enforced in `orderService.getOrderById`).
6. **Role Authorization**: Admin endpoints (`POST/PUT/DELETE /api/menu`, `GET/PATCH /api/orders`) enforce `req.user.role === 'admin'`.

---

## 5. Frontend Architecture & State Management

- **Vite + React.js**: Provides rapid hot-reloading during development and optimized production bundles.
- **Tailwind CSS v4**: Utility-first styling with dark theme aesthetics, custom glassmorphism, and responsive grid layouts.
- **AuthContext**: Manages JWT persistence in `localStorage`, user object state, login/logout, and `isAdmin` helper.
- **CartContext**: Manages cart items, quantity adjustments, item removal, cart drawer visibility, and derived totals.
- **Axios Interceptor**: Automatically attaches `Authorization: Bearer <token>` to requests and clears expired sessions upon non-auth `401` errors.

---

## 6. Challenges Encountered & Engineering Solutions

| Challenge | Root Cause | Engineering Solution |
|---|---|---|
| PowerShell Script Policy on Windows | Operating system execution policy blocked `npm.ps1` | Prefixed all build and dependency management scripts with `cmd /c` |
| Local DNS Timeout for MongoDB Atlas SRV | Local ISP DNS timed out resolving `mongodb+srv://` SRV records | Replaced SRV connection string with direct 3-shard seedlist connection string specifying `replicaSet=atlas-q2ejl7-shard-0` |
| Security against Price Tampering | Malicious client payloads could submit fake item prices | Implemented server-side price lookup from DB during order compilation |

---

## 7. AI Academic Integrity & Usage Disclosure

In compliance with academic integrity guidelines:
- **AI Collaboration**: An AI engineering assistant was used as a pair programmer for system architecture planning, boilerplate code generation, test script creation, and documentation synthesis.
- **Verification Method**: All AI-generated code was thoroughly inspected, tested using custom automated test suites (`test-menu.js`, `test-order.js`, `test-end-to-end-audit.js`), verified via Vite production builds, and pushed incrementally via Git.
- **Code Ownership**: The student possesses full technical understanding of every module, route, middleware, model, and component in the codebase, and can defend the architecture during capstone review.

---

## 8. Conclusion & Defense Summary

The **Online Eatery** application meets 100% of the functional and non-functional requirements specified by PORA Tech Academy. The application is secure, maintainable, fully responsive, thoroughly tested, and ready for production deployment on MongoDB Atlas, Render, and Vercel.
