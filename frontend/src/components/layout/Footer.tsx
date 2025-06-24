'use client';

import Link from 'next/link';
import { Heart, Zap } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* Left Section */}
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-primary-foreground">
              <Zap className="h-3 w-3" />
            </div>
            <span className="text-sm font-medium">ClassMate AI</span>
          </div>

          {/* Center Section */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link
              href="/privacy"
              className="transition-colors hover:text-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="transition-colors hover:text-foreground"
            >
              Terms of Service
            </Link>
            <Link
              href="/help"
              className="transition-colors hover:text-foreground"
            >
              Help & Support
            </Link>
            <Link
              href="/about"
              className="transition-colors hover:text-foreground"
            >
              About
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>© {currentYear} Made with</span>
            <Heart className="h-4 w-4 fill-red-500 text-red-500" />
            <span>for students</span>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-4 border-t pt-4 text-center text-xs text-muted-foreground">
          <p>
            Powered by AI • Integrated with Google Classroom & Calendar •{' '}
            <Link
              href="/api-status"
              className="underline transition-colors hover:text-foreground"
            >
              System Status
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}