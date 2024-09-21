import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { BlogSection } from "@/components/sections/blog-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function LandingPage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <PricingSection />
      <BlogSection />
      <ContactSection />
    </main>
  );
}
