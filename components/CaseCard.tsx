"use client";

import type { Case } from "@/lib/cases";

export default function CaseCard({ data }: { data: Case; index: number }) {
  return (
    <article
      data-case-card
      className="flex h-full w-full flex-col rounded-[40px] border border-card-border bg-card p-8 md:h-[82vh] md:p-12"
      aria-label={data.title}
    >
      <div className="grid flex-1 grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
        <div className="flex flex-col">
          <h3 className="text-[clamp(36px,4vw,56px)] font-black uppercase leading-none tracking-[-0.03em] text-ink">
            {data.title}
          </h3>
          <p className="mt-3 text-sm text-ink-muted">{data.dates}</p>
          <p className="mt-8 max-w-md text-[15px] leading-[1.5] text-ink">
            {data.description}
          </p>
          {data.website ? (
            <div className="mt-auto pt-10">
              <a
                href={data.website}
                target="_blank"
                rel="noreferrer"
                data-cursor
                data-cursor-label="Open"
                className="inline-flex items-center rounded-full bg-white/70 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-white"
              >
                Website
              </a>
            </div>
          ) : null}
        </div>

        <div
          className="relative min-h-[280px] overflow-hidden rounded-2xl md:min-h-0"
          style={{ backgroundColor: data.accent }}
          data-cursor
          data-cursor-label="View"
        />
      </div>
    </article>
  );
}
