# MovieDB - Fullstack Movie Database

A modern fullstack movie database application built with Node.js, Express, MySQL, Next.js, and Redux Toolkit. Features user authentication, movie search via OMDB API, personal ratings, and favorites management.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- MySQL 8.0+
- OMDB API key (free at [omdbapi.com](http://www.omdbapi.com/apikey.aspx))

### Installation

1. **Clone and install dependencies:**
```bash
npm run install:all
```

2. **Set up the backend:**
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` with your database and JWT configuration:
```env
DATABASE_URL="mysql://username:password@localhost:3306/movie_database"
JWT_SECRET="your-super-secret-jwt-key-here"
JWT_EXPIRES_IN="7d"
PORT=5000
NODE_ENV="development"
CORS_ORIGIN="http://localhost:3000"
```

3. **Set up the frontend:**
```bash
cd frontend
cp .env.local.example .env.local
```

Edit `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_OMDB_API_KEY=your-omdb-api-key-here
NEXT_PUBLIC_OMDB_API_URL=http://www.omdbapi.com/
```

4. **Initialize the database:**
```bash
npm run db:generate
npm run db:push
```

5. **Start development servers:**
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 🏗️ Architecture

### Backend (Node.js + Express + MySQL)

```
backend/
├── src/
│   ├── controllers/     # Request handlers
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   ├── middlewares/     # Authentication, validation, errors
│   ├── utils/           # Database, JWT, password utilities
│   ├── validations/     # Zod schemas
│   ├── types/           # TypeScript types
│   ├── app.ts          # Express app configuration
│   └── server.ts       # Server startup
├── prisma/
│   └── schema.prisma   # Database schema
└── package.json
```

### Frontend (Next.js + Redux Toolkit)

```
frontend/
├── app/
│   ├── auth/           # Authentication pages
│   ├── movies/         # Movie browsing and details
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/
│   ├── layout/         # Header, navigation
│   ├── movies/         # Movie cards, search, rating
│   ├── providers/      # Redux and theme providers
│   └── ui/             # shadcn/ui components
├── lib/
│   ├── features/       # Redux slices
│   ├── api.ts          # API client
│   ├── omdb.ts         # OMDB API client
│   └── store.ts        # Redux store
└── hooks/              # Custom React hooks
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (protected)

### Example Usage

**Register a new user:**
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "Password123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "Password123"
  }'
```

## 🎯 Features

### Backend Features
- **Authentication**: JWT-based auth with bcrypt password hashing
- **Database**: MySQL with Prisma ORM, type-safe queries
- **Validation**: Zod schemas for request validation
- **Security**: Helmet, CORS, input sanitization
- **Error Handling**: Centralized error handler with proper HTTP codes
- **Architecture**: Clean MVC pattern with service layer

### Frontend Features
- **Movie Search**: Real-time search with OMDB API integration
- **User Ratings**: 5-star rating system with localStorage persistence
- **Favorites**: Personal movie collection management
- **Dark Mode**: Persistent theme switching
- **Responsive Design**: Mobile-first responsive layout
- **State Management**: Redux Toolkit with persistence
- **Animations**: Framer Motion for smooth interactions

## 🎨 UI Components

Built with shadcn/ui and Tailwind CSS:
- Movie cards with hover animations
- Star rating component
- Search bar with debounced input
- Loading skeletons
- Error alerts and toasts
- Responsive navigation
- Theme toggle

## 🛠️ Development

### Available Scripts

```bash
# Install all dependencies
npm run install:all

# Start both servers
npm run dev

# Start individual servers
npm run dev:backend
npm run dev:frontend

# Build for production
npm run build

# Database operations
npm run db:generate    # Generate Prisma client
npm run db:push       # Push schema to database
npm run db:migrate    # Run migrations
```

### Database Schema

```sql
-- Users table
CREATE TABLE users (
  id VARCHAR(191) PRIMARY KEY,
  email VARCHAR(191) UNIQUE NOT NULL,
  password VARCHAR(191) NOT NULL,
  firstName VARCHAR(191),
  lastName VARCHAR(191),
  role ENUM('USER', 'ADMIN') DEFAULT 'USER',
  createdAt DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3),
  updatedAt DATETIME(3) ON UPDATE CURRENT_TIMESTAMP(3)
);
```

## 🚀 Production Deployment

### Backend Deployment

1. **Environment Variables:**
```env
DATABASE_URL="mysql://user:pass@host:3306/db"
JWT_SECRET="secure-production-secret"
NODE_ENV="production"
PORT=5000
```

2. **Build and Start:**
```bash
cd backend
npm run build
npm start
```

### Frontend Deployment

1. **Environment Variables:**
```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
NEXT_PUBLIC_OMDB_API_KEY=your-production-key
```

2. **Build and Deploy:**
```bash
cd frontend
npm run build
```

Deploy the `out` folder to your static hosting provider.

## 🔐 Security Features

- **Password Hashing**: bcrypt with 12 salt rounds
- **JWT Tokens**: Secure token generation with expiration
- **Input Validation**: Zod schema validation on all endpoints
- **CORS Protection**: Configurable CORS origins
- **Helmet Security**: Security headers via Helmet.js
- **SQL Injection Prevention**: Prisma ORM with parameterized queries

## 📱 Responsive Design

- **Mobile**: < 768px - Stacked layout, touch-friendly buttons
- **Tablet**: 768px - 1024px - 4-column movie grid
- **Desktop**: > 1024px - 6-column movie grid, side-by-side layouts

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.