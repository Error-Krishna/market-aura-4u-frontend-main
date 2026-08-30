import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";

import {
  getProfile,
  login as loginRequest,
  logout as logoutRequest,
  signup as signupRequest,
} from "@/features/auth/api/auth-api";
import { authStorage } from "@/lib/storage/auth-storage";

import { AuthContext } from "./auth-context";
import type { AuthContextValue, AuthUser, LoginRequest, SignupRequest } from "../types/auth.types";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshProfile = useCallback(async () => {
    const token = authStorage.getToken();

    if (!token) {
      setUser(null);
      return;
    }

    try {
      const response = await getProfile();

      setUser({
        id: response.data.id,
        email: response.data.email,
        isOnboarded: response.data.isOnboarded,
      });
    } catch {
      authStorage.clearToken();
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await refreshProfile();
      } finally {
        setIsLoading(false);
      }
    };

    void initializeAuth();
  }, [refreshProfile]);

  const login = useCallback(async (request: LoginRequest) => {
    const response = await loginRequest(request);

    authStorage.setToken(response.token);

    const authenticatedUser: AuthUser = {
      id: response.data.id,
      email: response.data.email,
      isOnboarded: response.data.isOnboarded,
    };

    setUser(authenticatedUser);

    return authenticatedUser;
  }, []);

  const signup = useCallback(async (request: SignupRequest) => {
    const response = await signupRequest(request);

    authStorage.setToken(response.token);

    const authenticatedUser: AuthUser = {
      id: response.data.id,
      email: response.data.email,
      isOnboarded: response.data.isOnboarded,
    };

    setUser(authenticatedUser);

    return authenticatedUser;
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutRequest();
    } finally {
      authStorage.clearToken();
      setUser(null);
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: user !== null,
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
