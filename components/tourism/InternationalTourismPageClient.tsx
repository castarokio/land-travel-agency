"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowLeft, Award, Check, Plane, Send, ShieldCheck, Star } from "lucide-react";
import { MotionPageShell } from "@/components/MotionPageShell";
import { useInquiryForm } from "@/components/inquiry/useInquiryForm";
import { asset, intlPackages } from "@/lib/site-data";

export default function InternationalTourismPageClient() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedPkg, setSelectedPkg] = useState(intlPackages[0].id);
  const { formData, handleSubmit, setField, setSubmitted, submitted } = useInquiryForm({
    name: "",
    email: "",
    phone: "",
    travelers: "1",
    date: "",
    notes: ""
  });

  const categories = ["All", "Europe", "Asia", "Tropical", "Adventure"];

  const filteredPackages = activeCategory === "All" 
    ? intlPackages 
    : intlPackages.filter(p => p.category === activeCategory);

  const handleSelectPkg = (pkgId: string) => {
    setSelectedPkg(pkgId);
    const formSection = document.getElementById("intl-inquiry-section");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const activePkgObj = intlPackages.find(p => p.id === selectedPkg) || intlPackages[0];

  return (
    <MotionPageShell className="service-page-shell international-tourism-page-shell">
      {/* Hero Header */}
      <section className="service-hero" style={{ backgroundImage: `url(${asset("intl-maldives-resort.webp")})` }}>
        <div className="container">
          <Link className="back-link" href="/" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "var(--yellow)", fontSize: "12px", fontWeight: "700", marginBottom: "20px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            <ArrowLeft size={14} /> Retour à l&apos;accueil
          </Link>
          <p className="section-label" style={{ color: "var(--yellow)" }}>Échappée Internationale</p>
          <h1>Destinations de Rêve & Voyages Organisés</h1>
          <p style={{ maxWidth: "600px", margin: "0 auto" }}>
            Des plages sauvages des Maldives aux ruelles néons de Tokyo, en passant par les safaris du Serengeti, envolez-vous vers la destination de vos rêves en toute sérénité.
          </p>
        </div>
      </section>

      {/* Categories Filter Menu */}
      <div className="container" style={{ marginTop: "54px" }}>
        <div className="category-filter-nav">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-filter-btn ${activeCategory === category ? "active" : ""}`}
              onClick={() => setActiveCategory(category)}
            >
              {category === "All" ? "Toutes les destinations" : category}
            </button>
          ))}
        </div>

        {/* Packages Grid */}
        <div className="packages-grid">
          {filteredPackages.map((pkg) => (
            <article className="package-card" key={pkg.id}>
              <div className="package-image-wrap">
                <Image src={pkg.image} alt={pkg.title} width={560} height={340} />
                <span className="package-badge-overlay" style={{ background: "var(--primary)", color: "#fff" }}>{pkg.category}</span>
                <span className="package-duration-overlay">{pkg.duration}</span>
              </div>
              <div className="package-content">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <span style={{ fontSize: "11px", color: "var(--primary)", fontWeight: "800", textTransform: "uppercase" }}>Vol Régulier Inclus</span>
                  <div style={{ display: "flex", gap: "2px", color: "var(--yellow)" }}><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /></div>
                </div>
                <h3>{pkg.title}</h3>
                <p className="package-description">{pkg.description}</p>
                
                <h4 style={{ fontSize: "11px", textTransform: "uppercase", color: "var(--text)", marginBottom: "12px", fontWeight: "700", letterSpacing: "0.04em" }}>Points Forts du Voyage :</h4>
                <ul className="package-features">
                  {pkg.details.map((detail, idx) => (
                    <li key={idx}><Check size={14} /> <span>{detail}</span></li>
                  ))}
                </ul>

                <div style={{ background: "#f8fafc", padding: "12px 16px", borderRadius: "10px", marginBottom: "24px", border: "1px solid var(--border)" }}>
                  <span style={{ fontSize: "9px", textTransform: "uppercase", fontWeight: "800", color: "var(--muted)", display: "block", marginBottom: "6px" }}>Compris dans le tarif</span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                    {pkg.inclusions.map((inc, idx) => (
                      <span key={idx} style={{ fontSize: "10px", background: "#fff", border: "1px solid rgba(0,82,204,0.08)", padding: "4px 8px", borderRadius: "5px", fontWeight: "600", color: "#333" }}>
                        ✓ {inc}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="package-footer">
                  <div className="package-price-wrap">
                    <span className="package-price-label">Tarif tout compris</span>
                    <span className="package-price-value">{pkg.price}</span>
                  </div>
                  <button className="button button-small" onClick={() => handleSelectPkg(pkg.id)}>
                    Demander un devis
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Inquiry Form Section */}
      <section className="inquiry-section" id="intl-inquiry-section">
        <div className="container">
          <div className="inquiry-grid">
            {/* Left Col - Benefits */}
            <div className="inquiry-info">
              <span className="section-label">Devis sans engagement</span>
              <h2>Réservez vos vols & hôtels</h2>
              <p>
                Notre équipe de conseillers s&apos;occupe de l&apos;intégralité de vos démarches : réservation des billets, hébergements haut de gamme, transferts aéroport et assistance visa touristique si requise.
              </p>

              <div className="inquiry-benefits">
                <div className="inquiry-benefit-item">
                  <div className="inquiry-benefit-icon"><Plane size={18} /></div>
                  <div className="inquiry-benefit-text">
                    <h4>Partenariats Aériens VIP</h4>
                    <p>Accords de tarifs négociés avec les plus grandes compagnies aériennes régulières.</p>
                  </div>
                </div>

                <div className="inquiry-benefit-item">
                  <div className="inquiry-benefit-icon"><ShieldCheck size={18} /></div>
                  <div className="inquiry-benefit-text">
                    <h4>Voyage 100% Assuré</h4>
                    <p>Possibilité d&apos;inclure une assurance multirisque annulation et rapatriement de premier plan.</p>
                  </div>
                </div>

                <div className="inquiry-benefit-item">
                  <div className="inquiry-benefit-icon"><Award size={18} /></div>
                  <div className="inquiry-benefit-text">
                    <h4>Hôtels Sélectionnés</h4>
                    <p>Établissements 4 et 5 étoiles audités régulièrement pour garantir la meilleure literie et hygiène.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col - Form */}
            <div className="inquiry-form-card">
              {!submitted ? (
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Nom Complet *</label>
                      <input 
                        type="text" 
                        id="name" 
                        required 
                        value={formData.name}
                        onChange={(e) => setField("name", e.target.value)}
                        placeholder="Alice Martin" 
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Adresse E-mail *</label>
                      <input 
                        type="email" 
                        id="email" 
                        required 
                        value={formData.email}
                        onChange={(e) => setField("email", e.target.value)}
                        placeholder="alice.martin@example.com" 
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone">Téléphone *</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        required 
                        value={formData.phone}
                        onChange={(e) => setField("phone", e.target.value)}
                        placeholder="+33 7 98 76 54 32" 
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="pkg">Destination souhaitée</label>
                      <select 
                        id="pkg"
                        value={selectedPkg}
                        onChange={(e) => setSelectedPkg(e.target.value)}
                      >
                        {intlPackages.map((p) => (
                          <option key={p.id} value={p.id}>{p.title}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="travelers">Nombre de voyageurs</label>
                      <select 
                        id="travelers"
                        value={formData.travelers}
                        onChange={(e) => setField("travelers", e.target.value)}
                      >
                        <option value="1">1 Personne</option>
                        <option value="2">2 Personnes (Couple)</option>
                        <option value="3-5">Famille (3-5 pers.)</option>
                        <option value="6+">Groupe (6+ pers.)</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="date">Date estimée de départ</label>
                      <input 
                        type="date" 
                        id="date" 
                        value={formData.date}
                        onChange={(e) => setField("date", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group full-width">
                    <label htmlFor="notes">Précisions supplémentaires (Hôtel de préférence, classe affaire, escales...)</label>
                    <textarea 
                      id="notes" 
                      rows={3} 
                      value={formData.notes}
                      onChange={(e) => setField("notes", e.target.value)}
                      placeholder="Ex: lit double requis, hôtel vue mer ou centre-ville, préférence de vol direct..."
                    />
                  </div>

                  <button className="button" type="submit" style={{ width: "100%", marginTop: "8px" }}>
                    <Send size={16} /> Envoyer ma demande de voyage
                  </button>
                </form>
              ) : (
                <div className="form-success-box">
                  <div className="form-success-icon">
                    <Check size={28} />
                  </div>
                  <h3>Demande Enregistrée !</h3>
                  <p style={{ marginBottom: "20px" }}>
                    Merci <strong>{formData.name}</strong>. Votre dossier pour le package international <strong>&quot;{activePkgObj.title}&quot;</strong> a été transmis à notre service de réservation.
                  </p>
                  <div style={{ background: "#f8fafc", border: "1px dashed var(--border)", borderRadius: "12px", padding: "16px", width: "100%", fontSize: "12px", textAlign: "left", marginBottom: "24px", color: "var(--text)" }}>
                    <div style={{ marginBottom: "6px" }}><strong>Package :</strong> {activePkgObj.title} ({activePkgObj.duration})</div>
                    <div style={{ marginBottom: "6px" }}><strong>Voyageurs :</strong> {formData.travelers === "2" ? "2 personnes (Couple)" : formData.travelers === "1" ? "1 voyageur" : formData.travelers}</div>
                    {formData.date && <div style={{ marginBottom: "6px" }}><strong>Date :</strong> {formData.date}</div>}
                    <div><strong>Traitement :</strong> Un expert en vols internationaux étudie votre demande pour vous proposer le meilleur tarif et le meilleur itinéraire. Réponse sous 24h.</div>
                  </div>
                  <button className="button button-ghost" onClick={() => setSubmitted(false)}>
                    Calculer un autre tarif
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </MotionPageShell>
  );
}
