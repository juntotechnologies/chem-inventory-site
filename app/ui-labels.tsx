/** Every visible label on the page. Brand, links and the headline come from site.json. */
import { site } from "@/lib/site"

const CONTACT_EMAIL = "shaun.porwal@juntotechnologies.com"

const mailto = (subject: string) => `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`

export const UI_LABELS = {
  brand: {
    name: site.brand.name,
    alias: site.brand.alias,
    fullName: site.brand.fullName,
    rights: "All rights reserved.",
    hubLink: `A ${site.brand.maker.name} project`,
  },
  nav: [
    { href: "#features", label: "Features" },
    { href: "#team", label: "Team" },
    { href: "#pricing", label: "Pricing" },
  ],
  links: {
    staticDemo: site.links.demo,
    booking: site.links.booking,
    dcurves: "https://github.com/MSKCC-Epi-Bio/dcurves",
    hub: site.links.hub,
  },
  actions: {
    staticDemo: "Static demo",
    bookMeeting: "Book a meeting",
    contactUs: "Contact us",
    askPricing: "Ask about pricing",
    discussFit: "Discuss fit",
  },
  mailto: {
    cimsQuery: mailto("CIMS Query"),
    enterprisePricingInquiry: mailto("Enterprise Pricing Inquiry"),
    enterpriseInquiry: mailto("Enterprise Inquiry"),
  },
  hero: {
    eyebrow: "Built inside real chemistry lab workflows",
    title: site.headline,
    body: `${site.tagline} It came from direct work inside a commercial chemistry lab and replaces spreadsheets.`,
  },
  video: {
    eyebrow: "Video",
    title: "Early walkthrough",
    caption: "Recorded in April 2025. The app has grown since. Open the static demo for the current version.",
    frameTitle: `Early walkthrough of ${site.brand.name}`,
    embedUrl: "https://www.youtube.com/embed/v251ll_f4AY",
  },
  product: {
    eyebrow: "Features",
    title: `What ${site.brand.name} does`,
    lead: "Every screenshot comes from the static demo. It uses sample data.",
    benefitsLabel: "Benefits",
    benefits: [
      {
        title: "One place for records",
        statement: "Keep stock, orders, contacts and batch documents in one app.",
      },
      {
        title: "Clear order status",
        statement: "See what arrived, what remains and what is overdue on each order.",
      },
      {
        title: "Traceable changes",
        statement: "Changes to inventory, transactions and orders carry the user and the time.",
      },
    ],
  },
  team: {
    eyebrow: "Team",
    title: `Who builds ${site.brand.name}`,
    lead: "Shaun Porwal designs and builds the app.",
    member: {
      image: "/images/shaun.jpeg",
      imageAlt: "Portrait of Shaun Porwal",
      name: "Shaun Porwal",
      title: "Machine Learning Engineer",
    },
    bio: {
      before: [
        "Shaun builds biomedical AI systems across agentic workflows, survival modeling and biology models.",
        "He recently worked as a founding engineer at a biotech startup.",
        "He previously built clinical ML tools at Memorial Sloan Kettering Cancer Center.",
      ],
      dcurvesLead: "There he created",
      dcurvesWithCount: "an open-source Python library with {downloads} downloads",
      after: [
        "He has hands-on chemistry experience in labs and manufacturing across the U.S., Taiwan and Japan.",
        "He holds a B.S. in Biomedical Engineering and an M.S. in Biomedical Data Science.",
      ],
    },
  },
  pricing: {
    eyebrow: "Pricing",
    title: "Pricing",
    lead: "Pricing depends on the size and needs of your organization.",
    planName: "Enterprise",
    planBody: "For organizations that need a rollout plan and a price built for their size.",
    bullets: ["Onboarding and rollout support", "Direct access to the builder"],
  },
  menu: { label: "Menu", skipToContent: "Skip to content" },
} as const
