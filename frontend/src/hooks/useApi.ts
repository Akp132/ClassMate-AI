'use client';

import { useState, useCallback } from 'react';
import { useToast } from './useToast';

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: unknown) => void;
  showSuccessToast?: boolean;
  showErrorToast?: boolean;
  successMessage?: string;
}

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: unknown;
}

export function useApi<T = unknown>(
  apiCall: (...args: unknown[]) => Promise<T>,
  options: UseApiOptions<T> = {}
) {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const { toast } = useToast();

  const execute = useCallback(
    async (...args: unknown[]) => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        const result = await apiCall(...args);
        setState(prev => ({ ...prev, data: result, loading: false }));
        // Handle success
        if (options.onSuccess) {
          options.onSuccess(result);
        }
        if (options.showSuccessToast && options.successMessage) {
          toast({
            title: 'Success',
            description: options.successMessage,
          });
        }
        return result;
      } catch (error) {
        setState(prev => ({ ...prev, error, loading: false }));
        // Handle error
        if (options.onError) {
          options.onError(error);
        }
        if (options.showErrorToast !== false) {
          toast({
            title: 'Error',
            description: (error as Error)?.message || 'Something went wrong',
            variant: 'destructive',
          });
        }
        throw error;
      }
    },
    [apiCall, options, toast]
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}

// Specialized hooks for different API operations
export function useApiMutation<T = unknown>(
  apiCall: (...args: unknown[]) => Promise<T>,
  options: UseApiOptions<T> = {}
) {
  return useApi(apiCall, {
    showErrorToast: true,
    ...options,
  });
}

export function useApiQuery<T = unknown>(
  apiCall: () => Promise<T>,
  options: UseApiOptions<T> & { immediate?: boolean } = {}
) {
  const api = useApi(apiCall, {
    showErrorToast: true,
    ...options,
  });

  // Auto-execute on mount if immediate is true
  const { execute } = api;
  useState(() => {
    if (options.immediate !== false) {
      execute();
    }
  });

  return {
    ...api,
    refetch: execute,
  };
}