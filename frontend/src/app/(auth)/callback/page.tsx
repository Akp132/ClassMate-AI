'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthContext } from '../../../context/AuthContext';
import { Zap, CheckCircle, AlertCircle } from 'lucide-react';

export default function CallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, isLoading } = useAuthContext();
  
  const error = searchParams.get('error');
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  useEffect(() => {
    if (!isLoading) {
      if (error) {
        // Redirect to login with error
        router.push(`/login?error=${encodeURIComponent(error)}`);
      } else if (isAuthenticated) {
        // Successful authentication
        router.push(callbackUrl);
      } else {
        // No authentication, redirect to login
        router.push('/login');
      }
    }
  }, [isAuthenticated, isLoading, error, router, callbackUrl]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <AlertCircle className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-2xl font-bold">Authentication Failed</h1>
          <p className="text-muted-foreground max-w-md">
            We encountered an error during sign-in. You&apos;ll be redirected to try again.
          </p>
          <div className="flex justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400">
              <CheckCircle className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-2xl font-bold">Welcome to ClassMate AI!</h1>
          <p className="text-muted-foreground max-w-md">
            Authentication successful. Redirecting to your dashboard...
          </p>
          <div className="flex justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary text-primary-foreground animate-pulse">
            <Zap className="h-8 w-8" />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Setting up your account...</h1>
          <p className="text-muted-foreground max-w-md">
            We&apos;re preparing your ClassMate AI experience. This will just take a moment.
          </p>
        </div>
        
        {/* Loading Animation */}
        <div className="flex justify-center space-x-2">
          <div className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-2 w-2 bg-primary rounded-full animate-bounce"></div>
        </div>
        
        {/* Progress Steps */}
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center justify-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span>Authenticating with Google</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <span>Setting up your profile</span>
          </div>
          <div className="flex items-center justify-center gap-2 opacity-50">
            <div className="h-4 w-4 rounded-full border-2 border-muted" />
            <span>Syncing Google Classroom</span>
          </div>
        </div>
      </div>
    </div>
  );
}