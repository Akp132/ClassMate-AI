// lib/constants.ts
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  CLASSES: '/classes',
  ASSIGNMENTS: '/assignments',
  ATTENDANCE: '/attendance',
  GRADES: '/grades',
  CALENDAR: '/calendar',
  AI: '/ai',
} as const;

export const API_ENDPOINTS = {
  // Auth
  AUTH_ME: '/api/auth/me',
  AUTH_LOGOUT: '/api/auth/logout',
  
  // Classes
  CLASSES: '/api/classes',
  CLASSES_SYNC: '/api/classes/sync',
  
  // Assignments
  ASSIGNMENTS: '/api/assignments',
  ASSIGNMENTS_UPCOMING: '/api/assignments/upcoming',
  ASSIGNMENTS_SYNC: '/api/assignments/sync',
  
  // Attendance
  ATTENDANCE: '/api/attendance',
  ATTENDANCE_STATS: '/api/attendance/stats',
  
  // Grades
  GRADES: '/api/grades',
  GRADES_GPA: '/api/grades/gpa',
  
  // Calendar
  CALENDAR_EVENTS: '/api/calendar/events',
  CALENDAR_SYNC: '/api/calendar/sync',
} as const;

export const PRIORITY_COLORS = {
  low: 'text-green-600 bg-green-50',
  medium: 'text-yellow-600 bg-yellow-50',
  high: 'text-red-600 bg-red-50',
} as const;

export const ATTENDANCE_COLORS = {
  present: 'text-green-600 bg-green-50',
  absent: 'text-red-600 bg-red-50',
  late: 'text-yellow-600 bg-yellow-50',
} as const;

export const DAYS_OF_WEEK = [
  'monday',
  'tuesday', 
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday'
] as const;

export const GRADE_SCALE = {
  A: { min: 90, max: 100, gpa: 4.0 },
  B: { min: 80, max: 89, gpa: 3.0 },
  C: { min: 70, max: 79, gpa: 2.0 },
  D: { min: 60, max: 69, gpa: 1.0 },
  F: { min: 0, max: 59, gpa: 0.0 },
} as const;

export const FILE_UPLOAD = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
    'image/jpeg',
    'image/png',
  ],
  ALLOWED_EXTENSIONS: ['.pdf', '.doc', '.docx', '.txt', '.jpg', '.jpeg', '.png'],
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const;