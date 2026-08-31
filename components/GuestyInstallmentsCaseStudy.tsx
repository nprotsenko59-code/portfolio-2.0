"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Case } from "@/lib/cases";

const VISUAL_WIDTH = "w-[94%] max-w-[1200px] md:w-[86%]";
type AlternativeSheet = "preview" | "steps-debate";

type VisualProps = {
  src?: string;
  alt: string;
  label?: string;
  aspectRatio?: string;
  preload?: boolean;
  unoptimized?: boolean;
};

function AssetPlaceholder({ label, aspectRatio = "16 / 9" }: { label: string; aspectRatio?: string }) {
  return (
    <div
      className="flex h-full min-h-[220px] w-full items-center justify-center bg-[#777] p-8 text-center"
      style={{ aspectRatio }}
      role="img"
      aria-label={`${label} placeholder`}
    >
      <span className="rounded-full border border-white/35 bg-black/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.15em] text-white/90">
        Asset placeholder · {label}
      </span>
    </div>
  );
}

function Visual({ src, alt, label, aspectRatio = "16 / 9", preload = false, unoptimized = false }: VisualProps) {
  if (!src) return <AssetPlaceholder label={label ?? alt} aspectRatio={aspectRatio} />;

  return (
    <figure
      className="relative overflow-hidden rounded-[20px] bg-[#0F1410]"
      style={{ aspectRatio }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1280px) 1200px, 94vw"
        quality={90}
        preload={preload}
        unoptimized={unoptimized}
        className="object-cover"
      />
    </figure>
  );
}

function Divider() {
  return <div aria-hidden className="mx-auto my-20 h-px max-w-[760px] bg-white/15" />;
}

function BodyCopy({ children }: { children: React.ReactNode }) {
  return <p className="text-[16px] leading-[1.65] text-white/85">{children}</p>;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-[32px] font-bold uppercase leading-[1.1] tracking-[-0.02em] text-white sm:text-[36px]">
      {children}
    </h2>
  );
}

export default function GuestyInstallmentsCaseStudy({ data }: { data: Case }) {
  const [activeSheet, setActiveSheet] = useState<AlternativeSheet | null>(null);
  const [isSheetClosing, setIsSheetClosing] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const previewTriggerRef = useRef<HTMLButtonElement>(null);
  const debateTriggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const finishSheetClose = useCallback(() => {
    setActiveSheet(null);
    setIsSheetClosing(false);
  }, []);

  const closeSheet = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finishSheetClose();
      return;
    }
    setIsSheetClosing(true);
  }, [finishSheetClose]);

  useEffect(() => {
    let raf = 0;
    const updateProgress = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      progressRef.current?.style.setProperty(
        "transform",
        `scaleX(${Math.min(1, Math.max(0, progress))})`
      );
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const previousScrollRestoration = history.scrollRestoration;
    history.scrollRestoration = "manual";
    const raf = requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "auto" }));
    return () => {
      cancelAnimationFrame(raf);
      history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useEffect(() => {
    if (!isSheetClosing) return;

    const fallback = window.setTimeout(finishSheetClose, 400);
    return () => window.clearTimeout(fallback);
  }, [finishSheetClose, isSheetClosing]);

  useEffect(() => {
    if (!activeSheet) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeButton = dialogRef.current?.querySelector<HTMLButtonElement>("[data-sheet-close]");
    closeButton?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeSheet();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      (activeSheet === "preview" ? previewTriggerRef : debateTriggerRef).current?.focus();
    };
  }, [activeSheet, closeSheet]);

  return (
    <main className="case-study-page relative">
      <div aria-hidden className="pointer-events-none fixed left-0 right-0 top-0 z-[60] h-[3px] bg-white/10">
        <div ref={progressRef} className="h-full origin-left bg-white" style={{ transform: "scaleX(0)" }} />
      </div>
      <header className="pointer-events-none fixed left-0 right-0 top-0 z-[55] flex items-start justify-between px-8 pb-4 pt-7 md:px-12">
        <div className="pointer-events-auto">
          <Link
            href="/"
            scroll={false}
            data-cursor
            data-cursor-label="Back"
            className="group inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#161616] transition-colors hover:bg-white/90"
          >
            <span aria-hidden className="mr-1.5 transition-transform duration-300 group-hover:-translate-x-1">←</span>
            Back
          </Link>
        </div>
      </header>

      <article className="px-6 pb-40 pt-28 lg:pt-32">
        <section className="mx-auto max-w-[760px]">
          {data.logo ? (
            <div
              role="img"
              aria-label={data.logo.alt}
              className="mb-10 text-white"
              style={{
                height: data.logo.height ?? 28,
                width: (data.logo.height ?? 28) * data.logo.aspectRatio,
                backgroundColor: "currentColor",
                WebkitMaskImage: `url(${data.logo.src})`,
                maskImage: `url(${data.logo.src})`,
                WebkitMaskSize: "contain",
                maskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
              }}
            />
          ) : null}
          <h1 className="font-display text-[38px] font-bold uppercase leading-[1.08] tracking-[-0.03em] text-white sm:text-[52px]">
            {data.headline ?? data.title}
          </h1>
          <p className="mt-8 text-[17px] leading-[1.65] text-white/85">{data.description}</p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            <div>
              <h2 className="mb-3 font-display text-sm font-semibold uppercase tracking-widest">My role</h2>
              <BodyCopy>I led all the design process for this project: from briefing with my PM and discovery to hand off to development.</BodyCopy>
            </div>
            <div>
              <h2 className="mb-3 font-display text-sm font-semibold uppercase tracking-widest">Team</h2>
              <BodyCopy>Me (designer), Product manager, Front-end developer, Back-end developer</BodyCopy>
            </div>
          </div>
        </section>

        <div className={`mx-auto mt-16 ${VISUAL_WIDTH}`}>
          <Visual
            src="/images/payment-installments/2026-08-25/first-screen.jpg"
            alt="Payment Installments interface and automation example"
            preload
          />
        </div>

        <section className="mx-auto mt-20 max-w-[760px]">
          <div className="space-y-10">
            <div>
              <h3 className="mb-4 font-display text-[20px] font-semibold uppercase tracking-[0.02em]">What is Guesty?</h3>
              <BodyCopy>Guesty is a property management platform. It helps teams manage listings, reservations, guest communication, payments, and day-to-day operations across multiple booking channels. One of its core areas is payment workflows, which help property managers collect revenue, automate charges, and reduce manual operational work.</BodyCopy>
            </div>
            <div>
              <h3 className="mb-4 font-display text-[20px] font-semibold uppercase tracking-[0.02em]">The problem</h3>
              <div className="space-y-5">
                <BodyCopy>Guesty&apos;s Payment Automations let property managers attach charges to reservation events like booking, confirmation, check-in, and check-out — which works well for short stays.</BodyCopy>
                <BodyCopy>But larger PMCs running corporate housing, serviced apartments, and mid-term rentals operate differently. Their guests stay 30, 60, or 90+ days, and payments often happen through installments that are not connected to reservation lifecycle.</BodyCopy>
                <BodyCopy>Without installment support, Guesty was losing enterprise deals to competitors. The same objection kept coming up in sales calls — and that became the starting point for this project.</BodyCopy>
              </div>
            </div>
          </div>
        </section>

        <div className={`mx-auto mt-10 ${VISUAL_WIDTH}`}>
          <Visual src="/images/payment-installments/2026-08-25/current-logic.jpg" alt="Existing event-based payment automation logic" />
        </div>

        <Divider />

        <section className="mx-auto max-w-[760px]">
          <SectionTitle>Process</SectionTitle>
          <div className="mt-12">
            <h3 className="mb-5 font-display text-[20px] font-semibold uppercase tracking-[0.02em]">Discovery with property managers</h3>
            <div className="space-y-5">
              <BodyCopy>I led direct discovery calls with property managers managing long-term reservations. Across calls, several patterns emerged clearly:</BodyCopy>
              <ul className="space-y-3 text-[16px] leading-[1.65] text-white/85">
                <li className="flex gap-3"><span aria-hidden>—</span><span>We discovered 3 main patterns how users charge their guests: monthly (most popular), weekly and bi-weekly (mainly used for reservations with open check-out date).</span></li>
                <li className="flex gap-3"><span aria-hidden>—</span><span>We learned how they think about long stays: everything above 30 calendar days is considered to be a long reservation.</span></li>
                <li className="flex gap-3"><span aria-hidden>—</span><span>Two charging paradigms exist. Some PMCs charge every 30 days from check-in (anniversary billing); others charge on a fixed calendar date like the 1st of each month (calendar billing). Both are legitimate and in active use.</span></li>
                <li className="flex gap-3"><span aria-hidden>—</span><span>They charge part of the reservation total upfront (before guest checks-in). Usually, they take first and last installment. Also, there is a refundable security deposit: an amount on top of reservation total that they charge and refund at the end of the stay if there is no damage done.</span></li>
              </ul>
            </div>
          </div>
        </section>

        <div className={`mx-auto mt-10 ${VISUAL_WIDTH}`}>
          <Visual src="/images/payment-installments/2026-08-25/discovery.jpg" alt="Discovery insights from property manager research" />
        </div>

        <section className="mx-auto mt-16 max-w-[760px]">
          <h3 className="mb-5 font-display text-[20px] font-semibold uppercase tracking-[0.02em]">Synthesis and ideation</h3>
          <BodyCopy>After the interviews, I summarized insights that we gathered during interviews and together with my PM synthesised them into functional requirements.</BodyCopy>
        </section>
        <div className={`mx-auto mt-10 space-y-8 ${VISUAL_WIDTH}`}>
          <Visual src="/images/payment-installments/2026-08-25/synthesis - functionality.jpg" alt="Functional requirements map" aspectRatio="7200 / 3213" />
          <div className="mx-auto max-w-[760px] text-[16px] leading-[1.65] text-white/85">Then I translated all this into a user flow that turned out to be a multi-step automation logic setup process.</div>
          <figure className="relative aspect-video overflow-hidden rounded-[20px] bg-white">
            <iframe
              title="Installments setup user flow"
              src="https://embed.figma.com/board/CEAZVLOONiW2ppz54thxI1/Flowchart---embedded?node-id=2001-90&embed-host=share"
              className="h-full w-full border-0"
              allowFullScreen
              loading="lazy"
            />
          </figure>
        </div>

        <section className="mx-auto mt-16 max-w-[760px]">
          <BodyCopy>After that I started to gather inspiration from other products. I was looking for flows that cover setting up of a workflow or complex payment scenario (like scheduling payments, setting up recurring payments or invoices). For this process I used one of the internal tools I built for the team: <span className="font-medium text-white">/find-inspiration</span>, a skill connected to Mobbin via MCP that searches for relevant UI references based on a design brief. What would have taken hours of manual browsing was done in a fraction of the time, and with broader coverage than a manual search typically produces.</BodyCopy>
        </section>
        <div className={`mx-auto mt-10 ${VISUAL_WIDTH}`}>
          <Visual src="/images/payment-installments/2026-08-25/competitors.jpg" alt="Reference research for recurring-payment setup flows" />
        </div>

        <section className="mx-auto mt-16 max-w-[760px]">
          <BodyCopy>After inspiration I started to ideate on design. The overview of key decisions you can see below.</BodyCopy>
        </section>

        <Divider />

        <section className="mx-auto max-w-[760px]">
          <SectionTitle>Key design decisions</SectionTitle>
          <div className="mt-10 space-y-5">
            <BodyCopy>I separated installment setup from the existing Payment Automations flow because users managing long-term stays think about payments differently. Instead of tying charges to reservation events, they think in recurring billing cycles and how the total should be split across the stay.</BodyCopy>
            <BodyCopy>Keeping both models in one flow would have added unnecessary complexity. A dedicated guided path let each experience match how users actually think about payments while remaining part of the same Payment Automations product.</BodyCopy>
          </div>
        </section>
        <div className={`mx-auto mt-10 space-y-10 ${VISUAL_WIDTH}`}>
          <Visual src="/images/payment-installments/2026-08-25/entry-point.jpg?v=20260830" alt="Payment Automations entry point" unoptimized />
          <Visual src="/images/payment-installments/2026-08-25/entry-point-open.jpg" alt="Create menu with the Installments option" />
        </div>

        <section className="mx-auto mt-16 max-w-[760px]">
          <BodyCopy>Users start by defining the conditions under which this automation should be triggered. They can trigger it based on specific channels, properties, or reservation length. However, in this case, the reservation length cannot be less than 30 nights to avoid conflicts with our event-based automation flow. This is also the minimum stay length at which users typically start treating a reservation as a long-term stay.</BodyCopy>
        </section>
        <div className={`mx-auto mt-10 ${VISUAL_WIDTH}`}>
          <Visual src="/images/payment-installments/2026-08-25/settings.jpg" alt="Installment automation settings" />
        </div>

        <section className="mx-auto mt-16 max-w-[760px]">
          <BodyCopy>Then users define the main charge logic: they choose a billing cycle — monthly, weekly, or every two weeks — decide whether the reservation total should be split equally or charged as a custom amount, and choose when the charge should occur.</BodyCopy>
        </section>
        <div className={`mx-auto mt-10 space-y-10 ${VISUAL_WIDTH}`}>
          <Visual src="/images/payment-installments/2026-08-25/Payment cycle - empty.jpg" alt="Empty payment cycle configuration" />
          <Visual src="/images/payment-installments/2026-08-25/payment-cycle.jpg" alt="Payment cycle and automation calendar example" />
          <Visual src="/images/payment-installments/2026-08-25/payment-cycle-cards.jpg" alt="Payment cycle configuration options" />
        </div>

        <section className="mx-auto mt-16 max-w-[760px]">
          <BodyCopy>And finally, they decide what to take from that logic: upfront charge and security deposit.</BodyCopy>
        </section>
        <div className={`mx-auto mt-10 space-y-10 ${VISUAL_WIDTH}`}>
          <Visual src="/images/payment-installments/2026-08-25/move-in-off.jpg" alt="Move-in cost options turned off" />
          <Visual src="/images/payment-installments/2026-08-25/move-in-on.jpg?v=20260831" alt="Move-in cost options configured" unoptimized />
        </div>

        <section className="mx-auto mt-16 max-w-[760px]">
          <div className="rounded-2xl bg-[#242424] p-5">
            <svg
              aria-hidden
              className="mb-5 h-6 w-6"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 3h5v5" />
              <path d="M8 3H3v5" />
              <path d="M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3" />
              <path d="m15 9 6-6" />
            </svg>
            <BodyCopy>Here we had a debate inside our team regarding order of the steps. The question was what should come first: move-in costs or payment cycle.</BodyCopy>
            <button
              ref={debateTriggerRef}
              type="button"
              onClick={() => {
                setIsSheetClosing(false);
                setActiveSheet("steps-debate");
              }}
              className="group mt-7 flex w-full cursor-pointer items-center justify-between rounded-xl border border-white/10 px-4 py-4 text-left text-sm text-white transition-colors hover:bg-white hover:text-[#161616] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-haspopup="dialog"
              aria-expanded={activeSheet === "steps-debate"}
            >
              <span>See another considered direction</span>
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
          </div>
        </section>

        <Divider />

        <section className="mx-auto max-w-[760px]">
          <SectionTitle>Main challenges</SectionTitle>
          <div className="mt-12">
            <h3 className="mb-5 font-display text-[20px] font-semibold uppercase tracking-[0.02em]">Challenge 1 — Automation preview</h3>
            <div className="rounded-2xl bg-[#242424] p-5">
              <svg
                aria-hidden
                className="mb-5 h-6 w-6"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 3h5v5" />
                <path d="M8 3H3v5" />
                <path d="M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3" />
                <path d="m15 9 6-6" />
              </svg>
              <div className="space-y-5">
                <BodyCopy>Due to complex logic involved into payment automations I needed a way for users to preview the automation while they were creating it, so they could better understand how their configuration would behave.</BodyCopy>
                <BodyCopy>Because users are creating a rule that will apply to future reservations, we don’t know the actual stay dates at this stage. I explored different ways of visualizing the payment schedule and chose the calendar because, even without knowing the actual reservation dates, it gave users a familiar way to visualize how the payment logic would play out over time, that was shown during usability testing.</BodyCopy>
              </div>
              <button
                ref={previewTriggerRef}
                type="button"
                onClick={() => {
                  setIsSheetClosing(false);
                  setActiveSheet("preview");
                }}
                className="group mt-7 flex w-full cursor-pointer items-center justify-between rounded-xl border border-white/10 px-4 py-4 text-left text-sm text-white transition-colors hover:bg-white hover:text-[#161616] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-haspopup="dialog"
                aria-expanded={activeSheet === "preview"}
              >
                <span>See another considered direction</span>
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            </div>
            <div className="mt-8 space-y-5">
              <BodyCopy>By default, users will see the long reservation view — three months. This helps them understand cases that are difficult to explain verbally, such as how partial months are handled or how the guest will be charged if the first and last installments are collected upfront.</BodyCopy>
              <BodyCopy>Preview changes based on what payment cycle user chooses, and if they turn on upfront charge and security deposit.</BodyCopy>
            </div>
          </div>
        </section>
        <div className={`mx-auto mt-10 space-y-10 ${VISUAL_WIDTH}`}>
          <Visual src="/images/payment-installments/2026-08-25/preview.jpg?v=20260831" alt="Calendar-based automation preview" unoptimized />
          <Visual src="/images/payment-installments/2026-08-25/preview - hover interaction.jpg" alt="Automation preview hover interaction" />
        </div>

        <section className="mx-auto mt-20 max-w-[760px]">
          <h3 className="mb-5 font-display text-[20px] font-semibold uppercase tracking-[0.02em]">Challenge 2 — Catching conflicts</h3>
          <div className="space-y-5">
            <BodyCopy>Many users already had event-based automations set to apply to any length of stay. This meant the new installment-based automation could overlap with an existing one.</BodyCopy>
            <BodyCopy>To solve this, we showed users the conflicting automations and suggested adjusting the length-of-stay condition so the rules would not overlap.</BodyCopy>
          </div>
        </section>
        <div className={`mx-auto mt-10 ${VISUAL_WIDTH}`}>
          <Visual src="/images/payment-installments/2026-08-25/conflict.jpg?v=20260831" alt="Conflict-resolution dialog for overlapping automations" unoptimized />
        </div>

        <Divider />

        <section className="mx-auto max-w-[760px]">
          <SectionTitle>Outcomes</SectionTitle>
          <div className="mt-5">
            <BodyCopy>This feature unlocked a new customer segment for Guesty — PMCs specializing in long-term rentals — that previously couldn&apos;t be served by the platform. 7 enterprise accounts were unblocked and new possibilities for revenue emerged.</BodyCopy>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[20px] bg-[#242424] p-6 sm:p-7">
              <p className="font-display text-4xl font-bold">7</p>
              <p className="mt-5 text-lg text-white/85">enterprise accounts unblocked</p>
            </div>
            <div className="rounded-[20px] bg-[#242424] p-6 sm:p-7">
              <p className="font-display text-4xl font-bold">~$226 M</p>
              <p className="mt-5 text-lg text-white/85">addition to annual processing volume</p>
            </div>
          </div>
        </section>
      </article>

      {activeSheet ? (
        <div
          className="fixed inset-0 z-[80] flex items-end bg-black/65 p-0 sm:pt-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeSheet();
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={activeSheet === "preview" ? "preview-alternative-title" : "steps-debate-title"}
            onAnimationEnd={(event) => {
              if (event.target === event.currentTarget && isSheetClosing) {
                finishSheetClose();
              }
            }}
            className={`installments-bottom-sheet relative max-h-[86vh] w-full overflow-y-auto rounded-t-[28px] bg-[#161616] shadow-2xl${isSheetClosing ? " installments-bottom-sheet--closing" : ""}`}
          >
            <button
              data-sheet-close
              type="button"
              aria-label="Close considered direction"
              onClick={closeSheet}
              className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-full text-2xl leading-none transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-6 sm:top-6"
            >
              <span aria-hidden>×</span>
            </button>
            <div className="mx-auto max-w-[900px] px-6 py-12 sm:px-12 sm:py-16">
              {activeSheet === "preview" ? (
                <>
                  <h2 id="preview-alternative-title" className="font-display text-[28px] font-bold uppercase leading-[1.1] tracking-[-0.02em]">Preview — initial idea</h2>
                  <div className="mt-10 space-y-10">
                    <div>
                      <h3 className="mb-4 font-display text-[18px] font-semibold uppercase tracking-[0.02em]">Hypothesis</h3>
                      <BodyCopy>My first direction was a reservation timeline: a simple visual representation of how payments would be distributed across a stay.</BodyCopy>
                    </div>
                    <div>
                      <h3 className="mb-4 font-display text-[18px] font-semibold uppercase tracking-[0.02em]">What I tested</h3>
                      <BodyCopy>During usability testing, I asked property managers to create a payment automation for a long-term reservation. I looked for two things: whether they could configure the rule correctly, and whether the preview resolved questions without additional explanation.</BodyCopy>
                    </div>
                  </div>
                  <div className="mt-10 space-y-8">
                    <Visual src="/images/payment-installments/2026-08-25/initial preview.jpg" alt="Initial timeline preview — basic payment schedule" />
                    <Visual src="/images/payment-installments/2026-08-25/initial preview - detailed.jpg" alt="Initial timeline preview — upfront-charge scenario" />
                  </div>
                  <div className="mt-12">
                    <h3 className="font-display text-[18px] font-semibold uppercase tracking-[0.02em]">The timeline helped with the overall sequence, but not with the details users cared about</h3>
                    <p className="mt-5 text-[16px] leading-[1.65] text-white/85">The main uncertainty was around partial months, upfront charges, and different reservation lengths. Users wanted to understand how the schedule adapts when a stay lasts one month versus several months, or when part of the total is collected upfront.</p>
                  </div>
                </>
              ) : (
                <>
                  <h2 id="steps-debate-title" className="font-display text-[28px] font-bold uppercase leading-[1.1] tracking-[-0.02em]">What should be the order of steps?</h2>
                  <div className="mt-10 space-y-8">
                    <BodyCopy>We explored two possible orders for the setup flow: payment cycle first or move-in costs first. There was a good reason to start with move-in costs: many property managers collect something upfront, so defining that first could feel like a natural starting point before configuring the remaining payments.</BodyCopy>
                    <div>
                      <h3 className="mb-4 font-display text-[18px] font-semibold uppercase tracking-[0.02em]">Why we chose payment cycle first</h3>
                      <ol className="list-decimal space-y-1 pl-5 text-[16px] leading-[1.65] text-white/85">
                        <li>It defines the core behavior of the automation. Every user needs to decide how the reservation will be charged — monthly, weekly, or bi-weekly — while move-in costs are optional (even though relevant for the majority of users).</li>
                        <li>It matched how users thought about the setup. Users first thought about how they wanted to split the reservation total over time, and then about what, if anything, should be collected upfront.</li>
                        <li>It created a clearer hierarchy. The payment cycle establishes the base rule; move-in costs then modify that rule. So users define main logic first, and then extra scenarios.</li>
                      </ol>
                    </div>
                  </div>
                  <div className="mt-12">
                    <Visual src="/images/payment-installments/2026-08-25/Order of steps.jpg" alt="Payment-cycle-first and move-in-cost-first step-order comparison" />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
