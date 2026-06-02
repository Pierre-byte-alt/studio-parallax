import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Studio Parallax — Sites web premium · SEO · GEO",
  description:
    "Studio web freelance spécialisé dans la création de sites web premium avec animations GSAP, SEO technique et GEO (optimisation pour les IA de recherche).",
  keywords: [
    "studio web",
    "création site web premium",
    "freelance",
    "Next.js",
    "SEO",
    "GEO",
    "animations GSAP",
  ],
  openGraph: {
    title: "Studio Parallax — Sites web premium",
    description:
      "Création de sites web premium avec animations et services SEO/GEO.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="antialiased">{children}</body>
    </html>
  );
}
