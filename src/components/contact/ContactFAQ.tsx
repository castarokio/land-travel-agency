import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FAQ } from "@/components/ui/FAQ";
import { contactFaqs } from "@/data/faqs";

export function ContactFAQ() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <Container>
        <SectionHeader
          label="FAQ"
          title="Contact Frequently Asked Questions"
          description="Have questions about office hours, distance consulting, or document submission? Find answers below."
          align="center"
          className="mx-auto mb-16"
        />

        <FAQ items={contactFaqs} />
      </Container>
    </section>
  );
}
