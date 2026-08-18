# Online Eatery — Backend

REST API built with Node.js, Express, and MongoDB Atlas.

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# 3. Start development server
npm run dev
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | Server port (default: 5000) |
| `MONGO_URI` | **Yes** | MongoDB Atlas connection string |
| `JWT_SECRET` | **Yes** | Secret key for signing JWTs (min 32 chars) |
| `JWT_EXPIRES_IN` | No | Token lifetime (default: 7d) |
| `CLIENT_URL` | No | Frontend URL for CORS (default: http://localhost:5173) |
| `NODE_ENV` | No | development / production |

## API Endpoints

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | `/api/health` | None | Health check |
| POST | `/api/auth/signup` | None | Register |
| POST | `/api/auth/login` | None | Login |
| GET | `/api/users/profile` | JWT | Get profile |
| PUT | `/api/users/profile` | JWT | Update profile |
| GET | `/api/menu` | None | List menu |
| GET | `/api/menu/:id` | None | Menu item detail |
| POST | `/api/menu` | Admin | Create item |
| PUT | `/api/menu/:id` | Admin | Edit item |
| DELETE | `/api/menu/:id` | Admin | Delete item |
| POST | `/api/orders` | JWT | Place order |
| GET | `/api/orders/my-orders` | JWT | My orders |
| GET | `/api/orders` | Admin | All orders |
| GET | `/api/orders/:id` | JWT | Order detail |
| PATCH | `/api/orders/:id/status` | Admin | Update status |
