"use client";

import { useCallback, useEffect, useState } from "react";
import { addDays, startOfDay } from "date-fns";
import { SideRail, type AppView } from "@/components/layout/SideRail";
import { FloatingHeader } from "@/components/layout/FloatingHeader";
import { HorizontalCalendar } from "@/components/calendar/HorizontalCalendar";
import { VideoReviewModal } from "@/components/modal/VideoReviewModal";
import { BrandBrainStudio } from "@/components/brand/BrandBrainStudio";
import { BYOKConnections } from "@/components/connections/BYOKConnections";
import { RenderQueue } from "@/components/queue/RenderQueue";
import { fetchScheduledVideos, generateContentPlan } from "@/lib/api";
import type { Platform, ScheduledVideo } from "@/lib/types";

type RangeLabel = "14 Days" | "30 Days" | "Month";

const rangeToDays: Record<RangeLabel, number> = {
  "14 Days": 14,
  "30 Days": 30,
  Month: 31,
};

export default function HomePage() {
  const [view, setView] = useState<AppView>("calendar");
  const [videos, setVideos] = useState<ScheduledVideo[]>([]);
  const [range, setRange] = useState<RangeLabel>("30 Days");
  const [platform, setPlatform] = useState<Platform>("all");
  const [anchor, setAnchor] = useState(() => startOfDay(new Date()));
  const [selected, setSelected] = useState<ScheduledVideo | null>(null);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    fetchScheduledVideos().then(setVideos);
  }, []);

  const onGenerate = useCallback(async () => {
    setGenerating(true);
    try {
      await generateContentPlan(rangeToDays[range]);
      const next = await fetchScheduledVideos();
      setVideos(next);
    } finally {
      setGenerating(false);
    }
  }, [range]);

  return (
    <div className="min-h-screen bg-canvas">
      <SideRail active={view} onChange={setView} />

      <main className="ml-16 min-h-screen">
        {view === "calendar" && (
          <div className="flex flex-col gap-5 pt-5">
            <FloatingHeader
              range={range}
              onRangeChange={setRange}
              platform={platform}
              onPlatformChange={setPlatform}
              anchorDate={anchor}
              onPrev={() => setAnchor((d) => addDays(d, -7))}
              onNext={() => setAnchor((d) => addDays(d, 7))}
              onToday={() => setAnchor(startOfDay(new Date()))}
              onGenerate={onGenerate}
            />
            {generating && (
              <p className="px-6 text-xs font-medium text-muted">
                Generating plan via Claude → n8n…
              </p>
            )}
            <HorizontalCalendar
              videos={videos}
              rangeDays={rangeToDays[range]}
              platform={platform}
              anchorDate={anchor}
              onOpen={setSelected}
              onAdd={() => {}}
            />
          </div>
        )}

        {view === "brand" && <BrandBrainStudio />}
        {view === "connections" && <BYOKConnections />}
        {view === "queue" && <RenderQueue />}
      </main>

      <VideoReviewModal video={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
