"use client";

import Link from "next/link";
import Image from "next/image";
import { Compass, Landmark, ArrowRight } from "lucide-react";
import { destinations } from "@/data/destinations";
import { asset } from "@/lib/assets";
import { routes } from "@/constants/routes";

export function TourismPreview() {
  const getGridClass = (id: string) => {
    switch (id) {
      case "maldives":
        return "dest-card-maldives";
      case "japan":
      case "japon":
        return "dest-card-japon";
      case "switzerland":
      case "suisse":
        return "dest-card-suisse";
      case "tanzania":
      case "tanzanie":
        return "dest-card-tanzanie";
      default:
        return "";
    }
  };

  return (
    <>
      {/* 1. Tourism Department Segment (Local vs. International Gateways) */}
      <section className="tourism-section section-space" id="tourism">
        <div className="container placeholder-grid">
          <div className="placeholder-intro">
            <p className="section-label">Évasion & Découverte</p>
            <h2>Explorez nos services de tourisme</h2>
            <p style={{ color: "var(--muted)", fontSize: "14px", marginTop: "8px", maxWidth: "480px" }}>
              Des voyages locaux riches en culture aux destinations de rêve internationales, trouvez le forfait idéal conçu sur mesure.
            </p>
          </div>
          
          <Link className="placeholder-card media-card scroll-trigger-item" id="local-tourism" href={routes.localTourism}>
            <Image src={asset("local-desert-sunset.webp")} width={540} height={360} alt="Dunes de Sahara - Tourisme Local" />
            <span className="home-pkg-badge" style={{ background: "var(--orange)" }}>Local</span>
            <span className="placeholder-icon">
              <Compass size={28} />
            </span>
            <div className="media-card-details" style={{ position: "absolute", bottom: "20px", left: "20px", zIndex: 3, color: "#fff" }}>
              <h3 style={{ margin: "0 0 4px", fontSize: "20px", fontWeight: "700" }}>Tourisme Local</h3>
              <p style={{ margin: 0, fontSize: "12px", opacity: 0.9 }}>Dunes du Sahara, Riads de Fès & Trekking Atlas</p>
            </div>
          </Link>

          <Link className="placeholder-card media-card scroll-trigger-item" id="international-tourism" href={routes.internationalTourism}>
            <Image src={asset("intl-maldives-resort.webp")} width={540} height={360} alt="Maldives pilotis - Tourisme International" />
            <span className="home-pkg-badge" style={{ background: "var(--primary)" }}>International</span>
            <span className="placeholder-icon">
              <Landmark size={28} />
            </span>
            <div className="media-card-details" style={{ position: "absolute", bottom: "20px", left: "20px", zIndex: 3, color: "#fff" }}>
              <h3 style={{ margin: "0 0 4px", fontSize: "20px", fontWeight: "700" }}>Tourisme International</h3>
              <p style={{ margin: 0, fontSize: "12px", opacity: 0.9 }}>Maldives, Japon, Alpes Suisses & Safaris</p>
            </div>
          </Link>
        </div>
      </section>

      {/* 2. Featured Tourism Destinations (Masonry Grid) */}
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
            {destinations.slice(0, 4).map((dest) => (
              <Link 
                key={dest.id} 
                href={`/services/tourism/destinations/${dest.id}`} 
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
            <Link href={routes.tourism} className="button destinations-cta-button">
              Voir nos offres touristiques <ArrowRight size={16} />
            </Link>
            <p>
              Des séjours organisés, des circuits sur mesure et un accompagnement avant le départ.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
