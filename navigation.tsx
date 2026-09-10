'use client'

import { Compass, LifeBuoy, User, Wallet } from 'lucide-react'
import { Logo } from './primitives'
import { cn } from '@/lib/utils'

export type TabId = 'discover' | 'trips' | 'support' | 'profile'

export const tabs: { id: TabId; label: string; icon: typeof Compass }[] = [
  { id: 'discover', label: 'Discover', icon: Compass },
  { id: 'trips', label: 'Trips & Wallet', icon: Wallet },
  { id: 'support', label: 'Support', icon: LifeBuoy },
  { id: 'profile', label: 'Profile', icon: User },
]

export function TopNav({
  active,
  onChange,
}: {
  active: TabId
  onChange: (id: TabId) => void
}) {
  return (
    <header className="sticky top-0 z-30 hidden border-b border-border bg-background/85 backdrop-blur-md md:block">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <Logo />
        <nav className="flex items-center gap-1">
          {tabs.map(({ id, label, icon: Icon }) => {
            const isActive = active === id
            return (
              <button
                key={id}
                type="button"
                onClick={() => onChange(id)}
                className={cn(
                  'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground/70 hover:bg-muted hover:text-foreground',
                )}
              >
                <Icon className="size-4" strokeWidth={2.25} />
                {label}
              </button>
            )
          })}
        </nav>
      </div>
    </header>
  )
}

export function MobileHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 px-5 py-3.5 backdrop-blur-md md:hidden">
      <Logo />
    </header>
  )
}

export function BottomNav({
  active,
  onChange,
}: {
  active: TabId
  onChange: (id: TabId) => void
}) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden">
      <div className="mx-auto flex max-w-md items-stretch justify-around px-2 py-1.5">
        {tabs.map(({ id, label, icon: Icon }) => {
          const isActive = active === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              className={cn(
                'flex flex-1 flex-col items-center gap-1 rounded-xl px-1 py-2 text-[11px] font-medium transition-colors',
                isActive ? 'text-primary' : 'text-muted-foreground',
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              <span
                className={cn(
                  'grid size-9 place-items-center rounded-full transition-colors',
                  isActive ? 'bg-primary/12' : 'bg-transparent',
                )}
              >
                <Icon className="size-5" strokeWidth={isActive ? 2.5 : 2} />
              </span>
              <span className="leading-none">{label.split(' ')[0]}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
