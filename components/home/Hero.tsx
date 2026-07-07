"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CalendarDays, ChevronRight, MapPin, PlaneTakeoff } from "lucide-react";
import { gsap, ScrollTrigger, shouldReduceMotion } from "@/components/home/animation";
import { SplitLine } from "@/components/home/SplitLine";

export function Hero() {
  useEffect(() => {
    if (shouldReduceMotion()) return;

    const context = gsap.context(() => {
      gsap.from([".hero-eyebrow", ".hero-lead", ".hero-buttons", ".hero-intent-panel"], {
        y: 26,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.15
      });

      gsap.to(".hero-video", {
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      ScrollTrigger.refresh();
    });

    return () => context.revert();
  }, []);

  return (
    <section className="hero-section">
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src="/assets/hero-airport-walk.mp4" type="video/mp4" />
      </video>
      <div className="hero-video-overlay" aria-hidden="true" />

      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="hero-eyebrow">{"Agence Land Travel"}</p>
          <h1 className="split-heading">
            <SplitLine text="Voyages, Omra" />
            <SplitLine text="et études" className="accent-line" />
            <SplitLine text="organisés de" />
            <SplitLine text="A à Z" />
          </h1>
          <p className="hero-lead">
            {"Nous préparons votre dossier, vos réservations et votre départ avec un conseiller qui suit chaque étape jusqu'au voyage."}
          </p>
          <div className="hero-buttons">
            <Link className="button hero-button" href="#services">
              {"Demander un devis"}
            </Link>
            <Link className="button button-ghost hero-button-secondary" href="/contact">
              {"Parler à un conseiller"}
            </Link>
          </div>

          <div className="hero-intent-panel" aria-label="Démarrer une demande">
            <div>
              <span><PlaneTakeoff size={16} /> Projet</span>
              <strong>Études, tourisme ou Omra</strong>
            </div>
            <div>
              <span><MapPin size={16} /> Destination</span>
              <strong>Selon votre budget</strong>
            </div>
            <div>
              <span><CalendarDays size={16} /> Réponse</span>
              <strong>Proposition sous 24h</strong>
            </div>
            <Link href="/contact" aria-label="Commencer ma demande">
              <ChevronRight size={20} />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
