'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { SessionProvider } from 'next-auth/react';
import { useAuth } from '../hooks/useAuth';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (callbackUrl?: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

function AuthProviderInner({ children }: AuthProviderProps) {
  const auth = useAuth();
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize auth state
  useEffect(() => {
    if (!auth.isLoading) {
      setIsInitialized(true);
    }
  }, [auth.isLoading]);

  const refreshUser = async () => {
    // Force refresh user data from the backend
    try {
      if (auth.accessToken) {
        // You can add API call here to refresh user data
        // const userData = await authApi.me();
        // Update user state if needed
      }
    } catch (error) {
      console.error('Failed to refresh user:', error);
    }
  };

  const contextValue: AuthContextType = {
    user: auth.user,
    isLoading: auth.isLoading || !isInitialized,
    isAuthenticated: auth.isAuthenticated,
    login: auth.login,
    logout: auth.logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function AuthProvider({ children }: AuthProviderProps) {
  return (
    <SessionProvider>
      <AuthProviderInner>{children}</AuthProviderInner>
    </SessionProvider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}