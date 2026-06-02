export type CaseStudySection = {
  id: string;
  chip: string;
  eyebrow?: string;
  title: string;
  body: string;
  aside?: { label: string; items: string[] };
};

export type Case = {
  slug: string;
  title: string;
  /** Optional long-form sentence headline. When set, replaces the uppercase title display. */
  headline?: string;
  dates: string;
  description: string;
  website?: string;
  accent: string;
  theme?: "light" | "dark";
  image?: { src: string; alt: string };
  /** Optional logo rendered above the headline. Recolored to the card text color. */
  logo?: { src: string; alt: string; aspectRatio: number; height?: number };
  /** Optional long-form case study. When present, the card's View button links to /work/[slug]. */
  study?: { sections: CaseStudySection[] };
};

const guestyStudy: { sections: CaseStudySection[] } = {
  sections: [
    {
      id: "overview",
      chip: "Overview",
      eyebrow: "Guesty · 2025",
      title: "Payment Installments",
      body: "Designing a new billing paradigm for long-term rental managers.\n\nSenior Product Designer — led research, concept ideation, UI/UX design, and stakeholder alignment end to end. Web app (B2B SaaS) for thousands of property management companies worldwide. Status: in development.",
    },
    {
      id: "background",
      chip: "Background",
      title: "Built for short-term, breaking for long-term",
      body: "Guesty's Payment Automations feature lets property managers attach charges to reservation events — booking, confirmation, check-in, check-out. For a 5-night stay, that works perfectly.\n\nBut a growing segment — large PMCs running corporate housing, serviced apartments, and mid-term rentals — don't operate on those terms. Their guests stay 30, 60, 90+ days. They bill like landlords: monthly installments, security deposits, prorated first months. Connecting a charge to \"check-in\" makes no sense when a guest is already living there.\n\nWithout installment support, Guesty was losing enterprise deals to competitors. Sales calls surfaced the same objection repeatedly. That signal kicked off this project.",
    },
    {
      id: "problem",
      chip: "Problem",
      title: "The problem statement",
      body: "How do we extend Guesty's payment automation system to support long-term billing logic — recurring installments, move-in costs, proration — without breaking the existing short-term experience or creating conflicts that could overcharge guests?",
    },
    {
      id: "research",
      chip: "Research",
      title: "Discovery with property managers",
      body: "I led direct discovery calls with PMCs managing long-term and mid-term portfolios. Two conversations shaped the project's direction.\n\nTyler Graves (Ready Stays, 300 listings) described a model between landlord and vacation rental: monthly billing on the 1st, with a prorated first installment at booking. He also surfaced a complexity we hadn't anticipated — for many corporate reservations, the person staying in the unit is not the person paying.\n\nNancy Touma (Rolando Flores's team) outlined a precise but different model: short stays require full payment upfront; over 45 nights, the first 30 nights plus deposit collected before check-in, then each subsequent period 3–4 days before the anniversary date. Direct corporate reservations run on net 30/60/90 credit terms — no automated schedule at all.",
      aside: {
        label: "Patterns across calls",
        items: [
          "Channel determines billing logic",
          "Length of stay is the primary fork",
          "Two charging paradigms: anniversary vs. calendar",
          "Move-in costs are conceptually separate",
        ],
      },
    },
    {
      id: "process",
      chip: "Process",
      title: "Synthesis, tooling, prototype, design",
      body: "After discovery, I translated findings into flowcharts before touching UI. Mapping how channel, length of stay, and billing paradigm interact made it clear early on that installments couldn't coexist cleanly with existing automation rules — the conflict problem surfaced in a flowchart, before becoming a design problem.\n\nTo support the work, I built two internal tools using Cursor. Reference Scout — an agent connected to Mobbin via MCP that surfaces UI references from a design brief. Edge Case Coverage Map — an agent that generates a structured map of edge cases from a feature description. Both are now used by the broader design team.\n\nBefore detailed Figma work, I built a coded prototype in Cursor to explore wizard variations in low fidelity. It served two purposes: aligning stakeholders on the concept, and pressure-testing the billing logic — especially proration — across edge cases. Finding logic gaps at prototype stage is far cheaper than finding them in Figma or in development.",
    },
    {
      id: "challenges",
      chip: "Challenges",
      title: "Two billing systems, and the proration problem",
      body: "Guesty's existing automations were built as catch-all rules: a rule targeting \"all reservations\" would fire on a 90-day stay just as it would on a 5-night one, potentially double-charging a guest with an active installment plan.\n\nRather than adding a toggle inside the existing builder, I designed a dedicated, separate setup flow for installment-based automations. Long-term billing gets its own guided path and its own mental model. The short-term experience stays intact; the system has clean logic to detect conflicts; both paths evolve independently.\n\nResearch also surfaced a fundamental split: anniversary billing (every 30 days from check-in) vs. calendar billing (a fixed day each month). Calendar billing creates a problem anniversary billing doesn't — partial periods before the first full cycle and after the last. Proration is invisible complexity: users don't think \"I need proration logic.\" They think \"I want to charge on the 1st,\" and discover the hard part only when an edge case hits them.",
    },
    {
      id: "decisions",
      chip: "Decisions",
      title: "Key design decisions",
      body: "A guided three-step wizard sequences the decisions: Conditions (channel, properties, length of stay floor of 28 nights), Payment Cycle (cadence, amount, when within the cycle to charge), and Move-in Costs (initial payment and optional refundable deposit). Users think about one layer at a time; the structure itself communicates the mental model.\n\nProration is handled automatically and made legible two ways. A plain-language line directly below the cycle setting: \"The first installment will be pro-rated to cover only the period from check-in to the end of the month.\" And a live calendar preview that renders a sample reservation across multiple months, with payment badges on the exact dates each charge will fire. For a $9,000 reservation: a $1,500 prorated first installment, two full $3,000 monthly charges, a $1,500 prorated final month. Switching from calendar to anniversary billing immediately redraws everything.\n\nAn earlier exploration used a horizontal timeline. It looked cleaner but abstracted away the calendar dimension that matters most. PMCs think in months and billing dates — the calendar format maps directly to how they already reason about their business.",
    },
    {
      id: "ahead",
      chip: "What's Ahead",
      title: "V1, and what comes next",
      body: "V1 covers the dedicated installments setup flow, move-in costs and recurring schedule configuration, the calendar preview, and conflict detection with existing automations.\n\nScoped for future phases: AI-assisted natural language setup, where a user could type \"collect first month and a $500 deposit at booking, then $1,500 on the 1st of every month, prorated if they check in late\" — and the system auto-populates the configuration for review.",
    },
    {
      id: "reflections",
      chip: "Reflections",
      title: "Domain modeling beats UX polish",
      body: "This project reinforced something I keep returning to in B2B design: the hardest problems aren't about aesthetics or flows — they're about domain modeling. Long-term rental billing isn't complicated because of bad UX; it follows genuinely different logic than short-term billing, and any design that glosses over that distinction eventually fails the users who depend on it most.\n\nThe proration problem was a useful reminder not to hide complexity. The temptation is to handle it silently and hope users don't notice. But PMCs managing hundreds of properties can't afford to not understand how their billing works. The calendar preview solved it not by simplifying the logic, but by making it visible enough that users could verify it themselves.",
    },
  ],
};

export const cases: Case[] = [
  {
    slug: "guesty-installments",
    title: "Guesty Installments",
    headline:
      "Unblocked [X] enterprise accounts by adapting payment automations for long-term rentals",
    dates: "",
    logo: {
      src: "/images/guesty-logo.svg",
      alt: "Guesty",
      aspectRatio: 445 / 117,
      height: 28,
    },
    description:
      "Large property managers were handling long-term billing manually or leaving Guesty for competitors. I ran discovery with property managers to map how they actually collect rent, then designed a three-step installments setup that handles recurring charges, proration, and move-in costs — without disrupting the existing short-term automation experience.",
    accent: "#072C23",
    theme: "dark",
    image: {
      src: "/images/guesty-installments.png",
      alt: "Guesty Installments setup UI with payment cycle, automation example calendar, and house illustrations",
    },
    study: guestyStudy,
  },
  {
    slug: "case-2",
    title: "Project Two",
    dates: "2023 – 2024",
    description:
      "Short project description goes here. Two or three lines about the problem, the approach, and what shipped.",
    website: "#",
    accent: "#E3E8EC",
  },
  {
    slug: "case-3",
    title: "Project Three",
    dates: "2022 – 2023",
    description:
      "Short project description goes here. Two or three lines about the problem, the approach, and what shipped.",
    accent: "#ECE6E0",
  },
  {
    slug: "case-4",
    title: "Project Four",
    dates: "2021 – 2022",
    description:
      "Short project description goes here. Two or three lines about the problem, the approach, and what shipped.",
    accent: "#E5E8E3",
  },
];

export function getCase(slug: string): Case | undefined {
  return cases.find((c) => c.slug === slug);
}
