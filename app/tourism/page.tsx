import Link from "next/link";
import { ArrowRight, MapPin, Globe } from "lucide-react";
import { MotionPageShell } from "@/components/ui/MotionPageShell";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";

const tourismOptions = [
  {
    title: "Tourisme Local",
    description: "Circuits régionaux, désert saharien, médinas historiques, montagnes de l'Atlas et séjours courts organisés.",
    href: "/services/tourism/local",
    icon: MapPin,
    badge: "Régional & Authentique",
    colorClass: "text-orange bg-orange/10",
  },
  {
    title: "Tourisme International",
    description: "Packages internationaux avec vols inclus, hôtels prestigieux, transferts et assistance visa complète.",
    href: "/services/tourism/international",
    icon: Globe,
    badge: "Échappée Internationale",
    colorClass: "text-primary bg-primary/10",
  }
];

export default function TourismPage() {
  return (
    <MotionPageShell>
      <PageHero
        title="Choisissez votre type de voyage"
        subtitle="Retrouvez nos meilleures offres locales et internationales pour réaliser le voyage qui vous ressemble."
      />
      
      <Container className="py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {tourismOptions.map((option) => {
            const Icon = option.icon;
            return (
              <Card key={option.href} className="flex flex-col h-full bg-white border border-border rounded-3xl" hoverable={true}>
                <div className="p-8 md:p-10 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${option.colorClass}`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-[10px] uppercase font-extrabold tracking-widest text-muted bg-border/40 px-3 py-1 rounded-full">
                      {option.badge}
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-text mb-4 group-hover:text-primary transition-colors">
                    {option.title}
                  </h2>

                  <p className="text-sm md:text-base text-muted leading-relaxed mb-8 flex-grow">
                    {option.description}
                  </p>

                  <div className="mt-auto">
                    <Link
                      href={option.href}
                      className="inline-flex items-center justify-center w-full px-6 py-3 font-semibold rounded-full bg-primary/5 text-primary hover:bg-primary hover:text-white transition-all duration-300 transform active:scale-95 gap-2"
                    >
                      <span>Découvrir les offres</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </MotionPageShell>
  );
}
