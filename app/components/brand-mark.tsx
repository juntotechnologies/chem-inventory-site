/** The ChemInventory flask mark, drawn from the path in site.json. */
import { site } from "@/lib/site"

type BrandMarkProps = { className?: string }

export function BrandMark({ className }: BrandMarkProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d={site.brand.markPath} />
    </svg>
  )
}
