import type { CaseStudySection } from "@/lib/cases";

export default function CasePlaceholder({
  section,
}: {
  section: CaseStudySection;
}) {
  return (
    <div
      className="flex h-full w-full items-center justify-center rounded-[40px] bg-ink"
      aria-label={`${section.chip} visual placeholder`}
    >
      <span className="text-sm text-white/40">Visual</span>
    </div>
  );
}
