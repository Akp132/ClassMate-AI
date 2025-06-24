'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  ClipboardList, 
  Calendar, 
  BarChart3, 
  TrendingUp,
  TrendingDown,
  Minus,
  Users,
  CheckCircle
} from 'lucide-react';
import type { DashboardStats } from '../../types';

interface StatsCardsProps {
  stats: DashboardStats | null;
  loading?: boolean;
}

export function StatsCards({ stats, loading }: StatsCardsProps) {
  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 w-20 bg-muted rounded" />
              <div className="h-4 w-4 bg-muted rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-16 bg-muted rounded mb-2" />
              <div className="h-3 w-24 bg-muted rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: 'Total Classes',
      value: stats?.totalClasses?.toString() || '0',
      description: 'Active this semester',
      icon: BookOpen,
      trend: { value: '+2', label: 'from last semester', type: 'up' as const },
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950',
    },
    {
      title: 'Assignments',
      value: `${stats?.completedAssignments || 0}/${stats?.totalAssignments || 0}`,
      description: `${stats?.pendingAssignments || 0} pending`,
      icon: ClipboardList,
      trend: { 
        value: stats?.pendingAssignments ? `${stats.pendingAssignments} due` : '0 due', 
        label: 'this week', 
        type: (stats?.pendingAssignments || 0) > 3 ? 'down' as const : 'up' as const 
      },
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-950',
    },
    {
      title: 'Attendance',
      value: `${stats?.overallAttendance || 0}%`,
      description: 'Overall attendance',
      icon: Calendar,
      trend: { 
        value: stats?.overallAttendance && stats.overallAttendance >= 85 ? '+2%' : '-1%', 
        label: 'from last month', 
        type: stats?.overallAttendance && stats.overallAttendance >= 85 ? 'up' as const : 'down' as const 
      },
      color: (stats?.overallAttendance || 0) >= 85 ? 'text-green-600' : 'text-red-600',
      bgColor: (stats?.overallAttendance || 0) >= 85 ? 'bg-green-50 dark:bg-green-950' : 'bg-red-50 dark:bg-red-950',
    },
    {
      title: 'GPA',
      value: stats?.overallGPA?.toFixed(1) || '0.0',
      description: getGradeDescription(stats?.overallGPA || 0),
      icon: BarChart3,
      trend: { 
        value: '+0.2', 
        label: 'from last semester', 
        type: 'up' as const 
      },
      color: getGPAColor(stats?.overallGPA || 0),
      bgColor: getGPABgColor(stats?.overallGPA || 0),
    },
  ];

  function getGradeDescription(gpa: number): string {
    if (gpa >= 3.7) return 'Excellent performance';
    if (gpa >= 3.0) return 'Good performance';
    if (gpa >= 2.5) return 'Satisfactory';
    if (gpa >= 2.0) return 'Needs improvement';
    return 'Academic support needed';
  }

  function getGPAColor(gpa: number): string {
    if (gpa >= 3.7) return 'text-green-600';
    if (gpa >= 3.0) return 'text-blue-600';
    if (gpa >= 2.5) return 'text-yellow-600';
    return 'text-red-600';
  }

  function getGPABgColor(gpa: number): string {
    if (gpa >= 3.7) return 'bg-green-50 dark:bg-green-950';
    if (gpa >= 3.0) return 'bg-blue-50 dark:bg-blue-950';
    if (gpa >= 2.5) return 'bg-yellow-50 dark:bg-yellow-950';
    return 'bg-red-50 dark:bg-red-950';
  }

  function getTrendIcon(type: 'up' | 'down' | 'neutral') {
    switch (type) {
      case 'up':
        return <TrendingUp className="h-3 w-3" />;
      case 'down':
        return <TrendingDown className="h-3 w-3" />;
      default:
        return <Minus className="h-3 w-3" />;
    }
  }

  function getTrendColor(type: 'up' | 'down' | 'neutral') {
    switch (type) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-muted-foreground';
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {card.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${card.bgColor} group-hover:scale-110 transition-transform`}>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${card.color} mb-1`}>
              {card.value}
            </div>
            <p className="text-xs text-muted-foreground mb-2">
              {card.description}
            </p>
            <div className={`flex items-center gap-1 text-xs ${getTrendColor(card.trend.type)}`}>
              {getTrendIcon(card.trend.type)}
              <span>{card.trend.value}</span>
              <span className="text-muted-foreground">{card.trend.label}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}