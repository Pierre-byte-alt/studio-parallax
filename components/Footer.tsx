"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FOOTER_LINKS = {
  Services: [
    { label: "Site web sur mesure", href: "#services" },
    { label: "SEO + GEO", href: "#services" },
    { label: "Pack complet", href: "#services" },
  ],
  Entreprise: [
    { label: "Projets", href: "#projets" },
    { label: "Tarifs", href: "#tarifs" },
    { label: "Contact", href: "#contact" },
  ],
};

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(footerRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 95%",
          toggleActions: "play none none none",
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer ref={footerRef} className="border-t border-[#1E1E1E] px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-md bg-[#6C63FF] flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="1" y="1" width="5" height="5" rx="1" fill="white" opacity="0.9"/>
                  <rect x="8" y="1" width="5" height="5" rx="1" fill="white" opacity="0.5"/>
                  <rect x="1" y="8" width="5" height="5" rx="1" fill="white" opacity="0.5"/>
                  <rect x="8" y="8" width="5" height="5" rx="1" fill="white" opacity="0.9"/>
                </svg>
              </div>
              <span className="font-semibold text-[15px] tracking-tight text-[#F5F5F5]">
                Studio Parallax
              </span>
            </div>
            <p className="text-[11px] text-[#6C63FF] font-medium tracking-wider mb-3">
              SEO · GEO · Création web
            </p>
            <p className="text-[13px] text-[#555] leading-relaxed max-w-xs">
              Nous créons des sites web sur mesure et assurons votre visibilité sur Google et les IA.
            </p>
            <div className="flex gap-3 mt-6">
              {/* Twitter/X */}
              <a
                href="#"
                className="w-8 h-8 rounded-lg border border-[#1E1E1E] bg-[#111] flex items-center justify-center text-[#555] hover:text-[#F5F5F5] hover:border-[#333] transition-all duration-200"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1l5 6.5L1 13h1.5l4-4.5L10.5 13H13L7.7 6.2 12.5 1H11L6.7 5.2 3 1H1z" fill="currentColor"/>
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href="#"
                className="w-8 h-8 rounded-lg border border-[#1E1E1E] bg-[#111] flex items-center justify-center text-[#555] hover:text-[#F5F5F5] hover:border-[#333] transition-all duration-200"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="1" y="4.5" width="2.5" height="8.5" fill="currentColor"/>
                  <circle cx="2.25" cy="2.25" r="1.5" fill="currentColor"/>
                  <path d="M5.5 4.5h2.5v1.2c.5-.8 1.5-1.4 2.5-1.4 2 0 3 1.3 3 3.5V13h-2.5V8.2c0-1-.4-1.7-1.4-1.7-.8 0-1.3.6-1.6 1.1V13H5.5V4.5z" fill="currentColor"/>
                </svg>
              </a>
              {/* GitHub */}
              <a
                href="#"
                className="w-8 h-8 rounded-lg border border-[#1E1E1E] bg-[#111] flex items-center justify-center text-[#555] hover:text-[#F5F5F5] hover:border-[#333] transition-all duration-200"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 .5A6.5 6.5 0 00.5 7c0 2.9 1.9 5.4 4.5 6.3.3.05.4-.15.4-.3v-1.1c-1.7.4-2.1-.8-2.1-.8-.3-.7-.7-1-.7-1-.6-.4 0-.4 0-.4.6.05 1 .6 1 .6.6 1 1.5.7 1.9.55.05-.4.2-.7.4-.85-1.4-.15-2.8-.7-2.8-3 0-.65.25-1.2.6-1.6-.05-.15-.25-.8.1-1.6 0 0 .5-.15 1.65.6.45-.15.95-.2 1.45-.2s1 .05 1.45.2c1.15-.75 1.65-.6 1.65-.6.35.8.15 1.45.1 1.6.35.4.6.95.6 1.6 0 2.3-1.4 2.85-2.8 3 .2.2.4.55.4 1.1v1.6c0 .15.1.35.4.3A6.5 6.5 0 0013.5 7 6.5 6.5 0 007 .5z" fill="currentColor"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-[12px] uppercase tracking-[0.15em] text-[#555] font-medium mb-4">
                {title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => scrollTo(link.href)}
                      className="text-[13px] text-[#888] hover:text-[#F5F5F5] transition-colors duration-200"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#1A1A1A] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-[#444]">
            © 2026 Studio Parallax. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[12px] text-[#444] hover:text-[#888] transition-colors">
              Mentions légales
            </a>
            <a href="#" className="text-[12px] text-[#444] hover:text-[#888] transition-colors">
              Politique de confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
