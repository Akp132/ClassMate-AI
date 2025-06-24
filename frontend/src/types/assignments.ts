// types/assignments.ts
export interface Assignment {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  attachments?: AssignmentFile[];
  classId: string;
  class: {
    id: string;
    name: string;
    code?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface AssignmentFile {
  id: string;
  filename: string;
  url: string;
  size: number;
  type: string;
}

export interface CreateAssignmentData {
  title: string;
  description?: string;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
  classId: string;
  attachments?: File[];
}

export interface UpdateAssignmentData extends Partial<CreateAssignmentData> {
  id: string;
  completed?: boolean;
}

export interface AssignmentFilters {
  classId?: string;
  completed?: boolean;
  priority?: 'low' | 'medium' | 'high';
  dueDate?: string;
  search?: string;
  overdue?: boolean;
}

export interface UpcomingAssignment {
  id: string;
  title: string;
  dueDate: string;
  className: string;
  priority: 'low' | 'medium' | 'high';
  daysUntilDue: number;
}