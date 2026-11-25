"use client";

import { useState } from "react";
import { NeumorphicButton } from "@/components/ui/NeumorphicButton";
import { testProviderConnection } from "@/lib/api";
import { ShieldCheck, CheckCircle2, XCircle } from "lucide-react";

export function BYOKConnections() {
  const [anthropic, setAnthropic] = useState("sk-ant-••••••••••••3f9a");
  const [heygen, setHeygen] = useState("hg_••••••••••••b2c1");
  const [webhook, setWebhook] = useState(
    "https://n8n.example.com/webhook/signal"
  );
  const [toast, setToast] = useState<{ ok: boolean; msg: string } | null>(
    null
  );
  const [busy, setBusy] = useState<string | null>(null);

  const test = async (provider: "anthropic" | "heygen" | "n8n") => {
    setBusy(provider);
    setToast(null);
    try {
      await testProviderConnection(provider, {
        anthropicKey: anthropic,
        heygenKey: heygen,
        n8nWebhookUrl: webhook,
      });
      setToast({ ok: true, msg: `${provider} connection verified` });
    } catch {
      setToast({ ok: false, msg: `${provider} test failed` });
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <header className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-2xl font-extrabold tracking-tight">
            BYOK Connections
          </h1>
          <p className="mt-1 text-sm text-muted">
            Your keys stay in an encrypted vault. Never leave your browser
            until sent to n8n.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-hairline bg-surface px-3 py-2 text-xs font-medium">
          <ShieldCheck
            size={14}
            strokeWidth={1.75}
            className="text-status-ready"
          />
          Encrypted vault
        </div>
      </header>

      {toast && (
        <div
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm ${
            toast.ok
              ? "bg-green-50 text-green-800"
              : "bg-red-50 text-red-800"
          }`}
        >
          {toast.ok ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
          {toast.msg}
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        <ConnectionCard
          title="Anthropic Claude"
          description="Script generation & brand voice"
        >
          <MaskedInput
            value={anthropic}
            onChange={setAnthropic}
            placeholder="sk-ant-..."
          />
          <NeumorphicButton
            variant="light"
            className="mt-3 w-full"
            onClick={() => test("anthropic")}
            disabled={busy === "anthropic"}
          >
            {busy === "anthropic" ? "Testing…" : "Test Connection"}
          </NeumorphicButton>
        </ConnectionCard>

        <ConnectionCard
          title="HeyGen"
          description="Avatar & voice video rendering"
        >
          <MaskedInput
            value={heygen}
            onChange={setHeygen}
            placeholder="hg_..."
          />
          <div className="mt-2 grid grid-cols-2 gap-2">
            <select className="rounded-xl border border-hairline bg-canvas px-3 py-2 text-xs outline-none">
              <option>Avatar_01</option>
              <option>Avatar_Founder</option>
            </select>
            <select className="rounded-xl border border-hairline bg-canvas px-3 py-2 text-xs outline-none">
              <option>en-US-JennyNeural</option>
              <option>en-US-GuyNeural</option>
            </select>
          </div>
          <NeumorphicButton
            variant="light"
            className="mt-3 w-full"
            onClick={() => test("heygen")}
            disabled={busy === "heygen"}
          >
            {busy === "heygen" ? "Testing…" : "Test Connection"}
          </NeumorphicButton>
        </ConnectionCard>

        <ConnectionCard
          title="Social Accounts"
          description="Destination platforms"
        >
          <div className="space-y-2">
            {["Instagram Reels", "YouTube Shorts", "LinkedIn"].map((name) => (
              <div
                key={name}
                className="flex items-center justify-between rounded-xl border border-hairline bg-canvas px-3 py-2.5 text-sm"
              >
                <span>{name}</span>
                <span className="font-mono text-[10px] text-status-ready">
                  Connected
                </span>
              </div>
            ))}
          </div>
        </ConnectionCard>

        <ConnectionCard
          title="n8n Backend Webhook"
          description="Pipeline orchestration URL"
        >
          <input
            value={webhook}
            onChange={(e) => setWebhook(e.target.value)}
            className="w-full rounded-xl border border-hairline bg-canvas px-3 py-2 font-mono text-xs outline-none focus:border-yellow"
          />
          <NeumorphicButton
            variant="light"
            className="mt-3 w-full"
            onClick={() => test("n8n")}
            disabled={busy === "n8n"}
          >
            {busy === "n8n" ? "Testing…" : "Test Webhook"}
          </NeumorphicButton>
        </ConnectionCard>
      </div>
    </div>
  );
}

function ConnectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-hairline bg-surface p-5 shadow-sm">
      <h3 className="font-semibold text-ink">{title}</h3>
      <p className="mb-4 text-xs text-muted">{description}</p>
      {children}
    </div>
  );
}

function MaskedInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <input
      type="password"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-xl border border-hairline bg-canvas px-3 py-2 font-mono text-xs outline-none focus:border-yellow"
      autoComplete="off"
    />
  );
}
