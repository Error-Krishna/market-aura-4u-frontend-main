export interface AuthUser {
  id: string;
  email: string;
  isOnboarded: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  status: number;
  token: string;
  data: AuthUser;
}

export interface ProfileResponse {
  success: boolean;
  data: {
    id: string;
    isOnboarded: boolean;
    isUserPremium: boolean;
    joinedAt: string;
    name?: string;
    email: string;
    credits: {
      total: number;
      used: number;
      remaining: number;
    };
    companyName: string;
    industry: string;
    targetAudience: unknown;
    marketingGoal: string;
    brandVoice: {
      tone: string;
      description: string;
    };
    platforms: string[];
  };
}

export interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (request: LoginRequest) => Promise<AuthUser>;
  signup: (request: SignupRequest) => Promise<AuthUser>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}
