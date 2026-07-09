import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function ServiceComparison() {
  const comparisonData = [
    {
      feature: "Target Audience",
      study: "Baccalaureate holders, graduates, researchers",
      tourism: "Families, solo travelers, honeymooners, corporate groups",
      omra: "Individual pilgrims, family groups, senior citizens",
    },
    {
      feature: "Primary Deliverables",
      study: "University acceptances, Campus France files, block accounts",
      tourism: "Bespoke itineraries, flight tickets, hotel reservations",
      omra: "Omra visas, Makkah/Madinah hotels, Ziyarat guides",
    },
    {
      feature: "Visa Assistance",
      study: "Comprehensive dossier compilation and simulated interviews",
      tourism: "Tourist visa guidelines, reservation vouchers, insurance",
      omra: "Full processing and medical insurance coverage",
    },
    {
      feature: "Accompanying Support",
      study: "Pre-departure checklist, flight guidance, and arrival setup",
      tourism: "Local tour guides, local 4x4 drivers, emergency helpline",
      omra: "Spiritual advisor (Guide religieux) and H24 on-site support",
    },
    {
      feature: "Standard Duration",
      study: "Academic year or semestral programs (Long stay)",
      tourism: "5 to 15 Days (Short stay)",
      omra: "14 Days (7 Nights Makkah / 7 Nights Madinah)",
    },
  ];

  return (
    <section className="py-20 bg-cream/10 relative overflow-hidden">
      <Container>
        <SectionHeader
          label="Comparison"
          title="Departments at a Glance"
          description="Compare the core features, target audiences, and deliverables of our specialized divisions."
          align="center"
          className="mx-auto mb-16"
        />

        <div className="w-full overflow-x-auto rounded-3xl border border-border bg-white shadow-sm">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-neutral-50 border-b border-border">
                <th className="p-6 text-sm font-extrabold text-text uppercase tracking-wider w-1/4">
                  Feature
                </th>
                <th className="p-6 text-sm font-extrabold text-primary uppercase tracking-wider w-1/4">
                  Study Abroad
                </th>
                <th className="p-6 text-sm font-extrabold text-orange uppercase tracking-wider w-1/4">
                  Tourism & Travel
                </th>
                <th className="p-6 text-sm font-extrabold text-emerald-800 uppercase tracking-wider w-1/4">
                  Omra Pilgrimage
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-sm text-muted">
              {comparisonData.map((row, idx) => (
                <tr key={idx} className="hover:bg-neutral-50/50 transition-colors">
                  <td className="p-6 font-bold text-text">
                    {row.feature}
                  </td>
                  <td className="p-6 leading-relaxed">
                    {row.study}
                  </td>
                  <td className="p-6 leading-relaxed">
                    {row.tourism}
                  </td>
                  <td className="p-6 leading-relaxed">
                    {row.omra}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}
