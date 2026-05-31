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
};

export const cases: Case[] = [
  {
    slug: "case-1",
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
    website: "#",
    accent: "#072C23",
    theme: "dark",
    image: {
      src: "/images/guesty-installments.png",
      alt: "Guesty Installments setup UI with payment cycle, automation example calendar, and house illustrations",
    },
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
