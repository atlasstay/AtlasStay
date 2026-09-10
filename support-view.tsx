'use client'

import { useState } from 'react'
import {
  Check,
  Clock,
  Headset,
  ImageOff,
  MapPin,
  PackageOpen,
  ShieldCheck,
} from 'lucide-react'
import { upcomingTrip } from '@/lib/data'
import { SectionTitle } from './primitives'

const issues = [
  {
    id: 'photos',
    label: "Room doesn't match photos",
    icon: ImageOff,
    detail:
      'Send a few photos of the discrepancy. Because escrow is active, your host is not paid until this is resolved.',
  },
  {
    id: 'amenities',
    label: 'Missing amenities',
    icon: PackageOpen,
    detail:
      'Tell us what was promised but missing. We can arrange a same-day fix or a partial refund from escrow.',
  },
  {
    id: 'checkin',
    label: 'Check-in delay',
    icon: Clock,
    detail:
      "If you can't get in, we'll reach the host immediately and cover a nearby verified stay if needed.",
  },
]

export function SupportView() {
  const [activeIssue, setActiveIssue] = useState<string | null>(null)

  return (
    <div className="mx-auto max-w-2xl px-5 py-6 md:px-6 md:py-10">
      <SectionTitle eyebrow="High-agency support" title="Resolution Center" />
      <p className="mt-2 text-pretty text-muted-foreground">
        Real leverage when something is off — not a chatbot loop.
      </p>

      {/* Active booking context */}
      <div className="mt-6 rounded-3xl border border-border bg-card p-5 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Active booking
        </p>
        <div className="mt-2 flex items-center gap-3">
          <img
            src={upcomingTrip.image || '/placeholder.svg'}
            alt=""
            className="size-14 rounded-2xl object-cover"
          />
          <div>
            <p className="font-medium">
              You are currently checked into{' '}
              <span className="font-semibold">{upcomingTrip.propertyName}</span>.
            </p>
            <p className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-3.5" /> {upcomingTrip.location}
            </p>
          </div>
        </div>

        {/* Escrow status */}
        <div className="mt-4 flex items-start gap-3 rounded-2xl border border-primary/25 bg-primary/8 p-4">
          <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" />
          <div>
            <p className="text-sm font-semibold text-primary">Escrow Active</p>
            <p className="mt-0.5 text-sm text-foreground/80">
              Host payout is paused for 24 hours to ensure your stay matches the listing.
            </p>
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Payout hold</span>
                <span>18h remaining</span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full w-1/4 rounded-full bg-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-6">
        <p className="text-sm font-medium text-muted-foreground">Report an immediate issue</p>
        <div className="mt-3 space-y-2.5">
          {issues.map(({ id, label, icon: Icon, detail }) => {
            const active = activeIssue === id
            return (
              <div
                key={id}
                className={`overflow-hidden rounded-2xl border transition-colors ${
                  active ? 'border-primary bg-primary/5' : 'border-border bg-card'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setActiveIssue(active ? null : id)}
                  className="flex w-full items-center gap-3 p-4 text-left"
                >
                  <span
                    className={`grid size-10 shrink-0 place-items-center rounded-xl ${
                      active ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'
                    }`}
                  >
                    <Icon className="size-5" />
                  </span>
                  <span className="flex-1 font-medium">{label}</span>
                  {active ? <Check className="size-5 text-primary" strokeWidth={2.5} /> : null}
                </button>
                {active ? (
                  <div className="animate-in fade-in slide-in-from-top-1 border-t border-primary/20 px-4 py-3">
                    <p className="text-sm text-foreground/80">{detail}</p>
                    <button
                      type="button"
                      className="mt-3 inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                    >
                      Open a case
                    </button>
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>
      </div>

      {/* Human concierge */}
      <button
        type="button"
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-navy bg-navy px-5 py-3.5 text-sm font-semibold text-navy-foreground transition-transform hover:scale-[1.01] active:scale-100"
      >
        <Headset className="size-4 text-primary" />
        Connect to Human Concierge
      </button>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        Average response under 2 minutes · real people, 24/7
      </p>
    </div>
  )
}
