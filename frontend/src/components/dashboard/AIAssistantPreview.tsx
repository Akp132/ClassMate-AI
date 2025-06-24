'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain,
  Sparkles,
  ArrowRight,
  Clock,
  BookOpen,
  Target,
  TrendingUp,
  MessageCircle
} from 'lucide-react';
import Link from 'next/link';

const aiSuggestions = [
  {
    id: '1',
    type: 'study_plan',
    title: 'Study Plan Optimization',
    message: 'Based on your upcoming exams, I recommend focusing on Math and Physics this week.',
    priority: 'high',
    action: 'Create Study Schedule',
    icon: Target
  },
  {
    id: '2',
    type: 'deadline_alert',
    title: 'Assignment Deadline Alert',
    message: 'You have 3 assignments due this week. Would you like me to help prioritize them?',
    priority: 'medium',
    action: 'Prioritize Tasks',
    icon: Clock
  },
  {
    id: '3',
    type: 'performance_insight',
    title: 'Performance Insight',
    message: 'Your attendance in CS101 is excellent! Keep it up to maintain your A grade.',
    priority: 'low',
    action: 'View Details',
    icon: TrendingUp
  }
];

export function AIAssistantPreview() {
  const getPriorityColor = (priority: string) => {
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

  return (
    <Card className="relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-purple-950/20 dark:via-pink-950/20 dark:to-blue-950/20" />
      
      <CardHeader className="relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <Brain className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">AI Assistant</CardTitle>
              <p className="text-sm text-muted-foreground">
                Personalized insights and recommendations
              </p>
            </div>
          </div>
          
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <Sparkles className="h-3 w-3 mr-1" />
            NEW
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="relative space-y-4">
        {/* AI Suggestions */}
        <div className="space-y-3">
          {aiSuggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="p-4 rounded-lg bg-background/80 backdrop-blur-sm border hover:bg-background/90 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary mt-1">
                  <suggestion.icon className="h-4 w-4" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm">{suggestion.title}</h4>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getPriorityColor(suggestion.priority)}`}
                    >
                      {suggestion.priority}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {suggestion.message}
                  </p>
                  
                  <Button size="sm" variant="outline" className="h-7">
                    {suggestion.action}
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Chat */}
        <div className="p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-200/50 dark:border-purple-800/50">
          <div className="flex items-center gap-3 mb-3">
            <MessageCircle className="h-5 w-5 text-purple-600" />
            <h4 className="font-medium">Ask AI Assistant</h4>
          </div>
          
          <p className="text-sm text-muted-foreground mb-3">
            Get instant help with your studies, schedule planning, or academic questions.
          </p>
          
          <div className="flex gap-2">
            <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0">
              Start Chat
            </Button>
            <Button size="sm" variant="outline" asChild>
              <Link href="/ai">
                View All Features
              </Link>
            </Button>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-3 gap-3 pt-2">
          <div className="text-center">
            <div className="h-8 w-8 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center mx-auto mb-1">
              <BookOpen className="h-4 w-4" />
            </div>
            <div className="text-xs font-medium">Study Plans</div>
          </div>
          
          <div className="text-center">
            <div className="h-8 w-8 rounded-lg bg-green-100 dark:bg-green-950 text-green-600 flex items-center justify-center mx-auto mb-1">
              <Target className="h-4 w-4" />
            </div>
            <div className="text-xs font-medium">Goal Tracking</div>
          </div>
          
          <div className="text-center">
            <div className="h-8 w-8 rounded-lg bg-orange-100 dark:bg-orange-950 text-orange-600 flex items-center justify-center mx-auto mb-1">
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-xs font-medium">Progress Insights</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}