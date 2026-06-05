"use client";

import { useEffect, useRef, useState } from "react";
import type { Case } from "@/lib/cases";
import CaseStudyNav from "./CaseStudyNav";
import CasePlaceholder from "./CasePlaceholder";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function CaseStudy({ data }: { data: Case }) {
  const sections = data.study?.sections ?? [];
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);
  const rootRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Toggle scroll-snap on <html> while the case study is mounted.
  useEffect(() => {
    document.documentElement.classList.add("case-snap");
    const prev = history.scrollRestoration;
    history.scrollRestoration = "manual";
    // Land at the first snap point on mount — run after browser's scroll
    // restoration attempt so it actually sticks on reload.
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
      });
      return () => cancelAnimationFrame(raf2);
    });
    return () => {
      cancelAnimationFrame(raf1);
      document.documentElement.classList.remove("case-snap");
      history.scrollRestoration = prev;
    };
  }, []);

  // Entry animation — same vibe as the Hero load: fade + slide-up, expo.out, staggered.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const firstSection = sectionRefs.current[0];
    const root = rootRef.current;
    const visual = visualRef.current;
    if (!firstSection || !root) return;

    const logo = firstSection.querySelector<HTMLElement>("[role='img']");
    const heading = firstSection.querySelector<HTMLElement>("h2");
    const paragraphs = firstSection.querySelectorAll<HTMLElement>("p");
    const backLink = root.querySelector<HTMLElement>("[data-case-back]");
    const progressBar = root.querySelector<HTMLElement>("[data-case-progress]");

    const slideTargets: HTMLElement[] = [];
    if (logo) slideTargets.push(logo);
    if (heading) slideTargets.push(heading);
    paragraphs.forEach((p) => slideTargets.push(p));

    if (slideTargets.length) gsap.set(slideTargets, { y: 40, opacity: 0 });
    if (visual) gsap.set(visual, { y: 60, opacity: 0 });
    if (backLink) gsap.set(backLink, { y: -12, opacity: 0 });
    if (progressBar) gsap.set(progressBar, { opacity: 0 });

    const tl = gsap.timeline();

    if (progressBar) {
      tl.to(progressBar, { opacity: 1, duration: 0.6, ease: "power2.out" }, 0);
    }
    if (backLink) {
      tl.to(backLink, { y: 0, opacity: 1, duration: 0.7, ease: "expo.out" }, 0);
    }
    if (visual) {
      tl.to(visual, { y: 0, opacity: 1, duration: 1.2, ease: "expo.out" }, 0.1);
    }
    if (logo) {
      tl.to(logo, { y: 0, opacity: 1, duration: 1.0, ease: "expo.out" }, 0.15);
    }
    if (heading) {
      tl.to(heading, { y: 0, opacity: 1, duration: 1.1, ease: "expo.out" }, 0.25);
    }
    if (paragraphs.length) {
      tl.to(
        paragraphs,
        { y: 0, opacity: 1, duration: 1.0, ease: "expo.out", stagger: 0.08 },
        0.45
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  // Track which section is at viewport center to drive the visual cross-fade.
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
      // 10% zone at viewport center. Whichever section intersects it is active.
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections.length]);

  // Per-paragraph scroll reveal for sections marked with revealParagraphsOnScroll.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const triggers: ScrollTrigger[] = [];

    sections.forEach((section, i) => {
      if (!section.revealParagraphsOnScroll) return;
      const sectionEl = sectionRefs.current[i];
      if (!sectionEl) return;

      const paras = sectionEl.querySelectorAll<HTMLElement>("[data-reveal-paragraph]");
      if (paras.length < 2) return;

      const subsequent = Array.from(paras).slice(1);
      gsap.set(subsequent, { opacity: 0, y: 24 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: sectionEl,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.4,
        },
      });

      const slots = subsequent.length + 1;
      subsequent.forEach((p, idx) => {
        const pos = (idx + 1) / slots;
        tl.to(p, { opacity: 1, y: 0, duration: 0.15 }, pos);
      });
      tl.to({}, { duration: 0.1 }, 1);

      const trigger = tl.scrollTrigger;
      if (trigger) triggers.push(trigger);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [sections]);

  if (!sections.length) {
    return (
      <div className="flex h-screen items-center justify-center text-ink-muted">
        No case study content yet.
      </div>
    );
  }

  return (
    <main ref={rootRef} className="relative">
      <CaseStudyNav sections={sections} activeIndex={activeIndex} />

      {/* Fixed right-side visual viewer — stays in place; content cross-fades on activeIndex */}
      <div
        ref={visualRef}
        data-case-visual
        aria-hidden
        className="pointer-events-none fixed bottom-5 right-5 top-5 z-30 hidden md:block"
        style={{ width: "calc(60% - 20px)" }}
      >
        {sections.map((section, i) => (
          <div
            key={section.id}
            className="absolute inset-0 transition-opacity duration-700 ease-out"
            style={{ opacity: activeIndex === i ? 1 : 0 }}
          >
            <CasePlaceholder section={section} />
          </div>
        ))}
      </div>

      {/* Left text column — flows in normal scroll */}
      <div className="relative w-full md:w-[40%]">
        {sections.map((section, i) => {
          const paragraphs = section.body.split("\n\n");
          const reveal = section.revealParagraphsOnScroll && paragraphs.length > 1;

          const textBlock = (
            <div className="flex flex-col">
              {i === 0 ? (
                <>
                  {data.logo ? (
                    <div
                      role="img"
                      aria-label={data.logo.alt}
                      className="mb-6 text-ink"
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
                    <h2 className="font-display text-[clamp(28px,2.8vw,46px)] font-bold uppercase leading-[1.1] tracking-[-0.02em] text-ink">
                      {data.headline}
                    </h2>
                  ) : (
                    <h2 className="font-display text-[clamp(36px,4vw,56px)] font-bold uppercase leading-none tracking-[-0.03em] text-ink">
                      {data.title}
                    </h2>
                  )}
                  <p className="mt-4 max-w-md text-[15px] leading-[1.55] text-ink">
                    {data.description}
                  </p>
                </>
              ) : (
                <>
                  {section.eyebrow ? (
                    <span className="mb-4 text-[11px] font-medium uppercase tracking-widest text-ink-muted">
                      {section.eyebrow}
                    </span>
                  ) : null}
                  <h2 className="font-display text-[clamp(28px,2.8vw,46px)] font-bold uppercase leading-[1.1] tracking-[-0.02em] text-ink">
                    {section.title}
                  </h2>
                  <div className="mt-5 space-y-3.5">
                    {paragraphs.map((para, j) => (
                      <p
                        key={j}
                        {...(reveal ? { "data-reveal-paragraph": "" } : {})}
                        className="text-[14px] leading-[1.55] text-ink/85"
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                  {section.aside ? (
                    <div className="mt-4">
                      <p className="text-[14px] leading-[1.55] text-ink/85">
                        {section.aside.label}
                      </p>
                      <ul className="mt-3 space-y-3 text-[14px] leading-[1.55] text-ink/85">
                        {section.aside.items.map((item, k) => (
                          <li key={k} className="flex gap-3">
                            <span className="shrink-0 text-ink-muted">—</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </>
              )}
            </div>
          );

          if (reveal) {
            return (
              <section
                key={section.id}
                ref={(el) => {
                  sectionRefs.current[i] = el;
                }}
                id={section.id}
                aria-label={section.chip}
                className="relative"
                style={{ height: `${paragraphs.length * 100}vh` }}
              >
                <div className="sticky top-0 flex h-screen items-start px-8 pb-12 pt-24 md:px-12 md:pt-20">
                  {textBlock}
                </div>
                {/* Snap markers — one per paragraph reveal step. */}
                {paragraphs.map((_, step) => (
                  <div
                    key={step}
                    aria-hidden
                    className="pointer-events-none absolute left-0 h-screen w-px snap-start snap-always"
                    style={{ top: `${step * 100}vh` }}
                  />
                ))}
              </section>
            );
          }

          return (
            <section
              key={section.id}
              ref={(el) => {
                sectionRefs.current[i] = el;
              }}
              id={section.id}
              aria-label={section.chip}
              className="flex min-h-screen snap-start snap-always flex-col justify-start px-8 pb-12 pt-24 md:px-12 md:pt-20"
            >
              {textBlock}
            </section>
          );
        })}
      </div>
    </main>
  );
}
