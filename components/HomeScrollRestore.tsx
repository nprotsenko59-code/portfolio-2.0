"use client";

import { useEffect } from "react";

const STORAGE_KEY = "home:returnScroll";

export default function HomeScrollRestore() {
  useEffect(() => {
    let y: number | null = null;
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved != null) {
        const parsed = Number.parseInt(saved, 10);
        if (Number.isFinite(parsed)) y = parsed;
        sessionStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      /* sessionStorage may be unavailable */
    }
    if (y == null) return;

    // Lenis initializes on this page; setting scroll natively a few times
    // across frames ensures Lenis's virtual scroll picks up the target.
    const target = y;
    const apply = () => window.scrollTo({ top: target, behavior: "auto" });
    apply();
    const raf1 = requestAnimationFrame(() => {
      apply();
      const raf2 = requestAnimationFrame(apply);
      return () => cancelAnimationFrame(raf2);
    });
    const t = window.setTimeout(apply, 80);
    return () => {
      cancelAnimationFrame(raf1);
      window.clearTimeout(t);
    };
  }, []);

  return null;
}
