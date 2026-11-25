"use client";

import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { format } from "date-fns";
import { NeumorphicButton } from "@/components/ui/NeumorphicButton";
import { GlassPanel } from "@/components/ui/GlassPanel";
import clsx from "clsx";
import type { Platform } from "@/lib/types";

const ranges = ["14 Days", "30 Days", "Month"] as const;
const platforms: { id: Platform; label: string }[] = [
  { id: "all", label: "All" },
  { id: "reels", label: "Reels" },
  { id: "shorts", label: "Shorts" },
  { id: "linkedin", label: "LinkedIn" },
];

export function FloatingHeader({
  range,
  onRangeChange,
  platform,
  onPlatformChange,
  anchorDate,
  onPrev,
  onNext,
  onToday,
  onGenerate,
}: {
  range: (typeof ranges)[number];
  onRangeChange: (r: (typeof ranges)[number]) => void;
  platform: Platform;
  onPlatformChange: (p: Platform) => void;
  anchorDate: Date;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  onGenerate: () => void;
}) {
  return (
    <GlassPanel className="mx-4 flex flex-wrap items-center gap-4 px-5 py-3.5">
      <div className="flex rounded-xl bg-canvas p-1 shadow-neu-light">
        {ranges.map((r) => (
          <button
            key={r}
            onClick={() => onRangeChange(r)}
            className={clsx(
              "rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
              range === r
                ? "bg-white text-ink shadow-sm"
                : "text-muted hover:text-ink"
            )}
          >
            {r}
          </button>
        ))}
      </div>

      <div className="font-display text-sm font-bold tracking-tight text-ink">
        {format(anchorDate, "MMMM yyyy").toUpperCase()}
      </div>

      <div className="flex items-center gap-1">
        <button onClick={onPrev} className="btn-neu-light !p-2">
          <ChevronLeft size={16} strokeWidth={1.75} />
        </button>
        <button
          onClick={onToday}
          className="btn-neu-light !px-3 !py-1.5 text-xs"
        >
          Today
        </button>
        <button onClick={onNext} className="btn-neu-light !p-2">
          <ChevronRight size={16} strokeWidth={1.75} />
        </button>
      </div>

      <div className="flex gap-1.5">
        {platforms.map((p) => (
          <button
            key={p.id}
            onClick={() => onPlatformChange(p.id)}
            className={clsx(
              "rounded-full px-3 py-1 text-xs font-medium transition-colors",
              platform === p.id
                ? "bg-obsidian text-white"
                : "bg-canvas text-muted hover:text-ink"
            )}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="ml-auto">
        <NeumorphicButton variant="yellow" onClick={onGenerate}>
          <Plus size={16} strokeWidth={2} />
          Generate Content Plan
        </NeumorphicButton>
      </div>
    </GlassPanel>
  );
}
