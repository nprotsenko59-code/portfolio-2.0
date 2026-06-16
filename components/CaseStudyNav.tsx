"use client";

import Link from "next/link";
import type { CaseStudySection } from "@/lib/cases";

export default function CaseStudyNav({
  sections,
  activeIndex,
  onJump,
}: {
  sections: CaseStudySection[];
  activeIndex: number;
  onJump: (index: number) => void;
}) {
  return (
    <>
      <header className="pointer-events-none fixed left-0 right-0 top-0 z-[55] flex items-start justify-between px-8 pb-4 pt-7 md:px-12">
        <div className="pointer-events-auto">
          <Link
            href="/"
            scroll={false}
            data-cursor
            data-cursor-label="Back"
            data-case-back
            className="group inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#161616] transition-colors hover:bg-white/90"
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

      <nav
        aria-label="Case sections"
        data-case-rail
        className="pointer-events-none fixed left-8 top-1/2 z-[55] hidden -translate-y-1/2 lg:left-12 lg:block"
      >
        <ul className="flex flex-col gap-3.5">
          {sections.map((section, i) => {
            const isActive = i === activeIndex;
            return (
              <li key={section.id} className="pointer-events-auto">
                <button
                  type="button"
                  onClick={() => onJump(i)}
                  aria-current={isActive ? "true" : undefined}
                  aria-label={section.chip}
                  data-cursor
                  className="text-left"
                >
                  <span
                    className={`text-[11px] font-medium uppercase tracking-widest transition-colors duration-200 ease-out ${
                      isActive ? "text-ink" : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    {section.chip}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
