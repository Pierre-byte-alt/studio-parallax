import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://studio-parallax.vercel.app";

export const metadata: Metadata = {
  title: "Studio Parallax — Création de sites web premium & SEO/GEO à Rennes",
  description:
    "Studio Parallax crée des sites web premium avec animations sur mesure et optimise votre visibilité sur Google, ChatGPT, Gemini et Perplexity. Livraison en 5 jours. Basé à Rennes.",
  keywords: [
    "création site web Rennes",
    "développeur web freelance",
    "SEO Rennes",
    "GEO optimisation IA",
    "site web premium animations",
  ],
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    google: "PV9bauj4yW_-if1M3Fu78lYohH8LKBwK_bXYfeujFP8",
  },
  openGraph: {
    title: "Studio Parallax — Création de sites web premium & SEO/GEO à Rennes",
    description:
      "Studio Parallax crée des sites web premium avec animations sur mesure et optimise votre visibilité sur Google, ChatGPT, Gemini et Perplexity. Livraison en 5 jours. Basé à Rennes.",
    url: siteUrl,
    type: "website",
  },
};

const schemaOrg = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Studio Parallax",
  description:
    "Développeur web freelance spécialisé dans la création de sites web premium et l'optimisation SEO/GEO pour les moteurs de recherche et les IA.",
  url: siteUrl,
  email: "parallax.studio.paris@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Rennes",
    addressCountry: "FR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </body>
    </html>
  );
}
