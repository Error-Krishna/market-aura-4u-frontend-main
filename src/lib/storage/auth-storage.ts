const AUTH_TOKEN_KEY = "market-aura:auth-token";

export const authStorage = {
  getToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  },

  setToken(token: string): void {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  },

  clearToken(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  },
};
