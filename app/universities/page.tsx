import { Metadata } from "next";
import { MotionPageShell } from "@/components/ui/MotionPageShell";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { UniversityList } from "@/components/universities/UniversityList";
import { FinalCTA } from "@/components/ui/FinalCTA";
import { routes } from "@/constants/routes";
import { asset } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Universités Partenaires | Land Travel Agency",
  description: "Explorez nos universités accréditées au Canada, en France, au Royaume-Uni, en Allemagne et postulez avec l'accompagnement Land Travel.",
};

export default function UniversitiesPage() {
  return (
    <MotionPageShell>
      <PageHero
        title="Universités Partenaires"
        subtitle="Trouvez l'établissement idéal pour vos études supérieures parmi nos cursus internationaux."
        backgroundImage={asset("collage-university.jpg")}
      />

      <section className="section-space bg-neutral-50/50">
        <Container>
          <UniversityList />
        </Container>
      </section>

      <FinalCTA
        title="Vous ne trouvez pas votre université ?"
        description="Nos conseillers académiques peuvent vous orienter vers d'autres établissements hors catalogue correspondant à votre filière."
        primaryLabel="Planifier une orientation gratuite"
        primaryHref={routes.contact}
        secondaryLabel="Retour à l'accueil"
        secondaryHref={routes.home}
      />
    </MotionPageShell>
  );
}
