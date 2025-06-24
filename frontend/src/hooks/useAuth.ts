'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { User } from '../types';

export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (session?.user) {
      setUser({
        id: session.userId || '',
        email: session.user.email || '',
        name: session.user.name || '',
        avatar: session.user.image || undefined,
        createdAt: new Date().toISOString(),
      });
    } else {
      setUser(null);
    }
  }, [session]);

  const login = async (callbackUrl?: string) => {
    try {
      await signIn('google', { 
        callbackUrl: callbackUrl || '/dashboard',
        redirect: true 
      });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut({ 
        callbackUrl: '/login',
        redirect: true 
      });
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const redirectToLogin = () => {
    router.push('/login');
  };

  const redirectToDashboard = () => {
    router.push('/dashboard');
  };

  return {
    // User data
    user,
    session,
    
    // Loading states
    isLoading: status === 'loading',
    isAuthenticated: !!session && !!user,
    
    // Auth methods
    login,
    logout,
    
    // Navigation helpers
    redirectToLogin,
    redirectToDashboard,
    
    // Tokens (for API calls)
    accessToken: session?.accessToken,
  };
}