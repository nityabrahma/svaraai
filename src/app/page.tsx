
import ClientsMarquee from "@/components/landing-page/clients-marquee";
import CtaSection from "@/components/landing-page/cta-section";
import FeaturesSection from "@/components/landing-page/features-section";
import HeroSection from "@/components/landing-page/hero-section";
import LandingFooter from "@/components/landing-page/landing-footer";
import LandingHeader from "@/components/landing-page/landing-header";
import PartnersSection from "@/components/landing-page/partners-section";
import PricingSection from "@/components/landing-page/pricing-section";
import StandOutSection from "@/components/landing-page/stand-out-section";
import SystemSection from "@/components/landing-page/system-section";
import TestimonialsSection from "@/components/landing-page/testimonials-section";

export default function Home() {

  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader />
      <main className="flex-grow">
        <HeroSection />
        <PartnersSection />
        <ClientsMarquee />
        <FeaturesSection />
        <SystemSection />
        <StandOutSection />
        <TestimonialsSection />
        <PricingSection />
        <CtaSection />
      </main>
      <LandingFooter />
    </div>
  );
}
