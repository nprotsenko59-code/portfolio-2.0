export type CaseSectionBlock = {
  heading?: string;
  paragraphs?: string[];
  bullets?: { label?: string; items: string[] };
};

export type CaseStudySection = {
  id: string;
  chip: string;
  eyebrow?: string;
  title: string;
  blocks: CaseSectionBlock[];
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
      blocks: [
        {
          heading: "What is Guesty?",
          paragraphs: [
            "Guesty is a property management platform. It helps teams manage listings, reservations, guest communication, payments, and day-to-day operations across multiple booking channels. One of its core areas is payment workflows, which help property managers collect revenue, automate charges, and reduce manual operational work.",
          ],
        },
        {
          heading: "The problem",
          paragraphs: [
            "Guesty's Payment Automations let property managers attach charges to reservation events like booking, confirmation, check-in, and check-out — which works well for short stays.",
            "But larger PMCs running corporate housing, serviced apartments, and mid-term rentals operate differently. Their guests stay 30, 60, or 90+ days, and payments often happen through installments that are not connected to reservation lifecycle.",
            "Without installment support, Guesty was losing enterprise deals to competitors. The same objection kept coming up in sales calls — and that became the starting point for this project.",
          ],
        },
        {
          heading: "My role",
          paragraphs: [
            "I led all the design process for this project: from briefing with my PM and discovery to hand off to development.",
          ],
        },
        {
          heading: "Team",
          bullets: {
            items: [
              "Me (designer)",
              "Product manager",
              "Front-end developer",
              "Back-end developer",
            ],
          },
        },
      ],
    },
    {
      id: "process",
      chip: "Process",
      title: "Process",
      blocks: [
        {
          heading: "Discovery with property managers",
          paragraphs: [
            "I led direct discovery calls with property managers managing long-term reservations. Across calls, several patterns emerged clearly:",
          ],
          bullets: {
            items: [
              "We discovered 3 main patterns how users charge their guests: monthly (most popular), weekly and bi-weekly (mainly used for reservations with open check-out date).",
              "We learned how they think about long stays: everything above 30 calendar days is considered to be a long reservation.",
              "Two charging paradigms exist. Some PMCs charge every 30 days from check-in (anniversary billing); others charge on a fixed calendar date like the 1st of each month (calendar billing). Both are legitimate and in active use.",
              "They charge part of the reservation total upfront (before guest checks-in). Usually, they take first and last installment. Also, there is a refundable security deposit: an amount on top of reservation total that they charge and refund at the end of the stay if there is no damage done.",
            ],
          },
        },
        {
          heading: "Synthesis",
          paragraphs: [
            "After discovery, it was clear early on that installments setup should be different from existing automation that is connected to the reservation cycle: in installments logic comes first. User thinks: I want to charge my guest monthly, and collect first and last month payments when they make a reservation, so they don't split the total that guest should pay into payments connected to reservation lifecycle.",
          ],
        },
        {
          heading: "Patterns research",
          paragraphs: [
            "So to understand how to solve it better, I needed to understand how similar problems had been solved in fintech apps. I researched financial and billing apps to look for comparable patterns. For this I used one of the internal tools I built for the team: Reference Scout, a skill connected to Mobbin via MCP that searches for relevant UI references based on a design brief. What would have taken hours of manual browsing was done in a fraction of the time, and with broader coverage than a manual search typically produces. The key finding: most financial products that handle similar flows break the setup into sequential steps rather than presenting everything at once.",
          ],
        },
        {
          heading: "Ideation and prototyping",
          paragraphs: [
            "Then I moved to early concepts and ideation. I built coded prototypes in Cursor to explore potential solutions in low fidelity. The goal was to try as many options as possible in a short amount of time, and to align stakeholders on the solution. After a successful review I moved to a detailed design phase.",
          ],
        },
      ],
    },
    {
      id: "decisions",
      chip: "Final solution",
      title: "Final solution — key decisions",
      blocks: [
        {
          paragraphs: [
            "I designed a dedicated, separate setup flow for installment-based automations. Users still enter from the Payment Automations area, but long-term billing has its own guided path with its own mental model. This keeps the short-term experience intact, gives the system clean logic to detect conflicts, and lets both paths evolve independently.",
            "Users start by defining the conditions under which this automation should be triggered. They can trigger it based on specific channels, properties, or reservation length. However, in this case, the reservation length cannot be less than 30 nights to avoid conflicts with our event-based automation flow. This is also the minimum stay length at which users typically start treating a reservation as a long-term stay.",
            "Then users define the main charge logic: they choose a billing cycle — monthly, weekly, or every two weeks — decide whether the reservation total should be split equally or charged as a custom amount, and choose when the charge should occur.",
            "And finally, they decide what to take from that logic: upfront charge and security deposit.",
          ],
        },
      ],
    },
    {
      id: "challenges",
      chip: "Challenges",
      title: "Main challenges",
      blocks: [
        {
          heading: "Challenge 1 — Preview",
          paragraphs: [
            "I needed the way for users to preview the automation while they are creating it, so that it is easier for them to understand how it works. I added a calendar visualisation with reservation example that was updating based on decisions that user made during the flow.",
            "By default, users will see the long reservation view — three months. This helps them understand cases that are difficult to explain verbally, such as how partial months are handled or how the guest will be charged if the first and last installments are collected upfront.",
            "Preview changes based on what payment cycle user chooses, and if they turn on upfront charge and security deposit.",
          ],
        },
        {
          heading: "Challenge 2 — Catching conflicts",
          paragraphs: [
            "I used one of the AI tools I built for the team — Design Coverage Map — to quickly identify edge cases in my design.",
            "One issue it surfaced was that many users already had event-based automations set to apply to any length of stay. This meant the new installment-based automation could overlap with an existing one.",
            "To solve this, we showed users the conflicting automations and suggested adjusting the length-of-stay condition so the rules would not overlap.",
          ],
        },
      ],
    },
    {
      id: "outcomes",
      chip: "Outcomes",
      title: "Outcomes",
      blocks: [
        {
          paragraphs: [
            "This feature unlocked a new customer segment for Guesty — PMCs specializing in long-term rentals — that previously couldn't be served by the platform. X enterprise accounts were unblocked and new possibilities for revenue emerged.",
          ],
        },
      ],
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
