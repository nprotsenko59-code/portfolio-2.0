"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Case } from "@/lib/cases";
import { gsap } from "@/lib/gsap";

export default function CaseCard({ data }: { data: Case; index: number }) {
  const articleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const article = articleRef.current;
    if (!article) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarsePointer) return;

    gsap.set(article, { transformPerspective: 1200, transformOrigin: "center center" });

    const setRotY = gsap.quickTo(article, "rotationY", { duration: 0.6, ease: "power3.out" });
    const setRotX = gsap.quickTo(article, "rotationX", { duration: 0.6, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const rect = article.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const nx = Math.max(-1, Math.min(1, (e.clientX - cx) / (rect.width / 2)));
      const ny = Math.max(-1, Math.min(1, (e.clientY - cy) / (rect.height / 2)));
      setRotY(nx * 4);
      setRotX(-ny * 4);
    };
    const onLeave = () => {
      setRotY(0);
      setRotX(0);
    };

    article.addEventListener("mousemove", onMove);
    article.addEventListener("mouseleave", onLeave);
    return () => {
      article.removeEventListener("mousemove", onMove);
      article.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const ctaHref = data.study ? `/work/${data.slug}` : data.website ?? null;
  const isExternal = !data.study && !!data.website;

  const ctaPill = ctaHref ? (
    <span
      className="inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#161616] transition-colors group-hover:bg-white/90"
    >
      <span>View</span>
      <span
        aria-hidden
        className="ml-0 inline-flex w-0 -translate-x-1 items-center overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 ease-out group-hover:ml-1.5 group-hover:w-[14px] group-hover:translate-x-0 group-hover:opacity-100"
      >
        →
      </span>
    </span>
  ) : null;

  const textColumn = (
    <div className="relative z-10 flex flex-col p-8 min-[1200px]:p-12">
      {data.logo ? (
        <div
          role="img"
          aria-label={data.logo.alt}
          className="mb-6 text-white"
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
            WebkitMaskPosition: "left center",
            maskPosition: "left center",
          }}
        />
      ) : null}
      {data.headline ? (
        <h3 className="font-display text-[24px] font-bold uppercase leading-[1.2] tracking-[-0.02em] text-white">
          {data.headline}
        </h3>
      ) : (
        <h3 className="font-display text-[24px] font-bold uppercase leading-[1.2] tracking-[-0.02em] text-white">
          {data.title}
        </h3>
      )}
      {data.dates ? (
        <p className="mt-3 text-sm text-white/55">{data.dates}</p>
      ) : null}
      <p className="mt-4 max-w-md text-[15px] leading-[1.55] text-white/85">
        {data.description}
      </p>
      {ctaPill ? <div className="mt-auto pt-10">{ctaPill}</div> : null}
    </div>
  );

  return (
    <article
      ref={articleRef}
      data-case-card
      className="group relative grid w-full grid-cols-1 overflow-hidden rounded-[40px] border min-[1200px]:grid-cols-[1fr_2fr]"
      style={{
        backgroundColor: "#161616",
        borderColor: "rgba(255,255,255,0.08)",
        willChange: "transform",
      }}
      aria-label={data.title}
    >
      {textColumn}

      <div
        className="relative m-2 aspect-[1.28] self-start overflow-hidden rounded-[32px] min-[1200px]:my-2 min-[1200px]:mr-2 min-[1200px]:ml-0"
        style={{ backgroundColor: data.accent }}
      >
        {data.image ? (
          <Image
            src={data.image.src}
            alt={data.image.alt}
            fill
            sizes="(min-width: 1024px) 66vw, 100vw"
            quality={90}
            className="pointer-events-none select-none object-cover object-left"
            priority={false}
          />
        ) : null}
      </div>

      {ctaHref ? (
        isExternal ? (
          <a
            href={ctaHref}
            target="_blank"
            rel="noreferrer"
            data-cursor
            data-cursor-label="View"
            aria-label={`View ${data.title}`}
            className="absolute inset-0 z-20"
          />
        ) : (
          <Link
            href={ctaHref}
            data-cursor
            data-cursor-label="View"
            aria-label={`View ${data.title}`}
            onClick={() => {
              try {
                sessionStorage.setItem("home:returnScroll", String(window.scrollY));
              } catch {
                /* ignore */
              }
            }}
            className="absolute inset-0 z-20"
          />
        )
      ) : null}
    </article>
  );
}
