"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    name: "Mørk",
    category: "E-commerce premium",
    desc: "Boutique de mobilier scandinave haut de gamme. Design minimaliste, animations parallaxe, panier optimisé pour la conversion.",
    tags: ["Next.js", "Shopify", "GSAP", "SEO"],
    metrics: [
      { value: "+68%", label: "Conversion" },
      { value: "98", label: "Perf. score" },
    ],
    gradient: "from-[#1a1a2e] via-[#16213e] to-[#0f3460]",
    accentColor: "#4ECDC4",
    year: "2025",
  },
  {
    name: "Syntra",
    category: "Interface SaaS",
    desc: "Dashboard analytique pour équipes marketing. Visualisations temps réel, design system complet, onboarding guidé.",
    tags: ["React", "TypeScript", "Design System"],
    metrics: [
      { value: "+40%", label: "Rétention" },
      { value: "4.9", label: "Note client" },
    ],
    gradient: "from-[#0d0d1a] via-[#1a0a2e] to-[#2d1b69]",
    accentColor: "#9B97FF",
    year: "2025",
  },
];

export default function Projects() {
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

      const cards = cardsRef.current?.querySelectorAll(".project-card");
      if (cards) {
        gsap.from(cards, {
          opacity: 0,
          y: 60,
          duration: 0.8,
          stagger: 0.15,
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
    <section id="projets" ref={sectionRef} className="py-28 px-6 border-t border-[#1E1E1E]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div ref={titleRef} className="mb-16">
          <div className="text-[12px] uppercase tracking-[0.2em] text-[#6C63FF] font-medium mb-4">
            Projets
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-[#F5F5F5] leading-tight">
              Réalisations<br />récentes
            </h2>
            <p className="text-[#888] text-[15px] max-w-xs leading-relaxed">
              Chaque projet est une collaboration unique, pensée pour performer.
            </p>
          </div>
        </div>

        {/* Projects grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project) => (
            <div
              key={project.name}
              className="project-card group relative rounded-2xl overflow-hidden border border-[#1E1E1E] cursor-pointer"
              style={{ transition: "border-color 0.3s ease" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  "rgba(108,99,255,0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "#1E1E1E";
              }}
            >
              {/* Visual area */}
              <div
                className={`relative h-[220px] bg-gradient-to-br ${project.gradient} overflow-hidden`}
              >
                {/* Decorative elements */}
                <div
                  className="absolute top-6 left-6 w-24 h-1 rounded-full opacity-40"
                  style={{ background: project.accentColor }}
                />
                <div
                  className="absolute top-12 left-6 w-16 h-1 rounded-full opacity-20"
                  style={{ background: project.accentColor }}
                />
                <div
                  className="absolute bottom-8 right-8 w-32 h-32 rounded-full opacity-10"
                  style={{
                    background: `radial-gradient(circle, ${project.accentColor}, transparent)`,
                  }}
                />
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-xl border opacity-10 rotate-12 transition-transform duration-500 group-hover:rotate-45"
                  style={{ borderColor: project.accentColor }}
                />

                {/* Project name overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                  <span
                    className="text-5xl font-black tracking-tighter opacity-20"
                    style={{ color: project.accentColor }}
                  >
                    {project.name}
                  </span>
                </div>

                {/* Year badge */}
                <div className="absolute top-4 right-4 text-[11px] text-[#555] border border-[#2a2a2a] px-2 py-1 rounded-md bg-black/40 backdrop-blur-sm">
                  {project.year}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 bg-[#111]">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.15em] text-[#555] mb-1">
                      {project.category}
                    </div>
                    <h3 className="text-xl font-bold text-[#F5F5F5]">
                      {project.name}
                    </h3>
                  </div>
                  {/* Arrow */}
                  <div className="w-8 h-8 rounded-full border border-[#2a2a2a] flex items-center justify-center text-[#555] transition-all duration-300 group-hover:border-[#6C63FF] group-hover:text-[#6C63FF]">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>

                <p className="text-[#666] text-[13px] leading-relaxed mb-4">
                  {project.desc}
                </p>

                {/* Metrics */}
                <div className="flex gap-4 mb-4 pb-4 border-b border-[#1A1A1A]">
                  {project.metrics.map((m) => (
                    <div key={m.label}>
                      <div
                        className="text-lg font-bold"
                        style={{ color: project.accentColor }}
                      >
                        {m.value}
                      </div>
                      <div className="text-[11px] text-[#555]">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-[#1A1A1A] text-[#555]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
