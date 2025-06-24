// types/auth.ts
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
}

export interface AuthSession {
  user: User;
  accessToken?: string;
  refreshToken?: string;
  expires: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface GoogleAuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}