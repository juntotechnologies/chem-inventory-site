/** Sticky header: wordmark, section links with a sliding indicator, two actions and the phone menu. */
import { useLayoutEffect } from "react"

import { BookingAction, ContactAction } from "@/app/components/action-links"
import { BrandMark } from "@/app/components/brand-mark"
import { MobileMenu } from "@/app/components/mobile-menu"
import { UI_LABELS } from "@/app/ui-labels"
import { settleIndicator, previewLink } from "@/lib/nav-indicator"
import { useScrolled } from "@/lib/scroll-state"
import { useActiveSection } from "@/lib/section-spy"

type NavItem = { href: string; label: string }

function Wordmark() {
  return (
    <a href="#top" className="flex h-11 items-center gap-2 text-heading">
      <BrandMark className="h-6 w-6 text-primary" />
      {UI_LABELS.brand.name}
    </a>
  )
}

function NavLink({ item }: { item: NavItem }) {
  const active = useActiveSection()
  const current = item.href === `#${active}` ? "location" : undefined
  return (
    <a href={item.href} aria-current={current} className="nav-link" onPointerEnter={previewLink} onFocus={previewLink}>
      {item.label}
    </a>
  )
}

function renderNavLink(item: NavItem) {
  return <NavLink key={item.href} item={item} />
}

function NavLinks() {
  const active = useActiveSection()
  useLayoutEffect(settleIndicator, [active])
  return (
    <nav aria-label="Sections" data-nav-links className="nav-links hidden md:flex" onPointerLeave={settleIndicator} onBlur={settleIndicator}>
      {UI_LABELS.nav.map(renderNavLink)}
      <span aria-hidden="true" className="nav-indicator" />
    </nav>
  )
}

function NavActions() {
  return (
    <div className="hidden items-center gap-3 md:flex">
      <BookingAction size="sm" />
      <ContactAction size="sm" />
    </div>
  )
}

export function SiteNav() {
  const scrolled = useScrolled()
  return (
    <header className="site-header" data-scrolled={scrolled}>
      <div className="shell flex h-16 items-center justify-between gap-6">
        <Wordmark />
        <NavLinks />
        <NavActions />
        <MobileMenu />
      </div>
    </header>
  )
}
