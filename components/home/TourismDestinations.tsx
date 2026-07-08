"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { tourismDestinations } from "@/lib/site-data";

export function TourismDestinations() {
  const getGridClass = (id: string) => {
    switch (id) {
      case "maldives":
        return "dest-card-maldives";
      case "japon":
        return "dest-card-japon";
      case "suisse":
        return "dest-card-suisse";
      case "tanzanie":
        return "dest-card-tanzanie";
      default:
        return "";
    }
  };

  return (
    <section className="tourism-destinations-section section-space" id="destinations-tourisme">
      <div className="container">
        <div className="tourism-destinations-heading">
          <p className="section-label">Moments d&apos;Évasion</p>
          <h2>
            Votre prochaine aventure commence ici
          </h2>
          <p>
            Explorez nos destinations les plus demandées et laissez-nous organiser un voyage mémorable, du premier rêve jusqu&apos;au retour.
          </p>
        </div>

        <div className="destinations-masonry-grid">
          {tourismDestinations.map((dest) => (
            <Link 
              key={dest.id} 
              href={`/tourism/destination/${dest.id}`} 
              className={`dest-grid-card ${getGridClass(dest.id)}`}
            >
              <Image 
                src={dest.image} 
                alt={dest.name} 
                width={600}
                height={480}
                priority={dest.id === "maldives"} 
              />
              <div className="dest-card-overlay" />
              <div className="dest-card-content">
                <div className="dest-card-center-btn">
                  <ArrowRight size={22} />
                </div>
                <div className="dest-card-title-wrap">
                  <h3>{dest.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="destinations-bottom-cta">
          <Link href="/#tourism" className="button destinations-cta-button">
            Voir nos offres touristiques <ArrowRight size={16} />
          </Link>
          <p>
            Des séjours organisés, des circuits sur mesure et un accompagnement avant le départ.
          </p>
        </div>
      </div>
    </section>
  );
}
