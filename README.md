# Online Eatery 🍽️

**PORA Tech Academy — Full-Stack Capstone Project**  
*A Full-Stack Food Ordering & Restaurant Management System*

[![Live Frontend](https://img.shields.io/badge/Frontend-Vercel-black?logo=vercel)](https://onlineeatry-app.vercel.app)
[![Live Backend](https://img.shields.io/badge/Backend-Render-brightgreen?logo=render)](https://onlineeatery-api.onrender.com)
[![Database](https://img.shields.io/badge/Database-MongoDB%20Atlas-green?logo=mongodb)](https://cloud.mongodb.com)

---

## 1. Project Overview

**The Online Eatery** is a production-style, responsive full-stack application designed to move restaurant ordering and administrative management online. 

The system provides customer food ordering capabilities alongside a robust administrative panel for tracking sales metrics, managing menu items, and handling order status transitions.

---

## 2. Features

### Customer Features
- **User Authentication**: Registration, Login, Profile updates, JWT token persistence.
- **Menu Browsing**: Search meals by keyword, filter by category (Rice, Soup, Drinks, Desserts), filter by price range.
- **Meal Details**: View meal descriptions, stock availability, category, and price.
- **Shopping Cart**: Add meals, adjust item quantities, remove items, clear cart, slide-over quick cart drawer.
- **Checkout & Orders**: Place orders with delivery address, view order history (`/orders`), track order status in real time (`Pending` → `Preparing` → `Out for Delivery` → `Delivered` / `Cancelled`).

### Administrator Features
- **Role-Based Access Control**: Admin login and route protection.
- **Dashboard Metrics**: View real-time Total Orders count, Total Revenue (calculated via MongoDB aggregation), and Pending Orders count.
- **Menu Management**: Create new meals, edit existing items, toggle availability, delete items.
- **Order Management**: View all customer orders, filter by status, and update status transitions.

---

## 3. Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | React.js (Vite) | Client UI framework & fast bundling |
| **Styling** | Tailwind CSS v4 | Dark mode aesthetic, responsive design, glassmorphism |
| **State Management** | Context API | `AuthContext` (JWT & user) + `CartContext` (Cart items & drawer) |
| **Routing** | React Router v6 | Client-side routing with `ProtectedRoute` & `AdminRoute` guards |
| **API Client** | Axios | Reusable HTTP client with Bearer token interceptors |
| **Backend** | Node.js + Express.js | REST API server framework |
| **Database** | MongoDB Atlas + Mongoose | Cloud document database & ODM |
| **Auth & Security** | JWT + bcryptjs + Helmet | Token authentication, password hashing, security headers |
| **Validation** | express-validator | Server-side request input validation |
| **Logging & CORS** | Morgan + CORS | HTTP request logging & cross-origin resource sharing |

---

## 4. System Architecture

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
└──────────────────────────────┴──────────────────────────────┘
```

---

## 5. Local Quick Start & Installation

### Prerequisites
- Node.js (v18+)
- npm (v9+)
- MongoDB Atlas Cluster URI

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/almafwilgom/onlineeatryApp.git
cd onlineeatryApp

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Configure Environment Variables

**Backend (`backend/.env`):**
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.crblggi.mongodb.net/onlineeatery?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

**Frontend (`frontend/.env`):**
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Run Development Servers

**Start Backend API (Terminal 1):**
```bash
cd backend
npm run dev
```
*API will run at: `http://localhost:5000`*

**Start Frontend App (Terminal 2):**
```bash
cd frontend
npm run dev
```
*Application will run at: `http://localhost:5173`*

---

## 6. API Endpoints Summary

| Method | Route | Auth | Role | Description |
|---|---|---|---|---|
| `POST` | `/api/auth/signup` | None | Public | Register customer account |
| `POST` | `/api/auth/login` | None | Public | Log in user, receive JWT |
| `GET` | `/api/users/profile` | JWT | Customer | Get profile details |
| `PUT` | `/api/users/profile` | JWT | Customer | Update name & phone |
| `GET` | `/api/menu` | None | Public | List menu items (with search & filters) |
| `GET` | `/api/menu/:id` | None | Public | Get single menu item detail |
| `POST` | `/api/menu` | JWT | Admin | Create menu item |
| `PUT` | `/api/menu/:id` | JWT | Admin | Update menu item |
| `DELETE` | `/api/menu/:id` | JWT | Admin | Delete menu item |
| `POST` | `/api/orders` | JWT | Customer | Place order (server calculates total) |
| `GET` | `/api/orders/my-orders` | JWT | Customer | Get personal order history |
| `GET` | `/api/orders/:id` | JWT | Customer/Admin | Get order detail (ownership enforced) |
| `GET` | `/api/orders` | JWT | Admin | Get all customer orders |
| `GET` | `/api/orders/dashboard` | JWT | Admin | Get revenue & order metrics |
| `PATCH` | `/api/orders/:id/status` | JWT | Admin | Update order status |

---

## 7. Deployment Configuration Guide

### Render (Backend API Deployment)
- **Root Directory**: `backend`
- **Build Command**: `npm install`
- **Start Command**: `node src/server.js`
- **Environment Variables**:
  - `PORT` = `5000`
  - `MONGO_URI` = `mongodb+srv://...`
  - `JWT_SECRET` = `<secret>`
  - `CLIENT_URL` = `https://onlineeatry-app.vercel.app`
  - `NODE_ENV` = `production`

### Vercel (Frontend Deployment)
- **Framework Preset**: `Vite`
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Environment Variables**:
  - `VITE_API_URL` = `https://onlineeatery-api.onrender.com/api`

---

## 8. Defense Preparation & Q&A Guide

### Q1: How does password security work in this project?
> Passwords are never stored in plaintext. They are salted and hashed using `bcryptjs` (salt rounds: 12) inside a Mongoose `pre('save')` hook. Furthermore, the `password` field has `select: false` in the user schema so it is omitted from query results by default.

### Q2: Why calculate order totals on the server instead of accepting total amount from the frontend?
> Accepting prices or total amounts from the frontend is a security vulnerability—a malicious user could modify the payload to send `totalAmount: ₦1.00` for a `₦10,000` order. Calculating totals on the server by querying MongoDB guarantees financial accuracy.

### Q3: Why snapshot item prices inside order documents?
> If an admin edits a menu item's price from `₦2,000` to `₦3,000` next month, historical orders placed today must still reflect the `₦2,000` price paid by the customer. Snapshotting `price` into `order.items[].price` ensures audit integrity.

### Q4: How is ownership enforced for customer order viewing?
> In `orderService.getOrderById`, the system compares `order.user._id` with `req.user.id`. If they do not match and the user's role is not `admin`, access is denied with a `403 Forbidden` error.

---

## 9. Academic Integrity Disclosure

This project was built as an individual academic capstone for **PORA Tech Academy**. AI assistance was used for architectural guidance, boilerplate generation, and test creation. All code was audited, verified via automated test suites (`test-menu.js`, `test-order.js`, `test-end-to-end-audit.js`), and compiled cleanly via Vite.

---

## 10. Submission Details

- **Student / Author**: Capstone Candidate
- **Cohort**: PORA Tech Academy 2026
- **Repository**: [GitHub — onlineeatryApp](https://github.com/almafwilgom/onlineeatryApp)
- **Documentation**: [Technical Report](docs/TECHNICAL_REPORT.md) | [Postman Collection](docs/OnlineEatery_Postman_Collection.json)
