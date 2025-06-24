// lib/helpers.ts
import { format, parseISO, isToday, isTomorrow, isYesterday, differenceInDays } from 'date-fns';
import { GRADE_SCALE } from './constants';
import type { Grade, AttendanceRecord } from '../types';

// Date formatting helpers
export const formatDate = (date: string | Date, formatString: string = 'PPP'): string => {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return format(parsedDate, formatString);
};

export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
};

export const getRelativeDate = (date: string | Date): string => {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  
  if (isToday(parsedDate)) return 'Today';
  if (isTomorrow(parsedDate)) return 'Tomorrow';
  if (isYesterday(parsedDate)) return 'Yesterday';
  
  const daysDiff = differenceInDays(parsedDate, new Date());
  if (daysDiff > 0) {
    return `In ${daysDiff} day${daysDiff === 1 ? '' : 's'}`;
  } else {
    return `${Math.abs(daysDiff)} day${Math.abs(daysDiff) === 1 ? '' : 's'} ago`;
  }
};

export const getDaysUntilDue = (dueDate: string): number => {
  return differenceInDays(parseISO(dueDate), new Date());
};

export const isOverdue = (dueDate: string): boolean => {
  return getDaysUntilDue(dueDate) < 0;
};

// Grade calculation helpers
export const calculatePercentage = (score: number, maxScore: number): number => {
  return Math.round((score / maxScore) * 100);
};

export const getLetterGrade = (percentage: number): string => {
  for (const [letter, scale] of Object.entries(GRADE_SCALE)) {
    if (percentage >= scale.min && percentage <= scale.max) {
      return letter;
    }
  }
  return 'F';
};

export const calculateGPA = (grades: Grade[]): number => {
  if (grades.length === 0) return 0;
  
  let totalPoints = 0;
  let totalWeight = 0;
  
  grades.forEach(grade => {
    const percentage = calculatePercentage(grade.score, grade.maxScore);
    const letterGrade = getLetterGrade(percentage);
    const gpaPoints = GRADE_SCALE[letterGrade as keyof typeof GRADE_SCALE].gpa;
    
    totalPoints += gpaPoints * grade.weight;
    totalWeight += grade.weight;
  });
  
  return totalWeight > 0 ? Math.round((totalPoints / totalWeight) * 100) / 100 : 0;
};

export const calculateClassGPA = (classGrades: Grade[]): number => {
  return calculateGPA(classGrades);
};

// Attendance calculation helpers
export const calculateAttendancePercentage = (records: AttendanceRecord[]): number => {
  if (records.length === 0) return 0;
  
  const presentCount = records.filter(record => 
    record.status === 'present' || record.status === 'late'
  ).length;
  
  return Math.round((presentCount / records.length) * 100);
};

// Text formatting helpers
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

export const capitalizeFirst = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const formatName = (name: string): string => {
  return name
    .split(' ')
    .map(word => capitalizeFirst(word))
    .join(' ');
};

// File helpers
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const getFileExtension = (filename: string): string => {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
};

export const getFileIcon = (filename: string): string => {
  const extension = getFileExtension(filename).toLowerCase();
  
  switch (extension) {
    case 'pdf':
      return '📄';
    case 'doc':
    case 'docx':
      return '📝';
    case 'jpg':
    case 'jpeg':
    case 'png':
      return '🖼️';
    case 'txt':
      return '📃';
    default:
      return '📎';
  }
};

// Priority helpers
export const getPriorityColor = (priority: 'low' | 'medium' | 'high'): string => {
  const colors = {
    low: 'text-green-600 bg-green-50 border-green-200',
    medium: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    high: 'text-red-600 bg-red-50 border-red-200',
  };
  return colors[priority];
};

export const getAttendanceColor = (status: 'present' | 'absent' | 'late'): string => {
  const colors = {
    present: 'text-green-600 bg-green-50 border-green-200',
    absent: 'text-red-600 bg-red-50 border-red-200',
    late: 'text-yellow-600 bg-yellow-50 border-yellow-200',
  };
  return colors[status];
};

// Array helpers
export const groupBy = <T>(array: T[], key: keyof T): Record<string, T[]> => {
  return array.reduce((groups, item) => {
    const group = String(item[key]);
    groups[group] = groups[group] || [];
    groups[group].push(item);
    return groups;
  }, {} as Record<string, T[]>);
};

export const sortBy = <T>(array: T[], key: keyof T, direction: 'asc' | 'desc' = 'asc'): T[] => {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    
    if (aVal < bVal) return direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return direction === 'asc' ? 1 : -1;
    return 0;
  });
};

// Local storage helpers
export const getFromStorage = (key: string): any => {
  if (typeof window === 'undefined') return null;
  
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
};

export const setToStorage = (key: string, value: any): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error writing to localStorage:', error);
  }
};

export const removeFromStorage = (key: string): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};