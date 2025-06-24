'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  MapPin, 
  User, 
  Calendar,
  ChevronRight,
  Coffee,
  BookOpen
} from 'lucide-react';
import { formatTime } from '../../lib/helpers';

// Mock data - replace with real API call
const todayClasses = [
  {
    id: '1',
    name: 'Computer Science 101',
    code: 'CS101',
    instructor: 'Dr. Johnson',
    room: 'Room 204A',
    startTime: '09:00',
    endTime: '10:30',
    type: 'lecture',
    status: 'upcoming' // upcoming, current, completed
  },
  {
    id: '2',
    name: 'Mathematics',
    code: 'MATH201',
    instructor: 'Prof. Smith',
    room: 'Room 101B',
    startTime: '11:00',
    endTime: '12:30',
    type: 'lecture',
    status: 'upcoming'
  },
  {
    id: '3',
    name: 'Physics Lab',
    code: 'PHYS301',
    instructor: 'Dr. Brown',
    room: 'Lab 3',
    startTime: '14:00',
    endTime: '16:00',
    type: 'lab',
    status: 'upcoming'
  }
];

export function TodaySchedule() {
  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const getClassStatus = (startTime: string, endTime: string) => {
    const now = getCurrentTime();
    if (now < startTime) return 'upcoming';
    if (now >= startTime && now <= endTime) return 'current';
    return 'completed';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current':
        return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-950 dark:text-green-300';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-300';
      case 'completed':
        return 'bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-950 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lab':
        return <BookOpen className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const nextClass = todayClasses.find(cls => getClassStatus(cls.startTime, cls.endTime) === 'upcoming');

  return (
    <Card className="h-fit">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">Today&apos;s Schedule</CardTitle>
        <Button variant="ghost" size="sm">
          <Calendar className="h-4 w-4 mr-2" />
          View All
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {todayClasses.length === 0 ? (
          <div className="text-center py-8">
            <Coffee className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium text-muted-foreground mb-2">No classes today!</h3>
            <p className="text-sm text-muted-foreground">
              Enjoy your free day or catch up on assignments.
            </p>
          </div>
        ) : (
          <>
            {/* Next Class Highlight */}
            {nextClass && (
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Next Class</span>
                </div>
                <h4 className="font-semibold">{nextClass.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {formatTime(nextClass.startTime)} - {formatTime(nextClass.endTime)}
                </p>
              </div>
            )}

            {/* All Classes */}
            <div className="space-y-3">
              {todayClasses.map((classItem) => {
                const status = getClassStatus(classItem.startTime, classItem.endTime);
                
                return (
                  <div
                    key={classItem.id}
                    className={`p-3 rounded-lg border transition-colors hover:bg-muted/50 ${
                      status === 'completed' ? 'opacity-60' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium truncate">{classItem.name}</h4>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getStatusColor(status)}`}
                          >
                            {status}
                          </Badge>
                        </div>
                        
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Clock className="h-3 w-3" />
                            <span>
                              {formatTime(classItem.startTime)} - {formatTime(classItem.endTime)}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <MapPin className="h-3 w-3" />
                            <span>{classItem.room}</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {getTypeIcon(classItem.type)}
                            <span>{classItem.instructor}</span>
                          </div>
                        </div>
                      </div>
                      
                      <Button variant="ghost" size="sm" className="ml-2">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}