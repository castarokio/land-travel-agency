"use client";

import { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowLeft, 
  ArrowRight, 
  Star, 
  MapPin, 
  Share2, 
  Bookmark, 
  Hotel, 
  Map, 
  Clock, 
  ChevronDown, 
  ChevronUp 
} from "lucide-react";
import { MotionPageShell } from "@/components/MotionPageShell";
import { tourismDestinations } from "@/lib/site-data";

export default function DestinationDetailPageClient({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const dest = tourismDestinations.find((d) => d.id === id);

  // States for interactive components
  const [selectedDay, setSelectedDay] = useState(0);
  const [openHighlightIndex, setOpenHighlightIndex] = useState(0);
  const [openIncludedIndex, setOpenIncludedIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  if (!dest) {
    return (
      <div style={{ textAlign: "center", padding: "100px 20px" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "36px", marginBottom: "16px" }}>
          Destination Introuvable
        </h1>
        <p style={{ color: "var(--muted)", marginBottom: "28px" }}>
          Le voyage que vous recherchez n&apos;existe pas ou a été déplacé.
        </p>
        <Link href="/" className="button">
          Retour à l&apos;accueil
        </Link>
      </div>
    );
  }

  // Handle Share click
  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2000);
    }
  };

  // Get related adventures (other destinations)
  const relatedDestinations = tourismDestinations.filter((d) => d.id !== dest.id).slice(0, 3);

  return (
    <MotionPageShell className="dest-details-page-v2">
      
      {/* 1. HERO SECTION (Collage + Header info) */}
      <section className="dest-hero-section">
        <div className="container">
          
          {/* Header Back Navigation */}
          <div style={{ marginBottom: "24px", paddingTop: "32px" }}>
            <Link 
              href="/" 
              style={{ 
                display: "inline-flex", 
                alignItems: "center", 
                gap: "8px", 
                color: "var(--muted)", 
                fontSize: "13px", 
                fontWeight: "500", 
                textDecoration: "none" 
              }}
            >
              <ArrowLeft size={14} /> Retour à l&apos;accueil
            </Link>
          </div>

          {/* Title & Actions Row */}
          <div className="dest-header-row">
            <div className="dest-title-wrap">
              <h1>Évasion balnéaire : {dest.name}</h1>
              <div className="dest-meta-row">
                <span className="dest-meta-item">
                  <MapPin size={14} /> {dest.location}
                </span>
                <span className="dest-meta-item">
                  <Star size={14} fill="#fbbf24" stroke="none" /> 
                  <span className="rating-val">{dest.rating}</span>
                </span>
              </div>
            </div>

            <div className="dest-actions-wrap">
              <button className="dest-action-btn" onClick={handleShare}>
                <Share2 size={14} /> {shareSuccess ? "Copié !" : "Partager"}
              </button>
              <button 
                className={`dest-action-btn ${isSaved ? "active" : ""}`} 
                onClick={() => setIsSaved(!isSaved)}
              >
                <Bookmark size={14} fill={isSaved ? "currentColor" : "none"} /> 
                {isSaved ? "Enregistré" : "Enregistrer"}
              </button>
            </div>
          </div>

          {/* Hero Image Collage */}
          <div className="dest-hero-grid">
            <div className="dest-hero-main-img">
              <Image 
                src={dest.collage[0]} 
                alt={`${dest.name} main view`} 
                width={800} 
                height={480} 
                priority 
              />
            </div>
            <div className="dest-hero-side-wrap">
              <div className="dest-hero-side-img">
                <Image 
                  src={dest.collage[1]} 
                  alt={`${dest.name} side view 1`} 
                  width={400} 
                  height={234} 
                />
              </div>
              <div className="dest-hero-side-img">
                <Image 
                  src={dest.collage[2]} 
                  alt={`${dest.name} side view 2`} 
                  width={400} 
                  height={234} 
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. OFFER SUMMARY & DESCRIPTION SECTION */}
      <section className="dest-offer-section">
        <div className="container">
          <div className="dest-offer-grid">
            {/* Left Booking Info Card */}
            <div className="dest-booking-card">
              <h2 className="dest-booking-title">{dest.name} Bliss</h2>
              <p className="dest-booking-desc">
                {dest.shortDesc}
              </p>
              
              <div className="dest-booking-pills">
                <div className="dest-booking-pill">
                  <Hotel size={16} strokeWidth={1.5} />
                  <span>Hôtel & destination</span>
                </div>
                <div className="dest-booking-pill">
                  <Clock size={16} strokeWidth={1.5} />
                  <span>{dest.duration}</span>
                </div>
                <div className="dest-booking-pill">
                  <Map size={16} strokeWidth={1.5} />
                  <span>{dest.placesCount}</span>
                </div>
              </div>

              <div className="dest-booking-price-row">
                <div>
                  <div className="dest-booking-price-label">À partir de</div>
                  <div className="dest-booking-price-val">{dest.price}</div>
                </div>
                <Link href="/contact" className="dest-booking-btn">
                  Réserver maintenant
                </Link>
              </div>
            </div>

            {/* Right Presentation Description Block */}
            <div className="dest-desc-col">
              <span className="dest-eyebrow">[DESCRIPTION]</span>
              <p className="dest-desc-text">
                {dest.intro}
              </p>
              
              {/* Hotel recommendations listed cleanly inside description space */}
              <div style={{ marginTop: "32px", borderTop: "1px solid var(--border)", paddingTop: "24px" }}>
                <span className="dest-eyebrow" style={{ marginBottom: "16px", display: "block" }}>[OÙ SÉJOURNER]</span>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {dest.hotels.map((hotel, idx) => (
                    <div key={idx} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      <span style={{ fontSize: "11px", fontWeight: "600", textTransform: "uppercase", color: "var(--primary)" }}>
                        {hotel.type}
                      </span>
                      <h4 style={{ fontSize: "15px", fontWeight: "600", color: "var(--text)", margin: 0 }}>
                        {hotel.name}
                      </h4>
                      <p style={{ fontSize: "13.5px", color: "var(--muted)", margin: 0, lineHeight: "1.5" }}>
                        {hotel.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TRAVEL ITINERARY SECTION */}
      <section className="dest-itinerary-section">
        <div className="container">
          <div className="dest-section-title-wrap">
            <span className="dest-section-eyebrow">[PROGRAMME]</span>
            <h2 className="dest-section-title">Votre itinéraire de voyage</h2>
          </div>

          <div className="dest-itinerary-grid">
            {/* Day Tab Selectors */}
            <div className="dest-itinerary-list">
              {dest.itinerary.map((day, idx) => (
                <button 
                  key={idx}
                  className={`dest-itinerary-item ${selectedDay === idx ? "active" : ""}`}
                  onClick={() => setSelectedDay(idx)}
                >
                  <span>{day.title}</span>
                  <ArrowRight size={12} style={{ opacity: selectedDay === idx ? 1 : 0 }} />
                </button>
              ))}
            </div>

            {/* Center image that updates based on selection */}
            <div className="dest-itinerary-img-wrap">
              <Image 
                src={dest.itinerary[selectedDay].image} 
                alt={dest.itinerary[selectedDay].title} 
                width={600} 
                height={400} 
              />
            </div>

            {/* Right Day Details */}
            <div className="dest-itinerary-detail">
              <span className="dest-itinerary-detail-chip">
                Étape {selectedDay + 1}
              </span>
              <h3 className="dest-itinerary-detail-title">
                {dest.itinerary[selectedDay].subtitle}
              </h3>
              <p className="dest-itinerary-detail-desc">
                {dest.itinerary[selectedDay].desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TRAVEL HIGHLIGHTS SECTION */}
      <section className="dest-highlights-section">
        <div className="container">
          <div className="dest-section-title-wrap">
            <span className="dest-section-eyebrow">[POINTS FORTS]</span>
            <h2 className="dest-section-title">Expériences inoubliables</h2>
          </div>

          <div className="dest-highlights-grid">
            {/* Left Paragraph + Editorial Image */}
            <div className="dest-highlights-left">
              <p className="dest-highlights-left-text">
                Vivez des moments privilégiés au plus proche de la culture et des paysages. Notre formule propose un juste équilibre entre activités encadrées et temps libres d&apos;exploration personnelle.
              </p>
              <div className="dest-highlights-left-img">
                <Image 
                  src={dest.collage[1]} 
                  alt="Travelers highlight scene" 
                  width={500} 
                  height={280} 
                />
              </div>
            </div>

            {/* Right Numbered Accordion */}
            <div className="dest-accordion-list">
              {dest.highlights.map((highlight, idx) => {
                const isOpen = openHighlightIndex === idx;
                return (
                  <div key={idx} className="dest-accordion-item">
                    <button 
                      className="dest-accordion-header"
                      onClick={() => setOpenHighlightIndex(isOpen ? -1 : idx)}
                    >
                      <div className="dest-accordion-num-title">
                        <span className="dest-accordion-num">0{idx + 1}</span>
                        <span className="dest-accordion-title">{highlight.title}</span>
                      </div>
                      <span className="dest-accordion-icon">
                        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </span>
                    </button>
                    <div 
                      className="dest-accordion-content" 
                      style={{ 
                        maxHeight: isOpen ? "200px" : "0px",
                        opacity: isOpen ? 1 : 0
                      }}
                    >
                      {highlight.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHAT'S INCLUDED SECTION */}
      <section className="dest-included-section">
        <div className="container">
          <div className="dest-section-title-wrap">
            <span className="dest-section-eyebrow">[INCLUS]</span>
            <h2 className="dest-section-title">Ce qui est compris dans votre expérience</h2>
          </div>

          <div className="dest-included-grid">
            {/* Left Inclusions Accordion */}
            <div className="dest-accordion-list">
              {dest.whatsIncluded.map((included, idx) => {
                const isOpen = openIncludedIndex === idx;
                return (
                  <div key={idx} className="dest-accordion-item">
                    <button 
                      className="dest-accordion-header"
                      onClick={() => setOpenIncludedIndex(isOpen ? -1 : idx)}
                    >
                      <div className="dest-accordion-num-title">
                        <span className="dest-accordion-title">{included.title}</span>
                      </div>
                      <span className="dest-accordion-icon">
                        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </span>
                    </button>
                    <div 
                      className="dest-accordion-content" 
                      style={{ 
                        maxHeight: isOpen ? "200px" : "0px",
                        opacity: isOpen ? 1 : 0,
                        paddingLeft: "0px"
                      }}
                    >
                      {included.desc}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Vertical Image */}
            <div className="dest-included-right-img">
              <Image 
                src={dest.collage[2]} 
                alt="Inclusions and accommodations detail" 
                width={500} 
                height={380} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. RELATED ADVENTURES SECTION */}
      <section className="dest-explore-more-section">
        <div className="container">
          <div className="dest-section-title-wrap" style={{ marginBottom: "20px" }}>
            <span className="dest-section-eyebrow">[GALERIE]</span>
            <h2 className="dest-section-title">Explorer plus d&apos;aventures</h2>
          </div>

          <div className="dest-related-grid">
            {relatedDestinations.map((related, idx) => (
              <Link key={idx} href={`/services/tourism/destinations/${related.id}`} className="dest-related-card">
                <div className="dest-related-img-wrap">
                  <Image 
                    src={related.image} 
                    alt={related.name} 
                    width={400} 
                    height={225} 
                  />
                </div>
                <h3 className="dest-related-title">{related.name}</h3>
                <span className="dest-related-meta">{related.tagline}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. BOTTOM LARGE CTA BANNER (Full-Bleed, Edge-To-Edge) */}
      <section 
        className="dest-bottom-cta-banner"
        style={{ backgroundImage: `url(${dest.collage[0]})` }}
      >
        <div className="dest-bottom-cta-overlay"></div>
        <div className="dest-bottom-cta-content">
          <h2 className="dest-bottom-cta-title">
            Découvrez des destinations uniques, pensées pour vous
          </h2>
          <p className="dest-bottom-cta-desc">
            Chez Pathfinder, nous créons des voyages personnalisés selon vos envies. Laissez-nous organiser votre prochaine escapade de rêve.
          </p>
          <Link href="/#tourism" className="dest-bottom-cta-btn">
            Commencer <ArrowRight size={14} />
          </Link>
        </div>
      </section>

    </MotionPageShell>
  );
}
