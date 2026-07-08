"use client";

import Image from "next/image";
import type { Case, CaseStudySection } from "@/lib/cases";

function OverviewVisual() {
  return (
    <figure className="relative aspect-[16/9] w-full overflow-hidden rounded-[20px] bg-[#0F1410]">
      <Image
        src="/images/payment-installments/first-screen.jpg"
        alt="Payment Installments — first screen"
        fill
        sizes="(min-width: 1024px) 1100px, 100vw"
        quality={90}
        className="object-cover"
        priority
      />
    </figure>
  );
}

function PaymentLinkFirstScreenVisual() {
  return (
    <figure className="relative aspect-[16/9] w-full overflow-hidden rounded-[20px] bg-[#0F1410]">
      <Image
        src="/images/Payment link first screen.jpg"
        alt="Payment Links — first screen"
        fill
        sizes="(min-width: 1024px) 1100px, 100vw"
        quality={90}
        className="object-cover"
        priority
      />
    </figure>
  );
}

function ProcessVisual() {
  return (
    <figure className="relative aspect-[16/9] w-full overflow-hidden rounded-[20px] bg-[#072C23]">
      <div className="absolute inset-[6%]">
        <Image
          src="/images/case-process/cursor-screenshot.png"
          alt="Coded prototype in Cursor"
          fill
          sizes="(min-width: 1024px) 1000px, 100vw"
          quality={90}
          className="rounded-2xl object-contain shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)]"
        />
      </div>
    </figure>
  );
}

export default function CasePlaceholder({
  data,
  section,
}: {
  data: Case;
  section: CaseStudySection;
}) {
  if (data.slug === "payment-links") {
    switch (section.id) {
      case "overview":
        return <PaymentLinkFirstScreenVisual />;
      default:
        return null;
    }
  }

  if (data.slug !== "guesty-installments") return null;
  switch (section.id) {
    case "overview":
      return <OverviewVisual />;
    case "process":
      return <ProcessVisual />;
    default:
      return null;
  }
}
