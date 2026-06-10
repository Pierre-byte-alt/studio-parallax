"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "Projets", href: "/#projets" },
  { label: "Blog", href: "/blog" },
  { label: "Tarifs", href: "/#tarifs" },
  { label: "Contact", href: "/#contact" },
];

export default function BlogNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[#1E1E1E]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 group">
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
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/blog" &&
                (typeof window !== "undefined"
                  ? window.location.pathname.startsWith("/blog")
                  : false);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`nav-link text-[14px] transition-colors duration-200 font-medium ${
                    isActive ? "text-[#6C63FF]" : "text-[#888] hover:text-[#F5F5F5]"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-4">
            <a
              href="/#contact"
              className="hidden md:inline-flex btn-primary text-[13px] font-medium px-4 py-2 rounded-lg"
            >
              Démarrer un projet
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col gap-[5px] p-1"
              aria-label="Menu"
            >
              <span
                className={`block w-5 h-[1.5px] bg-[#F5F5F5] transition-all duration-300 origin-center ${
                  menuOpen ? "rotate-45 translate-y-[6.5px]" : ""
                }`}
              />
              <span
                className={`block w-5 h-[1.5px] bg-[#F5F5F5] transition-all duration-300 ${
                  menuOpen ? "opacity-0 scale-x-0" : ""
                }`}
              />
              <span
                className={`block w-5 h-[1.5px] bg-[#F5F5F5] transition-all duration-300 origin-center ${
                  menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`mobile-menu fixed inset-0 z-40 bg-[#0A0A0A] flex flex-col justify-center items-center gap-8 md:hidden ${
          menuOpen ? "open" : ""
        }`}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className="text-2xl font-semibold text-[#F5F5F5] hover:text-[#6C63FF] transition-colors duration-200"
          >
            {link.label}
          </a>
        ))}
        <a
          href="/#contact"
          className="btn-primary text-[15px] font-medium px-6 py-3 rounded-lg mt-4"
        >
          Démarrer un projet
        </a>
      </div>
    </>
  );
}
