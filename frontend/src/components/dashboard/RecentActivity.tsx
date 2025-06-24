'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Clock,
  CheckCircle,
  Plus,
  BookOpen,
  Calendar,
  BarChart3,
  Users,
  Activity
} from 'lucide-react';
import { getRelativeDate } from '../../lib/helpers';

// Mock data - replace with real API call
const recentActivities = [
  {
    id: '1',
    type: 'assignment_completed',
    title: 'Completed Math Homework #4',
    description: 'Chapter 7 exercises',
    timestamp: '2025-06-10T10:30:00Z',
    class: 'MATH201',
    icon: CheckCircle,
    color: 'text-green-600'
  },
  {
    id: '2',
    type: 'assignment_created',
    title: 'Added new assignment',
    description: 'Physics Lab Report due Friday',
    timestamp: '2025-06-10T09:15:00Z',
    class: 'PHYS301',
    icon: Plus,
    color: 'text-blue-600'
  },
  {
    id: '3',
    type: 'attendance_marked',
    title: 'Attended Computer Science class',
    description: 'Present for lecture on algorithms',
    timestamp: '2025-06-10T08:00:00Z',
    class: 'CS101',
    icon: Calendar,
    color: 'text-purple-600'
  },
  {
    id: '4',
    type: 'grade_added',
    title: 'Grade updated',
    description: 'Received A- on History essay',
    timestamp: '2025-06-09T16:45:00Z',
    class: 'HIST101',
    icon: BarChart3,
    color: 'text-orange-600'
  },
  {
    id: '5',
    type: 'class_joined',
    title: 'Joined new class',
    description: 'Enrolled in Advanced Chemistry',
    timestamp: '2025-06-09T14:20:00Z',
    class: 'CHEM401',
    icon: BookOpen,
    color: 'text-indigo-600'
  },
  {
    id: '6',
    type: 'sync_completed',
    title: 'Google Classroom sync',
    description: 'Updated assignments and classes',
    timestamp: '2025-06-09T12:00:00Z',
    class: null,
    icon: Users,
    color: 'text-green-600'
  }
];

export function RecentActivity() {
  const getActivityTypeLabel = (type: string) => {
    switch (type) {
      case 'assignment_completed':
        return 'Completed';
      case 'assignment_created':
        return 'Created';
      case 'attendance_marked':
        return 'Attended';
      case 'grade_added':
        return 'Graded';
      case 'class_joined':
        return 'Enrolled';
      case 'sync_completed':
        return 'Synced';
      default:
        return 'Activity';
    }
  };

  const getActivityTypeColor = (type: string) => {
    switch (type) {
      case 'assignment_completed':
        return 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300';
      case 'assignment_created':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300';
      case 'attendance_marked':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300';
      case 'grade_added':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300';
      case 'class_joined':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300';
      case 'sync_completed':
        return 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-950 dark:text-gray-300';
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
        <Button variant="ghost" size="sm">
          <Activity className="h-4 w-4 mr-2" />
          View All
        </Button>
      </CardHeader>
      
      <CardContent>
        {recentActivities.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium text-muted-foreground mb-2">No recent activity</h3>
            <p className="text-sm text-muted-foreground">
              Your activity will appear here as you use the app.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentActivities.slice(0, 6).map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                {/* Icon */}
                <div className={`p-2 rounded-lg bg-muted ${activity.color}`}>
                  <activity.icon className="h-4 w-4" />
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm truncate">
                      {activity.title}
                    </h4>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getActivityTypeColor(activity.type)}`}
                    >
                      {getActivityTypeLabel(activity.type)}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-1 line-clamp-1">
                    {activity.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{getRelativeDate(activity.timestamp)}</span>
                    {activity.class && (
                      <>
                        <span>•</span>
                        <span>{activity.class}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {recentActivities.length > 6 && (
              <div className="pt-2 border-t">
                <Button variant="ghost" size="sm" className="w-full">
                  View {recentActivities.length - 6} more activities
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}