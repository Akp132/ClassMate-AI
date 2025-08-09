import { Request } from 'express';

// Basic User type (will be replaced by Prisma generated type later)
export interface User {
  id: string;
  email: string;
  name: string;
  picture?: string | null;
  googleId?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Extend Express Request interface to include user
export interface AuthenticatedRequest extends Request {
  user?: User;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  pagination?: PaginationInfo;
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

// Auth types
export interface LoginData {
  email: string;
  name: string;
  picture?: string;
  googleId?: string;
}

export interface TokenPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

// Class types
export interface ClassSchedule {
  days: string[];
  startTime: string;
  endTime: string;
}

export interface CreateClassData {
  name: string;
  code?: string;
  instructor?: string;
  room?: string;
  schedule: ClassSchedule;
  color?: string;
  description?: string;
}

export interface UpdateClassData extends Partial<CreateClassData> {}

export interface ClassFilters {
  search?: string;
  instructor?: string;
  day?: string;
}

// Assignment types
export interface CreateAssignmentData {
  title: string;
  description?: string;
  dueDate: string;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
  points?: number;
  classId: string;
  submissionUrl?: string;
}

export interface UpdateAssignmentData extends Partial<CreateAssignmentData> {}

export interface AssignmentFilters {
  classId?: string;
  status?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'OVERDUE';
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
  dueAfter?: string;
  dueBefore?: string;
}

// Attendance types
export interface MarkAttendanceData {
  classId: string;
  date: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';
  notes?: string;
}

export interface UpdateAttendanceData extends Partial<MarkAttendanceData> {}

export interface AttendanceFilters {
  classId?: string;
  status?: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';
  dateFrom?: string;
  dateTo?: string;
}

export interface AttendanceStats {
  overallPercentage: number;
  totalClasses: number;
  attendedClasses: number;
  absentClasses: number;
  lateClasses: number;
  excusedClasses: number;
  monthlyStats: {
    month: string;
    percentage: number;
    attended: number;
    total: number;
  }[];
  classStats: {
    classId: string;
    className: string;
    percentage: number;
    attended: number;
    total: number;
  }[];
}

// Grade types
export interface CreateGradeData {
  score: number;
  maxScore?: number;
  assignmentId: string;
  classId: string;
  feedback?: string;
  gradeDate?: string;
}

export interface UpdateGradeData extends Partial<CreateGradeData> {}

export interface GPAData {
  currentGPA: number;
  semesterGPA: number;
  totalCredits: number;
  completedCredits: number;
  gradeDistribution: {
    grade: string;
    count: number;
    percentage: number;
  }[];
  trendData: {
    semester: string;
    gpa: number;
  }[];
}

// Calendar types
export interface CreateEventData {
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  location?: string;
}

export interface UpdateEventData extends Partial<CreateEventData> {}

// Dashboard types
export interface DashboardStats {
  totalClasses: number;
  totalAssignments: number;
  completedAssignments: number;
  pendingAssignments: number;
  overallAttendance: number;
  overallGPA: number;
  upcomingDeadlines: number;
  aiSuggestions: number;
}

// File upload types
export interface FileUploadResponse {
  id: string;
  filename: string;
  originalName: string;
  url: string;
  size: number;
  mimeType: string;
}

// Google Classroom types
export interface GoogleClassroomCourse {
  id: string;
  name: string;
  description?: string;
  room?: string;
  teacherFolder?: {
    id: string;
    title: string;
  };
  courseMaterialSets?: any[];
  calendarId?: string;
}

export interface GoogleClassroomAssignment {
  id: string;
  title: string;
  description?: string;
  dueDate?: {
    year: number;
    month: number;
    day: number;
  };
  dueTime?: {
    hours: number;
    minutes: number;
  };
  maxPoints?: number;
  courseId: string;
}

// Validation error types
export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}