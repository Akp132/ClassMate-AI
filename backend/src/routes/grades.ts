import { Router } from 'express';
import { authenticate } from '@/middleware/auth-simple';

const router = Router();
router.use(authenticate);

// Placeholder routes - will be implemented in next iteration
router.get('/', (req, res) => {
  res.json({ success: true, data: [], message: 'Grades endpoint - coming soon' });
});

router.get('/gpa', (req, res) => {
  res.json({ 
    success: true, 
    data: {
      currentGPA: 0.0,
      semesterGPA: 0.0,
      totalCredits: 0,
      completedCredits: 0,
      gradeDistribution: [],
      trendData: []
    }, 
    message: 'GPA endpoint - coming soon' 
  });
});

export default router;