"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Beaker,
  ClipboardList,
  History,
  Users,
  Building2,
  ShoppingCart,
  Shield,
  BarChart3,
  Check,
  Github,
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
        <div className="container flex h-16 items-center justify-between px-2 sm:px-4 mx-auto max-w-full overflow-x-hidden">
          <div className="flex items-center gap-2">
            <Beaker className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            <span className="text-lg sm:text-xl font-bold text-[#1E3A8A]">CIMS</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#benefits" className="text-sm font-medium hover:text-primary transition-colors">
              Benefits
            </Link>
            <Link href="#team" className="text-sm font-medium hover:text-primary transition-colors">
              Team
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center">
            <Button size="sm" className="text-xs sm:text-sm" asChild>
              <a href="mailto:juntotechnologiesllc@gmail.com?subject=CIMS%20Query">
                Contact Us
                <ArrowRight className="ml-1 h-3 w-3 sm:ml-2 sm:h-4 sm:w-4" />
              </a>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 w-full overflow-x-hidden pt-16">
        <section className="w-full py-6 md:py-12 lg:py-16 xl:py-24 bg-gradient-to-b from-background to-[#F1F5F9] overflow-x-hidden">
          <div className="container px-2 sm:px-4 md:px-6 mx-auto">
            <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-[1fr_600px] lg:gap-12 xl:grid-cols-[1fr_800px] items-start">
              <div className="flex flex-col justify-center space-y-4 sm:space-y-6 text-center lg:text-left">
                <div className="space-y-2 sm:space-y-3 mx-auto lg:mx-0 max-w-full">
                  <div className="inline-block rounded-full bg-[#2DD4BF]/20 px-2 py-1 text-xs sm:text-sm text-[#2DD4BF] font-medium">
                    Just Inventory. Nothing More. Nothing Less.
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl text-[#1E3A8A] break-words">
                    Chemical Inventory Management System
                  </h1>
                  <p className="text-sm sm:text-base text-muted-foreground md:text-lg">
                    For those who want to do inventory <span className="font-bold text-[#1E3A8A]">just right</span>. No
                    QuickBooks complexity. No unnecessary features. Just powerful chemical inventory tracking that
                    works.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center lg:justify-start">
                  <Button
                    size="sm"
                    className="transition-all hover:scale-105 bg-primary text-white text-xs sm:text-sm"
                    asChild
                  >
                    <a href="mailto:juntotechnologiesllc@gmail.com?subject=Demo%20Request">
                      Request Demo
                      <ArrowRight className="ml-1 h-3 w-3 sm:ml-2 sm:h-4 sm:w-4" />
                    </a>
                  </Button>
                </div>
              </div>
              <div className="flex items-start justify-center w-full pt-4 overflow-hidden">
                {/* Replace the old dashboard with our new interactive one */}
                <InventoryDashboard />
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider"></div>

        <VideoSection title="See CIMS in Action" embedUrl="https://www.youtube.com/embed/v251ll_f4AY" autoplay={true} />

        <div className="section-divider"></div>

        <section
          id="features"
          className="w-full py-6 md:py-10 lg:py-14 bg-gradient-to-br from-[#F1F5F9] via-background to-[#F1F5F9] relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-grid-primary/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          <div className="container px-2 sm:px-4 md:px-6 relative z-10 content-container">
            <div className="flex flex-col items-center justify-center space-y-2 sm:space-y-3 text-center">
              <div className="space-y-2 sm:space-y-3 max-w-[900px]">
                <div className="inline-block rounded-full bg-primary px-2 py-1 text-xs sm:text-sm text-white font-medium">
                  Key Features
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl/tight text-[#1E3A8A]">
                  Focused Solely on Chemical Inventory Excellence
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground md:text-lg px-2">
                  While other systems try to do everything, CIMS masters just one thing: chemical inventory management.
                  No bloat, no complexity—just the features you actually need.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-3 sm:gap-4 py-4 sm:py-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-3 sm:space-y-4 rounded-lg border bg-card p-4 sm:p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.02] hover:border-primary/20">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-primary/10">
                  <ClipboardList className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#1E3A8A]">Comprehensive Tracking</h3>
                <p className="text-center text-xs sm:text-sm text-muted-foreground">
                  Track product numbers, chemical names, CAS numbers, batch numbers, and locations in one centralized
                  system.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 sm:space-y-4 rounded-lg border bg-card p-4 sm:p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.02] hover:border-primary/20">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#2DD4BF]/10">
                  <History className="h-5 w-5 sm:h-6 sm:w-6 text-[#2DD4BF]" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#1E3A8A]">Detailed Audit Logs</h3>
                <p className="text-center text-xs sm:text-sm text-muted-foreground">
                  Complete history of all inventory changes with timestamps and user information for compliance and
                  accountability.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 sm:space-y-4 rounded-lg border bg-card p-4 sm:p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.02] hover:border-primary/20">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#FB923C]/10">
                  <Building2 className="h-5 w-5 sm:h-6 sm:w-6 text-[#FB923C]" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#1E3A8A]">Supplier Management</h3>
                <p className="text-center text-xs sm:text-sm text-muted-foreground">
                  Maintain detailed supplier records with contact information and purchase history for each chemical.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 sm:space-y-4 rounded-lg border bg-card p-4 sm:p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.02] hover:border-primary/20">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#FB923C]/10">
                  <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6 text-[#FB923C]" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#1E3A8A]">Purchaser Tracking</h3>
                <p className="text-center text-xs sm:text-sm text-muted-foreground">
                  Record and manage all purchaser information with complete transaction history and authorization
                  details.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 sm:space-y-4 rounded-lg border bg-card p-4 sm:p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.02] hover:border-primary/20">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#1E3A8A]">User Management</h3>
                <p className="text-center text-xs sm:text-sm text-muted-foreground">
                  Secure role-based access control with customizable permissions for different user types and
                  departments.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 sm:space-y-4 rounded-lg border bg-card p-4 sm:p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.02] hover:border-primary/20">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#2DD4BF]/10">
                  <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-[#2DD4BF]" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#1E3A8A]">Inventory Analytics</h3>
                <p className="text-center text-xs sm:text-sm text-muted-foreground">
                  Powerful reporting tools to analyze inventory levels, usage patterns, and forecast future needs.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider"></div>

        <section
          id="benefits"
          className="w-full py-6 md:py-10 lg:py-14 bg-gradient-to-tr from-background via-[#F1F5F9]/30 to-background relative"
        >
          <div className="absolute inset-0 bg-dot-pattern opacity-5"></div>
          <div className="container px-2 sm:px-4 md:px-6 content-container">
            <div className="grid gap-6 sm:gap-10 px-2 sm:px-6 md:gap-16 lg:grid-cols-2">
              <div className="space-y-2 sm:space-y-3">
                <div className="inline-block rounded-lg bg-[#2DD4BF] px-2 py-1 text-xs sm:text-sm text-white font-medium">
                  Benefits
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl/tight text-[#1E3A8A]">
                  Streamline Your Chemical Management
                </h2>
                <p className="max-w-[600px] text-xs sm:text-sm text-muted-foreground md:text-base">
                  CIMS eliminates the complexity of chemical inventory management, helping you maintain compliance and
                  improve operational efficiency.
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
                      Maintain accurate records for regulatory compliance and safety audits with detailed tracking of
                      all chemical information.
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
                      Optimize inventory levels to minimize excess stock and reduce waste of expensive or time-sensitive
                      chemicals.
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
                      Generate comprehensive audit reports with complete history of all inventory changes, transactions,
                      and user actions.
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
                <div className="inline-block rounded-full bg-[#FB923C]/20 px-2 py-1 text-xs sm:text-sm text-[#FB923C] font-medium">
                  Simplicity by Design
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl/tight text-[#1E3A8A]">
                  We Focused on One Thing So You Can Focus on Your Work
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground md:text-base max-w-[600px]">
                  Unlike bloated enterprise systems that try to do everything, CIMS was built with a singular focus:
                  making chemical inventory management as efficient and painless as possible.
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
                    <span className="text-xs sm:text-sm">No QuickBooks complexity or steep learning curve</span>
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
                    <span className="text-xs sm:text-sm">No unnecessary modules you'll never use</span>
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
                      Just the features you need, perfected through years of feedback
                    </span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-primary/20 to-[#2DD4BF]/20 blur-xl opacity-50"></div>
                <div className="relative bg-white rounded-xl border shadow-lg p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div className="flex items-center gap-2">
                      <Beaker className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                      <span className="text-base sm:text-lg font-bold text-[#1E3A8A]">Chemical Inventory</span>
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Focused. Efficient. Simple.</div>
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
                      "Just the features you need, nothing you don't."
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider"></div>

        <section
          id="team"
          className="w-full py-4 sm:py-6 md:py-8 lg:py-10 bg-gradient-to-br from-background via-[#F1F5F9]/30 to-background relative"
        >
          <div className="absolute inset-0 bg-dot-pattern opacity-5"></div>
          <div className="container px-2 sm:px-4 md:px-6 relative z-10 content-container">
            <div className="flex flex-col items-center justify-center space-y-2 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-[#FB923C] px-2 py-1 text-xs sm:text-sm text-white font-medium">
                  Our Team
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl/tight text-[#1E3A8A]">
                  Meet the Experts Behind CIMS
                </h2>
                <p className="max-w-[900px] text-xs sm:text-sm text-muted-foreground md:text-base px-2">
                  Our team combines expertise in data science, machine learning, and chemical management to deliver the
                  best inventory solution.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-6xl gap-4 sm:gap-6 py-4 sm:py-6 grid-cols-1 lg:grid-cols-2">
              <div className="flex flex-col space-y-3 sm:space-y-4 rounded-xl border bg-white p-4 sm:p-6 shadow-sm overflow-hidden">
                <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
                  <div className="w-full md:w-1/3 flex-shrink-0">
                    <div className="relative aspect-square overflow-hidden rounded-lg">
                      <img
                        src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/images/shaun.jpeg`}
                        alt="Shaun Porwal"
                        className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-2/3">
                    <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-[#1E3A8A]">Shaun Porwal</h3>
                    <p className="text-xs sm:text-sm text-primary font-medium mb-2 sm:mb-3">
                      Machine Learning Engineer
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Shaun Porwal is a Machine Learning Engineer at Memorial Sloan Kettering Cancer Center, author of
                      <strong> dcurves</strong> (31,000+ downloads), and architect of <strong>RAIAT</strong>—an AI
                      prototype that uses computer vision and large language models to aid radiologists; he also
                      developed a secure, Llama 3.1–powered retrieval‑augmented generation text‑to‑SQL pipeline serving
                      over 50 data scientists. Shaun holds a B.S. in Biomedical Engineering and Chinese (honors) from
                      Rutgers University and an M.S. in Biomedical Data Science from the Icahn School of Medicine at
                      Mount Sinai. He contributes to open‑source projects, performs on the violin, studies Mandarin,
                      Japanese, and Spanish, and trains for marathons.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-3 sm:space-y-4 rounded-xl border bg-white p-4 sm:p-6 shadow-sm overflow-hidden">
                <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
                  <div className="w-full md:w-1/3 flex-shrink-0">
                    <div className="relative aspect-square overflow-hidden rounded-lg">
                      <img
                        src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/images/mikael.jpeg`}
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

        <div className="section-divider"></div>

        {/* Pricing Section */}
        <section
          id="pricing"
          className="w-full py-6 md:py-10 lg:py-14 bg-gradient-to-b from-[#F1F5F9] to-background relative"
        >
          <div className="absolute inset-0 bg-grid-primary/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          <div className="container px-2 sm:px-4 md:px-6 relative z-10 content-container">
            <div className="flex flex-col items-center justify-center space-y-2 sm:space-y-3 text-center">
              <div className="space-y-2 sm:space-y-3 max-w-[900px]">
                <div className="inline-block rounded-full bg-primary px-2 py-1 text-xs sm:text-sm text-white font-medium">
                  Pricing
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl/tight text-[#1E3A8A]">
                  Simple, Transparent Pricing
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground md:text-lg px-2">
                  Choose the plan that fits your needs. No hidden fees, no complicated pricing structures.
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl items-start gap-6 sm:gap-8 py-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {/* Open Source Plan */}
              <div className="flex flex-col h-full rounded-xl border bg-card p-6 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20">
                <div className="mb-5">
                  <h3 className="text-lg sm:text-xl font-bold text-[#1E3A8A]">Open Source</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-2">For individual contributors</p>
                </div>
                <div className="mb-5">
                  <div className="flex items-baseline">
                    <span className="text-3xl sm:text-4xl font-bold text-[#1E3A8A]">Free</span>
                  </div>
                </div>
                <ul className="mb-8 space-y-3 flex-1">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-gray-500 mr-2 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">Basic features</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-gray-500 mr-2 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">Self-hosted solution</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-gray-500 mr-2 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">1 user account</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-gray-500 mr-2 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">Community support</span>
                  </li>
                </ul>
                <Button className="w-full bg-gray-700 hover:bg-gray-800 text-xs sm:text-sm" asChild>
                  <a
                    href="https://github.com/juntotechnologies/chem-inventory"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    View on GitHub
                  </a>
                </Button>
              </div>

              {/* Basic Plan */}
              <div className="flex flex-col h-full rounded-xl border bg-card p-6 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20">
                <div className="mb-5">
                  <h3 className="text-lg sm:text-xl font-bold text-[#1E3A8A]">Basic</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-2">Perfect for small labs and startups</p>
                </div>
                <div className="mb-5">
                  <div className="flex items-baseline">
                    <span className="text-3xl sm:text-4xl font-bold text-[#1E3A8A]">$30</span>
                    <span className="text-sm text-muted-foreground ml-1">/month</span>
                  </div>
                </div>
                <ul className="mb-8 space-y-3 flex-1">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-[#2DD4BF] mr-2 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">Up to 500 chemical entries</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-[#2DD4BF] mr-2 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">2 user accounts</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-[#2DD4BF] mr-2 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">Email support</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-[#2DD4BF] mr-2 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">Cloud hosting included</span>
                  </li>
                </ul>
                <Button className="w-full bg-primary hover:bg-primary/90 text-xs sm:text-sm" asChild>
                  <a href="mailto:juntotechnologiesllc@gmail.com?subject=Interest%20in%20Basic%20Plan">Get Started</a>
                </Button>
              </div>

              {/* Advanced Plan */}
              <div className="flex flex-col h-full rounded-xl border bg-card p-6 sm:p-8 shadow-lg relative before:absolute before:inset-0 before:-z-10 before:rounded-xl before:bg-gradient-to-b before:from-primary/20 before:to-[#2DD4BF]/20 before:blur-xl before:opacity-50">
                <div className="absolute -top-4 left-0 right-0 mx-auto w-fit px-3 py-1 rounded-full bg-[#2DD4BF] text-white text-xs font-medium">
                  Most Popular
                </div>
                <div className="mb-5">
                  <h3 className="text-lg sm:text-xl font-bold text-[#1E3A8A]">Advanced</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-2">Ideal for growing research facilities</p>
                </div>
                <div className="mb-5">
                  <div className="flex items-baseline">
                    <span className="text-3xl sm:text-4xl font-bold text-[#1E3A8A]">$100</span>
                    <span className="text-sm text-muted-foreground ml-1">/month</span>
                  </div>
                </div>
                <ul className="mb-8 space-y-3 flex-1">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-[#2DD4BF] mr-2 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">Unlimited chemical entries</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-[#2DD4BF] mr-2 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">10 user accounts</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-[#2DD4BF] mr-2 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">Priority email support</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-[#2DD4BF] mr-2 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">Advanced analytics</span>
                  </li>
                </ul>
                <Button className="w-full bg-[#2DD4BF] hover:bg-[#2DD4BF]/90 text-xs sm:text-sm" asChild>
                  <a href="mailto:juntotechnologiesllc@gmail.com?subject=Interest%20in%20Advanced%20Plan">
                    Get Started
                  </a>
                </Button>
              </div>

              {/* Premium Plan (formerly Lifetime) */}
              <div className="flex flex-col h-full rounded-xl border bg-card p-6 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20">
                <div className="mb-5">
                  <h3 className="text-lg sm:text-xl font-bold text-[#1E3A8A]">Premium</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                    Best value for established organizations
                  </p>
                </div>
                <div className="mb-5">
                  <div className="flex items-baseline">
                    <span className="text-xl sm:text-2xl font-bold text-[#1E3A8A]">Request a quote</span>
                  </div>
                </div>
                <ul className="mb-8 space-y-3 flex-1">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-[#FB923C] mr-2 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">Everything in Advanced</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-[#FB923C] mr-2 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">Unlimited user accounts</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-[#FB923C] mr-2 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">Phone & email support</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-[#FB923C] mr-2 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">Custom integrations</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-[#FB923C] mr-2 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">Dedicated account manager</span>
                  </li>
                </ul>
                <Button className="w-full bg-[#FB923C] hover:bg-[#FB923C]/90 text-xs sm:text-sm" asChild>
                  <a href="mailto:juntotechnologiesllc@gmail.com?subject=Interest%20in%20Premium%20Plan">Get Started</a>
                </Button>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto">
                All plans include automatic updates and basic technical support. For custom enterprise solutions, please{" "}
                <a
                  href="mailto:juntotechnologiesllc@gmail.com?subject=Enterprise%20Inquiry"
                  className="text-primary hover:underline"
                >
                  contact our sales team
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
            &copy; {new Date().getFullYear()} Chemical Inventory Management System. All rights reserved.
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
