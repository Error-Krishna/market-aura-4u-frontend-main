import { apiClient } from "@/lib/api/client";
import type { SocialAccounts } from "../types/social.types";

export async function getSocialAccounts(): Promise<SocialAccounts> {
  const res = await apiClient.get("/v1/auth/profile");
  return {
    instagram: {
      isConnected: Boolean(res.data.data.socialAccounts?.instagram?.isConnected),
      instagramId: res.data.data.socialAccounts?.instagram?.instagramId,
    },
  };
}

export async function disconnectInstagram(): Promise<void> {
  // Simulate disconnection – no actual endpoint yet.
  return;
}
