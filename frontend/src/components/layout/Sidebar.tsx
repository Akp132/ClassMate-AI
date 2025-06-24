'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Home,
  BookOpen,
  ClipboardList,
  Calendar,
  BarChart3,
  Brain,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Zap,
  GraduationCap,
  CheckSquare,
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
  className?: string;
}

const navigationItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: Home,
    badge: null,
  },
  {
    title: 'Classes',
    href: '/classes',
    icon: BookOpen,
    badge: null,
  },
  {
    title: 'Assignments',
    href: '/assignments',
    icon: ClipboardList,
    badge: 'pending',
  },
  {
    title: 'Attendance',
    href: '/attendance',
    icon: CheckSquare,
    badge: null,
  },
  {
    title: 'Grades',
    href: '/grades',
    icon: BarChart3,
    badge: null,
  },
  {
    title: 'Calendar',
    href: '/calendar',
    icon: Calendar,
    badge: null,
  },
];

const aiItems = [
  {
    title: 'AI Assistant',
    href: '/ai',
    icon: Brain,
    badge: 'new',
  },
];

const settingsItems = [
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
    badge: null,
  },
  {
    title: 'Help & Support',
    href: '/help',
    icon: HelpCircle,
    badge: null,
  },
];

export function Sidebar({ collapsed = false, onToggle, className }: SidebarProps) {
  const pathname = usePathname();
  const { state } = useAppContext();

  const getBadgeContent = (badgeType: string | null) => {
    if (!badgeType) return null;

    switch (badgeType) {
      case 'pending':
        return state.dashboardStats?.pendingAssignments || 0;
      case 'new':
        return 'NEW';
      default:
        return null;
    }
  };

  const shouldShowBadge = (badgeType: string | null) => {
    const content = getBadgeContent(badgeType);
    return content && (typeof content === 'number' ? content > 0 : true);
  };

  return (
    <div
      className={cn(
        'relative flex h-full flex-col border-r bg-background transition-all duration-300',
        collapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b">
        {!collapsed && (
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Zap className="h-4 w-4" />
            </div>
            <span className="font-bold">ClassMate AI</span>
          </Link>
        )}
        
        {collapsed && (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground mx-auto">
            <Zap className="h-4 w-4" />
          </div>
        )}

        {/* Toggle Button */}
        {onToggle && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className={cn(
              'h-8 w-8 p-0',
              collapsed && 'absolute -right-3 top-4 border bg-background shadow-md'
            )}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-auto py-4">
        <nav className="space-y-1 px-3">
          {/* Main Navigation */}
          <div className="space-y-1">
            {!collapsed && (
              <div className="px-3 py-2">
                <h2 className="mb-2 text-xs font-semibold tracking-tight text-muted-foreground uppercase">
                  Main
                </h2>
              </div>
            )}
            
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              const badgeContent = getBadgeContent(item.badge);
              const showBadge = shouldShowBadge(item.badge);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                    collapsed && 'justify-center px-2'
                  )}
                >
                  <item.icon className={cn('h-4 w-4', collapsed && 'h-5 w-5')} />
                  {!collapsed && (
                    <>
                      <span className="flex-1">{item.title}</span>
                      {showBadge && (
                        <Badge
                          variant={
                            typeof badgeContent === 'number' ? 'destructive' : 'secondary'
                          }
                          className="ml-auto h-5 px-1.5 text-xs"
                        >
                          {badgeContent}
                        </Badge>
                      )}
                    </>
                  )}
                  
                  {/* Tooltip for collapsed state */}
                  {collapsed && showBadge && (
                    <div className="absolute left-full ml-2 hidden group-hover:block">
                      <Badge
                        variant={
                          typeof badgeContent === 'number' ? 'destructive' : 'secondary'
                        }
                        className="h-5 px-1.5 text-xs"
                      >
                        {badgeContent}
                      </Badge>
                    </div>
                  )}
                </Link>
              );
            })}
          </div>

          <Separator className="my-4" />

          {/* AI Section */}
          <div className="space-y-1">
            {!collapsed && (
              <div className="px-3 py-2">
                <h2 className="mb-2 text-xs font-semibold tracking-tight text-muted-foreground uppercase">
                  AI Features
                </h2>
              </div>
            )}
            
            {aiItems.map((item) => {
              const isActive = pathname === item.href;
              const badgeContent = getBadgeContent(item.badge);
              const showBadge = shouldShowBadge(item.badge);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                    collapsed && 'justify-center px-2'
                  )}
                >
                  <item.icon className={cn('h-4 w-4', collapsed && 'h-5 w-5')} />
                  {!collapsed && (
                    <>
                      <span className="flex-1">{item.title}</span>
                      {showBadge && (
                        <Badge
                          variant="secondary"
                          className="ml-auto h-5 px-1.5 text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                        >
                          {badgeContent}
                        </Badge>
                      )}
                    </>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Footer */}
      <div className="border-t p-3">
        <nav className="space-y-1">
          {settingsItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                  collapsed && 'justify-center px-2'
                )}
              >
                <item.icon className={cn('h-4 w-4', collapsed && 'h-5 w-5')} />
                {!collapsed && <span>{item.title}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User Stats (when not collapsed) */}
        {!collapsed && (
          <div className="mt-4 rounded-lg bg-muted p-3">
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Progress</span>
            </div>
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex justify-between">
                <span>Attendance</span>
                <span>85%</span>
              </div>
              <div className="flex justify-between">
                <span>Assignments</span>
                <span>{state.dashboardStats?.completedAssignments || 0}/{state.dashboardStats?.totalAssignments || 0}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}