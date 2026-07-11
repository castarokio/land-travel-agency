"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  ChevronDown,
  ChevronUp,
  Clock,
  Hotel,
  Map,
  MapPin,
  Share2,
  Star,
} from "lucide-react";
import { MotionPageShell } from "@/components/ui/MotionPageShell";
import { Destination } from "@/types";
import { Button } from "@/components/ui/Button";

export default function DestinationDetailPageClient({ params, destinations }: { params: Promise<{ id: string }>; destinations: Destination[] }) {
  const { id } = use(params);
  const dest = destinations.find((destination) => destination.id === id);
  const [selectedDay, setSelectedDay] = useState(0);
  const [openHighlightIndex, setOpenHighlightIndex] = useState(0);
  const [openIncludedIndex, setOpenIncludedIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  if (!dest) {
    return (
      <div className="text-center py-24 px-6 max-w-xl mx-auto flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-text mb-4">
          Destination Introuvable
        </h1>
        <p className="text-muted mb-8">
          Le voyage que vous recherchez n&apos;existe pas ou a été déplacé.
        </p>
        <Button href="/" variant="primary">
          Retour à l&apos;accueil
        </Button>
      </div>
    );
  }

  const handleShare = async () => {
    if (typeof window === "undefined") return;

    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareSuccess(true);
      window.setTimeout(() => setShareSuccess(false), 2000);
    } catch {
      setShareSuccess(false);
    }
  };

  const relatedDestinations = destinations
    .filter((destination) => destination.id !== dest.id)
    .slice(0, 3);

  return (
    <MotionPageShell className="dest-details-page-v2">
          <section className="dest-hero-section">
            <div className="container">
              <div className="dest-back-wrap">
                <Link className="dest-back-link" href="/">
                  <ArrowLeft size={14} />
                  Retour à l&apos;accueil
                </Link>
              </div>

              <div className="dest-header-row">
                <div className="dest-title-wrap">
                  <h1>Évasion balnéaire : {dest.name}</h1>
                  <div className="dest-meta-row">
                    <span className="dest-meta-item">
                      <MapPin size={14} />
                      {dest.location}
                    </span>
                    <span className="dest-meta-item">
                      <Star size={14} fill="#fbbf24" stroke="none" />
                      <span className="rating-val">{dest.rating}</span>
                    </span>
                  </div>
                </div>

                <div className="dest-actions-wrap">
                  <button className="dest-action-btn" type="button" onClick={handleShare}>
                    <Share2 size={14} />
                    {shareSuccess ? "Copié !" : "Partager"}
                  </button>
                  <button
                    className={`dest-action-btn ${isSaved ? "active" : ""}`}
                    type="button"
                    onClick={() => setIsSaved((value) => !value)}
                  >
                    <Bookmark size={14} fill={isSaved ? "currentColor" : "none"} />
                    {isSaved ? "Enregistré" : "Enregistrer"}
                  </button>
                </div>
              </div>

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

          <section className="dest-offer-section">
            <div className="container">
              <div className="dest-offer-grid">
                <div className="dest-booking-card">
                  <h2 className="dest-booking-title">{dest.name} Bliss</h2>
                  <p className="dest-booking-desc">{dest.shortDesc}</p>

                  <div className="dest-booking-pills">
                    <div className="dest-booking-pill">
                      <Hotel size={16} strokeWidth={1.5} />
                      <span>Hôtel &amp; destination</span>
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
                    <Link className="dest-booking-btn" href="/contact">
                      Réserver maintenant
                    </Link>
                  </div>
                </div>

                <div className="dest-desc-col">
                  <span className="dest-eyebrow">[DESCRIPTION]</span>
                  <p className="dest-desc-text">{dest.intro}</p>
                  <div className="dest-hotels-block">
                    <span className="dest-eyebrow dest-hotels-eyebrow">[OÙ SÉJOURNER]</span>
                    <div className="dest-hotels-list">
                      {dest.hotels.map((hotel) => (
                        <div className="dest-hotel-item" key={hotel.name}>
                          <span>{hotel.type}</span>
                          <h4>{hotel.name}</h4>
                          <p>{hotel.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="dest-itinerary-section">
            <div className="container">
              <div className="dest-section-title-wrap">
                <span className="dest-section-eyebrow">[PROGRAMME]</span>
                <h2 className="dest-section-title">Votre itinéraire de voyage</h2>
              </div>

              <div className="dest-itinerary-grid">
                <div className="dest-itinerary-list">
                  {dest.itinerary.map((day, index) => {
                    const isActive = selectedDay === index;

                    return (
                      <button
                        className={`dest-itinerary-item ${isActive ? "active" : ""}`}
                        key={day.title}
                        type="button"
                        onClick={() => setSelectedDay(index)}
                      >
                        <span>{day.title}</span>
                        <ArrowRight size={12} style={{ opacity: isActive ? 1 : 0 }} />
                      </button>
                    );
                  })}
                </div>

                <div className="dest-itinerary-img-wrap">
                  <Image
                    src={dest.itinerary[selectedDay].image}
                    alt={dest.itinerary[selectedDay].title}
                    width={600}
                    height={400}
                  />
                </div>

                <div className="dest-itinerary-detail">
                  <span className="dest-itinerary-detail-chip">Étape {selectedDay + 1}</span>
                  <h3 className="dest-itinerary-detail-title">
                    {dest.itinerary[selectedDay].subtitle}
                  </h3>
                  <p className="dest-itinerary-detail-desc">{dest.itinerary[selectedDay].desc}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="dest-highlights-section">
            <div className="container">
              <div className="dest-section-title-wrap">
                <span className="dest-section-eyebrow">[POINTS FORTS]</span>
                <h2 className="dest-section-title">Expériences inoubliables</h2>
              </div>

              <div className="dest-highlights-grid">
                <div className="dest-highlights-left">
                  <p className="dest-highlights-left-text">
                    Vivez des moments privilégiés au plus proche de la culture et des paysages.
                    Notre formule propose un juste équilibre entre activités encadrées et temps
                    libres d&apos;exploration personnelle.
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

                <div className="dest-accordion-list">
                  {dest.highlights.map((highlight, index) => {
                    const isOpen = openHighlightIndex === index;

                    return (
                      <div className="dest-accordion-item" key={highlight.title}>
                        <button
                          className="dest-accordion-header"
                          type="button"
                          aria-expanded={isOpen}
                          onClick={() => setOpenHighlightIndex(isOpen ? -1 : index)}
                        >
                          <div className="dest-accordion-num-title">
                            <span className="dest-accordion-num">0{index + 1}</span>
                            <span className="dest-accordion-title">{highlight.title}</span>
                          </div>
                          <span className="dest-accordion-icon">
                            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </span>
                        </button>
                        <div
                          className="dest-accordion-content"
                          style={{ maxHeight: isOpen ? "200px" : "0px", opacity: isOpen ? 1 : 0 }}
                        >
                          <p style={{ margin: 0 }}>{highlight.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          <section className="dest-included-section">
            <div className="container">
              <div className="dest-section-title-wrap">
                <span className="dest-section-eyebrow">[INCLUS]</span>
                <h2 className="dest-section-title">Ce qui est compris dans votre expérience</h2>
              </div>

              <div className="dest-included-grid">
                <div className="dest-accordion-list">
                  {dest.whatsIncluded.map((included, index) => {
                    const isOpen = openIncludedIndex === index;

                    return (
                      <div className="dest-accordion-item" key={included.title}>
                        <button
                          className="dest-accordion-header"
                          type="button"
                          aria-expanded={isOpen}
                          onClick={() => setOpenIncludedIndex(isOpen ? -1 : index)}
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
                            paddingLeft: 0,
                          }}
                        >
                          <p style={{ margin: 0 }}>{included.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

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

          <section className="dest-explore-more-section">
            <div className="container">
              <div className="dest-section-title-wrap dest-related-title-wrap">
                <span className="dest-section-eyebrow">[GALERIE]</span>
                <h2 className="dest-section-title">Explorer plus d&apos;aventures</h2>
              </div>

              <div className="dest-related-grid">
                {relatedDestinations.map((related) => (
                  <Link
                    className="dest-related-card"
                    href={`/tourism/destination/${related.id}`}
                    key={related.id}
                  >
                    <div className="dest-related-img-wrap">
                      <Image src={related.image} alt={related.name} width={400} height={225} />
                    </div>
                    <h3 className="dest-related-title">{related.name}</h3>
                    <span className="dest-related-meta">{related.tagline}</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section
            className="dest-bottom-cta-banner"
            style={{ backgroundImage: `url(${dest.collage[0]})` }}
          >
            <div className="dest-bottom-cta-overlay" />
            <div className="dest-bottom-cta-content">
              <h2 className="dest-bottom-cta-title">
                Découvrez des destinations uniques, pensées pour vous
              </h2>
              <p className="dest-bottom-cta-desc">
                Chez Pathfinder, nous créons des voyages personnalisés selon vos envies. Laissez-nous
                organiser votre prochaine escapade de rêve.
              </p>
              <Link className="dest-bottom-cta-btn" href="/#tourism">
                Commencer <ArrowRight size={14} />
              </Link>
            </div>
          </section>
    </MotionPageShell>
  );
}


