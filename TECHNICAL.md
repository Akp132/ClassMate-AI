# ClassMate AI - Technical Documentation

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Component Structure](#component-structure)
3. [State Management](#state-management)
4. [API Integration](#api-integration)
5. [Authentication Flow](#authentication-flow)
6. [Data Models](#data-models)
7. [Development Workflow](#development-workflow)
8. [Performance Optimizations](#performance-optimizations)

## Architecture Overview

ClassMate AI follows a modern, scalable architecture built on Next.js 15 with the App Router pattern. The application is designed as a single-page application (SPA) with server-side rendering capabilities.

### High-Level Architecture
```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (Next.js)                   │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │   Pages     │  │ Components  │  │   Context   │     │
│  │  (App Dir)  │  │   (UI/UX)   │  │  (State)    │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │   Hooks     │  │     API     │  │   Types     │     │
│  │ (Logic)     │  │  (Client)   │  │ (TypeScript)│     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                   Backend API Server                    │
│              (Expected on localhost:5000)               │
└─────────────────────────────────────────────────────────┘
```

## Component Structure

### Core Components Hierarchy

```
App (layout.tsx)
├── ThemeProvider
├── AuthProvider
├── AppProvider
└── Pages
    ├── Dashboard (main page)
    │   ├── WelcomeSection
    │   ├── StatsCards
    │   ├── TodaySchedule
    │   ├── UpcomingAssignments
    │   ├── AIAssistantPreview
    │   ├── QuickActions
    │   └── RecentActivity
    ├── Authentication Pages
    │   ├── Login
    │   └── Callback
    └── Other Feature Pages
```

### Component Design Patterns

#### 1. Container/Presentational Pattern
```typescript
// Container Component (Logic)
export default function DashboardPage() {
  const { user } = useAuthContext();
  const { data, loading } = useApiQuery(dashboardApi.getStats);
  
  return <DashboardView user={user} data={data} loading={loading} />;
}

// Presentational Component (UI)
export function DashboardView({ user, data, loading }) {
  return (
    <AppLayout>
      <WelcomeSection user={user} />
      <StatsCards data={data} loading={loading} />
    </AppLayout>
  );
}
```

#### 2. Compound Component Pattern
```typescript
export function StatsCards({ stats, loading }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Classes"
        value={stats?.totalClasses || 0}
        description="Active this semester"
        trend={{ value: "+2", label: "from last semester" }}
        icon={BookOpen}
      />
      {/* More stat cards */}
    </div>
  );
}
```

## State Management

### Context Architecture

#### 1. AuthContext
Manages user authentication state and user profile information.

```typescript
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: UpdateProfileData) => Promise<void>;
}
```

#### 2. AppContext
Manages global application state using useReducer pattern.

```typescript
interface AppState {
  dashboardStats: DashboardStats | null;
  classes: Class[];
  assignments: Assignment[];
  grades: Grade[];
  attendance: AttendanceRecord[];
  settings: UserSettings;
}

type AppAction = 
  | { type: 'SET_DASHBOARD_STATS'; payload: DashboardStats }
  | { type: 'ADD_ASSIGNMENT'; payload: Assignment }
  | { type: 'UPDATE_ASSIGNMENT'; payload: { id: string; data: Partial<Assignment> } }
  | { type: 'DELETE_ASSIGNMENT'; payload: string };
```

#### 3. ThemeContext
Manages theme preferences and dark/light mode switching.

```typescript
interface ThemeContextType {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  resolvedTheme: 'light' | 'dark';
}
```

### Custom Hooks

#### useApiQuery Hook
```typescript
export function useApiQuery<T>(
  queryFn: () => Promise<ApiResponse<T>>,
  options: {
    immediate?: boolean;
    dependencies?: any[];
    onSuccess?: (data: T) => void;
    onError?: (error: any) => void;
  } = {}
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const execute = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await queryFn();
      setData(response.data);
      options.onSuccess?.(response.data);
    } catch (err) {
      setError(err);
      options.onError?.(err);
    } finally {
      setLoading(false);
    }
  }, [queryFn, options]);

  useEffect(() => {
    if (options.immediate) {
      execute();
    }
  }, [execute, options.immediate, ...(options.dependencies || [])]);

  return { data, loading, error, execute, refetch: execute };
}
```

## API Integration

### API Client Configuration

```typescript
// lib/api.ts
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

// Request interceptor for auth tokens
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error.response?.data || error);
  }
);
```

### API Service Layer

Each domain has its own API service:

```typescript
// Classes API
export const classesApi = {
  getAll: (): Promise<ApiResponse<Class[]>> => 
    apiClient.get(API_ENDPOINTS.CLASSES),
  
  getById: (id: string): Promise<ApiResponse<Class>> => 
    apiClient.get(`${API_ENDPOINTS.CLASSES}/${id}`),
  
  create: (data: CreateClassData): Promise<ApiResponse<Class>> => 
    apiClient.post(API_ENDPOINTS.CLASSES, data),
  
  update: (id: string, data: UpdateClassData): Promise<ApiResponse<Class>> => 
    apiClient.put(`${API_ENDPOINTS.CLASSES}/${id}`, data),
  
  delete: (id: string): Promise<ApiResponse> => 
    apiClient.delete(`${API_ENDPOINTS.CLASSES}/${id}`),
};
```

## Authentication Flow

### NextAuth.js Integration

```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
```

### Protected Routes
```typescript
// components/auth/ProtectedRoute.tsx
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthContext();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    redirect('/login');
  }

  return <>{children}</>;
}
```

## Data Models

### Core Types

```typescript
// types/classes.ts
export interface Class {
  id: string;
  name: string;
  code: string;
  instructor: string;
  schedule: ClassSchedule[];
  room: string;
  credits: number;
  semester: string;
  year: number;
  color: string;
  description?: string;
  googleClassroomId?: string;
  createdAt: string;
  updatedAt: string;
}

// types/assignments.ts
export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  classId: string;
  className: string;
  points: number;
  attachments: Attachment[];
  submissionUrl?: string;
  googleClassroomId?: string;
  createdAt: string;
  updatedAt: string;
}

// types/attendance.ts
export interface AttendanceRecord {
  id: string;
  classId: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// types/grades.ts
export interface Grade {
  id: string;
  assignmentId: string;
  classId: string;
  score: number;
  maxScore: number;
  percentage: number;
  letterGrade: string;
  gradeDate: string;
  feedback?: string;
  createdAt: string;
  updatedAt: string;
}
```

### API Response Types

```typescript
// types/api.ts
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
```

## Development Workflow

### Code Organization Standards

1. **File Naming**: Use PascalCase for components, camelCase for utilities
2. **Import Order**: External libraries, internal modules, relative imports
3. **Component Structure**: Props interface, main component, sub-components, exports

### TypeScript Standards

```typescript
// Prefer interfaces over types for objects
interface ComponentProps {
  title: string;
  optional?: boolean;
}

// Use discriminated unions for state
type LoadingState = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: any }
  | { status: 'error'; error: string };

// Strict type checking for API responses
const response = await api.getData() as ApiResponse<UserData>;
```

### Error Handling

```typescript
// Global error boundary
export class ErrorBoundary extends Component<Props, State> {
  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}
```

## Performance Optimizations

### Code Splitting
```typescript
// Lazy loading of components
const DashboardPage = lazy(() => import('@/components/dashboard/page'));
const AssignmentsPage = lazy(() => import('@/components/assignments/page'));

// Route-level code splitting with Next.js App Router
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      {children}
    </Suspense>
  );
}
```

### Memoization
```typescript
// Component memoization
export const StatsCard = memo(({ title, value, trend }: StatsCardProps) => {
  return (
    <Card>
      <CardHeader>{title}</CardHeader>
      <CardContent>{value}</CardContent>
    </Card>
  );
});

// Hook memoization
const memoizedStats = useMemo(() => {
  return computeExpensiveStats(assignments, grades);
}, [assignments, grades]);
```

### Bundle Optimization
- **Tree Shaking**: Only import used functions from libraries
- **Image Optimization**: Use Next.js Image component for automatic optimization
- **Font Optimization**: Use next/font for optimized font loading
- **CSS Optimization**: Tailwind CSS purging for production builds

### Monitoring and Analytics
```typescript
// Performance monitoring
useEffect(() => {
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      console.log(`${entry.name}: ${entry.duration}ms`);
    });
  });
  observer.observe({ entryTypes: ['navigation', 'paint'] });
}, []);
```

## Testing Strategy

### Unit Testing
```typescript
// Component testing with React Testing Library
describe('StatsCard', () => {
  it('renders title and value correctly', () => {
    render(<StatsCard title="Test" value="100" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });
});

// Hook testing
describe('useApiQuery', () => {
  it('handles loading states correctly', async () => {
    const { result } = renderHook(() => useApiQuery(mockApiCall));
    expect(result.current.loading).toBe(false);
  });
});
```

### Integration Testing
```typescript
// API integration testing
describe('Dashboard API Integration', () => {
  it('loads dashboard stats on mount', async () => {
    const mockStats = { totalClasses: 5, pendingAssignments: 3 };
    jest.spyOn(dashboardApi, 'getStats').mockResolvedValue({ data: mockStats });
    
    render(<DashboardPage />);
    
    await waitFor(() => {
      expect(screen.getByText('5')).toBeInTheDocument();
    });
  });
});
```

This technical documentation provides a comprehensive overview of the ClassMate AI application's architecture, implementation details, and development practices.