// types/api.ts
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface FileUploadResponse {
  id: string;
  filename: string;
  url: string;
  size: number;
  type: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  location?: string;
  googleEventId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventData {
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  location?: string;
}

export interface UpdateEventData extends Partial<CreateEventData> {
  id: string;
}

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