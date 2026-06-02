"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const REASONS = [
  {
    number: "01",
    stat: "92%",
    title: "des expériences web commencent par une recherche",
    desc: "Être visible sur Google n'est plus optionnel. C'est le point d'entrée de presque tous vos futurs clients.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: "02",
    stat: "IA",
    title: "Les IA comme ChatGPT citent désormais des sites dans leurs réponses",
    desc: "ChatGPT, Perplexity et Google AI Overview recommandent des sources précises. Le GEO optimise votre site pour être cité.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2l2 6h6l-5 3.5 2 6L10 14l-5 3.5 2-6L2 8h6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: "03",
    stat: "0%",
    title: "Vos concurrents ne sont pas encore optimisés pour les IA — soyez le premier",
    desc: "Le GEO est une discipline émergente. Agir maintenant, c'est prendre 12 à 18 mois d'avance sur votre marché.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2v4M10 14v4M2 10h4M14 10h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
];

export default function SeoGeoWhy() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const blocksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      const blocks = blocksRef.current?.querySelectorAll(".why-block");
      if (blocks) {
        gsap.from(blocks, {
          opacity: 0,
          y: 50,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: blocksRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 px-6 border-t border-[#1E1E1E]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div ref={titleRef} className="mb-16 text-center">
          <div className="text-[12px] uppercase tracking-[0.2em] text-[#6C63FF] font-medium mb-4">
            Pourquoi maintenant
          </div>
          <h2 className="text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-[#F5F5F5] leading-tight mb-4">
            Pourquoi le SEO/GEO en 2026 ?
          </h2>
          <p className="text-[#888] text-[15px] max-w-md mx-auto leading-relaxed">
            Le paysage de la recherche a changé. Voici pourquoi votre visibilité en dépend.
          </p>
        </div>

        {/* Blocks */}
        <div ref={blocksRef} className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {REASONS.map((reason) => (
            <div
              key={reason.number}
              className="why-block card-glow relative rounded-2xl border border-[#1E1E1E] bg-[#111] p-8 flex flex-col gap-5 overflow-hidden"
            >
              {/* Background number */}
              <span
                className="absolute top-4 right-6 text-[80px] font-black leading-none select-none pointer-events-none"
                style={{ color: "rgba(108,99,255,0.04)" }}
              >
                {reason.number}
              </span>

              {/* Icon */}
              <div className="w-10 h-10 rounded-xl bg-[rgba(108,99,255,0.1)] border border-[rgba(108,99,255,0.15)] text-[#9B97FF] flex items-center justify-center">
                {reason.icon}
              </div>

              {/* Big stat */}
              <div
                className="text-4xl font-black"
                style={{
                  background:
                    "linear-gradient(135deg, #F5F5F5 0%, #9B97FF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {reason.stat}
              </div>

              {/* Title */}
              <h3 className="text-[15px] font-semibold text-[#F5F5F5] leading-snug">
                {reason.title}
              </h3>

              {/* Desc */}
              <p className="text-[13px] text-[#666] leading-relaxed">
                {reason.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
