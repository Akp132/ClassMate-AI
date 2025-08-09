import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

// Import simple routes (without Prisma dependencies)
import authRoutes from '@/routes/auth-simple';
import assignmentRoutes from '@/routes/assignments';
import attendanceRoutes from '@/routes/attendance';
import gradeRoutes from '@/routes/grades';
import calendarRoutes from '@/routes/calendar';
import dashboardRoutes from '@/routes/dashboard';
import uploadRoutes from '@/routes/upload';

// Import middleware
import { errorHandler } from '@/middleware/errorHandler';
import { notFound } from '@/middleware/notFound';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'), // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests from this IP, please try again later.',
    },
  },
});

// Security middleware
app.use(helmet());
app.use(limiter);

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Static files for uploads
app.use('/uploads', express.static('uploads'));

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'ClassMate AI Backend is running!',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    status: 'simplified - database pending',
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/classes', (req, res) => {
  res.json({ success: true, data: [], message: 'Classes endpoint - placeholder until database is ready' });
});
app.use('/api/assignments', assignmentRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/grades', gradeRoutes);
app.use('/api/calendar', calendarRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/upload', uploadRoutes);

// API info endpoint
app.get('/api', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'ClassMate AI API v1.0.0 - Simplified Version',
    documentation: '/api/docs',
    status: 'Basic functionality working, full database integration pending',
    endpoints: {
      auth: '/api/auth',
      classes: '/api/classes',
      assignments: '/api/assignments',
      attendance: '/api/attendance',
      grades: '/api/grades',
      calendar: '/api/calendar',
      dashboard: '/api/dashboard',
      upload: '/api/upload',
    },
  });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Received SIGINT. Graceful shutdown...');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('🛑 Received SIGTERM. Graceful shutdown...');
  process.exit(0);
});

// Start server
async function startServer() {
  try {
    console.log('✅ Running simplified version without database');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📖 API documentation: http://localhost:${PORT}/api`);
      console.log(`🏥 Health check: http://localhost:${PORT}/health`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`📋 Status: Basic authentication and API structure working`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Start the server
startServer();

export default app;