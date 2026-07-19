const CONTACT_EMAIL = "shaun.porwal@juntotechnologies.com"

const mailto = (subject: string) => `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`

export const UI_LABELS = {
  brand: {
    shortName: "CIMS",
    fullName: "Chemical Inventory Management System",
    footerCopyright: "\u00a9 2025 Chemical Inventory Management System. All rights reserved.",
  },
  nav: [
    { href: "#features", label: "Features" },
    { href: "#benefits", label: "Benefits" },
    { href: "#team", label: "Team" },
    { href: "#pricing", label: "Pricing" },
  ],
  links: {
    staticDemo: "https://demo.cheminventory.co",
    booking: "https://cal.com/shaun-porwal-junto/30min",
    dcurves: "https://github.com/MSKCC-Epi-Bio/dcurves",
  },
  actions: {
    staticDemo: "Static Demo",
    bookMeeting: "Book a Meeting",
    contactUs: "Contact Us",
    discussWorkflow: "Discuss Your Workflow",
    startConversation: "Start the Conversation",
    pricingFit: "Reach out to discuss pricing and fit",
  },
  mailto: {
    cimsQuery: mailto("CIMS Query"),
    customSoftwareInquiry: mailto("Custom Software Inquiry"),
    enterprisePricingInquiry: mailto("Enterprise Pricing Inquiry"),
    enterpriseInquiry: mailto("Enterprise Inquiry"),
  },
  hero: {
    eyebrow: "Built Inside Real Chemistry Lab Workflows",
    titleLines: ["Software Designed", "Directly With"],
    titleAccent: "Your Team",
    body:
      "Built from direct work inside a commercial chemistry lab, CIMS replaces brittle spreadsheets and one-size-fits-all inventory tools with software shaped around real chemical workflows. The result: fewer administrative errors, fewer delays, and more room for growing labs to scale.",
  },
  video: {
    title: "See a Tailored CIMS Workflow in Action",
    embedUrl: "https://www.youtube.com/embed/v251ll_f4AY",
  },
  features: {
    eyebrow: "Key Features",
    title: "Built Around the Work Your Team Actually Does",
    body:
      "Every implementation starts with your process, not a generic template. The result is software shaped around chemical inventory workflows, approvals, reporting, and controls that matter to your company.",
    items: [
      {
        title: "Comprehensive Tracking",
        body:
          "Track the fields your organization needs, from product numbers and CAS numbers to internal locations, batch details, and custom operational metadata.",
        icon: "ClipboardList",
        iconWrapClass: "bg-primary/10",
        iconClass: "text-primary",
        animationDelayClass: "",
      },
      {
        title: "Detailed Audit Logs",
        body:
          "Capture the audit trail your compliance process requires, with change history, timestamps, and user accountability aligned to your internal standards.",
        icon: "History",
        iconWrapClass: "bg-teal/10",
        iconClass: "text-teal",
        animationDelayClass: "[animation-delay:0.6s]",
      },
      {
        title: "Supplier Management",
        body:
          "Maintain supplier records, contacts, and purchasing context in a way that matches how your team evaluates and sources chemicals.",
        icon: "Building2",
        iconWrapClass: "bg-coral/10",
        iconClass: "text-coral",
        animationDelayClass: "[animation-delay:1.2s]",
      },
      {
        title: "Purchaser Tracking",
        body:
          "Record purchaser details, approvals, and transaction history in workflows tailored to your authorization and handoff process.",
        icon: "ShoppingCart",
        iconWrapClass: "bg-coral/10",
        iconClass: "text-coral",
        animationDelayClass: "[animation-delay:1.8s]",
      },
      {
        title: "User Management",
        body:
          "Configure role-based access, permissions, and team structures around the people and departments in your organization.",
        icon: "Users",
        iconWrapClass: "bg-primary/10",
        iconClass: "text-primary",
        animationDelayClass: "[animation-delay:2.4s]",
      },
      {
        title: "Inventory Analytics",
        body:
          "Surface the reports, dashboards, and forecasting views your company needs instead of forcing you into canned analytics.",
        icon: "BarChart3",
        iconWrapClass: "bg-teal/10",
        iconClass: "text-teal",
        animationDelayClass: "[animation-delay:3s]",
      },
    ],
  },
  benefits: {
    eyebrow: "Benefits",
    title: "A Better Fit Than Off-the-Shelf Software",
    body:
      "Working directly with your company means the software can support your exact chemical operations instead of making your team adapt to a generic product.",
    items: [
      {
        title: "Enhanced Safety & Compliance",
        body:
          "Maintain accurate records for regulatory compliance and safety audits with controls and data structures designed around your environment.",
        icon: "Shield",
        iconWrapClass: "bg-primary/10",
        iconClass: "text-primary",
      },
      {
        title: "Reduced Waste & Costs",
        body:
          "Optimize inventory levels with workflows tuned to your purchasing patterns, storage constraints, and waste-reduction goals.",
        icon: "BarChart3",
        iconWrapClass: "bg-teal/10",
        iconClass: "text-teal",
      },
      {
        title: "Simplified Auditing",
        body:
          "Generate audit-ready reporting with the exact change history, transaction visibility, and user actions your stakeholders need.",
        icon: "ClipboardList",
        iconWrapClass: "bg-coral/10",
        iconClass: "text-coral",
      },
    ],
  },
  builtWithYou: {
    eyebrow: "Built With You",
    title: "Custom Software Without Generic Software Bloat",
    body:
      "I partner directly with companies to define the right scope, workflows, and reporting from the start so the final system feels purpose-built rather than retrofitted.",
    bullets: [
      "Designed around your workflows instead of forcing a generic process",
      "No unnecessary modules or generic features your team will ignore",
      "Direct collaboration, thoughtful implementation, and software tailored to your needs",
    ],
    dashboardTitle: "Chemical Inventory",
    dashboardKicker: "Focused. Tailored. Practical.",
    stats: [
      { value: "1738", label: "Chemicals", className: "text-primary" },
      { value: "24", label: "Suppliers", className: "text-teal" },
      { value: "12", label: "Locations", className: "text-coral" },
    ],
    quote: '"Built around your workflow, not a generic template."',
  },
  team: {
    eyebrow: "Our Team",
    title: "Work Directly With the Builder",
    body:
      "Shaun works directly with companies to understand their operations and design software that reflects how their teams actually handle chemical inventory, compliance, and reporting.",
    primaryMember: {
      image: "/images/shaun.jpeg",
      name: "Shaun Porwal",
      title: "Machine Learning Engineer",
    },
  },
  pricing: {
    eyebrow: "Pricing",
    title: "Pricing Built Around Your Organization",
    body:
      "Flexible pricing for companies that want tailored chemical inventory software and direct collaboration throughout implementation.",
    planName: "Enterprise",
    planBody: "For organizations that need tailored rollout, white glove service, and pricing built around their needs",
    bullets: [
      "Tailored for your team size and operating model",
      "White glove onboarding and rollout support",
      "Direct collaboration to shape workflows and reporting",
      "Software tailored to your company instead of a generic app",
    ],
    footerLead: "Need software designed around your company's workflow and support expectations?",
  },
  mobileNav: {
    label: "Navigate",
    openAriaLabel: "Open navigation menu",
    closeAriaLabel: "Close navigation menu",
  },
  addChemicalDialog: {
    title: "Add New Chemical",
    fields: {
      productNumber: { label: "Product #", placeholder: "PRD-1004" },
      name: { label: "Chemical Name", placeholder: "Calcium Carbonate" },
      location: { label: "Location", placeholder: "Lab D" },
      amount: { label: "Amount", placeholder: "20 kg" },
    },
    cancel: "Cancel",
    submit: "Add Chemical",
  },
} as const
