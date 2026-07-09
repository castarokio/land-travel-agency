import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";

export function WhatWeDo() {
  const categories = [
    {
      title: "Global Academic Consulting",
      desc: "Helping students access universities globally with secure files, Campus France checks, and block account support.",
      bullets: ["University shortlisting", "Visa file auditing", "Block account guidance", "Translation coordination"],
    },
    {
      title: "Custom Tour Management",
      desc: "Designing tailored itineraries, flight bookings, and local guide reservations for international and local destinations.",
      bullets: ["Itinerary construction", "Hotel vouchers", "Flight ticket validation", "Sahara desert excursions"],
    },
    {
      title: "Religious Travel Coordination",
      desc: "Delivering group and private Omra packages with hotels close to Haram, transit support, and Ziyarat guides.",
      bullets: ["Omra visa handling", "Group transport scheduling", "Makkah & Madinah hotels", "Spiritual guidance"],
    },
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <Container>
        <SectionHeader
          label="Corporate Overview"
          title="What We Do"
          description="We consolidate travel coordination, academic admissions, and spiritual tours into structured, easy-to-manage folders."
          align="center"
          className="mx-auto mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <Card key={idx} className="p-8 border border-border flex flex-col justify-between" hoverable={true}>
              <div>
                <h3 className="text-xl font-bold text-text mb-3">
                  {cat.title}
                </h3>
                <p className="text-xs text-muted leading-relaxed mb-6">
                  {cat.desc}
                </p>
                <ul className="space-y-2 mb-6">
                  {cat.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-center gap-2 text-xs text-muted/90">
                      <Check className="w-4 h-4 text-primary shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
