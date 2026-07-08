"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  Compass,
  FileCheck2,
  GraduationCap,
  HandHeart,
  Hotel,
  Plane
} from "lucide-react";
import { asset, serviceJourney } from "@/lib/site-data";
import { gsap, shouldReduceMotion } from "@/components/home/animation";

const timelineIcons = [GraduationCap, Building2, FileCheck2, Hotel, HandHeart, Plane];

export function ServicesTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const pageRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const journeySteps = useMemo(
    () => [
      ...serviceJourney,
      {
        id: "study-abroad-start",
        title: "Start your journey in study abroad",
        shortTitle: "Study Abroad",
        detail:
          "Passez de l'idée au plan d'action : profil, destination, admission, visa et départ avec un accompagnement clair.",
        image: asset("hero-graduate-student.webp"),
        href: "/services/study-abroad",
        cta: "Start your journey"
      }
    ],
    []
  );

  useEffect(() => {
    if (!pageRef.current || !scrollRef.current || !progressRef.current || shouldReduceMotion()) return;

    const context = gsap.context(() => {
      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: scrollRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.12,
          onUpdate: (self) => {
            const nextIndex = Math.min(
              journeySteps.length - 1,
              Math.round(self.progress * (journeySteps.length - 1))
            );
            setActiveIndex(nextIndex);
          }
        }
      });
    }, pageRef);

    return () => context.revert();
  }, [journeySteps.length]);

  function getPosition(index: number) {
    if (index === activeIndex) return "center";
    if (index === activeIndex - 1) return "left";
    if (index === activeIndex + 1) return "right";
    return "hidden";
  }

  function goToStep(index: number) {
    setActiveIndex(index);

    const section = scrollRef.current;
    if (!section) return;

    const scrollable = section.offsetHeight - window.innerHeight;
    const target = section.offsetTop + (scrollable * index) / (journeySteps.length - 1);
    window.scrollTo({ top: target, behavior: "smooth" });
  }

  return (
    <div className="services-page" ref={pageRef}>
      <section className="services-page-hero">
        <div className="container">
          <Link className="back-link" href="/">
            <ArrowLeft size={16} /> Accueil
          </Link>
          <p className="section-label">Nos services</p>
          <h1>Notre objectif, le succès de vos démarches</h1>
          <p>
            Un parcours complet pour transformer votre projet en étapes suivies : orientation, admission, visa,
            {" logement et accompagnement jusqu'au départ."}
          </p>
        </div>
      </section>

      <section
        className="services-horizontal-scroll"
        ref={scrollRef}
        style={{ "--step-count": journeySteps.length } as React.CSSProperties}
      >
        <div className="services-horizontal-sticky">
          <nav className="services-progress horizontal" aria-label="Progression des services">
            <div className="services-progress-line">
              <div className="services-progress-fill" ref={progressRef} />
            </div>
            <div className="container services-progress-grid">
              {journeySteps.map((step, index) => (
                <button
                  className={`services-progress-item ${index <= activeIndex ? "complete" : ""} ${index === activeIndex ? "current" : ""}`}
                  type="button"
                  aria-current={index === activeIndex ? "step" : undefined}
                  onClick={() => goToStep(index)}
                  key={step.id}
                >
                  <span>
                    <Check size={13} />
                  </span>
                  <strong>{step.shortTitle}</strong>
                </button>
              ))}
            </div>
          </nav>

          <div className="services-orbit" aria-live="polite">
            {journeySteps.map((step, index) => {
              const Icon = timelineIcons[index] || GraduationCap;
              const position = getPosition(index);
              const isFinal = index === journeySteps.length - 1;

              return (
                <article className={`service-orbit-card ${position}`} id={step.id} key={step.id}>
                  <div className="service-orbit-copy">
                    <span className="service-step-kicker">
                      <Icon size={19} /> {isFinal ? "Prochaine étape" : `Étape ${index + 1}`}
                    </span>
                    <h2>{step.title}</h2>
                    <p>{step.detail}</p>
                    <Link className="button button-small" href={step.href}>
                      {isFinal ? step.cta : "Parler à un conseiller"} <ArrowRight size={14} />
                    </Link>
                  </div>
                  <div className="service-orbit-image">
                    <Image src={step.image} width={640} height={420} alt={step.title} priority={index <= 1} />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="service-placeholders">
        <div className="container service-placeholder-grid">
          <article>
            <span>
              <Compass size={20} />
            </span>
            <p className="section-label">Tourisme</p>
            <h2>Packages tourisme à venir</h2>
            <p>
              Cet espace accueillera les voyages locaux et internationaux : circuits, hôtels, activités et demandes de devis.
            </p>
            <Link href="/services/tourism">Voir la base tourisme</Link>
          </article>
          <article>
            <span>
              <Plane size={20} />
            </span>
            <p className="section-label">Omra</p>
            <h2>Formules Omra à venir</h2>
            <p>
              Cet espace sera dédié aux formules Omra : visa, vols, hôtels, transferts, Ziyarat et accompagnement.
            </p>
            <Link href="/services/omra">Voir la base Omra</Link>
          </article>
        </div>
      </section>
    </div>
  );
}
