'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  Chrome,
  BookOpen,
  Calendar,
  BarChart3,
  Brain,
  CheckCircle,
  ArrowRight,
  Sparkles,
  GraduationCap,
  Users,
  Clock
} from 'lucide-react';
import { useAuthContext } from '../../../context/AuthContext';
import { useToast } from '../../../hooks/useToast';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isAuthenticated, isLoading } = useAuthContext();
  const { toast } = useToast();
  const [isSigningIn, setIsSigningIn] = useState(false);
  
  const error = searchParams.get('error');
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  useEffect(() => {
    if (isAuthenticated) {
      router.push(callbackUrl);
    }
  }, [isAuthenticated, router, callbackUrl]);

  useEffect(() => {
    if (error) {
      toast({
        title: 'Authentication Error',
        description: 'Failed to sign in. Please try again.',
        variant: 'destructive',
      });
    }
  }, [error, toast]);

  const handleGoogleSignIn = async () => {
    try {
      setIsSigningIn(true);
      await login(callbackUrl);
    } catch (error) {
      console.error('Sign in error:', error);
      toast({
        title: 'Sign In Failed',
        description: 'Unable to sign in with Google. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSigningIn(false);
    }
  };

  const features = [
    {
      icon: BookOpen,
      title: 'Smart Class Management',
      description: 'Sync with Google Classroom automatically'
    },
    {
      icon: Calendar,
      title: 'Intelligent Scheduling',
      description: 'Never miss assignments or classes again'
    },
    {
      icon: BarChart3,
      title: 'Grade Tracking',
      description: 'Monitor your academic progress in real-time'
    },
    {
      icon: Brain,
      title: 'AI-Powered Insights',
      description: 'Get personalized study recommendations'
    }
  ];

  const benefits = [
    'Automatic Google Classroom integration',
    'Smart assignment reminders',
    'GPA calculation and tracking',
    'Attendance monitoring',
    'AI study recommendations',
    'Calendar synchronization'
  ];

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-8">
        <div className="grid w-full max-w-6xl grid-cols-1 gap-8 lg:grid-cols-2">
          
          {/* Left Side - Branding & Features */}
          <div className="flex flex-col justify-center space-y-8">
            {/* Logo & Title */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">ClassMate AI</h1>
                  <p className="text-muted-foreground">Your AI-powered study companion</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="gap-1">
                  <Sparkles className="h-3 w-3" />
                  AI-Powered
                </Badge>
                <Badge variant="secondary" className="gap-1">
                  <Users className="h-3 w-3" />
                  Student-Focused
                </Badge>
                <Badge variant="secondary" className="gap-1">
                  <Clock className="h-3 w-3" />
                  Real-time Sync
                </Badge>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="rounded-lg border bg-background/50 p-4 backdrop-blur-sm transition-colors hover:bg-background/80"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <feature.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-medium">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Benefits List */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">What you&apos;ll get:</h3>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="flex flex-col justify-center">
            <Card className="w-full max-w-md mx-auto shadow-xl border-0 bg-background/80 backdrop-blur-sm">
              <CardHeader className="space-y-2 text-center">
                <div className="flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <GraduationCap className="h-8 w-8" />
                  </div>
                </div>
                <CardTitle className="text-2xl">Welcome Back!</CardTitle>
                <CardDescription className="text-base">
                  Sign in to continue your academic journey
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Google Sign In Button */}
                <Button
                  size="lg"
                  className="w-full gap-3 h-12"
                  onClick={handleGoogleSignIn}
                  disabled={isSigningIn}
                >
                  {isSigningIn ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <Chrome className="h-5 w-5" />
                  )}
                  {isSigningIn ? 'Signing in...' : 'Continue with Google'}
                  {!isSigningIn && <ArrowRight className="h-4 w-4" />}
                </Button>

                {/* Info Box */}
                <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-950/50">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
                      <Chrome className="h-4 w-4" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-medium text-blue-900 dark:text-blue-100">
                        Google Integration Required
                      </h4>
                      <p className="text-sm text-blue-700 dark:text-blue-200">
                        We use Google to sync with Classroom and Calendar for the best experience.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Privacy Notice */}
                <p className="text-center text-xs text-muted-foreground">
                  By signing in, you agree to our{' '}
                  <button className="underline hover:text-foreground">
                    Terms of Service
                  </button>{' '}
                  and{' '}
                  <button className="underline hover:text-foreground">
                    Privacy Policy
                  </button>
                </p>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">10K+</div>
                <div className="text-sm text-muted-foreground">Students</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Schools</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">99%</div>
                <div className="text-sm text-muted-foreground">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}