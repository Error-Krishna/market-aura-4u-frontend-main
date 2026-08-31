import { useMutation } from "@tanstack/react-query";

import { completeOnboarding } from "../api/onboarding-api";
import type { OnboardingRequest } from "../types/onboarding.types";

export function useCompleteOnboarding() {
  return useMutation({
    mutationFn: (request: OnboardingRequest) => completeOnboarding(request),
  });
}
