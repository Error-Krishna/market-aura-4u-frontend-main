import { useQuery } from "@tanstack/react-query";

import { getProfile } from "@/features/auth/api/auth-api";
import { useAuth } from "@/features/auth/hooks/use-auth";

export const PROFILE_QUERY_KEY = ["auth", "profile"] as const;

export function useProfile() {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: getProfile,
    enabled: isAuthenticated,
    select: (response) => response.data,
  });
}
