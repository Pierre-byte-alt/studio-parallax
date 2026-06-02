"use client";

import { useLenis } from "@/lib/useLenis";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import SeoGeoWhy from "@/components/SeoGeoWhy";
import Projects from "@/components/Projects";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  useLenis();

  return (
    <main className="bg-[#0A0A0A] min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <SeoGeoWhy />
      <Projects />
      <Pricing />
      <Contact />
      <Footer />
    </main>
  );
}
