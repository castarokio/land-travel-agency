import { Metadata } from "next";
import { MotionPageShell } from "@/components/ui/MotionPageShell";
import { BackLink } from "@/components/ui/BackLink";
import { StudyHero } from "@/components/study/StudyHero";
import { StudyCountryGrid } from "@/components/study/StudyCountryGrid";
import { RequirementsChecklist } from "@/components/study/RequirementsChecklist";
import { AdmissionsTimeline } from "@/components/study/AdmissionsTimeline";
import { StudyFAQ } from "@/components/study/StudyFAQ";
import { FinalCTA } from "@/components/ui/FinalCTA";
import { routes } from "@/constants/routes";

export const metadata: Metadata = {
  title: "Études à l'étranger | Land Travel Agency",
  description: "Dossiers Campus France, admissions universitaires internationales, comptes bloqués et accompagnement visa étudiant de A à Z.",
};

export default function StudyAbroadPage() {
  return (
    <MotionPageShell>
      <div className="w-full max-w-[1120px] px-6 mx-auto mt-6">
        <BackLink href={routes.home}>
          Retour à l&apos;accueil
        </BackLink>
      </div>
      <StudyHero />
      <StudyCountryGrid />
      <RequirementsChecklist />
      <AdmissionsTimeline />
      <StudyFAQ />
      
      <FinalCTA
        title="Prêt à lancer votre projet d'études ?"
        description="Remplissez notre formulaire d'évaluation académique en ligne pour recevoir un premier diagnostic gratuit de votre profil d'admissions."
        primaryLabel="Lancer mon évaluation académique"
        primaryHref={routes.contact}
        secondaryLabel="Explorer les universités"
        secondaryHref={routes.universities}
      />
    </MotionPageShell>
  );
}
