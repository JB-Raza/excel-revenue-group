import { Hero } from "@/components/sections/hero";
import { ServicesOverview } from "@/components/sections/services-overview";
import { WhyERG } from "@/components/sections/why-erg";
import { RevenueCycle } from "@/components/sections/revenue-cycle";
import { Stats } from "@/components/sections/stats";
import { Testimonials } from "@/components/sections/testimonials";
import { ContactCTA } from "@/components/sections/contact-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <WhyERG />
      <RevenueCycle />
      <Stats />
      <Testimonials />
      <ContactCTA />
    </>
  );
}
