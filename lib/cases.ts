export type CaseStudySection = {
  id: string;
  chip: string;
  eyebrow?: string;
  title: string;
  body: string;
  aside?: { label: string; items: string[] };
  /** When true, the section pins for N×100vh of scroll and reveals body paragraphs one at a time. */
  revealParagraphsOnScroll?: boolean;
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
      body: "I led direct discovery calls with PMCs managing long-term and mid-term portfolios. Two conversations shaped the project's direction.",
      aside: {
        label: "Across calls, several patterns emerged clearly:",
        items: [
          "We discovered 3 main patterns how users charge their guests: monthly (most popular), weekly and bi-weekly (mainly used for reservations with open check-out date).",
          "We learned how they think about long stays: everything above 30 calendar days is considered to be a long reservation.",
          "Two charging paradigms exist. Some PMCs charge every 30 days from check-in (anniversary billing); others charge on a fixed calendar date like the 1st of each month (calendar billing). Both are legitimate and in active use.",
          "Move-in costs are conceptually separate. Deposits, first month, first-and-last — these are upfront, one-time items that PMCs think about differently from recurring installments.",
        ],
      },
    },
    {
      id: "process",
      chip: "Process",
      title: "Synthesis and prototyping",
      revealParagraphsOnScroll: true,
      body: "After discovery, it was clear early on that installments couldn't coexist cleanly with existing automation rules and reuse the same patterns we had.\n\nSo to understand how to solve it better, I needed to understand how similar problems had been solved elsewhere. I researched financial and billing apps to look for comparable patterns. For this I used one of the internal tools I built for the team: Reference Scout, an agent connected to Mobbin via MCP that searches for relevant UI references based on a design brief. What would have taken hours of manual browsing was done in a fraction of the time, and with broader coverage than a manual search typically produces. The key finding: most financial products that handle similar flows break the setup into sequential steps rather than presenting everything at once.\n\nI built a coded prototype in Cursor to explore potential solutions in low fidelity. The goal was to try as many options as possible in a short amount of time, and to align stakeholders on the solution.",
    },
    {
      id: "decisions",
      chip: "Decisions",
      title: "Final design — key decisions",
      revealParagraphsOnScroll: true,
      body: "I designed a dedicated, separate setup flow for installment-based automations. Users still enter from the Payment Automations area, but long-term billing has its own guided path with its own mental model. This keeps the short-term experience intact, gives the system clean logic to detect conflicts, and lets both paths evolve independently.\n\nA guided three-step wizard sequences the decisions: Conditions (channel, properties, length of stay floor of 28 nights), Payment Cycle (cadence, amount, when within the cycle to charge), and Move-in Costs (initial payment and optional refundable deposit). Users think about one layer at a time; the structure itself communicates the mental model.\n\nProration is handled automatically and made legible two ways. A plain-language line directly below the cycle setting: \"The first installment will be pro-rated to cover only the period from check-in to the end of the month.\" And a live calendar preview that renders a sample reservation across multiple months, with payment badges on the exact dates each charge will fire.",
    },
    {
      id: "key-improvement",
      chip: "Main Challenge",
      title: "Main challenge",
      body: "I needed the way for users to preview the automation while they are creating it, so that it is easier for them to understand how it works. I added a calendar visualisation with reservation example that was updating based on decisions that user made during the flow.",
    },
    {
      id: "ahead",
      chip: "What's Ahead",
      title: "What comes next",
      body: "Pilot release (limited number of users), gathering user’s feedback.",
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
      "Guesty's payment engine was built for short-term rentals. Long-term operators — managing monthly billing, proration, move-in costs — had no way to automate their collections. I led research and end-to-end design of a dedicated flow to allow users to automate their long-term reservations billing and unblock sales.",
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
