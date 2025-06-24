// types/grades.ts
export interface Grade {
  id: string;
  score: number;
  maxScore: number;
  weight: number;
  type: string; // 'exam', 'assignment', 'quiz', 'project', etc.
  assignmentId?: string;
  classId: string;
  class: {
    id: string;
    name: string;
  };
  assignment?: {
    id: string;
    title: string;
  };
  createdAt: string;
}

export interface CreateGradeData {
  score: number;
  maxScore: number;
  weight?: number;
  type: string;
  assignmentId?: string;
  classId: string;
}

export interface UpdateGradeData extends Partial<CreateGradeData> {
  id: string;
}

export interface GPAData {
  overall: number;
  byClass: Array<{
    classId: string;
    className: string;
    gpa: number;
    creditHours: number;
    letterGrade: string;
  }>;
}

export interface GradeDistribution {
  A: number;
  B: number;
  C: number;
  D: number;
  F: number;
}

export interface ClassGradeStats {
  classId: string;
  className: string;
  averageScore: number;
  totalGrades: number;
  gpa: number;
  letterGrade: string;
  trend: 'improving' | 'declining' | 'stable';
  distribution: GradeDistribution;
}