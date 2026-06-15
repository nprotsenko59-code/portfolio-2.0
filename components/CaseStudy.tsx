"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Case } from "@/lib/cases";
import CaseStudyNav from "./CaseStudyNav";
import CasePlaceholder from "./CasePlaceholder";
import { gsap } from "@/lib/gsap";

export default function CaseStudy({ data }: { data: Case }) {
  const sections = data.study?.sections ?? [];
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);
  const rootRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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
    <main ref={rootRef} className="relative">
      <CaseStudyNav sections={sections} activeIndex={activeIndex} onJump={handleJump} />

      <article className="w-full px-6 pb-40 pt-7 lg:pl-[260px] lg:pr-5">
        {sections.map((section, i) => (
          <section
            key={section.id}
            ref={(el) => {
              sectionRefs.current[i] = el;
            }}
            id={section.id}
            aria-label={section.chip}
            className={i === 0 ? "scroll-mt-32" : "scroll-mt-32 mt-20 border-t border-ink/15 pt-20"}
          >
            {i === 0 ? (
              <div className="max-w-[760px]">
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
                {data.headline ? (
                  <h2 className="font-display text-[36px] font-bold uppercase leading-[1.1] tracking-[-0.02em] text-ink">
                    {data.headline}
                  </h2>
                ) : (
                  <h2 className="font-display text-[36px] font-bold uppercase leading-[1.1] tracking-[-0.03em] text-ink">
                    {data.title}
                  </h2>
                )}
                <p className="mt-8 text-[18px] leading-[1.55] text-ink/85">
                  {data.description}
                </p>
              </div>
            ) : (
              <div className="space-y-14">
                {section.blocks.map((block, b) => (
                  <div key={b}>
                    {block.layout === "split" ? (
                      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[320px_1fr] lg:gap-20">
                        <div>
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
                          <figure className="relative aspect-[16/9] w-full overflow-hidden rounded-[20px] bg-[#0F1410]">
                            <Image
                              src={block.visual.src}
                              alt={block.visual.alt}
                              width={block.visual.width}
                              height={block.visual.height}
                              sizes="(min-width: 1024px) 800px, 100vw"
                              quality={75}
                              className="absolute inset-0 h-full w-full object-cover"
                            />
                          </figure>
                        ) : (
                          <div
                            aria-hidden
                            className="aspect-[16/9] w-full rounded-[20px] border border-dashed border-ink/25 bg-ink/[0.03]"
                          />
                        )}
                      </div>
                    ) : (
                      <>
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr] lg:gap-20">
                          <div>
                            {b === 0 ? (
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
                            ) : null}
                          </div>
                          <div className="max-w-[680px]">
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
                        </div>
                        {block.visual ? (
                          <figure
                            className="relative mt-10 w-full overflow-hidden rounded-[20px] bg-[#0F1410]"
                            style={{ aspectRatio: block.visual.aspectRatio ?? "21 / 9" }}
                          >
                            <Image
                              src={block.visual.src}
                              alt={block.visual.alt}
                              width={block.visual.width}
                              height={block.visual.height}
                              sizes="(min-width: 1024px) 1200px, 100vw"
                              quality={75}
                              className="absolute inset-0 h-full w-full object-cover"
                            />
                          </figure>
                        ) : null}
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}

            {i === 0 ? (
              <div className="mt-16">
                <CasePlaceholder section={section} />
              </div>
            ) : null}

            {i === 0 ? (
              <div className="mt-20 space-y-14">
                {section.blocks.slice(0, 2).map((block, b) => (
                  <div key={b}>
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr] lg:gap-20">
                      <div>
                        {block.heading ? (
                          <h3 className="font-display text-[20px] font-semibold uppercase tracking-[0.02em] text-ink">
                            {block.heading}
                          </h3>
                        ) : null}
                      </div>
                      <div className="max-w-[680px]">
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
                    </div>
                    {block.visual ? (
                      <figure className="relative mt-10 aspect-[21/9] w-full overflow-hidden rounded-[20px] bg-[#0F1410]">
                        <Image
                          src={block.visual.src}
                          alt={block.visual.alt}
                          width={block.visual.width}
                          height={block.visual.height}
                          sizes="(min-width: 1024px) 1200px, 100vw"
                          quality={75}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      </figure>
                    ) : null}
                  </div>
                ))}

                {section.blocks.length > 2 ? (
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr] lg:gap-20">
                    <div />
                    <div className="grid max-w-[680px] grid-cols-1 gap-10 sm:grid-cols-2">
                      {section.blocks.slice(2).map((block, b) => (
                        <div key={b}>
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
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}

          </section>
        ))}
      </article>
    </main>
  );
}
