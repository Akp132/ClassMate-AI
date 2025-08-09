# ClassMate AI Frontend

This is the frontend application for ClassMate AI, built with [Next.js](https://nextjs.org) 15 and React 19.

## 🚀 Quick Start

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the ClassMate AI dashboard.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages (login, callback)
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Dashboard homepage
├── components/            # React components
│   ├── dashboard/         # Dashboard-specific components
│   ├── layout/            # Layout components (AppLayout, Navbar, Sidebar)
│   └── ui/                # Reusable UI components (Button, Card, etc.)
├── context/               # React Context providers
│   ├── AuthContext.tsx    # Authentication state management
│   ├── AppContext.tsx     # Global application state
│   └── ThemeContext.tsx   # Theme management (light/dark)
├── hooks/                 # Custom React hooks
│   ├── useApi.ts          # API interaction hooks
│   ├── useAuth.ts         # Authentication hooks
│   └── useLocalStorage.ts # Local storage utilities
├── lib/                   # Utility libraries
│   ├── api.ts             # Axios API client
│   ├── constants.ts       # Application constants
│   └── utils.ts           # Helper functions
└── types/                 # TypeScript type definitions
    ├── auth.ts            # Authentication types
    ├── classes.ts         # Class management types
    └── index.ts           # Exported types
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15.3.3 with App Router
- **React**: 19.0.0 with latest features
- **TypeScript**: Full type safety
- **Styling**: Tailwind CSS 4 with custom components
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Authentication**: NextAuth.js 5.0 (beta)
- **HTTP Client**: Axios with interceptors
- **Charts**: Recharts for data visualization
- **Calendar**: React Big Calendar
- **Forms**: React Hook Form
- **State Management**: React Context + useReducer

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality

## ⚙️ Environment Setup

Create a `.env.local` file in the frontend directory:

```env
# Required
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
NEXT_PUBLIC_API_URL=http://localhost:5000

# Optional (for Google Classroom integration)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## 🎨 Key Features

### Dashboard Components
- **WelcomeSection**: Personalized greeting with motivational messages
- **StatsCards**: Key metrics (classes, assignments, attendance, GPA)
- **TodaySchedule**: Current and upcoming class schedule
- **UpcomingAssignments**: Assignment management with priority levels
- **AIAssistantPreview**: AI-powered study recommendations
- **QuickActions**: Fast access to common tasks
- **RecentActivity**: Timeline of recent academic activities

### AI Assistant Features
- **Study Plan Optimization**: Personalized study schedules
- **Assignment Prioritization**: Smart task prioritization
- **Performance Insights**: Academic progress analysis
- **Deadline Alerts**: Priority-based notifications

### Layout Components
- **AppLayout**: Main application wrapper with sidebar navigation
- **Navbar**: Top navigation with user menu and theme toggle
- **Sidebar**: Collapsible navigation menu
- **ThemeProvider**: Dark/light theme management

## 🔗 API Integration

The frontend connects to a backend API expected at `http://localhost:5000`. Key API endpoints:

- `GET /api/dashboard/stats` - Dashboard statistics
- `GET /api/classes` - Class management
- `GET /api/assignments` - Assignment CRUD
- `GET /api/attendance` - Attendance tracking
- `GET /api/grades` - Grade management
- `POST /api/auth/*` - Authentication

## 🎯 Development Guidelines

### Component Patterns
- Use functional components with hooks
- Implement container/presentational pattern for complex components
- Leverage compound components for related UI elements
- Use TypeScript interfaces for all props

### State Management
- Use Context API for global state
- Implement useReducer for complex state logic
- Create custom hooks for reusable logic
- Prefer local state for component-specific data

### Styling
- Use Tailwind CSS utility classes
- Create reusable components in `components/ui/`
- Follow responsive design principles
- Implement consistent spacing and typography

## 🔍 Troubleshooting

### Common Issues

1. **Font Loading Errors**: May occur due to network restrictions; app works with fallback fonts
2. **API Connection Refused**: Ensure backend server is running on port 5000
3. **Authentication Issues**: Check NEXTAUTH_SECRET and provider configuration
4. **Build Failures**: Clear `.next` cache and reinstall dependencies

### Performance Tips
- Use React.memo() for expensive components
- Implement lazy loading for routes
- Optimize images with Next.js Image component
- Enable Turbopack for faster development builds

## 📱 Mobile Support

The application is fully responsive and includes:
- Mobile-optimized navigation
- Touch-friendly interactions
- Responsive grid layouts
- Mobile-first design approach

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main branch

### Self-Hosted
1. Run `npm run build` to create production build
2. Run `npm run start` to serve the application
3. Configure reverse proxy (nginx) if needed

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features
- [React Documentation](https://react.dev/) - React concepts and patterns
- [Tailwind CSS](https://tailwindcss.com/docs) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/docs) - Accessible component primitives

## 🤝 Contributing

1. Follow the existing code style and patterns
2. Add TypeScript types for new features
3. Test on multiple screen sizes
4. Update documentation for significant changes
5. Run linting before committing

For detailed setup instructions, see [SETUP.md](../SETUP.md)
For technical documentation, see [TECHNICAL.md](../TECHNICAL.md)
