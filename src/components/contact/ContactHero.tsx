import { PageHero } from "@/components/ui/PageHero";

export function ContactHero() {
  return (
    <PageHero
      title="Contact Land Travel"
      subtitle="Have questions about admissions, tours, or pilgrimage reservations? We are here to help you step-by-step."
      backgroundImage="/assets/hero-contact-banner.jpg" // Fallback to premium background gradient
    />
  );
}
