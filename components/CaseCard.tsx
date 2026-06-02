"use client";

import Image from "next/image";
import Link from "next/link";
import type { Case } from "@/lib/cases";

export default function CaseCard({ data }: { data: Case; index: number }) {
  const isDark = data.theme === "dark";

  const textColumn = (
    <div className="relative z-10 flex flex-col p-8 md:p-12">
      {data.logo ? (
        <div
          role="img"
          aria-label={data.logo.alt}
          className={`mb-6 ${isDark ? "text-white" : "text-ink"}`}
          style={{
            height: data.logo.height ?? 28,
            width: (data.logo.height ?? 28) * data.logo.aspectRatio,
            backgroundColor: "currentColor",
            WebkitMaskImage: `url(${data.logo.src})`,
            maskImage: `url(${data.logo.src})`,
            WebkitMaskSize: "contain",
            maskSize: "contain",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "left center",
            maskPosition: "left center",
          }}
        />
      ) : null}
      {data.headline ? (
        <h3
          className={`font-display text-[clamp(28px,2.8vw,46px)] font-bold uppercase leading-[1.1] tracking-[-0.02em] ${
            isDark ? "text-white" : "text-ink"
          }`}
        >
          {data.headline}
        </h3>
      ) : (
        <h3
          className={`font-display text-[clamp(36px,4vw,56px)] font-bold uppercase leading-none tracking-[-0.03em] ${
            isDark ? "text-white" : "text-ink"
          }`}
        >
          {data.title}
        </h3>
      )}
      {data.dates ? (
        <p className={`mt-3 text-sm ${isDark ? "text-white/55" : "text-ink-muted"}`}>
          {data.dates}
        </p>
      ) : null}
      <p
        className={`mt-4 max-w-md text-[15px] leading-[1.55] ${
          isDark ? "text-white/85" : "text-ink"
        }`}
      >
        {data.description}
      </p>
      {data.study ? (
        <div className="mt-auto pt-10">
          <Link
            href={`/work/${data.slug}`}
            data-cursor
            data-cursor-label="View"
            className={`group inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
              isDark
                ? "bg-white text-ink hover:bg-white/90"
                : "bg-white/70 text-ink hover:bg-white"
            }`}
          >
            <span>View</span>
            <span
              aria-hidden
              className="ml-0 inline-flex w-0 -translate-x-1 items-center overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 ease-out group-hover:ml-1.5 group-hover:w-[14px] group-hover:translate-x-0 group-hover:opacity-100"
            >
              →
            </span>
          </Link>
        </div>
      ) : data.website ? (
        <div className="mt-auto pt-10">
          <a
            href={data.website}
            target="_blank"
            rel="noreferrer"
            data-cursor
            data-cursor-label="Open"
            className={`group inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
              isDark
                ? "bg-white text-ink hover:bg-white/90"
                : "bg-white/70 text-ink hover:bg-white"
            }`}
          >
            <span>View</span>
            <span
              aria-hidden
              className="ml-0 inline-flex w-0 -translate-x-1 items-center overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 ease-out group-hover:ml-1.5 group-hover:w-[14px] group-hover:translate-x-0 group-hover:opacity-100"
            >
              →
            </span>
          </a>
        </div>
      ) : null}
    </div>
  );

  return (
    <article
      data-case-card
      className="relative grid h-full w-full grid-cols-1 overflow-hidden rounded-[40px] border md:h-[82vh] md:grid-cols-2"
      style={{
        backgroundColor: data.accent,
        borderColor: isDark ? "rgba(255,255,255,0.08)" : "var(--color-card-border)",
      }}
      aria-label={data.title}
    >
      {textColumn}

      {data.image ? (
        <div
          className="relative min-h-[280px] md:min-h-0"
          data-cursor
          data-cursor-label="View"
        >
          <Image
            src={data.image.src}
            alt={data.image.alt}
            width={2370}
            height={1456}
            sizes="(min-width: 768px) 60vw, 100vw"
            className="pointer-events-none absolute left-1/2 top-0 h-full w-auto max-w-none -translate-x-[40%] select-none md:-translate-x-[35%]"
            priority={false}
          />
        </div>
      ) : (
        <div
          className="relative mx-8 mb-8 min-h-[280px] overflow-hidden rounded-2xl md:my-12 md:mr-12 md:ml-0 md:min-h-0"
          style={{ backgroundColor: data.accent }}
          data-cursor
          data-cursor-label="View"
        />
      )}
    </article>
  );
}
