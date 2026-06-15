import { Hero } from "@/components/sections/hero";
import { EmrStrip } from "@/components/sections/emr-strip";
import { PayersStrip } from "@/components/sections/payers-strip";
import { ProviderTrust } from "@/components/sections/provider-trust";
import { ServicesOverview } from "@/components/sections/services-overview";
import { Specialties } from "@/components/sections/specialties";
import { WhyERG } from "@/components/sections/why-erg";
import { WhyOutsource } from "@/components/sections/why-outsource";
import { RevenueCycle } from "@/components/sections/revenue-cycle";
import { Stats } from "@/components/sections/stats";
import { GettingStarted } from "@/components/sections/getting-started";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { ContactCTA } from "@/components/sections/contact-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <EmrStrip />
      <PayersStrip />
      <ServicesOverview />
      <Specialties />
      <ProviderTrust />
      <WhyERG />
      <WhyOutsource />
      <RevenueCycle />
      <Stats />
      <GettingStarted />
      <Testimonials />
      <Faq />
      <ContactCTA />
    </>
  );
}
