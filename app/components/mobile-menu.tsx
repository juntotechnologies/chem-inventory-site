/** The phone menu. A browser popover opens it, so it needs no state: Escape and outside taps close it. */
import { Menu, X } from "lucide-react"

import { BookingAction, ContactAction, DemoAction } from "@/app/components/action-links"
import { UI_LABELS } from "@/app/ui-labels"
import { closeMenuOnLink } from "@/lib/menu"

const MENU_ID = "mobile-menu"

function MenuLink({ href, label }: { href: string; label: string }) {
  return <a href={href} className="flex h-12 items-center justify-center rounded-md text-body font-medium">{label}</a>
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
  return (
    <div className="mobile-menu md:hidden">
      <MenuToggle />
      <nav id={MENU_ID} popover="auto" aria-label={UI_LABELS.menu.label} className="menu-panel" onClick={closeMenuOnLink}>
        <div className="flex flex-col">{UI_LABELS.nav.map(renderMenuLink)}</div>
        <div className="btn-row mt-4">
          <DemoAction />
          <BookingAction />
          <ContactAction />
        </div>
      </nav>
    </div>
  )
}
