"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, RefreshCw, Play, Pause } from "lucide-react";
import type { ScheduledVideo } from "@/lib/types";
import { NeumorphicButton } from "@/components/ui/NeumorphicButton";
import { format } from "date-fns";
import { approveAndSchedulePost, triggerHeyGenRender } from "@/lib/api";

export function VideoReviewModal({
  video,
  onClose,
}: {
  video: ScheduledVideo | null;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [hook, setHook] = useState("");
  const [script, setScript] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (video) {
      setHook(video.hook);
      setScript(video.script);
      setPlaying(false);
    }
  }, [video]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!video) return null;

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      el.play();
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  const handleApprove = async () => {
    setBusy(true);
    try {
      await approveAndSchedulePost({
        ...video,
        hook,
        script,
        status: "scheduled",
      });
      onClose();
    } finally {
      setBusy(false);
    }
  };

  const handleRerender = async () => {
    setBusy(true);
    try {
      await triggerHeyGenRender(video.id);
    } finally {
      setBusy(false);
    }
  };

  return (
    <AnimatePresence>
      {video && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-[#0D0D0D]/80 backdrop-blur-2xl"
            onClick={onClose}
          />
          <motion.div
            layoutId={`video-${video.id}`}
            className="relative z-10 flex h-[min(90vh,820px)] w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-charcoal shadow-2xl"
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
          >
            <div className="relative flex w-[42%] flex-col items-center justify-center bg-obsidian p-6">
              <div className="relative aspect-[9/16] w-full max-w-[280px] overflow-hidden rounded-2xl">
                <video
                  ref={videoRef}
                  src={video.videoUrl}
                  poster={video.thumbnailUrl}
                  className="h-full w-full object-cover"
                  playsInline
                  onEnded={() => setPlaying(false)}
                />
                <button
                  onClick={togglePlay}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <span className="glass-dark flex h-12 w-12 items-center justify-center rounded-full">
                    {playing ? (
                      <Pause size={20} fill="white" />
                    ) : (
                      <Play size={20} fill="white" className="ml-0.5" />
                    )}
                  </span>
                </button>
              </div>
              <p className="mt-4 font-mono text-xs text-muted-dark">
                {video.durationSec}s · {video.platform}
              </p>
            </div>

            <div className="flex flex-1 flex-col border-l border-white/10 bg-white/5 p-6 text-white backdrop-blur-xl">
              <div className="mb-5 flex items-start justify-between">
                <div>
                  <h2 className="font-display text-xl font-bold tracking-tight">
                    {video.title}
                  </h2>
                  <p className="mt-1 font-mono text-xs text-muted-dark">
                    {format(
                      new Date(video.scheduledAt),
                      "EEE, MMM d · hh:mm a"
                    )}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white"
                >
                  <X size={18} strokeWidth={1.75} />
                </button>
              </div>

              <label className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-dark">
                Hook
              </label>
              <textarea
                value={hook}
                onChange={(e) => setHook(e.target.value)}
                rows={2}
                className="mb-4 w-full resize-none rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-yellow/50"
              />

              <label className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-dark">
                Full Script
              </label>
              <textarea
                value={script}
                onChange={(e) => setScript(e.target.value)}
                rows={7}
                className="mb-3 w-full flex-1 resize-none rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm leading-relaxed text-white outline-none focus:border-yellow/50"
              />

              <NeumorphicButton
                variant="light"
                className="mb-4 !bg-white/10 !text-white !shadow-none border border-white/15"
                onClick={() => {}}
              >
                <RefreshCw size={14} strokeWidth={1.75} />
                Regenerate Script via Claude
              </NeumorphicButton>

              <div className="mb-4 flex flex-wrap gap-2">
                <span className="rounded-lg border border-white/15 bg-white/5 px-2.5 py-1 font-mono text-[11px]">
                  Avatar · {video.heygenAvatarId}
                </span>
                <span className="rounded-lg border border-white/15 bg-white/5 px-2.5 py-1 font-mono text-[11px]">
                  Voice · {video.heygenVoiceId}
                </span>
                <button
                  onClick={handleRerender}
                  disabled={busy}
                  className="rounded-lg border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] hover:bg-white/10"
                >
                  Re-render via HeyGen
                </button>
              </div>

              <div className="mt-auto">
                <NeumorphicButton
                  variant="yellow"
                  className="w-full justify-center py-3"
                  onClick={handleApprove}
                  disabled={busy}
                >
                  {busy ? "Working…" : "Approve & Auto-Schedule"}
                </NeumorphicButton>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
