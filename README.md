# MindOS 🧠⚡

**MindOS** is a full-stack, AI-powered personal knowledge management system (Second Brain). It empowers users to save, organize, analyze, semantically search, and publicly share digital content—including YouTube videos, Tweets, Web Links, and personal Markdown Notes.

---

## 🌐 Architecture & Deployment Overview

MindOS is architected as a decoupled client-server web application:

- **Frontend Application**: Built with React (Vite) & TypeScript, hosted on **Vercel** for fast global CDN distribution and continuous deployment.
- **Backend API**: Node.js & Express server written in TypeScript, hosted on an **AWS EC2** instance, reverse-proxied with **Nginx**, and secured with SSL certificates via **Certbot (Let's Encrypt)**.
- **Database & AI**: Content metadata & vector embeddings stored in **MongoDB Atlas**, utilizing **Google Gemini API** (`text-embedding-004` & content generation models) for semantic vector search and content analysis.

```
                    ┌─────────────────────────┐
                    │     Client (Vercel)     │
                    │   React + Vite App      │
                    └────────────┬────────────┘
                                 │
                            HTTPS│ requests
                                 ▼
                    ┌─────────────────────────┐
                    │      AWS EC2 Server     │
                    │  ┌───────────────────┐  │
                    │  │   Nginx Reverse   │  │
                    │  │       Proxy       │  │
                    │  └─────────┬─────────┘  │
                    │            │ localhost:3000
                    │  ┌─────────▼─────────┐  │
                    │  │   Express API     │  │
                    │  │     (PM2)         │  │
                    │  └─────────┬─────────┘  │
                    └────────────┼────────────┘
                                 │
                  ┌──────────────┴──────────────┐
                  ▼                             ▼
        ┌───────────────────┐         ┌───────────────────┐
        │   MongoDB Atlas   │         │ Google Gemini API │
        │  (Database & DB)  │         │  (Embeddings & AI)│
        └───────────────────┘         └───────────────────┘
```

---

## ✨ Features

- 📌 **Content Aggregation**: Store and organize YouTube videos, Twitter/X posts, web links, and personal notes.
- 🔍 **AI-Powered Semantic Vector Search**: Search across saved items using natural language concepts instead of exact string matching, powered by **Google Gemini API** vector embeddings and cosine similarity algorithms.
- 💡 **AI Content Analysis**: Generate concise summaries, key insights, bullet points, and related topics for any stored content.
- 🔗 **Public Brain Sharing**: Generate public shareable links to expose curated content collections to non-authenticated visitors.
- 🔐 **Secure Authentication**: User registration and sign-in backed by `bcrypt` password hashing and secure HTTP-only JWT cookies.

---

## 🛠️ Tech Stack

### **Frontend (`/client`)**
- **Framework**: React 19 (Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Hosting**: **Vercel**

### **Backend (`/api`)**
- **Runtime**: Node.js & Express.js
- **Language**: TypeScript
- **Database**: MongoDB (Mongoose ORM)
- **Authentication**: JWT (`jsonwebtoken`) & `bcrypt`
- **Validation**: Zod
- **AI Integration**: `@google/genai` / Gemini API
- **Deployment & Infra**: **AWS EC2**, **Nginx**, **PM2**, **Certbot (Let's Encrypt SSL)**

---

## 📁 Repository Structure

```
MindOS/
├── api/                   # Express Backend Service
│   ├── src/
│   │   ├── config/        # Database & Environment configuration
│   │   ├── middleware/    # Auth & security middleware
│   │   ├── models/        # Mongoose schemas (User, Content, Tag, Link)
│   │   ├── routes/        # Express API routers (User, Content, Brain, Search, Analysis)
│   │   ├── services/      # Gemini AI embeddings & content analysis services
│   │   ├── utils/         # Cosine similarity helper & utilities
│   │   └── server.ts      # Express application entry point
│   ├── .env.example       # Backend environment variables template
│   ├── package.json
│   └── tsconfig.json
└── client/                # React Vite Frontend Application
    ├── src/
    │   ├── components/    # UI Components (NoteCard, AddContent, SemanticSearch, etc.)
    │   ├── hooks/         # Custom React Hooks & Auth Context
    │   ├── pages/         # Application Views (Dashboard, Share Page, Auth Pages)
    │   ├── utils/         # Axios instance & config
    │   ├── App.tsx        # React Router routes
    │   └── main.tsx
    ├── vercel.json        # Single-page application rewrite config for Vercel
    └── package.json
```

---

## 🔑 Environment Variables

### **Backend (`/api/.env`)**

| Variable | Description | Example / Default |
| :--- | :--- | :--- |
| `PORT` | Port number Express listens on | `3000` |
| `MONGODB_URL` | MongoDB Atlas Connection String | `mongodb+srv://user:pass@cluster.mongodb.net/mindos` |
| `JWT_SECRETE` | Secret key for signing JWT tokens | `your_super_secret_jwt_key` |
| `GEMINI_API_KEY` | Google Gemini API Key | `AIzaSy...` |
| `FRONTEND_URL` | Deployed Frontend URL (for CORS validation) | `https://mindos.amitdev.site` |

### **Frontend (`/client/.env`)**

| Variable | Description | Example / Default |
| :--- | :--- | :--- |
| `VITE_BACKEND_URL` | Base URL of the deployed AWS EC2 Backend API | `https://api.mindos.amitdev.site` |

---

## 💻 Local Development Setup

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** instance (Local or MongoDB Atlas)
- **Google Gemini API Key** (from [Google AI Studio](https://aistudio.google.com/))

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/MindOS.git
cd MindOS
```

### 2. Configure & Run Backend (`/api`)
```bash
cd api

# Install dependencies
npm install

# Create environment configuration file
cp .env.example .env
# Edit .env and supply your MONGODB_URL, JWT_SECRETE, and GEMINI_API_KEY

# Start backend dev server
npm run dev
```
The server will start on `http://localhost:3000`.

### 3. Configure & Run Frontend (`/client`)
Open a new terminal window:
```bash
cd client

# Install dependencies
npm install

# (Optional) Create local env file if backend URL differs from http://localhost:3000
echo "VITE_BACKEND_URL=http://localhost:3000" > .env.local

# Start Vite development server
npm run dev
```
The application will be accessible at `http://localhost:5173`.

---

## 🚀 Production Deployment Guide

### 1. Backend Deployment on AWS EC2 (Express + Nginx + Certbot)

#### **Step A: Launch AWS EC2 Instance**
1. Launch an Ubuntu Server 22.04 LTS instance (e.g., `t2.micro` or `t3.micro`).
2. In Security Group settings, allow inbound traffic on:
   - **SSH** (Port 22)
   - **HTTP** (Port 80)
   - **HTTPS** (Port 443)

#### **Step B: Install Dependencies on EC2**
SSH into your instance and install Node.js, Git, Nginx, and PM2:
```bash
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs nginx git certbot python3-certbot-nginx
sudo npm install -g pm2
```

#### **Step C: Setup & Build Backend Application**
```bash
# Clone the repository
git clone https://github.com/your-username/MindOS.git
cd MindOS/api

# Install dependencies
npm install

# Create .env file with production values
nano .env
# Set PORT=3000, MONGODB_URL, JWT_SECRETE, GEMINI_API_KEY, and FRONTEND_URL=https://your-app.vercel.app

# Compile TypeScript to JavaScript
npm run build

# Start server using PM2 process manager
pm2 start dist/server.js --name "mindos-api"
pm2 save
pm2 startup
```

#### **Step D: Configure Nginx as Reverse Proxy**
Create or edit Nginx configuration file:
```bash
sudo nano /etc/nginx/sites-available/mindos-api
```

Add the following configuration (replace `api.yourdomain.com` with your custom domain or EC2 Public IP):
```nginx
server {
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site and test configuration:
```bash
sudo ln -s /etc/nginx/sites-available/mindos-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### **Step E: Provision SSL Certificate with Certbot**
Run Certbot to issue and attach a free Let's Encrypt SSL certificate:
```bash
sudo certbot --nginx -d api.yourdomain.com
```
Follow the interactive prompts to enable HTTP-to-HTTPS redirect automatically. Your backend API will now be securely available over `https://api.yourdomain.com`.

---

### 2. Frontend Deployment on Vercel

#### **Step A: Import Project to Vercel**
1. Push your repository to GitHub.
2. Sign in to your [Vercel Dashboard](https://vercel.com/) and click **Add New** > **Project**.
3. Import your **MindOS** repository.

#### **Step B: Build Settings & Environment Variables**
- **Framework Preset**: Vite
- **Root Directory**: `client`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Environment Variables**:
  - `VITE_BACKEND_URL` = `https://api.yourdomain.com` (Your AWS EC2 domain)

#### **Step C: Client Routing Support (`vercel.json`)**
The `client/vercel.json` file ensures single-page routing (SPA routes) redirect seamlessly to `index.html`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Click **Deploy**. Your React frontend will be live on Vercel!

---

## 🔌 API Endpoints Reference

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| **POST** | `/api/v1/signup` | User Sign Up | ❌ |
| **POST** | `/api/v1/signin` | User Sign In & receive HTTP-only JWT Cookie | ❌ |
| **POST** | `/api/v1/logout` | Clear Authentication Cookie | ❌ |
| **GET** | `/api/v1/content` | Fetch all saved content items for logged-in user | ✅ |
| **POST** | `/api/v1/content` | Create new content (YouTube, Tweet, Link, Note) | ✅ |
| **PUT** | `/api/v1/content` | Update existing content item | ✅ |
| **DELETE** | `/api/v1/content` | Delete content item by ID | ✅ |
| **GET** | `/api/v1/search?q=...` | Perform AI-powered semantic vector search | ✅ |
| **POST** | `/api/v1/search/generate-embeddings` | Batch generate vector embeddings for existing items | ✅ |
| **POST** | `/api/v1/analyze` | Generate AI summary and key insights for content | ✅ |
| **POST** | `/api/v1/brain/share` | Generate or toggle public shareable link | ✅ |
| **GET** | `/api/v1/brain/:shareLink` | Retrieve public content collection via share link | ❌ |
| **GET** | `/health` | Server Health Check | ❌ |

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).
