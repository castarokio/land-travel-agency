import { Metadata } from "next";
import { MotionPageShell } from "@/components/ui/MotionPageShell";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ServiceCategoryGrid } from "@/components/services/ServiceCategoryGrid";
import { ServiceComparison } from "@/components/services/ServiceComparison";
import { GeneralJourney } from "@/components/services/GeneralJourney";
import { WhyChooseAgency } from "@/components/home/WhyChooseAgency";
import { ServicesFAQ } from "@/components/services/ServicesFAQ";
import { FinalCTA } from "@/components/ui/FinalCTA";
import { routes } from "@/constants/routes";

export const metadata: Metadata = {
  title: "Our Departments & Services | Land Travel Agency",
  description: "Explore the core departments of Land Travel: Study Abroad Consulting, Custom Tourism, and Omra Pilgrimages.",
};

export default function ServicesPage() {
  return (
    <MotionPageShell>
      {/* Visual Component Stack */}
      <ServicesHero />
      <ServiceCategoryGrid />
      <ServiceComparison />
      <GeneralJourney />
      <WhyChooseAgency />
      <ServicesFAQ />
      
      {/* Page Ending CTA */}
      <FinalCTA
        title="Need Specialized Consulting?"
        description="Book a detailed academic assessment or custom itinerary review session with one of our specialized travel advisors."
        primaryLabel="Schedule Inquiry"
        primaryHref={routes.contact}
        secondaryLabel="Return Home"
        secondaryHref={routes.home}
      />
    </MotionPageShell>
  );
}
