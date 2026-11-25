# Signal — BYOK AI Social Media Manager

High-craft SaaS frontend for a Bring-Your-Own-Key AI social media manager.

**Stack:** Next.js 15 (App Router) · React 18 · TypeScript · Tailwind CSS · Framer Motion · Lucide

## Design system

- **Canvas:** `#F5F5F3` (warm alabaster)
- **Accent:** `#FFD600` (signal yellow)
- **Dark:** `#0D0D0D` (obsidian)
- **Typography:** Bricolage Grotesque (display), Plus Jakarta Sans (UI), JetBrains Mono (meta)
- Neumorphic buttons + glassmorphic floating panels
- Horizontal filmstrip content calendar as the hero view

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Views

1. **Content Calendar** — horizontal side-scrolling timeline with 9:16 video cards
2. **Brand Brain Studio** — bento workspace for voice, audience, style DNA
3. **BYOK Connections** — Claude, HeyGen, social accounts, n8n webhook
4. **Render Queue** — pipeline tracker (Claude → HeyGen → Edit → Schedule)

## Backend adapters

All data access lives in `lib/api.ts`. Toggle:

```ts
const USE_MOCK_DATA = true;
```

Set `NEXT_PUBLIC_N8N_WEBHOOK_BASE_URL` when wiring live n8n webhooks. Zero UI changes required.

## Scripts

| Command       | Description              |
|---------------|--------------------------|
| `npm run dev` | Development server       |
| `npm run build` | Production build       |
| `npm start`   | Start production server  |
