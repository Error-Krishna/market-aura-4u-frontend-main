import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";

import {
  getProfile,
  login as loginRequest,
  logout as logoutRequest,
  signup as signupRequest,
} from "@/features/auth/api/auth-api";

import type { AuthUser, LoginRequest, SignupRequest } from "../types/auth.types";

import { AuthContext } from "./auth-context";

const TOKEN_KEY = "market-aura-auth-token";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const [isLoading, setIsLoading] = useState(() => Boolean(localStorage.getItem(TOKEN_KEY)));

  const refreshProfile = useCallback(async () => {
    try {
      const response = await getProfile();

      setUser({
        id: response.data.id,
        email: response.data.email,
        isOnboarded: response.data.isOnboarded,
      });
    } catch {
      setUser(null);
      localStorage.removeItem(TOKEN_KEY);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (!token) {
      return;
    }

    const initializeAuth = async () => {
      await refreshProfile();
      setIsLoading(false);
    };

    void initializeAuth();
  }, [refreshProfile]);

  const login = useCallback(async (request: LoginRequest) => {
    const response = await loginRequest(request);

    localStorage.setItem(TOKEN_KEY, response.token);
    setUser(response.data);

    return response.data;
  }, []);

  const signup = useCallback(async (request: SignupRequest) => {
    const response = await signupRequest(request);

    localStorage.setItem(TOKEN_KEY, response.token);
    setUser(response.data);

    return response.data;
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutRequest();
    } finally {
      localStorage.removeItem(TOKEN_KEY);
      setUser(null);
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      login,
      signup,
      logout,
      refreshProfile,
    }),
    [user, isLoading, login, signup, logout, refreshProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
