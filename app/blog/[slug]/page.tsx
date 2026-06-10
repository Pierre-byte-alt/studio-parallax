import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getRelatedPosts, getAllPosts, type ContentBlock } from "@/lib/posts";
import BlogNavbar from "@/components/BlogNavbar";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  const url = `https://studio-parallax.vercel.app/blog/${post.slug}`;
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url,
      type: "article",
      publishedTime: post.isoDate,
    },
  };
}

function renderBlock(block: ContentBlock, idx: number) {
  switch (block.type) {
    case "h2":
      return (
        <h2
          key={idx}
          className="text-[1.35rem] font-bold text-[#F5F5F5] mt-10 mb-4 leading-snug"
        >
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3
          key={idx}
          className="text-[1.1rem] font-semibold text-[#D8D8D8] mt-7 mb-3 leading-snug"
        >
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p key={idx} className="text-[#999] text-[15px] leading-[1.85] mb-5">
          {block.text}
        </p>
      );
    case "ul":
      return (
        <ul key={idx} className="mb-5 flex flex-col gap-2.5 pl-1">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-[14px] text-[#999] leading-relaxed">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#6C63FF] shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      );
  }
}

export default function ArticlePage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const related = getRelatedPosts(params.slug);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.isoDate,
    author: {
      "@type": "Person",
      name: "Studio Parallax",
      url: "https://studio-parallax.vercel.app",
    },
    publisher: {
      "@type": "Organization",
      name: "Studio Parallax",
      url: "https://studio-parallax.vercel.app",
    },
  };

  return (
    <main className="bg-[#0A0A0A] min-h-screen">
      <BlogNavbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="max-w-2xl mx-auto px-6 pt-32 pb-24">
        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[13px] text-[#555] hover:text-[#888] transition-colors mb-10"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M10 2L4 7l6 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Blog
        </Link>

        {/* Header */}
        <header className="mb-10">
          <div className="text-[12px] uppercase tracking-[0.2em] text-[#6C63FF] font-medium mb-4">
            Article
          </div>
          <h1 className="text-[clamp(1.6rem,4vw,2.4rem)] font-bold text-[#F5F5F5] leading-tight mb-6">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-[12px] text-[#555]">
            <time dateTime={post.isoDate}>{post.date}</time>
            <span className="w-px h-3 bg-[#2a2a2a]" />
            <span>{post.readingTime} min de lecture</span>
          </div>
        </header>

        {/* Separator */}
        <div className="border-t border-[#1E1E1E] mb-10" />

        {/* Article content */}
        <div className="prose-blog">
          {post.blocks.map((block, idx) => renderBlock(block, idx))}
        </div>

        {/* CTA */}
        <div className="mt-14 p-6 rounded-2xl border border-[rgba(108,99,255,0.3)] bg-[rgba(108,99,255,0.04)]">
          <p className="text-[14px] text-[#888] mb-4 leading-relaxed">
            Envie de travailler avec Studio Parallax sur votre site ou votre référencement SEO/GEO à Rennes ?
          </p>
          <a
            href="/#contact"
            className="btn-primary text-[13px] font-medium px-5 py-2.5 rounded-lg inline-block"
          >
            Demander un devis gratuit →
          </a>
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <section className="mt-16 pt-10 border-t border-[#1E1E1E]">
            <h2 className="text-[18px] font-bold text-[#F5F5F5] mb-8">
              Articles similaires
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  className="group block rounded-xl border border-[#1E1E1E] bg-[#111] p-5 hover:border-[rgba(108,99,255,0.4)] transition-all duration-300"
                >
                  <div className="text-[11px] text-[#555] mb-2 flex items-center gap-2">
                    <time dateTime={rel.isoDate}>{rel.date}</time>
                    <span>·</span>
                    <span>{rel.readingTime} min</span>
                  </div>
                  <p className="text-[14px] font-semibold text-[#D8D8D8] leading-snug group-hover:text-[#9B97FF] transition-colors duration-200">
                    {rel.title}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
