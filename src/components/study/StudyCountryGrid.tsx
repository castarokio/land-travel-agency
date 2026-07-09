"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { studyCountries } from "@/data/studyCountries";
import { routes } from "@/constants/routes";
import styles from "./StudyCountryGrid.module.css";

export function StudyCountryGrid() {
  const [ctaPosition, setCtaPosition] = useState({ x: 50, y: 50 });

  return (
    <section className="section-space destination-section" id="study-countries" style={{ background: "var(--cream)/10" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p className="section-label">Destinations académiques</p>
          <h2>Où souhaitez-vous étudier ?</h2>
          <p style={{ color: "var(--muted)", fontSize: "14px", marginTop: "8px", maxWidth: "600px", marginInline: "auto" }}>
            Découvrez nos destinations partenaires proposant des diplômes reconnus à l&apos;échelle internationale et des opportunités d&apos;avenir.
          </p>
          <Link
            href={routes.programFinder}
            className={styles.findProgramCta}
            style={{
              "--cta-x": `${ctaPosition.x}%`,
              "--cta-y": `${ctaPosition.y}%`,
            } as React.CSSProperties}
            onMouseMove={(event) => {
              const rect = event.currentTarget.getBoundingClientRect();
              setCtaPosition({
                x: ((event.clientX - rect.left) / rect.width) * 100,
                y: ((event.clientY - rect.top) / rect.height) * 100,
              });
            }}
          >
            <span>Aidez-moi à trouver mon programme</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {studyCountries.map((country) => (
            <article 
              key={country.id} 
              className="package-card" 
              style={{
                display: "flex",
                flexDirection: "column",
                borderRadius: "24px",
                border: "1px solid var(--border)",
                overflow: "hidden",
                background: "#fff",
                transition: "all 0.25s ease"
              }}
            >
              {/* Image Block */}
              <div style={{ position: "relative", height: "220px", width: "100%" }}>
                <Image 
                  src={country.image} 
                  alt={country.name} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 30vw"
                  className="object-cover" 
                />
                <span 
                  className="home-pkg-badge" 
                  style={{ 
                    position: "absolute", 
                    top: "16px", 
                    right: "16px",
                    background: "var(--primary)",
                    color: "#fff",
                    padding: "4px 12px",
                    borderRadius: "20px",
                    fontSize: "11px",
                    fontWeight: "700",
                    zIndex: 2
                  }}
                >
                  {country.visaSuccessRate} Visa Success
                </span>
              </div>

              {/* Copy Block */}
              <div style={{ padding: "24px", display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "space-between" }}>
                <div>
                  <h3 style={{ fontSize: "22px", fontWeight: "800", color: "var(--text)", marginBottom: "12px" }}>
                    {country.name}
                  </h3>
                  
                  <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: "1.5", marginBottom: "16px" }}>
                    {country.description}
                  </p>

                  {/* Tuition info */}
                  <div style={{ background: "var(--cream)", padding: "10px 14px", borderRadius: "12px", marginBottom: "16px" }}>
                    <span style={{ fontSize: "11px", textTransform: "uppercase", fontWeight: "700", display: "block", color: "var(--muted)", letterSpacing: "0.5px" }}>
                      Frais de scolarité estimatifs
                    </span>
                    <strong style={{ fontSize: "14px", color: "var(--primary)", fontWeight: "700" }}>
                      {country.averageTuition}
                    </strong>
                  </div>

                  {/* Requirements List */}
                  <div style={{ marginBottom: "24px" }}>
                    <span style={{ fontSize: "12px", fontWeight: "700", color: "var(--text)", display: "block", marginBottom: "8px" }}>
                      Exigences clés :
                    </span>
                    <ul className="space-y-1.5">
                      {(country.requirements || []).map((req, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2" style={{ fontSize: "12px", color: "var(--muted)" }}>
                          <Check className="w-4 h-4 text-emerald-600 shrink-0" style={{ marginTop: "1px" }} />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link 
                  href={`/universities/${country.id}`} 
                  className="button"
                  style={{ 
                    width: "100%", 
                    display: "inline-flex", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    gap: "8px",
                    height: "44px",
                    borderRadius: "14px",
                    fontSize: "13px"
                  }}
                >
                  <span>Explorer les universités</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
