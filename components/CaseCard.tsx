"use client";

import { useEffect, useRef } from "react";
import clsx from "clsx";
import { gsap } from "@/lib/gsap";
import type { Case } from "@/lib/cases";

const spanClasses: Record<Case["span"], string> = {
  "tall-left": "col-start-1 row-start-1 row-span-2",
  "wide-top": "col-start-2 row-start-1",
  "tall-right": "col-start-2 row-start-2 row-span-2",
  "small-bottom": "col-start-1 row-start-3",
  "wide-bottom": "col-span-2 row-start-3",
};

export default function CaseCard({ data, index }: { data: Case; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const inner = innerRef.current;
    if (!card || !inner) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onEnter = () => {
      gsap.to(card, { scale: 1.012, duration: 0.6, ease: "expo.out" });
      gsap.to(inner, { scale: 1.05, duration: 0.8, ease: "expo.out" });
    };
    const onLeave = () => {
      gsap.to(card, { scale: 1, duration: 0.6, ease: "expo.out" });
      gsap.to(inner, { scale: 1, duration: 0.8, ease: "expo.out" });
    };
    card.addEventListener("pointerenter", onEnter);
    card.addEventListener("pointerleave", onLeave);
    return () => {
      card.removeEventListener("pointerenter", onEnter);
      card.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      data-cursor
      data-cursor-label="View"
      data-case-card
      style={{ transformOrigin: "center" }}
      className={clsx(
        "relative overflow-hidden rounded-2xl bg-neutral-200/80",
        "will-change-transform",
        spanClasses[data.span]
      )}
      aria-label={data.title}
    >
      <div
        ref={innerRef}
        className="absolute inset-0 will-change-transform"
        style={{
          background:
            "linear-gradient(135deg, rgb(228 228 231) 0%, rgb(212 212 216) 100%)",
        }}
      />
      <span className="sr-only">{data.title} (placeholder — case {index + 1})</span>
    </div>
  );
}
