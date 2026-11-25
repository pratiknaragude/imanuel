import { addDays, format, setHours, setMinutes, startOfDay } from "date-fns";
import type { BrandProfile, QueueJob, ScheduledVideo } from "./types";

const today = startOfDay(new Date());

const sampleVerticalVideos = [
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
];

const hooks = [
  "Stop posting random content. Do this instead.",
  "I tested 47 hooks. Only 3 actually converted.",
  "Your competitors hate this one simple framework.",
  "The LinkedIn algorithm just changed. Here's what works.",
  "Why most Reels die in the first 1.5 seconds.",
  "Build in public without burning out.",
  "Claude + HeyGen = 30 posts in one afternoon.",
];

const titles = [
  "The Anti-Viral Framework",
  "Hooks That Actually Convert",
  "Calendar Systems for Founders",
  "BYOK Stack Walkthrough",
  "Style DNA Extraction Demo",
  "n8n Pipeline Deep Dive",
  "Yellow Accent Brand System",
];

function makeVideo(dayOffset: number, index: number): ScheduledVideo {
  const date = addDays(today, dayOffset);
  const hour = 9 + (index % 4);
  const scheduled = setMinutes(setHours(date, hour), index % 2 === 0 ? 0 : 30);
  const statuses: ScheduledVideo["status"][] = [
    "ready",
    "scheduled",
    "rendering",
    "draft",
    "published",
  ];
  const platforms: ScheduledVideo["platform"][] = [
    "reels",
    "shorts",
    "linkedin",
  ];

  return {
    id: `vid-${dayOffset}-${index}`,
    title: titles[(dayOffset + index) % titles.length],
    hook: hooks[(dayOffset + index) % hooks.length],
    script: `Hook: ${hooks[(dayOffset + index) % hooks.length]}\n\nBody: Walk through the exact system we use to ship consistent short-form without burning creative energy. Show the calendar, the Claude prompt chain, and the HeyGen handoff.\n\nCTA: Comment "SYSTEM" and I'll send the template.`,
    thumbnailUrl: `https://picsum.photos/seed/${dayOffset}${index}/540/960`,
    videoUrl:
      sampleVerticalVideos[
        (dayOffset + index) % sampleVerticalVideos.length
      ],
    platform: platforms[(dayOffset + index) % platforms.length],
    scheduledAt: scheduled.toISOString(),
    status: statuses[(dayOffset + index) % statuses.length],
    durationSec: 28 + ((dayOffset + index) % 20),
    heygenAvatarId: "Avatar_01",
    heygenVoiceId: "en-US-JennyNeural",
  };
}

export function generateCalendarVideos(days = 30): ScheduledVideo[] {
  const videos: ScheduledVideo[] = [];
  for (let d = -3; d < days; d++) {
    const count = d === 0 ? 2 : d % 5 === 0 ? 0 : d % 3 === 0 ? 2 : 1;
    for (let i = 0; i < count; i++) {
      videos.push(makeVideo(d, i));
    }
  }
  return videos;
}

export const mockBrand: BrandProfile = {
  voice:
    "Direct, contrarian, founder-to-founder. Short sentences. Zero fluff.",
  audience:
    "Solo founders and small marketing teams shipping short-form daily.",
  colors: ["#FFD600", "#0D0D0D", "#F5F5F3"],
  fonts: ["Bricolage Grotesque", "Plus Jakarta Sans"],
  styleDna: [
    "Fast Jump Cuts",
    "Bold Yellow Captions",
    "Contrarian Hooks",
    "Talking-head + B-roll",
    "Hard cuts on beat",
  ],
  sampleVideoUrls: sampleVerticalVideos.slice(0, 2),
};

export const mockQueue: QueueJob[] = [
  {
    id: "job-1",
    title: "The Anti-Viral Framework",
    stage: "heygen",
    progress: 62,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "job-2",
    title: "Hooks That Actually Convert",
    stage: "claude",
    progress: 100,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "job-3",
    title: "n8n Pipeline Deep Dive",
    stage: "failed",
    progress: 40,
    updatedAt: new Date().toISOString(),
    error: "HeyGen rate limit exceeded",
  },
  {
    id: "job-4",
    title: "Calendar Systems for Founders",
    stage: "scheduled",
    progress: 100,
    updatedAt: new Date().toISOString(),
  },
];

export function formatTime(iso: string) {
  return format(new Date(iso), "hh:mm a");
}
