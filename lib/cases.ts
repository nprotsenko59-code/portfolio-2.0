export type Case = {
  slug: string;
  title: string;
  dates: string;
  description: string;
  website?: string;
  accent: string;
};

export const cases: Case[] = [
  {
    slug: "case-1",
    title: "Project One",
    dates: "2024 – 2025",
    description:
      "Short project description goes here. Two or three lines about the problem, the approach, and what shipped.",
    website: "#",
    accent: "#E9E4DD",
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
