"use client"

import { useState, useEffect } from "react"
import {
  ArrowRight,
  Beaker,
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
  const [dcurvesDownloads, setDcurvesDownloads] = useState("58k")
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
    let isMounted = true

    const loadDcurvesDownloads = async () => {
      try {
        const response = await fetch("./dcurves-downloads.json")

        if (!response.ok) {
          return
        }

        const data = (await response.json()) as { roundedDownloads?: string }

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
      <header className="fixed top-0 left-0 right-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm transition-shadow duration-300">
        <div className="container mx-auto max-w-full overflow-x-hidden px-2 sm:px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Beaker className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              <span className="text-lg sm:text-xl font-bold text-[#1E3A8A]">CIMS</span>
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
              >
                {isMobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
        {isMobileNavOpen && (
          <>
            <div className="absolute inset-x-0 top-full h-screen bg-black/10 backdrop-blur-[1px] md:hidden" onClick={() => setIsMobileNavOpen(false)} />
            <div className="absolute inset-x-0 top-full flex justify-center px-3 pt-3 md:hidden">
              <nav className="w-full max-w-sm rounded-2xl border bg-background/95 p-2 shadow-2xl ring-1 ring-primary/10 backdrop-blur">
                <div className="mb-1 px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Navigate
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <a
                    href="#features"
                    className="rounded-xl px-3 py-3 text-sm font-medium text-[#1E3A8A] transition-colors hover:bg-primary/10 hover:text-primary"
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    Features
                  </a>
                  <a
                    href="#benefits"
                    className="rounded-xl px-3 py-3 text-sm font-medium text-[#1E3A8A] transition-colors hover:bg-primary/10 hover:text-primary"
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    Benefits
                  </a>
                  <a
                    href="#team"
                    className="rounded-xl px-3 py-3 text-sm font-medium text-[#1E3A8A] transition-colors hover:bg-primary/10 hover:text-primary"
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    Team
                  </a>
                  <a
                    href="#pricing"
                    className="rounded-xl px-3 py-3 text-sm font-medium text-[#1E3A8A] transition-colors hover:bg-primary/10 hover:text-primary"
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    Pricing
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
          </>
        )}
      </header>
      <main className="flex-1 w-full overflow-x-hidden pt-16">
        <section className="relative w-full overflow-hidden bg-gradient-to-b from-background to-[#F1F5F9] py-4 md:min-h-[calc(100vh-4rem)] md:max-h-[calc(100vh-4rem)] md:py-6 lg:py-7">
          <div className="ambient-bloom pointer-events-none absolute left-[-6rem] top-6 h-72 w-72 rounded-full bg-primary/20 blur-3xl"></div>
          <div className="ambient-bloom pointer-events-none absolute right-[-4rem] top-20 h-80 w-80 rounded-full bg-[#2DD4BF]/20 blur-3xl [animation-delay:1.8s]"></div>
          <div className="ambient-bloom pointer-events-none absolute left-[22%] bottom-[-2rem] h-60 w-60 rounded-full bg-[#FB923C]/16 blur-3xl [animation-delay:0.9s]"></div>
          <div className="container relative z-10 px-2 sm:px-4 md:px-6 mx-auto">
            <div className="max-w-7xl mx-auto grid gap-6 md:min-h-[calc(100vh-9rem)] md:items-center lg:grid-cols-[1fr_600px] lg:gap-10 xl:grid-cols-[1fr_800px]">
              <div className="flex flex-col justify-center space-y-4 sm:space-y-6 text-center lg:text-left">
                <div className="space-y-2 sm:space-y-3 mx-auto lg:mx-0 max-w-full">
                  <div className="section-chip section-chip-secondary-soft text-[11px] whitespace-nowrap sm:text-xs lg:mx-0 lg:text-sm">
                    Tailored Inventory Software for Chemical Workflows
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl text-[#1E3A8A] break-words">
                    <span className="block">Software Designed</span>
                    <span className="block">Directly With</span>
                    <span className="accent-glow block text-3xl sm:text-4xl lg:text-6xl font-extrabold tracking-tight text-[#FB923C]">
                      Your Team
                    </span>
                  </h1>
                  <p className="text-sm sm:text-base text-muted-foreground md:text-lg">
                    I work directly with companies to design chemical inventory software around their actual workflows,
                    compliance needs, and operating constraints. This is not a generic app. It is a focused system
                    shaped to fit the way your team really works.
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

        <section className="w-full py-6 md:py-10 lg:py-14 bg-gradient-to-br from-[#F1F5F9] via-background to-[#F1F5F9] relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-grid-primary/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          <div className="container px-2 sm:px-4 md:px-6 relative z-10 content-container">
            <div className="flex flex-col items-center justify-center space-y-2 sm:space-y-3 text-center">
              <div className="space-y-2 sm:space-y-3 max-w-[900px]">
                <div className="section-chip section-chip-primary-soft sm:text-sm">
                  Key Features
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl/tight text-[#1E3A8A]">
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
                <h3 className="text-lg sm:text-xl font-bold text-[#1E3A8A]">Comprehensive Tracking</h3>
                <p className="text-center text-xs sm:text-sm text-muted-foreground">
                  Track the fields your organization needs, from product numbers and CAS numbers to internal locations,
                  batch details, and custom operational metadata.
                </p>
              </div>
              <div className="ambient-panel card-breathe [animation-delay:0.6s] flex flex-col items-center space-y-3 sm:space-y-4 rounded-lg border bg-card p-4 sm:p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.02] hover:border-primary/20">
                <div className="icon-beat flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#2DD4BF]/10">
                  <History className="h-5 w-5 sm:h-6 sm:w-6 text-[#2DD4BF]" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#1E3A8A]">Detailed Audit Logs</h3>
                <p className="text-center text-xs sm:text-sm text-muted-foreground">
                  Capture the audit trail your compliance process requires, with change history, timestamps, and user
                  accountability aligned to your internal standards.
                </p>
              </div>
              <div className="ambient-panel card-breathe [animation-delay:1.2s] flex flex-col items-center space-y-3 sm:space-y-4 rounded-lg border bg-card p-4 sm:p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.02] hover:border-primary/20">
                <div className="icon-beat flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#FB923C]/10">
                  <Building2 className="h-5 w-5 sm:h-6 sm:w-6 text-[#FB923C]" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#1E3A8A]">Supplier Management</h3>
                <p className="text-center text-xs sm:text-sm text-muted-foreground">
                  Maintain supplier records, contacts, and purchasing context in a way that matches how your team
                  evaluates and sources chemicals.
                </p>
              </div>
              <div className="ambient-panel card-breathe [animation-delay:1.8s] flex flex-col items-center space-y-3 sm:space-y-4 rounded-lg border bg-card p-4 sm:p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.02] hover:border-primary/20">
                <div className="icon-beat flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#FB923C]/10">
                  <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6 text-[#FB923C]" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#1E3A8A]">Purchaser Tracking</h3>
                <p className="text-center text-xs sm:text-sm text-muted-foreground">
                  Record purchaser details, approvals, and transaction history in workflows tailored to your
                  authorization and handoff process.
                </p>
              </div>
              <div className="ambient-panel card-breathe [animation-delay:2.4s] flex flex-col items-center space-y-3 sm:space-y-4 rounded-lg border bg-card p-4 sm:p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.02] hover:border-primary/20">
                <div className="icon-beat flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#1E3A8A]">User Management</h3>
                <p className="text-center text-xs sm:text-sm text-muted-foreground">
                  Configure role-based access, permissions, and team structures around the people and departments in
                  your organization.
                </p>
              </div>
              <div className="ambient-panel card-breathe [animation-delay:3s] flex flex-col items-center space-y-3 sm:space-y-4 rounded-lg border bg-card p-4 sm:p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.02] hover:border-primary/20">
                <div className="icon-beat flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#2DD4BF]/10">
                  <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-[#2DD4BF]" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#1E3A8A]">Inventory Analytics</h3>
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

        <section className="w-full py-6 md:py-10 lg:py-14 bg-gradient-to-tr from-background via-[#F1F5F9]/30 to-background relative">
          <div className="pointer-events-none absolute inset-0 bg-dot-pattern opacity-5"></div>
          <div className="container px-2 sm:px-4 md:px-6 content-container">
            <div className="grid gap-6 sm:gap-10 px-2 sm:px-6 md:gap-16 lg:grid-cols-2">
              <div className="space-y-2 sm:space-y-3">
                <div className="section-chip section-chip-secondary sm:text-sm lg:mx-0">
                  Benefits
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl/tight text-[#1E3A8A]">
                  A Better Fit Than Off-the-Shelf Software
                </h2>
                <p className="max-w-[600px] text-xs sm:text-sm text-muted-foreground md:text-base">
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
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#1E3A8A]">
                      Enhanced Safety & Compliance
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Maintain accurate records for regulatory compliance and safety audits with controls and data
                      structures designed around your environment.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 sm:gap-4 items-start">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-[#2DD4BF]/10 shrink-0">
                    <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-[#2DD4BF]" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#1E3A8A]">Reduced Waste & Costs</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Optimize inventory levels with workflows tuned to your purchasing patterns, storage constraints,
                      and waste-reduction goals.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 sm:gap-4 items-start">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-[#FB923C]/10 shrink-0">
                    <ClipboardList className="h-4 w-4 sm:h-5 sm:w-5 text-[#FB923C]" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#1E3A8A]">Simplified Auditing</h3>
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

        <section className="w-full py-6 md:py-10 lg:py-14 bg-[#F1F5F9]">
          <div className="container px-2 sm:px-4 md:px-6 content-container">
            <div className="grid gap-6 sm:gap-10 lg:grid-cols-2 items-center">
              <div className="space-y-2 sm:space-y-3">
                <div className="section-chip section-chip-accent-soft sm:text-sm lg:mx-0">
                  Built With You
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tighter text-[#1E3A8A] whitespace-nowrap">
                  Custom Software Without Generic Software Bloat
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground md:text-base max-w-[600px]">
                  I partner directly with companies to define the right scope, workflows, and reporting from the start
                  so the final system feels purpose-built rather than retrofitted.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-[#FB923C]/10 p-1 mt-1">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-[#FB923C]"
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
                    <div className="rounded-full bg-[#FB923C]/10 p-1 mt-1">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-[#FB923C]"
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
                    <div className="rounded-full bg-[#FB923C]/10 p-1 mt-1">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-[#FB923C]"
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
                <div className="ambient-panel absolute -inset-4 rounded-xl bg-gradient-to-r from-primary/20 to-[#2DD4BF]/20 blur-xl opacity-50"></div>
                <div className="relative bg-white rounded-xl border shadow-lg p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div className="flex items-center gap-2">
                      <Beaker className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                      <span className="text-base sm:text-lg font-bold text-[#1E3A8A]">Chemical Inventory</span>
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Focused. Tailored. Practical.</div>
                  </div>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="h-2 w-full bg-[#F1F5F9] rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-primary rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 sm:gap-4">
                      <div className="rounded-lg border p-2 sm:p-3 text-center bg-white">
                        <div className="text-xl sm:text-2xl font-bold text-primary">1738</div>
                        <div className="text-[10px] sm:text-xs text-muted-foreground">Chemicals</div>
                      </div>
                      <div className="rounded-lg border p-2 sm:p-3 text-center bg-white">
                        <div className="text-xl sm:text-2xl font-bold text-[#2DD4BF]">24</div>
                        <div className="text-[10px] sm:text-xs text-muted-foreground">Suppliers</div>
                      </div>
                      <div className="rounded-lg border p-2 sm:p-3 text-center bg-white">
                        <div className="text-xl sm:text-2xl font-bold text-[#FB923C]">12</div>
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

        <section className="w-full py-4 sm:py-6 md:py-8 lg:py-10 bg-gradient-to-br from-background via-[#F1F5F9]/30 to-background relative">
          <div className="pointer-events-none absolute inset-0 bg-dot-pattern opacity-5"></div>
          <div className="container px-2 sm:px-4 md:px-6 relative z-10 content-container">
            <div className="flex flex-col items-center justify-center space-y-2 text-center">
              <div className="space-y-2">
                <div className="section-chip section-chip-accent sm:text-sm">
                  Our Team
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl/tight text-[#1E3A8A]">
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
                    <h3 className="text-center md:text-left text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-[#1E3A8A]">
                      Shaun Porwal
                    </h3>
                    <p className="text-center md:text-left text-xs sm:text-sm text-primary font-medium mb-2 sm:mb-3">
                      Machine Learning Engineer
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Shaun Porwal has built biomedical AI systems spanning agentic workflows, survival modeling
                      pipelines, and foundation-model research for biology, including recent work as a Founding Engineer
                      at a biotech startup. Previously, he worked at Memorial Sloan Kettering Cancer Center, where he
                      developed clinical machine learning tools and created <strong>dcurves</strong> ({dcurvesDownloads}
                      downloads), an open-source Python library for decision curve analysis. His background also
                      includes hands-on chemistry experience in labs and manufacturing environments in the United
                      States, Taiwan, and Japan, which informs the way he thinks about chemical workflows in practice.
                      That mix of technical depth and operational context helps him partner closely with companies to
                      design software tailored to their needs rather than shipping a one-size-fits-all product. Shaun
                      holds a B.S. in Biomedical Engineering and Chinese from Rutgers University and an M.S. in
                      Biomedical Data Science from the Icahn School of Medicine at Mount Sinai.
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
                    <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-[#1E3A8A]">Mikael Moise</h3>
                    <p className="text-xs sm:text-sm text-[#2DD4BF] font-medium mb-2 sm:mb-3">Data Scientist</p>
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
        <section className="w-full py-6 md:py-10 lg:py-14 bg-gradient-to-b from-[#F1F5F9] to-background relative">
          <div className="pointer-events-none absolute inset-0 bg-grid-primary/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          <div className="container px-2 sm:px-4 md:px-6 relative z-10 content-container">
            <div className="flex flex-col items-center justify-center space-y-2 sm:space-y-3 text-center">
              <div className="space-y-2 sm:space-y-3 max-w-[900px]">
                <div className="section-chip section-chip-primary sm:text-sm">
                  Pricing
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl/tight text-[#1E3A8A]">
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
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#1E3A8A]">Enterprise</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                    For organizations that need tailored rollout, white glove service, and pricing built around their
                    needs
                  </p>
                </div>
                <ul className="mb-8 space-y-3 flex-1">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-[#FB923C] mr-2 flex-shrink-0" />
                    <span className="text-[11px] sm:text-xs whitespace-nowrap">Tailored for your team size and operating model</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-[#FB923C] mr-2 flex-shrink-0" />
                    <span className="text-[11px] sm:text-xs whitespace-nowrap">White glove onboarding and rollout support</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-[#FB923C] mr-2 flex-shrink-0" />
                    <span className="text-[11px] sm:text-xs whitespace-nowrap">Direct collaboration to shape workflows and reporting</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-[#FB923C] mr-2 flex-shrink-0" />
                    <span className="text-[11px] sm:text-xs whitespace-nowrap">Software tailored to your company instead of a generic app</span>
                  </li>
                </ul>
                <Button className="w-full bg-[#FB923C] hover:bg-[#FB923C]/90 text-xs sm:text-sm" asChild>
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
      <footer className="w-full border-t py-4 sm:py-6 bg-[#1E3A8A] text-white">
        <div className="container flex flex-col items-center justify-center gap-2 sm:gap-4 px-2 sm:px-4 md:px-6 text-center">
          <div className="flex items-center gap-2">
            <Beaker className="h-5 w-5 sm:h-6 sm:w-6 text-[#93C5FD]" />
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
              className="bg-[#2DD4BF] hover:bg-[#2DD4BF]/90 text-xs sm:text-sm"
            >
              Add Chemical
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
