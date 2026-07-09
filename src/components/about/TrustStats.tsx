import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { stats } from "@/data/stats";

export function TrustStats() {
  return (
    <section className="py-20 bg-cream/10 relative overflow-hidden">
      <Container>
        <SectionHeader
          label="Track Record"
          title="Numbers That Define Our Commitment"
          description="Behind every number is a student settling into a new city, a family enjoying a vacation, or a pilgrim completing a spiritual journey."
          align="center"
          className="mx-auto mb-16"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white border border-border rounded-3xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <span className="block text-4xl md:text-5xl font-extrabold text-primary mb-2">
                {stat.value}
              </span>
              <span className="text-sm font-semibold text-muted uppercase tracking-wider block">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
