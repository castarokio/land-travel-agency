"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  GraduationCap,
} from "lucide-react";
import styles from "./program-finder.module.css";

const languages = [
  "Français",
  "Anglais",
  "Arabe",
  "Espagnol",
  "Allemand",
  "Italien",
  "Turc",
  "Russe",
  "Chinois",
  "Japonais",
  "Coréen",
  "Portugais",
  "Néerlandais",
  "Suédois",
  "Norvégien",
  "Danois",
  "Finnois",
  "Polonais",
  "Roumain",
  "Grec",
  "Hindi",
  "Ourdou",
  "Malais",
  "Indonésien",
  "Thaï",
  "Vietnamien",
  "Tchèque",
  "Hongrois",
  "Ukrainien",
  "Persan",
];

const steps = [
  {
    id: "goal",
    label: "Objectif",
    title: "Quel type d'aide cherchez-vous pour vos études ?",
    description: "Dites-nous où vous êtes bloqué afin de proposer des programmes et destinations vraiment utiles.",
  },
  {
    id: "level",
    label: "Niveau",
    title: "Quel est votre niveau d'études ?",
    description: "Sélectionnez le niveau ciblé pour filtrer les bons programmes.",
  },
  {
    id: "field",
    label: "Domaine",
    title: "Quel major souhaitez-vous étudier ?",
    description: "Choisissez un domaine. Les images sont provisoires et pourront être remplacées.",
  },
  {
    id: "language",
    label: "Langues",
    title: "Quelles langues parlez-vous ?",
    description: "Vous pouvez choisir plusieurs langues parmi les 30 options.",
  },
  {
    id: "destination",
    label: "Destination",
    title: "Où aimeriez-vous étudier ?",
    description: "Choisissez une destination prioritaire pour comparer les programmes.",
  },
] as const;

const options = {
  goal: [
    { label: "Je ne sais pas quoi étudier", detail: "Recevoir des idées de programmes selon mon profil" },
    { label: "Je connais mon domaine", detail: "Trouver les meilleurs pays et écoles pour ce major" },
    { label: "Je veux préparer mon admission", detail: "Comprendre les documents et étapes de candidature" },
  ],
  level: [
    { label: "Bachelor", detail: "Licence, Bachelor ou premier cycle" },
    { label: "Master", detail: "Deuxième cycle ou spécialisation" },
    { label: "Doctorat", detail: "Recherche, PhD ou troisième cycle" },
  ],
  field: [
    { label: "Business & Management", detail: "Commerce, gestion, finance", image: "/assets/collage-student.jpg" },
    { label: "Informatique & IA", detail: "Software, data, intelligence artificielle", image: "/assets/hero-study-consultation.webp" },
    { label: "Santé & Sciences", detail: "Médecine, biologie, laboratoires", image: "/assets/why-choose-student-illustration.png" },
    { label: "Ingénierie", detail: "Mécanique, civil, électrique", image: "/assets/destination-germany.webp" },
  ],
  destination: [
    { label: "Canada", detail: "Programmes en français et anglais", image: "/assets/program-finder/canada.png" },
    { label: "France", detail: "Campus France et admissions directes", image: "/assets/program-finder/france.png" },
    { label: "Royaume-Uni", detail: "UCAS et universités anglophones", image: "/assets/program-finder/united-kingdom.png" },
    { label: "Turquie", detail: "Coûts accessibles et bourses", image: "/assets/program-finder/turkey.png" },
    { label: "Malaisie", detail: "Campus internationaux en anglais", image: "/assets/program-finder/malaysia.png" },
    { label: "Allemagne", detail: "Public, technique et recherche", image: "/assets/destination-germany.webp" },
  ],
};

const matchingPrograms = [
  {
    title: "Bachelor en Informatique appliquée",
    country: "Canada",
    fit: "Très recommandé",
    detail: "Bon choix pour un profil Bachelor avec français / anglais.",
    image: "/assets/program-finder/canada.png",
  },
  {
    title: "Bachelor Business & Digital Management",
    country: "France",
    fit: "Option équilibrée",
    detail: "Parcours adapté si vous cherchez un cadre francophone.",
    image: "/assets/program-finder/france.png",
  },
  {
    title: "Foundation + Bachelor Computing",
    country: "Royaume-Uni",
    fit: "Parcours anglophone",
    detail: "Bon choix si vous souhaitez renforcer votre anglais académique.",
    image: "/assets/program-finder/united-kingdom.png",
  },
  {
    title: "Bachelor Software Engineering",
    country: "Malaisie",
    fit: "Coût accessible",
    detail: "Alternative internationale avec enseignement en anglais.",
    image: "/assets/program-finder/malaysia.png",
  },
];

type StepId = (typeof steps)[number]["id"];

type Answers = {
  goal: string;
  level: string;
  field: string;
  language: string[];
  destination: string;
};

const initialAnswers: Answers = {
  goal: "Trouver un programme",
  level: "Bachelor",
  field: "Informatique & IA",
  language: ["Français", "Anglais"],
  destination: "Canada",
};

export function ProgramFinderClient() {
  const [stepIndex, setStepIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const activeStep = steps[stepIndex];
  const progress = completed ? 100 : Math.round(((stepIndex + 1) / steps.length) * 100);

  const summary = useMemo(
    () => [
      answers.level,
      answers.field,
      answers.destination,
      `${answers.language.length} langue${answers.language.length > 1 ? "s" : ""}`,
    ],
    [answers]
  );

  const setSingle = (key: Exclude<StepId, "language">, value: string) => {
    setAnswers((current) => ({ ...current, [key]: value }));
  };

  const toggleLanguage = (language: string) => {
    setAnswers((current) => {
      const selected = current.language.includes(language);
      return {
        ...current,
        language: selected
          ? current.language.filter((item) => item !== language)
          : [...current.language, language],
      };
    });
  };

  const goNext = () => {
    if (stepIndex === steps.length - 1) {
      setCompleted(true);
      return;
    }

    setStepIndex((current) => Math.min(current + 1, steps.length - 1));
  };
  const goBack = () => {
    if (completed) {
      setCompleted(false);
      return;
    }

    setStepIndex((current) => Math.max(current - 1, 0));
  };

  return (
    <main className={styles.page}>
      <section className={styles.cardShell} aria-label="Aidez-moi à trouver mon programme">
        <aside className={styles.rail}>
          <Link href="/study-abroad" className={styles.backLink}>
            <ArrowLeft size={16} />
            Études à l&apos;étranger
          </Link>

          <div className={styles.railArtwork} aria-hidden="true">
            <div className={styles.orbitOne} />
            <div className={styles.orbitTwo} />
            <div className={styles.studentShape}>
              <GraduationCap size={74} />
            </div>
          </div>

          <nav className={styles.progressList} aria-label="Progression">
            {steps.map((step, index) => {
              const isActive = index === stepIndex;
              const isDone = completed || index < stepIndex;
              return (
                <button
                  key={step.id}
                  type="button"
                  className={`${styles.progressStep} ${isActive ? styles.active : ""} ${isDone ? styles.done : ""}`}
                  onClick={() => {
                    setCompleted(false);
                    setStepIndex(index);
                  }}
                >
                  <span>{isDone ? <Check size={16} /> : String(index + 1).padStart(2, "0")}</span>
                  <strong>{step.label}</strong>
                </button>
              );
            })}
          </nav>
        </aside>

        <section className={styles.panel}>
          <div className={styles.panelTop}>
            <div>
              <p>Programme Finder</p>
              <strong>{progress}% complété</strong>
            </div>
            <Link href="/study-abroad">Quitter</Link>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={completed ? "results" : activeStep.id}
              initial={{ opacity: 0, x: 34, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -26, filter: "blur(6px)" }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              className={styles.stepContent}
            >
              {completed ? (
                <div className={styles.resultsView}>
                  <p className={styles.kicker}>Résultats</p>
                  <h1>Programmes qui correspondent à votre profil</h1>
                  <p className={styles.description}>
                    Voici une première sélection horizontale basée sur votre niveau, domaine,
                    langues et destination. Vous pourrez remplacer ces résultats plus tard.
                  </p>
                  <div className={styles.resultScroller}>
                    {matchingPrograms.map((program) => (
                      <article key={program.title} className={styles.resultCard}>
                        <div className={styles.resultImage}>
                          <Image src={program.image} alt={program.country} fill sizes="280px" />
                        </div>
                        <div>
                          <span>{program.fit}</span>
                          <h2>{program.title}</h2>
                          <strong>{program.country}</strong>
                          <p>{program.detail}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <p className={styles.kicker}>{activeStep.label}</p>
                  <h1>{activeStep.title}</h1>
                  <p className={styles.description}>{activeStep.description}</p>
                </>
              )}

              {!completed && activeStep.id === "language" ? (
                <motion.div
                  className={styles.languageGrid}
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: {},
                    show: { transition: { staggerChildren: 0.018 } },
                  }}
                >
                  {languages.map((language) => {
                    const selected = answers.language.includes(language);
                    return (
                      <motion.button
                        variants={{
                          hidden: { opacity: 0, y: 12 },
                          show: { opacity: 1, y: 0 },
                        }}
                        transition={{ duration: 0.2 }}
                        type="button"
                        key={language}
                        className={selected ? styles.selectedPill : ""}
                        onClick={() => toggleLanguage(language)}
                      >
                        {language}
                        {selected ? <Check size={14} /> : null}
                      </motion.button>
                    );
                  })}
                </motion.div>
              ) : null}

              {!completed && activeStep.id !== "language" ? (
                <motion.div
                  className={`${styles.optionGrid} ${activeStep.id === "field" || activeStep.id === "destination" ? styles.imageOptionGrid : ""}`}
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: {},
                    show: { transition: { staggerChildren: 0.07 } },
                  }}
                >
                  {options[activeStep.id as keyof typeof options].map((option) => {
                    const selected = answers[activeStep.id as Exclude<StepId, "language">] === option.label;
                    return (
                      <motion.button
                        variants={{
                          hidden: { opacity: 0, y: 22, scale: 0.96 },
                          show: { opacity: 1, y: 0, scale: 1 },
                        }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        type="button"
                        key={option.label}
                        className={selected ? styles.selectedCard : ""}
                        onClick={() => setSingle(activeStep.id as Exclude<StepId, "language">, option.label)}
                      >
                        {selected ? (
                          <span className={styles.checkMark}>
                            <Check size={18} />
                          </span>
                        ) : null}
                        {"image" in option ? (
                          <span className={styles.optionImage}>
                            <Image src={option.image} alt={option.label} fill sizes="220px" />
                          </span>
                        ) : null}
                        <strong>{option.label}</strong>
                        <p>{option.detail}</p>
                      </motion.button>
                    );
                  })}
                </motion.div>
              ) : null}
            </motion.div>
          </AnimatePresence>

          <div className={styles.footerBar}>
            <div className={styles.summary}>
              {summary.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>

            <div className={styles.actions}>
              <button type="button" onClick={goBack} disabled={stepIndex === 0}>
                Retour
              </button>
              {completed ? (
                <Link href="/login" className={styles.actionLink}>
                  Voir plus tard
                  <ArrowRight size={18} />
                </Link>
              ) : (
                <button type="button" onClick={goNext}>
                  {stepIndex === steps.length - 1 ? "Terminer" : "Suivant"}
                  <ArrowRight size={18} />
                </button>
              )}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
