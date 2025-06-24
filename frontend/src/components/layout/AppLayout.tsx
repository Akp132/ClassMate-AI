'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { useAppContext } from '../../context/AppContext';
import { useAuthContext } from '../../context/AuthContext';

interface AppLayoutProps {
  children: React.ReactNode;
}

const publicPaths = ['/login', '/signup', '/forgot-password', '/'];

export function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuthContext();
  const { state, dispatch, toggleSidebar } = useAppContext();
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check if current path is public (doesn't need auth)
  const isPublicPath = publicPaths.includes(pathname);

  // Handle mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Update current page in context
  useEffect(() => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: pathname });
  }, [pathname, dispatch]);

  // Handle mobile menu
  const handleMobileMenuToggle = () => {
    if (isMobile) {
      setMobileMenuOpen(!mobileMenuOpen);
    } else {
      toggleSidebar();
    }
  };

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
  };

  // Show loading spinner during auth check
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Public pages (login, landing, etc.) - no layout
  if (isPublicPath || !isAuthenticated) {
    return <>{children}</>;
  }

  // Main app layout for authenticated users
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isMobile && mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={handleMobileMenuClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 transition-transform duration-300 md:relative md:translate-x-0',
          isMobile
            ? mobileMenuOpen
              ? 'translate-x-0'
              : '-translate-x-full'
            : state.sidebarCollapsed
            ? 'w-16'
            : 'w-64'
        )}
      >
        <Sidebar
          collapsed={!isMobile && state.sidebarCollapsed}
          onToggle={handleMobileMenuToggle}
          className="h-full"
        />
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar onMenuClick={handleMobileMenuToggle} />

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto px-4 py-6">
            {children}
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}