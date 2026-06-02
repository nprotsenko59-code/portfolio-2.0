"use client";

import Link from "next/link";
import type { CaseStudySection } from "@/lib/cases";

export default function CaseStudyNav({
  sections,
  activeIndex,
}: {
  sections: CaseStudySection[];
  activeIndex: number;
}) {
  const progress = sections.length > 1 ? activeIndex / (sections.length - 1) : 0;

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed left-0 right-0 top-0 z-[60] h-[3px] bg-ink/10"
      >
        <div
          className="h-full bg-ink transition-[width] duration-500 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      <header className="pointer-events-none fixed left-0 right-0 top-0 z-[55] flex items-start justify-between px-8 pb-4 pt-7 md:px-12">
        <div className="pointer-events-auto">
          <Link
            href="/"
            data-cursor
            data-cursor-label="Back"
            className="text-xs font-medium uppercase tracking-widest text-ink-muted transition-colors hover:text-ink"
          >
            ← Back
          </Link>
        </div>
      </header>
    </>
  );
}
