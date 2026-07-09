"use client";

import { useEffect } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger, shouldReduceMotion } from "@/lib/animation";

function SplitLine({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={`split-line ${className}`}>
      <span className="split-line-inner">{text}</span>
    </span>
  );
}

export function Hero() {
  useEffect(() => {
    if (shouldReduceMotion()) return;

    const context = gsap.context(() => {
      gsap.from([".hero-eyebrow", ".hero-lead", ".hero-journey-wrap"], {
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
        <source src="/assets/hero-jet-takeoff.mp4" type="video/mp4" />
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
          <div className="hero-journey-wrap">
            <Link className="hero-journey-button" href="/contact">
              <span>Start your journey</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
