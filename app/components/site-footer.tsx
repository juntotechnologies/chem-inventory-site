/** The footer: wordmark, the plain links, the copyright line and the hub link. */
import { BrandMark } from "@/app/components/brand-mark"
import { UI_LABELS } from "@/app/ui-labels"

const { brand, links, actions, mailto } = UI_LABELS

const FOOTER_LINKS = [
  { href: links.staticDemo, label: actions.staticDemo },
  { href: links.booking, label: actions.bookMeeting },
  { href: mailto.cimsQuery, label: actions.contactUs },
]

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <a href={href} className="inline-flex min-h-11 items-center text-small text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">{label}</a>
    </li>
  )
}

function renderFooterLink(link: { href: string; label: string }) {
  return <FooterLink key={link.href} {...link} />
}

function Copyright() {
  return (
    <p className="text-balance text-small text-muted-foreground" suppressHydrationWarning>
      © {new Date().getFullYear()} {brand.fullName}. {brand.rights}
    </p>
  )
}

function FooterBrand() {
  return (
    <p className="col-span-12 flex items-center justify-center gap-2 text-heading lg:col-span-6 lg:justify-start">
      <BrandMark className="h-6 w-6 text-primary" />
      {brand.name}
    </p>
  )
}

function FooterBottom() {
  return (
    <div className="col-span-12 flex flex-col items-center justify-between gap-2 border-t pt-8 lg:flex-row">
      <Copyright />
      <a href={links.hub} className="inline-flex min-h-11 items-center text-small text-muted-foreground underline underline-offset-4 hover:text-foreground">{brand.hubLink}</a>
    </div>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t py-12">
      <div className="shell grid-12 gap-y-8 text-center lg:text-left">
        <FooterBrand />
        <ul className="col-span-12 flex flex-col items-center lg:col-span-6 lg:flex-row lg:justify-end lg:gap-6">{FOOTER_LINKS.map(renderFooterLink)}</ul>
        <FooterBottom />
      </div>
    </footer>
  )
}
