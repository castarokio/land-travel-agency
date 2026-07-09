import { Eye, ShieldCheck, Heart, Award } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";

export function MissionValues() {
  const values = [
    {
      title: "Absolute Integrity",
      description: "No hidden charges, realistic admission assessments, and honest visa success rate expectations from day one.",
      icon: ShieldCheck,
      color: "text-indigo-600 bg-indigo-50",
    },
    {
      title: "Academic & Travel Excellence",
      description: "Certified consultants and meticulously reviewed consular checklists to deliver elite travel files.",
      icon: Award,
      color: "text-pink bg-pink-50",
    },
    {
      title: "Dedicated Guidance",
      description: "End-to-end follow-up from university shortlisting or flights booking to post-arrival support.",
      icon: Heart,
      color: "text-orange bg-orange-50",
    },
    {
      title: "Total Transparency",
      description: "Clear workflow reporting, direct communications, and direct opening of inquires in WhatsApp.",
      icon: Eye,
      color: "text-emerald-600 bg-emerald-50",
    },
  ];

  return (
    <section className="py-20 bg-cream/10 relative overflow-hidden">
      <Container>
        <SectionHeader
          label="Our Foundation"
          title="Mission & Core Values"
          description="We guide every traveler and student with a values-driven approach that prioritizes security and success."
          align="center"
          className="mx-auto mb-16"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((val, idx) => {
            const Icon = val.icon;

            return (
              <Card key={idx} className="p-6 bg-white flex flex-col items-start" hoverable={true}>
                <div className={`p-3 rounded-2xl mb-5 ${val.color}`}>
                  <Icon className="w-6 h-6 shrink-0" />
                </div>
                <h3 className="text-lg font-bold text-text mb-2">
                  {val.title}
                </h3>
                <p className="text-xs text-muted leading-relaxed">
                  {val.description}
                </p>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
