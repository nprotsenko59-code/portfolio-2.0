"use client";

import CaseCard from "./CaseCard";
import { cases } from "@/lib/cases";

export default function Work() {
  return (
    <section className="px-8 md:px-12">
      <div className="relative">
        {cases.map((c, i) => (
          <div
            key={c.slug}
            className={`${i === cases.length - 1 ? "mb-0" : "mb-6"} min-[1200px]:mb-0 min-[1200px]:sticky min-[1200px]:top-0 min-[1200px]:flex min-[1200px]:h-screen min-[1200px]:items-center`}
            style={{ zIndex: i + 1 }}
          >
            <CaseCard data={c} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
