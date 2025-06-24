// types/classes.ts
export interface Class {
  id: string;
  name: string;
  code?: string;
  instructor?: string;
  room?: string;
  schedule: ClassSchedule;
  googleClassroomId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ClassSchedule {
  days: string[]; // ['monday', 'wednesday', 'friday']
  startTime: string; // '09:00'
  endTime: string; // '10:30'
}

export interface CreateClassData {
  name: string;
  code?: string;
  instructor?: string;
  room?: string;
  schedule: ClassSchedule;
}

export interface UpdateClassData extends Partial<CreateClassData> {
  id: string;
}

export interface ClassWithStats extends Class {
  totalAssignments: number;
  completedAssignments: number;
  averageGrade?: number;
  attendancePercentage: number;
}

export interface ClassFilters {
  search?: string;
  instructor?: string;
  day?: string;
}