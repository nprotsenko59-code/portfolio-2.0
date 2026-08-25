export type CaseSectionBlock = {
  heading?: string;
  paragraphs?: string[];
  bullets?: { label?: string; items: string[] };
  visual?: { src: string; alt: string; width: number; height: number; aspectRatio?: string };
  layout?: "split";
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
  image?: { src: string; alt: string; contain?: boolean; scale?: number };
  /** Optional logo rendered above the headline. Recolored to the card text color. */
  logo?: { src: string; alt: string; aspectRatio: number; height?: number };
  /** When true, the CTA pill uses dark background + white text (for light cards with dark text). */
  invertButton?: boolean;
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
          visual: {
            src: "/images/payment-installments/current-logic.jpg",
            alt: "Current Guesty payment automation logic — current state diagram",
            width: 2400,
            height: 1350,
          },
        },
        {
          heading: "My role",
          paragraphs: [
            "I led all the design process for this project: from briefing with my PM and discovery to hand off to development.",
          ],
        },
        {
          heading: "Team",
          paragraphs: [
            "Me (designer), Product manager, Front-end developer, Back-end developer",
          ],
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
          visual: {
            src: "/images/payment-installments/discovery.jpg",
            alt: "Discovery research with property managers",
            width: 2400,
            height: 1350,
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
          visual: {
            src: "/images/payment-installments/competitors.jpg",
            alt: "Competitor patterns research — fintech app references",
            width: 2400,
            height: 1350,
          },
        },
        {
          heading: "Ideation and prototyping",
          paragraphs: [
            "Then I moved to early concepts and ideation. I built coded prototypes in Cursor to explore potential solutions in low fidelity. The goal was to try as many options as possible in a short amount of time, and to align stakeholders on the solution. After a successful review I moved to a detailed design phase.",
          ],
          visual: {
            src: "/images/payment-installments/prototype.jpg",
            alt: "Coded prototype explorations in Cursor",
            width: 2400,
            height: 1350,
          },
        },
      ],
    },
    {
      id: "decisions",
      chip: "Key design decisions",
      title: "Key design decisions",
      blocks: [
        {
          paragraphs: [
            "I designed a dedicated, separate setup flow for installment-based automations. Users still enter from the Payment Automations area, but long-term billing has its own guided path with its own mental model. This keeps the short-term experience intact, gives the system clean logic to detect conflicts, and lets both paths evolve independently.",
          ],
          visual: {
            src: "/images/payment-installments/entry-point.jpg",
            alt: "Entry point — separate setup flow for installment-based automations",
            width: 2400,
            height: 1350,
          },
        },
        {
          visual: {
            src: "/images/payment-installments/entry-point-open.jpg",
            alt: "Entry point — create menu showing the installments option",
            width: 2400,
            height: 1350,
          },
        },
        {
          paragraphs: [
            "Users start by defining the conditions under which this automation should be triggered. They can trigger it based on specific channels, properties, or reservation length. However, in this case, the reservation length cannot be less than 30 nights to avoid conflicts with our event-based automation flow. This is also the minimum stay length at which users typically start treating a reservation as a long-term stay.",
          ],
          visual: {
            src: "/images/payment-installments/settings.jpg",
            alt: "Trigger conditions setup — channels, properties, reservation length",
            width: 2400,
            height: 1350,
            aspectRatio: "16/9",
          },
        },
        {
          paragraphs: [
            "Then users define the main charge logic: they choose a billing cycle — monthly, weekly, or every two weeks — decide whether the reservation total should be split equally or charged as a custom amount, and choose when the charge should occur.",
          ],
          visual: {
            src: "/images/payment-installments/payment-cycle-cards.jpg",
            alt: "Payment cycle setup — billing cadence and split logic",
            width: 2400,
            height: 1350,
          },
        },
        {
          paragraphs: [
            "And finally, they decide what to take from that logic: upfront charge and security deposit.",
          ],
          visual: {
            src: "/images/payment-installments/move-in-off.jpg",
            alt: "Move-in costs — all options off",
            width: 2400,
            height: 1350,
          },
        },
        {
          visual: {
            src: "/images/payment-installments/move-in-on.jpg",
            alt: "Move-in costs — all options on",
            width: 2400,
            height: 1350,
          },
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
          visual: {
            src: "/images/payment-installments/preview.jpg",
            alt: "Preview — calendar visualization of installments",
            width: 2400,
            height: 1350,
          },
        },
        {
          heading: "Challenge 2 — Catching conflicts",
          paragraphs: [
            "I used one of the AI tools I built for the team — Design Coverage Map — to quickly identify edge cases in my design.",
            "One issue it surfaced was that many users already had event-based automations set to apply to any length of stay. This meant the new installment-based automation could overlap with an existing one.",
            "To solve this, we showed users the conflicting automations and suggested adjusting the length-of-stay condition so the rules would not overlap.",
          ],
          visual: {
            src: "/images/payment-installments/conflict.jpg",
            alt: "Conflict resolution — suggesting length-of-stay adjustments",
            width: 2400,
            height: 1350,
          },
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
            "This feature unlocked a new customer segment for Guesty — PMCs specializing in long-term rentals — that previously couldn't be served by the platform. 7 enterprise accounts were unblocked and new possibilities for revenue emerged.",
          ],
        },
      ],
    },
  ],
};

const paymentLinksStudy: { sections: CaseStudySection[] } = {
  sections: [
    {
      id: "overview",
      chip: "Overview",
      eyebrow: "Guesty · 2025",
      title: "Payment Links",
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
            "Guesty's payment processing worked well for charges defined at booking — confirmed amounts processed automatically through the reservation lifecycle. But property managers regularly encounter situations mid-stay where guests request extra services: a late check-out, a pet fee, a city tour, an extra bed. For these ad-hoc charges, there was no in-platform solution.",
            "PMCs were left to collect money outside the system — via bank transfer, cash, or third-party tools — creating reconciliation problems, audit gaps, and a poor experience for guests who had no visibility into what they were paying for or why.",
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
          paragraphs: [
            "Me (designer), Product manager, Front-end developer, Back-end developer",
          ],
        },
      ],
    },
    {
      id: "process",
      chip: "Process",
      title: "Process",
      blocks: [
        {
          heading: "Discovery",
          paragraphs: [
            "My PM and I analyzed the support tickets we were getting. Here's what we found:",
          ],
          bullets: {
            items: [
              "Ad-hoc charges are a regular part of operations, not an edge case. Nearly every PMC had a recurring list of items they regularly collect outside the system.",
              "The manual workarounds were costing them trust with guests. Sending a bank transfer request or asking for cash felt informal and was often uncomfortable for both sides — guests are frequently traveling from abroad, which makes bank transfers inconvenient, and cash requires someone to physically collect it, pulling the team away from day-to-day duties.",
            ],
          },
        },
        {
          heading: "Why payment link?",
          paragraphs: [
            "We decided to add payment link functionality since it can be convenient for both sides:",
          ],
          bullets: {
            items: [
              "For the property manager, it takes seconds to create and send.",
              "The guest can enter their card details without needing to find an ATM or hand over cash.",
            ],
          },
        },
        {
          heading: "Patterns research",
          paragraphs: [
            "To understand what guests expect from a payment link experience, I explored fintech and e-commerce products that handle similar flows. The key finding: the most trusted guest-facing payment pages strip everything down to the minimum — amount, clear purpose, a single action, and a preview of the link to set the right expectations.",
          ],
        },
      ],
    },
    {
      id: "solution",
      chip: "Solution",
      title: "Solution",
      blocks: [
        {
          paragraphs: [
            "The solution covers two levels: the property manager creates a link inside Guesty, and the guest completes payment via a standalone URL.",
            "The property manager creates the link from the reservation page. Placing it there keeps the action contextual — they can see the state of payments for that reservation.",
          ],
          visual: {
            src: "/images/Solution 1.jpg",
            alt: "Creating a payment link from the reservation page",
            width: 2400,
            height: 1350,
          },
        },
        {
          paragraphs: [
            "They set an amount, add a description of the services, and share the link — either by copying it to the clipboard or sending it directly to the guest's email on file.",
          ],
          visual: {
            src: "/images/Solution 2.jpg",
            alt: "Setting the amount and description, and sharing the payment link",
            width: 2400,
            height: 1350,
          },
        },
        {
          heading: "Challenge",
          paragraphs: [
            "The guest must feel secure handing over their payment details. We addressed this two ways:",
          ],
          bullets: {
            items: [
              "Property managers can upload their company logo — something the guest has already seen, in emails, invoices, and elsewhere.",
              "The page shows reservation details — property name, address, and check-in and check-out dates — information only the property manager would know.",
            ],
          },
        },
        {
          heading: "Guest experience",
          paragraphs: [
            "Guests open this page from their phone, so a clean, mobile-friendly design was a priority.",
          ],
          visual: {
            src: "/images/Guest experience.jpg",
            alt: "Guest-facing payment page, optimized for mobile",
            width: 2400,
            height: 1350,
          },
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
            "Payment links gave property managers a secure, trackable way to handle ad-hoc revenue that previously lived entirely outside the platform. For guests, it removed the awkwardness of informal payment requests and gave them a transparent, professional experience.",
            "For Guesty, it expanded the volume of payments processed through the platform, strengthened retention among GPro enterprise clients for whom this was a genuine feature gap, and removed a recurring objection in competitive sales conversations.",
          ],
        },
      ],
    },
  ],
};

const findInspirationStudy: { sections: CaseStudySection[] } = {
  sections: [
    {
      id: "overview",
      chip: "Overview",
      eyebrow: "Guesty · 2025",
      title: "Find Inspiration Skill",
      blocks: [
        {
          heading: "The problem",
          paragraphs: [
            "Finding relevant design references used to take a lot of time: designers had to manually search through Mobbin, try different queries, compare multiple flows, and decide what was actually useful.",
          ],
        },
        {
          heading: "What I built",
          paragraphs: [
            "I built an AI skill on top of Mobbin MCP that turns a designer's request into curated reference research. It searches for relevant examples, analyzes patterns across them, filters out noise, and gives designers a focused set of references with clear reasoning for why each one is useful.",
          ],
        },
      ],
    },
    {
      id: "process",
      chip: "Process",
      title: "How it works",
      blocks: [
        {
          heading: "1. Setting the context",
          paragraphs: [
            "The skill follows a guided workflow. First, the designer initiates the skill, and it explains what context is needed: the product area, user problem, flow, patterns to explore, and any constraints.",
          ],
          visual: {
            src: "/images/Find%20inspiration%201.png",
            alt: "Find inspiration skill asking for context — product area, user problem, patterns, constraints",
            width: 2400,
            height: 1350,
          },
        },
        {
          heading: "2. Confirming the scope",
          paragraphs: [
            "Once the designer provides the context, the skill summarizes the search scope and asks for confirmation.",
          ],
          visual: {
            src: "/images/Find%20inspiration%202.png",
            alt: "Find inspiration skill summarizing search scope for confirmation",
            width: 2400,
            height: 1350,
          },
        },
        {
          heading: "3. Curated references",
          paragraphs: [
            "After the scope is confirmed, it searches Mobbin, analyzes the results, and returns a curated list of references. Each reference includes the app name, link, why this specific example is relevant to the designer's work, and which pattern to pay attention to. The output is grouped by the patterns confirmed by the designer, making it easier to review examples by theme instead of browsing through unrelated screens.",
          ],
          visual: {
            src: "/images/Find%20inspiration%203.png",
            alt: "Curated design references grouped by pattern, with app name and reasoning for each",
            width: 2400,
            height: 1350,
          },
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
      "Unblocked 7 enterprise accounts by adapting payment automations for long-term rentals",
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
      src: "/images/cards/installments.png",
      alt: "Guesty Installments setup UI with payment cycle, automation example calendar, and house illustrations",
    },
    study: guestyStudy,
  },
  {
    slug: "payment-links",
    title: "Payment Links",
    headline:
      "Boosted processed payment volume and closed a competitive gap with ad-hoc payment links",
    dates: "",
    description:
      "Property managers had no in-platform way to charge guests for extra services mid-stay — leaving teams to collect cash or bank transfers outside Guesty, creating reconciliation gaps and an inconsistent guest experience. I designed a two-sided payment link flow: a quick creation tool inside the reservation view, and a secure, mobile-friendly payment page for guests.",
    accent: "#0E0740",
    theme: "dark",
    logo: {
      src: "/images/guesty-logo.svg",
      alt: "Guesty",
      aspectRatio: 445 / 117,
      height: 28,
    },
    image: {
      src: "/images/cards/payment-link.png",
      alt: "Payment link flow",
    },
    study: paymentLinksStudy,
  },
  {
    slug: "find-inspiration-skill",
    title: "Find Inspiration Skill",
    headline:
      "Cut design reference research from hours to minutes with a Mobbin-powered AI skill",
    dates: "",
    description:
      "Designers spent hours manually searching Mobbin for relevant references. I built an AI skill on top of Mobbin MCP that turns a design brief into a curated set of references, grouped by pattern, with reasoning for why each one is useful.",
    accent: "#F7F7F4",
    invertButton: true,
    logo: {
      src: "/images/guesty-logo.svg",
      alt: "Guesty",
      aspectRatio: 445 / 117,
      height: 28,
    },
    image: {
      src: "/images/Cursor.png",
      alt: "AI skills for designers",
    },
    study: findInspirationStudy,
  },
];

export function getCase(slug: string): Case | undefined {
  return cases.find((c) => c.slug === slug);
}
