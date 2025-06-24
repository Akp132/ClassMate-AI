'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Class, Assignment, DashboardStats } from '../types';

interface AppState {
  // UI State
  sidebarCollapsed: boolean;
  currentPage: string;
  
  // Data State
  classes: Class[];
  assignments: Assignment[];
  dashboardStats: DashboardStats | null;
  
  // Loading States
  isLoadingClasses: boolean;
  isLoadingAssignments: boolean;
  isLoadingStats: boolean;
  
  // Filters and Search
  assignmentFilters: {
    classId?: string;
    completed?: boolean;
    priority?: 'low' | 'medium' | 'high';
    search?: string;
  };
  
  // User Preferences
  preferences: {
    theme: 'light' | 'dark' | 'system';
    notifications: boolean;
    autoSync: boolean;
    defaultView: 'list' | 'grid' | 'calendar';
    timeFormat: '12h' | '24h';
  };
}

type AppAction =
  | { type: 'SET_SIDEBAR_COLLAPSED'; payload: boolean }
  | { type: 'SET_CURRENT_PAGE'; payload: string }
  | { type: 'SET_CLASSES'; payload: Class[] }
  | { type: 'ADD_CLASS'; payload: Class }
  | { type: 'UPDATE_CLASS'; payload: Class }
  | { type: 'DELETE_CLASS'; payload: string }
  | { type: 'SET_ASSIGNMENTS'; payload: Assignment[] }
  | { type: 'ADD_ASSIGNMENT'; payload: Assignment }
  | { type: 'UPDATE_ASSIGNMENT'; payload: Assignment }
  | { type: 'DELETE_ASSIGNMENT'; payload: string }
  | { type: 'SET_DASHBOARD_STATS'; payload: DashboardStats }
  | { type: 'SET_LOADING_CLASSES'; payload: boolean }
  | { type: 'SET_LOADING_ASSIGNMENTS'; payload: boolean }
  | { type: 'SET_LOADING_STATS'; payload: boolean }
  | { type: 'SET_ASSIGNMENT_FILTERS'; payload: Partial<AppState['assignmentFilters']> }
  | { type: 'SET_PREFERENCES'; payload: Partial<AppState['preferences']> }
  | { type: 'RESET_STATE' };

const initialState: AppState = {
  sidebarCollapsed: false,
  currentPage: '',
  classes: [],
  assignments: [],
  dashboardStats: null,
  isLoadingClasses: false,
  isLoadingAssignments: false,
  isLoadingStats: false,
  assignmentFilters: {},
  preferences: {
    theme: 'system',
    notifications: true,
    autoSync: true,
    defaultView: 'list',
    timeFormat: '12h',
  },
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_SIDEBAR_COLLAPSED':
      return { ...state, sidebarCollapsed: action.payload };
      
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.payload };
      
    case 'SET_CLASSES':
      return { ...state, classes: action.payload };
      
    case 'ADD_CLASS':
      return { ...state, classes: [...state.classes, action.payload] };
      
    case 'UPDATE_CLASS':
      return {
        ...state,
        classes: state.classes.map(cls =>
          cls.id === action.payload.id ? action.payload : cls
        ),
      };
      
    case 'DELETE_CLASS':
      return {
        ...state,
        classes: state.classes.filter(cls => cls.id !== action.payload),
      };
      
    case 'SET_ASSIGNMENTS':
      return { ...state, assignments: action.payload };
      
    case 'ADD_ASSIGNMENT':
      return { ...state, assignments: [...state.assignments, action.payload] };
      
    case 'UPDATE_ASSIGNMENT':
      return {
        ...state,
        assignments: state.assignments.map(assignment =>
          assignment.id === action.payload.id ? action.payload : assignment
        ),
      };
      
    case 'DELETE_ASSIGNMENT':
      return {
        ...state,
        assignments: state.assignments.filter(assignment => assignment.id !== action.payload),
      };
      
    case 'SET_DASHBOARD_STATS':
      return { ...state, dashboardStats: action.payload };
      
    case 'SET_LOADING_CLASSES':
      return { ...state, isLoadingClasses: action.payload };
      
    case 'SET_LOADING_ASSIGNMENTS':
      return { ...state, isLoadingAssignments: action.payload };
      
    case 'SET_LOADING_STATS':
      return { ...state, isLoadingStats: action.payload };
      
    case 'SET_ASSIGNMENT_FILTERS':
      return {
        ...state,
        assignmentFilters: { ...state.assignmentFilters, ...action.payload },
      };
      
    case 'SET_PREFERENCES':
      return {
        ...state,
        preferences: { ...state.preferences, ...action.payload },
      };
      
    case 'RESET_STATE':
      return initialState;
      
    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  
  // Helper functions
  toggleSidebar: () => void;
  setCurrentPage: (page: string) => void;
  updatePreferences: (preferences: Partial<AppState['preferences']>) => void;
  clearFilters: () => void;
  resetApp: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [storedPreferences, setStoredPreferences] = useLocalStorage('user-preferences', initialState.preferences);
  const [sidebarCollapsed, setSidebarCollapsed] = useLocalStorage('sidebar-collapsed', false);

  // Sync localStorage with state
  useEffect(() => {
    dispatch({ type: 'SET_PREFERENCES', payload: storedPreferences });
  }, [storedPreferences]);

  useEffect(() => {
    dispatch({ type: 'SET_SIDEBAR_COLLAPSED', payload: sidebarCollapsed });
  }, [sidebarCollapsed]);

  // Helper functions
  const toggleSidebar = () => {
    const newValue = !state.sidebarCollapsed;
    setSidebarCollapsed(newValue);
    dispatch({ type: 'SET_SIDEBAR_COLLAPSED', payload: newValue });
  };

  const setCurrentPage = (page: string) => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: page });
  };

  const updatePreferences = (preferences: Partial<AppState['preferences']>) => {
    const newPreferences = { ...state.preferences, ...preferences };
    setStoredPreferences(newPreferences);
    dispatch({ type: 'SET_PREFERENCES', payload: preferences });
  };

  const clearFilters = () => {
    dispatch({ type: 'SET_ASSIGNMENT_FILTERS', payload: {} });
  };

  const resetApp = () => {
    dispatch({ type: 'RESET_STATE' });
  };

  const contextValue: AppContextType = {
    state,
    dispatch,
    toggleSidebar,
    setCurrentPage,
    updatePreferences,
    clearFilters,
    resetApp,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}