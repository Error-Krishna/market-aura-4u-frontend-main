import { apiClient } from "@/lib/api/client";

import type { OnboardingRequest, OnboardingResponse } from "../types/onboarding.types";

const AUTH_BASE_PATH = "/v1/auth";

export async function completeOnboarding(request: OnboardingRequest): Promise<OnboardingResponse> {
  const response = await apiClient.post<OnboardingResponse>(
    `${AUTH_BASE_PATH}/onboarding`,
    request,
  );

  return response.data;
}
