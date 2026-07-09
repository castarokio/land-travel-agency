import { Metadata } from "next";
import { MotionPageShell } from "@/components/ui/MotionPageShell";
import { AboutHero } from "@/components/about/AboutHero";
import { AgencyStory } from "@/components/about/AgencyStory";
import { MissionValues } from "@/components/about/MissionValues";
import { WhatWeDo } from "@/components/about/WhatWeDo";
import { TrustStats } from "@/components/about/TrustStats";
import { TeamSection } from "@/components/about/TeamSection";
import { PartnersSection } from "@/components/about/PartnersSection";
import { FinalCTA } from "@/components/ui/FinalCTA";
import { routes } from "@/constants/routes";

export const metadata: Metadata = {
  title: "About Us | Land Travel Agency",
  description: "Learn about the mission, values, story, and advisors of Land Travel, based in Tizi Ouzou, Algeria.",
};

export default function AboutPage() {
  return (
    <MotionPageShell>
      {/* About Component Stack */}
      <AboutHero />
      <AgencyStory />
      <MissionValues />
      <WhatWeDo />
      <TrustStats />
      <TeamSection />
      <PartnersSection />
      
      {/* Page Ending CTA */}
      <FinalCTA
        title="Ready to Connect With Our Advisors?"
        description="Book a detailed consulting session or request a holiday tour itinerary built specifically for your budget."
        primaryLabel="Submit Online Inquiry"
        primaryHref={routes.contact}
        secondaryLabel="Explore Services"
        secondaryHref={routes.services}
      />
    </MotionPageShell>
  );
}
