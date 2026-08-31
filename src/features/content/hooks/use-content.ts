import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  generateContent,
  getContentHistory,
  publishContent,
} from "@/features/content/api/content-api";
import type {
  GenerateContentRequest,
  PublishContentRequest,
} from "@/features/content/types/content.types";

const CONTENT_QUERY_KEY = ["content"] as const;

export function useContentHistory() {
  return useQuery({
    queryKey: [...CONTENT_QUERY_KEY, "history"],
    queryFn: getContentHistory,
  });
}

export function useGenerateContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: GenerateContentRequest) => generateContent(request),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [...CONTENT_QUERY_KEY, "history"],
      });
    },
  });
}

export function usePublishContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: PublishContentRequest) => publishContent(request),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [...CONTENT_QUERY_KEY, "history"],
      });
    },
  });
}
