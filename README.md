# ClassMate AI - Student Productivity App

**ClassMate AI** is an advanced, AI-powered student productivity application designed to help students efficiently manage their academic life. The application provides comprehensive tools for tracking classes, assignments, attendance, grades, and offers intelligent AI assistance for study planning and academic success.

![ClassMate AI Dashboard](https://github.com/user-attachments/assets/2c79e2e0-0343-4f3a-8c43-c0e4e9a29f40)

## 🌟 Features

### 📚 Core Academic Management
- **Class Management**: Organize and track all your classes with detailed information
- **Assignment Tracking**: Keep track of pending and completed assignments with priority levels
- **Attendance Monitoring**: Record and monitor class attendance with statistics
- **Grade Management**: Track grades and calculate GPA automatically
- **Calendar Integration**: Visual calendar for managing academic schedules

### 🤖 AI-Powered Assistant
- **Personalized Study Plans**: AI generates optimized study schedules based on your workload
- **Assignment Prioritization**: Intelligent task prioritization based on deadlines and importance
- **Performance Insights**: AI analyzes your academic performance and provides actionable insights
- **Deadline Alerts**: Smart notifications for upcoming assignments and important dates
- **Study Recommendations**: Personalized study recommendations based on your academic patterns

### 🔄 Integration & Sync
- **Google Classroom Integration**: Sync assignments and classes from Google Classroom
- **Real-time Updates**: Live updates across all devices
- **File Upload Support**: Upload and manage academic documents
- **Cross-platform Compatibility**: Works seamlessly across desktop and mobile devices

### 🎨 User Experience
- **Modern UI/UX**: Clean, intuitive interface built with React and Tailwind CSS
- **Dark/Light Theme**: Adaptive theme support for comfortable viewing
- **Responsive Design**: Optimized for all screen sizes
- **Real-time Notifications**: Toast notifications for important updates
- **Interactive Dashboard**: Comprehensive overview of academic progress

## 🏗️ Technical Architecture

### Full-Stack Overview
- **Frontend**: Next.js 15 + React 19 + TypeScript
- **Backend**: Node.js + Express + TypeScript  
- **Database**: PostgreSQL with Prisma ORM (SQLite for development)
- **Authentication**: JWT tokens with secure middleware
- **API**: RESTful endpoints with Zod validation

### Frontend Stack
- **Framework**: Next.js 15.3.3 with React 19
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS with custom components
- **UI Components**: Radix UI for accessible, high-quality components
- **State Management**: React Context API with custom hooks
- **Authentication**: NextAuth.js for secure authentication
- **HTTP Client**: Axios for API communication
- **Charts**: Recharts for data visualization
- **Calendar**: React Big Calendar for schedule management

### Backend Stack
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript for consistent type safety
- **Database**: Prisma ORM with PostgreSQL (production) / SQLite (development)
- **Authentication**: JWT tokens with secure HTTP-only patterns
- **Validation**: Zod schemas for request/response validation
- **Security**: Helmet, CORS, rate limiting, input sanitization
- **File Storage**: Local filesystem (expandable to cloud storage)
- **API Design**: RESTful endpoints with consistent response format

### Key Dependencies
```json
{
  "next": "15.3.3",
  "react": "^19.0.0",
  "typescript": "^5",
  "tailwindcss": "^4",
  "@radix-ui/react-*": "Various UI components",
  "axios": "^1.9.0",
  "next-auth": "^5.0.0-beta.28",
  "recharts": "^2.15.3",
  "react-big-calendar": "^1.19.2"
}
```

### Project Structure
```
ClassMate-AI/
├── frontend/                    # Next.js React application
│   ├── src/
│   │   ├── app/                # Next.js App Router pages
│   │   │   ├── (auth)/         # Authentication pages
│   │   │   ├── api/            # Frontend API routes
│   │   │   ├── layout.tsx      # Root layout
│   │   │   └── page.tsx        # Homepage (Dashboard)
│   │   ├── components/         # Reusable React components
│   │   │   ├── dashboard/      # Dashboard-specific components
│   │   │   ├── layout/         # Layout components (Navbar, Sidebar)
│   │   │   └── ui/             # Base UI components
│   │   ├── context/            # React Context providers
│   │   │   ├── AuthContext.tsx # Authentication state
│   │   │   ├── AppContext.tsx  # Global app state
│   │   │   └── ThemeContext.tsx# Theme management
│   │   ├── hooks/              # Custom React hooks
│   │   │   ├── useApi.ts       # API interaction hooks
│   │   │   ├── useAuth.ts      # Authentication hooks
│   │   │   └── useLocalStorage.ts # Local storage management
│   │   ├── lib/                # Utility libraries
│   │   │   ├── api.ts          # API client configuration
│   │   │   ├── constants.ts    # App constants
│   │   │   └── utils.ts        # Helper functions
│   │   └── types/              # TypeScript type definitions
│   ├── public/                 # Static assets
│   └── package.json           # Frontend dependencies
├── backend/                    # Express.js API server
│   ├── src/
│   │   ├── controllers/        # Route handlers and business logic
│   │   ├── middleware/         # Auth, validation, error handling
│   │   ├── routes/            # API endpoint definitions
│   │   ├── types/             # TypeScript type definitions
│   │   ├── utils/             # Helper functions and validation
│   │   └── server-working.ts  # Main application entry
│   ├── prisma/
│   │   └── schema.prisma      # Database schema
│   └── package.json           # Backend dependencies
└── README.md                  # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Modern web browser

### Quick Setup (Full Stack)

1. **Clone the repository**
   ```bash
   git clone https://github.com/Akp132/ClassMate-AI.git
   cd ClassMate-AI
   ```

2. **Start the Backend API Server**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   npm run dev
   ```
   Backend will run on http://localhost:5000

3. **Start the Frontend Application**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```
   Frontend will run on http://localhost:3000

### Backend API Server

The backend provides a RESTful API with:
- **Authentication**: JWT-based login system  
- **Classes**: Course management and scheduling
- **Assignments**: Task tracking with priorities and due dates
- **Attendance**: Class attendance recording and analytics
- **Grades**: Grade management with GPA calculation
- **Calendar**: Event management and scheduling
- **Dashboard**: Statistics and insights

**API Endpoints**: http://localhost:5000/api
**Documentation**: http://localhost:5000/api

### Frontend Installation (Standalone)

1. **Navigate to frontend directory**
   ```bash
   cd ClassMate-AI/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the frontend directory:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production-ready application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality

## 🔧 Configuration

### API Configuration
The application expects a backend API server running on `localhost:5000`. Update the API base URL in `src/lib/constants.ts`:

```typescript
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
```

### Authentication
Configure NextAuth.js providers in your environment variables and update the auth configuration as needed.

## 📊 Dashboard Overview

The main dashboard provides a comprehensive view of your academic progress:

### Stats Cards
- **Total Classes**: Number of active classes this semester
- **Assignments**: Pending vs completed assignments with weekly overview
- **Attendance**: Overall attendance percentage with monthly trends
- **GPA**: Current GPA with semester comparison

### Today's Schedule
- **Current Class**: Highlights the ongoing class
- **Upcoming Classes**: Shows next scheduled classes with room and instructor details
- **Quick Actions**: Direct access to common tasks

### AI Assistant Preview
- **Study Plan Optimization**: Personalized study recommendations
- **Deadline Alerts**: Priority-based assignment notifications
- **Performance Insights**: Academic progress analysis
- **Quick Chat**: Direct AI interaction for study help

### Assignment Management
- **Pending Assignments**: Categorized by priority (high, medium, low)
- **Completed Assignments**: Track of finished work
- **Progress Overview**: Visual representation of completion status

## 🤖 AI Features

### Intelligent Recommendations
The AI assistant analyzes your academic data to provide:
- Optimized study schedules based on exam dates and workload
- Assignment prioritization considering deadlines and difficulty
- Performance insights with actionable improvement suggestions
- Attendance pattern analysis and recommendations

### Study Planning
- Automated study plan generation
- Goal tracking and progress monitoring
- Adaptive scheduling based on your availability
- Performance-based study recommendations

## 🔌 API Integration

The application connects to a backend API with the following endpoints:

### Core APIs
- **Authentication**: `/api/auth/*` - User authentication and session management
- **Classes**: `/api/classes/*` - Class management and synchronization
- **Assignments**: `/api/assignments/*` - Assignment CRUD operations
- **Attendance**: `/api/attendance/*` - Attendance tracking and statistics
- **Grades**: `/api/grades/*` - Grade management and GPA calculation
- **Calendar**: `/api/calendar/*` - Event management and scheduling
- **Dashboard**: `/api/dashboard/stats` - Dashboard statistics

### Google Classroom Integration
- Automatic synchronization of classes and assignments
- Real-time updates from Google Classroom
- Bi-directional data sync capabilities

## 🎯 Key Components

### Dashboard Components
- **WelcomeSection**: Personalized greeting with quick stats
- **StatsCards**: Key metrics overview
- **TodaySchedule**: Current and upcoming classes
- **UpcomingAssignments**: Assignment management interface
- **AIAssistantPreview**: AI recommendations and chat interface
- **QuickActions**: Fast access to common tasks
- **RecentActivity**: Timeline of recent academic activities

### Layout Components
- **AppLayout**: Main application layout wrapper
- **Navbar**: Top navigation with user menu
- **Sidebar**: Side navigation menu
- **Footer**: Application footer

## 🔒 Security Features

- **Secure Authentication**: NextAuth.js with multiple provider support
- **API Token Management**: Automatic token refresh and validation
- **Route Protection**: Protected routes for authenticated users only
- **Data Validation**: Client-side and server-side validation
- **HTTPS Support**: SSL/TLS encryption for data transmission

## 🌐 Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/) and [React](https://reactjs.org/)
- UI components by [Radix UI](https://www.radix-ui.com/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Lucide React](https://lucide.dev/)

## 📞 Support

For support, email support@classmate-ai.com or open an issue on GitHub.

---

**ClassMate AI** - Empowering students with AI-driven academic success! 🎓✨