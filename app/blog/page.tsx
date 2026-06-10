import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import BlogNavbar from "@/components/BlogNavbar";

export const metadata: Metadata = {
  title: "Blog — Studio Parallax | Conseils SEO, Création Web & GEO à Rennes",
  description:
    "Articles et conseils sur la création de sites web, le SEO, le GEO et l'optimisation pour les IA. Par Studio Parallax, développeur web freelance à Rennes.",
  alternates: {
    canonical: "https://studio-parallax.vercel.app/blog",
  },
  openGraph: {
    title: "Blog — Studio Parallax | Conseils SEO, Création Web & GEO",
    description:
      "Articles et conseils sur la création de sites web, le SEO, le GEO et l'optimisation pour les IA.",
    url: "https://studio-parallax.vercel.app/blog",
    type: "website",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="bg-[#0A0A0A] min-h-screen">
      <BlogNavbar />

      <div className="max-w-6xl mx-auto px-6 pt-32 pb-24">
        {/* Header */}
        <div className="mb-16">
          <div className="text-[12px] uppercase tracking-[0.2em] text-[#6C63FF] font-medium mb-4">
            Blog
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h1 className="text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-[#F5F5F5] leading-tight">
              Conseils & ressources<br />SEO, GEO et création web
            </h1>
            <p className="text-[#888] text-[15px] max-w-xs leading-relaxed">
              Des articles pratiques pour développer votre présence en ligne à Rennes et au-delà.
            </p>
          </div>
        </div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group rounded-2xl border border-[#1E1E1E] bg-[#111] overflow-hidden hover:border-[rgba(108,99,255,0.4)] transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              {/* Gradient placeholder */}
              <div
                className={`relative h-44 bg-gradient-to-br ${post.gradient} overflow-hidden shrink-0`}
              >
                <div
                  className="absolute top-5 left-5 w-20 h-1 rounded-full opacity-40"
                  style={{ background: post.accentColor }}
                />
                <div
                  className="absolute top-9 left-5 w-12 h-1 rounded-full opacity-20"
                  style={{ background: post.accentColor }}
                />
                <div
                  className="absolute bottom-6 right-6 w-24 h-24 rounded-full opacity-10"
                  style={{
                    background: `radial-gradient(circle, ${post.accentColor}, transparent)`,
                  }}
                />
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-xl border opacity-10 rotate-12 transition-transform duration-500 group-hover:rotate-45"
                  style={{ borderColor: post.accentColor }}
                />
                <div className="absolute top-3 right-3 text-[11px] text-[#555] border border-[#2a2a2a] px-2 py-1 rounded-md bg-black/40 backdrop-blur-sm">
                  {post.readingTime} min
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-[11px] text-[#555] mb-3">
                  <time dateTime={post.isoDate}>{post.date}</time>
                  <span>·</span>
                  <span>{post.readingTime} min de lecture</span>
                </div>

                <h2 className="text-[15px] font-semibold text-[#F5F5F5] leading-snug mb-3 group-hover:text-[#9B97FF] transition-colors duration-200 flex-1">
                  {post.title}
                </h2>

                <p className="text-[13px] text-[#666] leading-relaxed mb-5 line-clamp-2">
                  {post.excerpt}
                </p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-[13px] text-[#6C63FF] hover:text-[#9B97FF] transition-colors duration-200 font-medium mt-auto"
                >
                  Lire l&apos;article
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Back to site */}
        <div className="mt-16 pt-8 border-t border-[#1E1E1E] text-center">
          <a
            href="/#contact"
            className="btn-primary text-[14px] font-medium px-6 py-3 rounded-xl inline-flex items-center gap-2"
          >
            Démarrer un projet →
          </a>
        </div>
      </div>
    </main>
  );
}
