import { notFound } from "next/navigation";
import { cases, getCase } from "@/lib/cases";
import CaseStudy from "@/components/CaseStudy";

export function generateStaticParams() {
  return cases.filter((c) => c.study).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getCase(slug);
  if (!data) return {};
  return {
    title: `${data.title} — Nikita Protsenko`,
    description: data.description,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getCase(slug);
  if (!data || !data.study) notFound();
  return <CaseStudy data={data} />;
}
