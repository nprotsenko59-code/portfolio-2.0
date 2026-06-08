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
        data-case-progress
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
            scroll={false}
            data-cursor
            data-cursor-label="Back"
            data-case-back
            className="group inline-flex items-center rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ink/90"
          >
            <span
              aria-hidden
              className="mr-0 inline-flex w-0 -translate-x-1 items-center overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 ease-out group-hover:mr-1.5 group-hover:w-[14px] group-hover:translate-x-0 group-hover:opacity-100"
            >
              ←
            </span>
            <span>Back</span>
          </Link>
        </div>
      </header>
    </>
  );
}
