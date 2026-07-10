import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { asset } from "@/lib/assets";
import { routes } from "@/constants/routes";

const serviceCards = [
  {
    title: "Study Abroad",
    description: "Apply to universities, prepare your file, visa support.",
    href: routes.studyAbroad,
    image: asset("hero-graduate-student.webp"),
    size: "featured"
  },
  {
    title: "Tourism",
    description: "Local and international packages.",
    href: routes.tourism,
    image: asset("intl-maldives-resort.webp"),
    size: "standard"
  },
  {
    title: "Omra",
    description: "Spiritual travel packages with full assistance.",
    href: routes.omra,
    image: asset("omra-masjid-nabawi-sunset.webp"),
    size: "compact"
  }
];

export function ServiceSelector() {
  return (
    <section className="quick-service-section" aria-labelledby="quick-service-title">
      <div className="container">
        <div className="quick-service-heading">
          <div>
            <Link className="quick-service-home" href="/" aria-label="Back to home">
              <ArrowLeft size={18} />
              <span>Home</span>
            </Link>
            <p className="section-label">Quick service selector</p>
          </div>
          <h2 id="quick-service-title">Choose your path</h2>
        </div>
        <div className="quick-service-grid">
          {serviceCards.map((service) => (
            <Link className={`quick-service-card ${service.size}`} href={service.href} key={service.title}>
              <Image src={service.image} width={720} height={460} alt="" />
              <span className="quick-service-overlay" aria-hidden="true" />
              <span className="quick-service-copy">
                <strong>{service.title}</strong>
                <small>{service.description}</small>
              </span>
              <span className="quick-service-action">
                <ArrowRight size={18} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
