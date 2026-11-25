"use client";

import { Play } from "lucide-react";
import { motion } from "framer-motion";
import type { ScheduledVideo } from "@/lib/types";
import { formatTime } from "@/lib/mock-data";
import clsx from "clsx";

const statusColor: Record<ScheduledVideo["status"], string> = {
  ready: "bg-status-ready",
  scheduled: "bg-status-ready",
  published: "bg-status-ready",
  rendering: "bg-status-rendering",
  draft: "bg-status-draft",
};

const statusLabel: Record<ScheduledVideo["status"], string> = {
  ready: "Ready",
  scheduled: "Scheduled",
  published: "Published",
  rendering: "Rendering…",
  draft: "Draft",
};

export function VideoCard({
  video,
  onOpen,
}: {
  video: ScheduledVideo;
  onOpen: (v: ScheduledVideo) => void;
}) {
  return (
    <motion.button
      layoutId={`video-${video.id}`}
      onClick={() => onOpen(video)}
      whileHover={{ y: -3 }}
      className="group relative w-full overflow-hidden rounded-2xl border border-hairline bg-obsidian text-left shadow-sm aspect-[9/16]"
    >
      <img
        src={video.thumbnailUrl}
        alt={video.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <div className="absolute left-2.5 top-2.5 flex items-center gap-1.5">
        <span className="glass-dark rounded-md px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide">
          {video.platform}
        </span>
        <span className="font-mono text-[10px] text-white/90">
          {formatTime(video.scheduledAt)}
        </span>
      </div>
      <div className="absolute right-2.5 top-2.5">
        <span className="glass-dark flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-medium">
          <span
            className={clsx(
              "h-1.5 w-1.5 rounded-full",
              statusColor[video.status]
            )}
          />
          {statusLabel[video.status]}
        </span>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="glass-dark flex h-11 w-11 items-center justify-center rounded-full opacity-90 transition group-hover:scale-105">
          <Play size={18} fill="white" className="ml-0.5" />
        </span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-3">
        <p className="line-clamp-2 text-[12px] font-medium leading-snug text-white">
          {video.hook}
        </p>
      </div>
    </motion.button>
  );
}
