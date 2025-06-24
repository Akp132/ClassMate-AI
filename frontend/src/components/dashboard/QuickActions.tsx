'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Plus,
  Calendar,
  BookOpen,
  ClipboardList,
  BarChart3,
  Users,
  Brain,
  Upload,
  RefreshCw
} from 'lucide-react';
import Link from 'next/link';

const quickActions = [
  {
    title: 'Add Assignment',
    description: 'Create a new assignment',
    icon: Plus,
    href: '/assignments/new',
    color: 'bg-blue-500 hover:bg-blue-600',
    textColor: 'text-white'
  },
  {
    title: 'Mark Attendance',
    description: 'Record class attendance',
    icon: Calendar,
    href: '/attendance',
    color: 'bg-green-500 hover:bg-green-600',
    textColor: 'text-white'
  },
  {
    title: 'Add Grade',
    description: 'Enter assignment grade',
    icon: BarChart3,
    href: '/grades/new',
    color: 'bg-purple-500 hover:bg-purple-600',
    textColor: 'text-white'
  },
  {
    title: 'Create Class',
    description: 'Add a new class',
    icon: BookOpen,
    href: '/classes/new',
    color: 'bg-orange-500 hover:bg-orange-600',
    textColor: 'text-white'
  },
  {
    title: 'Sync Google',
    description: 'Update from Classroom',
    icon: RefreshCw,
    href: '/sync',
    color: 'bg-red-500 hover:bg-red-600',
    textColor: 'text-white'
  },
  {
    title: 'AI Assistant',
    description: 'Get study help',
    icon: Brain,
    href: '/ai',
    color: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600',
    textColor: 'text-white'
  }
];

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, index) => (
            <Link key={index} href={action.href}>
              <Button
                variant="outline"
                className={`w-full h-auto p-4 flex flex-col items-center gap-2 ${action.color} ${action.textColor} border-0 transition-all hover:scale-105 hover:shadow-lg`}
              >
                <action.icon className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-medium text-sm">{action.title}</div>
                  <div className="text-xs opacity-90">{action.description}</div>
                </div>
              </Button>
            </Link>
          ))}
        </div>
        
        {/* Additional Actions */}
        <div className="mt-4 pt-4 border-t space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">More Actions</h4>
          
          <div className="grid grid-cols-1 gap-2">
            <Button variant="ghost" size="sm" className="justify-start h-8" asChild>
              <Link href="/assignments/calendar">
                <Calendar className="h-4 w-4 mr-2" />
                View Assignment Calendar
              </Link>
            </Button>
            
            <Button variant="ghost" size="sm" className="justify-start h-8" asChild>
              <Link href="/upload">
                <Upload className="h-4 w-4 mr-2" />
                Upload Documents
              </Link>
            </Button>
            
            <Button variant="ghost" size="sm" className="justify-start h-8" asChild>
              <Link href="/classes">
                <Users className="h-4 w-4 mr-2" />
                Manage Classes
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}