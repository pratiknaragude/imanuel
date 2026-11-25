"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { addDays, startOfDay, isSameDay } from "date-fns";
import type { Platform, ScheduledVideo } from "@/lib/types";
import { DateColumn } from "./DateColumn";

export function HorizontalCalendar({
  videos,
  rangeDays,
  platform,
  anchorDate,
  onOpen,
  onAdd,
}: {
  videos: ScheduledVideo[];
  rangeDays: number;
  platform: Platform;
  anchorDate: Date;
  onOpen: (v: ScheduledVideo) => void;
  onAdd: (date: Date) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const days = useMemo(() => {
    const start = startOfDay(anchorDate);
    return Array.from({ length: rangeDays }, (_, i) => addDays(start, i));
  }, [anchorDate, rangeDays]);

  const byDay = useMemo(() => {
    const map = new Map<string, ScheduledVideo[]>();
    videos
      .filter((v) => platform === "all" || v.platform === platform)
      .forEach((v) => {
        const key = startOfDay(new Date(v.scheduledAt)).toISOString();
        const list = map.get(key) ?? [];
        list.push(v);
        map.set(key, list);
      });
    return map;
  }, [videos, platform]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el) return;
    isDragging.current = true;
    startX.current = e.pageX - el.offsetLeft;
    scrollLeft.current = el.scrollLeft;
    el.setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    trackRef.current.scrollLeft = scrollLeft.current - walk;
  }, []);

  const onPointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const todayIdx = days.findIndex((d) => isSameDay(d, new Date()));
    if (todayIdx >= 0) {
      const colWidth = 270 + 24;
      el.scrollTo({
        left: Math.max(0, todayIdx * colWidth - 80),
        behavior: "smooth",
      });
    }
  }, [days]);

  return (
    <div className="relative">
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        className="hide-scrollbar flex cursor-grab gap-6 overflow-x-auto px-6 pb-8 pt-2 snap-x snap-mandatory active:cursor-grabbing"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {days.map((date) => {
          const key = startOfDay(date).toISOString();
          return (
            <DateColumn
              key={key}
              date={date}
              videos={byDay.get(key) ?? []}
              onOpen={onOpen}
              onAdd={onAdd}
            />
          );
        })}
      </div>
      <div className="mx-6 h-1 overflow-hidden rounded-full bg-[#E6E6E2]">
        <div className="h-full w-1/4 rounded-full bg-yellow/80" />
      </div>
    </div>
  );
}
