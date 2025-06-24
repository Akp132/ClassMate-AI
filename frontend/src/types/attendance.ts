// types/attendance.ts
export interface AttendanceRecord {
  id: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  classId: string;
  class: {
    id: string;
    name: string;
  };
  createdAt: string;
}

export interface MarkAttendanceData {
  date: string;
  status: 'present' | 'absent' | 'late';
  classId: string;
}

export interface UpdateAttendanceData {
  id: string;
  status: 'present' | 'absent' | 'late';
}

export interface AttendanceStats {
  overall: number;
  byClass: Array<{
    classId: string;
    className: string;
    percentage: number;
    total: number;
    present: number;
    absent: number;
    late: number;
  }>;
}

export interface AttendanceFilters {
  classId?: string;
  status?: 'present' | 'absent' | 'late';
  startDate?: string;
  endDate?: string;
  month?: string;
}

export interface AttendanceCalendarEvent {
  date: string;
  status: 'present' | 'absent' | 'late';
  className: string;
  classId: string;
}