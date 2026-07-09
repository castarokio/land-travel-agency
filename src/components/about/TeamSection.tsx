import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";

export function TeamSection() {
  const team = [
    {
      name: "El Hadj Belkacem",
      role: "Founder & Managing Director",
      bio: "Overseeing general operations and spiritual coordination for all Omra pilgrim travel folders.",
    },
    {
      name: "Dr. Sofia Merah",
      role: "Director of Academic Consulting",
      bio: "Former university lecturer specializing in Campus France dossiers, block accounts, and student visa audits.",
    },
    {
      name: "Riad Kaced",
      role: "Head of Tourism & Travel Desk",
      bio: "Over 8 years organizing bespoke international escapes and trekking logistics in the Sahara (Djanet).",
    },
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <Container>
        <SectionHeader
          label="Our Advisors"
          title="The Management Team"
          description="Experienced travel directors and academic advisors committed to managing your applications and itineraries."
          align="center"
          className="mx-auto mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, idx) => (
            <Card key={idx} className="p-8 border border-border flex flex-col justify-between" hoverable={true}>
              <div>
                <span className="block text-[10px] uppercase tracking-wider text-primary font-bold mb-1">
                  {member.role}
                </span>
                
                <h3 className="text-xl font-bold text-text mb-4">
                  {member.name}
                </h3>
                
                <p className="text-xs text-muted leading-relaxed">
                  {member.bio}
                </p>
              </div>

              <div className="w-8 h-1 bg-pink rounded-full mt-6" />
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
