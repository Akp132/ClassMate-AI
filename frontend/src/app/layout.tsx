import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider, AppProvider, ThemeProvider } from '../context';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'ClassMate AI - Student Productivity App',
    template: '%s | ClassMate AI',
  },
  description: 'AI-powered student productivity app for managing classes, assignments, attendance, and grades.',
  keywords: [
    'student',
    'productivity',
    'education',
    'AI',
    'assignments',
    'grades',
    'attendance',
    'schedule',
    'Google Classroom',
  ],
  authors: [{ name: 'ClassMate AI Team' }],
  creator: 'ClassMate AI',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://classmate-ai.com',
    title: 'ClassMate AI - Student Productivity App',
    description: 'AI-powered student productivity app for managing classes, assignments, attendance, and grades.',
    siteName: 'ClassMate AI',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ClassMate AI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ClassMate AI - Student Productivity App',
    description: 'AI-powered student productivity app for managing classes, assignments, attendance, and grades.',
    images: ['/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider defaultTheme="system" storageKey="classmate-theme">
          <AuthProvider>
            <AppProvider>
              <div className="relative flex min-h-screen flex-col bg-background">
                {children}
              </div>
              <Toaster 
                position="top-right"
                expand={true}
                richColors
                closeButton
                toastOptions={{
                  duration: 4000,
                  className: 'toaster',
                }}
              />
            </AppProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}