/** The phone menu. A browser popover opens it and covers the page below the header. It holds the section links and one action. */
import { Menu, X } from "lucide-react"
import { useEffect } from "react"

import { BookingAction } from "@/app/components/action-links"
import { UI_LABELS } from "@/app/ui-labels"
import { MENU_ID, closeMenuOnLink, syncPage, watchWidth } from "@/lib/menu"

function MenuLink({ href, label }: { href: string; label: string }) {
  return <a href={href} className="flex h-14 items-center justify-center rounded-md text-body font-medium">{label}</a>
}

function renderMenuLink(item: { href: string; label: string }) {
  return <MenuLink key={item.href} {...item} />
}

function MenuToggle() {
  return (
    <button type="button" popoverTarget={MENU_ID} aria-label={UI_LABELS.menu.label} className="menu-button flex h-11 w-11 items-center justify-center rounded-md border">
      <Menu className="icon-open h-5 w-5" />
      <X className="icon-close h-5 w-5" />
    </button>
  )
}

export function MobileMenu() {
  useEffect(watchWidth, [])
  return (
    <div className="mobile-menu md:hidden">
      <MenuToggle />
      <nav id={MENU_ID} popover="auto" aria-label={UI_LABELS.menu.label} className="menu-panel" onClick={closeMenuOnLink} onToggle={syncPage}>
        <div className="flex flex-col">{UI_LABELS.nav.map(renderMenuLink)}</div>
        <div className="btn-row mt-6">
          <BookingAction variant="default" />
        </div>
      </nav>
    </div>
  )
}
