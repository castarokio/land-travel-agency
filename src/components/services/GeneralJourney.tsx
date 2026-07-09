import { UserCheck, Compass, FileCheck, ClipboardCheck, PlaneTakeoff } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";

export function GeneralJourney() {
  const steps = [
    {
      title: "Profile Analysis",
      description: "Our experts evaluate your academic transcripts, travel history, or pilgrimage expectations to build a clear roadmap.",
      icon: UserCheck,
      color: "text-indigo-600 bg-indigo-50",
    },
    {
      title: "Bespoke shortlisting",
      description: "Receive a tailored list of target countries, specific holiday packages, or Omra dates suited to your expectations.",
      icon: Compass,
      color: "text-orange bg-orange-50",
    },
    {
      title: "Dossier Compilation",
      description: "We handle translations, university letters, flight reservations, and block account files step-by-step.",
      icon: FileCheck,
      color: "text-purple-600 bg-purple-50",
    },
    {
      title: "Consular Audit",
      description: "We double-check every item on your visa checklist and conduct mock interview simulations to maximize success.",
      icon: ClipboardCheck,
      color: "text-pink bg-pink-50",
    },
    {
      title: "Final Departure",
      description: "Recieve final travel briefings, flight updates, accommodation details, and access to our H24 helpline support.",
      icon: PlaneTakeoff,
      color: "text-emerald-600 bg-emerald-50",
    },
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <Container>
        <SectionHeader
          label="Your Roadmap"
          title="The Land Travel Customer Journey"
          description="We provide comprehensive support at every milestone of your academic application or travel booking."
          align="center"
          className="mx-auto mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;

            return (
              <Card
                key={idx}
                className="p-6 flex flex-col h-full border border-border justify-between relative"
                hoverable={true}
              >
                <div>
                  {/* Step Number Tag */}
                  <span className="absolute top-4 right-4 text-3xl font-extrabold text-neutral-100 select-none">
                    0{idx + 1}
                  </span>

                  <div className={`p-3 rounded-2xl w-fit mb-5 ${step.color}`}>
                    <Icon className="w-6 h-6 shrink-0" />
                  </div>

                  <h3 className="text-lg font-bold text-text mb-2">
                    {step.title}
                  </h3>
                </div>

                <p className="text-xs text-muted leading-relaxed mt-4">
                  {step.description}
                </p>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
