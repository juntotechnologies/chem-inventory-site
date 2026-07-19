"use client"

import { useState, useEffect, useRef } from "react"
import {
  ArrowRight,
  Beaker,
  CalendarDays,
  ExternalLink,
  Menu,
  X,
  ClipboardList,
  History,
  Users,
  Building2,
  ShoppingCart,
  Shield,
  BarChart3,
  Check,
  type LucideIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import VideoSection from "@/app/components/video-section"
import { InventoryDashboard } from "@/app/components/inventory-dashboard"
import { UI_LABELS } from "@/app/ui-labels"
import { getDcurvesLibraryDescription } from "@/lib/dcurves-copy"

// Define the type for a chemical record
type ChemicalRecord = {
  id: number
  productNumber: string
  name: string
  location: string
  amount: string
  lastModified: string
}

const SECTION_ICONS: Record<string, LucideIcon> = {
  BarChart3,
  Building2,
  ClipboardList,
  History,
  Shield,
  ShoppingCart,
  Users,
}

export default function Home() {
  // Initial chemical records
  const initialChemicals: ChemicalRecord[] = [
    {
      id: 1,
      productNumber: "PRD-1001",
      name: "Sodium Chloride",
      location: "Lab A",
      amount: "5 kg",
      lastModified: "1 day ago",
    },
    {
      id: 2,
      productNumber: "PRD-1002",
      name: "Potassium Hydroxide",
      location: "Lab B",
      amount: "10 kg",
      lastModified: "2 days ago",
    },
    {
      id: 3,
      productNumber: "PRD-1003",
      name: "Hydrochloric Acid",
      location: "Lab C",
      amount: "15 L",
      lastModified: "3 days ago",
    },
  ]

  // State for chemical records, search query, and dialog
  const [chemicals, setChemicals] = useState<ChemicalRecord[]>(initialChemicals)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [dcurvesDownloads, setDcurvesDownloads] = useState<string | null>(null)
  const dcurvesLibraryDescription = getDcurvesLibraryDescription(dcurvesDownloads)
  const mobileNavButtonRef = useRef<HTMLButtonElement | null>(null)
  const mobileNavPanelRef = useRef<HTMLElement | null>(null)
  const [newChemical, setNewChemical] = useState<Omit<ChemicalRecord, "id" | "lastModified">>({
    productNumber: "",
    name: "",
    location: "",
    amount: "",
  })

  // Filter chemicals based on search query
  const filteredChemicals = chemicals.filter((chemical) => {
    if (!searchQuery) return true

    const query = searchQuery.toLowerCase()
    return (
      chemical.productNumber.toLowerCase().includes(query) ||
      chemical.name.toLowerCase().includes(query) ||
      chemical.location.toLowerCase().includes(query) ||
      chemical.amount.toLowerCase().includes(query)
    )
  })

  // Handle adding a new chemical
  const handleAddChemical = () => {
    const newRecord: ChemicalRecord = {
      id: chemicals.length + 1,
      productNumber: newChemical.productNumber,
      name: newChemical.name,
      location: newChemical.location,
      amount: newChemical.amount,
      lastModified: "Just now",
    }

    setChemicals([...chemicals, newRecord])
    setIsAddDialogOpen(false)
    setNewChemical({
      productNumber: "",
      name: "",
      location: "",
      amount: "",
    })
  }

  // Reset to initial state on page refresh/mount
  useEffect(() => {
    setChemicals(initialChemicals)
    setSearchQuery("")
  }, [])

  useEffect(() => {
    if (!isMobileNavOpen) return

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null
      if (!target) return

      if (mobileNavPanelRef.current?.contains(target)) return
      if (mobileNavButtonRef.current?.contains(target)) return
      setIsMobileNavOpen(false)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileNavOpen(false)
    }

    document.addEventListener("pointerdown", handlePointerDown)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isMobileNavOpen])

  useEffect(() => {
    let isMounted = true

    const loadDcurvesDownloads = async () => {
      try {
        const response = await fetch("./dcurves-downloads.json")

        if (!response.ok) {
          return
        }

        const data = (await response.json()) as { roundedDownloads?: string | null }

        if (isMounted && data.roundedDownloads) {
          setDcurvesDownloads(data.roundedDownloads)
        }
      } catch {
        // Keep the fallback count if the fetch fails.
      }
    }

    void loadDcurvesDownloads()

    return () => {
      isMounted = false
    }
  }, [])

  // Add shadow to navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector("header")
      if (header) {
        if (window.scrollY > 10) {
          header.classList.add("shadow-md")
          header.classList.remove("shadow-sm")
        } else {
          header.classList.remove("shadow-md")
          header.classList.add("shadow-sm")
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <header className="fixed top-0 left-0 right-0 z-50 w-full border-b bg-background shadow-sm transition-shadow duration-300">
        <div className="container mx-auto max-w-full overflow-x-hidden px-2 sm:px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Beaker className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              <span className="text-lg sm:text-xl font-bold text-dark-blue">{UI_LABELS.brand.shortName}</span>
              <span className="max-w-[7.25rem] border-l border-primary/20 pl-2 text-[9px] font-medium leading-tight text-muted-foreground sm:max-w-[9rem] sm:text-[10px] md:hidden lg:block">
                {UI_LABELS.brand.fullName}
              </span>
            </div>
            <nav className="hidden items-center gap-5 md:flex lg:gap-6">
              {UI_LABELS.nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="whitespace-nowrap text-sm font-medium hover:text-primary transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                className="hidden border-purple text-xs text-purple-dark hover:bg-purple hover:text-white sm:text-sm md:inline-flex"
                asChild
              >
                <a href={UI_LABELS.links.staticDemo}>
                  <ExternalLink className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
                  {UI_LABELS.actions.staticDemo}
                </a>
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="hidden border-coral text-xs text-coral-dark hover:bg-coral hover:text-white sm:text-sm md:inline-flex"
                asChild
              >
                <a href={UI_LABELS.links.booking} target="_blank" rel="noopener noreferrer">
                  <CalendarDays className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
                  {UI_LABELS.actions.bookMeeting}
                </a>
              </Button>
              <Button size="sm" className="hidden text-xs sm:text-sm md:inline-flex" asChild>
                <a href={UI_LABELS.mailto.cimsQuery}>
                  {UI_LABELS.actions.contactUs}
                  <ArrowRight className="ml-1 h-3 w-3 sm:ml-2 sm:h-4 sm:w-4" />
                </a>
              </Button>
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-md text-primary transition-colors hover:bg-primary/10 md:hidden"
                onClick={() => setIsMobileNavOpen((open) => !open)}
                aria-label={isMobileNavOpen ? UI_LABELS.mobileNav.closeAriaLabel : UI_LABELS.mobileNav.openAriaLabel}
                aria-expanded={isMobileNavOpen}
                ref={mobileNavButtonRef}
              >
                {isMobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
        <div className={`md:hidden ${isMobileNavOpen ? "" : "pointer-events-none"}`} aria-hidden={!isMobileNavOpen}>
          <div
            className={`absolute inset-x-0 top-full h-screen bg-black/10 backdrop-blur-[1px] transition-opacity duration-150 ease-out motion-reduce:transition-none ${
              isMobileNavOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => setIsMobileNavOpen(false)}
          />
          <div className="absolute inset-x-0 top-full flex justify-center px-3 pt-3">
            <nav
              ref={mobileNavPanelRef}
              className={`w-full max-w-sm rounded-2xl border bg-background/95 p-2 shadow-2xl ring-1 ring-primary/10 backdrop-blur will-change-transform transition-[opacity,transform] duration-150 ease-out origin-top motion-reduce:transition-none motion-reduce:transform-none ${
                isMobileNavOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-2 scale-95"
              }`}
            >
              <div className="mb-1 px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {UI_LABELS.mobileNav.label}
              </div>
              <div className="flex flex-col gap-1 text-left">
                {UI_LABELS.nav.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="rounded-xl px-3 py-3 text-sm font-medium text-dark-blue transition-colors hover:bg-primary/10 hover:text-primary"
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href={UI_LABELS.links.staticDemo}
                  className="mt-1 flex items-center gap-2 rounded-xl border border-purple bg-purple-soft px-3 py-3 text-sm font-medium text-purple-dark transition-colors hover:bg-purple hover:text-white"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  <ExternalLink className="h-4 w-4" />
                  {UI_LABELS.actions.staticDemo}
                </a>
                <a
                  href={UI_LABELS.links.booking}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 flex items-center gap-2 rounded-xl border border-coral bg-coral-soft px-3 py-3 text-sm font-medium text-coral-dark transition-colors hover:bg-coral hover:text-white"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  <CalendarDays className="h-4 w-4" />
                  {UI_LABELS.actions.bookMeeting}
                </a>
                <a
                  href={UI_LABELS.mailto.cimsQuery}
                  className="mt-1 rounded-xl bg-primary px-3 py-3 text-sm font-medium text-white transition-colors hover:bg-primary/90"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  {UI_LABELS.actions.contactUs}
                </a>
              </div>
            </nav>
          </div>
        </div>
      </header>
      <main className="site-grid flex-1 w-full overflow-x-hidden pt-16">
        <section className="relative w-full overflow-hidden bg-gradient-to-b from-background to-soft-gray py-4 md:min-h-[calc(100vh-4rem)] md:max-h-[calc(100vh-4rem)] md:py-6 lg:py-7">
          <div className="ambient-bloom pointer-events-none absolute left-[-6rem] top-6 h-72 w-72 rounded-full bg-primary/20 blur-3xl"></div>
          <div className="ambient-bloom pointer-events-none absolute right-[-4rem] top-20 h-80 w-80 rounded-full bg-teal/20 blur-3xl [animation-delay:1.8s]"></div>
          <div className="ambient-bloom pointer-events-none absolute left-[22%] bottom-[-2rem] h-60 w-60 rounded-full bg-coral/16 blur-3xl [animation-delay:0.9s]"></div>
          <div className="container relative z-10 px-2 sm:px-4 md:px-6 mx-auto">
            <div className="max-w-7xl mx-auto grid gap-6 md:min-h-[calc(100vh-9rem)] md:items-center lg:grid-cols-[1fr_600px] lg:gap-10 xl:grid-cols-[1fr_800px]">
              <div className="flex flex-col justify-center space-y-4 sm:space-y-6 text-center lg:text-left">
                <div className="space-y-2 sm:space-y-3 mx-auto lg:mx-0 max-w-full">
                  <div className="section-chip section-chip-secondary-soft text-[11px] whitespace-nowrap sm:text-xs lg:mx-0 lg:text-sm">
                    {UI_LABELS.hero.eyebrow}
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl text-dark-blue break-words">
                    {UI_LABELS.hero.titleLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                    <span className="accent-glow block text-3xl sm:text-4xl lg:text-6xl font-extrabold tracking-tight text-coral">
                      {UI_LABELS.hero.titleAccent}
                    </span>
                  </h1>
                  <p className="text-sm sm:text-base text-muted-foreground md:text-lg">
                    {UI_LABELS.hero.body}
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                  <Button
                    size="sm"
                    className="soft-pulse ring-1 ring-primary/20 transition-all hover:scale-105 bg-primary text-white text-xs sm:text-sm"
                    asChild
                  >
                    <a href={UI_LABELS.mailto.customSoftwareInquiry}>
                      {UI_LABELS.actions.discussWorkflow}
                      <ArrowRight className="ml-1 h-3 w-3 sm:ml-2 sm:h-4 sm:w-4" />
                    </a>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center w-full overflow-hidden">
                {/* Replace the old dashboard with our new interactive one */}
                <InventoryDashboard />
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider"></div>

        <VideoSection
          title={UI_LABELS.video.title}
          embedUrl={UI_LABELS.video.embedUrl}
          autoplay={true}
        />

        <div id="features" className="relative -top-6"></div>
        <div className="section-divider"></div>

        <section className="w-full py-6 md:py-10 lg:py-14 bg-gradient-to-br from-soft-gray via-background to-soft-gray relative overflow-hidden">
          <div className="container px-2 sm:px-4 md:px-6 relative z-10 content-container">
            <div className="flex flex-col items-center justify-center space-y-2 sm:space-y-3 text-center">
              <div className="space-y-2 sm:space-y-3 max-w-[900px]">
                <div className="section-chip section-chip-primary-soft sm:text-sm">
                  {UI_LABELS.features.eyebrow}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl/tight text-dark-blue">
                  {UI_LABELS.features.title}
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground md:text-lg px-2">
                  {UI_LABELS.features.body}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-3 sm:gap-4 py-4 sm:py-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {UI_LABELS.features.items.map((item) => {
                const Icon = SECTION_ICONS[item.icon]

                return (
                  <div
                    key={item.title}
                    className={`ambient-panel card-breathe ${item.animationDelayClass} flex flex-col items-center space-y-3 sm:space-y-4 rounded-lg border bg-card p-4 sm:p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.02] hover:border-primary/20`}
                  >
                    <div
                      className={`icon-beat flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full ${item.iconWrapClass}`}
                    >
                      <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${item.iconClass}`} />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-dark-blue">{item.title}</h3>
                    <p className="text-center text-xs sm:text-sm text-muted-foreground">{item.body}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <div id="benefits" className="relative -top-6"></div>
        <div className="section-divider"></div>

        <section className="w-full py-6 md:py-10 lg:py-14 bg-gradient-to-tr from-background via-soft-gray/30 to-background relative">
          <div className="pointer-events-none absolute inset-0 bg-dot-pattern opacity-5"></div>
          <div className="container px-2 sm:px-4 md:px-6 content-container">
            <div className="grid gap-6 sm:gap-10 px-2 sm:px-6 md:gap-16 lg:grid-cols-2">
              <div className="space-y-2 sm:space-y-3">
                <div className="section-chip section-chip-secondary sm:text-sm lg:mx-0">
                  {UI_LABELS.benefits.eyebrow}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl/tight text-dark-blue text-center sm:text-left">
                  {UI_LABELS.benefits.title}
                </h2>
                <p className="max-w-[600px] text-xs sm:text-sm text-muted-foreground md:text-base text-center sm:text-left mx-auto sm:mx-0">
                  {UI_LABELS.benefits.body}
                </p>
              </div>
              <div className="grid gap-4 sm:gap-6">
                {UI_LABELS.benefits.items.map((item) => {
                  const Icon = SECTION_ICONS[item.icon]

                  return (
                    <div key={item.title} className="flex gap-3 sm:gap-4 items-start">
                      <div
                        className={`flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full ${item.iconWrapClass} shrink-0`}
                      >
                        <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${item.iconClass}`} />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-dark-blue">{item.title}</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground">{item.body}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider"></div>

        <section className="w-full py-6 md:py-10 lg:py-14 bg-soft-gray">
          <div className="container px-2 sm:px-4 md:px-6 content-container">
            <div className="grid gap-6 sm:gap-10 lg:grid-cols-2 items-center">
              <div className="space-y-2 sm:space-y-3">
                <div className="section-chip section-chip-accent-soft sm:text-sm lg:mx-0">
                  {UI_LABELS.builtWithYou.eyebrow}
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tighter text-dark-blue leading-tight max-w-[28ch] sm:max-w-none text-center sm:text-left mx-auto sm:mx-0">
                  {UI_LABELS.builtWithYou.title}
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground md:text-base max-w-[600px] text-center sm:text-left mx-auto sm:mx-0">
                  {UI_LABELS.builtWithYou.body}
                </p>
                <ul className="space-y-2">
                  {UI_LABELS.builtWithYou.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2">
                      <div className="rounded-full bg-coral/10 p-1 mt-1">
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-coral"
                        >
                          <path
                            d="M10 3L4.5 8.5L2 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span className="text-xs sm:text-sm">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="ambient-panel absolute -inset-4 rounded-xl bg-gradient-to-r from-primary/20 to-teal/20 blur-xl opacity-50"></div>
                <div className="relative bg-white rounded-xl border shadow-lg p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div className="flex items-center gap-2">
                      <Beaker className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                      <span className="text-base sm:text-lg font-bold text-dark-blue">
                        {UI_LABELS.builtWithYou.dashboardTitle}
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground">
                      {UI_LABELS.builtWithYou.dashboardKicker}
                    </div>
                  </div>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="h-2 w-full bg-soft-gray rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-primary rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 sm:gap-4">
                      {UI_LABELS.builtWithYou.stats.map((stat) => (
                        <div key={stat.label} className="rounded-lg border p-2 sm:p-3 text-center bg-white">
                          <div className={`text-xl sm:text-2xl font-bold ${stat.className}`}>{stat.value}</div>
                          <div className="text-[10px] sm:text-xs text-muted-foreground">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground text-center italic">
                      {UI_LABELS.builtWithYou.quote}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div id="team" className="relative -top-6"></div>
        <div className="section-divider"></div>

        <section className="w-full py-4 sm:py-6 md:py-8 lg:py-10 bg-gradient-to-br from-background via-soft-gray/30 to-background relative">
          <div className="pointer-events-none absolute inset-0 bg-dot-pattern opacity-5"></div>
          <div className="container px-2 sm:px-4 md:px-6 relative z-10 content-container">
            <div className="flex flex-col items-center justify-center space-y-2 text-center">
              <div className="space-y-2">
                <div className="section-chip section-chip-accent sm:text-sm">
                  {UI_LABELS.team.eyebrow}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl/tight text-dark-blue">
                  {UI_LABELS.team.title}
                </h2>
                <p className="max-w-[900px] text-xs sm:text-sm text-muted-foreground md:text-base px-2">
                  {UI_LABELS.team.body}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-3xl gap-4 sm:gap-6 py-4 sm:py-6 grid-cols-1">
              <div className="flex flex-col space-y-3 sm:space-y-4 rounded-xl border bg-white p-4 sm:p-6 shadow-sm overflow-hidden">
                <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
                  <div className="w-full md:w-1/3 flex-shrink-0">
                    <div className="relative aspect-square overflow-hidden rounded-lg">
                      <img
                        src={UI_LABELS.team.primaryMember.image}
                        alt={UI_LABELS.team.primaryMember.name}
                        className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-2/3">
                    <h3 className="text-center md:text-left text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-dark-blue">
                      {UI_LABELS.team.primaryMember.name}
                    </h3>
                    <p className="text-center md:text-left text-xs sm:text-sm text-primary font-medium mb-2 sm:mb-3">
                      {UI_LABELS.team.primaryMember.title}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Shaun Porwal builds <strong>biomedical AI systems</strong> across agentic workflows,
                      survival modeling, and biology models. He recently worked as a{" "}
                      <strong>Founding Engineer at a biotech startup</strong> and previously built clinical ML tools at{" "}
                      <strong>Memorial Sloan Kettering Cancer Center</strong>, where he created{" "}
                      <a
                        href={UI_LABELS.links.dcurves}
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold text-primary hover:underline"
                      >
                        dcurves
                      </a>
                      {dcurvesLibraryDescription.hasDownloadCount ? (
                        <>
                          , an open-source Python library with{" "}
                          <strong>
                            <em>{dcurvesLibraryDescription.downloads}</em>
                          </strong>{" "}
                          downloads.
                        </>
                      ) : (
                        <>, {dcurvesLibraryDescription.fallbackDescription}.</>
                      )}{" "}
                      He has <strong>hands-on chemistry experience</strong> in labs and manufacturing across the U.S.,
                      Taiwan, and Japan. He holds a{" "}
                      <strong>B.S. in Biomedical Engineering</strong> and an{" "}
                      <strong>M.S. in Biomedical Data Science</strong>.
                    </p>
                  </div>
                </div>
              </div>
              <div className="hidden flex-col space-y-3 sm:space-y-4 rounded-xl border bg-white p-4 sm:p-6 shadow-sm overflow-hidden">
                <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
                  <div className="w-full md:w-1/3 flex-shrink-0">
                    <div className="relative aspect-square overflow-hidden rounded-lg">
                      <img
                        src="/images/mikael.jpeg"
                        alt="Mikael Moise"
                        className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-2/3">
                    <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-dark-blue">Mikael Moise</h3>
                    <p className="text-xs sm:text-sm text-teal font-medium mb-2 sm:mb-3">Data Scientist</p>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Mikael Moise is a Data Scientist at Memorial Sloan Kettering Cancer Center, where he leverages
                      Python and SQL to drive clinical analytics. Previously, he served as a Technical Marketing
                      Engineer at Palo Alto Networks and built a desktop app using Vue.js, MariaDB, Golang and Electron
                      as a Frontend Developer Intern at Nimbus Controls. He earned his M.S. in Data Science from the New
                      York Institute of Technology and his B.S. in Computer Science from Smith College. Outside of work,
                      Mikael contributes to open‑source front‑end projects, explores emerging data science tools, and
                      enjoys hiking and photography.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div id="pricing" className="relative -top-6"></div>
        <div className="section-divider"></div>

        {/* Pricing Section */}
        <section className="w-full py-6 md:py-10 lg:py-14 bg-gradient-to-b from-soft-gray to-background relative">
          <div className="container px-2 sm:px-4 md:px-6 relative z-10 content-container">
            <div className="flex flex-col items-center justify-center space-y-2 sm:space-y-3 text-center">
              <div className="space-y-2 sm:space-y-3 max-w-[900px]">
                <div className="section-chip section-chip-primary sm:text-sm">
                  {UI_LABELS.pricing.eyebrow}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl/tight text-dark-blue">
                  {UI_LABELS.pricing.title}
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground md:text-lg px-2">
                  {UI_LABELS.pricing.body}
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-lg items-start gap-6 py-8 grid-cols-1">
              <div className="mx-auto flex w-full max-w-md flex-col h-full rounded-xl border bg-card p-6 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20">
                <div className="mb-5 text-center">
                  <h3 className="text-2xl sm:text-3xl font-bold text-dark-blue">{UI_LABELS.pricing.planName}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                    {UI_LABELS.pricing.planBody}
                  </p>
                </div>
                <ul className="mb-8 space-y-3 flex-1">
                  {UI_LABELS.pricing.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center">
                      <Check className="h-4 w-4 text-coral mr-2 flex-shrink-0" />
                      <span className="text-[11px] sm:text-xs whitespace-nowrap">{bullet}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-coral hover:bg-coral/90 text-xs sm:text-sm" asChild>
                  <a href={UI_LABELS.mailto.enterprisePricingInquiry}>{UI_LABELS.actions.startConversation}</a>
                </Button>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto">
                {UI_LABELS.pricing.footerLead}{" "}
                <a
                  href={UI_LABELS.mailto.enterpriseInquiry}
                  className="text-primary hover:underline"
                >
                  {UI_LABELS.actions.pricingFit}
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        <div className="section-divider"></div>
      </main>
      <footer className="w-full border-t py-4 sm:py-6 bg-dark-blue text-white">
        <div className="container flex flex-col items-center justify-center gap-2 sm:gap-4 px-2 sm:px-4 md:px-6 text-center">
          <div className="flex items-center gap-2">
            <Beaker className="h-5 w-5 sm:h-6 sm:w-6 text-light-blue" />
            <span className="text-base sm:text-lg font-bold">{UI_LABELS.brand.shortName}</span>
          </div>
          <p className="text-center text-xs sm:text-sm text-white/70">
            {UI_LABELS.brand.footerCopyright}
          </p>
        </div>
      </footer>

      {/* Add Chemical Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px] max-w-[90vw]">
          <DialogHeader>
            <DialogTitle>{UI_LABELS.addChemicalDialog.title}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-2 sm:gap-4">
              <Label htmlFor="productNumber" className="text-right text-xs sm:text-sm">
                {UI_LABELS.addChemicalDialog.fields.productNumber.label}
              </Label>
              <Input
                id="productNumber"
                value={newChemical.productNumber}
                onChange={(e) => setNewChemical({ ...newChemical, productNumber: e.target.value })}
                className="col-span-3 text-xs sm:text-sm"
                placeholder={UI_LABELS.addChemicalDialog.fields.productNumber.placeholder}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-2 sm:gap-4">
              <Label htmlFor="name" className="text-right text-xs sm:text-sm">
                {UI_LABELS.addChemicalDialog.fields.name.label}
              </Label>
              <Input
                id="name"
                value={newChemical.name}
                onChange={(e) => setNewChemical({ ...newChemical, name: e.target.value })}
                className="col-span-3 text-xs sm:text-sm"
                placeholder={UI_LABELS.addChemicalDialog.fields.name.placeholder}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-2 sm:gap-4">
              <Label htmlFor="location" className="text-right text-xs sm:text-sm">
                {UI_LABELS.addChemicalDialog.fields.location.label}
              </Label>
              <Input
                id="location"
                value={newChemical.location}
                onChange={(e) => setNewChemical({ ...newChemical, location: e.target.value })}
                className="col-span-3 text-xs sm:text-sm"
                placeholder={UI_LABELS.addChemicalDialog.fields.location.placeholder}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-2 sm:gap-4">
              <Label htmlFor="amount" className="text-right text-xs sm:text-sm">
                {UI_LABELS.addChemicalDialog.fields.amount.label}
              </Label>
              <Input
                id="amount"
                value={newChemical.amount}
                onChange={(e) => setNewChemical({ ...newChemical, amount: e.target.value })}
                className="col-span-3 text-xs sm:text-sm"
                placeholder={UI_LABELS.addChemicalDialog.fields.amount.placeholder}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="text-xs sm:text-sm">
              {UI_LABELS.addChemicalDialog.cancel}
            </Button>
            <Button
              onClick={handleAddChemical}
              disabled={!newChemical.productNumber || !newChemical.name || !newChemical.location || !newChemical.amount}
              className="bg-teal hover:bg-teal/90 text-xs sm:text-sm"
            >
              {UI_LABELS.addChemicalDialog.submit}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
