import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FAQ } from "@/components/ui/FAQ";
import { homeFaqs } from "@/data/faqs";

export function ServicesFAQ() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <Container>
        <SectionHeader
          label="FAQ"
          title="Services Frequently Asked Questions"
          description="Find quick answers to common questions about our service departments, consulting fees, and bookings."
          align="center"
          className="mx-auto mb-16"
        />

        <FAQ items={homeFaqs} />
      </Container>
    </section>
  );
}
