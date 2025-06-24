'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar,
  Bell,
  TrendingUp,
  Sparkles,
  Plus,
  BookOpen
} from 'lucide-react';
import type { User, DashboardStats } from '../../types';

interface WelcomeSectionProps {
  user: User | null;
  greeting: string;
  stats: DashboardStats | null;
}

export function WelcomeSection({ user, greeting, stats }: WelcomeSectionProps) {
  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getMotivationalMessage = () => {
    if (!stats) return "Ready to make today productive?";
    
    const completionRate = stats.totalAssignments > 0 
      ? (stats.completedAssignments / stats.totalAssignments) * 100 
      : 0;

    if (completionRate >= 80) return "You're crushing it! Keep up the excellent work! 🚀";
    if (completionRate >= 60) return "Great progress! You're on the right track! 📈";
    if (completionRate >= 40) return "Keep going! Every step counts! 💪";
    return "Let's make today count! You've got this! ✨";
  };

  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-6 text-white">
      {/* Background Pattern */}
     <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />

      
      <div className="relative z-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Welcome Content */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold lg:text-3xl">
              {greeting}, {user?.name?.split(' ')[0] || 'Student'}!
            </h1>
            <Sparkles className="h-6 w-6 text-yellow-300" />
          </div>
          
          <p className="text-blue-100">
            {getCurrentDate()}
          </p>
          
          <p className="text-lg font-medium text-white/90">
            {getMotivationalMessage()}
          </p>

          {/* Quick Stats */}
          {stats && (
            <div className="flex flex-wrap gap-3 pt-2">
              <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                <BookOpen className="mr-1 h-3 w-3" />
                {stats.totalClasses} Classes
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                <Calendar className="mr-1 h-3 w-3" />
                {stats.pendingAssignments} Pending
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                <TrendingUp className="mr-1 h-3 w-3" />
                {stats.overallGPA.toFixed(1)} GPA
              </Badge>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <Button 
            size="sm" 
            variant="secondary"
            className="bg-white/20 text-white border-white/30 hover:bg-white/30 backdrop-blur-sm"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Assignment
          </Button>
          
          <Button 
            size="sm" 
            variant="secondary"
            className="bg-white/20 text-white border-white/30 hover:bg-white/30 backdrop-blur-sm"
          >
            <Bell className="mr-2 h-4 w-4" />
            View Schedule
          </Button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10 blur-xl" />
      <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-white/10 blur-xl" />
    </div>
  );
}