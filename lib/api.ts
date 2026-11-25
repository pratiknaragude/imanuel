import type {
  BrandProfile,
  BYOKCredentials,
  N8nWebhookPayload,
  QueueJob,
  ScheduledVideo,
} from "./types";
import { generateCalendarVideos, mockBrand, mockQueue } from "./mock-data";

const USE_MOCK_DATA = true;
const N8N_BASE = process.env.NEXT_PUBLIC_N8N_WEBHOOK_BASE_URL ?? "";

async function postWebhook(payload: N8nWebhookPayload) {
  if (USE_MOCK_DATA || !N8N_BASE) {
    await new Promise((r) => setTimeout(r, 600));
    return { ok: true, mock: true };
  }
  const res = await fetch(`${N8N_BASE}/${payload.action}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload.payload),
  });
  if (!res.ok) throw new Error(`Webhook failed: ${res.status}`);
  return res.json();
}

export async function fetchScheduledVideos(): Promise<ScheduledVideo[]> {
  if (USE_MOCK_DATA) return generateCalendarVideos(30);
  return generateCalendarVideos(30);
}

export async function generateContentPlan(rangeDays: number) {
  return postWebhook({
    action: "generate_plan",
    payload: { rangeDays },
  });
}

export async function triggerHeyGenRender(videoId: string) {
  return postWebhook({
    action: "render_heygen",
    payload: { videoId },
  });
}

export async function approveAndSchedulePost(
  video: Partial<ScheduledVideo>
) {
  return postWebhook({
    action: "approve_schedule",
    payload: video,
  });
}

export async function testProviderConnection(
  provider: "anthropic" | "heygen" | "n8n",
  credentials: Partial<BYOKCredentials>
) {
  return postWebhook({
    action: "test_connection",
    payload: { provider, credentials },
  });
}

export async function fetchBrandProfile(): Promise<BrandProfile> {
  return mockBrand;
}

export async function fetchQueue(): Promise<QueueJob[]> {
  return mockQueue;
}
