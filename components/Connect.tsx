"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const LINKS = [
  {
    key: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/nikita-protsenko/",
    rotation: -6,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 shrink-0" aria-hidden>
        <path
          d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75ZM9.5 9.75h3.84v1.55h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21h-4v-5.05c0-1.2-.02-2.75-1.78-2.75-1.78 0-2.05 1.3-2.05 2.66V21h-4V9.75Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    key: "telegram",
    label: "Telegram",
    href: "https://t.me/nikitaprotsenko",
    rotation: 6,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 shrink-0" aria-hidden>
        <path
          d="M21.5 3.5 2.8 10.8c-1 .4-1 1.2 0 1.5l4.6 1.5L18 5.9c.5-.4 1-.2.7.2l-8.6 7.8-.3 4.5c.4 0 .6-.2.8-.4l2-1.9 4.2 3.1c.8.4 1.3.2 1.5-.7l2.7-12.7c.3-1.1-.4-1.6-1.5-1.3Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

export default function Connect() {
  const trackRef = useRef<HTMLDivElement>(null);
  const phraseRef = useRef<HTMLSpanElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const phrase = phraseRef.current;
    if (!track || !phrase) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let tween: gsap.core.Tween | null = null;

    const start = () => {
      const w = phrase.offsetWidth;
      if (w === 0) return;
      tween?.kill();
      gsap.set(track, { x: 0 });
      tween = gsap.to(track, {
        x: -w,
        duration: w / 120,
        ease: "none",
        repeat: -1,
      });
    };

    start();

    const ro = new ResizeObserver(start);
    ro.observe(phrase);

    return () => {
      ro.disconnect();
      tween?.kill();
    };
  }, []);

  useEffect(() => {
    const group = iconsRef.current;
    if (!group) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tiles = group.querySelectorAll<HTMLElement>("[data-icon-tile]");
    tiles.forEach((tile) => {
      const baseRot = Number(tile.dataset.baseRot ?? 0);
      gsap.set(tile, { rotation: baseRot, y: 40, opacity: 0 });
    });

    const tweens = gsap.to(tiles, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "expo.out",
      stagger: 0.08,
      scrollTrigger: {
        trigger: group,
        start: "top 85%",
        once: true,
      },
    });

    return () => {
      if (Array.isArray(tweens)) tweens.forEach((t) => t.kill());
      else (tweens as gsap.core.Tween).kill();
    };
  }, []);

  const phrase = "LET’S WORK TOGETHER";
  const repeats = 6;

  return (
    <section className="relative overflow-hidden py-32 md:py-48">
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden />
      <div
        ref={iconsRef}
        className="relative z-10 flex items-center justify-center gap-3"
      >
        {LINKS.map((link) => (
          <a
            key={link.key}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            data-icon-tile
            data-base-rot={0}
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-4 font-[family-name:var(--font-neue-machina)] text-[clamp(20px,3vw,42px)] font-black uppercase tracking-[-0.03em] text-white/20 backdrop-blur-md transition-colors duration-300 hover:text-white/50 md:px-10 md:py-5"
          >
            {link.label}
          </a>
        ))}
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 overflow-hidden"
      >
        <div
          ref={trackRef}
          className="flex whitespace-nowrap font-[family-name:var(--font-neue-machina)] text-[clamp(80px,15vw,240px)] font-black uppercase leading-none tracking-[-0.04em] text-[#1D1D1D] will-change-transform"
        >
          {Array.from({ length: repeats }).map((_, i) => (
            <span
              key={i}
              ref={i === 0 ? phraseRef : undefined}
              className="px-8"
            >
              {phrase}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
