'use client'

import { useState } from 'react'
import { properties, upcomingTrip, wallet, type Property } from '@/lib/data'
import { BottomNav, MobileHeader, TopNav, type TabId } from './navigation'
import { DiscoverView } from './discover-view'
import { PropertyDetailView } from './property-detail-view'
import { TripsView } from './trips-view'
import { SupportView } from './support-view'
import { ProfileView } from './profile-view'

export type Reservation = typeof upcomingTrip

export function AtlasApp() {
  const [tab, setTab] = useState<TabId>('discover')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [reservation, setReservation] = useState<Reservation | null>(upcomingTrip)
  const [walletBalance, setWalletBalance] = useState(wallet.balance)
  const [toast, setToast] = useState<string | null>(null)
  const selected = properties.find((p) => p.id === selectedId) ?? null

  const changeTab = (id: TabId) => {
    setSelectedId(null)
    setTab(id)
  }

  const showToast = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(null), 3200)
  }

  const handleBooked = (property: Property, total: number) => {
    setReservation({
      propertyId: property.id,
      propertyName: property.name,
      location: property.location,
      image: property.images[0],
      checkIn: 'Sat, Jun 14',
      checkOut: `Tue, Jun ${14 + property.pricing.nights}`,
      nights: property.pricing.nights,
      guests: 2,
      confirmation: `ATLAS-${Math.random().toString(36).slice(2, 7).toUpperCase()}`,
      total,
      flexCredit: Math.round(total * 0.65),
    })
    setSelectedId(null)
    setTab('trips')
    showToast('Stay booked — your reservation is now in Trips.')
  }

  const handleFlexCredit = (credit: number) => {
    setWalletBalance((balance) => balance + credit)
    setReservation(null)
    showToast('Funds credited to your Atlas Wallet.')
  }

  return (
    <div className="min-h-dvh bg-background">
      <TopNav active={tab} onChange={changeTab} />
      <MobileHeader />
      <main className="pb-24 md:pb-10">
        {tab === 'discover' && (selected ? (
          <PropertyDetailView property={selected} onBack={() => setSelectedId(null)} onBooked={handleBooked} />
        ) : <DiscoverView onOpenProperty={setSelectedId} />)}
        {tab === 'trips' && <TripsView reservation={reservation} walletBalance={walletBalance} onFlexCredit={handleFlexCredit} onSwap={() => showToast('Your stay is ready to list on Atlas Swap Market.')} />}
        {tab === 'support' && <SupportView />}
        {tab === 'profile' && <ProfileView />}
      </main>
      <BottomNav active={tab} onChange={changeTab} />
      {toast ? <div role="status" className="fixed bottom-24 left-1/2 z-[60] -translate-x-1/2 rounded-full border border-primary/30 bg-navy px-4 py-3 text-sm font-medium text-navy-foreground shadow-xl animate-in slide-in-from-bottom-2 fade-in md:bottom-6">{toast}</div> : null}
    </div>
  )
}
