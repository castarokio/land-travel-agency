"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowLeft, Award, Check, Compass, Phone, Send, Star } from "lucide-react";
import { MotionPageShell } from "@/components/MotionPageShell";
import { useInquiryForm } from "@/components/inquiry/useInquiryForm";
import { asset, localTours } from "@/lib/site-data";

export default function LocalTourismPageClient() {
  const [selectedTour, setSelectedTour] = useState(localTours[0].id);
  const { formData, handleSubmit, setField, setSubmitted, submitted } = useInquiryForm({
    name: "",
    email: "",
    phone: "",
    travelers: "1",
    date: "",
    notes: ""
  });

  const handleSelectTour = (tourId: string) => {
    setSelectedTour(tourId);
    // Scroll down to form
    const formSection = document.getElementById("inquiry-form-section");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const activeTourObj = localTours.find(t => t.id === selectedTour) || localTours[0];

  return (
    <MotionPageShell className="service-page-shell local-tourism-page-shell">
      {/* Hero Header */}
      <section className="service-hero" style={{ backgroundImage: `url(${asset("local-desert-sunset.webp")})` }}>
        <div className="container">
          <Link className="back-link" href="/" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "var(--yellow)", fontSize: "12px", fontWeight: "700", marginBottom: "20px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            <ArrowLeft size={14} /> Retour à l&apos;accueil
          </Link>
          <p className="section-label" style={{ color: "var(--yellow)" }}>Régional & Authentique</p>
          <h1>Tourisme Local & Circuits d&apos;Aventure</h1>
          <p style={{ maxWidth: "600px", margin: "0 auto" }}>
            Partez à la rencontre des paysages grandioses de notre terroir. Désert saharien, cités impériales chargées d&apos;histoire et randonnées sauvages vous attendent.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="container" style={{ marginTop: "64px" }}>
        <div className="packages-grid">
          {localTours.map((tour) => (
            <article className="package-card" key={tour.id}>
              <div className="package-image-wrap">
                <Image src={tour.image} alt={tour.title} width={560} height={340} />
                <span className="package-badge-overlay" style={{ background: "var(--orange)", color: "#fff" }}>Local</span>
                <span className="package-duration-overlay">{tour.duration}</span>
              </div>
              <div className="package-content">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <span style={{ fontSize: "11px", color: "var(--orange)", fontWeight: "800", textTransform: "uppercase" }}>Circuit Découverte</span>
                  <div style={{ display: "flex", gap: "2px", color: "var(--yellow)" }}><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /></div>
                </div>
                <h3>{tour.title}</h3>
                <p className="package-description">{tour.description}</p>
                
                <h4 style={{ fontSize: "11px", textTransform: "uppercase", color: "var(--text)", marginBottom: "12px", fontWeight: "700", letterSpacing: "0.04em" }}>Prestations Incluses :</h4>
                <ul className="package-features">
                  {tour.details.map((detail, idx) => (
                    <li key={idx}><Check size={14} /> <span>{detail}</span></li>
                  ))}
                </ul>

                <div className="package-footer">
                  <div className="package-price-wrap">
                    <span className="package-price-label">Tarif indicatif</span>
                    <span className="package-price-value">{tour.price}</span>
                  </div>
                  <button className="button button-small" onClick={() => handleSelectTour(tour.id)}>
                    Réserver / Se renseigner
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Inquiry Form Section */}
      <section className="inquiry-section" id="inquiry-form-section">
        <div className="container">
          <div className="inquiry-grid">
            {/* Left Col - Benefits */}
            <div className="inquiry-info">
              <span className="section-label">Devis Gratuit</span>
              <h2>Planifiez votre expédition</h2>
              <p>
                Remplissez ce formulaire et notre conseiller local vous recontactera sous 24h ouvrées pour finaliser les détails de votre voyage sur mesure.
              </p>

              <div className="inquiry-benefits">
                <div className="inquiry-benefit-item">
                  <div className="inquiry-benefit-icon"><Compass size={18} /></div>
                  <div className="inquiry-benefit-text">
                    <h4>Itinéraires Flexibles</h4>
                    <p>Modifiez le rythme, l&apos;hébergement et les activités selon vos envies.</p>
                  </div>
                </div>

                <div className="inquiry-benefit-item">
                  <div className="inquiry-benefit-icon"><Award size={18} /></div>
                  <div className="inquiry-benefit-text">
                    <h4>Accompagnement Expert</h4>
                    <p>Des chauffeurs et guides professionnels agréés pour votre confort et sécurité.</p>
                  </div>
                </div>

                <div className="inquiry-benefit-item">
                  <div className="inquiry-benefit-icon"><Phone size={18} /></div>
                  <div className="inquiry-benefit-text">
                    <h4>Assistance Locale H24</h4>
                    <p>Une ligne téléphonique directe disponible pendant toute la durée de votre séjour.</p>
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
                        placeholder="Jean Dupont" 
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
                        placeholder="jean.dupont@example.com" 
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
                        placeholder="+33 6 12 34 56 78" 
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="tour">Circuit Sélectionné</label>
                      <select 
                        id="tour"
                        value={selectedTour}
                        onChange={(e) => setSelectedTour(e.target.value)}
                      >
                        {localTours.map((t) => (
                          <option key={t.id} value={t.id}>{t.title}</option>
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
                        <option value="2">2 Personnes</option>
                        <option value="3-5">Famille (3-5 pers.)</option>
                        <option value="6+">Groupe (6+ pers.)</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="date">Date de départ souhaitée</label>
                      <input 
                        type="date" 
                        id="date" 
                        value={formData.date}
                        onChange={(e) => setField("date", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group full-width">
                    <label htmlFor="notes">Demandes spéciales / Remarques</label>
                    <textarea 
                      id="notes" 
                      rows={4} 
                      value={formData.notes}
                      onChange={(e) => setField("notes", e.target.value)}
                      placeholder="Ex: lit bébé nécessaire, allergies alimentaires, vol de nuit..."
                    />
                  </div>

                  <button className="button" type="submit" style={{ width: "100%", marginTop: "8px" }}>
                    <Send size={16} /> Envoyer ma demande
                  </button>
                </form>
              ) : (
                <div className="form-success-box">
                  <div className="form-success-icon">
                    <Check size={28} />
                  </div>
                  <h3>Demande Reçue !</h3>
                  <p style={{ marginBottom: "20px" }}>
                    Merci <strong>{formData.name}</strong>. Votre demande de renseignements pour le circuit <strong>&quot;{activeTourObj.title}&quot;</strong> a été enregistrée.
                  </p>
                  <div style={{ background: "#f8fafc", border: "1px dashed var(--border)", borderRadius: "12px", padding: "16px", width: "100%", fontSize: "12px", textAlign: "left", marginBottom: "24px", color: "var(--text)" }}>
                    <div style={{ marginBottom: "6px" }}><strong>Voyageurs :</strong> {formData.travelers === "1" ? "1 Voyageur" : formData.travelers === "2" ? "2 Voyageurs" : formData.travelers}</div>
                    {formData.date && <div style={{ marginBottom: "6px" }}><strong>Départ estimé :</strong> {formData.date}</div>}
                    <div><strong>Statut :</strong> Un conseiller vous contactera par email ({formData.email}) ou par téléphone ({formData.phone}) sous 24h.</div>
                  </div>
                  <button className="button button-ghost" onClick={() => setSubmitted(false)}>
                    Faire une autre demande
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
