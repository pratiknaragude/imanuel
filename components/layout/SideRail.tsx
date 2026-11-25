"use client";

import { Calendar, Brain, KeyRound, ListChecks } from "lucide-react";
import { motion } from "framer-motion";
import clsx from "clsx";

export type AppView = "calendar" | "brand" | "connections" | "queue";

const items: { id: AppView; icon: typeof Calendar; label: string }[] = [
  { id: "calendar", icon: Calendar, label: "Calendar" },
  { id: "brand", icon: Brain, label: "Brand Brain" },
  { id: "connections", icon: KeyRound, label: "Connections" },
  { id: "queue", icon: ListChecks, label: "Queue" },
];

export function SideRail({
  active,
  onChange,
}: {
  active: AppView;
  onChange: (v: AppView) => void;
}) {
  return (
    <aside className="fixed left-0 top-0 z-40 flex h-full w-16 flex-col items-center border-r border-white/10 bg-obsidian py-6">
      <div className="mb-10 flex h-9 w-9 items-center justify-center rounded-lg bg-yellow font-display text-lg font-extrabold text-ink tracking-tighter">
        S
      </div>
      <nav className="flex flex-1 flex-col gap-2">
        {items.map(({ id, icon: Icon, label }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              title={label}
              className={clsx(
                "relative flex h-11 w-11 items-center justify-center rounded-xl transition-colors",
                isActive ? "text-yellow" : "text-white/70 hover:text-white"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="rail-active"
                  className="absolute left-0 h-6 w-1 rounded-r-full bg-yellow"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon strokeWidth={1.75} size={20} />
            </button>
          );
        })}
      </nav>
      <div
        className="mt-auto h-2 w-2 rounded-full bg-status-ready"
        title="Vault encrypted"
      />
    </aside>
  );
}
