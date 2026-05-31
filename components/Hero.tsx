"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import HoverText from "./HoverText";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const WORDS = [
  "experiences",
  "products",
  "journeys",
  "interactions",
  "systems",
  "moments",
];

const TYPE_MS = 120;
const DELETE_MS = 70;
const HOLD_MS = 2200;
const NEXT_MS = 520;
const EASE_AMPLITUDE = 0.85;

// U-shaped easing: slower at the start and end of a word, faster in the middle.
const easedDelay = (base: number, step: number, total: number) => {
  if (total <= 1) return base;
  const p = step / total;
  const curve = 1 - 4 * p * (1 - p);
  return base * (1 + EASE_AMPLITUDE * curve);
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const composeRef = useRef<HTMLDivElement>(null);
  const headlineScrollRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const chipRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const workCardsRef = useRef<HTMLDivElement>(null);

  const [typed, setTyped] = useState(WORDS[0]);
  const [typingStarted, setTypingStarted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const compose = composeRef.current;
    const headlineScroll = headlineScrollRef.current;
    const headline = headlineRef.current;
    const chip = chipRef.current;
    const meta = metaRef.current;
    if (!section || !compose || !headlineScroll || !headline || !chip || !meta) {
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

    let scrollTrigger: ScrollTrigger | undefined;
    const cleanup: Array<() => void> = [];
    let cancelled = false;

    const run = async () => {
      if (document.fonts?.ready) {
        await document.fonts.ready;
      }
      if (cancelled) return;

      const metaItems = meta.querySelectorAll<HTMLElement>("[data-meta-item]");

      if (reduced) {
        setTypingStarted(true);
        return;
      }

      gsap.set(headline, { y: 40, opacity: 0 });
      gsap.set(chip, { y: -20, opacity: 0, scale: 0.85 });
      gsap.set(metaItems, { y: 24, opacity: 0 });
      gsap.set(headlineScroll, { perspective: 1000 });

      const tl = gsap.timeline({
        onComplete: () => {
          if (cancelled) return;
          setTypingStarted(true);
          const scrubTl = gsap
            .timeline()
            .to(headline, { scale: 1.18, opacity: 0, ease: "none" }, 0)
            .to(chip, { y: -60, opacity: 0, ease: "none" }, 0)
            .to(metaItems, { opacity: 0, y: -20, ease: "none", duration: 0.3 }, 0);

          scrollTrigger = ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
            animation: scrubTl,
          });
        },
      });
      tl.to(headline, { y: 0, opacity: 1, duration: 1.1, ease: "expo.out" }, 0);
      tl.to(
        chip,
        { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: "expo.out" },
        0.25,
      );
      tl.to(
        metaItems,
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "expo.out" },
        0.5,
      );

      if (!coarsePointer) {
        const workCards = workCardsRef.current;

        const setHeadRotY = gsap.quickTo(headline, "rotationY", { duration: 0.6, ease: "power3.out" });
        const setHeadRotX = gsap.quickTo(headline, "rotationX", { duration: 0.6, ease: "power3.out" });
        const setHeadX = gsap.quickTo(headline, "x", { duration: 0.7, ease: "power3.out" });
        const setHeadY = gsap.quickTo(headline, "y", { duration: 0.7, ease: "power3.out" });
        const setChipX = gsap.quickTo(chip, "x", { duration: 0.6, ease: "power3.out" });
        const setChipY = gsap.quickTo(chip, "y", { duration: 0.6, ease: "power3.out" });
        const setWorkX = workCards
          ? gsap.quickTo(workCards, "x", { duration: 0.7, ease: "power3.out" })
          : null;
        const setWorkY = workCards
          ? gsap.quickTo(workCards, "y", { duration: 0.7, ease: "power3.out" })
          : null;

        const onMove = (e: MouseEvent) => {
          const rect = section.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const nx = Math.max(-1, Math.min(1, (e.clientX - cx) / (rect.width / 2)));
          const ny = Math.max(-1, Math.min(1, (e.clientY - cy) / (rect.height / 2)));
          setHeadRotY(nx * 3);
          setHeadRotX(-ny * 3);
          setHeadX(nx * 10);
          setHeadY(ny * 6);
          setChipX(nx * 22);
          setChipY(ny * 14);
          setWorkX?.(nx * 16);
          setWorkY?.(ny * 10);
        };
        const onLeave = () => {
          setHeadRotY(0);
          setHeadRotX(0);
          setHeadX(0);
          setHeadY(0);
          setChipX(0);
          setChipY(0);
          setWorkX?.(0);
          setWorkY?.(0);
        };

        section.addEventListener("mousemove", onMove);
        section.addEventListener("mouseleave", onLeave);
        cleanup.push(() => {
          section.removeEventListener("mousemove", onMove);
          section.removeEventListener("mouseleave", onLeave);
        });
      }
    };

    run();

    return () => {
      cancelled = true;
      scrollTrigger?.kill();
      cleanup.forEach((fn) => fn());
    };
  }, []);

  useEffect(() => {
    if (!typingStarted) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let wordIndex = 0;
    let chars = WORDS[0].length;
    let deleting = true;
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      const word = WORDS[wordIndex];
      if (deleting) {
        chars -= 1;
        setTyped(word.slice(0, chars));
        if (chars === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % WORDS.length;
          timeout = setTimeout(tick, NEXT_MS);
          return;
        }
        timeout = setTimeout(tick, easedDelay(DELETE_MS, chars, word.length));
      } else {
        chars += 1;
        setTyped(word.slice(0, chars));
        if (chars === word.length) {
          deleting = true;
          timeout = setTimeout(tick, HOLD_MS);
          return;
        }
        timeout = setTimeout(tick, easedDelay(TYPE_MS, chars, word.length));
      }
    };

    timeout = setTimeout(tick, HOLD_MS);
    return () => clearTimeout(timeout);
  }, [typingStarted]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col justify-between px-8 pt-10 pb-8 md:px-12 md:pt-12 md:pb-10"
    >
      <div aria-hidden className="hero-grid pointer-events-none absolute inset-0 z-0" />
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center">
        <div ref={composeRef} className="relative w-full">
          <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-[120%]">
            <div
              ref={chipRef}
              className="flex items-center gap-2.5 rounded-full border border-card-border bg-neutral-200/90 px-3 py-2 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.25)] backdrop-blur-sm md:gap-3.5 md:py-3"
              style={{ willChange: "transform" }}
            >
              <span className="relative aspect-square h-9 overflow-hidden rounded-full md:h-12">
                <Image
                  src="/images/nikita.jpg"
                  alt="Portrait of Nikita Protsenko"
                  width={96}
                  height={96}
                  priority
                  className="h-full w-full object-cover"
                />
              </span>
              <span className="whitespace-nowrap font-[family-name:var(--font-satoshi)] text-[20px] font-bold leading-[0.9] text-ink">
                Hi, I&rsquo;m Nikita
              </span>
            </div>
          </div>

          <div ref={headlineScrollRef} className="will-change-transform">
            <h1
              ref={headlineRef}
              className="hero-headline text-center font-[family-name:var(--font-switzer)] text-[clamp(36px,8.2vw,148px)] font-black uppercase leading-[0.95] tracking-[-0.04em]"
            >
              <span className="block">I craft</span>
              <span className="block text-accent">
                {typed}
                <span aria-hidden className="hero-caret" />
              </span>
            </h1>
          </div>
        </div>
      </div>

      <div
        ref={metaRef}
        className="relative z-10 grid grid-cols-3 items-end gap-8 pt-16 text-[13px] md:text-sm"
      >
        <div data-meta-item className="flex flex-col gap-1 text-left">
          <span className="text-ink-muted">Currently at</span>
          <HoverText className="font-medium">Guesty</HoverText>
        </div>
        <div data-meta-item className="flex flex-col items-center gap-4">
          <div
            ref={workCardsRef}
            className="flex items-end justify-center"
            style={{ willChange: "transform" }}
            aria-hidden
          >
            <div className="z-30 h-14 w-10 -mr-2.5 -rotate-[14deg] rounded-lg border-2 border-white bg-neutral-300/80 shadow-[0_6px_16px_-10px_rgba(0,0,0,0.3)] md:h-16 md:w-12" />
            <div className="z-20 h-14 w-10 rounded-lg border-2 border-white bg-neutral-300/80 shadow-[0_6px_16px_-10px_rgba(0,0,0,0.3)] md:h-16 md:w-12" />
            <div className="z-10 h-14 w-10 -ml-2.5 rotate-[14deg] rounded-lg border-2 border-white bg-neutral-300/80 shadow-[0_6px_16px_-10px_rgba(0,0,0,0.3)] md:h-16 md:w-12" />
          </div>
          <HoverText className="font-medium">See my work</HoverText>
        </div>
        <div data-meta-item className="flex flex-col gap-1 text-right">
          <span className="text-ink-muted">Based in</span>
          <HoverText className="font-medium">Tel Aviv</HoverText>
        </div>
      </div>
    </section>
  );
}
