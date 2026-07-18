"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

const EMAIL = "nprotsenko59@gmail.com";

function LinkedInIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-[38%] w-[38%] fill-current"
    >
      <path d="M5.2 3.6A2.2 2.2 0 1 1 5.2 8a2.2 2.2 0 0 1 0-4.4ZM3.3 9.6h3.8V21H3.3V9.6Zm6.1 0H13v1.6h.1c.5-.9 1.7-2 3.5-2 3.8 0 4.5 2.5 4.5 5.7V21h-3.8v-5.4c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21H9.4V9.6Z" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-[42%] w-[42%] fill-current"
    >
      <path d="M21.6 3.2 18.4 19c-.2 1.1-.9 1.4-1.8.9l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.4-5 9.1-8.2c.4-.4-.1-.6-.6-.2L6 12.8 1.2 11.3C.2 11-.1 10.3 1.4 9.7L20 2.5c.9-.3 1.8.2 1.6.7Z" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg
      aria-hidden
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="h-[38%] w-[38%]"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.4 20H9.6a.6.6 0 0 1-.6-.6V9.6a.6.6 0 0 1 .6-.6h9.8a.6.6 0 0 1 .6.6v9.8a.6.6 0 0 1-.6.6Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 9V4.6a.6.6 0 0 0-.6-.6H4.6a.6.6 0 0 0-.6.6v9.8a.6.6 0 0 0 .6.6H9"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="h-[38%] w-[38%]"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 12.75 6 6 9-13.5"
      />
    </svg>
  );
}

export default function Connect() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingPerspectiveRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const resetTimerRef = useRef<number | null>(null);
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    setCopied(true);
    if (resetTimerRef.current) window.clearTimeout(resetTimerRef.current);
    resetTimerRef.current = window.setTimeout(() => setCopied(false), 1800);

    try {
      let didCopy = false;

      if (navigator.clipboard?.writeText) {
        try {
          await navigator.clipboard.writeText(EMAIL);
          didCopy = true;
        } catch {
          didCopy = false;
        }
      }

      if (!didCopy) {
        const textarea = document.createElement("textarea");
        textarea.value = EMAIL;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        didCopy = document.execCommand("copy");
        textarea.remove();
        if (!didCopy) throw new Error("Copy failed");
      }
    } catch {
      // Keep the visual confirmation consistent in browsers that block clipboard access.
    }
  };

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) window.clearTimeout(resetTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const headingPerspective = headingPerspectiveRef.current;
    const heading = headingRef.current;
    const controls = controlsRef.current;
    if (!section || !headingPerspective || !heading || !controls) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = section.querySelectorAll<HTMLElement>("[data-connect-reveal]");
    gsap.set(items, { y: 44, opacity: 0 });

    const tween = gsap.to(items, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "expo.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: section,
        start: "top 72%",
        once: true,
      },
    });

    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (coarsePointer) {
      return () => tween.kill();
    }

    gsap.set(headingPerspective, { perspective: 1000 });

    const setHeadingRotY = gsap.quickTo(heading, "rotationY", {
      duration: 0.6,
      ease: "power3.out",
    });
    const setHeadingRotX = gsap.quickTo(heading, "rotationX", {
      duration: 0.6,
      ease: "power3.out",
    });
    const setHeadingX = gsap.quickTo(heading, "x", {
      duration: 0.7,
      ease: "power3.out",
    });
    const setHeadingY = gsap.quickTo(heading, "y", {
      duration: 0.7,
      ease: "power3.out",
    });
    const setControlsX = gsap.quickTo(controls, "x", {
      duration: 0.7,
      ease: "power3.out",
    });
    const setControlsY = gsap.quickTo(controls, "y", {
      duration: 0.7,
      ease: "power3.out",
    });

    const onMove = (event: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const normalizedX = Math.max(
        -1,
        Math.min(1, (event.clientX - centerX) / (rect.width / 2)),
      );
      const normalizedY = Math.max(
        -1,
        Math.min(1, (event.clientY - centerY) / (rect.height / 2)),
      );

      setHeadingRotY(normalizedX * 3);
      setHeadingRotX(-normalizedY * 3);
      setHeadingX(normalizedX * 10);
      setHeadingY(normalizedY * 6);
      setControlsX(normalizedX * 16);
      setControlsY(normalizedY * 10);
    };

    const onLeave = () => {
      setHeadingRotY(0);
      setHeadingRotX(0);
      setHeadingX(0);
      setHeadingY(0);
      setControlsX(0);
      setControlsY(0);
    };

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);

    return () => {
      tween.kill();
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="connect-title"
      className="relative flex min-h-[max(532px,70svh)] overflow-hidden px-6 py-14 sm:px-8 sm:py-16 md:px-12 md:py-20"
    >
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-col items-center justify-center gap-[30px] text-center">
        <div ref={headingPerspectiveRef} className="flex flex-col items-center">
          <h2
            ref={headingRef}
            id="connect-title"
            data-connect-reveal
            className="font-[family-name:var(--font-neue-machina)] text-[96px] font-black uppercase leading-[0.85] tracking-[-0.04em] text-white"
          >
            <span className="hero-title-gradient block whitespace-nowrap">
              Let&apos;s build
            </span>
            <span className="block whitespace-nowrap text-accent">together</span>
          </h2>
        </div>

        <div
          ref={controlsRef}
          data-connect-reveal
          aria-label="Contact links"
          className="flex w-full max-w-[1060px] flex-col items-stretch justify-center gap-3 sm:gap-4 lg:flex-row"
        >
          <button
            type="button"
            onClick={copyEmail}
            data-copy-state={copied ? "copied" : "idle"}
            aria-label={copied ? "Email copied" : `Copy ${EMAIL}`}
            className="group flex min-w-0 flex-1 cursor-pointer items-stretch rounded-full border border-white/20 bg-white/10 p-1.5 transition-colors duration-300 hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:p-2 lg:max-w-[640px]"
          >
            <span className="flex min-w-0 flex-1 items-center justify-between rounded-full bg-[#222222] pl-5 text-left text-white sm:pl-8 md:pl-10 lg:pl-12">
              <span className="truncate text-base font-medium tracking-[-0.035em] sm:text-lg lg:text-xl">
                {EMAIL}
              </span>
              <span
                aria-hidden
                className="ml-3 flex aspect-square h-[60px] shrink-0 items-center justify-center rounded-full bg-white text-[#161616] transition-transform duration-200 ease-out group-active:scale-95 sm:h-[72px] md:h-[84px] lg:h-[92px]"
              >
                {copied ? <CheckIcon /> : <CopyIcon />}
              </span>
              <span className="sr-only" aria-live="polite">
                {copied ? "Email copied" : ""}
              </span>
            </span>
          </button>

          <div className="flex shrink-0 justify-center gap-3 sm:gap-4">
            <a
              href="https://www.linkedin.com/in/nikita-protsenko/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="flex aspect-square h-[72px] items-center justify-center rounded-full border border-white/20 bg-white/10 p-1.5 transition-colors duration-300 hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:h-[88px] sm:p-2 lg:h-full lg:max-h-[108px] lg:min-h-[92px]"
            >
              <span className="flex h-full w-full items-center justify-center rounded-full bg-white text-[#161616]">
                <LinkedInIcon />
              </span>
            </a>
            <a
              href="https://t.me/nikitaprotsenko"
              target="_blank"
              rel="noreferrer"
              aria-label="Telegram"
              className="flex aspect-square h-[72px] items-center justify-center rounded-full border border-white/20 bg-white/10 p-1.5 transition-colors duration-300 hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:h-[88px] sm:p-2 lg:h-full lg:max-h-[108px] lg:min-h-[92px]"
            >
              <span className="flex h-full w-full items-center justify-center rounded-full bg-white text-[#161616]">
                <TelegramIcon />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
