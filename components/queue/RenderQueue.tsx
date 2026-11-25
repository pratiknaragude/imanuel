"use client";

import { useEffect, useState } from "react";
import type { QueueJob } from "@/lib/types";
import { fetchQueue } from "@/lib/api";
import { NeumorphicButton } from "@/components/ui/NeumorphicButton";
import { format } from "date-fns";
import clsx from "clsx";

const stages = ["claude", "heygen", "editing", "scheduled"] as const;
const stageLabel: Record<QueueJob["stage"], string> = {
  claude: "Claude Scripting",
  heygen: "HeyGen Rendering",
  editing: "Auto-Editing",
  scheduled: "Scheduled",
  failed: "Failed",
};

export function RenderQueue() {
  const [jobs, setJobs] = useState<QueueJob[]>([]);

  useEffect(() => {
    fetchQueue().then(setJobs);
  }, []);

  return (
    <div className="space-y-6 p-6">
      <header>
        <h1 className="font-display text-2xl font-extrabold tracking-tight">
          Render Queue & Activity
        </h1>
        <p className="mt-1 text-sm text-muted">
          Live pipeline: Claude → HeyGen → Edit → Schedule
        </p>
      </header>

      <div className="space-y-3">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="flex flex-col gap-3 rounded-2xl border border-hairline bg-surface p-4 shadow-sm sm:flex-row sm:items-center"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="truncate font-semibold">{job.title}</h3>
                <span
                  className={clsx(
                    "rounded-full px-2 py-0.5 text-[10px] font-medium uppercase",
                    job.stage === "failed"
                      ? "bg-red-100 text-red-700"
                      : job.stage === "scheduled"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow/30 text-ink"
                  )}
                >
                  {stageLabel[job.stage]}
                </span>
              </div>
              <p className="mt-0.5 font-mono text-[11px] text-muted">
                {format(new Date(job.updatedAt), "MMM d, HH:mm")}
                {job.error ? ` · ${job.error}` : ""}
              </p>
              <div className="mt-2 flex items-center gap-1.5">
                {stages.map((s, i) => {
                  const done =
                    job.stage === "scheduled" ||
                    stages.indexOf(job.stage as (typeof stages)[number]) > i;
                  const current = job.stage === s;
                  return (
                    <div key={s} className="flex items-center gap-1.5">
                      <span
                        className={clsx(
                          "h-2 w-2 rounded-full",
                          job.stage === "failed" &&
                            i === stages.indexOf("heygen")
                            ? "bg-red-500"
                            : done || current
                            ? "bg-yellow"
                            : "bg-[#E6E6E2]"
                        )}
                      />
                      {i < stages.length - 1 && (
                        <span className="h-px w-4 bg-[#E6E6E2]" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-24">
                <div className="h-1.5 overflow-hidden rounded-full bg-[#E6E6E2]">
                  <div
                    className="h-full rounded-full bg-yellow transition-all"
                    style={{ width: `${job.progress}%` }}
                  />
                </div>
                <p className="mt-0.5 text-right font-mono text-[10px] text-muted">
                  {job.progress}%
                </p>
              </div>
              {job.stage === "failed" && (
                <NeumorphicButton variant="light" className="!py-1.5 text-xs">
                  Retry
                </NeumorphicButton>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
