"use client";

import { useEffect, useRef } from "react";
import RevealText from "./RevealText";
import CaseCard from "./CaseCard";
import { cases } from "@/lib/cases";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function Work() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = grid.querySelectorAll<HTMLElement>("[data-case-card]");
    gsap.set(cards, { y: 60, opacity: 0 });
    const st = ScrollTrigger.create({
      trigger: grid,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(cards, {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.12,
        });
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <section className="px-8 pb-16 md:px-12">
      <div className="rounded-3xl border border-black/10 p-6 md:p-8">
        <RevealText
          as="h2"
          trigger="scroll"
          stagger={0.05}
          className="mb-6 text-base font-bold uppercase tracking-tight md:text-lg"
        >
          My Work
        </RevealText>
        <div
          ref={gridRef}
          className="grid grid-cols-2 gap-4"
          style={{ gridTemplateRows: "minmax(220px, 1fr) minmax(220px, 1fr) minmax(220px, 1fr)" }}
        >
          {cases.map((c, i) => (
            <CaseCard key={c.slug} data={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
