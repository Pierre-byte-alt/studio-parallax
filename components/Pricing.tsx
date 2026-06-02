"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PLANS = [
  {
    name: "Site web sur mesure",
    pricePrefix: "à partir de",
    priceMain: "800",
    priceSuffix: null,
    priceSecond: null,
    subtitle: "Livraison en 5 à 15 jours",
    desc: "Un site conçu de zéro avec design exclusif, animations fluides et toutes les fonctionnalités dont vous avez besoin.",
    features: [
      "Design exclusif sur mesure",
      "Animations GSAP + smooth scroll",
      "Panier et paiement Stripe si besoin",
      "Comptes utilisateurs si besoin",
      "Responsive mobile parfait",
      "Livraison en 5 à 15 jours",
    ],
    priceNote: null,
    note: "E-commerce ou SaaS complexe → à partir de 2 000€",
    featured: false,
    cta: "Démarrer votre site",
  },
  {
    name: "SEO + GEO",
    pricePrefix: "à partir de",
    priceMain: "200",
    priceSuffix: "/mois",
    priceSecond: null,
    priceNote: "Le tarif évolue selon la taille de votre site, la concurrence sur vos mots-clés, le nombre de pages à optimiser et la fréquence de publication de contenu. Un devis personnalisé vous sera fourni après audit gratuit.",
    subtitle: "Premiers résultats en 90 jours",
    desc: "Visible sur Google ET cité par ChatGPT, Gemini, Perplexity et Claude. Top 3 Google visé en 3 à 6 mois.",
    features: [
      "Audit SEO complet de votre site",
      "Mots-clés ciblés choisis avec vous",
      "Optimisation technique on-page",
      "Référencement Google (top 3 visé en 3-6 mois)",
      "Optimisation GEO : ChatGPT, Gemini, Perplexity, Claude",
      "Rapport mensuel avec positions et trafic",
      "Sans engagement après 3 mois",
    ],
    note: null,
    featured: true,
    cta: "Booster votre visibilité",
  },
  {
    name: "Pack Site + SEO/GEO",
    pricePrefix: "à partir de",
    priceMain: "1 500",
    priceSuffix: null,
    priceSecond: "+ 150€/mois",
    priceNote: "La maintenance mensuelle couvre le suivi SEO, les optimisations continues et les rapports de performance. Tarif ajustable selon vos besoins.",
    subtitle: "La solution complète",
    desc: "Nous construisons votre site et assurons sa visibilité en même temps. Un seul interlocuteur, une stratégie cohérente.",
    features: [
      "Tout ce qui est inclus dans Site web sur mesure",
      "Tout ce qui est inclus dans SEO + GEO",
      "Cohérence totale entre design et référencement",
      "Un seul interlocuteur pour tout",
      "Priorité sur les délais",
    ],
    note: null,
    featured: false,
    cta: "Tout inclus →",
  },
];

export default function Pricing() {
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

      const cards = cardsRef.current?.querySelectorAll(".pricing-card");
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

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="tarifs" ref={sectionRef} className="py-28 px-6 border-t border-[#1E1E1E]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div ref={titleRef} className="mb-16 text-center">
          <div className="text-[12px] uppercase tracking-[0.2em] text-[#6C63FF] font-medium mb-4">
            Tarifs
          </div>
          <h2 className="text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-[#F5F5F5] leading-tight mb-4">
            Transparent, sans surprises
          </h2>
          <p className="text-[#888] text-[15px] max-w-md mx-auto leading-relaxed">
            Des forfaits clairs orientés résultats. Engagement mensuel sans frais cachés.
          </p>
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`pricing-card card-glow rounded-2xl p-7 border flex flex-col gap-6 ${
                plan.featured
                  ? "pricing-featured border-[rgba(108,99,255,0.5)] md:-translate-y-4 md:scale-105"
                  : "border-[#1E1E1E] bg-[#111]"
              }`}
            >
              {/* Plan header */}
              <div>
                {plan.featured && (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[rgba(108,99,255,0.15)] border border-[rgba(108,99,255,0.3)] text-[11px] text-[#9B97FF] font-medium mb-4">
                    <span className="w-1 h-1 rounded-full bg-[#6C63FF]" />
                    Recommandé
                  </div>
                )}
                <div className="text-[13px] text-[#555] mb-1">{plan.subtitle}</div>
                <h3 className="text-xl font-bold text-[#F5F5F5]">{plan.name}</h3>
              </div>

              {/* Price */}
              <div>
                <div className="text-[12px] text-[#555] mb-1">{plan.pricePrefix}</div>
                <div className="flex items-baseline gap-1 flex-wrap">
                  <span className="text-4xl font-black text-[#F5F5F5]">
                    {plan.priceMain}€
                  </span>
                  {plan.priceSuffix && (
                    <span className="text-[15px] text-[#666]">{plan.priceSuffix}</span>
                  )}
                </div>
                {plan.priceSecond && (
                  <div className="text-[13px] text-[#6C63FF] mt-1 font-medium">
                    {plan.priceSecond}
                  </div>
                )}
                {plan.priceNote && (
                  <p className="text-[11px] text-[#444] italic leading-relaxed mt-2">
                    {plan.priceNote}
                  </p>
                )}
              </div>

              <p className="text-[#666] text-[13px] leading-relaxed">{plan.desc}</p>

              {/* CTA */}
              <button
                onClick={() => scrollTo("#contact")}
                className={`w-full text-[14px] font-medium px-4 py-3 rounded-xl ${
                  plan.featured ? "btn-primary" : "btn-secondary"
                }`}
              >
                {plan.cta}
              </button>

              {/* Separator */}
              <div className="border-t border-[#1A1A1A]" />

              {/* Features */}
              <ul className="flex flex-col gap-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-[13px] text-[#888]">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      className="mt-0.5 shrink-0"
                      style={{ color: plan.featured ? "#6C63FF" : "#444" }}
                    >
                      <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1"/>
                      <path d="M4.5 7l2 2 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Bottom note */}
              {plan.note && (
                <div className="border-t border-[#1A1A1A] pt-4 text-[12px] text-[#555] leading-relaxed">
                  {plan.note}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center text-[13px] text-[#555] mt-10">
          Un projet hors forfait ?{" "}
          <button
            onClick={() => scrollTo("#contact")}
            className="text-[#6C63FF] hover:text-[#9B97FF] transition-colors underline underline-offset-2"
          >
            Parlons-en
          </button>
        </p>
      </div>
    </section>
  );
}
