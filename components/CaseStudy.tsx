"use client";

import { useEffect, useRef, useState } from "react";
import type { Case } from "@/lib/cases";
import CaseStudyNav from "./CaseStudyNav";
import CasePlaceholder from "./CasePlaceholder";

export default function CaseStudy({ data }: { data: Case }) {
  const sections = data.study?.sections ?? [];
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const els = sectionRefs.current.filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          if (entry.intersectionRatio < 0.55) return;
          const idx = els.indexOf(entry.target as HTMLElement);
          if (idx >= 0) setActiveIndex(idx);
        });
      },
      { threshold: [0.55, 0.7, 0.85, 1] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections.length]);

  if (!sections.length) {
    return (
      <div className="flex h-screen items-center justify-center text-ink-muted">
        No case study content yet.
      </div>
    );
  }

  return (
    <main className="relative">
      <CaseStudyNav sections={sections} activeIndex={activeIndex} />
      <div className="relative">
        {sections.map((section, i) => (
          <div
            key={section.id}
            className="sticky top-0 h-screen"
            style={{ zIndex: i + 1 }}
          >
            <section
              ref={(el) => {
                sectionRefs.current[i] = el;
              }}
              id={section.id}
              aria-label={section.chip}
              className="grid h-screen w-full grid-cols-1 bg-white md:grid-cols-[40%_60%]"
            >
              <div className="flex flex-col justify-start px-8 pb-8 pt-24 md:px-12 md:pt-20">
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
                      {section.body.split("\n\n").map((para, j) => (
                        <p key={j} className="text-[14px] leading-[1.55] text-ink/85">
                          {para}
                        </p>
                      ))}
                    </div>
                    {section.aside ? (
                      <div className="mt-6 border-t border-ink/10 pt-4">
                        <p className="mb-3 text-[11px] font-medium uppercase tracking-widest text-ink-muted">
                          {section.aside.label}
                        </p>
                        <ul className="space-y-1.5 text-[13px] leading-[1.5] text-ink">
                          {section.aside.items.map((item, k) => (
                            <li key={k} className="flex gap-2">
                              <span className="text-ink-muted">—</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </>
                )}
              </div>

              <div className="relative p-5 pl-0">
                <CasePlaceholder section={section} />
              </div>
            </section>
          </div>
        ))}
      </div>
    </main>
  );
}
