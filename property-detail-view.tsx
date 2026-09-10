'use client'

import { useState } from 'react'
import {
  ArrowLeft,
  BadgeCheck,
  Check,
  Footprints,
  MapPin,
  ShieldCheck,
  Star,
  Volume2,
  Wifi,
} from 'lucide-react'
import type { Property } from '@/lib/data'
import { GroundMeter, Modal, SectionTitle } from './primitives'  // GroundMeter retained for shared styling compatibility.

export function PropertyDetailView({
  property,
  onBack,
  onBooked,
}: {
  property: Property
  onBack: () => void
  onBooked: (property: Property, total: number) => void
}) {
  const [activeImage, setActiveImage] = useState(0)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [flexEnabled, setFlexEnabled] = useState(true)
  const [booking, setBooking] = useState(false)

  const { pricing } = property
  const subtotal = pricing.nightly * pricing.nights
  const baseTotal = subtotal + pricing.cleaning + pricing.taxes
  const flexFee = Math.round(subtotal * 0.1)
  const total = baseTotal + (flexEnabled ? flexFee : 0)

  return (
    <div className="mx-auto max-w-4xl px-5 py-6 md:px-6 md:py-8">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 text-sm font-medium transition-colors hover:border-primary/50"
      >
        <ArrowLeft className="size-4" /> Back to stays
      </button>

      {/* Gallery */}
      <div className="mt-4 overflow-hidden rounded-3xl border border-border">
        <div className="relative aspect-[16/10] w-full">
          <img
            src={property.images[activeImage] || '/placeholder.svg'}
            alt={`${property.name} — view ${activeImage + 1}`}
            className="size-full object-cover"
          />
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-navy/85 px-2.5 py-1 text-xs font-medium text-navy-foreground backdrop-blur-md">
            <BadgeCheck className="size-3.5 text-primary" strokeWidth={2.5} />
            Verified {property.verifiedDaysAgo} days ago
          </span>
        </div>
        <div className="flex gap-2 bg-card p-2">
          {property.images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveImage(i)}
              className={`relative aspect-[4/3] flex-1 overflow-hidden rounded-xl ring-2 transition-all ${
                activeImage === i ? 'ring-primary' : 'ring-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img src={img || '/placeholder.svg'} alt="" className="size-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Title */}
      <div className="mt-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-balance md:text-3xl">
            {property.name}
          </h1>
          <p className="mt-1 inline-flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="size-4" /> {property.location}
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 text-sm font-medium">
          <Star className="size-4 fill-primary text-primary" />
          {property.rating}
          <span className="text-muted-foreground">({property.reviews})</span>
        </span>
      </div>

      <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
        {property.description} Hosted by {property.host}.
      </p>

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.8fr)]">
        {/* Ground truth */}
        <div>
          <SectionTitle
            eyebrow="Verified ground truth"
            title="What we actually tested on site"
          />
          <div className="mt-5 space-y-4 rounded-3xl border border-border bg-card p-5 shadow-sm md:p-6">
            <div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-primary/12 text-primary">
                    <Wifi className="size-4" />
                  </span>
                  <div>
                    <p className="font-medium">Wi-Fi speed</p>
                    <p className="text-xs text-muted-foreground">Download, tested on site</p>
                  </div>
                </div>
                <p className="font-display text-lg font-semibold">{property.ground.wifiMbps} <span className="text-sm font-medium text-muted-foreground">Mbps</span></p>
              </div>
              <div className="mt-3 h-3 overflow-hidden rounded-full bg-muted" role="progressbar" aria-label="Wi-Fi speed" aria-valuenow={property.ground.wifiMbps} aria-valuemin={0} aria-valuemax={250}>
                <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${Math.min((property.ground.wifiMbps / 250) * 100, 100)}%` }} />
              </div>
              <div className="mt-1.5 flex justify-between text-[11px] text-muted-foreground"><span>0 Mbps</span><span>250 Mbps tested range</span></div>
            </div>

            <div className="border-t border-border pt-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-primary/12 text-primary">
                    <Volume2 className="size-4" />
                  </span>
                  <div>
                    <p className="font-medium">Noise level</p>
                    <p className="text-xs text-muted-foreground">Lower is quieter</p>
                  </div>
                </div>
                <p className="font-display text-lg font-semibold">{property.ground.noiseDb} <span className="text-sm font-medium text-muted-foreground">dB</span></p>
              </div>
              <div className="mt-3 h-3 overflow-hidden rounded-full bg-muted" role="progressbar" aria-label="Noise level" aria-valuenow={property.ground.noiseDb} aria-valuemin={0} aria-valuemax={60}>
                <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${Math.min((property.ground.noiseDb / 60) * 100, 100)}%` }} />
              </div>
              <div className="mt-1.5 flex justify-between text-[11px] text-muted-foreground"><span>Quiet</span><span>{property.ground.noiseLabel}</span><span>Busy</span></div>
            </div>

            <div className="flex items-center gap-3 border-t border-border pt-4">
              <span className="flex size-9 items-center justify-center rounded-xl bg-primary/12 text-primary"><Footprints className="size-4" /></span>
              <div className="flex-1"><p className="font-medium">Walkability</p><p className="text-xs text-muted-foreground">Cafés and transit nearby</p></div>
              <p className="font-display text-lg font-semibold">{property.ground.walkScore}<span className="text-sm font-medium text-muted-foreground">/100</span></p>
            </div>
          </div>

          <div className="mt-4 rounded-3xl border border-primary/25 bg-primary/8 p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-primary"><ShieldCheck className="size-5" /> Verified host notes</div>
            <p className="mt-3 text-sm leading-relaxed text-foreground/80">Host {property.host} confirms the workspace has a proper desk, fresh linens, and reliable hot water. Our agent cross-checked these details during the latest visit.</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-background/70 px-2.5 py-1.5"><Check className="size-3.5 text-primary" /> Matches photos</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-background/70 px-2.5 py-1.5"><Check className="size-3.5 text-primary" /> Host interviewed</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-background/70 px-2.5 py-1.5"><Check className="size-3.5 text-primary" /> Tested {property.verifiedDaysAgo} days ago</span>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="lg:sticky lg:top-24">
          <div className="rounded-3xl border border-border bg-card p-5 shadow-sm md:p-6">
            <div className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">Your all-in stay</div>
            <SectionTitle title="Transparent pricing" />
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">
                  ${pricing.nightly} × {pricing.nights} nights
                </dt>
                <dd className="font-medium">${subtotal}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Cleaning</dt>
                <dd className="font-medium">${pricing.cleaning}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Taxes</dt>
                <dd className="font-medium">${pricing.taxes}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-border pt-3">
                <dt className="font-display text-base font-semibold">Total</dt>
                <dd className="font-display text-base font-semibold">${total}</dd>
              </div>
            </dl>

            <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary/12 px-3 py-1.5 text-xs font-medium text-primary">
              <Check className="size-3.5" strokeWidth={3} /> Zero hidden resort fees
            </p>

            <button
              type="button"
              onClick={() => setCheckoutOpen(true)}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.01] active:scale-100"
            >
              <>
                <ShieldCheck className="size-4" /> Book with Flex Guarantee
              </>
            </button>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              Free changes up to 48h before check-in
            </p>
          </div>
        </div>
      </div>

      <Modal open={checkoutOpen} onClose={() => !booking && setCheckoutOpen(false)} title="Complete your stay">
        <p className="-mt-2 text-sm text-muted-foreground">{property.name} · {pricing.nights} nights · 2 guests</p>
        <div className="mt-5 space-y-3 rounded-2xl bg-muted/60 p-4 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">Base fare</span><span>${subtotal}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Taxes & cleaning</span><span>${pricing.taxes + pricing.cleaning}</span></div>
          <label className="flex cursor-pointer items-center justify-between gap-3 border-t border-border pt-3">
            <span><span className="block font-medium">Flex Guarantee <span className="text-primary">(+10%)</span></span><span className="text-xs text-muted-foreground">Free changes up to 48h before check-in</span></span>
            <input type="checkbox" checked={flexEnabled} onChange={(event) => setFlexEnabled(event.target.checked)} className="size-5 accent-primary" />
          </label>
          <div className="flex justify-between border-t border-border pt-3 font-display font-semibold"><span>Total</span><span>${total}</span></div>
        </div>
        <button type="button" disabled={booking} onClick={() => { setBooking(true); window.setTimeout(() => { onBooked(property, total); setBooking(false); setCheckoutOpen(false) }, 1000) }} className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground disabled:opacity-70">
          {booking ? 'Confirming your stay…' : 'Confirm & Book'}
        </button>
      </Modal>
    </div>
  )
}
