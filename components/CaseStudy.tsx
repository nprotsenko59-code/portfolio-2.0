"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Case } from "@/lib/cases";
import CasePlaceholder from "./CasePlaceholder";
import { gsap } from "@/lib/gsap";

const CASE_VISUAL_WIDTH = "w-[94%] max-w-[1200px] md:w-[86%]";

export default function CaseStudy({ data }: { data: Case }) {
  const sections = data.study?.sections ?? [];
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);
  const rootRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Scroll progress bar — tracks how much of the page is left to scroll.
  useEffect(() => {
    const bar = progressRef.current;
    if (!bar) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      bar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Land at top on mount (matches the prior history.scrollRestoration override).
  useEffect(() => {
    const prev = history.scrollRestoration;
    history.scrollRestoration = "manual";
    const raf = requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "auto" }));
    return () => {
      cancelAnimationFrame(raf);
      history.scrollRestoration = prev;
    };
  }, []);

  // Entry animation — fade + slide-up on the hero section + chrome.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const firstSection = sectionRefs.current[0];
    const root = rootRef.current;
    if (!firstSection || !root) return;

    const logo = firstSection.querySelector<HTMLElement>("[role='img']");
    const heading = firstSection.querySelector<HTMLElement>("h2");
    const paragraphs = firstSection.querySelectorAll<HTMLElement>("p");
    const backLink = root.querySelector<HTMLElement>("[data-case-back]");
    const railItems = root.querySelectorAll<HTMLElement>("[data-case-rail] li");

    const slideTargets: HTMLElement[] = [];
    if (logo) slideTargets.push(logo);
    if (heading) slideTargets.push(heading);
    paragraphs.forEach((p) => slideTargets.push(p));

    if (slideTargets.length) gsap.set(slideTargets, { y: 40, opacity: 0 });
    if (backLink) gsap.set(backLink, { y: -12, opacity: 0 });
    if (railItems.length) gsap.set(railItems, { y: 8, opacity: 0 });

    const tl = gsap.timeline();
    if (backLink) tl.to(backLink, { y: 0, opacity: 1, duration: 0.7, ease: "expo.out" }, 0);
    if (railItems.length)
      tl.to(railItems, { y: 0, opacity: 1, duration: 0.6, ease: "expo.out", stagger: 0.04 }, 0.2);
    if (logo) tl.to(logo, { y: 0, opacity: 1, duration: 1.0, ease: "expo.out" }, 0.15);
    if (heading) tl.to(heading, { y: 0, opacity: 1, duration: 1.1, ease: "expo.out" }, 0.25);
    if (paragraphs.length)
      tl.to(
        paragraphs,
        { y: 0, opacity: 1, duration: 1.0, ease: "expo.out", stagger: 0.08 },
        0.45
      );

    return () => {
      tl.kill();
    };
  }, []);

  // Scroll-spy: highlight the section closest to viewport center.
  useEffect(() => {
    const els = sectionRefs.current.filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = els.indexOf(entry.target as HTMLElement);
          if (idx >= 0) setActiveIndex(idx);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections.length]);

  const handleJump = (index: number) => {
    const el = sectionRefs.current[index];
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top, behavior: "smooth" });
  };

  if (!sections.length) {
    return (
      <div className="flex h-screen items-center justify-center text-ink-muted">
        No case study content yet.
      </div>
    );
  }

  return (
    <main ref={rootRef} className="case-study-page relative">
      <div
        aria-hidden
        className="pointer-events-none fixed left-0 right-0 top-0 z-[60] h-[3px] bg-ink/10"
      >
        <div
          ref={progressRef}
          className="h-full origin-left bg-white"
          style={{ transform: "scaleX(0)" }}
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
      <article className="w-full px-6 pb-40 pt-20 lg:pt-24">
        {sections.map((section, i) => {
          const isHero = i === 0;
          const heroSideBySide = isHero
            ? section.blocks.filter(
                (b) => b.heading === "My role" || b.heading === "Team"
              )
            : [];
          const blocksToRender = isHero
            ? section.blocks.filter(
                (b) => b.heading !== "My role" && b.heading !== "Team"
              )
            : section.blocks;
          return (
          <section
            key={section.id}
            ref={(el) => {
              sectionRefs.current[i] = el;
            }}
            id={section.id}
            aria-label={section.chip}
            className={i === 0 ? "scroll-mt-32" : "scroll-mt-32 mt-20 pt-20"}
          >
            {i !== 0 ? (
              <div className="mx-auto -mt-20 mb-20 max-w-[760px] px-6">
                <div aria-hidden className="h-px w-full bg-ink/15" />
              </div>
            ) : null}
            <div className="mx-auto max-w-[760px] px-6">
              {i === 0 ? (
                <>
                  {data.logo ? (
                    <div
                      role="img"
                      aria-label={data.logo.alt}
                      className="mb-10 text-ink"
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
                  <h2 className="font-display text-[36px] font-bold uppercase leading-[1.1] tracking-[-0.02em] text-ink">
                    {data.headline ?? data.title}
                  </h2>
                  <p className="mt-8 text-[16px] leading-[1.65] text-ink/85">
                    {data.description}
                  </p>
                  {heroSideBySide.length ? (
                    <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2">
                      {heroSideBySide.map((block, idx) => (
                        <div key={idx}>
                          {block.heading ? (
                            <h3 className="mb-4 font-display text-[14px] font-semibold uppercase tracking-widest text-ink-muted">
                              {block.heading}
                            </h3>
                          ) : null}
                          {block.paragraphs?.length ? (
                            <div className="space-y-3">
                              {block.paragraphs.map((para, j) => (
                                <p key={j} className="text-[16px] leading-[1.65] text-ink/85">
                                  {para}
                                </p>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  ) : null}
                </>
              ) : (
                <>
                  {section.eyebrow ? (
                    <span className="mb-3 block text-[11px] font-medium uppercase tracking-widest text-ink-muted">
                      {section.eyebrow}
                    </span>
                  ) : null}
                  <h2 className="font-display text-[36px] font-bold uppercase leading-[1.1] tracking-[-0.02em] text-ink">
                    {section.title}
                  </h2>
                </>
              )}
            </div>

            {i === 0 ? (
              <div className={`mx-auto mt-16 ${CASE_VISUAL_WIDTH}`}>
                <CasePlaceholder data={data} section={section} />
              </div>
            ) : null}

            <div className="mt-14 space-y-14">
              {blocksToRender.map((block, b) => (
                <div key={b}>
                  <div className="mx-auto max-w-[760px] px-6">
                    {block.heading ? (
                      <h3 className="mb-4 font-display text-[20px] font-semibold uppercase tracking-[0.02em] text-ink">
                        {block.heading}
                      </h3>
                    ) : null}
                    {block.paragraphs?.length ? (
                      <div className="space-y-5">
                        {block.paragraphs.map((para, j) => (
                          <p key={j} className="text-[16px] leading-[1.65] text-ink/85">
                            {para}
                          </p>
                        ))}
                      </div>
                    ) : null}
                    {block.bullets ? (
                      <ul
                        className={`${
                          block.paragraphs?.length ? "mt-5" : ""
                        } space-y-3 text-[16px] leading-[1.65] text-ink/85`}
                      >
                        {block.bullets.items.map((item, k) => (
                          <li key={k} className="flex gap-3">
                            <span className="shrink-0 text-ink-muted">—</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                  {block.visual ? (
                    <figure
                      className={`relative mx-auto mt-10 overflow-hidden rounded-[20px] bg-[#0F1410] ${CASE_VISUAL_WIDTH}`}
                      style={{ aspectRatio: block.visual.aspectRatio ?? "16 / 9" }}
                    >
                      <Image
                        src={block.visual.src}
                        alt={block.visual.alt}
                        width={block.visual.width}
                        height={block.visual.height}
                        sizes="(min-width: 1280px) 1200px, 100vw"
                        quality={75}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </figure>
                  ) : null}
                </div>
              ))}
            </div>
          </section>
          );
        })}
      </article>
    </main>
  );
}
