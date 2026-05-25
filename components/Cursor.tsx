"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const CURSOR_SIZE_DEFAULT = 8;
const CURSOR_SIZE_HOVER = 72;

export default function Cursor() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const dot = dotRef.current;
    const label = labelRef.current;
    if (!wrapper || !dot || !label) return;

    const hasHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!hasHover) { wrapper.style.display = "none"; return; }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      wrapper.style.display = "none";
      return;
    }

    gsap.set(dot, { width: CURSOR_SIZE_DEFAULT, height: CURSOR_SIZE_DEFAULT });
    gsap.set(label, { autoAlpha: 0 });

    // Track mouse — x/y on the wrapper (which starts at top-left 0,0)
    const xTo = gsap.quickTo(wrapper, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(wrapper, "y", { duration: 0.45, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onOver = (e: PointerEvent) => {
      const target = (e.target as Element | null)?.closest?.("[data-cursor]");
      if (!target) return;

      const cursorLabel = target.getAttribute("data-cursor-label");
      gsap.to(dot, { width: CURSOR_SIZE_HOVER, height: CURSOR_SIZE_HOVER, duration: 0.5, ease: "expo.out" });
      if (cursorLabel) {
        label.textContent = cursorLabel;
        gsap.to(label, { autoAlpha: 1, duration: 0.2, delay: 0.1 });
      }
    };

    const onOut = (e: PointerEvent) => {
      const target = (e.target as Element | null)?.closest?.("[data-cursor]");
      const related = (e.relatedTarget as Element | null)?.closest?.("[data-cursor]");
      if (target && target !== related) {
        gsap.to(dot, { width: CURSOR_SIZE_DEFAULT, height: CURSOR_SIZE_DEFAULT, duration: 0.4, ease: "expo.out" });
        gsap.to(label, { autoAlpha: 0, duration: 0.15 });
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver);
    window.addEventListener("pointerout", onOut);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerout", onOut);
    };
  }, []);

  return (
    /* Wrapper tracks mouse position (GSAP animates x/y here) */
    <div
      ref={wrapperRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100]"
    >
      {/* Dot: centered on wrapper via CSS transform (GSAP won't touch this transform) */}
      <div
        ref={dotRef}
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference flex items-center justify-center overflow-hidden"
      >
        <span
          ref={labelRef}
          className="select-none text-[11px] font-medium uppercase tracking-[0.15em] text-black whitespace-nowrap"
        >
          View
        </span>
      </div>
    </div>
  );
}
