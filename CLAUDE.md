# FlowForges Hub — CLAUDE.md

## What this is
Root zone app at `app.flow-forges.com`. Central launcher for all FlowForges products.
Proxies to sub-apps via Vercel rewrites. Shares Supabase auth with lead-engine.

## Routes
| Path | Destination |
|---|---|
| `/` | This hub (app launcher) |
| `/prospecting-os/*` | lead-engine (proxy rewrite) |
| `/support-os/*` | Support OS (future) |
| `/content-os/*` | Content OS (future) |

## Adding a new app
1. Add `AppDef` to `APPS` array in `components/AppHub.tsx`
2. Set `status` to `'planned'` initially
3. Add rewrite to `vercel.json` when the app is deployed
4. Update `status` to `'coming_soon'` then `'live'`

## Tech stack
Next.js 14, framer-motion, lucide-react, @supabase/ssr
No sidebar, no shell — single-page hub design
Design tokens: matches lead-engine (--accent: #E8A840 gold)

## Shared Supabase
Same project as lead-engine (`tbsqpnqzpbnilifhwvgr`).
User logged into Prospecting OS is auto-recognized via shared cookies.

## Deploy
Vercel project: `flowforges-hub`
Domain: `app.flow-forges.com`
Env vars: same as lead-engine (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
