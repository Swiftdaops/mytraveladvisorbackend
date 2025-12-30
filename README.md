# TravelAdvisor Backend

Features:
- Node.js + Express REST API
- MongoDB + Mongoose
- Multer multi-image upload -> Cloudinary
- JWT auth with httpOnly cookies for admin
- Security: Helmet, CORS, rate limiting
- Validation with Zod
- PostHog server analytics

Quick start:
1. Copy `.env.example` to `.env` and fill values.
2. Install dependencies: `npm install`.
3. Start dev server: `npm run dev`.

Endpoints (examples):
- `POST /api/auth/login` — admin login (sets httpOnly JWT cookie)
- `POST /api/auth/logout` — clears auth cookie
- `GET /api/listings` — list items
- `POST /api/listings` — create listing (protected)
- `POST /api/upload` — upload images (protected)

