"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import SplitType from "split-type";
import HoverText from "./HoverText";
import RevealText from "./RevealText";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const composeRef = useRef<HTMLDivElement>(null);
  const portraitScrollRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const headlineScrollRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const compose = composeRef.current;
    const portraitScroll = portraitScrollRef.current;
    const portrait = portraitRef.current;
    const headlineScroll = headlineScrollRef.current;
    const headline = headlineRef.current;
    const meta = metaRef.current;
    if (!section || !compose || !portraitScroll || !portrait || !headlineScroll || !headline || !meta) {
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

    let split: SplitType | undefined;
    let scrollTrigger: ScrollTrigger | undefined;
    const cleanup: Array<() => void> = [];
    let cancelled = false;

    const run = async () => {
      if (document.fonts?.ready) {
        await document.fonts.ready;
      }
      if (cancelled) return;

      split = new SplitType(headline, { types: "words,chars", tagName: "span" });
      const chars = (split.chars ?? []) as HTMLElement[];
      chars.forEach((c) => {
        const wrap = document.createElement("span");
        wrap.className = "char-mask";
        c.parentNode?.insertBefore(wrap, c);
        wrap.appendChild(c);
      });

      const metaItems = meta.querySelectorAll<HTMLElement>("[data-meta-item]");

      if (reduced) return;

      gsap.set(chars, { yPercent: 115 });
      gsap.set(portrait, {
        clipPath: "inset(0 0 100% 0)",
        scale: 1.15,
        transformOrigin: "center",
      });
      gsap.set(metaItems, { y: 30, opacity: 0 });
      gsap.set(headlineScroll, { perspective: 1000 });

      const tl = gsap.timeline({
        onComplete: () => {
          if (cancelled) return;
          const scrubTl = gsap
            .timeline()
            .to(headline, { scale: 1.25, opacity: 0, ease: "none" }, 0)
            .to(portraitScroll, { scale: 1.4, y: 40, ease: "none" }, 0)
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
      tl.to(
        portrait,
        { clipPath: "inset(0 0 0% 0)", scale: 1, duration: 1.1, ease: "expo.out" },
        0,
      );
      tl.to(
        chars,
        { yPercent: 0, duration: 1.0, stagger: 0.03, ease: "expo.out" },
        0.05,
      );
      tl.to(
        metaItems,
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "expo.out" },
        0.6,
      );

      if (!coarsePointer) {
        const setHeadRotY = gsap.quickTo(headline, "rotationY", { duration: 0.6, ease: "power3.out" });
        const setHeadRotX = gsap.quickTo(headline, "rotationX", { duration: 0.6, ease: "power3.out" });
        const setPortX = gsap.quickTo(portrait, "x", { duration: 0.6, ease: "power3.out" });
        const setPortY = gsap.quickTo(portrait, "y", { duration: 0.6, ease: "power3.out" });

        const onMove = (e: MouseEvent) => {
          const rect = compose.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const nx = Math.max(-1, Math.min(1, (e.clientX - cx) / (rect.width / 2)));
          const ny = Math.max(-1, Math.min(1, (e.clientY - cy) / (rect.height / 2)));
          setHeadRotY(nx * 3);
          setHeadRotX(-ny * 3);
          setPortX(nx * 10);
          setPortY(ny * 10);
        };
        const onLeave = () => {
          setHeadRotY(0);
          setHeadRotX(0);
          setPortX(0);
          setPortY(0);
        };

        compose.addEventListener("mousemove", onMove);
        compose.addEventListener("mouseleave", onLeave);
        cleanup.push(() => {
          compose.removeEventListener("mousemove", onMove);
          compose.removeEventListener("mouseleave", onLeave);
        });
      }
    };

    run();

    return () => {
      cancelled = true;
      scrollTrigger?.kill();
      split?.revert();
      cleanup.forEach((fn) => fn());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col justify-between px-8 pt-10 pb-8 md:px-12 md:pt-12 md:pb-10"
    >
      <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
        <div ref={composeRef} className="flex items-center gap-4 md:gap-6">
          <div
            ref={portraitScrollRef}
            className="aspect-square h-[clamp(48px,9vw,145px)] will-change-transform"
          >
            <div
              ref={portraitRef}
              className="h-full w-full overflow-hidden rounded-[14px] will-change-transform"
            >
              <Image
                src="/images/nikita.jpg"
                alt="Portrait of Nikita Protsenko"
                width={400}
                height={400}
                priority
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div ref={headlineScrollRef} className="will-change-transform">
            <h1
              ref={headlineRef}
              className="hero-headline font-[family-name:var(--font-switzer)] text-[clamp(56px,12vw,200px)] font-black uppercase leading-[0.95] tracking-[-0.04em]"
            >
              Hi, I&rsquo;m Nikita
            </h1>
          </div>
        </div>
        <RevealText
          as="p"
          trigger="load"
          delay={0.4}
          className="max-w-[640px] text-[15px] leading-[1.45] text-neutral-800 md:text-base"
        >
          I build unique and friendly product experiences for startups, corporations and myself.
        </RevealText>
      </div>

      <div
        ref={metaRef}
        className="grid grid-cols-3 items-end gap-8 pt-16 text-[13px] md:text-sm"
      >
        <div data-meta-item className="flex flex-col gap-1 text-left">
          <span className="text-neutral-400">Scroll to see</span>
          <HoverText className="font-medium">My work</HoverText>
        </div>
        <div data-meta-item className="flex flex-col gap-1 text-center">
          <span className="text-neutral-400">Currently at</span>
          <HoverText className="font-medium">Guesty</HoverText>
        </div>
        <div data-meta-item className="flex flex-col gap-1 text-right">
          <span className="text-neutral-400">Based in</span>
          <HoverText className="font-medium">Tel Aviv</HoverText>
        </div>
      </div>
    </section>
  );
}
