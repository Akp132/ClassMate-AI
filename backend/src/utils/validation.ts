import { z } from 'zod';

// Auth validation schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  name: z.string().min(1, 'Name is required'),
  picture: z.string().url().optional(),
  googleId: z.string().optional(),
});

// Class validation schemas
export const classScheduleSchema = z.object({
  days: z.array(z.enum(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']))
    .min(1, 'At least one day is required'),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:MM)'),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:MM)'),
});

export const createClassSchema = z.object({
  name: z.string().min(1, 'Class name is required').max(100, 'Class name too long'),
  code: z.string().max(20, 'Class code too long').optional(),
  instructor: z.string().max(100, 'Instructor name too long').optional(),
  room: z.string().max(50, 'Room name too long').optional(),
  schedule: classScheduleSchema,
  color: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid color format').optional(),
  description: z.string().max(500, 'Description too long').optional(),
});

export const updateClassSchema = createClassSchema.partial();

// Assignment validation schemas
export const createAssignmentSchema = z.object({
  title: z.string().min(1, 'Assignment title is required').max(200, 'Title too long'),
  description: z.string().max(1000, 'Description too long').optional(),
  dueDate: z.string().datetime('Invalid date format'),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
  points: z.number().min(0, 'Points must be non-negative').max(1000, 'Points too high').optional(),
  classId: z.string().cuid('Invalid class ID'),
  submissionUrl: z.string().url('Invalid URL format').optional(),
});

export const updateAssignmentSchema = createAssignmentSchema.partial().omit({ classId: true });

export const markAssignmentCompleteSchema = z.object({
  completed: z.boolean(),
});

// Attendance validation schemas
export const markAttendanceSchema = z.object({
  classId: z.string().cuid('Invalid class ID'),
  date: z.string().date('Invalid date format'),
  status: z.enum(['PRESENT', 'ABSENT', 'LATE', 'EXCUSED']),
  notes: z.string().max(500, 'Notes too long').optional(),
});

export const updateAttendanceSchema = markAttendanceSchema.partial().omit({ classId: true });

// Grade validation schemas
export const createGradeSchema = z.object({
  score: z.number().min(0, 'Score must be non-negative'),
  maxScore: z.number().min(1, 'Max score must be positive').optional(),
  assignmentId: z.string().cuid('Invalid assignment ID'),
  classId: z.string().cuid('Invalid class ID'),
  feedback: z.string().max(1000, 'Feedback too long').optional(),
  gradeDate: z.string().datetime('Invalid date format').optional(),
});

export const updateGradeSchema = createGradeSchema.partial().omit({ assignmentId: true, classId: true });

// Calendar validation schemas
// Create a separate base schema for event updates
const eventBaseSchema = z.object({
  title: z.string().min(1, 'Event title is required').max(200, 'Title too long'),
  description: z.string().max(1000, 'Description too long').optional(),
  startTime: z.string().datetime('Invalid start time format'),
  endTime: z.string().datetime('Invalid end time format'),
  location: z.string().max(200, 'Location too long').optional(),
});

export const createEventSchema = eventBaseSchema.refine((data) => {
  const startTime = new Date(data.startTime);
  const endTime = new Date(data.endTime);
  return endTime > startTime;
}, {
  message: 'End time must be after start time',
  path: ['endTime'],
});

export const updateEventSchema = eventBaseSchema.partial();

// Query parameter validation schemas
export const paginationSchema = z.object({
  page: z.string().transform(val => parseInt(val)).pipe(z.number().min(1)).optional(),
  limit: z.string().transform(val => parseInt(val)).pipe(z.number().min(1).max(100)).optional(),
  sort: z.string().optional(),
  order: z.enum(['asc', 'desc']).optional(),
});

export const assignmentFiltersSchema = paginationSchema.extend({
  classId: z.string().cuid().optional(),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'OVERDUE']).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
  dueAfter: z.string().date().optional(),
  dueBefore: z.string().date().optional(),
});

export const attendanceFiltersSchema = paginationSchema.extend({
  classId: z.string().cuid().optional(),
  status: z.enum(['PRESENT', 'ABSENT', 'LATE', 'EXCUSED']).optional(),
  dateFrom: z.string().date().optional(),
  dateTo: z.string().date().optional(),
});

export const classFiltersSchema = paginationSchema.extend({
  search: z.string().optional(),
  instructor: z.string().optional(),
  day: z.enum(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']).optional(),
});