"use client";

import Link from "next/link";
import Image from "next/image";
import { Compass, Sparkles } from "lucide-react";
import { omraPackages } from "@/data/omraPackages";
import { routes } from "@/constants/routes";

export function OmraPreview() {
  // Take Makkah/Madinah VIP & Confort for preview
  const comfortPkg = omraPackages.find(p => p.id === "confort") || omraPackages[0];
  const prestigePkg = omraPackages.find(p => p.id === "prestige") || omraPackages[1];

  return (
    <section className="tourism-section section-space" id="omra-preview" style={{ background: "var(--cream)" }}>
      <div className="container placeholder-grid">
        <div className="placeholder-intro">
          <p className="section-label">Pélerinage Spirituel</p>
          <h2>Découvrez nos formules Omra</h2>
          <p style={{ color: "var(--muted)", fontSize: "14px", marginTop: "8px", maxWidth: "480px" }}>
            Un accompagnement complet de bout en bout, avec des vols réguliers, des transferts climatisés et des hébergements de qualité au plus proche des Lieux Saints.
          </p>
        </div>

        <Link className="placeholder-card media-card scroll-trigger-item" id="omra-comfort" href={routes.omra}>
          <Image src={comfortPkg.image} width={540} height={360} alt="Omra Confort" />
          <span className="home-pkg-badge" style={{ background: "var(--primary)" }}>Omra Confort</span>
          <span className="placeholder-icon">
            <Compass size={28} />
          </span>
          <div className="media-card-details" style={{ position: "absolute", bottom: "20px", left: "20px", zIndex: 3, color: "#fff" }}>
            <h3 style={{ margin: "0 0 4px", fontSize: "20px", fontWeight: "700" }}>Formule Confort</h3>
            <p style={{ margin: 0, fontSize: "12px", opacity: 0.9 }}>Hôtels 4* à 900m avec navettes gratuites H24</p>
          </div>
        </Link>

        <Link className="placeholder-card media-card scroll-trigger-item" id="omra-prestige" href={routes.omra}>
          <Image src={prestigePkg.image} width={540} height={360} alt="Omra Prestige VIP" />
          <span className="home-pkg-badge" style={{ background: "var(--orange)" }}>Prestige VIP</span>
          <span className="placeholder-icon">
            <Sparkles size={28} />
          </span>
          <div className="media-card-details" style={{ position: "absolute", bottom: "20px", left: "20px", zIndex: 3, color: "#fff" }}>
            <h3 style={{ margin: "0 0 4px", fontSize: "20px", fontWeight: "700" }}>Prestige VIP</h3>
            <p style={{ margin: 0, fontSize: "12px", opacity: 0.9 }}>Hôtels 5* de grand standing face au Haram</p>
          </div>
        </Link>
      </div>
    </section>
  );
}
