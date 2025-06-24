'use client';

import { toast as sonnerToast } from 'sonner';

interface ToastOptions {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive' | 'success';
  duration?: number;
}

export function useToast() {
  const toast = (options: ToastOptions) => {
    const { title, description, variant = 'default', duration = 4000 } = options;

    const message = title && description ? `${title}: ${description}` : title || description || '';

    switch (variant) {
      case 'destructive':
        return sonnerToast.error(message, { duration });
      case 'success':
        return sonnerToast.success(message, { duration });
      default:
        return sonnerToast(message, { duration });
    }
  };

  const success = (message: string, duration?: number) => {
    return sonnerToast.success(message, { duration });
  };

  const error = (message: string, duration?: number) => {
    return sonnerToast.error(message, { duration });
  };

  const info = (message: string, duration?: number) => {
    return sonnerToast(message, { duration });
  };

  const loading = (message: string) => {
    return sonnerToast.loading(message);
  };

  const dismiss = (toastId?: string | number) => {
    return sonnerToast.dismiss(toastId);
  };

  return {
    toast,
    success,
    error,
    info,
    loading,
    dismiss,
  };
}