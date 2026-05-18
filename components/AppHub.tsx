'use client'
import { motion, useScroll, useSpring } from 'framer-motion'
import { useState } from 'react'
import {
  Target, Headphones, PenLine, FileText, Star, ClipboardList,
  Bolt, Mail, Wrench, ArrowRight,
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
  coming_soon: { label: 'Coming soon', color: 'var(--accent)',  bg: 'var(--accent-soft)',    border: 'rgba(232,168,64,0.28)' },
  planned:     { label: 'Planned',     color: 'var(--ink-3)',   bg: 'rgba(128,128,128,0.07)', border: 'var(--line-strong)' },
}

const SECTIONS = [
  { key: 'live' as const,        title: 'Live Now',          meta: 'Production-ready · Activate any time' },
  { key: 'coming_soon' as const, title: 'In Development',    meta: 'Active build · ETA Q3 2026' },
  { key: 'planned' as const,     title: 'On the Roadmap',    meta: 'Scoped · Starting Q4 2026' },
]

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

function AppCard({ app, index }: { app: AppDef; index: number }) {
  const [hovered, setHovered] = useState(false)
  const status = STATUS_CONFIG[app.status]
  const isLive = app.status === 'live'
  const Icon = app.icon

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.45, delay: index * 0.055, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={isLive
        ? { y: -4, transition: { type: 'spring', stiffness: 340, damping: 22 } }
        : { y: -1, transition: { duration: 0.2 } }
      }
      style={{
        background: 'var(--surface)',
        border: `1px solid ${hovered && isLive ? 'rgba(255,255,255,0.08)' : 'var(--line)'}`,
        borderRadius: 14,
        overflow: 'hidden',
        cursor: isLive ? 'pointer' : 'default',
        position: 'relative',
        opacity: app.status === 'planned' ? 0.58 : 1,
        transition: 'border-color 0.2s ease, opacity 0.2s ease',
        display: 'flex', flexDirection: 'column',
      }}
    >
      {/* Accent strip */}
      <div style={{
        height: 2.5,
        background: isLive
          ? `linear-gradient(90deg, ${app.accentColor} 0%, ${app.accentColor}40 60%, transparent 100%)`
          : `linear-gradient(90deg, rgba(255,255,255,0.07) 0%, transparent 100%)`,
        transition: 'opacity 0.3s',
        opacity: hovered ? 1 : 0.75,
        flexShrink: 0,
      }} />

      {/* App glow */}
      {isLive && (
        <div style={{
          position: 'absolute', top: -24, right: -24,
          width: 110, height: 110, borderRadius: '50%',
          background: app.glowColor, filter: 'blur(38px)',
          pointerEvents: 'none',
          opacity: hovered ? 0.9 : 0.18,
          transition: 'opacity 0.35s ease',
        }} />
      )}

      <div style={{ padding: '20px 20px 20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 9,
            background: `${app.accentColor}14`,
            border: `1px solid ${app.accentColor}22`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: app.accentColor, flexShrink: 0,
          }}>
            <Icon size={17} />
          </div>

          <span style={{
            fontSize: 9.5, fontWeight: 600, letterSpacing: '0.05em',
            padding: '3.5px 8px', borderRadius: 999,
            background: status.bg, color: status.color,
            border: `1px solid ${status.border}`,
            fontFamily: 'Geist Mono, monospace',
            display: 'flex', alignItems: 'center', gap: 5,
          }}>
            {isLive && (
              <motion.span
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.35, 1] }}
                transition={{ duration: 2.4, repeat: Infinity }}
                style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--positive)', display: 'inline-block' }}
              />
            )}
            {status.label}
          </span>
        </div>

        {/* Name, tagline, description */}
        <h3 style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--ink)', marginBottom: 3, letterSpacing: '-0.015em', lineHeight: 1.3 }}>
          {app.name}
        </h3>
        <p style={{ fontSize: 10.5, fontWeight: 500, color: app.accentColor, fontFamily: 'Geist Mono, monospace', marginBottom: 9, opacity: 0.9, letterSpacing: '0.01em' }}>
          {app.tagline}
        </p>
        <p style={{ fontSize: 12.5, color: 'var(--ink-2)', lineHeight: 1.65, marginBottom: 14 }}>
          {app.description}
        </p>

        {/* Module tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: app.stats ? 16 : 18 }}>
          {app.modules.slice(0, 4).map(mod => (
            <span key={mod} style={{
              fontSize: 9, padding: '3px 7px', borderRadius: 999,
              background: 'var(--surface-elev)', border: '1px solid var(--line)',
              color: 'var(--ink-3)', letterSpacing: '0.02em',
            }}>
              {mod}
            </span>
          ))}
          {app.modules.length > 4 && (
            <span style={{ fontSize: 9, padding: '3px 6px', color: 'var(--ink-4)' }}>
              +{app.modules.length - 4}
            </span>
          )}
        </div>

        {/* Stats grid (live apps only) */}
        {app.stats && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${app.stats.length}, 1fr)`,
            gap: 1, marginBottom: 16,
            background: 'var(--line)', borderRadius: 9, overflow: 'hidden',
          }}>
            {app.stats.map(stat => (
              <div key={stat.label} style={{
                padding: '9px 10px', background: 'var(--surface-elev)', textAlign: 'center',
              }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink)', marginBottom: 1, lineHeight: 1 }}>{stat.value}</p>
                <p style={{ fontSize: 8.5, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Spacer to push CTA to bottom */}
        <div style={{ flex: 1 }} />

        {/* CTA */}
        {isLive ? (
          <motion.a
            href={app.url}
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.975 }}
            transition={{ type: 'spring', stiffness: 400, damping: 24 }}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              padding: '10px 0', borderRadius: 9,
              background: `${app.accentColor}18`,
              border: `1px solid ${app.accentColor}35`,
              color: app.accentColor,
              fontSize: 12, fontWeight: 600,
              textDecoration: 'none', letterSpacing: '-0.01em',
              transition: 'background 0.2s ease',
            }}>
            Launch {app.name} <ArrowRight size={12} />
          </motion.a>
        ) : (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
            padding: '10px 0', borderRadius: 9,
            border: '1px solid var(--line)', color: 'var(--ink-4)', fontSize: 11.5,
          }}>
            <Wrench size={11} />
            {app.status === 'coming_soon' ? 'In development' : 'On the roadmap'}
          </div>
        )}
      </div>
    </motion.div>
  )
}

function SectionLabel({ title, count, meta }: { title: string; count: number; meta: string }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      marginBottom: 18, paddingBottom: 14, borderBottom: '1px solid var(--line)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
        <h2 style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.01em' }}>{title}</h2>
        <span style={{
          fontSize: 9.5, fontWeight: 600, padding: '2px 7px', borderRadius: 999,
          background: 'var(--surface-elev)', border: '1px solid var(--line)',
          color: 'var(--ink-3)', fontFamily: 'Geist Mono, monospace',
        }}>
          {count}
        </span>
      </div>
      <p style={{ fontSize: 10.5, color: 'var(--ink-4)', fontFamily: 'Geist Mono, monospace' }}>{meta}</p>
    </div>
  )
}

export function AppHub({ profile }: { profile: any }) {
  const [filter, setFilter] = useState<'all' | 'live' | 'coming_soon' | 'planned'>('all')
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  const displayName = profile?.display_name?.split(' ')[0] || profile?.email?.split('@')[0]

  const visibleSections = SECTIONS.filter(s =>
    filter === 'all' || filter === s.key
  ).map(s => ({
    ...s,
    apps: APPS.filter(a => a.status === s.key),
  })).filter(s => s.apps.length > 0)

  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}>

      {/* Ambient radial gradient */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(ellipse 1000px 500px at 50% 0%, rgba(232,168,64,0.035) 0%, transparent 70%)',
      }} />

      {/* Scroll progress */}
      <motion.div style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: 1.5,
        background: 'linear-gradient(90deg, var(--accent), var(--accent-ink))',
        transformOrigin: 'left', scaleX, zIndex: 200,
      }} />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'sticky', top: 0, zIndex: 50,
          background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--line)',
          padding: '0 28px', height: 52,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 26, height: 26, borderRadius: 7,
            background: 'linear-gradient(135deg, rgba(232,168,64,0.22), rgba(240,192,96,0.08))',
            border: '1px solid rgba(232,168,64,0.18)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Bolt size={13} style={{ color: 'var(--accent)' }} />
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em' }}>
            FlowForges
          </span>
          <span style={{ fontSize: 12, color: 'var(--line-strong)', margin: '0 1px' }}>/</span>
          <span style={{ fontSize: 11, color: 'var(--ink-4)', fontFamily: 'Geist Mono, monospace' }}>hub</span>
        </div>

        <nav style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <a href="https://flow-forges.com" style={{ fontSize: 12, color: 'var(--ink-3)', textDecoration: 'none' }}>
            Agency
          </a>
          <a href="/prospecting-os/book" style={{ fontSize: 12, color: 'var(--ink-3)', textDecoration: 'none' }}>
            Book a call
          </a>
          {profile ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <div style={{
                width: 26, height: 26, borderRadius: '50%',
                background: 'var(--accent-soft)', border: '1px solid rgba(232,168,64,0.22)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 700, color: 'var(--accent)',
              }}>
                {displayName?.[0]?.toUpperCase() ?? 'U'}
              </div>
              <span style={{ fontSize: 12, color: 'var(--ink-2)' }}>{displayName}</span>
            </div>
          ) : (
            <a href="/prospecting-os/login" style={{
              fontSize: 12, padding: '5px 14px', borderRadius: 999,
              border: '1px solid var(--line)', color: 'var(--ink-2)', textDecoration: 'none',
            }}>
              Sign in
            </a>
          )}
        </nav>
      </motion.header>

      {/* Hero */}
      <section style={{ padding: '68px 0 44px', textAlign: 'center', position: 'relative' }}>
        {/* Dot grid decoration */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden',
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.045) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 700px 300px at 50% 50%, black 0%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 700px 300px at 50% 50%, black 0%, transparent 80%)',
        }} />

        <motion.div
          style={{ maxWidth: 680, margin: '0 auto', padding: '0 24px', position: 'relative' }}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '5px 12px', borderRadius: 999, marginBottom: 22,
            background: 'var(--accent-soft)', border: '1px solid rgba(232,168,64,0.2)',
          }}>
            <Bolt size={10} style={{ color: 'var(--accent)' }} />
            <span style={{
              fontSize: 10, fontWeight: 600, color: 'var(--accent-ink)',
              fontFamily: 'Geist Mono, monospace', letterSpacing: '0.1em',
            }}>
              FLOWFORGES · APP HUB
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 600,
            color: 'var(--ink)', lineHeight: 1.18, marginBottom: 14,
            letterSpacing: '-0.025em',
          }}>
            {getGreeting()}{displayName ? `, ${displayName}` : ''}.{' '}
            <span style={{ color: 'var(--ink-3)', fontWeight: 400 }}>
              Your AI workforce.
            </span>
          </h1>

          <p style={{ fontSize: 13.5, color: 'var(--ink-3)', lineHeight: 1.7, marginBottom: 32, maxWidth: 480, margin: '0 auto 32px' }}>
            A suite of AI-powered tools for B2B agencies. Each app handles an entire workflow autonomously.
          </p>

          {/* Inline counts */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 36, flexWrap: 'wrap' }}>
            {[
              { label: 'live', value: APPS.filter(a => a.status === 'live').length, color: 'var(--positive)' },
              { label: 'in development', value: APPS.filter(a => a.status === 'coming_soon').length, color: 'var(--accent)' },
              { label: 'planned', value: APPS.filter(a => a.status === 'planned').length, color: 'var(--ink-4)' },
            ].map(s => (
              <div key={s.label} style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span style={{ fontSize: 19, fontWeight: 700, color: s.color, letterSpacing: '-0.02em' }}>{s.value}</span>
                <span style={{ fontSize: 11, color: 'var(--ink-4)' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Filter pills */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px 36px', display: 'flex', gap: 6, justifyContent: 'center' }}>
        {([
          { key: 'all' as const, label: 'All apps' },
          { key: 'live' as const, label: 'Live' },
          { key: 'coming_soon' as const, label: 'In development' },
          { key: 'planned' as const, label: 'Planned' },
        ]).map(f => (
          <motion.button
            key={f.key}
            onClick={() => setFilter(f.key)}
            whileTap={{ scale: 0.96 }}
            style={{
              fontSize: 11, fontWeight: 500,
              padding: '6px 16px', borderRadius: 999,
              background: filter === f.key ? 'var(--accent-soft)' : 'transparent',
              color: filter === f.key ? 'var(--accent-ink)' : 'var(--ink-3)',
              border: `1px solid ${filter === f.key ? 'rgba(232,168,64,0.25)' : 'var(--line)'}`,
              cursor: 'pointer', transition: 'all 0.15s ease',
            }}>
            {f.label}
          </motion.button>
        ))}
      </div>

      {/* Sections */}
      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px 100px' }}>
        {visibleSections.map((section, si) => (
          <motion.section
            key={section.key}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: si * 0.05 }}
            style={{ marginBottom: 52 }}
          >
            <SectionLabel title={section.title} count={section.apps.length} meta={section.meta} />

            <div style={{
              display: 'grid',
              gridTemplateColumns: `repeat(auto-fill, minmax(${section.key === 'planned' ? '290px' : '330px'}, 1fr))`,
              gap: section.key === 'planned' ? 12 : 15,
              alignItems: 'stretch',
            }}>
              {section.apps.map((app, i) => (
                <AppCard key={app.id} app={app} index={i} />
              ))}
            </div>
          </motion.section>
        ))}
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--line)',
        padding: '16px 28px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        maxWidth: 1100, margin: '0 auto',
      }}>
        <p style={{ fontSize: 11, color: 'var(--ink-4)' }}>
          &copy; 2026 AKS Forge Lab · FlowForges ·{' '}
          <a href="https://flow-forges.com" style={{ color: 'var(--ink-4)', textDecoration: 'none' }}>
            flow-forges.com
          </a>
        </p>
        <p style={{ fontSize: 11, color: 'var(--ink-4)', fontFamily: 'Geist Mono, monospace' }}>hub v2.0.0</p>
      </footer>

    </div>
  )
}
