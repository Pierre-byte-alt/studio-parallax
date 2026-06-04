"use client";

import { useEffect, useRef } from "react";
import HeroGrid from "./HeroGrid";
import gsap from "gsap";

const TITLE = "Studio Parallax";

export default function Hero() {
  const sectionRef   = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const subtitleRef  = useRef<HTMLParagraphElement>(null);
  const ctaRef       = useRef<HTMLDivElement>(null);
  const badgeRef     = useRef<HTMLDivElement>(null);
  const statsBarRef  = useRef<HTMLDivElement>(null);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const chars = containerRef.current?.querySelectorAll(".hero-char");
    if (!chars) return;

    const tl = gsap.timeline({ delay: 0.6 });
    tl.to(badgeRef.current,   { opacity: 1, y: 0, duration: 0.5,  ease: "power3.out" })
      .to(chars,              { opacity: 1, y: 0, duration: 0.06, stagger: 0.04, ease: "power3.out" }, "-=0.2")
      .to(subtitleRef.current,{ opacity: 1, y: 0, duration: 0.7,  ease: "power3.out" }, "-=0.2")
      .to(ctaRef.current,     { opacity: 1, y: 0, duration: 0.6,  ease: "power3.out" }, "-=0.4")
      .to(statsBarRef.current,{ opacity: 1, y: 0, duration: 0.6,  ease: "power3.out" }, "-=0.3");
  }, []);

  // ── Compteur animé sur les chiffres des stats ────────────────────────────
  useEffect(() => {
    const container = statsBarRef.current;
    if (!container) return;

    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      container.querySelectorAll<HTMLElement>(".stat-num").forEach((el) => {
        const target = Number(el.dataset.target ?? 0);
        const proxy  = { n: 0 };
        gsap.to(proxy, {
          n: target,
          duration: 1.5,
          delay: 0.8,
          ease: "power2.out",
          onUpdate() { el.textContent = String(Math.round(proxy.n)); },
        });
      });
    }, { threshold: 0.5 });

    io.observe(container);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(108,99,255,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Canvas grid + vignette */}
      <HeroGrid />

      {/* Hero content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#1E1E1E] bg-[#111] text-[12px] text-[#888] mb-10 opacity-0 translate-y-4"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#6C63FF] animate-pulse" />
          Disponible pour de nouveaux projets
        </div>

        {/* Title */}
        <h1
          ref={containerRef}
          className="text-[clamp(2rem,10vw,7.5rem)] font-bold tracking-tighter leading-none mb-6 text-[#F5F5F5]"
          aria-label={TITLE}
        >
          {TITLE.split("").map((char, idx) => (
            <span
              key={idx}
              className="hero-char"
              style={{ marginRight: char === " " ? "0.3em" : undefined }}
            >
              {char === " " ? " " : char}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-[clamp(1rem,2.5vw,1.35rem)] text-[#888] font-light tracking-wide mb-12 opacity-0 translate-y-4"
        >
          Nous créons votre site web sur mesure et assurons votre visibilité sur Google et les IA.
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 opacity-0 translate-y-4"
        >
          <button
            onClick={() => scrollTo("#contact")}
            className="btn-primary text-[15px] font-medium px-8 py-3.5 rounded-xl w-full sm:w-auto"
          >
            Démarrer un projet →
          </button>
          <button
            onClick={() => scrollTo("#projets")}
            className="btn-secondary text-[15px] font-medium px-8 py-3.5 rounded-xl w-full sm:w-auto"
          >
            Voir nos réalisations
          </button>
        </div>

        {/* Stats bar */}
        <div
          ref={statsBarRef}
          className="inline-flex flex-wrap items-center justify-center gap-x-5 gap-y-2 opacity-0 translate-y-4"
        >
          {([
            { icon: "⚡", label: "Livraison en 3-11 jours" },
            { icon: "★", label: "Top 3 Google visé" },
            { icon: "◈", label: "Cités par ChatGPT & Gemini" },
          ] as const).map((stat, i) => (
            <div key={i} className="flex items-center gap-2">
              {i > 0 && <span className="hidden sm:block w-px h-3 bg-[#2a2a2a]" />}
              <span className="text-[#6C63FF] text-[12px]">{stat.icon}</span>
              <span className="text-[12px] text-[#666]">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-[11px] uppercase tracking-widest text-[#555]">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-[#555] to-transparent" />
      </div>
    </section>
  );
}
