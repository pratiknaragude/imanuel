export type Platform = "reels" | "shorts" | "linkedin" | "all";
export type VideoStatus =
  | "draft"
  | "rendering"
  | "ready"
  | "scheduled"
  | "published";

export interface ScheduledVideo {
  id: string;
  title: string;
  hook: string;
  script: string;
  thumbnailUrl: string;
  videoUrl: string;
  platform: Exclude<Platform, "all">;
  scheduledAt: string;
  status: VideoStatus;
  durationSec: number;
  heygenAvatarId?: string;
  heygenVoiceId?: string;
}

export interface BrandProfile {
  voice: string;
  audience: string;
  colors: string[];
  fonts: string[];
  styleDna: string[];
  sampleVideoUrls: string[];
}

export interface BYOKCredentials {
  anthropicKey: string;
  heygenKey: string;
  heygenAvatarId: string;
  heygenVoiceId: string;
  instagramConnected: boolean;
  youtubeConnected: boolean;
  linkedinConnected: boolean;
  n8nWebhookUrl: string;
}

export interface N8nWebhookPayload {
  action:
    | "generate_plan"
    | "render_heygen"
    | "approve_schedule"
    | "test_connection";
  payload: Record<string, unknown>;
}

export interface QueueJob {
  id: string;
  title: string;
  stage: "claude" | "heygen" | "editing" | "scheduled" | "failed";
  progress: number;
  updatedAt: string;
  error?: string;
}
