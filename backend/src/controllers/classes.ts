import { Response, NextFunction } from 'express';
import { prisma } from '@/server';
import { AuthenticatedRequest, ApiResponse, CreateClassData, UpdateClassData } from '@/types';
import { createClassSchema, updateClassSchema, classFiltersSchema } from '@/utils/validation';
import { parsePaginationParams, calculatePaginationInfo, calculateSkip } from '@/utils/pagination';

export const classController = {
  // GET /api/classes
  getAll: async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: { code: 'UNAUTHORIZED', message: 'User not authenticated' },
        });
      }

      const filters = classFiltersSchema.parse(req.query);
      const { page, limit, sort, order } = parsePaginationParams(filters);
      const skip = calculateSkip(page, limit);

      // Build where clause
      const where: any = { userId: req.user.id };
      
      if (filters.search) {
        where.OR = [
          { name: { contains: filters.search, mode: 'insensitive' } },
          { code: { contains: filters.search, mode: 'insensitive' } },
          { instructor: { contains: filters.search, mode: 'insensitive' } },
        ];
      }

      if (filters.instructor) {
        where.instructor = { contains: filters.instructor, mode: 'insensitive' };
      }

      if (filters.day) {
        where.schedule = {
          path: ['days'],
          array_contains: [filters.day],
        };
      }

      // Get total count
      const total = await prisma.class.count({ where });

      // Get classes with related data
      const classes = await prisma.class.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sort]: order },
        include: {
          assignments: {
            select: {
              id: true,
              status: true,
            },
          },
          grades: {
            select: {
              percentage: true,
            },
          },
          attendance: {
            select: {
              status: true,
            },
          },
        },
      });

      // Calculate stats for each class
      const classesWithStats = classes.map(cls => {
        const totalAssignments = cls.assignments.length;
        const completedAssignments = cls.assignments.filter(a => a.status === 'COMPLETED').length;
        const averageGrade = cls.grades.length > 0 
          ? cls.grades.reduce((sum, g) => sum + g.percentage, 0) / cls.grades.length 
          : undefined;
        
        const attendancePercentage = cls.attendance.length > 0
          ? Math.round((cls.attendance.filter(a => a.status === 'PRESENT' || a.status === 'LATE').length / cls.attendance.length) * 100)
          : 0;

        return {
          id: cls.id,
          name: cls.name,
          code: cls.code,
          instructor: cls.instructor,
          room: cls.room,
          schedule: cls.schedule,
          color: cls.color,
          description: cls.description,
          googleClassroomId: cls.googleClassroomId,
          createdAt: cls.createdAt,
          updatedAt: cls.updatedAt,
          totalAssignments,
          completedAssignments,
          averageGrade: averageGrade ? Math.round(averageGrade * 100) / 100 : undefined,
          attendancePercentage,
        };
      });

      const pagination = calculatePaginationInfo(page, limit, total);

      const response: ApiResponse = {
        success: true,
        data: classesWithStats,
        pagination,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  },

  // GET /api/classes/:id
  getById: async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: { code: 'UNAUTHORIZED', message: 'User not authenticated' },
        });
      }

      const { id } = req.params;

      const classData = await prisma.class.findFirst({
        where: {
          id,
          userId: req.user.id,
        },
        include: {
          assignments: {
            orderBy: { dueDate: 'asc' },
          },
          grades: {
            include: {
              assignment: true,
            },
            orderBy: { gradeDate: 'desc' },
          },
          attendance: {
            orderBy: { date: 'desc' },
          },
        },
      });

      if (!classData) {
        return res.status(404).json({
          success: false,
          error: { code: 'CLASS_NOT_FOUND', message: 'Class not found' },
        });
      }

      const response: ApiResponse = {
        success: true,
        data: classData,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  },

  // POST /api/classes
  create: async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: { code: 'UNAUTHORIZED', message: 'User not authenticated' },
        });
      }

      const validatedData = createClassSchema.parse(req.body) as CreateClassData;

      const newClass = await prisma.class.create({
        data: {
          ...validatedData,
          userId: req.user.id,
        },
      });

      const response: ApiResponse = {
        success: true,
        data: newClass,
        message: 'Class created successfully',
      };

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  },

  // PUT /api/classes/:id
  update: async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: { code: 'UNAUTHORIZED', message: 'User not authenticated' },
        });
      }

      const { id } = req.params;
      const validatedData = updateClassSchema.parse(req.body) as UpdateClassData;

      // Check if class exists and belongs to user
      const existingClass = await prisma.class.findFirst({
        where: {
          id,
          userId: req.user.id,
        },
      });

      if (!existingClass) {
        return res.status(404).json({
          success: false,
          error: { code: 'CLASS_NOT_FOUND', message: 'Class not found' },
        });
      }

      const updatedClass = await prisma.class.update({
        where: { id },
        data: validatedData,
      });

      const response: ApiResponse = {
        success: true,
        data: updatedClass,
        message: 'Class updated successfully',
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  },

  // DELETE /api/classes/:id
  delete: async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: { code: 'UNAUTHORIZED', message: 'User not authenticated' },
        });
      }

      const { id } = req.params;

      // Check if class exists and belongs to user
      const existingClass = await prisma.class.findFirst({
        where: {
          id,
          userId: req.user.id,
        },
      });

      if (!existingClass) {
        return res.status(404).json({
          success: false,
          error: { code: 'CLASS_NOT_FOUND', message: 'Class not found' },
        });
      }

      await prisma.class.delete({
        where: { id },
      });

      const response: ApiResponse = {
        success: true,
        message: 'Class deleted successfully',
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  },

  // POST /api/classes/sync
  sync: async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: { code: 'UNAUTHORIZED', message: 'User not authenticated' },
        });
      }

      // TODO: Implement Google Classroom sync
      // This would involve using the Google Classroom API to fetch courses
      // and sync them with the local database

      const response: ApiResponse = {
        success: true,
        message: 'Google Classroom sync not yet implemented',
        data: [],
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  },
};