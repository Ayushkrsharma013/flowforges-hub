# FlowForges Hub — CLAUDE.md

## What this is
Root zone app at `app.flow-forges.com`. Central launcher for all FlowForges products.
Proxies to sub-apps via Vercel edge rewrites in `vercel.json`. Shares Supabase auth with lead-engine.

## Routes
| Path | Destination |
|---|---|
| `/` | This hub (app launcher) |
| `/prospecting-os` | lead-engine (exact match rewrite) |
| `/prospecting-os/` | lead-engine (exact match rewrite) |
| `/prospecting-os/:path*` | lead-engine (wildcard rewrite) |
| `/support-os/*` | Support OS (future) |
| `/content-os/*` | Content OS (future) |

## Adding a new app
1. Add `AppDef` to `APPS` array in `components/AppHub.tsx`
2. Set `status` to `'planned'` initially
3. Add 3 rewrite rules to `vercel.json` (exact path, exact path + /, wildcard)
4. Update `status` to `'coming_soon'` then `'live'`

## Rewrite format (CRITICAL)
Vercel `:path*` wildcard does NOT match bare paths without trailing slash.
Always add 3 rules per app:
```json
{ "source": "/app-name",      "destination": "..." },
{ "source": "/app-name/",     "destination": "..." },
{ "source": "/app-name/:path*", "destination": "..." }
```

## Tech stack
Next.js 14, framer-motion, lucide-react, @supabase/ssr
No sidebar, no shell — single-page hub design
Design tokens: matches lead-engine (--accent: #E8A840, --bg, --surface, --ink)
Font: Geist + Geist Mono

## Shared Supabase
Same project as lead-engine (`tbsqpnqzpbnilifhwvgr`).
User logged into Prospecting OS is auto-recognized via shared cookies.

## Deploy
Vercel project: `flowforges-hub` (svix-workspace)
Repo: `github.com/Ayushkrsharma013/flowforges-hub`
Domain: `app.flow-forges.com` (transferred from lead-engine project)
Env vars: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, LEAD_ENGINE_URL
SSO/Password protection: DISABLED (both hub and lead-engine) — blocks public access
Build: `npm run build` — 0 errors, 5/5 pages

## Session History

### 2026-05-17 — Hub Creation + Multi-Zone Setup

Created the FlowForges Hub at `D:\Flow-Forges\hub\`:
- Scaffolded Next.js 14 with TypeScript, Tailwind, App Router
- Installed framer-motion, lucide-react, @supabase/ssr, @supabase/supabase-js
- Designed premium dark theme matching lead-engine (--accent: #E8A840 gold, grain texture, Geist fonts)
- 6 product cards: Prospecting OS (live), Support OS + Content OS (coming soon), Proposal OS + Reputation OS + SOW OS (planned)
- All lucide-react icons (Target, Headphones, PenLine, FileText, Star, ClipboardList, Bolt, Wrench, ArrowRight)
- Zero emojis — replaced with premium icons
- Filter pills (All/Live/Coming soon/Planned), animated live dot, spring hover effects
- Per-app accent colors with glow overlays
- Scroll progress bar, time-based greeting, stats bar, footer
- Shared Supabase auth — reads cookie, displays user avatar + name
- `lib/supabase/server.ts` — SSR client (read-only)

Multi-zone setup:
- Transferred `app.flow-forges.com` from lead-engine → hub Vercel project
- Added 3 Vercel edge rewrite rules for /prospecting-os (exact, exact+/, wildcard)
- Set LEAD_ENGINE_URL env var → `https://lead-engine-svix-workspace.vercel.app`
- Disabled Vercel SSO/Password protection on both hub and lead-engine
- Removed conflicting Next.js beforeFiles rewrites — Vercel edge rewrites only
- Removed conflicting vercel.json rewrite from lead-engine's earlier multi-zone setup

Verified: hub root (200), /prospecting-os (200), /prospecting-os/login (200), /prospecting-os/dashboard (200)
