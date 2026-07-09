import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpenCheck, Compass, Plane } from "lucide-react";
import { asset } from "@/lib/assets";
import { routes } from "@/constants/routes";

const serviceCards = [
  {
    title: "Study Abroad",
    description: "Apply to universities, prepare your file, visa support.",
    href: routes.studyAbroad,
    image: asset("hero-graduate-student.webp"),
    icon: BookOpenCheck,
    size: "featured"
  },
  {
    title: "Tourism",
    description: "Local and international packages.",
    href: routes.tourism,
    image: asset("intl-maldives-resort.webp"),
    icon: Compass,
    size: "standard"
  },
  {
    title: "Omra",
    description: "Spiritual travel packages with full assistance.",
    href: routes.omra,
    image: asset("omra-masjid-nabawi-sunset.webp"),
    icon: Plane,
    size: "compact"
  }
];

export function ServiceSelector() {
  return (
    <section className="quick-service-section" aria-labelledby="quick-service-title">
      <div className="container">
        <div className="quick-service-heading">
          <p className="section-label">Quick service selector</p>
          <h2 id="quick-service-title">Choose your path</h2>
        </div>
        <div className="quick-service-grid">
          {serviceCards.map((service) => {
            const Icon = service.icon;

            return (
              <Link className={`quick-service-card ${service.size}`} href={service.href} key={service.title}>
                <Image src={service.image} width={720} height={460} alt="" />
                <span className="quick-service-overlay" aria-hidden="true" />
                <span className="quick-service-icon">
                  <Icon size={22} />
                </span>
                <span className="quick-service-copy">
                  <strong>{service.title}</strong>
                  <small>{service.description}</small>
                </span>
                <span className="quick-service-action">
                  <ArrowRight size={18} />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
