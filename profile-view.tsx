'use client'

import {
  BadgeCheck,
  Bell,
  ChevronRight,
  Globe,
  Heart,
  LogOut,
  Settings,
  Wallet,
} from 'lucide-react'
import { wallet } from '@/lib/data'
import { SectionTitle } from './primitives'

const rows = [
  { icon: Heart, label: 'Saved stays', meta: '8' },
  { icon: Wallet, label: 'Payment & wallet', meta: `$${wallet.balance.toFixed(0)}` },
  { icon: Bell, label: 'Notifications', meta: 'On' },
  { icon: Globe, label: 'Language & currency', meta: 'EN · USD' },
  { icon: Settings, label: 'Account settings', meta: '' },
]

export function ProfileView() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-6 md:px-6 md:py-10">
      <SectionTitle eyebrow="Account" title="Profile" />

      <div className="mt-6 flex items-center gap-4 rounded-3xl border border-border bg-card p-5 shadow-sm">
        <div className="grid size-16 place-items-center rounded-full bg-navy font-display text-xl font-semibold text-navy-foreground">
          JC
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold tracking-tight">Jordan Costa</h3>
          <p className="text-sm text-muted-foreground">jordan.costa@email.com</p>
          <p className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-primary/12 px-2.5 py-1 text-xs font-medium text-primary">
            <BadgeCheck className="size-3.5" /> Atlas Verified Traveler
          </p>
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
        {rows.map(({ icon: Icon, label, meta }, i) => (
          <button
            key={label}
            type="button"
            className={`flex w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-muted/50 ${
              i !== 0 ? 'border-t border-border' : ''
            }`}
          >
            <span className="grid size-9 place-items-center rounded-xl bg-muted text-foreground">
              <Icon className="size-4.5" />
            </span>
            <span className="flex-1 font-medium">{label}</span>
            {meta ? <span className="text-sm text-muted-foreground">{meta}</span> : null}
            <ChevronRight className="size-4 text-muted-foreground" />
          </button>
        ))}
      </div>

      <button
        type="button"
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-card px-5 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-destructive/40 hover:text-destructive"
      >
        <LogOut className="size-4" />
        Sign out
      </button>
    </div>
  )
}
