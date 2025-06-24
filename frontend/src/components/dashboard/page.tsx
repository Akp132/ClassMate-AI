'use client';

import { useEffect } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { TodaySchedule } from '@/components/dashboard/TodaySchedule';
import { UpcomingAssignments } from '@/components/dashboard/UpcomingAssignments';
import { AIAssistantPreview } from '@/components/dashboard/AIAssistantPreview';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { WelcomeSection } from '@/components/dashboard/WelcomeSection';
import { useAuthContext } from '../../context/AuthContext';
import { useAppContext } from '../../context/AppContext';
import { useApiQuery } from '../../hooks/useApi';
import { dashboardApi } from '../../lib/api';

export default function DashboardPage() {
  const { user } = useAuthContext();
  const { state, dispatch } = useAppContext();
  
  // Fetch dashboard stats
  const { data: statsData, loading: statsLoading } = useApiQuery(
    () => dashboardApi.getStats(),
    { immediate: true }
  );

  useEffect(() => {
    if (statsData?.data) {
      dispatch({ 
        type: 'SET_DASHBOARD_STATS', 
        payload: statsData.data 
      });
    }
  }, [statsData, dispatch]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <WelcomeSection 
          user={user}
          greeting={getGreeting()}
          stats={state.dashboardStats}
        />

        {/* Stats Cards */}
        <StatsCards 
          stats={state.dashboardStats}
          loading={statsLoading}
        />

        {/* Main Content Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Today's Schedule */}
          <div className="md:col-span-1">
            <TodaySchedule />
          </div>

          {/* Upcoming Assignments */}
          <div className="md:col-span-1">
            <UpcomingAssignments />
          </div>

          {/* Quick Actions */}
          <div className="md:col-span-1 lg:col-span-1">
            <QuickActions />
          </div>
        </div>

        {/* Secondary Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* AI Assistant Preview */}
          <div className="lg:col-span-2">
            <AIAssistantPreview />
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-1">
            <RecentActivity />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}