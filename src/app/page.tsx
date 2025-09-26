import { BentoSection } from "@/components/sections/bento-section";
import { CTASection } from "@/components/sections/cta-section";
import { FAQSection } from "@/components/sections/faq-section";
import { FeatureSection } from "@/components/sections/feature-section";
import { FooterSection } from "@/components/sections/footer-section";
import { GrowthSection } from "@/components/sections/growth-section";
import { HeroSection } from "@/components/sections/hero-section";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center divide-y divide-border min-h-screen w-full">
      <HeroSection />
      {/* <CompanyShowcase /> */}
      <BentoSection />
      {/* <QuoteSection /> */}
      <FeatureSection />
      <GrowthSection />
      {/* <PricingSection /> */}
      {/* <TestimonialSection /> */}
      <FAQSection />
      <CTASection />
      <FooterSection />
    </main>
  );
}
