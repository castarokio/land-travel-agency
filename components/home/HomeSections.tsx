import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Compass,
  Landmark,
  Plane
} from "lucide-react";
import { asset, destinations, proofLogos, stats } from "@/lib/site-data";

export function Proof() {
  const duplicatedLogos = [...proofLogos, ...proofLogos];

  return (
    <section className="proof-section">
      <div className="container">
        <p className="proof-title">
          Nos étudiants sont admis dans les meilleures universités du monde
        </p>
      </div>
      <div className="proof-ticker-container">
        <div className="proof-ticker-track">
          {duplicatedLogos.map((logo, index) => (
            <article className="proof-logo-card" key={`${logo.name}-${index}`}>
              <Image src={logo.src} width={180} height={72} alt={`${logo.name} logo`} loading="eager" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TourismSections() {
  return (
    <section className="tourism-section section-space" id="tourism">
      <div className="container placeholder-grid">
        <div className="placeholder-intro">
          <p className="section-label">Évasion & Découverte</p>
          <h2>Explorez nos services de tourisme</h2>
          <p style={{ color: "var(--muted)", fontSize: "14px", marginTop: "8px", maxWidth: "480px" }}>
            Des voyages locaux riches en culture aux destinations de rêve internationales, trouvez le forfait idéal conçu sur mesure.
          </p>
        </div>
        <Link className="placeholder-card media-card scroll-trigger-item" id="local-tourism" href="/tourism/local">
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
        <Link className="placeholder-card media-card scroll-trigger-item" id="international-tourism" href="/tourism/international">
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
  );
}

export function OmraSection() {
  return (
    <section className="omra-section section-space" id="omra-services" style={{ background: "rgba(4, 120, 87, 0.02)" }}>
      <div className="container placeholder-grid placeholder-grid-compact">
        <div className="placeholder-intro">
          <p className="section-label" style={{ color: "#047857" }}>Omra Hajj</p>
          <h2>Voyages Spirituels Omra</h2>
          <p style={{ color: "var(--muted)", fontSize: "14px", marginTop: "8px", maxWidth: "480px" }}>
            Accomplissez votre pèlerinage en toute sérénité grâce à nos formules encadrées, de l&apos;obtention du visa au retour à la maison.
          </p>
        </div>
        <Link className="placeholder-card media-card wide scroll-trigger-item" href="/omra" style={{ minHeight: "380px" }}>
          <Image src={asset("omra-masjid-nabawi-sunset.webp")} width={760} height={430} alt="Masjid Nabawi Madinah - Omra" />
          <span className="home-pkg-badge" style={{ background: "#047857" }}>Formules 2026</span>
          <span className="placeholder-icon" style={{ background: "#047857" }}>
            <Plane size={28} />
          </span>
          <div className="media-card-details" style={{ position: "absolute", bottom: "28px", left: "28px", right: "28px", zIndex: 3, color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <h3 style={{ margin: "0 0 6px", fontSize: "24px", fontWeight: "700" }}>Formules Omra sur Mesure & VIP</h3>
              <p style={{ margin: 0, fontSize: "13px", opacity: 0.9, maxWidth: "440px" }}>
                Hôtels à proximité du Haram à Makkah & Madinah, vols directs réguliers, guides religieux et transferts VIP privatifs.
              </p>
            </div>
            <span className="button button-small" style={{ background: "#047857", color: "#fff", border: "none", boxShadow: "0 6px 15px rgba(4, 120, 87, 0.3)" }}>
              Découvrir nos packages <ChevronRight size={14} />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}

export function Destinations() {
  return (
    <section className="section-space destination-section">
      <div className="container">
        <div className="section-heading-row">
          <div>
            <p className="section-label">Meilleures Destinations</p>
            <h2>Explorez les meilleures destinations pour vos études supérieures</h2>
          </div>
          <div className="carousel-controls">
            <button aria-label="Destinations précédentes" type="button">
              <ArrowLeft size={18} />
            </button>
            <button className="active" aria-label="Destinations suivantes" type="button">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className="destination-grid">
          {destinations.map((destination) => (
            <article className="destination-card scroll-trigger-item" key={destination.name}>
              <Image src={destination.image} width={560} height={340} alt={`Destination ${destination.name}`} loading="eager" />
              <div className="destination-content">
                <h3>{destination.name}</h3>
                <Link href="/universities">
                  Voir plus <ChevronRight size={13} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyChoose() {
  return (
    <section className="why-section section-space">
      <div className="container why-grid">
        <div className="why-art">
          <Image
            src={asset("why-choose-student-illustration.png")}
            width={520}
            height={360}
            alt="Étudiant lisant avec des icônes d'éducation"
            loading="eager"
          />
        </div>

        <div className="why-copy">
          <p className="section-label">Pourquoi nous choisir ?</p>
          <h2>Le seul bon choix</h2>
          <p>
            {"Nos étudiants et leurs parents apprécient notre connaissance approfondie des systèmes éducatifs et d'immigration mondiaux, ainsi que notre professionnalisme et notre dévouement."}
          </p>

          <div className="stats-grid">
            {stats.map((stat) => (
              <article key={stat.label} className="stat-card">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
