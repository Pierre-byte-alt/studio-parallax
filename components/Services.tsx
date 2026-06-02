"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="2" y="3" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M7 19h8M11 16v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Site web sur mesure",
    desc: "Nous concevons votre site de zéro — design exclusif, animations fluides, et toutes les fonctionnalités dont vous avez besoin : panier, paiement en ligne, comptes utilisateurs, tableau de bord. Aucun template, aucun compromis.",
    tags: ["Next.js", "GSAP", "Stripe", "Animations"],
    featured: false,
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.5"/>
      </svg>
    ),
    title: "SEO + GEO",
    desc: "Nous positionnons votre business sur Google ET dans les réponses des IA. Quand un client tape une question sur votre secteur — sur Google, ChatGPT ou Gemini — c'est vous qui apparaissez. Premiers résultats en 90 jours, mots-clés choisis avec vous.",
    tags: ["Google", "ChatGPT", "Gemini", "Perplexity", "Claude"],
    featured: true,
    badge: "Service phare",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 2l2.5 5.5L19 8.5l-4 4 1 5.5L11 15.5 6 18l1-5.5-4-4 5.5-1L11 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Pack complet",
    desc: "Nous construisons votre site et assurons sa visibilité en même temps. Un seul interlocuteur, une stratégie cohérente du design jusqu'au référencement. La solution la plus rentable pour votre croissance en ligne.",
    tags: ["Site", "SEO", "GEO", "Tout inclus"],
    featured: false,
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      const cards = cardsRef.current?.querySelectorAll(".service-card");
      if (cards) {
        gsap.from(cards, {
          opacity: 0,
          y: 50,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-28 px-6 border-t border-[#1E1E1E]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div ref={titleRef} className="mb-12">
          <div className="text-[12px] uppercase tracking-[0.2em] text-[#6C63FF] font-medium mb-4">
            Services
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-[#F5F5F5] leading-tight">
              Ce que nous<br />faisons pour vous
            </h2>
            <p className="text-[#888] text-[15px] max-w-xs leading-relaxed">
              Trois offres claires, une vision cohérente de votre présence en ligne.
            </p>
          </div>
        </div>

        {/* 3-column grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start"
        >
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className={`service-card card-glow rounded-2xl p-7 border flex flex-col gap-5 ${
                service.featured
                  ? "border-[rgba(108,99,255,0.5)] bg-gradient-to-br from-[rgba(108,99,255,0.1)] to-[rgba(108,99,255,0.02)] md:-translate-y-3"
                  : "border-[#1E1E1E] bg-[#111]"
              }`}
            >
              {service.featured && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[rgba(108,99,255,0.15)] border border-[rgba(108,99,255,0.3)] text-[11px] text-[#9B97FF] font-medium self-start">
                  <span className="w-1 h-1 rounded-full bg-[#6C63FF]" />
                  {service.badge}
                </div>
              )}

              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                  service.featured
                    ? "bg-[rgba(108,99,255,0.2)] text-[#9B97FF]"
                    : "bg-[#1A1A1A] text-[#666]"
                }`}
              >
                {service.icon}
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-[#F5F5F5] text-[17px] mb-3">
                  {service.title}
                </h3>
                <p className="text-[#666] text-[13px] leading-relaxed">
                  {service.desc}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`text-[11px] px-2.5 py-1 rounded-md ${
                      service.featured
                        ? "bg-[rgba(108,99,255,0.1)] text-[#9B97FF] border border-[rgba(108,99,255,0.15)]"
                        : "bg-[#1A1A1A] text-[#555]"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
