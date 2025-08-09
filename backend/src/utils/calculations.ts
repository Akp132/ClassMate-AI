export const calculateGPA = (grades: { score: number; maxScore: number; credits?: number }[]): number => {
  if (grades.length === 0) return 0;

  const totalPoints = grades.reduce((sum, grade) => {
    const percentage = (grade.score / grade.maxScore) * 100;
    const gpaPoints = percentageToGPA(percentage);
    const credits = grade.credits || 1;
    return sum + (gpaPoints * credits);
  }, 0);

  const totalCredits = grades.reduce((sum, grade) => sum + (grade.credits || 1), 0);

  return totalCredits > 0 ? Math.round((totalPoints / totalCredits) * 100) / 100 : 0;
};

export const percentageToGPA = (percentage: number): number => {
  if (percentage >= 97) return 4.0;
  if (percentage >= 93) return 3.7;
  if (percentage >= 90) return 3.3;
  if (percentage >= 87) return 3.0;
  if (percentage >= 83) return 2.7;
  if (percentage >= 80) return 2.3;
  if (percentage >= 77) return 2.0;
  if (percentage >= 73) return 1.7;
  if (percentage >= 70) return 1.3;
  if (percentage >= 67) return 1.0;
  if (percentage >= 65) return 0.7;
  return 0.0;
};

export const percentageToLetterGrade = (percentage: number): string => {
  if (percentage >= 97) return 'A+';
  if (percentage >= 93) return 'A';
  if (percentage >= 90) return 'A-';
  if (percentage >= 87) return 'B+';
  if (percentage >= 83) return 'B';
  if (percentage >= 80) return 'B-';
  if (percentage >= 77) return 'C+';
  if (percentage >= 73) return 'C';
  if (percentage >= 70) return 'C-';
  if (percentage >= 67) return 'D+';
  if (percentage >= 65) return 'D';
  return 'F';
};

export const calculateAttendancePercentage = (
  attendanceRecords: { status: string }[]
): number => {
  if (attendanceRecords.length === 0) return 0;

  const presentCount = attendanceRecords.filter(
    record => record.status === 'PRESENT' || record.status === 'LATE'
  ).length;

  return Math.round((presentCount / attendanceRecords.length) * 100);
};