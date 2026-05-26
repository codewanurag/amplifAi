# AmplifAI — Full-Stack SaaS Platform

AmplifAI is a production-style AI social media management SaaS workspace for creators, startups, agencies, and businesses.

## What is included

- React + Vite + Tailwind frontend
- Node.js + Express backend
- MongoDB/Mongoose data layer
- JWT authentication and protected routes
- Workspace management
- Drafts, scheduled posts, previews, and calendar workflow
- Built-in AI-template endpoints for captions, hashtags, scripts, repurposing, scoring, trends, and best posting times
- Cloudinary media upload integration
- Razorpay order creation and payment verification
- Analytics and recent activity APIs
- Responsive premium SaaS UI using the requested clean blue/cyan/navy palette

## Setup

### 1. Frontend

```bash
npm install
cp .env.example .env
npm run dev
```

Frontend runs on Vite. API requests are proxied to the backend during development.

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Update `backend/.env` with:

```env
MONGO_URI=mongodb://127.0.0.1:27017/amplifai
JWT_SECRET=replace-with-a-long-random-secret
CLIENT_URL=http://127.0.0.1:5173
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

Cloudinary and Razorpay features intentionally return clear setup errors until real credentials are provided.

## Useful commands

```bash
npm run build          # frontend production build
npm run dev            # frontend development server
npm --prefix backend run dev
npm --prefix backend run start
```

## Notes

Actual posting to Instagram, YouTube, LinkedIn, X/Twitter, TikTok, and Facebook is simulated internally because official OAuth/API credentials are not included. The internal workflow is real: posts, workspaces, analytics, activity, authentication, media, and billing records are handled through the backend.
