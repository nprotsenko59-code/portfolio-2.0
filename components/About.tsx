"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

/**
 * Placeholder portrait. Swap with the real B&W arms-crossed portrait when
 * supplied (drop it in /public/images and update this path).
 */
const PORTRAIT_SRC = "/images/nikita-hero.png";

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
      className="px-8 pt-16 pb-20 md:px-12"
    >
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[clamp(200px,18vw,300px)_minmax(0,1fr)] md:gap-16">
        <div
          data-about-reveal
          className="relative aspect-square w-40 self-start overflow-hidden rounded-full bg-white/5 md:w-full"
        >
          <Image
            src={PORTRAIT_SRC}
            alt="Portrait of Nikita"
            fill
            sizes="(min-width: 768px) 300px, 160px"
            className="select-none object-cover object-top"
            priority={false}
          />
        </div>

        <div
          data-about-reveal
          className="font-sans text-[clamp(22px,2.6vw,40px)] font-medium leading-[1.32] tracking-[-0.01em] text-white/90"
        >
          <p>
            I began my design journey in agencies, working across a wide
            range of domains — from health tech and sports streaming apps to
            complex fintech products. Today, I lead the design of financial
            products at Guesty, where I focus on simplifying payments,
            billing, and other complex SaaS workflows.
          </p>
          <p className="mt-[1.2em]">
            In my free time I enjoy playing guitar, doing sports and
            travelling.
          </p>
        </div>
      </div>
    </section>
  );
}
