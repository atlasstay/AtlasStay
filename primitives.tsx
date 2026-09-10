'use client'

import { useEffect, type ReactNode } from 'react'
import { BadgeCheck, Compass, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className="grid size-8 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
        <Compass className="size-5" strokeWidth={2.25} />
      </span>
      <span className="font-display text-lg font-semibold tracking-tight">
        Atlas<span className="text-primary">Stay</span>
      </span>
    </div>
  )
}

export function VerifiedBadge({
  daysAgo,
  className,
}: {
  daysAgo: number
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full bg-navy/85 px-2.5 py-1 text-xs font-medium text-navy-foreground backdrop-blur-md',
        className,
      )}
    >
      <BadgeCheck className="size-3.5 text-primary" strokeWidth={2.5} />
      Verified {daysAgo} days ago
    </span>
  )
}

export function Chip({
  active,
  children,
  onClick,
}: {
  active?: boolean
  children: ReactNode
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors',
        active
          ? 'border-primary bg-primary text-primary-foreground'
          : 'border-border bg-card text-foreground/80 hover:border-primary/50',
      )}
    >
      {children}
    </button>
  )
}

export function GroundMeter({
  icon,
  label,
  value,
  sublabel,
  percent,
}: {
  icon: ReactNode
  label: string
  value: string
  sublabel: string
  percent: number
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <span className="text-primary">{icon}</span>
        <span className="text-sm font-medium">{label}</span>
      </div>
      <div className="mt-2 flex items-baseline gap-1.5">
        <span className="font-display text-2xl font-semibold tracking-tight">{value}</span>
      </div>
      <p className="text-xs text-muted-foreground">{sublabel}</p>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all duration-700"
          style={{ width: `${Math.min(100, Math.max(6, percent))}%` }}
        />
      </div>
    </div>
  )
}

export function SectionTitle({
  eyebrow,
  title,
  className,
}: {
  eyebrow?: string
  title: string
  className?: string
}) {
  return (
    <div className={className}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-xl font-semibold tracking-tight text-balance">{title}</h2>
    </div>
  )
}

export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div
        className="absolute inset-0 bg-navy/50 backdrop-blur-sm animate-in fade-in"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative z-10 w-full max-w-md rounded-t-3xl border border-border bg-card p-5 shadow-2xl animate-in slide-in-from-bottom-4 fade-in sm:rounded-3xl"
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <h3 className="font-display text-lg font-semibold tracking-tight text-balance">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="grid size-8 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
