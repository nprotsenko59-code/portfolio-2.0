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
    <div
      data-case-rail
      className="pointer-events-auto fixed bottom-6 left-6 top-6 z-[55] flex flex-col gap-4 rounded-2xl border border-ink/15 bg-[#1A1A1A] p-3 lg:bottom-8 lg:left-8 lg:top-8 lg:w-[200px] lg:gap-5 lg:p-4"
    >
      <Link
        href="/"
        scroll={false}
        data-cursor
        data-cursor-label="Back"
        data-case-back
        className="group inline-flex w-fit items-center rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#161616] transition-colors hover:bg-white/90"
      >
        <span
          aria-hidden
          className="mr-0 inline-flex w-0 -translate-x-1 items-center overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 ease-out group-hover:mr-1.5 group-hover:w-[14px] group-hover:translate-x-0 group-hover:opacity-100"
        >
          ←
        </span>
        <span>Back</span>
      </Link>

      <nav aria-label="Case sections" className="hidden lg:block">
        <ul className="flex flex-col gap-2.5">
          {sections.map((section, i) => {
            const isActive = i === activeIndex;
            return (
              <li key={section.id}>
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
    </div>
  );
}
