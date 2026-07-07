"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowLeft, Award, BookOpen, Check, Hotel, Send, ShieldCheck } from "lucide-react";
import { MotionPageShell } from "@/components/MotionPageShell";
import { useInquiryForm } from "@/components/inquiry/useInquiryForm";
import { asset, omraPackages } from "@/lib/site-data";

export default function OmraPageClient() {
  const [selectedFormula, setSelectedFormula] = useState(omraPackages[0].id);
  const { formData, handleSubmit, setField, setSubmitted, submitted } = useInquiryForm({
    name: "",
    email: "",
    phone: "",
    pilgrims: "1",
    departureMonth: "Octobre 2026",
    notes: ""
  });

  const ziyaratSites = [
    {
      name: "Mont Uhud",
      image: asset("omra-ziyarat-uhud.webp"),
      description: "Le site historique de la bataille de Uhud, lieu de recueillement et d'histoire spirituelle près de Madinah."
    },
    {
      name: "Grotte de Hira",
      image: asset("omra-ziyarat-hira.webp"),
      description: "Située sur le mont Jabal al-Noor à Makkah, le lieu de la première révélation coranique à notre Prophète (SWS)."
    },
    {
      name: "Mosquée de Quba",
      image: asset("omra-quba-mosque.webp"),
      description: "La toute première mosquée de l'Islam construite par le Prophète (SWS) à son arrivée à Madinah."
    },
    {
      name: "Masjid an-Nabawi",
      image: asset("omra-masjid-nabawi.webp"),
      description: "La mosquée sacrée du Prophète (SWS) à Madinah, abritant sa sainte tombe et le Rawdah béni."
    }
  ];

  const handleSelectFormula = (formulaId: string) => {
    setSelectedFormula(formulaId);
    const formSection = document.getElementById("omra-inquiry-section");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const activeFormulaObj = omraPackages.find(p => p.id === selectedFormula) || omraPackages[0];

  return (
    <MotionPageShell className="service-page-shell omra-page-shell omra-emerald">
      {/* Spiritual Hero */}
      <section className="service-hero omra-hero" style={{ backgroundImage: `url(${asset("omra-masjid-nabawi-sunset.webp")})` }}>
        <div className="container">
          <Link className="back-link" href="/" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "var(--yellow)", fontSize: "12px", fontWeight: "700", marginBottom: "20px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            <ArrowLeft size={14} /> Retour à l&apos;accueil
          </Link>
          <p className="section-label" style={{ color: "var(--yellow)" }}>Pèlerinages Spirituels</p>
          <h1>Formules Omra Complètes & Encadrées</h1>
          <p style={{ maxWidth: "600px", margin: "0 auto" }}>
            Vivez le voyage de votre vie avec sérénité spirituelle. Nos équipes s&apos;occupent de toute la logistique, des démarches de visa aux cours de préparation et visites guidées.
          </p>
        </div>
      </section>

      {/* Package Selection Cards */}
      <section className="omra-comparison">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span className="section-label" style={{ color: "#047857" }}>Formules 2026</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "32px", fontWeight: "800", margin: "0" }}>
              Comparez nos offres de pèlerinage
            </h2>
          </div>

          <div className="omra-grid">
            {omraPackages.map((pkg) => {
              const isPrestige = pkg.id === "prestige";
              return (
                <article className={`omra-card ${isPrestige ? "featured" : ""}`} key={pkg.id}>
                  {isPrestige && <span className="omra-popular-badge">Recommandé VIP</span>}
                  <h3>{pkg.name}</h3>
                  <span className="omra-card-duration">{pkg.duration}</span>

                  <div className="omra-card-price-box">
                    <span className="omra-price-title">Budget indicatif</span>
                    <span className="omra-price-amount">{pkg.priceRange}</span>
                  </div>

                  <div className="omra-hotel-info">
                    <div className="omra-hotel-line">
                      <Hotel size={16} />
                      <div>
                        <strong>Makkah :</strong> {pkg.hotelMakkah}
                      </div>
                    </div>
                    <div className="omra-hotel-line" style={{ marginTop: "8px" }}>
                      <Hotel size={16} />
                      <div>
                        <strong>Madinah :</strong> {pkg.hotelMadinah}
                      </div>
                    </div>
                  </div>

                  <ul className="omra-features-list">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx}>
                        <Check size={14} style={{ marginTop: "3px" }} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    className={`button omra-card-btn ${!isPrestige ? "button-ghost" : ""}`}
                    onClick={() => handleSelectFormula(pkg.id)}
                    style={isPrestige ? { background: "#047857", boxShadow: "0 8px 20px rgba(4, 120, 87, 0.25)" } : {}}
                  >
                    Sélectionner cette formule
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ziyarat Section */}
      <section className="ziyarat-section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <span className="section-label" style={{ color: "#047857" }}>Excursions religieuses</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: "800", margin: "0" }}>
              Visites Historiques (Ziyarat) Incluses
            </h2>
            <p style={{ color: "var(--muted)", fontSize: "14px", marginTop: "8px", maxWidth: "560px", margin: "8px auto 0" }}>
              Revivez l&apos;histoire de la révélation lors de nos sorties encadrées par des guides théologiens bilingues.
            </p>
          </div>

          <div className="ziyarat-grid">
            {ziyaratSites.map((site, idx) => (
              <div className="ziyarat-card" key={idx}>
                <Image src={site.image} alt={site.name} width={280} height={200} />
                <div className="ziyarat-overlay">
                  <h4>{site.name}</h4>
                  <p>{site.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="inquiry-section" id="omra-inquiry-section" style={{ borderTop: "none" }}>
        <div className="container">
          <div className="inquiry-grid">
            {/* Left Col - Benefits */}
            <div className="inquiry-info">
              <span className="section-label" style={{ color: "#047857" }}>Dossier & Devis</span>
              <h2>Réserver ma place</h2>
              <p>
                Afin de garantir votre vol direct et vos réservations d&apos;hôtel dans les meilleures conditions, nous vous conseillons d&apos;effectuer vos demandes d&apos;inscription le plus tôt possible.
              </p>

              <div className="inquiry-benefits">
                <div className="inquiry-benefit-item">
                  <div className="inquiry-benefit-icon" style={{ background: "rgba(4, 120, 87, 0.08)", color: "#047857" }}>
                    <ShieldCheck size={18} />
                  </div>
                  <div className="inquiry-benefit-text">
                    <h4>Visa Omra Garanti</h4>
                    <p>Agrément officiel du Ministère du Hajj pour le traitement express de vos visas électroniques Nusuk.</p>
                  </div>
                </div>

                <div className="inquiry-benefit-item">
                  <div className="inquiry-benefit-icon" style={{ background: "rgba(4, 120, 87, 0.08)", color: "#047857" }}>
                    <BookOpen size={18} />
                  </div>
                  <div className="inquiry-benefit-text">
                    <h4>Préparation Spirituelle</h4>
                    <p>Séance de formation collective avant le départ : rites, conseils pratiques et guide écrit offert.</p>
                  </div>
                </div>

                <div className="inquiry-benefit-item">
                  <div className="inquiry-benefit-icon" style={{ background: "rgba(4, 120, 87, 0.08)", color: "#047857" }}>
                    <Award size={18} />
                  </div>
                  <div className="inquiry-benefit-text">
                    <h4>Accompagnement Continu</h4>
                    <p>Un encadrant technique et un guide spirituel bilingues restent joignables 24h/24 sur place.</p>
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
                        placeholder="Youssef Alami" 
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
                        placeholder="youssef.alami@example.com" 
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
                        placeholder="+33 6 99 88 77 66" 
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="formula">Formule choisie</label>
                      <select 
                        id="formula"
                        value={selectedFormula}
                        onChange={(e) => setSelectedFormula(e.target.value)}
                      >
                        {omraPackages.map((p) => (
                          <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="pilgrims">Nombre de pèlerins</label>
                      <select 
                        id="pilgrims"
                        value={formData.pilgrims}
                        onChange={(e) => setField("pilgrims", e.target.value)}
                      >
                        <option value="1">1 Personne</option>
                        <option value="2">2 Personnes (Chambre Double)</option>
                        <option value="3-4">Chambre Famille (3-4 pers.)</option>
                        <option value="5+">Groupe / Plus de 5</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="month">Mois de départ visé</label>
                      <select 
                        id="month"
                        value={formData.departureMonth}
                        onChange={(e) => setField("departureMonth", e.target.value)}
                      >
                        <option value="Octobre 2026">Octobre 2026 (Vacances Scolaires)</option>
                        <option value="Décembre 2026">Décembre 2026 (Climat idéal)</option>
                        <option value="Février 2027">Février 2027</option>
                        <option value="Ramadan 2027">Mois de Ramadan 2027 (Omra Ramadan)</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group full-width">
                    <label htmlFor="notes">Remarques, demandes spéciales ou besoins d&apos;assistance médicale</label>
                    <textarea 
                      id="notes" 
                      rows={3} 
                      value={formData.notes}
                      onChange={(e) => setField("notes", e.target.value)}
                      placeholder="Ex: besoin d'un fauteuil roulant, départ depuis une autre ville..."
                    />
                  </div>

                  <button className="button" type="submit" style={{ width: "100%", marginTop: "8px", background: "#047857", boxShadow: "0 6px 15px rgba(4, 120, 87, 0.3)" }}>
                    <Send size={16} /> Envoyer ma demande d&apos;inscription
                  </button>
                </form>
              ) : (
                <div className="form-success-box">
                  <div className="form-success-icon" style={{ background: "rgba(4, 120, 87, 0.1)", color: "#047857" }}>
                    <Check size={28} />
                  </div>
                  <h3>Demande Enregistrée !</h3>
                  <p style={{ marginBottom: "20px" }}>
                    Chaleureux remerciements <strong>{formData.name}</strong>. Votre pré-inscription pour la <strong>{activeFormulaObj.name}</strong> a bien été enregistrée pour <strong>{formData.departureMonth}</strong>.
                  </p>
                  <div style={{ background: "#f8fafc", border: "1px dashed var(--border)", borderRadius: "12px", padding: "16px", width: "100%", fontSize: "12px", textAlign: "left", marginBottom: "24px", color: "var(--text)" }}>
                    <div style={{ marginBottom: "6px" }}><strong>Formule :</strong> {activeFormulaObj.name}</div>
                    <div style={{ marginBottom: "6px" }}><strong>Participants :</strong> {formData.pilgrims === "1" ? "1 Pèlerin" : formData.pilgrims === "2" ? "2 Pèlerins" : formData.pilgrims}</div>
                    <div style={{ marginBottom: "6px" }}><strong>Départ souhaité :</strong> {formData.departureMonth}</div>
                    <div><strong>Prochaine étape :</strong> Un conseiller spécialiste du pèlerinage va étudier votre dossier. Vous recevrez les devis et la liste des documents requis par email ({formData.email}) sous 24h.</div>
                  </div>
                  <button className="button button-ghost" onClick={() => setSubmitted(false)}>
                    Faire une autre pré-inscription
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
