// lib/api.ts
import axios, { AxiosResponse } from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from './constants';
import type {
  ApiResponse,
  Class,
  CreateClassData,
  UpdateClassData,
  Assignment,
  CreateAssignmentData,
  UpdateAssignmentData,
  AssignmentFilters,
  AttendanceRecord,
  MarkAttendanceData,
  UpdateAttendanceData,
  AttendanceStats,
  AttendanceFilters,
  Grade,
  CreateGradeData,
  UpdateGradeData,
  GPAData,
  CalendarEvent,
  CreateEventData,
  UpdateEventData,
  DashboardStats,
  PaginationParams,
} from '../types';

// Create axios instance
const apiClient = axios.create({
  baseURL: `${API_BASE_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth-token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login on unauthorized
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error.response?.data || error);
  }
);

// Auth API
export const authApi = {
  me: (): Promise<ApiResponse> => apiClient.get(API_ENDPOINTS.AUTH_ME),
  logout: (): Promise<ApiResponse> => apiClient.post(API_ENDPOINTS.AUTH_LOGOUT),
};

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
  
  sync: (): Promise<ApiResponse<Class[]>> => 
    apiClient.post(API_ENDPOINTS.CLASSES_SYNC),
};

// Assignments API
export const assignmentsApi = {
  getAll: (filters?: AssignmentFilters & PaginationParams): Promise<ApiResponse<Assignment[]>> => 
    apiClient.get(API_ENDPOINTS.ASSIGNMENTS, { params: filters }),
  
  getById: (id: string): Promise<ApiResponse<Assignment>> => 
    apiClient.get(`${API_ENDPOINTS.ASSIGNMENTS}/${id}`),
  
  create: (data: CreateAssignmentData): Promise<ApiResponse<Assignment>> => 
    apiClient.post(API_ENDPOINTS.ASSIGNMENTS, data),
  
  update: (id: string, data: UpdateAssignmentData): Promise<ApiResponse<Assignment>> => 
    apiClient.put(`${API_ENDPOINTS.ASSIGNMENTS}/${id}`, data),
  
  delete: (id: string): Promise<ApiResponse> => 
    apiClient.delete(`${API_ENDPOINTS.ASSIGNMENTS}/${id}`),
  
  markComplete: (id: string, completed: boolean): Promise<ApiResponse<Assignment>> => 
    apiClient.post(`${API_ENDPOINTS.ASSIGNMENTS}/${id}/complete`, { completed }),
  
  getUpcoming: (): Promise<ApiResponse<Assignment[]>> => 
    apiClient.get(API_ENDPOINTS.ASSIGNMENTS_UPCOMING),
  
  sync: (): Promise<ApiResponse<Assignment[]>> => 
    apiClient.post(API_ENDPOINTS.ASSIGNMENTS_SYNC),
};

// Attendance API
export const attendanceApi = {
  getAll: (filters?: AttendanceFilters & PaginationParams): Promise<ApiResponse<AttendanceRecord[]>> => 
    apiClient.get(API_ENDPOINTS.ATTENDANCE, { params: filters }),
  
  mark: (data: MarkAttendanceData): Promise<ApiResponse<AttendanceRecord>> => 
    apiClient.post(API_ENDPOINTS.ATTENDANCE, data),
  
  update: (id: string, data: UpdateAttendanceData): Promise<ApiResponse<AttendanceRecord>> => 
    apiClient.put(`${API_ENDPOINTS.ATTENDANCE}/${id}`, data),
  
  getStats: (): Promise<ApiResponse<AttendanceStats>> => 
    apiClient.get(API_ENDPOINTS.ATTENDANCE_STATS),
  
  getByClass: (classId: string): Promise<ApiResponse<AttendanceRecord[]>> => 
    apiClient.get(`${API_ENDPOINTS.ATTENDANCE}/class/${classId}`),
};

// Grades API
export const gradesApi = {
  getAll: (): Promise<ApiResponse<Grade[]>> => 
    apiClient.get(API_ENDPOINTS.GRADES),
  
  create: (data: CreateGradeData): Promise<ApiResponse<Grade>> => 
    apiClient.post(API_ENDPOINTS.GRADES, data),
  
  update: (id: string, data: UpdateGradeData): Promise<ApiResponse<Grade>> => 
    apiClient.put(`${API_ENDPOINTS.GRADES}/${id}`, data),
  
  delete: (id: string): Promise<ApiResponse> => 
    apiClient.delete(`${API_ENDPOINTS.GRADES}/${id}`),
  
  getGPA: (): Promise<ApiResponse<GPAData>> => 
    apiClient.get(API_ENDPOINTS.GRADES_GPA),
  
  getByClass: (classId: string): Promise<ApiResponse<Grade[]>> => 
    apiClient.get(`${API_ENDPOINTS.GRADES}/class/${classId}`),
};

// Calendar API
export const calendarApi = {
  getEvents: (): Promise<ApiResponse<CalendarEvent[]>> => 
    apiClient.get(API_ENDPOINTS.CALENDAR_EVENTS),
  
  createEvent: (data: CreateEventData): Promise<ApiResponse<CalendarEvent>> => 
    apiClient.post(API_ENDPOINTS.CALENDAR_EVENTS, data),
  
  updateEvent: (id: string, data: UpdateEventData): Promise<ApiResponse<CalendarEvent>> => 
    apiClient.put(`${API_ENDPOINTS.CALENDAR_EVENTS}/${id}`, data),
  
  deleteEvent: (id: string): Promise<ApiResponse> => 
    apiClient.delete(`${API_ENDPOINTS.CALENDAR_EVENTS}/${id}`),
  
  sync: (): Promise<ApiResponse<CalendarEvent[]>> => 
    apiClient.post(API_ENDPOINTS.CALENDAR_SYNC),
};

// Dashboard API
export const dashboardApi = {
  getStats: (): Promise<ApiResponse<DashboardStats>> => 
    apiClient.get('/api/dashboard/stats'),
};

// File Upload API
export const uploadApi = {
  uploadFile: (file: File): Promise<ApiResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    
    return apiClient.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  uploadFiles: (files: File[]): Promise<ApiResponse> => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });
    
    return apiClient.post('/api/upload/multiple', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default apiClient;