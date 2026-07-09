"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./AdmissionsTimeline.module.css";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    period: "Octobre - Novembre",
    title: "Orientation & Choix du Projet",
    desc: "Analyse des relevés, entretien d'orientation, choix des pays et universités cibles.",
    tags: ["Audit BAC", "Pays cibles", "Universités", "Budget"],
    week: "phase 1",
  },
  {
    period: "Décembre - Février",
    title: "Candidatures & Dossier",
    desc: "Lettres de motivation, CV académique, Campus France ou portails universitaires.",
    tags: ["Motivation", "CV", "Portails", "Dépôt"],
    week: "phase 2",
  },
  {
    period: "Mars - Avril",
    title: "Tests & Entretiens",
    desc: "Tests linguistiques, entretiens académiques et ajustement des choix selon les réponses.",
    tags: ["TCF / IELTS", "Entretien", "Suivi", "Relances"],
    week: "phase 3",
  },
  {
    period: "Mai - Septembre",
    title: "Visa & Départ",
    desc: "Acceptation, acompte, dossier consulaire, hébergement, billet et briefing avant départ.",
    tags: ["Acceptation", "Visa", "Logement", "Accueil"],
    week: "phase 4",
  },
];

export function AdmissionsTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reduceMotion.matches) {
      gsap.set(cardsRef.current, { autoAlpha: 1, clearProps: "transform" });
      return;
    }

    const getBaseOffset = (index: number) => (window.innerWidth > 1040 && index % 2 === 1 ? 58 : 0);

    const context = gsap.context(() => {
      gsap.set(cardsRef.current, {
        autoAlpha: 0,
        y: (index) => getBaseOffset(index) + 96,
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=210%",
          pin: true,
          scrub: 0.85,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(cardsRef.current, {
          autoAlpha: 1,
          y: (index) => getBaseOffset(index),
          duration: 1,
          ease: "power3.out",
          stagger: 0.22,
        })
        .to({}, { duration: 0.35 })
        .to(cardsRef.current, {
          autoAlpha: 0,
          y: (index) => getBaseOffset(index) - 96,
          duration: 1,
          ease: "power3.inOut",
          stagger: 0.22,
        });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section className={styles.timelineSection} aria-labelledby="admissions-timeline-title" ref={sectionRef}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <div className={styles.headerLabel}>
            <span>03</span>
            <strong>Calendrier du projet</strong>
          </div>
          <div className={styles.headerLine} aria-hidden="true" />
          <p>
            Un calendrier précis structure les <mark>phases clés</mark> et les <em>actions</em> à mener
            pour transformer votre projet d&apos;études en dossier prêt à déposer.
          </p>
        </header>

        <div className={styles.cardTrack}>
          {steps.map((step, index) => (
            <article
              className={styles.timelineCard}
              key={step.title}
              ref={(node) => {
                if (node) {
                  cardsRef.current[index] = node;
                }
              }}
            >
              <div className={styles.markerLine} aria-hidden="true">
                {[0, 1, 2, 3].map((dot) => (
                  <span className={dot === index ? styles.activeDot : ""} key={dot} />
                ))}
                <small>{step.week}</small>
              </div>

              <span className={styles.period}>{step.period}</span>
              <h2 id={index === 0 ? "admissions-timeline-title" : undefined}>{step.title}</h2>
              <p>{step.desc}</p>

              <div className={styles.tags}>
                {step.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
