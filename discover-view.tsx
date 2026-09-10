'use client'

import { useState } from 'react'
import {
  BadgeCheck,
  Calendar,
  MapPin,
  Search,
  Star,
  Users,
  Wifi,
} from 'lucide-react'
import { filterChips, properties, type Property } from '@/lib/data'
import { Chip, VerifiedBadge } from './primitives'

function SearchField({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <span className="text-primary">{icon}</span>
      <div className="min-w-0">
        <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p className="truncate text-sm font-medium">{value}</p>
      </div>
    </div>
  )
}

function PropertyCard({
  property,
  onOpen,
}: {
  property: Property
  onOpen: () => void
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex w-full flex-col overflow-hidden rounded-3xl border border-border bg-card text-left transition-all hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <img
          src={property.images[0] || '/placeholder.svg'}
          alt={`${property.name} in ${property.location}`}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <VerifiedBadge daysAgo={property.verifiedDaysAgo} className="absolute left-3 top-3" />
        <div className="absolute bottom-3 right-3 rounded-full bg-card/95 px-3 py-1.5 text-sm font-semibold shadow-sm backdrop-blur">
          ${property.allInPrice}
          <span className="font-normal text-muted-foreground">/night total</span>
        </div>
      </div>
      <div className="flex flex-col gap-1 p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-display font-semibold tracking-tight">{property.name}</h3>
          <span className="inline-flex items-center gap-1 text-sm font-medium">
            <Star className="size-3.5 fill-primary text-primary" />
            {property.rating}
          </span>
        </div>
        <p className="inline-flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="size-3.5" /> {property.location}
        </p>
        <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-primary">
          <Wifi className="size-3.5" />
          {property.ground.wifiMbps} Mbps verified
        </div>
      </div>
    </button>
  )
}

export function DiscoverView({ onOpenProperty }: { onOpenProperty: (id: string) => void }) {
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const toggle = (chip: string) =>
    setActiveFilters((prev) =>
      prev.includes(chip) ? prev.filter((c) => c !== chip) : [...prev, chip],
    )

  const visible = activeFilters.length
    ? properties.filter((p) => activeFilters.every((f) => p.tags.includes(f)))
    : properties

  return (
    <div className="mx-auto max-w-6xl px-5 py-6 md:px-6 md:py-10">
      <div className="max-w-2xl">
        <p className="inline-flex items-center gap-1.5 rounded-full bg-primary/12 px-3 py-1 text-xs font-semibold text-primary">
          <BadgeCheck className="size-3.5" /> Every stay verified on the ground
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-balance md:text-4xl">
          Stays you can actually trust.
        </h1>
        <p className="mt-2 text-pretty text-muted-foreground">
          Real WiFi tests, measured noise levels, and all-in prices. No panic banners, no surprise
          resort fees.
        </p>
      </div>

      {/* Search bar */}
      <div className="mt-6 rounded-3xl border border-border bg-card p-2 shadow-sm">
        <div className="grid divide-y divide-border sm:grid-cols-[1.4fr_1.4fr_1fr_auto] sm:divide-x sm:divide-y-0">
          <SearchField icon={<MapPin className="size-5" />} label="Destination" value="Lisbon, Portugal" />
          <SearchField icon={<Calendar className="size-5" />} label="Dates" value="Jun 14 – 17" />
          <SearchField icon={<Users className="size-5" />} label="Guests" value="2 adults" />
          <div className="flex items-center p-2">
            <button
              type="button"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-100"
            >
              <Search className="size-4" strokeWidth={2.5} />
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Filter chips */}
      <div className="mt-5">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">Vibe &amp; utility filters</p>
          {activeFilters.length > 0 ? (
            <button
              type="button"
              onClick={() => setActiveFilters([])}
              className="text-xs font-medium text-primary"
            >
              Clear
            </button>
          ) : null}
        </div>
        <div className="no-scrollbar -mx-5 mt-3 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:px-0">
          {filterChips.map((chip) => (
            <Chip key={chip} active={activeFilters.includes(chip)} onClick={() => toggle(chip)}>
              <BadgeCheck className="size-3.5" />
              {chip}
            </Chip>
          ))}
        </div>
      </div>

      {/* Property grid */}
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onOpen={() => onOpenProperty(property.id)}
          />
        ))}
      </div>
      {visible.length === 0 ? (
        <p className="mt-10 text-center text-muted-foreground">
          No stays match every filter yet. Try removing one.
        </p>
      ) : null}
    </div>
  )
}
