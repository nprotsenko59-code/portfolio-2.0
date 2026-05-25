export type CaseSpan = "tall-left" | "wide-top" | "tall-right" | "small-bottom" | "wide-bottom";

export type Case = {
  slug: string;
  title: string;
  span: CaseSpan;
};

export const cases: Case[] = [
  { slug: "case-1", title: "Case One", span: "tall-left" },
  { slug: "case-2", title: "Case Two", span: "wide-top" },
  { slug: "case-3", title: "Case Three", span: "tall-right" },
  { slug: "case-4", title: "Case Four", span: "small-bottom" },
];
