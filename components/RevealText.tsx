"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import SplitType from "split-type";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  trigger?: "load" | "scroll";
  delay?: number;
  stagger?: number;
  duration?: number;
};

export default function RevealText({
  children,
  as: Tag = "div",
  className,
  trigger = "scroll",
  delay = 0,
  stagger = 0.08,
  duration = 1.1,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const split = new SplitType(el, {
      types: "lines",
      tagName: "span",
      lineClass: "reveal-line",
    });

    // Wrap each line's inner content in .line-inner for transform isolation
    const lines = (split.lines ?? []) as HTMLElement[];
    lines.forEach((line) => {
      const inner = document.createElement("span");
      inner.className = "line-inner";
      while (line.firstChild) inner.appendChild(line.firstChild);
      line.appendChild(inner);
    });

    const inners = el.querySelectorAll<HTMLElement>(".line-inner");
    gsap.set(inners, { yPercent: 115 });

    const tween = () =>
      gsap.to(inners, {
        yPercent: 0,
        duration,
        delay,
        stagger,
        ease: "expo.out",
      });

    let st: ScrollTrigger | undefined;
    if (trigger === "load") {
      tween();
    } else {
      st = ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => tween(),
      });
    }

    return () => {
      st?.kill();
      split.revert();
    };
  }, [trigger, delay, stagger, duration]);

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
