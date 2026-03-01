"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Menu,
  Beaker,
  BarChart3,
  Building2,
  ShoppingCart,
  Clock,
  Users,
  X,
  ChevronRight,
  Search,
  Plus,
  ChevronUp,
  ChevronDown,
  ArrowUpDown,
  ChevronLeft,
  Edit,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

type SidebarItem = {
  id: string
  icon: React.ElementType
  label: string
}

const sidebarItems: SidebarItem[] = [
  { id: "inventory", icon: Beaker, label: "Inventory" },
  { id: "transactions", icon: BarChart3, label: "Transactions" },
  { id: "suppliers", icon: Building2, label: "Suppliers" },
  { id: "purchasers", icon: ShoppingCart, label: "Purchasers" },
  { id: "audit", icon: Clock, label: "Audit Log" },
  { id: "users", icon: Users, label: "Users" },
]

// Define types for each data model
type ChemicalItem = {
  id: number
  productNumber: string
  name: string
  location: string
  amount: string
  lastModified: string
}

type Transaction = {
  id: number
  date: string
  type: string
  chemical: string
  amount: string
  user: string
}

type Supplier = {
  id: number
  name: string
  contact: string
  phone: string
  lastOrder: string
}

type Purchaser = {
  id: number
  name: string
  contact: string
  department: string
  lastPurchase: string
}

type AuditLog = {
  id: number
  date: string
  action: string
  user: string
  details: string
}

type User = {
  id: number
  name: string
  email: string
  role: string
  lastActive: string
}

// Type for sort configuration
type SortConfig = {
  key: string
  direction: "asc" | "desc"
}

// Type for pagination
type PaginationState = {
  currentPage: number
  itemsPerPage: number
}

export function InventoryDashboard() {
  const [activeItem, setActiveItem] = useState("inventory")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const currentUser = "Admin User" // The logged-in user name

  // Dialog states
  const [isAddChemicalOpen, setIsAddChemicalOpen] = useState(false)
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false)
  const [isAddSupplierOpen, setIsAddSupplierOpen] = useState(false)
  const [isAddPurchaserOpen, setIsAddPurchaserOpen] = useState(false)
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)

  const [isEditChemicalOpen, setIsEditChemicalOpen] = useState(false)
  const [isEditSupplierOpen, setIsEditSupplierOpen] = useState(false)
  const [isEditPurchaserOpen, setIsEditPurchaserOpen] = useState(false)

  const [editingChemical, setEditingChemical] = useState<ChemicalItem | null>(null)
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null)
  const [editingPurchaser, setEditingPurchaser] = useState<Purchaser | null>(null)

  // Form states
  const [newChemical, setNewChemical] = useState<Omit<ChemicalItem, "id" | "lastModified">>({
    productNumber: "",
    name: "",
    location: "",
    amount: "",
  })

  const [newTransaction, setNewTransaction] = useState<Omit<Transaction, "id">>({
    date: new Date().toISOString().split("T")[0],
    type: "Addition",
    chemical: "",
    amount: "",
    user: currentUser,
  })

  const [newSupplier, setNewSupplier] = useState<Omit<Supplier, "id" | "lastOrder">>({
    name: "",
    contact: "",
    phone: "",
  })

  const [newPurchaser, setNewPurchaser] = useState<Omit<Purchaser, "id" | "lastPurchase">>({
    name: "",
    contact: "",
    department: "",
  })

  const [newUser, setNewUser] = useState<Omit<User, "id" | "lastActive">>({
    name: "",
    email: "",
    role: "",
  })

  // Sort states
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null)

  // Pagination states
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    itemsPerPage: 5,
  })

  // Search state
  const [searchQuery, setSearchQuery] = useState("")

  // Data states
  const [inventoryItems, setInventoryItems] = useState<ChemicalItem[]>([
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
  ])

  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, date: "2025-05-10", type: "Addition", chemical: "Sodium Chloride", amount: "2 kg", user: "John Doe" },
    { id: 2, date: "2025-05-09", type: "Removal", chemical: "Potassium Hydroxide", amount: "1 kg", user: "Jane Smith" },
    { id: 3, date: "2025-05-08", type: "Transfer", chemical: "Hydrochloric Acid", amount: "5 L", user: "Mike Johnson" },
  ])

  const [suppliers, setSuppliers] = useState<Supplier[]>([
    {
      id: 1,
      name: "ChemSupply Inc.",
      contact: "contact@chemsupply.com",
      phone: "555-123-4567",
      lastOrder: "2025-04-15",
    },
    { id: 2, name: "LabChem Co.", contact: "sales@labchem.com", phone: "555-987-6543", lastOrder: "2025-05-01" },
    {
      id: 3,
      name: "ScienceStuff Ltd.",
      contact: "info@sciencestuff.com",
      phone: "555-456-7890",
      lastOrder: "2025-05-05",
    },
  ])

  const [purchasers, setPurchasers] = useState<Purchaser[]>([
    { id: 1, name: "Research Lab A", contact: "laba@example.com", department: "Research", lastPurchase: "2025-05-02" },
    { id: 2, name: "Teaching Lab B", contact: "labb@example.com", department: "Education", lastPurchase: "2025-04-28" },
    { id: 3, name: "Quality Control", contact: "qc@example.com", department: "Production", lastPurchase: "2025-05-07" },
  ])

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([
    {
      id: 1,
      date: "2025-05-10 14:32",
      action: "Added chemical",
      user: "John Doe",
      details: "Added chemical: Sodium Chloride (PRD-1001), amount: 2 kg, location: Lab A",
    },
    {
      id: 2,
      date: "2025-05-09 10:15",
      action: "Removed chemical",
      user: "Jane Smith",
      details: "Removed chemical: Potassium Hydroxide (PRD-1002), amount: 1 kg, from: Lab B",
    },
    {
      id: 3,
      date: "2025-05-08 16:45",
      action: "Updated supplier",
      user: "Admin User",
      details: "Updated supplier: ChemSupply Inc., new contact: contact@chemsupply.com",
    },
  ])

  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Lab Technician", lastActive: "Today" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Researcher", lastActive: "Yesterday" },
    { id: 3, name: "Admin User", email: "admin@example.com", role: "Admin", lastActive: "Today" },
  ])

  // Generic sort function
  const sortData = <T extends Record<string, any>>(data: T[], config: SortConfig | null): T[] => {
    if (!config) return data

    return [...data].sort((a, b) => {
      // Handle numeric values
      if (!isNaN(Number(a[config.key]?.split(" ")[0])) && !isNaN(Number(b[config.key]?.split(" ")[0]))) {
        const aValue = Number.parseFloat(a[config.key].split(" ")[0])
        const bValue = Number.parseFloat(b[config.key].split(" ")[0])
        return config.direction === "asc" ? aValue - bValue : bValue - aValue
      }

      // Handle date values
      if (
        config.key === "lastModified" ||
        config.key === "lastOrder" ||
        config.key === "lastPurchase" ||
        config.key === "lastActive" ||
        config.key === "date"
      ) {
        // For "X days ago" format
        if (a[config.key].includes("day")) {
          const aDays = Number.parseInt(a[config.key].split(" ")[0])
          const bDays = Number.parseInt(b[config.key].split(" ")[0])
          return config.direction === "asc" ? aDays - bDays : bDays - aDays
        }

        // For date strings
        const aDate = new Date(a[config.key])
        const bDate = new Date(b[config.key])
        return config.direction === "asc" ? aDate.getTime() - bDate.getTime() : bDate.getTime() - aDate.getTime()
      }

      // Default string comparison
      if (a[config.key] < b[config.key]) {
        return config.direction === "asc" ? -1 : 1
      }
      if (a[config.key] > b[config.key]) {
        return config.direction === "asc" ? 1 : -1
      }
      return 0
    })
  }

  // Filter data based on search query
  const filterData = <T extends Record<string, any>>(data: T[], query: string): T[] => {
    if (!query) return data

    return data.filter((item) => {
      return Object.values(item).some((value) => {
        if (typeof value === "string") {
          return value.toLowerCase().includes(query.toLowerCase())
        }
        return false
      })
    })
  }

  // Get paginated data
  const getPaginatedData = <T extends Record<string, any>>(data: T[]): T[] => {
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage
    const endIndex = startIndex + pagination.itemsPerPage
    return data.slice(startIndex, endIndex)
  }

  // Request sort function
  const requestSort = (key: string) => {
    let direction: "asc" | "desc" = "asc"

    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }

    setSortConfig({ key, direction })
  }

  // Get current data based on active section
  const getCurrentData = () => {
    switch (activeItem) {
      case "inventory":
        return inventoryItems
      case "transactions":
        return transactions
      case "suppliers":
        return suppliers
      case "purchasers":
        return purchasers
      case "audit":
        return auditLogs
      case "users":
        return users
      default:
        return []
    }
  }

  // Get processed data (sorted, filtered, paginated)
  const getProcessedData = () => {
    const data = getCurrentData()
    const filteredData = filterData(data, searchQuery)
    const sortedData = sortData(filteredData, sortConfig)
    return getPaginatedData(sortedData)
  }

  // Get total pages
  const getTotalPages = () => {
    const data = getCurrentData()
    const filteredData = filterData(data, searchQuery)
    return Math.ceil(filteredData.length / pagination.itemsPerPage)
  }

  // Handle page change
  const handlePageChange = (page: number) => {
    setPagination({ ...pagination, currentPage: page })
  }

  // Get sort direction for a column
  const getSortDirection = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <ArrowUpDown className="ml-1 h-3 w-3 inline" />
    }

    return sortConfig.direction === "asc" ? (
      <ChevronUp className="ml-1 h-3 w-3 inline" />
    ) : (
      <ChevronDown className="ml-1 h-3 w-3 inline" />
    )
  }

  // Add handlers
  const handleAddChemical = () => {
    const newItem: ChemicalItem = {
      id: inventoryItems.length + 1,
      ...newChemical,
      lastModified: "Just now",
    }

    setInventoryItems([...inventoryItems, newItem])
    setIsAddChemicalOpen(false)
    setNewChemical({
      productNumber: "",
      name: "",
      location: "",
      amount: "",
    })

    // Add to audit log
    const auditEntry: AuditLog = {
      id: auditLogs.length + 1,
      date: new Date().toLocaleString(),
      action: "Added chemical",
      user: currentUser,
      details: `Added chemical: ${newChemical.name} (${newChemical.productNumber}), amount: ${newChemical.amount}, location: ${newChemical.location}`,
    }
    setAuditLogs([auditEntry, ...auditLogs])
  }

  const handleAddTransaction = () => {
    const newItem: Transaction = {
      id: transactions.length + 1,
      ...newTransaction,
    }

    setTransactions([...transactions, newItem])
    setIsAddTransactionOpen(false)
    setNewTransaction({
      date: new Date().toISOString().split("T")[0],
      type: "Addition",
      chemical: "",
      amount: "",
      user: currentUser,
    })

    // Add to audit log
    const auditEntry: AuditLog = {
      id: auditLogs.length + 1,
      date: new Date().toLocaleString(),
      action: "Added transaction",
      user: currentUser,
      details: `${newTransaction.type} of ${newTransaction.chemical}, amount: ${newTransaction.amount}`,
    }
    setAuditLogs([auditEntry, ...auditLogs])
  }

  const handleAddSupplier = () => {
    const newItem: Supplier = {
      id: suppliers.length + 1,
      ...newSupplier,
      lastOrder: "N/A",
    }

    setSuppliers([...suppliers, newItem])
    setIsAddSupplierOpen(false)
    setNewSupplier({
      name: "",
      contact: "",
      phone: "",
    })

    // Add to audit log
    const auditEntry: AuditLog = {
      id: auditLogs.length + 1,
      date: new Date().toLocaleString(),
      action: "Added supplier",
      user: currentUser,
      details: `Added supplier: ${newSupplier.name}, contact: ${newSupplier.contact}, phone: ${newSupplier.phone}`,
    }
    setAuditLogs([auditEntry, ...auditLogs])
  }

  const handleAddPurchaser = () => {
    const newItem: Purchaser = {
      id: purchasers.length + 1,
      ...newPurchaser,
      lastPurchase: "N/A",
    }

    setPurchasers([...purchasers, newItem])
    setIsAddPurchaserOpen(false)
    setNewPurchaser({
      name: "",
      contact: "",
      department: "",
    })

    // Add to audit log
    const auditEntry: AuditLog = {
      id: auditLogs.length + 1,
      date: new Date().toLocaleString(),
      action: "Added purchaser",
      user: currentUser,
      details: `Added purchaser: ${newPurchaser.name}, department: ${newPurchaser.department}, contact: ${newPurchaser.contact}`,
    }
    setAuditLogs([auditEntry, ...auditLogs])
  }

  const handleAddUser = () => {
    const newItem: User = {
      id: users.length + 1,
      ...newUser,
      lastActive: "Just now",
    }

    setUsers([...users, newItem])
    setIsAddUserOpen(false)
    setNewUser({
      name: "",
      email: "",
      role: "",
    })

    // Add to audit log
    const auditEntry: AuditLog = {
      id: auditLogs.length + 1,
      date: new Date().toLocaleString(),
      action: "Added user",
      user: currentUser,
      details: `Added user: ${newUser.name}, email: ${newUser.email}, role: ${newUser.role}`,
    }
    setAuditLogs([auditEntry, ...auditLogs])
  }

  const handleUpdateChemical = () => {
    if (!editingChemical) return

    const updatedItems = inventoryItems.map((item) => (item.id === editingChemical.id ? editingChemical : item))

    setInventoryItems(updatedItems)
    setIsEditChemicalOpen(false)

    // Add to audit log
    const auditEntry: AuditLog = {
      id: auditLogs.length + 1,
      date: new Date().toLocaleString(),
      action: "Updated chemical",
      user: currentUser,
      details: `Updated chemical: ${editingChemical.name} (${editingChemical.productNumber}), amount: ${editingChemical.amount}, location: ${editingChemical.location}`,
    }
    setAuditLogs([auditEntry, ...auditLogs])
  }

  const handleUpdateSupplier = () => {
    if (!editingSupplier) return

    const updatedSuppliers = suppliers.map((supplier) =>
      supplier.id === editingSupplier.id ? editingSupplier : supplier,
    )

    setSuppliers(updatedSuppliers)
    setIsEditSupplierOpen(false)

    // Add to audit log
    const auditEntry: AuditLog = {
      id: auditLogs.length + 1,
      date: new Date().toLocaleString(),
      action: "Updated supplier",
      user: currentUser,
      details: `Updated supplier: ${editingSupplier.name}, contact: ${editingSupplier.contact}, phone: ${editingSupplier.phone}`,
    }
    setAuditLogs([auditEntry, ...auditLogs])
  }

  const handleUpdatePurchaser = () => {
    if (!editingPurchaser) return

    const updatedPurchasers = purchasers.map((purchaser) =>
      purchaser.id === editingPurchaser.id ? editingPurchaser : purchaser,
    )

    setPurchasers(updatedPurchasers)
    setIsEditPurchaserOpen(false)

    // Add to audit log
    const auditEntry: AuditLog = {
      id: auditLogs.length + 1,
      date: new Date().toLocaleString(),
      action: "Updated purchaser",
      user: currentUser,
      details: `Updated purchaser: ${editingPurchaser.name}, department: ${editingPurchaser.department}, contact: ${editingPurchaser.contact}`,
    }
    setAuditLogs([auditEntry, ...auditLogs])
  }

  // Reset pagination and sort when changing sections or search query
  useEffect(() => {
    setPagination({ ...pagination, currentPage: 1 })
    setSortConfig(null)
  }, [activeItem, searchQuery])

  // Render pagination controls
  const renderPagination = () => {
    const totalPages = getTotalPages()
    if (totalPages <= 1) return null

    return (
      <div className="flex items-center justify-between mt-4">
        <div className="text-xs text-gray-500">
          Page {pagination.currentPage} of {totalPages}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={pagination.currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => handlePageChange(page)}
              className="h-8 w-8 p-0"
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage === totalPages}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  }

  // Render content based on active item
  const renderContent = () => {
    const processedData = getProcessedData()

    switch (activeItem) {
      case "inventory":
        return (
          <>
            <h2 className="text-xl font-bold mb-4">Chemical Inventory</h2>
            <div className="flex justify-between mb-4">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search inventory..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button
                size="sm"
                className="bg-[#2DD4BF] hover:bg-[#2DD4BF]/90"
                onClick={() => setIsAddChemicalOpen(true)}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Chemical
              </Button>
            </div>
            <div className="border rounded-md overflow-hidden">
              <div className="max-h-[250px] overflow-y-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0 z-10">
                    <tr>
                      <th
                        className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => requestSort("productNumber")}
                      >
                        Product # {getSortDirection("productNumber")}
                      </th>
                      <th
                        className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => requestSort("name")}
                      >
                        Name {getSortDirection("name")}
                      </th>
                      <th
                        className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => requestSort("location")}
                      >
                        Location {getSortDirection("location")}
                      </th>
                      <th
                        className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => requestSort("amount")}
                      >
                        Amount {getSortDirection("amount")}
                      </th>
                      <th
                        className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => requestSort("lastModified")}
                      >
                        Modified {getSortDirection("lastModified")}
                      </th>
                      <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {processedData.map((item: ChemicalItem) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-4 py-2 text-sm">{item.productNumber}</td>
                        <td className="px-4 py-2 text-sm">{item.name}</td>
                        <td className="px-4 py-2 text-sm">{item.location}</td>
                        <td className="px-4 py-2 text-sm">{item.amount}</td>
                        <td className="px-4 py-2 text-sm text-gray-500">{item.lastModified}</td>
                        <td className="px-2 py-2 text-sm">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => {
                              setEditingChemical(item)
                              setIsEditChemicalOpen(true)
                            }}
                          >
                            <Edit className="h-3 w-3" />
                            <span className="sr-only">Edit</span>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {renderPagination()}
          </>
        )

      case "transactions":
        return (
          <>
            <h2 className="text-xl font-bold mb-4">Transactions</h2>
            <div className="flex justify-between mb-4">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="border rounded-md overflow-hidden">
              <div className="max-h-[250px] overflow-y-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0 z-10">
                    <tr>
                      <th
                        className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => requestSort("date")}
                      >
                        Date {getSortDirection("date")}
                      </th>
                      <th
                        className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => requestSort("type")}
                      >
                        Type {getSortDirection("type")}
                      </th>
                      <th
                        className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => requestSort("chemical")}
                      >
                        Chemical {getSortDirection("chemical")}
                      </th>
                      <th
                        className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => requestSort("amount")}
                      >
                        Amount {getSortDirection("amount")}
                      </th>
                      <th
                        className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => requestSort("user")}
                      >
                        User {getSortDirection("user")}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {processedData.map((item: Transaction) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-4 py-2 text-sm">{item.date}</td>
                        <td className="px-4 py-2 text-sm">{item.type}</td>
                        <td className="px-4 py-2 text-sm">{item.chemical}</td>
                        <td className="px-4 py-2 text-sm">{item.amount}</td>
                        <td className="px-4 py-2 text-sm">{item.user}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {renderPagination()}
          </>
        )

      case "suppliers":
        return (
          <>
            <h2 className="text-xl font-bold mb-4">Suppliers</h2>
            <div className="flex justify-between mb-4">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search suppliers..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={() => setIsAddSupplierOpen(true)}>
                <Plus className="h-4 w-4 mr-1" />
                Add Supplier
              </Button>
            </div>
            <div className="border rounded-md overflow-hidden">
              <div className="max-h-[250px] overflow-y-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0 z-10">
                    <tr>
                      <th
                        className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => requestSort("name")}
                      >
                        Name {getSortDirection("name")}
                      </th>
                      <th
                        className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => requestSort("contact")}
                      >
                        Contact {getSortDirection("contact")}
                      </th>
                      <th
                        className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => requestSort("phone")}
                      >
                        Phone {getSortDirection("phone")}
                      </th>
                      <th
                        className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => requestSort("lastOrder")}
                      >
                        Last Order {getSortDirection("lastOrder")}
                      </th>
                      <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {processedData.map((item: Supplier) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-4 py-2 text-sm">{item.name}</td>
                        <td className="px-4 py-2 text-sm">{item.contact}</td>
                        <td className="px-4 py-2 text-sm">{item.phone}</td>
                        <td className="px-4 py-2 text-sm">{item.lastOrder}</td>
                        <td className="px-2 py-2 text-sm">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => {
                              setEditingSupplier(item)
                              setIsEditSupplierOpen(true)
                            }}
                          >
                            <Edit className="h-3 w-3" />
                            <span className="sr-only">Edit</span>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {renderPagination()}
          </>
        )

      case "purchasers":
        return (
          <>
            <h2 className="text-xl font-bold mb-4">Purchasers</h2>
            <div className="flex justify-between mb-4">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search purchasers..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={() => setIsAddPurchaserOpen(true)}>
                <Plus className="h-4 w-4 mr-1" />
                Add Purchaser
              </Button>
            </div>
            <div className="border rounded-md overflow-hidden">
              <div className="max-h-[250px] overflow-y-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0 z-10">
                    <tr>
                      <th
                        className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => requestSort("name")}
                      >
                        Name {getSortDirection("name")}
                      </th>
                      <th
                        className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => requestSort("contact")}
                      >
                        Contact {getSortDirection("contact")}
                      </th>
                      <th
                        className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => requestSort("department")}
                      >
                        Department {getSortDirection("department")}
                      </th>
                      <th
                        className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => requestSort("lastPurchase")}
                      >
                        Last Purchase {getSortDirection("lastPurchase")}
                      </th>
                      <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {processedData.map((item: Purchaser) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-4 py-2 text-sm">{item.name}</td>
                        <td className="px-4 py-2 text-sm">{item.contact}</td>
                        <td className="px-4 py-2 text-sm">{item.department}</td>
                        <td className="px-4 py-2 text-sm">{item.lastPurchase}</td>
                        <td className="px-2 py-2 text-sm">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => {
                              setEditingPurchaser(item)
                              setIsEditPurchaserOpen(true)
                            }}
                          >
                            <Edit className="h-3 w-3" />
                            <span className="sr-only">Edit</span>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {renderPagination()}
          </>
        )

      case "audit":
        return (
          <>
            <h2 className="text-xl font-bold mb-4">Audit Log</h2>
            <div className="flex justify-between mb-4">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search audit logs..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="border rounded-md overflow-hidden">
              <div className="max-h-[250px] overflow-y-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0 z-10">
                    <tr>
                      <th
                        className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => requestSort("date")}
                      >
                        Date & Time {getSortDirection("date")}
                      </th>
                      <th
                        className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => requestSort("action")}
                      >
                        Action {getSortDirection("action")}
                      </th>
                      <th
                        className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => requestSort("user")}
                      >
                        User {getSortDirection("user")}
                      </th>
                      <th
                        className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => requestSort("details")}
                      >
                        Details {getSortDirection("details")}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {processedData.map((item: AuditLog) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-4 py-2 text-sm">{item.date}</td>
                        <td className="px-4 py-2 text-sm">{item.action}</td>
                        <td className="px-4 py-2 text-sm">{item.user}</td>
                        <td className="px-4 py-2 text-sm">{item.details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {renderPagination()}
          </>
        )

      case "users":
        return (
          <>
            <h2 className="text-xl font-bold mb-4">Users</h2>
            <div className="flex justify-between mb-4">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={() => setIsAddUserOpen(true)}>
                <Plus className="h-4 w-4 mr-1" />
                Add User
              </Button>
            </div>
            <div className="border rounded-md overflow-hidden">
              <div className="max-h-[250px] overflow-y-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0 z-10">
                    <tr>
                      <th
                        className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => requestSort("name")}
                      >
                        Name {getSortDirection("name")}
                      </th>
                      <th
                        className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => requestSort("email")}
                      >
                        Email {getSortDirection("email")}
                      </th>
                      <th
                        className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => requestSort("role")}
                      >
                        Role {getSortDirection("role")}
                      </th>
                      <th
                        className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => requestSort("lastActive")}
                      >
                        Last Active {getSortDirection("lastActive")}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {processedData.map((item: User) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-4 py-2 text-sm">{item.name}</td>
                        <td className="px-4 py-2 text-sm">{item.email}</td>
                        <td className="px-4 py-2 text-sm">{item.role}</td>
                        <td className="px-4 py-2 text-sm">{item.lastActive}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {renderPagination()}
          </>
        )

      default:
        return (
          <>
            <h2 className="text-xl font-bold mb-4">Select a section from the sidebar</h2>
          </>
        )
    }
  }

  return (
    <div className="relative w-full max-w-[800px] h-[420px] border rounded-lg bg-white shadow-lg overflow-hidden">
      {/* Header with menu button */}
      <div className="flex items-center border-b bg-muted/50 px-4 py-2 h-10">
        <button onClick={() => setIsSidebarOpen(true)} className="mr-2 text-gray-600 hover:text-gray-900">
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex h-2 w-2 rounded-full bg-accent mr-2"></div>
        <div className="flex h-2 w-2 rounded-full bg-[#2DD4BF] mr-2"></div>
        <div className="flex h-2 w-2 rounded-full bg-primary mr-2"></div>
        <div className="text-sm text-muted-foreground">Chemical Inventory Dashboard</div>
      </div>

      {/* Sidebar - contained within the dashboard */}
      {isSidebarOpen && (
        <div className="absolute top-0 left-0 h-full bg-white border-r z-30 w-64 shadow-lg flex flex-col">
          <div className="flex items-center justify-between p-4 border-b h-10">
            <div className="flex items-center gap-2">
              <Beaker className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold text-primary">Chemical Inventory</span>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="text-gray-500 hover:text-gray-700">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveItem(item.id)
                  if (window.innerWidth < 768) {
                    setIsSidebarOpen(false)
                  }
                }}
                className={cn(
                  "flex items-center gap-3 w-full px-4 py-2 text-left text-gray-600 hover:bg-gray-100",
                  activeItem === item.id && "bg-blue-50 text-primary border-l-4 border-primary",
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </div>

          <div className="border-t p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-primary font-bold">
                  AD
                </div>
                <div>
                  <p className="text-sm font-medium">{currentUser}</p>
                  <p className="text-xs text-gray-500">Admin</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
      )}

      {/* Main content - with consistent padding */}
      <div className="h-[calc(100%-10px)] overflow-auto">
        <div className="p-4 h-full flex flex-col">
          <div className="flex-1">{renderContent()}</div>
          <div className="h-4"></div> {/* Bottom spacing */}
        </div>
      </div>

      {/* Overlay to close sidebar on mobile */}
      {isSidebarOpen && (
        <div
          className="absolute inset-0 bg-black/20 z-20"
          onClick={() => setIsSidebarOpen(false)}
          style={{ position: "absolute" }}
        />
      )}

      {/* Add Chemical Dialog */}
      <Dialog open={isAddChemicalOpen} onOpenChange={setIsAddChemicalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Chemical</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="productNumber" className="text-right">
                Product #
              </Label>
              <Input
                id="productNumber"
                value={newChemical.productNumber}
                onChange={(e) => setNewChemical({ ...newChemical, productNumber: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newChemical.name}
                onChange={(e) => setNewChemical({ ...newChemical, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input
                id="location"
                value={newChemical.location}
                onChange={(e) => setNewChemical({ ...newChemical, location: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <Input
                id="amount"
                value={newChemical.amount}
                onChange={(e) => setNewChemical({ ...newChemical, amount: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddChemicalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddChemical}
              disabled={!newChemical.productNumber || !newChemical.name || !newChemical.location || !newChemical.amount}
              className="bg-[#2DD4BF] hover:bg-[#2DD4BF]/90"
            >
              Add Chemical
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Transaction Dialog */}
      <Dialog open={isAddTransactionOpen} onOpenChange={setIsAddTransactionOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Transaction</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={newTransaction.date}
                onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <select
                id="type"
                value={newTransaction.type}
                onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value })}
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="Addition">Addition</option>
                <option value="Removal">Removal</option>
                <option value="Transfer">Transfer</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="chemical" className="text-right">
                Chemical
              </Label>
              <Input
                id="chemical"
                value={newTransaction.chemical}
                onChange={(e) => setNewTransaction({ ...newTransaction, chemical: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <Input
                id="amount"
                value={newTransaction.amount}
                onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddTransactionOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddTransaction}
              disabled={!newTransaction.chemical || !newTransaction.amount}
              className="bg-primary hover:bg-primary/90"
            >
              Add Transaction
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Supplier Dialog */}
      <Dialog open={isAddSupplierOpen} onOpenChange={setIsAddSupplierOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Supplier</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newSupplier.name}
                onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="contact" className="text-right">
                Contact
              </Label>
              <Input
                id="contact"
                value={newSupplier.contact}
                onChange={(e) => setNewSupplier({ ...newSupplier, contact: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                value={newSupplier.phone}
                onChange={(e) => setNewSupplier({ ...newSupplier, phone: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddSupplierOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddSupplier}
              disabled={!newSupplier.name || !newSupplier.contact || !newSupplier.phone}
              className="bg-primary hover:bg-primary/90"
            >
              Add Supplier
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Purchaser Dialog */}
      <Dialog open={isAddPurchaserOpen} onOpenChange={setIsAddPurchaserOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Purchaser</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newPurchaser.name}
                onChange={(e) => setNewPurchaser({ ...newPurchaser, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="contact" className="text-right">
                Contact
              </Label>
              <Input
                id="contact"
                value={newPurchaser.contact}
                onChange={(e) => setNewPurchaser({ ...newPurchaser, contact: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="text-right">
                Department
              </Label>
              <Input
                id="department"
                value={newPurchaser.department}
                onChange={(e) => setNewPurchaser({ ...newPurchaser, department: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddPurchaserOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddPurchaser}
              disabled={!newPurchaser.name || !newPurchaser.contact || !newPurchaser.department}
              className="bg-primary hover:bg-primary/90"
            >
              Add Purchaser
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add User Dialog */}
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <select
                id="role"
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select a role</option>
                <option value="Admin">Admin</option>
                <option value="Lab Technician">Lab Technician</option>
                <option value="Researcher">Researcher</option>
                <option value="Manager">Manager</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddUser}
              disabled={!newUser.name || !newUser.email || !newUser.role}
              className="bg-primary hover:bg-primary/90"
            >
              Add User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Chemical Dialog */}
      <Dialog open={isEditChemicalOpen} onOpenChange={setIsEditChemicalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Chemical</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-productNumber" className="text-right">
                Product #
              </Label>
              <Input
                id="edit-productNumber"
                value={editingChemical?.productNumber || ""}
                onChange={(e) =>
                  setEditingChemical((prev) => (prev ? { ...prev, productNumber: e.target.value } : null))
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">
                Name
              </Label>
              <Input
                id="edit-name"
                value={editingChemical?.name || ""}
                onChange={(e) => setEditingChemical((prev) => (prev ? { ...prev, name: e.target.value } : null))}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-location" className="text-right">
                Location
              </Label>
              <Input
                id="edit-location"
                value={editingChemical?.location || ""}
                onChange={(e) => setEditingChemical((prev) => (prev ? { ...prev, location: e.target.value } : null))}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-amount" className="text-right">
                Amount
              </Label>
              <Input
                id="edit-amount"
                value={editingChemical?.amount || ""}
                onChange={(e) => setEditingChemical((prev) => (prev ? { ...prev, amount: e.target.value } : null))}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditChemicalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleUpdateChemical}
              disabled={
                !editingChemical?.productNumber ||
                !editingChemical?.name ||
                !editingChemical?.location ||
                !editingChemical?.amount
              }
              className="bg-[#2DD4BF] hover:bg-[#2DD4BF]/90"
            >
              Update Chemical
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Supplier Dialog */}
      <Dialog open={isEditSupplierOpen} onOpenChange={setIsEditSupplierOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Supplier</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-supplier-name" className="text-right">
                Name
              </Label>
              <Input
                id="edit-supplier-name"
                value={editingSupplier?.name || ""}
                onChange={(e) => setEditingSupplier((prev) => (prev ? { ...prev, name: e.target.value } : null))}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-supplier-contact" className="text-right">
                Contact
              </Label>
              <Input
                id="edit-supplier-contact"
                value={editingSupplier?.contact || ""}
                onChange={(e) => setEditingSupplier((prev) => (prev ? { ...prev, contact: e.target.value } : null))}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-supplier-phone" className="text-right">
                Phone
              </Label>
              <Input
                id="edit-supplier-phone"
                value={editingSupplier?.phone || ""}
                onChange={(e) => setEditingSupplier((prev) => (prev ? { ...prev, phone: e.target.value } : null))}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditSupplierOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleUpdateSupplier}
              disabled={!editingSupplier?.name || !editingSupplier?.contact || !editingSupplier?.phone}
              className="bg-primary hover:bg-primary/90"
            >
              Update Supplier
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Purchaser Dialog */}
      <Dialog open={isEditPurchaserOpen} onOpenChange={setIsEditPurchaserOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Purchaser</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-purchaser-name" className="text-right">
                Name
              </Label>
              <Input
                id="edit-purchaser-name"
                value={editingPurchaser?.name || ""}
                onChange={(e) => setEditingPurchaser((prev) => (prev ? { ...prev, name: e.target.value } : null))}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-purchaser-contact" className="text-right">
                Contact
              </Label>
              <Input
                id="edit-purchaser-contact"
                value={editingPurchaser?.contact || ""}
                onChange={(e) => setEditingPurchaser((prev) => (prev ? { ...prev, contact: e.target.value } : null))}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-purchaser-department" className="text-right">
                Department
              </Label>
              <Input
                id="edit-purchaser-department"
                value={editingPurchaser?.department || ""}
                onChange={(e) => setEditingPurchaser((prev) => (prev ? { ...prev, department: e.target.value } : null))}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditPurchaserOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleUpdatePurchaser}
              disabled={!editingPurchaser?.name || !editingPurchaser?.contact || !editingPurchaser?.department}
              className="bg-primary hover:bg-primary/90"
            >
              Update Purchaser
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
