"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import HoverText from "./HoverText";
import { gsap } from "@/lib/gsap";

export default function Hero() {
  const metaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!metaRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(
      metaRef.current.querySelectorAll("[data-meta-item]"),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "expo.out", delay: 0.2, stagger: 0.1 }
    );
  }, []);

  return (
    <section className="relative flex min-h-screen flex-col justify-between px-8 pt-10 pb-8 md:px-12 md:pt-12 md:pb-10">
      {/* Center block: portrait + headline + subtitle, vertically + horizontally centered */}
      <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
        <div className="flex items-center gap-4 md:gap-6">
          <Image
            src="/images/nikita.jpg"
            alt="Portrait of Nikita Protsenko"
            width={400}
            height={400}
            priority
            className="aspect-square h-[clamp(48px,9vw,145px)] w-auto rounded-[14px] object-cover"
          />
          <h1
            className="hero-headline font-[family-name:var(--font-switzer)] text-[clamp(56px,12vw,200px)] font-black uppercase leading-[0.95] tracking-[-0.04em]"
          >
            Hi, I&rsquo;m Nikita
          </h1>
        </div>
        <p className="max-w-[640px] text-[15px] leading-[1.45] text-neutral-800 md:text-base">
          I build unique and friendly product experiences for startups, corporations and myself.
        </p>
      </div>

      {/* Bottom meta row */}
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
