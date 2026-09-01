export interface GenerateContentRequest {
  prompt: string;
  platforms: string[];
}

export interface GenerateContentResponse {
  jobId: string;
  status: string;
  generatedContent: Record<string, string>; // platform -> content
}

export interface PublishContentRequest {
  jobId: string;
  platform: string;
  content: string;
}

export interface PublishContentResponse {
  success: boolean;
  message: string;
  postId?: string;
}

export interface ContentHistoryItem {
  id: string;
  status: "processing" | "completed" | "failed";
  platforms: string[];
  originalContent: string;
  generatedContent: Record<string, string>;
  createdAt: string;
}

export interface ContentHistoryResponse {
  data: ContentHistoryItem[];
}
