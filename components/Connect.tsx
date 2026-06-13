"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const ICONS = [
  {
    key: "telegram",
    rotation: -10,
    node: (
      <svg viewBox="0 0 24 24" fill="none" className="h-1/2 w-1/2" aria-hidden>
        <path
          d="M21.5 3.5 2.8 10.8c-1 .4-1 1.2 0 1.5l4.6 1.5L18 5.9c.5-.4 1-.2.7.2l-8.6 7.8-.3 4.5c.4 0 .6-.2.8-.4l2-1.9 4.2 3.1c.8.4 1.3.2 1.5-.7l2.7-12.7c.3-1.1-.4-1.6-1.5-1.3Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    key: "placeholder",
    rotation: -3,
    node: (
      <svg viewBox="0 0 24 24" fill="none" className="h-1/2 w-1/2" aria-hidden>
        <circle cx="12" cy="12" r="1.2" fill="currentColor" />
        <circle cx="6" cy="12" r="1.2" fill="currentColor" />
        <circle cx="18" cy="12" r="1.2" fill="currentColor" />
      </svg>
    ),
  },
  {
    key: "linkedin",
    rotation: 5,
    node: (
      <svg viewBox="0 0 24 24" fill="none" className="h-1/2 w-1/2" aria-hidden>
        <path
          d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75ZM9.5 9.75h3.84v1.55h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21h-4v-5.05c0-1.2-.02-2.75-1.78-2.75-1.78 0-2.05 1.3-2.05 2.66V21h-4V9.75Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    key: "email",
    rotation: 12,
    node: (
      <svg viewBox="0 0 24 24" fill="none" className="h-1/2 w-1/2" aria-hidden>
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
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
    <section className="relative overflow-hidden py-16 md:py-24">
      <div
        ref={iconsRef}
        className="relative z-10 flex items-center justify-center"
      >
        {ICONS.map((icon, i) => (
          <div
            key={icon.key}
            data-icon-tile
            data-base-rot={icon.rotation}
            style={{
              transform: `rotate(${icon.rotation}deg)`,
              marginLeft: i === 0 ? 0 : "-1.25rem",
            }}
            className="flex h-20 w-20 items-center justify-center rounded-[22px] border border-white/10 bg-[#1F1F1F] text-white shadow-[0_2px_0_rgba(0,0,0,0.3)] md:h-28 md:w-28"
          >
            {icon.node}
          </div>
        ))}
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 overflow-hidden"
      >
        <div
          ref={trackRef}
          className="flex whitespace-nowrap font-[family-name:var(--font-neue-machina)] text-[clamp(80px,15vw,240px)] font-black uppercase leading-none tracking-[-0.04em] text-white/[0.06] will-change-transform"
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
