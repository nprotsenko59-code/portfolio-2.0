"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { CaseStudySection } from "@/lib/cases";
import { gsap, ScrollTrigger } from "@/lib/gsap";

function ProcessVisual() {
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const img1 = img1Ref.current;
    const img2 = img2Ref.current;
    if (!img1 || !img2) return;

    const section = document.querySelector<HTMLElement>('section[id="process"]');
    if (!section) return;

    gsap.set(img1, { opacity: 0, y: 20 });
    gsap.set(img2, { opacity: 0, y: 20 });

    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.4,
      },
    });

    // Image 1 (find-inspiration): fades in with paragraph 2 (~33%),
    // then fades out as paragraph 3 begins (~62%).
    tl.to(img1, { opacity: 1, y: 0, duration: 0.18 }, 0.33);
    tl.to(img1, { opacity: 0, y: -16, duration: 0.16 }, 0.62);

    // Image 2 (cursor-screenshot): fades in with paragraph 3 (~66%).
    tl.to(img2, { opacity: 1, y: 0, duration: 0.18 }, 0.66);

    tl.to({}, { duration: 0.1 }, 1);

    const trigger = tl.scrollTrigger;
    return () => {
      trigger?.kill();
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      <div ref={img1Ref} className="absolute inset-0 flex items-center justify-center p-10">
        <div className="relative h-full w-full max-w-[520px]">
          <Image
            src="/images/case-process/find-inspiration.png"
            alt="Reference Scout — finding UI inspiration via Mobbin"
            fill
            sizes="(min-width: 768px) 520px, 100vw"
            quality={90}
            className="object-contain"
            priority={false}
          />
        </div>
      </div>
      <div ref={img2Ref} className="absolute inset-0">
        <div className="absolute left-[8%] top-[10%] w-[140%]">
          <Image
            src="/images/case-process/cursor-screenshot.png"
            alt="Coded prototype in Cursor"
            width={5157}
            height={3240}
            sizes="(min-width: 768px) 140vw, 140vw"
            quality={90}
            className="h-auto w-full rounded-2xl shadow-[0_30px_60px_-20px_rgba(0,0,0,0.25)]"
            priority={false}
          />
        </div>
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
            sizes="(min-width: 768px) 100px, 14vw"
            quality={90}
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
            sizes="(min-width: 768px) 260px, 36vw"
            quality={90}
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
            sizes="(min-width: 768px) 320px, 45vw"
            quality={90}
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
            sizes="(min-width: 768px) 340px, 48vw"
            quality={90}
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
            sizes="(min-width: 768px) 310px, 44vw"
            quality={90}
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
            sizes="(min-width: 768px) 195px, 42vw"
            quality={90}
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
            sizes="(min-width: 768px) 460px, 100vw"
            quality={90}
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
            sizes="(min-width: 768px) 460px, 100vw"
            quality={90}
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
            sizes="(min-width: 768px) 460px, 100vw"
            quality={90}
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
