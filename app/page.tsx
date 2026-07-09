import { Metadata } from "next";
import { MotionPageShell } from "@/components/ui/MotionPageShell";
import { HomeTextSplit } from "@/components/home/HomeTextSplit";
import { Hero } from "@/components/home/Hero";
import { ServiceSelector } from "@/components/home/ServiceSelector";
import { Proof } from "@/components/home/Proof";
import { StudyAbroadPreview } from "@/components/home/StudyAbroadPreview";
import { TourismPreview } from "@/components/home/TourismPreview";
import { OmraPreview } from "@/components/home/OmraPreview";
import { HowItWorks } from "@/components/home/HowItWorks";
import { WhyChooseAgency } from "@/components/home/WhyChooseAgency";
import { Testimonials } from "@/components/home/Testimonials";
import { HomeFAQ } from "@/components/home/HomeFAQ";
import { FinalCTA } from "@/components/ui/FinalCTA";
import { routes } from "@/constants/routes";

export const metadata: Metadata = {
  title: "Land Travel | Study Abroad, Tourism & Omra Services",
  description: "Land Travel helps students, families, and pilgrims with admissions, visa dossier reviews, international holiday tours, and Omra reservations.",
};

export default function HomePage() {
  return (
    <MotionPageShell>
      {/* Visual Component Stack */}
      <HomeTextSplit />
      <Hero />
      <ServiceSelector />
      <Proof />
      <StudyAbroadPreview />
      <TourismPreview />
      <OmraPreview />
      <HowItWorks />
      <WhyChooseAgency />
      <Testimonials />
      <HomeFAQ />
      
      {/* Page Ending Call to Action */}
      <FinalCTA
        title="Ready to Start Your Next Adventure?"
        description="Get in touch with our expert advisors to prepare your study application, book a flight, or choose a holiday package."
        primaryLabel="Contact Us"
        primaryHref={routes.contact}
        secondaryLabel="Learn About Us"
        secondaryHref={routes.about}
      />
    </MotionPageShell>
  );
}
