// lib/validations.ts
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateRequired = (value: any): boolean => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
};

export const validateMinLength = (value: string, minLength: number): boolean => {
  return value.length >= minLength;
};

export const validateMaxLength = (value: string, maxLength: number): boolean => {
  return value.length <= maxLength;
};

export const validateFileSize = (file: File, maxSize: number): boolean => {
  return file.size <= maxSize;
};

export const validateFileType = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.includes(file.type);
};

export const validateGradeScore = (score: number, maxScore: number): boolean => {
  return score >= 0 && score <= maxScore;
};

export const validateTimeFormat = (time: string): boolean => {
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(time);
};

export const validateDateFormat = (date: string): boolean => {
  const parsedDate = new Date(date);
  return !isNaN(parsedDate.getTime());
};

// Form validation rules
export const classValidationRules = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 100,
  },
  code: {
    required: false,
    maxLength: 20,
  },
  instructor: {
    required: false,
    maxLength: 100,
  },
  room: {
    required: false,
    maxLength: 50,
  },
};

export const assignmentValidationRules = {
  title: {
    required: true,
    minLength: 2,
    maxLength: 200,
  },
  description: {
    required: false,
    maxLength: 1000,
  },
  priority: {
    required: true,
    options: ['low', 'medium', 'high'],
  },
};

export const gradeValidationRules = {
  score: {
    required: true,
    min: 0,
  },
  maxScore: {
    required: true,
    min: 1,
  },
  weight: {
    required: false,
    min: 0,
    max: 1,
  },
  type: {
    required: true,
    minLength: 2,
    maxLength: 50,
  },
};

// Validation helper function
export const validateField = (
  value: any,
  rules: any
): { isValid: boolean; error?: string } => {
  if (rules.required && !validateRequired(value)) {
    return { isValid: false, error: 'This field is required' };
  }

  if (typeof value === 'string') {
    if (rules.minLength && !validateMinLength(value, rules.minLength)) {
      return { isValid: false, error: `Minimum length is ${rules.minLength}` };
    }

    if (rules.maxLength && !validateMaxLength(value, rules.maxLength)) {
      return { isValid: false, error: `Maximum length is ${rules.maxLength}` };
    }
  }

  if (typeof value === 'number') {
    if (rules.min !== undefined && value < rules.min) {
      return { isValid: false, error: `Minimum value is ${rules.min}` };
    }

    if (rules.max !== undefined && value > rules.max) {
      return { isValid: false, error: `Maximum value is ${rules.max}` };
    }
  }

  if (rules.options && !rules.options.includes(value)) {
    return { isValid: false, error: 'Invalid option selected' };
  }

  return { isValid: true };
};