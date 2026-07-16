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
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import VideoSection from "@/app/components/video-section"
import { InventoryDashboard } from "@/app/components/inventory-dashboard"
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
              <span className="text-lg sm:text-xl font-bold text-dark-blue">CIMS</span>
              <span className="max-w-[7.25rem] border-l border-primary/20 pl-2 text-[9px] font-medium leading-tight text-muted-foreground sm:max-w-[9rem] sm:text-[10px] md:hidden lg:block">
                Chemical Inventory Management System
              </span>
            </div>
            <nav className="hidden items-center gap-5 md:flex lg:gap-6">
              <a href="#features" className="whitespace-nowrap text-sm font-medium hover:text-primary transition-colors">
                Features
              </a>
              <a href="#benefits" className="whitespace-nowrap text-sm font-medium hover:text-primary transition-colors">
                Benefits
              </a>
              <a href="#team" className="whitespace-nowrap text-sm font-medium hover:text-primary transition-colors">
                Team
              </a>
              <a href="#pricing" className="whitespace-nowrap text-sm font-medium hover:text-primary transition-colors">
                Pricing
              </a>
            </nav>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                className="hidden border-purple text-xs text-purple-dark hover:bg-purple hover:text-white sm:text-sm md:inline-flex"
                asChild
              >
                <a href="https://demo.cheminventory.co" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
                  Static Demo
                </a>
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="hidden border-coral text-xs text-coral-dark hover:bg-coral hover:text-white sm:text-sm md:inline-flex"
                asChild
              >
                <a href="https://cal.com/shaun-porwal-junto/30min" target="_blank" rel="noopener noreferrer">
                  <CalendarDays className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
                  Book a Meeting
                </a>
              </Button>
              <Button size="sm" className="hidden text-xs sm:text-sm md:inline-flex" asChild>
                <a href="mailto:juntotechnologiesllc@gmail.com?subject=CIMS%20Query">
                  Contact Us
                  <ArrowRight className="ml-1 h-3 w-3 sm:ml-2 sm:h-4 sm:w-4" />
                </a>
              </Button>
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-md text-primary transition-colors hover:bg-primary/10 md:hidden"
                onClick={() => setIsMobileNavOpen((open) => !open)}
                aria-label={isMobileNavOpen ? "Close navigation menu" : "Open navigation menu"}
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
                Navigate
              </div>
              <div className="flex flex-col gap-1 text-left">
                <a
                  href="#features"
                  className="rounded-xl px-3 py-3 text-sm font-medium text-dark-blue transition-colors hover:bg-primary/10 hover:text-primary"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  Features
                </a>
                <a
                  href="#benefits"
                  className="rounded-xl px-3 py-3 text-sm font-medium text-dark-blue transition-colors hover:bg-primary/10 hover:text-primary"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  Benefits
                </a>
                <a
                  href="#team"
                  className="rounded-xl px-3 py-3 text-sm font-medium text-dark-blue transition-colors hover:bg-primary/10 hover:text-primary"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  Team
                </a>
                <a
                  href="#pricing"
                  className="rounded-xl px-3 py-3 text-sm font-medium text-dark-blue transition-colors hover:bg-primary/10 hover:text-primary"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  Pricing
                </a>
                <a
                  href="https://demo.cheminventory.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 flex items-center gap-2 rounded-xl border border-purple bg-purple-soft px-3 py-3 text-sm font-medium text-purple-dark transition-colors hover:bg-purple hover:text-white"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  <ExternalLink className="h-4 w-4" />
                  Static Demo
                </a>
                <a
                  href="https://cal.com/shaun-porwal-junto/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 flex items-center gap-2 rounded-xl border border-coral bg-coral-soft px-3 py-3 text-sm font-medium text-coral-dark transition-colors hover:bg-coral hover:text-white"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  <CalendarDays className="h-4 w-4" />
                  Book a Meeting
                </a>
                <a
                  href="mailto:juntotechnologiesllc@gmail.com?subject=CIMS%20Query"
                  className="mt-1 rounded-xl bg-primary px-3 py-3 text-sm font-medium text-white transition-colors hover:bg-primary/90"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  Contact Us
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
                    Built Inside Real Chemistry Lab Workflows
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl text-dark-blue break-words">
                    <span className="block">Software Designed</span>
                    <span className="block">Directly With</span>
                    <span className="accent-glow block text-3xl sm:text-4xl lg:text-6xl font-extrabold tracking-tight text-coral">
                      Your Team
                    </span>
                  </h1>
                  <p className="text-sm sm:text-base text-muted-foreground md:text-lg">
                    Built from direct work inside a commercial chemistry lab, CIMS replaces brittle spreadsheets and
                    one-size-fits-all inventory tools with software shaped around real chemical workflows. The result:
                    fewer administrative errors, fewer delays, and more room for growing labs to scale.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                  <Button
                    size="sm"
                    className="soft-pulse ring-1 ring-primary/20 transition-all hover:scale-105 bg-primary text-white text-xs sm:text-sm"
                    asChild
                  >
                    <a href="mailto:juntotechnologiesllc@gmail.com?subject=Custom%20Software%20Inquiry">
                      Discuss Your Workflow
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
          title="See a Tailored CIMS Workflow in Action"
          embedUrl="https://www.youtube.com/embed/v251ll_f4AY"
          autoplay={true}
        />

        <div id="features" className="relative -top-6"></div>
        <div className="section-divider"></div>

        <section className="w-full py-6 md:py-10 lg:py-14 bg-gradient-to-br from-soft-gray via-background to-soft-gray relative overflow-hidden">
          <div className="container px-2 sm:px-4 md:px-6 relative z-10 content-container">
            <div className="flex flex-col items-center justify-center space-y-2 sm:space-y-3 text-center">
              <div className="space-y-2 sm:space-y-3 max-w-[900px]">
                <div className="section-chip section-chip-primary-soft sm:text-sm">
                  Key Features
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl/tight text-dark-blue">
                  Built Around the Work Your Team Actually Does
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground md:text-lg px-2">
                  Every implementation starts with your process, not a generic template. The result is software shaped
                  around chemical inventory workflows, approvals, reporting, and controls that matter to your company.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-3 sm:gap-4 py-4 sm:py-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <div className="ambient-panel card-breathe flex flex-col items-center space-y-3 sm:space-y-4 rounded-lg border bg-card p-4 sm:p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.02] hover:border-primary/20">
                <div className="icon-beat flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-primary/10">
                  <ClipboardList className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-dark-blue">Comprehensive Tracking</h3>
                <p className="text-center text-xs sm:text-sm text-muted-foreground">
                  Track the fields your organization needs, from product numbers and CAS numbers to internal locations,
                  batch details, and custom operational metadata.
                </p>
              </div>
              <div className="ambient-panel card-breathe [animation-delay:0.6s] flex flex-col items-center space-y-3 sm:space-y-4 rounded-lg border bg-card p-4 sm:p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.02] hover:border-primary/20">
                <div className="icon-beat flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-teal/10">
                  <History className="h-5 w-5 sm:h-6 sm:w-6 text-teal" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-dark-blue">Detailed Audit Logs</h3>
                <p className="text-center text-xs sm:text-sm text-muted-foreground">
                  Capture the audit trail your compliance process requires, with change history, timestamps, and user
                  accountability aligned to your internal standards.
                </p>
              </div>
              <div className="ambient-panel card-breathe [animation-delay:1.2s] flex flex-col items-center space-y-3 sm:space-y-4 rounded-lg border bg-card p-4 sm:p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.02] hover:border-primary/20">
                <div className="icon-beat flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-coral/10">
                  <Building2 className="h-5 w-5 sm:h-6 sm:w-6 text-coral" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-dark-blue">Supplier Management</h3>
                <p className="text-center text-xs sm:text-sm text-muted-foreground">
                  Maintain supplier records, contacts, and purchasing context in a way that matches how your team
                  evaluates and sources chemicals.
                </p>
              </div>
              <div className="ambient-panel card-breathe [animation-delay:1.8s] flex flex-col items-center space-y-3 sm:space-y-4 rounded-lg border bg-card p-4 sm:p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.02] hover:border-primary/20">
                <div className="icon-beat flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-coral/10">
                  <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6 text-coral" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-dark-blue">Purchaser Tracking</h3>
                <p className="text-center text-xs sm:text-sm text-muted-foreground">
                  Record purchaser details, approvals, and transaction history in workflows tailored to your
                  authorization and handoff process.
                </p>
              </div>
              <div className="ambient-panel card-breathe [animation-delay:2.4s] flex flex-col items-center space-y-3 sm:space-y-4 rounded-lg border bg-card p-4 sm:p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.02] hover:border-primary/20">
                <div className="icon-beat flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-dark-blue">User Management</h3>
                <p className="text-center text-xs sm:text-sm text-muted-foreground">
                  Configure role-based access, permissions, and team structures around the people and departments in
                  your organization.
                </p>
              </div>
              <div className="ambient-panel card-breathe [animation-delay:3s] flex flex-col items-center space-y-3 sm:space-y-4 rounded-lg border bg-card p-4 sm:p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.02] hover:border-primary/20">
                <div className="icon-beat flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-teal/10">
                  <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-teal" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-dark-blue">Inventory Analytics</h3>
                <p className="text-center text-xs sm:text-sm text-muted-foreground">
                  Surface the reports, dashboards, and forecasting views your company needs instead of forcing you into
                  canned analytics.
                </p>
              </div>
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
                  Benefits
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl/tight text-dark-blue text-center sm:text-left">
                  A Better Fit Than Off-the-Shelf Software
                </h2>
                <p className="max-w-[600px] text-xs sm:text-sm text-muted-foreground md:text-base text-center sm:text-left mx-auto sm:mx-0">
                  Working directly with your company means the software can support your exact chemical operations
                  instead of making your team adapt to a generic product.
                </p>
              </div>
              <div className="grid gap-4 sm:gap-6">
                <div className="flex gap-3 sm:gap-4 items-start">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-primary/10 shrink-0">
                    <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-dark-blue">
                      Enhanced Safety & Compliance
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Maintain accurate records for regulatory compliance and safety audits with controls and data
                      structures designed around your environment.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 sm:gap-4 items-start">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-teal/10 shrink-0">
                    <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-teal" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-dark-blue">Reduced Waste & Costs</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Optimize inventory levels with workflows tuned to your purchasing patterns, storage constraints,
                      and waste-reduction goals.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 sm:gap-4 items-start">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-coral/10 shrink-0">
                    <ClipboardList className="h-4 w-4 sm:h-5 sm:w-5 text-coral" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-dark-blue">Simplified Auditing</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Generate audit-ready reporting with the exact change history, transaction visibility, and user
                      actions your stakeholders need.
                    </p>
                  </div>
                </div>
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
                  Built With You
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tighter text-dark-blue leading-tight max-w-[28ch] sm:max-w-none text-center sm:text-left mx-auto sm:mx-0">
                  Custom Software Without Generic Software Bloat
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground md:text-base max-w-[600px] text-center sm:text-left mx-auto sm:mx-0">
                  I partner directly with companies to define the right scope, workflows, and reporting from the start
                  so the final system feels purpose-built rather than retrofitted.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
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
                    <span className="text-xs sm:text-sm">Designed around your workflows instead of forcing a generic process</span>
                  </li>
                  <li className="flex items-start gap-2">
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
                    <span className="text-xs sm:text-sm">No unnecessary modules or generic features your team will ignore</span>
                  </li>
                  <li className="flex items-start gap-2">
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
                    <span className="text-xs sm:text-sm">
                      Direct collaboration, thoughtful implementation, and software tailored to your needs
                    </span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="ambient-panel absolute -inset-4 rounded-xl bg-gradient-to-r from-primary/20 to-teal/20 blur-xl opacity-50"></div>
                <div className="relative bg-white rounded-xl border shadow-lg p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div className="flex items-center gap-2">
                      <Beaker className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                      <span className="text-base sm:text-lg font-bold text-dark-blue">Chemical Inventory</span>
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Focused. Tailored. Practical.</div>
                  </div>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="h-2 w-full bg-soft-gray rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-primary rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 sm:gap-4">
                      <div className="rounded-lg border p-2 sm:p-3 text-center bg-white">
                        <div className="text-xl sm:text-2xl font-bold text-primary">1738</div>
                        <div className="text-[10px] sm:text-xs text-muted-foreground">Chemicals</div>
                      </div>
                      <div className="rounded-lg border p-2 sm:p-3 text-center bg-white">
                        <div className="text-xl sm:text-2xl font-bold text-teal">24</div>
                        <div className="text-[10px] sm:text-xs text-muted-foreground">Suppliers</div>
                      </div>
                      <div className="rounded-lg border p-2 sm:p-3 text-center bg-white">
                        <div className="text-xl sm:text-2xl font-bold text-coral">12</div>
                        <div className="text-[10px] sm:text-xs text-muted-foreground">Locations</div>
                      </div>
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground text-center italic">
                      "Built around your workflow, not a generic template."
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
                  Our Team
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl/tight text-dark-blue">
                  Work Directly With the Builder
                </h2>
                <p className="max-w-[900px] text-xs sm:text-sm text-muted-foreground md:text-base px-2">
                  Shaun works directly with companies to understand their operations and design software that reflects
                  how their teams actually handle chemical inventory, compliance, and reporting.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-3xl gap-4 sm:gap-6 py-4 sm:py-6 grid-cols-1">
              <div className="flex flex-col space-y-3 sm:space-y-4 rounded-xl border bg-white p-4 sm:p-6 shadow-sm overflow-hidden">
                <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
                  <div className="w-full md:w-1/3 flex-shrink-0">
                    <div className="relative aspect-square overflow-hidden rounded-lg">
                      <img
                        src="/images/shaun.jpeg"
                        alt="Shaun Porwal"
                        className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-2/3">
                    <h3 className="text-center md:text-left text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-dark-blue">
                      Shaun Porwal
                    </h3>
                    <p className="text-center md:text-left text-xs sm:text-sm text-primary font-medium mb-2 sm:mb-3">
                      Machine Learning Engineer
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Shaun Porwal builds <strong>biomedical AI systems</strong> across agentic workflows,
                      survival modeling, and biology models. He recently worked as a{" "}
                      <strong>Founding Engineer at a biotech startup</strong> and previously built clinical ML tools at{" "}
                      <strong>Memorial Sloan Kettering Cancer Center</strong>, where he created{" "}
                      <a
                        href="https://github.com/MSKCC-Epi-Bio/dcurves"
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
                  Pricing
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl/tight text-dark-blue">
                  Pricing Built Around Your Organization
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground md:text-lg px-2">
                  Flexible pricing for companies that want tailored chemical inventory software and direct collaboration
                  throughout implementation.
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-lg items-start gap-6 py-8 grid-cols-1">
              <div className="mx-auto flex w-full max-w-md flex-col h-full rounded-xl border bg-card p-6 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20">
                <div className="mb-5 text-center">
                  <h3 className="text-2xl sm:text-3xl font-bold text-dark-blue">Enterprise</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                    For organizations that need tailored rollout, white glove service, and pricing built around their
                    needs
                  </p>
                </div>
                <ul className="mb-8 space-y-3 flex-1">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-coral mr-2 flex-shrink-0" />
                    <span className="text-[11px] sm:text-xs whitespace-nowrap">Tailored for your team size and operating model</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-coral mr-2 flex-shrink-0" />
                    <span className="text-[11px] sm:text-xs whitespace-nowrap">White glove onboarding and rollout support</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-coral mr-2 flex-shrink-0" />
                    <span className="text-[11px] sm:text-xs whitespace-nowrap">Direct collaboration to shape workflows and reporting</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-coral mr-2 flex-shrink-0" />
                    <span className="text-[11px] sm:text-xs whitespace-nowrap">Software tailored to your company instead of a generic app</span>
                  </li>
                </ul>
                <Button className="w-full bg-coral hover:bg-coral/90 text-xs sm:text-sm" asChild>
                  <a href="mailto:juntotechnologiesllc@gmail.com?subject=Enterprise%20Pricing%20Inquiry">Start the Conversation</a>
                </Button>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto">
                Need software designed around your company&apos;s workflow and support expectations?{" "}
                <a
                  href="mailto:juntotechnologiesllc@gmail.com?subject=Enterprise%20Inquiry"
                  className="text-primary hover:underline"
                >
                  Reach out to discuss pricing and fit
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
            <span className="text-base sm:text-lg font-bold">CIMS</span>
          </div>
          <p className="text-center text-xs sm:text-sm text-white/70">
            &copy; 2025 Chemical Inventory Management System. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Add Chemical Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px] max-w-[90vw]">
          <DialogHeader>
            <DialogTitle>Add New Chemical</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-2 sm:gap-4">
              <Label htmlFor="productNumber" className="text-right text-xs sm:text-sm">
                Product #
              </Label>
              <Input
                id="productNumber"
                value={newChemical.productNumber}
                onChange={(e) => setNewChemical({ ...newChemical, productNumber: e.target.value })}
                className="col-span-3 text-xs sm:text-sm"
                placeholder="PRD-1004"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-2 sm:gap-4">
              <Label htmlFor="name" className="text-right text-xs sm:text-sm">
                Chemical Name
              </Label>
              <Input
                id="name"
                value={newChemical.name}
                onChange={(e) => setNewChemical({ ...newChemical, name: e.target.value })}
                className="col-span-3 text-xs sm:text-sm"
                placeholder="Calcium Carbonate"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-2 sm:gap-4">
              <Label htmlFor="location" className="text-right text-xs sm:text-sm">
                Location
              </Label>
              <Input
                id="location"
                value={newChemical.location}
                onChange={(e) => setNewChemical({ ...newChemical, location: e.target.value })}
                className="col-span-3 text-xs sm:text-sm"
                placeholder="Lab D"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-2 sm:gap-4">
              <Label htmlFor="amount" className="text-right text-xs sm:text-sm">
                Amount
              </Label>
              <Input
                id="amount"
                value={newChemical.amount}
                onChange={(e) => setNewChemical({ ...newChemical, amount: e.target.value })}
                className="col-span-3 text-xs sm:text-sm"
                placeholder="20 kg"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="text-xs sm:text-sm">
              Cancel
            </Button>
            <Button
              onClick={handleAddChemical}
              disabled={!newChemical.productNumber || !newChemical.name || !newChemical.location || !newChemical.amount}
              className="bg-teal hover:bg-teal/90 text-xs sm:text-sm"
            >
              Add Chemical
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
