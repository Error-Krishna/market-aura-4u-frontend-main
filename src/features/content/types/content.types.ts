export type ContentPlatform = "twitter" | "linkedin" | "blog" | "instagram" | "email";

export type ContentJobStatus = "processing" | "completed" | "failed";

export interface TwitterContent {
  text: string;
  image_url?: string;
}

export interface InstagramContent {
  caption: string;
  image_url?: string;
}

export interface EmailContent {
  subject: string;
  body: string;
}

export interface GeneratedContent {
  twitter?: TwitterContent[];
  linkedin?: string[];
  blog?: string[];
  instagram?: InstagramContent;
  email?: EmailContent;
  imageUrl?: string;
}

export interface GenerateContentRequest {
  prompt: string;
}

export interface ContentJob {
  id: string;
  userId: string;
  status: ContentJobStatus;
  platforms: string[];
  originalContent: string;
  generatedContent?: GeneratedContent;
  error?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface GenerateContentResponse {
  success: boolean;
  message: string;
  job: ContentJob;
}

export interface ContentHistoryResponse {
  success: boolean;
  jobs: ContentJob[];
}

export interface PublishContentRequest {
  jobId: string;
  platforms: ContentPlatform[];
}

export interface PublishResult {
  platform: string;
  success: boolean;
  message?: string;
  url?: string;
  tweetId?: string;
  real?: boolean;
  simulated?: boolean;
}

export interface PublishContentResponse {
  success: boolean;
  message: string;
  results: PublishResult[];
}
