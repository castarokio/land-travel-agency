import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MotionPageShell } from "@/components/MotionPageShell";

const tourismOptions = [
  {
    title: "Tourisme Local",
    description: "Circuits régionaux, désert, médinas, montagne et séjours courts organisés.",
    href: "/services/tourism/local"
  },
  {
    title: "Tourisme International",
    description: "Packages internationaux avec vols, hôtels, transferts et assistance voyage.",
    href: "/services/tourism/international"
  }
];

export default function TourismPage() {
  return (
    <MotionPageShell className="tourism-page-shell">
      <p className="section-label">Tourisme</p>
      <h1>Choisissez votre type de voyage</h1>
      <p>
        Retrouvez les offres locales et internationales depuis un point d&apos;entrée clair.
      </p>
      <div className="utility-actions tourism-route-actions">
        {tourismOptions.map((option) => (
          <Link className="button" href={option.href} key={option.href}>
            <span>
              <strong>{option.title}</strong>
              <small>{option.description}</small>
            </span>
            <ArrowRight size={16} />
          </Link>
        ))}
      </div>
    </MotionPageShell>
  );
}
