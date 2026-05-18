'use client'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { useState } from 'react'
import {
  Target, Headphones, PenLine, FileText, Star, ClipboardList,
  Bolt, Mail, Wrench, ArrowRight
} from 'lucide-react'

interface AppDef {
  id: string; name: string; tagline: string; description: string
  url: string; accentColor: string; glowColor: string; icon: any
  status: 'live' | 'beta' | 'coming_soon' | 'planned'
  badge?: string; stats?: { label: string; value: string }[]
  modules: string[]
}

const APPS: AppDef[] = [
  {
    id: 'prospecting-os', name: 'Prospecting OS', tagline: 'AI-powered B2B lead generation',
    description: 'Sales Navigator + Gemini AI scoring + icebreakers. 500+ qualified leads/month, delivered to Slack every morning.',
    url: '/prospecting-os', accentColor: 'var(--pros-accent)', glowColor: 'var(--pros-glow)',
    status: 'live', icon: Target, badge: 'Live',
    stats: [{ label: 'Leads scored', value: '2,400+' }, { label: 'Avg score', value: '8.5/10' }, { label: 'Plans', value: '$1.5K–$12.5K' }],
    modules: ['AI ICP Scoring', 'Gemini Icebreakers', 'Slack Digest', 'ROI Calculator', 'Client Portal', 'Finance Agent'],
  },
  {
    id: 'mailflow', name: 'MailFlow', tagline: 'AI inbox organizer for Gmail',
    description: 'Multi-account Gmail digest. AI categorizes urgent, action-needed, FYI and promo emails. Smart auto-archive and one-click reply.',
    url: '/mailflow', accentColor: 'var(--mf-accent)', glowColor: 'var(--mf-glow)',
    status: 'live', icon: Mail, badge: 'Live',
    stats: [{ label: 'AI categories', value: '5' }, { label: 'Multi-account', value: 'Yes' }, { label: 'Daily digest', value: 'Yes' }],
    modules: ['AI Categorization', 'Smart Archive', 'Draft Reply', 'Daily Digest', 'Gmail OAuth'],
  },
  {
    id: 'support-os', name: 'Support OS', tagline: 'Autonomous customer support agent',
    description: 'AI agent that handles tier-1 support tickets, routes escalations, and learns from your knowledge base — 24/7.',
    url: '/support-os', accentColor: 'var(--support-accent)', glowColor: 'rgba(59,130,246,0.15)',
    status: 'coming_soon', icon: Headphones,
    modules: ['Ticket triage', 'Auto-resolution', 'KB integration', 'Escalation routing', 'CSAT tracking'],
  },
  {
    id: 'content-os', name: 'Content OS', tagline: 'AI content pipeline for agencies',
    description: 'Brief → research → draft → publish. End-to-end content automation for digital agencies managing 10+ client accounts.',
    url: '/content-os', accentColor: 'var(--content-accent)', glowColor: 'rgba(20,184,166,0.15)',
    status: 'coming_soon', icon: PenLine,
    modules: ['Brief parser', 'AI research', 'Draft generation', 'Brand voice', 'CMS publish', 'SEO scoring'],
  },
  {
    id: 'proposal-os', name: 'Proposal OS', tagline: 'Auto-generate client proposals',
    description: 'Input a client brief → AI generates a full scoped proposal with pricing, timeline, and deliverables in under 60 seconds.',
    url: '/proposal-os', accentColor: 'var(--proposal-accent)', glowColor: 'rgba(139,92,246,0.15)',
    status: 'planned', icon: FileText,
    modules: ['Brief intake', 'Scope generator', 'Pricing calculator', 'PDF export', 'e-Signature'],
  },
  {
    id: 'reputation-os', name: 'Reputation OS', tagline: 'Review monitoring & response AI',
    description: 'Monitor Google, Trustpilot, G2 reviews. AI drafts responses. Alerts on negative spikes. Competitor reputation tracking.',
    url: '/reputation-os', accentColor: 'var(--reputation-accent)', glowColor: 'rgba(245,158,11,0.15)',
    status: 'planned', icon: Star,
    modules: ['Multi-platform monitoring', 'AI response drafts', 'Sentiment analysis', 'Competitor tracking'],
  },
  {
    id: 'sow-os', name: 'SOW OS', tagline: 'SOW to task breakdown, automated',
    description: 'Paste a Statement of Work → AI breaks it into sprint tasks, assigns to team members, and syncs to your PM tool.',
    url: '/sow-os', accentColor: 'var(--sow-accent)', glowColor: 'rgba(236,72,153,0.15)',
    status: 'planned', icon: ClipboardList,
    modules: ['SOW parser', 'Task breakdown', 'Team assignment', 'Notion/Linear sync', 'Sprint planning'],
  },
]

const STATUS_CONFIG = {
  live:        { label: 'Live',        color: 'var(--positive)', bg: 'rgba(107,203,119,0.10)', border: 'rgba(107,203,119,0.25)' },
  beta:        { label: 'Beta',        color: '#3b82f6',        bg: 'rgba(59,130,246,0.10)',  border: 'rgba(59,130,246,0.25)' },
  coming_soon: { label: 'Coming soon', color: 'var(--accent)',  bg: 'var(--accent-soft)',    border: 'rgba(232,168,64,0.30)' },
  planned:     { label: 'Planned',     color: 'var(--ink-3)',   bg: 'rgba(128,128,128,0.08)', border: 'var(--line-strong)' },
}

function getGreeting(): string {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

export function AppHub({ profile }: { profile: any }) {
  const [hoveredApp, setHoveredApp] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'live' | 'coming_soon' | 'planned'>('all')
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  const filtered = APPS.filter(a => filter === 'all' || a.status === filter)
  const displayName = profile?.display_name?.split(' ')[0] || profile?.email?.split('@')[0]

  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      {/* Scroll progress */}
      <motion.div style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: 1.5,
        background: 'var(--accent)', transformOrigin: 'left', scaleX, zIndex: 200,
      }} />

      {/* Top bar */}
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'sticky', top: 0, zIndex: 50,
          background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--line)',
          padding: '0 24px', height: 56,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Bolt size={16} style={{ color: 'var(--accent)' }} />
          <span className="font-bold text-[14px] tracking-tight" style={{ color: 'var(--ink)' }}>
            FlowForges
          </span>
          <span className="text-[11px] font-medium" style={{ color: 'var(--ink-4)', fontFamily: 'Geist Mono, monospace' }}>
            / hub
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <a href="https://flow-forges.com" style={{ fontSize: 13, color: 'var(--ink-3)', textDecoration: 'none' }}>Main site</a>
          <a href="/prospecting-os/book" style={{ fontSize: 13, color: 'var(--ink-3)', textDecoration: 'none' }}>Book a call</a>
          {profile ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div className="rounded-full flex items-center justify-center text-[11px] font-bold"
                style={{ width: 28, height: 28, background: 'var(--accent-soft)', border: '1px solid rgba(232,168,64,0.25)', color: 'var(--accent)' }}>
                {displayName?.[0]?.toUpperCase() || 'U'}
              </div>
              <span style={{ fontSize: 13, color: 'var(--ink-2)' }}>{displayName}</span>
            </div>
          ) : (
            <a href="/prospecting-os/login"
              style={{ fontSize: 13, padding: '6px 16px', borderRadius: 9999, border: '1px solid var(--line)', color: 'var(--ink-2)', textDecoration: 'none' }}>
              Sign in
            </a>
          )}
        </div>
      </motion.header>

      {/* Hero */}
      <section style={{ padding: '72px 0 48px', textAlign: 'center' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Logo mark */}
            <div className="rounded-xl flex items-center justify-center mx-auto"
              style={{
                width: 44, height: 44, marginBottom: 20,
                background: 'linear-gradient(135deg, rgba(232,168,64,0.2), rgba(240,192,96,0.1))',
                border: '1px solid rgba(232,168,64,0.15)',
                boxShadow: '0 0 24px rgba(232,168,64,0.08)',
              }}>
              <Bolt size={20} style={{ color: 'var(--accent)' }} />
            </div>

            <p className="font-bold uppercase tracking-[0.18em] mb-3"
              style={{ fontSize: 11, color: 'var(--ink-4)', fontFamily: 'Geist Mono, monospace' }}>
              FlowForges · App Hub
            </p>

            <h1 style={{
              fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 600,
              color: 'var(--ink)', lineHeight: 1.15, marginBottom: 14,
              letterSpacing: '-0.02em',
            }}>
              {getGreeting()}{displayName ? `, ${displayName}` : ''}.{' '}
              <span style={{ color: 'var(--ink-2)', fontWeight: 400 }}>
                What are we building today?
              </span>
            </h1>

            <p style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.7 }}>
              {APPS.filter(a => a.status === 'live').length} live&ensp;·&ensp;
              {APPS.filter(a => a.status === 'coming_soon').length} in development&ensp;·&ensp;
              {APPS.filter(a => a.status === 'planned').length} planned
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter pills */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 36px', display: 'flex', gap: 8 }}>
        {(['all', 'live', 'coming_soon', 'planned'] as const).map(f => (
          <motion.button
            key={f} onClick={() => setFilter(f)} whileTap={{ scale: 0.97 }}
            className="text-[11px] font-medium px-3.5 py-1.5 rounded-full transition-all duration-200"
            style={{
              background: filter === f ? 'var(--accent-soft)' : 'transparent',
              color: filter === f ? 'var(--accent-ink)' : 'var(--ink-3)',
              border: `1px solid ${filter === f ? 'rgba(232,168,64,0.25)' : 'var(--line)'}`,
              cursor: 'pointer',
            }}>
            {f === 'all' ? 'All' : f === 'coming_soon' ? 'Coming soon' : f.charAt(0).toUpperCase() + f.slice(1)}
          </motion.button>
        ))}
      </div>

      {/* Apps grid */}
      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 96px' }}>
        <motion.div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16 }}
          variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
          initial="hidden" animate="visible"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map(app => {
              const status = STATUS_CONFIG[app.status]
              const isLive = app.status === 'live'
              const isHovered = hoveredApp === app.id
              const Icon = app.icon

              return (
                <motion.div
                  key={app.id} layout
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }}
                  exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
                  onMouseEnter={() => setHoveredApp(app.id)} onMouseLeave={() => setHoveredApp(null)}
                  whileHover={isLive ? {
                    y: -4,
                    borderColor: 'rgba(232,168,64,0.25)',
                    boxShadow: '0 0 40px rgba(232,168,64,0.06)',
                    transition: { type: 'spring', stiffness: 350, damping: 22 },
                  } : { y: -2 }}
                  style={{
                    background: 'var(--surface)',
                    border: `1px solid ${isLive ? 'var(--line)' : 'var(--line)'}`,
                    borderRadius: 16, padding: '26px 24px',
                    cursor: isLive ? 'pointer' : 'default',
                    position: 'relative', overflow: 'hidden',
                    opacity: app.status === 'planned' ? 0.55 : 1,
                  }}
                >
                  {/* Accent glow */}
                  {isLive && (
                    <div style={{
                      position: 'absolute', top: -30, right: -30,
                      width: 100, height: 100, borderRadius: '50%',
                      background: app.glowColor, filter: 'blur(40px)',
                      pointerEvents: 'none',
                      opacity: isHovered ? 1 : 0.35,
                      transition: 'opacity 0.4s',
                    }} />
                  )}

                  {/* Header */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 18 }}>
                    <div className="rounded-xl flex items-center justify-center"
                      style={{
                        width: 40, height: 40, fontSize: 18,
                        background: `${app.accentColor}12`, border: `1px solid ${app.accentColor}28`,
                        color: app.accentColor,
                      }}>
                      <Icon size={19} />
                    </div>
                    <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5"
                      style={{
                        background: status.bg, color: status.color,
                        border: `1px solid ${status.border}`,
                        fontFamily: 'Geist Mono, monospace', letterSpacing: '0.05em',
                      }}>
                      {isLive && (
                        <motion.span
                          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          style={{ width: 4, height: 4, borderRadius: '50%', background: status.color, display: 'inline-block' }}
                        />
                      )}
                      {status.label}
                    </span>
                  </div>

                  <h2 className="text-[16px] font-semibold mb-1 tracking-[-0.01em]" style={{ color: 'var(--ink)' }}>{app.name}</h2>
                  <p className="text-[12px] font-medium mb-3" style={{ color: app.accentColor, fontFamily: 'Geist Mono, monospace' }}>{app.tagline}</p>
                  <p className="text-[13px] mb-5 leading-relaxed" style={{ color: 'var(--ink-2)' }}>{app.description}</p>

                  {/* Modules */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 22 }}>
                    {app.modules.slice(0, 4).map(mod => (
                      <span key={mod} className="text-[10px] px-2.5 py-1 rounded-full"
                        style={{ background: 'var(--surface-2)', border: '1px solid var(--line)', color: 'var(--ink-3)' }}>
                        {mod}
                      </span>
                    ))}
                    {app.modules.length > 4 && (
                      <span className="text-[10px] px-2.5 py-1 rounded-full" style={{ background: 'transparent', color: 'var(--ink-4)' }}>
                        +{app.modules.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Stats */}
                  {app.stats && (
                    <div style={{ display: 'flex', gap: 20, paddingTop: 16, marginBottom: 18, borderTop: '1px solid var(--line)' }}>
                      {app.stats.map(stat => (
                        <div key={stat.label}>
                          <p className="text-[10px] mb-0.5 uppercase tracking-[0.06em]" style={{ color: 'var(--ink-4)' }}>{stat.label}</p>
                          <p className="text-[13px] font-semibold" style={{ color: 'var(--ink)' }}>{stat.value}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* CTA */}
                  {isLive ? (
                    <motion.a
                      href={app.url}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                      className="flex items-center justify-center gap-2 rounded-full text-[13px] font-semibold no-underline"
                      style={{
                        padding: '11px 0',
                        background: 'var(--accent)',
                        color: '#000',
                        boxShadow: '0 0 20px rgba(232,168,64,0.12)',
                      }}>
                      Open {app.name} <ArrowRight size={14} />
                    </motion.a>
                  ) : (
                    <div className="flex items-center justify-center gap-2 rounded-full text-[12px]"
                      style={{ padding: '11px 0', border: '1px solid var(--line)', color: 'var(--ink-3)' }}>
                      <Wrench size={12} />
                      {app.status === 'coming_soon' ? 'In development' : 'On the roadmap'}
                    </div>
                  )}
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', padding: '20px 24px', display: 'flex', justifyContent: 'center', gap: 48, flexWrap: 'wrap', marginBottom: 48 }}>
        {[
          { label: 'Live apps', value: String(APPS.filter(a => a.status === 'live').length), icon: Bolt },
          { label: 'In development', value: String(APPS.filter(a => a.status === 'coming_soon').length), icon: Wrench },
          { label: 'Planned', value: String(APPS.filter(a => a.status === 'planned').length), icon: Target },
        ].map((s, i) => (
          <motion.div key={s.label}
            initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.35 }}
            style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <s.icon size={15} style={{ color: 'var(--ink-4)' }} />
            <p className="text-[15px] font-semibold" style={{ color: 'var(--ink)' }}>{s.value}</p>
            <p className="text-[10px] uppercase tracking-[0.10em]" style={{ color: 'var(--ink-4)' }}>{s.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer */}
      <footer className="flex items-center justify-between" style={{ borderTop: '1px solid var(--line)', padding: '16px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <p className="text-[11px]" style={{ color: 'var(--ink-4)' }}>
          &copy; 2026 AKS Forge Lab · FlowForges · <a href="https://flow-forges.com" className="no-underline" style={{ color: 'var(--ink-4)' }}>flow-forges.com</a>
        </p>
        <p className="text-[11px]" style={{ color: 'var(--ink-4)', fontFamily: 'Geist Mono, monospace' }}>hub v1.0.0</p>
      </footer>
    </div>
  );
}
