# ClassMate AI Backend

RESTful API server for the ClassMate AI student productivity application.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation & Setup

1. **Install dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Environment setup**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

The server will start on http://localhost:5000

## 🏗️ Architecture

### Current Implementation
- **Framework**: Express.js with TypeScript
- **Authentication**: JWT-based tokens
- **Validation**: Zod schemas
- **Storage**: In-memory (temporary)
- **Security**: Helmet, CORS, rate limiting

### Project Structure
```
backend/
├── src/
│   ├── controllers/     # Route handlers
│   ├── middleware/      # Auth, validation, error handling
│   ├── routes/         # API endpoint definitions
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Helper functions and validation
│   └── server-working.ts # Main application entry
├── prisma/
│   └── schema.prisma   # Database schema (pending setup)
└── package.json
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - User login/registration
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/logout` - User logout
- `DELETE /api/auth/account` - Delete user account

### Core Features (Placeholders)
- `GET /api/classes` - List user's classes
- `GET /api/assignments` - List assignments
- `GET /api/attendance` - Attendance records
- `GET /api/grades` - Grade information
- `GET /api/calendar/events` - Calendar events
- `GET /api/dashboard/stats` - Dashboard statistics

### Utility
- `GET /health` - Health check
- `GET /api` - API documentation

## 🔒 Authentication

All protected endpoints require a Bearer token in the Authorization header:

```bash
Authorization: Bearer <jwt-token>
```

Example usage:
```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","name":"User Name"}'

# Access protected endpoint
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer <token-from-login>"
```

## 🎯 Development Scripts

```bash
npm run dev      # Start development server with hot reload
npm run build    # Build TypeScript to JavaScript
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🔄 Status & Next Steps

### ✅ Completed
- Core Express.js server setup
- JWT authentication system
- API endpoint structure
- Request validation with Zod
- Error handling middleware
- CORS and security configuration
- Frontend integration ready

### 🚧 In Progress
- Database integration (Prisma + PostgreSQL/SQLite)
- Full CRUD operations for all entities
- Google Classroom API integration
- File upload functionality

### 📋 Planned Features
- Real database with Prisma ORM
- Complete class management system
- Assignment tracking with due dates
- Attendance recording and analytics
- Grade management with GPA calculation
- Calendar integration
- Dashboard statistics and insights
- Comprehensive testing suite

## 🔧 Configuration

Key environment variables:

```env
NODE_ENV=development
PORT=5000
JWT_SECRET=your-secret-key
DATABASE_URL=your-database-connection
FRONTEND_URL=http://localhost:3000
```

## 🤝 Frontend Integration

The backend is designed to work seamlessly with the Next.js frontend:

1. **API Base URL**: Frontend configured to use `http://localhost:5000`
2. **CORS**: Configured for `http://localhost:3000`
3. **Response Format**: Consistent JSON responses with `{ success, data, message }` structure
4. **Authentication**: JWT tokens compatible with frontend auth context

## 🐛 Troubleshooting

### Common Issues

1. **Port 5000 in use**
   - Change `PORT` in `.env` file
   - Update frontend `NEXT_PUBLIC_API_URL` accordingly

2. **CORS errors**
   - Verify `FRONTEND_URL` in `.env` matches frontend URL
   - Check browser network tab for detailed error messages

3. **JWT errors**
   - Ensure `JWT_SECRET` is set in `.env`
   - Check token format in Authorization header

## 📝 API Response Format

All API responses follow this consistent format:

```typescript
{
  success: boolean;
  data?: any;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
```

Error responses:
```typescript
{
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
}
```