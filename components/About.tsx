"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

/**
 * Placeholder portrait. Swap with the real B&W arms-crossed portrait when
 * supplied (drop it in /public/images and update this path).
 */
const PORTRAIT_SRC = "/images/nikita-hero.png";

/** Inline image chip placeholder. Emoji stand-in until real asset chips exist. */
function Chip({ emoji, label }: { emoji: string; label: string }) {
  return (
    <span
      role="img"
      aria-label={label}
      className="mx-[0.15em] inline-flex h-[1em] w-[1.45em] translate-y-[0.12em] items-center justify-center rounded-[0.22em] bg-white/10 text-[0.78em] leading-none"
    >
      {emoji}
    </span>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = section.querySelectorAll<HTMLElement>("[data-about-reveal]");
    gsap.set(items, { y: 40, opacity: 0 });

    const tween = gsap.to(items, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "expo.out",
      stagger: 0.12,
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        once: true,
      },
    });

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="About me"
      className="px-8 py-28 md:px-12 md:py-40"
    >
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[clamp(200px,18vw,300px)_minmax(0,1fr)] md:gap-16">
        <div
          data-about-reveal
          className="relative aspect-[3/4] w-40 overflow-hidden bg-white/5 md:w-full"
        >
          <Image
            src={PORTRAIT_SRC}
            alt="Portrait of Nikita"
            fill
            sizes="(min-width: 768px) 300px, 160px"
            className="select-none object-cover object-top grayscale"
            priority={false}
          />
        </div>

        <div
          data-about-reveal
          className="font-sans text-[clamp(22px,2.6vw,40px)] font-medium leading-[1.32] tracking-[-0.01em] text-white/90"
        >
          <p>
            I’ve been designing things since my teenage years and by the age of
            16 I was already working at Yandex, launching products that served
            millions of people. As a designer, I aim to deliver the most elegant
            solution which I believe should be visually refined in its details
            while having the simplest concept at its core.
          </p>
          <p className="mt-[1.2em]">
            In my free time I enjoy playing with 3D
            <Chip emoji="🥦" label="broccoli" /> and graphics. It even led to my
            commission for Wes Anderson’s the French Dispatch
            <Chip emoji="🧈" label="butter" /> I also run a nice office bar where
            our team gathers up after busy work days
            <Chip emoji="🍷" label="wine" />
          </p>
        </div>
      </div>
    </section>
  );
}
