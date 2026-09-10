'use client'

import { useEffect, useState } from 'react'
import { ArrowLeftRight, Calendar, ChevronRight, MapPin, Repeat, Shuffle, Sparkles, Wallet } from 'lucide-react'
import { upcomingTrip as defaultTrip } from '@/lib/data'
import type { Reservation } from './atlas-app'
import { Modal, SectionTitle } from './primitives'

type FlexChoice = 'credit' | 'swap'

function AnimatedBalance({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(value)

  useEffect(() => {
    const start = displayValue
    const delta = value - start
    if (delta === 0) return
    const startedAt = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / 650, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayValue(start + delta * eased)
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [value])

  return <>{displayValue.toFixed(2)}</>
}

export function TripsView({ reservation, walletBalance, onFlexCredit, onSwap }: { reservation: Reservation | null; walletBalance: number; onFlexCredit: (credit: number) => void; onSwap: () => void }) {
  const [open, setOpen] = useState(false)
  const [choice, setChoice] = useState<FlexChoice>('credit')
  const [customPrice, setCustomPrice] = useState('')
  const trip = reservation ?? defaultTrip

  const confirm = () => {
    if (choice === 'credit') onFlexCredit(trip.flexCredit)
    else onSwap()
    setOpen(false)
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-6 md:px-6 md:py-10">
      <div className="overflow-hidden rounded-3xl bg-navy p-6 text-navy-foreground shadow-sm">
        <div className="flex items-center justify-between"><div className="inline-flex items-center gap-2 text-sm text-navy-foreground/70"><Wallet className="size-4 text-primary" /> Atlas Wallet Balance</div><span className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 px-2.5 py-1 text-xs font-medium text-primary"><Sparkles className="size-3.5" /> Universal Credit</span></div>
        <p className="mt-3 font-display text-4xl font-semibold tracking-tight" aria-live="polite">$<AnimatedBalance value={walletBalance} /></p>
        <p className="mt-1 text-sm text-navy-foreground/60">Spend on any AtlasStay booking, anywhere. Never expires.</p>
      </div>
      <div className="mt-8"><SectionTitle eyebrow="Upcoming" title="Your next stay" /></div>
      {reservation ? <div className="mt-4 overflow-hidden rounded-3xl border border-border bg-card shadow-sm"><img src={trip.image} alt={trip.propertyName} className="aspect-[16/9] w-full object-cover" /><div className="p-5"><div className="flex flex-wrap items-start justify-between gap-2"><div><h3 className="font-display text-lg font-semibold tracking-tight">{trip.propertyName}</h3><p className="inline-flex items-center gap-1.5 text-sm text-muted-foreground"><MapPin className="size-3.5" /> {trip.location}</p></div><span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">#{trip.confirmation}</span></div><div className="mt-4 grid grid-cols-3 gap-3 text-sm">{[['Check-in', trip.checkIn], ['Check-out', trip.checkOut], ['Guests', `${trip.guests} adults`]].map(([label, value]) => <div key={label} className="rounded-2xl bg-muted/60 p-3"><p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground"><Calendar className="size-3.5" /> {label}</p><p className="mt-1 font-medium">{value}</p></div>)}</div><div className="mt-4 flex items-center justify-between text-sm"><span className="text-muted-foreground">{trip.nights} nights · paid in full</span><span className="font-display text-base font-semibold">${trip.total}</span></div><button type="button" onClick={() => setOpen(true)} className="mt-4 flex w-full items-center justify-between gap-3 rounded-2xl border border-primary/40 bg-primary/10 px-4 py-3.5 text-left transition-colors hover:bg-primary/15"><span className="inline-flex items-center gap-2.5"><span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground"><ArrowLeftRight className="size-4" /></span><span><span className="block text-sm font-semibold">Plans changed? Flex or Transfer</span><span className="block text-xs text-muted-foreground">Turn this stay into credit or list it</span></span></span><ChevronRight className="size-5 shrink-0 text-primary" /></button></div></div> : <div className="mt-4 rounded-3xl border border-dashed border-border bg-card p-8 text-center"><p className="font-display text-lg font-semibold">No upcoming stays</p><p className="mt-1 text-sm text-muted-foreground">Your new AtlasStay reservation will appear here.</p></div>}
      <Modal open={open} onClose={() => setOpen(false)} title="Flex or transfer this stay"><p className="-mt-2 mb-4 text-sm text-muted-foreground">Choose how you&apos;d like to move forward. Your credit is liquid, never expires, and works across AtlasStay.</p><div className="space-y-3"><label className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 ${choice === 'credit' ? 'border-primary bg-primary/8' : 'border-border'}`}><input type="radio" name="flex-choice" checked={choice === 'credit'} onChange={() => setChoice('credit')} className="mt-1 size-4 accent-primary" /><span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary"><Repeat className="size-5" /></span><span><span className="block font-semibold">Instant AtlasCredit (${trip.flexCredit})</span><span className="block text-sm text-muted-foreground">Liquid, never expires, usable across any property.</span></span></label><label className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 ${choice === 'swap' ? 'border-primary bg-primary/8' : 'border-border'}`}><input type="radio" name="flex-choice" checked={choice === 'swap'} onChange={() => setChoice('swap')} className="mt-1 size-4 accent-primary" /><span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary"><Shuffle className="size-5" /></span><span className="flex-1"><span className="block font-semibold">List on Atlas Swap Market</span><span className="block text-sm text-muted-foreground">Set a custom transfer price.</span>{choice === 'swap' ? <input value={customPrice} onChange={(event) => setCustomPrice(event.target.value)} placeholder={`Suggested $${trip.total}`} inputMode="numeric" className="mt-3 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" /> : null}</span></label></div><button type="button" disabled={choice === 'swap' && !customPrice} onClick={confirm} className="mt-5 inline-flex w-full justify-center rounded-2xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground disabled:opacity-50">{choice === 'credit' ? 'Confirm Flex Credit' : 'List on Swap Market'}</button></Modal>
    </div>
  )
}
