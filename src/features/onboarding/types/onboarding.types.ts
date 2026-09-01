export const ONBOARDING_PLATFORMS = [
  "twitter",
  "linkedin",
  "instagram",
  "facebook",
  "email",
  "blog",
] as const;

export type OnboardingPlatform = (typeof ONBOARDING_PLATFORMS)[number];

export interface OnboardingRequest {
  companyName: string;
  industry: string;
  brandTone: string;
  uvp: string;
  targetAudience: string;
  platforms: OnboardingPlatform[];
}

export interface OnboardingResponse {
  success: boolean;
  message: string;
  user: {
    _id: string;
    email: string;
    onboardingCompleted: boolean;
  };
}
