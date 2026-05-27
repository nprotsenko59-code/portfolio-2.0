"use client";

import CaseCard from "./CaseCard";
import { cases } from "@/lib/cases";

export default function Work() {
  return (
    <section className="px-8 pb-16 md:px-12">
      <div className="relative">
        {cases.map((c, i) => (
          <div
            key={c.slug}
            className="bg-white md:sticky md:top-0 md:h-screen"
            style={{ zIndex: i + 1 }}
          >
            <CaseCard data={c} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
