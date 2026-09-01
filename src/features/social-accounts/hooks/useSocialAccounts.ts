import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSocialAccounts, disconnectInstagram } from "../api/social-api";

export function useSocialAccounts() {
  return useQuery({
    queryKey: ["socialAccounts"],
    queryFn: getSocialAccounts,
  });
}

export function useDisconnectInstagram() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: disconnectInstagram,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["socialAccounts"] });
    },
  });
}
