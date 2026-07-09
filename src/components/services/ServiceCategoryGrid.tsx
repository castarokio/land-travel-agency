import { GraduationCap, Compass } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { routes } from "@/constants/routes";

export function ServiceCategoryGrid() {
  const departments = [
    {
      title: "Study Abroad Department",
      label: "Education Consulting",
      description: "Get certified assistance for European, Asian, and Canadian university admissions. We review school records, draft letters, handle translation procedures, coordinate block accounts, and build complete student visa dossiers.",
      features: [
        "Personalized shortlist of target countries",
        "Official Campus France file auditing",
        "Block account setup support (Germany)",
        "Language test guidelines & schedules",
      ],
      icon: GraduationCap,
      href: routes.studyAbroad,
      cta: "Explore Study Abroad",
      color: "border-purple-200 bg-purple-50/20 text-purple-800",
    },
    {
      title: "Tourism & Travel Department",
      label: "Custom Tours & Flights",
      description: "Discover bespoke travel packages. From stunning tropical beach resorts in the Maldives to active historical tours in Europe and Japan, alongside local trekking and desert camping in Djanet, Algeria.",
      features: [
        "Custom itinerary mapping & pricing",
        "International regular flight tickets",
        "Local guides & 4x4 logistics (Sahara)",
        "Hotel booking (3-star, 4-star, 5-star)",
      ],
      icon: Compass,
      href: routes.tourism,
      cta: "Explore Holiday Tours",
      color: "border-orange-200 bg-orange-50/20 text-orange",
    },
    {
      title: "Omra Pilgrimage Department",
      label: "Spiritual Pilgrimages",
      description: "Embark on a worry-free spiritual journey. Our specialized department handles visa processing, luxury hotel bookings immediately adjacent to Haram, tourist bus transfers, and historical ziyarat tours.",
      features: [
        "Direct flights & visa processing",
        "Close-to-Haram hotels in Makkah & Madinah",
        "VIP private GMC transport options",
        "Accompanying spiritual advisors",
      ],
      icon: Compass,
      href: routes.omra,
      cta: "Explore Omra Formulas",
      color: "border-emerald-200 bg-emerald-50/20 text-emerald-800",
    },
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <Container>
        <SectionHeader
          label="Our Departments"
          title="Bespoke Solutions by Specialized Divisions"
          description="Each department at Land Travel features certified consultants and advisors focused on delivering excellence."
          align="center"
          className="mx-auto mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {departments.map((dept, idx) => {
            const Icon = dept.icon;

            return (
              <Card
                key={idx}
                className="flex flex-col h-full p-8 justify-between border-2 border-border"
                hoverable={true}
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className={`inline-block text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full mb-6 border ${dept.color}`}>
                    {dept.label}
                  </span>

                  <h3 className="text-2xl font-bold text-text mb-4">
                    {dept.title}
                  </h3>

                  <p className="text-sm text-muted/95 leading-relaxed mb-6">
                    {dept.description}
                  </p>

                  <ul className="space-y-2 mb-8">
                    {dept.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2 text-xs font-semibold text-muted">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button href={dept.href} variant="primary" className="w-full">
                  {dept.cta}
                </Button>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
