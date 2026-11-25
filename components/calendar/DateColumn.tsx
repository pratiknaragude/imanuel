"use client";

import { format, isSameDay } from "date-fns";
import { Plus } from "lucide-react";
import type { ScheduledVideo } from "@/lib/types";
import { VideoCard } from "./VideoCard";
import clsx from "clsx";

export function DateColumn({
  date,
  videos,
  onOpen,
  onAdd,
}: {
  date: Date;
  videos: ScheduledVideo[];
  onOpen: (v: ScheduledVideo) => void;
  onAdd: (date: Date) => void;
}) {
  const isToday = isSameDay(date, new Date());
  const primary = videos[0];
  const extra = videos.length - 1;

  return (
    <div className="flex w-[270px] shrink-0 snap-start flex-col gap-4">
      <div className="relative min-h-[380px]">
        {primary ? (
          <div className="relative">
            <VideoCard video={primary} onOpen={onOpen} />
            {extra > 0 && (
              <div className="absolute -bottom-2 left-1/2 z-10 -translate-x-1/2 rounded-full bg-obsidian px-2.5 py-0.5 font-mono text-[10px] text-white">
                +{extra} more
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => onAdd(date)}
            className="group flex h-[380px] w-full flex-col items-center justify-center rounded-2xl border border-dashed border-[#C8C8C2] bg-transparent transition hover:border-yellow hover:bg-yellow/5"
          >
            <span className="btn-neu-light opacity-0 transition group-hover:opacity-100">
              <Plus size={16} strokeWidth={1.75} />
              Add / Generate
            </span>
          </button>
        )}
      </div>

      <div className="border-t border-hairline pt-4">
        <div className="flex items-end gap-2">
          <div
            className={clsx(
              "font-display text-6xl font-extrabold leading-none tracking-tighter tabular-nums",
              isToday && "text-ink"
            )}
          >
            {isToday ? (
              <span className="inline-flex items-center justify-center rounded-xl bg-yellow px-2 py-0.5">
                {format(date, "d")}
              </span>
            ) : (
              format(date, "d")
            )}
          </div>
          <div className="mb-1.5 flex flex-col">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">
              {format(date, "EEE")}
            </span>
            <span className="text-[11px] font-medium uppercase tracking-wider text-muted">
              {format(date, "MMM")}
            </span>
          </div>
        </div>
        {isToday && <div className="mt-2 h-1 w-10 rounded-full bg-yellow" />}
      </div>
    </div>
  );
}
