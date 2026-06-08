"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Case } from "@/lib/cases";
import { gsap } from "@/lib/gsap";

export default function CaseCard({ data }: { data: Case; index: number }) {
  const isDark = data.theme === "dark";
  const articleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const article = articleRef.current;
    if (!article) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarsePointer) return;

    gsap.set(article, { transformPerspective: 1200, transformOrigin: "center center" });

    const setRotY = gsap.quickTo(article, "rotationY", { duration: 0.6, ease: "power3.out" });
    const setRotX = gsap.quickTo(article, "rotationX", { duration: 0.6, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const rect = article.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const nx = Math.max(-1, Math.min(1, (e.clientX - cx) / (rect.width / 2)));
      const ny = Math.max(-1, Math.min(1, (e.clientY - cy) / (rect.height / 2)));
      setRotY(nx * 4);
      setRotX(-ny * 4);
    };
    const onLeave = () => {
      setRotY(0);
      setRotX(0);
    };

    article.addEventListener("mousemove", onMove);
    article.addEventListener("mouseleave", onLeave);
    return () => {
      article.removeEventListener("mousemove", onMove);
      article.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const ctaHref = data.study ? `/work/${data.slug}` : data.website ?? null;
  const isExternal = !data.study && !!data.website;

  const ctaPill = ctaHref ? (
    <span
      className={`inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
        isDark
          ? "bg-white text-ink group-hover:bg-white/90"
          : "bg-white/70 text-ink group-hover:bg-white"
      }`}
    >
      <span>View</span>
      <span
        aria-hidden
        className="ml-0 inline-flex w-0 -translate-x-1 items-center overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 ease-out group-hover:ml-1.5 group-hover:w-[14px] group-hover:translate-x-0 group-hover:opacity-100"
      >
        →
      </span>
    </span>
  ) : null;

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
      {ctaPill ? <div className="mt-auto pt-10">{ctaPill}</div> : null}
    </div>
  );

  return (
    <article
      ref={articleRef}
      data-case-card
      className="group relative grid h-full w-full grid-cols-1 overflow-hidden rounded-[40px] border md:h-[82vh] md:grid-cols-2"
      style={{
        backgroundColor: data.accent,
        borderColor: isDark ? "rgba(255,255,255,0.08)" : "var(--color-card-border)",
        willChange: "transform",
      }}
      aria-label={data.title}
    >
      {textColumn}

      {data.image ? (
        <div className="relative min-h-[280px] md:min-h-0">
          <Image
            src={data.image.src}
            alt={data.image.alt}
            width={2370}
            height={1456}
            sizes="(min-width: 768px) 60vw, 100vw"
            quality={90}
            className="pointer-events-none absolute left-1/2 top-0 h-full w-auto max-w-none -translate-x-[40%] select-none md:-translate-x-[35%]"
            priority={false}
          />
        </div>
      ) : (
        <div
          className="relative mx-8 mb-8 min-h-[280px] overflow-hidden rounded-2xl md:my-12 md:mr-12 md:ml-0 md:min-h-0"
          style={{ backgroundColor: data.accent }}
        />
      )}

      {ctaHref ? (
        isExternal ? (
          <a
            href={ctaHref}
            target="_blank"
            rel="noreferrer"
            data-cursor
            data-cursor-label="View"
            aria-label={`View ${data.title}`}
            className="absolute inset-0 z-20"
          />
        ) : (
          <Link
            href={ctaHref}
            data-cursor
            data-cursor-label="View"
            aria-label={`View ${data.title}`}
            onClick={() => {
              try {
                sessionStorage.setItem("home:returnScroll", String(window.scrollY));
              } catch {
                /* ignore */
              }
            }}
            className="absolute inset-0 z-20"
          />
        )
      ) : null}
    </article>
  );
}
