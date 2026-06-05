"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { CaseStudySection } from "@/lib/cases";
import { gsap, ScrollTrigger } from "@/lib/gsap";

function ProcessVisual() {
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const img = imgRef.current;
    if (!img) return;

    const section = document.querySelector<HTMLElement>('section[id="process"]');
    if (!section) return;

    gsap.set(img, { opacity: 0, y: 20 });

    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.4,
      },
    });

    // Fade in as paragraph 2 begins to reveal (~33% through the section).
    tl.to(img, { opacity: 1, y: 0, duration: 0.18 }, 0.33);
    // Hold through end so scroll range maps cleanly.
    tl.to({}, { duration: 0.1 }, 1);

    const trigger = tl.scrollTrigger;
    return () => {
      trigger?.kill();
    };
  }, []);

  return (
    <div className="relative flex h-full w-full items-center justify-center p-12">
      <div ref={imgRef} className="relative w-full max-w-[520px]">
        <Image
          src="/images/case-process/find-inspiration.png"
          alt="Reference Scout — finding UI inspiration via Mobbin"
          width={2133}
          height={2463}
          className="h-auto w-full"
          priority={false}
        />
      </div>
    </div>
  );
}

function ResearchVisual() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {/* Inner canvas matches the reference's portrait aspect so positions map 1:1 */}
      <div className="relative aspect-[4/5] h-[92%] max-h-[720px]">
        {/* Concentric "sonar" rings emanating from the call icon */}
        <div
          aria-hidden
          className="absolute left-1/2 top-[47%] aspect-square w-[52%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink/[0.06]"
        />
        <div
          aria-hidden
          className="absolute left-1/2 top-[47%] aspect-square w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink/[0.05]"
        />
        <div
          aria-hidden
          className="absolute left-1/2 top-[47%] aspect-square w-[132%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink/[0.04]"
        />

        {/* Central call icon */}
        <div className="absolute left-1/2 top-[47%] w-[14%] -translate-x-1/2 -translate-y-1/2">
          <Image
            src="/images/case-research/call.png"
            alt=""
            width={411}
            height={411}
            className="h-auto w-full"
          />
        </div>

        {/* 30+ nights — top-left, no rotation. Width tuned so visible card height
            matches the other chips (PNG is narrower than the rest). */}
        <div className="absolute left-[8%] top-[13%] w-[36%] drop-shadow-[0_18px_30px_rgba(0,0,0,0.08)]">
          <Image
            src="/images/case-research/insight-4.png"
            alt="30+ nights"
            width={927}
            height={369}
            className="h-auto w-full"
          />
        </div>

        {/* Upfront charges — middle-right, rotated clockwise, runs off the right edge */}
        <div className="absolute left-[56%] top-[26%] w-[45%] origin-left rotate-[18deg] drop-shadow-[0_18px_30px_rgba(0,0,0,0.08)]">
          <Image
            src="/images/case-research/insight-2.png"
            alt="Upfront charges"
            width={1167}
            height={369}
            className="h-auto w-full"
          />
        </div>

        {/* Anniversary billing — middle-left, rotated counter-clockwise, runs off the left edge */}
        <div className="absolute left-[-2%] top-[54%] w-[48%] origin-right -rotate-[8deg] drop-shadow-[0_18px_30px_rgba(0,0,0,0.08)]">
          <Image
            src="/images/case-research/insight-3.png"
            alt="Anniversary billing"
            width={1242}
            height={369}
            className="h-auto w-full"
          />
        </div>

        {/* Payment cycles — bottom-right, slight counter-clockwise tilt */}
        <div className="absolute left-[50%] top-[75%] w-[44%] -rotate-[5deg] drop-shadow-[0_18px_30px_rgba(0,0,0,0.08)]">
          <Image
            src="/images/case-research/insight-1.png"
            alt="Payment cycles"
            width={1137}
            height={369}
            className="h-auto w-full"
          />
        </div>
      </div>
    </div>
  );
}

function BackgroundVisual() {
  return (
    <div className="relative flex h-full w-full items-center justify-center px-8">
      <div className="relative w-full max-w-[460px]">
        {/* Sticker — sits on top, slightly tilted */}
        <div className="relative z-30 mx-auto -mb-4 w-[42%] -rotate-[8deg] drop-shadow-[0_10px_24px_rgba(0,0,0,0.12)]">
          <Image
            src="/images/case-background/sticker.png"
            alt="Current logic"
            width={621}
            height={336}
            className="h-auto w-full"
            priority={false}
          />
        </div>

        {/* Charge cards stacked below, each slightly rotated */}
        <div className="relative z-20 -mt-2 rotate-[2deg] drop-shadow-[0_18px_30px_rgba(0,0,0,0.08)]">
          <Image
            src="/images/case-background/charge-1.png"
            alt="Charge at booking confirmation"
            width={1670}
            height={424}
            className="h-auto w-full"
            priority={false}
          />
        </div>
        <div className="relative z-20 mt-4 -rotate-[3deg] drop-shadow-[0_18px_30px_rgba(0,0,0,0.08)]">
          <Image
            src="/images/case-background/charge-2.png"
            alt="Charge at check-in"
            width={1670}
            height={424}
            className="h-auto w-full"
            priority={false}
          />
        </div>
        <div className="relative z-10 mt-4 rotate-[3deg] drop-shadow-[0_18px_30px_rgba(0,0,0,0.08)]">
          <Image
            src="/images/case-background/charge-3.png"
            alt="Charge at check-out"
            width={1670}
            height={424}
            className="h-auto w-full"
            priority={false}
          />
        </div>
      </div>
    </div>
  );
}

export default function CasePlaceholder({
  section,
}: {
  section: CaseStudySection;
}) {
  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[40px] bg-[#F6F5F1]"
      aria-label={`${section.chip} visual`}
    >
      {section.id !== "research" && section.id !== "process" ? (
        <div aria-hidden className="case-grid pointer-events-none absolute inset-0" />
      ) : null}
      {section.id === "background" || section.id === "problem" ? (
        <div className="relative h-full w-full">
          <BackgroundVisual />
        </div>
      ) : section.id === "research" ? (
        <div className="relative h-full w-full">
          <ResearchVisual />
        </div>
      ) : section.id === "process" ? (
        <div className="relative h-full w-full">
          <ProcessVisual />
        </div>
      ) : (
        <span className="relative text-sm text-ink/40">Visual</span>
      )}
    </div>
  );
}
