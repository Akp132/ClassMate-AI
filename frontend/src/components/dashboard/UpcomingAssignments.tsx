'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  ClipboardList, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  Plus,
  ChevronRight,
  Calendar
} from 'lucide-react';
import { getRelativeDate, getDaysUntilDue, isOverdue } from '../../lib/helpers';

// Mock data - replace with real API call
const upcomingAssignments = [
  {
    id: '1',
    title: 'Computer Science Project',
    description: 'Build a web application using React',
    dueDate: '2025-06-12T23:59:00Z',
    priority: 'high' as const,
    completed: false,
    class: {
      id: '1',
      name: 'CS101',
      code: 'CS101'
    }
  },
  {
    id: '2',
    title: 'Math Homework #5',
    description: 'Chapter 8 exercises 1-20',
    dueDate: '2025-06-13T23:59:00Z',
    priority: 'medium' as const,
    completed: false,
    class: {
      id: '2',
      name: 'Mathematics',
      code: 'MATH201'
    }
  },
  {
    id: '3',
    title: 'Physics Lab Report',
    description: 'Motion analysis experiment writeup',
    dueDate: '2025-06-15T23:59:00Z',
    priority: 'medium' as const,
    completed: false,
    class: {
      id: '3',
      name: 'Physics',
      code: 'PHYS301'
    }
  },
  {
    id: '4',
    title: 'History Essay',
    description: 'World War II impact analysis',
    dueDate: '2025-06-18T23:59:00Z',
    priority: 'low' as const,
    completed: true,
    class: {
      id: '4',
      name: 'History',
      code: 'HIST101'
    }
  }
];

export function UpcomingAssignments() {
  const handleToggleComplete = (assignmentId: string) => {
    // TODO: Implement toggle completion
    console.log('Toggle assignment:', assignmentId);
  };

  const getPriorityColor = (priority: 'low' | 'medium' | 'high') => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-950 dark:text-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-950 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getDueDateColor = (dueDate: string) => {
    const daysUntil = getDaysUntilDue(dueDate);
    if (isOverdue(dueDate)) return 'text-red-600';
    if (daysUntil <= 1) return 'text-orange-600';
    if (daysUntil <= 3) return 'text-yellow-600';
    return 'text-muted-foreground';
  };

  const getDueDateIcon = (dueDate: string) => {
    const daysUntil = getDaysUntilDue(dueDate);
    if (isOverdue(dueDate)) return <AlertTriangle className="h-3 w-3" />;
    if (daysUntil <= 1) return <Clock className="h-3 w-3" />;
    return <Calendar className="h-3 w-3" />;
  };

  const incompleteAssignments = upcomingAssignments.filter(a => !a.completed);
  const completedAssignments = upcomingAssignments.filter(a => a.completed);

  return (
    <Card className="h-fit">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">Assignments</CardTitle>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
          <Button variant="ghost" size="sm">
            <ClipboardList className="h-4 w-4 mr-2" />
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {upcomingAssignments.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="font-medium text-muted-foreground mb-2">All caught up!</h3>
            <p className="text-sm text-muted-foreground">
              No assignments due soon. Great work!
            </p>
          </div>
        ) : (
          <>
            {/* Incomplete Assignments */}
            {incompleteAssignments.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground">
                  Pending ({incompleteAssignments.length})
                </h4>
                
                {incompleteAssignments.map((assignment) => (
                  <div
                    key={assignment.id}
                    className="p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={assignment.completed}
                        onCheckedChange={() => handleToggleComplete(assignment.id)}
                        className="mt-1"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium truncate">{assignment.title}</h4>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getPriorityColor(assignment.priority)}`}
                          >
                            {assignment.priority}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                          {assignment.description}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">
                            {assignment.class.code}
                          </span>
                          
                          <div className={`flex items-center gap-1 ${getDueDateColor(assignment.dueDate)}`}>
                            {getDueDateIcon(assignment.dueDate)}
                            <span>{getRelativeDate(assignment.dueDate)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <Button variant="ghost" size="sm">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Completed Assignments */}
            {completedAssignments.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground">
                  Completed ({completedAssignments.length})
                </h4>
                
                {completedAssignments.slice(0, 2).map((assignment) => (
                  <div
                    key={assignment.id}
                    className="p-3 rounded-lg border bg-muted/30 opacity-75"
                  >
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={assignment.completed}
                        onCheckedChange={() => handleToggleComplete(assignment.id)}
                        className="mt-1"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium truncate line-through text-muted-foreground">
                            {assignment.title}
                          </h4>
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">
                            {assignment.class.code}
                          </span>
                          
                          <span className="text-muted-foreground">
                            Completed
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {completedAssignments.length > 2 && (
                  <Button variant="ghost" size="sm" className="w-full">
                    View {completedAssignments.length - 2} more completed
                  </Button>
                )}
              </div>
            )}

            {/* Quick Stats */}
            <div className="pt-4 border-t">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-lg font-semibold text-primary">
                    {incompleteAssignments.length}
                  </div>
                  <div className="text-xs text-muted-foreground">Pending</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-green-600">
                    {completedAssignments.length}
                  </div>
                  <div className="text-xs text-muted-foreground">Completed</div>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}