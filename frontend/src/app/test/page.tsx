'use client';

import { useState } from 'react';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { TodaySchedule } from '@/components/dashboard/TodaySchedule';
import { UpcomingAssignments } from '@/components/dashboard/UpcomingAssignments';
import { AIAssistantPreview } from '@/components/dashboard/AIAssistantPreview';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { WelcomeSection } from '@/components/dashboard/WelcomeSection';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Mock data for testing
const mockUser = {
  id: '1',
  email: 'test@student.edu',
  name: 'John Doe',
  avatar: 'https://via.placeholder.com/40',
  createdAt: new Date().toISOString(),
};

const mockStats = {
  totalClasses: 5,
  totalAssignments: 12,
  completedAssignments: 8,
  pendingAssignments: 4,
  overallAttendance: 87,
  overallGPA: 3.6,
  upcomingDeadlines: 3,
  aiSuggestions: 2,
};

export default function TestPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeComponent, setActiveComponent] = useState('dashboard');

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'welcome':
        return (
          <WelcomeSection 
            user={mockUser}
            greeting={getGreeting()}
            stats={mockStats}
          />
        );
      case 'stats':
        return (
          <StatsCards 
            stats={mockStats}
            loading={false}
          />
        );
      case 'schedule':
        return <TodaySchedule />;
      case 'assignments':
        return <UpcomingAssignments />;
      case 'actions':
        return <QuickActions />;
      case 'ai':
        return <AIAssistantPreview />;
      case 'activity':
        return <RecentActivity />;
      case 'dashboard':
      default:
        return (
          <div className="space-y-6">
            <WelcomeSection 
              user={mockUser}
              greeting={getGreeting()}
              stats={mockStats}
            />
            <StatsCards 
              stats={mockStats}
              loading={false}
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="md:col-span-1">
                <TodaySchedule />
              </div>
              <div className="md:col-span-1">
                <UpcomingAssignments />
              </div>
              <div className="md:col-span-1 lg:col-span-1">
                <QuickActions />
              </div>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <AIAssistantPreview />
              </div>
              <div className="lg:col-span-1">
                <RecentActivity />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className={`transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-64'}`}>
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="h-full"
        />
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)} />

        {/* Component Selector */}
        <div className="border-b bg-background p-4">
          <Card>
            <CardHeader>
              <CardTitle>🧪 Component Testing Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'dashboard', label: 'Full Dashboard' },
                  { id: 'welcome', label: 'Welcome Section' },
                  { id: 'stats', label: 'Stats Cards' },
                  { id: 'schedule', label: 'Today Schedule' },
                  { id: 'assignments', label: 'Assignments' },
                  { id: 'actions', label: 'Quick Actions' },
                  { id: 'ai', label: 'AI Assistant' },
                  { id: 'activity', label: 'Recent Activity' },
                ].map((component) => (
                  <Button
                    key={component.id}
                    variant={activeComponent === component.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setActiveComponent(component.id)}
                  >
                    {component.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Component Display */}
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto px-4 py-6">
            {renderComponent()}
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}