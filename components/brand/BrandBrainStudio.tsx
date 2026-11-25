"use client";

import { useEffect, useState } from "react";
import type { BrandProfile } from "@/lib/types";
import { fetchBrandProfile } from "@/lib/api";
import { NeumorphicButton } from "@/components/ui/NeumorphicButton";

export function BrandBrainStudio() {
  const [brand, setBrand] = useState<BrandProfile | null>(null);

  useEffect(() => {
    fetchBrandProfile().then(setBrand);
  }, []);

  if (!brand) {
    return <div className="p-8 text-muted">Loading brand profile…</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <header>
        <h1 className="font-display text-2xl font-extrabold tracking-tight">
          Brand Brain Studio
        </h1>
        <p className="mt-1 text-sm text-muted">
          Style DNA extracted from your samples — used by Claude & HeyGen.
        </p>
      </header>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <BentoCard title="Brand Voice">
          <textarea
            defaultValue={brand.voice}
            rows={4}
            className="w-full resize-none rounded-xl border border-hairline bg-canvas px-3 py-2 text-sm outline-none focus:border-yellow"
          />
        </BentoCard>

        <BentoCard title="Target Audience">
          <textarea
            defaultValue={brand.audience}
            rows={4}
            className="w-full resize-none rounded-xl border border-hairline bg-canvas px-3 py-2 text-sm outline-none focus:border-yellow"
          />
        </BentoCard>

        <BentoCard title="Colors & Fonts">
          <div className="mb-3 flex gap-2">
            {brand.colors.map((c) => (
              <div
                key={c}
                className="h-9 w-9 rounded-lg border border-hairline"
                style={{ backgroundColor: c }}
                title={c}
              />
            ))}
          </div>
          <ul className="space-y-1 text-sm text-muted">
            {brand.fonts.map((f) => (
              <li key={f} className="font-mono text-xs">
                {f}
              </li>
            ))}
          </ul>
        </BentoCard>

        <BentoCard title="Style DNA" className="md:col-span-2">
          <div className="flex flex-wrap gap-2">
            {brand.styleDna.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-hairline bg-canvas px-3 py-1 text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </BentoCard>

        <BentoCard title="Sample Videos">
          <div className="grid grid-cols-2 gap-2">
            {brand.sampleVideoUrls.map((url) => (
              <div
                key={url}
                className="aspect-[9/16] overflow-hidden rounded-xl bg-obsidian"
              >
                <video
                  src={url}
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
          <NeumorphicButton variant="light" className="mt-3 w-full text-xs">
            Upload Reference Edit
          </NeumorphicButton>
        </BentoCard>
      </div>
    </div>
  );
}

function BentoCard({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-hairline bg-surface p-5 shadow-sm ${className}`}
    >
      <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
        {title}
      </h3>
      {children}
    </div>
  );
}
