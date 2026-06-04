"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROJECT_TYPES = [
  "Site web sur mesure",
  "SEO + GEO",
  "Pack complet (Site + SEO/GEO)",
  "Autre",
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    project: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

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

      gsap.from(formRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");
    try {
      const response = await fetch("https://formspree.io/f/mrevbpyb", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nom: form.name,
          email: form.email,
          type: form.project,
          message: form.message,
        }),
      });
      if (response.ok) {
        setForm({ name: "", email: "", project: "", message: "" });
        setSuccessMsg("Message envoyé ! Nous vous répondons sous 24-48h.");
      } else {
        setErrorMsg("Une erreur est survenue. Contactez-nous directement : parallax.studio.paris@gmail.com");
      }
    } catch {
      setErrorMsg("Une erreur est survenue. Contactez-nous directement : parallax.studio.paris@gmail.com");
    }
    setLoading(false);
  };

  return (
    <section id="contact" ref={sectionRef} className="py-28 px-6 border-t border-[#1E1E1E]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div ref={titleRef} className="mb-16">
          <div className="text-[12px] uppercase tracking-[0.2em] text-[#6C63FF] font-medium mb-4">
            Contact
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-[#F5F5F5] leading-tight">
              Démarrons votre<br />projet ensemble
            </h2>
            <div className="flex flex-col gap-3 max-w-xs">
              <div className="flex items-center gap-3 text-[13px] text-[#666]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1.5C5.5 1.5 3.5 3.5 3.5 6c0 3.5 4.5 8.5 4.5 8.5s4.5-5 4.5-8.5c0-2.5-2-4.5-4.5-4.5z" stroke="#6C63FF" strokeWidth="1.2"/>
                  <circle cx="8" cy="6" r="1.5" stroke="#6C63FF" strokeWidth="1.2"/>
                </svg>
                Rennes, France · Remote worldwide
              </div>
              <div className="flex items-center gap-3 text-[13px] text-[#666]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke="#6C63FF" strokeWidth="1.2"/>
                  <path d="M1.5 5.5l6.5 4 6.5-4" stroke="#6C63FF" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                parallax.studio.paris@gmail.com
              </div>
              <div className="flex items-center gap-3 text-[13px] text-[#666]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6.5" stroke="#6C63FF" strokeWidth="1.2"/>
                  <path d="M8 4.5v3.5l2.5 2.5" stroke="#6C63FF" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                Réponse sous 24–48h
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Main form */}
          <div className="lg:col-span-3">
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[12px] text-[#666] uppercase tracking-wider">
                    Nom
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Pierre Martin"
                    className="form-input rounded-xl px-4 py-3 text-[14px]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[12px] text-[#666] uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="pierre@exemple.fr"
                    className="form-input rounded-xl px-4 py-3 text-[14px]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[12px] text-[#666] uppercase tracking-wider">
                  Type de projet
                </label>
                <select
                  name="project"
                  value={form.project}
                  onChange={handleChange}
                  required
                  className="form-input rounded-xl px-4 py-3 text-[14px] appearance-none cursor-pointer"
                >
                  <option value="" disabled>
                    Sélectionner un type...
                  </option>
                  {PROJECT_TYPES.map((t) => (
                    <option key={t} value={t} className="bg-[#111]">
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[12px] text-[#666] uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Décrivez votre projet, vos objectifs, votre budget..."
                  className="form-input rounded-xl px-4 py-3 text-[14px] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary text-[14px] font-medium px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" strokeDasharray="20 15"/>
                    </svg>
                    Envoi en cours...
                  </>
                ) : (
                  <>Envoyer le message →</>
                )}
              </button>

              {successMsg && (
                <p className="text-[13px] text-emerald-400 font-medium">{successMsg}</p>
              )}
              {errorMsg && (
                <p className="text-[13px] text-red-400">{errorMsg}</p>
              )}
            </form>
          </div>

          {/* Side info */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {[
              {
                title: "Processus en 4 étapes",
                items: [
                  { num: "01", text: "Brief & devis sous 48h" },
                  { num: "02", text: "Design Figma validé" },
                  { num: "03", text: "Développement itératif" },
                  { num: "04", text: "Livraison & formation" },
                ],
              },
            ].map((block) => (
              <div
                key={block.title}
                className="rounded-2xl border border-[#1E1E1E] bg-[#111] p-6"
              >
                <h4 className="text-[13px] font-semibold text-[#F5F5F5] mb-4">
                  {block.title}
                </h4>
                <div className="flex flex-col gap-3">
                  {block.items.map((item) => (
                    <div key={item.num} className="flex items-center gap-3">
                      <span className="text-[11px] font-mono text-[#6C63FF] w-6">
                        {item.num}
                      </span>
                      <div className="flex-1 h-[1px] bg-[#1A1A1A]" />
                      <span className="text-[12px] text-[#666]">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="rounded-2xl border border-[rgba(108,99,255,0.2)] bg-[rgba(108,99,255,0.03)] p-6">
              <div className="text-[11px] uppercase tracking-[0.15em] text-[#6C63FF] mb-2">
                Disponibilité
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[13px] text-[#F5F5F5] font-medium">
                  Disponible pour nouveaux projets
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
