import { apiClient } from "@/lib/api/client";
import type {
  GenerateContentRequest,
  GenerateContentResponse,
  PublishContentRequest,
  PublishContentResponse,
  ContentHistoryResponse,
} from "../types/content.types";

const BASE = "/v1/content";

export async function generateContent(
  request: GenerateContentRequest,
): Promise<GenerateContentResponse> {
  const res = await apiClient.post<GenerateContentResponse>(`${BASE}/generate`, request);
  return res.data;
}

export async function publishContent(
  request: PublishContentRequest,
): Promise<PublishContentResponse> {
  const res = await apiClient.post<PublishContentResponse>(`${BASE}/publish`, request);
  return res.data;
}

export async function getContentHistory(): Promise<ContentHistoryResponse> {
  const res = await apiClient.get<ContentHistoryResponse>(`${BASE}/history`);
  return res.data;
}
