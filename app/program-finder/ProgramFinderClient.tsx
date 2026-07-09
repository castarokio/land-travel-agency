"use client";

import { MouseEvent, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  GraduationCap,
  Lightbulb,
  MessageCircleQuestion,
  WalletCards,
} from "lucide-react";
import styles from "./program-finder.module.css";

const languageOptions = [
  { label: "Français", detail: "Je peux suivre un cours et préparer des documents en français." },
  { label: "Anglais", detail: "Je veux des programmes internationaux ou anglophones." },
  { label: "Arabe", detail: "Je préfère être accompagné avec explication claire en arabe." },
  { label: "Turc", detail: "Je suis ouvert à la Turquie et aux années préparatoires." },
  { label: "Allemand", detail: "Je vise l'Allemagne ou je peux commencer une préparation." },
  { label: "Espagnol", detail: "Je suis ouvert à l'Espagne ou aux options européennes." },
  { label: "Je veux apprendre", detail: "Je suis prêt à faire une année de langue si le programme vaut le coup." },
  { label: "Pas encore sûr", detail: "Aidez-moi à choisir selon le pays, le budget et le niveau demandé." },
];

const fieldOptions = [
  { label: "Business & Management", detail: "Commerce, gestion, marketing, finance", image: "/assets/collage-student.jpg" },
  { label: "Informatique & IA", detail: "Software, data, cybersécurité, intelligence artificielle", image: "/assets/hero-study-consultation.webp" },
  { label: "Santé & Sciences", detail: "Médecine, biologie, pharmacie, laboratoires", image: "/assets/why-choose-student-illustration.png" },
  { label: "Ingénierie", detail: "Mécanique, civil, électrique, architecture", image: "/assets/destination-germany.webp" },
  { label: "Je veux explorer", detail: "Je connais mes forces, mais pas encore le major idéal.", image: "/assets/collage-university.jpg" },
];

const countryOptions = [
  { label: "Canada", detail: "Je rêve d'un pays bilingue avec de fortes perspectives.", image: "/assets/program-finder/canada.png" },
  { label: "France", detail: "Je veux un parcours francophone et proche de l'Algérie.", image: "/assets/program-finder/france.png" },
  { label: "Royaume-Uni", detail: "Je vise un diplôme anglophone reconnu rapidement.", image: "/assets/program-finder/united-kingdom.png" },
  { label: "Turquie", detail: "Je cherche un bon équilibre budget, ville et admission.", image: "/assets/program-finder/turkey.png" },
  { label: "Malaisie", detail: "Je veux des campus internationaux avec coûts plus doux.", image: "/assets/program-finder/malaysia.png" },
  { label: "Allemagne", detail: "Je veux une option technique, publique ou orientée recherche.", image: "/assets/destination-germany.webp" },
  { label: "Je suis ouvert", detail: "Proposez-moi le pays qui respecte mon profil.", image: "/assets/hero-graduate-student.webp" },
];

const baseSteps = [
  {
    id: "goal",
    label: "Direction",
    title: "Qu'est-ce que vous voulez vraiment résoudre aujourd'hui ?",
    description: "On commence par votre vraie question, pas seulement par une liste de programmes.",
    options: [
      { label: "Je ne sais pas quoi étudier", detail: "J'ai besoin d'idées réalistes selon mon profil." },
      { label: "Je connais le domaine", detail: "Je veux trouver le bon pays, la bonne école et le bon budget." },
      { label: "Je veux changer d'idée", detail: "J'hésite entre plusieurs directions et je veux comparer." },
      { label: "Je veux préparer mon admission", detail: "Je veux comprendre documents, délais, langue et chances." },
    ],
  },
  {
    id: "level",
    label: "Niveau",
    title: "Quel est le prochain diplôme que vous voulez commencer ?",
    description: "Le niveau change les pays, les conditions, les délais et les budgets possibles.",
    options: [
      { label: "Bachelor", detail: "Licence, Bachelor ou premier cycle après le bac." },
      { label: "Master", detail: "Spécialisation après licence ou équivalent." },
      { label: "Doctorat", detail: "Recherche, PhD, laboratoire ou encadrement académique." },
      { label: "Année préparatoire", detail: "Langue, foundation year ou mise à niveau avant le diplôme." },
    ],
  },
  {
    id: "field",
    label: "Domaine",
    title: "Quel domaine vous attire le plus pour votre futur ?",
    description: "Vous pouvez choisir une direction précise ou demander une exploration guidée.",
    options: fieldOptions,
    imageGrid: true,
  },
  {
    id: "budget",
    label: "Budget",
    title: "Quel budget annuel vous semble confortable ?",
    description: "On parle ici d'une estimation pour les frais d'études et la vie. Cela nous aide à éviter les options irréalistes.",
    options: [
      { label: "Budget serré", detail: "Je dois garder les frais bas et chercher des alternatives accessibles." },
      { label: "Budget équilibré", detail: "Je peux payer un bon programme si le rapport qualité/prix est clair." },
      { label: "Budget flexible", detail: "Je peux viser une destination plus chère si elle apporte une vraie valeur." },
      { label: "Je dois calculer", detail: "Aidez-moi à comprendre le coût réel avant de décider." },
    ],
  },
  {
    id: "language",
    label: "Langues",
    title: "Dans quelles langues vous vous sentez prêt à étudier ?",
    description: "Choisissez les langues déjà fortes, puis ajoutez celles que vous êtes prêt à améliorer. On adaptera les pays et les années préparatoires.",
  },
  {
    id: "destination",
    label: "Rêve",
    title: "What country are you dreaming of?",
    description: "Choisissez le pays qui vous attire le plus. Si vous êtes ouvert, on comparera les destinations selon votre budget, langue et domaine.",
    options: countryOptions,
    imageGrid: true,
  },
  {
    id: "priority",
    label: "Priorité",
    title: "Qu'est-ce qui compte le plus dans votre décision ?",
    description: "Cette réponse nous aide à choisir entre un programme prestigieux, abordable, rapide ou plus sûr pour l'admission.",
    options: [
      { label: "Meilleure chance d'admission", detail: "Je préfère une stratégie réaliste avec plusieurs options." },
      { label: "Budget le plus intelligent", detail: "Je veux éviter les mauvaises surprises financières." },
      { label: "Diplôme le plus reconnu", detail: "Je vise la réputation, les classements et les opportunités." },
      { label: "Visa et installation", detail: "Je veux comprendre les risques, délais et conditions pratiques." },
    ],
  },
] as const;

type Step = (typeof baseSteps)[number] | {
  id: "reflection";
  label: "Approfondir";
  title: string;
  description: string;
  options: { label: string; detail: string }[];
};

type StepId = Step["id"];

type Answers = {
  goal: string;
  level: string;
  field: string;
  budget: string;
  language: string[];
  destination: string;
  priority: string;
  reflection: string;
};

const initialAnswers: Answers = {
  goal: "Je ne sais pas quoi étudier",
  level: "Bachelor",
  field: "Informatique & IA",
  budget: "Budget équilibré",
  language: ["Français", "Anglais"],
  destination: "Canada",
  priority: "Meilleure chance d'admission",
  reflection: "Donnez-moi une recommandation claire",
};

function getReflectionStep(answers: Answers): Step {
  if (answers.goal === "Je ne sais pas quoi étudier" || answers.field === "Je veux explorer") {
    return {
      id: "reflection",
      label: "Approfondir",
      title: "Quand vous imaginez vos études, qu'est-ce qui vous donne de l'énergie ?",
      description: "Cette question transforme le finder en vrai conseil d'orientation, pas seulement en moteur de recherche.",
      options: [
        { label: "Créer et construire", detail: "Technologie, design, ingénierie, projets concrets." },
        { label: "Comprendre les gens", detail: "Business, communication, psychologie, gestion." },
        { label: "Résoudre des problèmes", detail: "Data, finance, sciences, analyse, stratégie." },
        { label: "Donnez-moi une recommandation claire", detail: "Je veux une proposition directe avec raisons." },
      ],
    };
  }

  if (answers.budget === "Budget serré" || answers.budget === "Je dois calculer") {
    return {
      id: "reflection",
      label: "Approfondir",
      title: "Quelle flexibilité avez-vous pour rendre le projet possible ?",
      description: "On peut ajuster le pays, la langue, la ville ou le type d'école pour rester réaliste.",
      options: [
        { label: "Je peux changer de pays", detail: "Le budget passe avant le pays rêvé." },
        { label: "Je peux faire une année de langue", detail: "Je préfère construire le dossier étape par étape." },
        { label: "Je veux chercher des bourses", detail: "Je peux accepter plus de préparation pour réduire les frais." },
        { label: "Gardez mon pays rêvé", detail: "Optimisez autour de mon choix actuel." },
      ],
    };
  }

  if (answers.language.includes("Je veux apprendre") || answers.language.includes("Pas encore sûr")) {
    return {
      id: "reflection",
      label: "Approfondir",
      title: "Comment voulez-vous gérer la langue du programme ?",
      description: "La bonne stratégie peut être admission directe, test de langue, année préparatoire ou pays plus compatible.",
      options: [
        { label: "Admission directe", detail: "Je veux éviter une année préparatoire si possible." },
        { label: "Année de langue acceptable", detail: "Je peux investir du temps pour accéder à un meilleur programme." },
        { label: "Programme bilingue", detail: "Je veux une transition plus douce." },
        { label: "Conseil selon mon profil", detail: "Choisissez l'option la plus sûre pour moi." },
      ],
    };
  }

  return {
    id: "reflection",
    label: "Approfondir",
    title: "Quel type de réponse voulez-vous recevoir à la fin ?",
    description: "Le résultat peut recommander des programmes, mais aussi répondre à vos questions et remettre certaines idées en question.",
    options: [
      { label: "Programmes précis", detail: "Montrez-moi les options les plus cohérentes." },
      { label: "Comparaison de pays", detail: "Aidez-moi à choisir entre destinations." },
      { label: "Plan d'action", detail: "Expliquez les étapes, documents et délais." },
      { label: "Challenge my idea", detail: "Dites-moi si mon choix semble risqué ou mal aligné." },
    ],
  };
}

const matchingPrograms = [
  {
    title: "Bachelor en Informatique appliquée",
    country: "Canada",
    fit: "Très recommandé",
    detail: "Fort si vous voulez un parcours bilingue, technique et orienté emploi.",
    image: "/assets/program-finder/canada.png",
  },
  {
    title: "Business & Digital Management",
    country: "France",
    fit: "Option équilibrée",
    detail: "Bonne option francophone si vous voulez rester proche et maîtriser les coûts.",
    image: "/assets/program-finder/france.png",
  },
  {
    title: "Foundation + Bachelor Computing",
    country: "Royaume-Uni",
    fit: "Parcours anglophone",
    detail: "Pertinent si la réputation du diplôme compte plus que le budget bas.",
    image: "/assets/program-finder/united-kingdom.png",
  },
  {
    title: "Software Engineering",
    country: "Malaisie",
    fit: "Coût accessible",
    detail: "Alternative internationale si vous voulez anglais, campus moderne et budget maîtrisé.",
    image: "/assets/program-finder/malaysia.png",
  },
];

function createInsight(answers: Answers) {
  const country = answers.destination === "Je suis ouvert" ? "plusieurs pays" : answers.destination;
  const languagePlan = answers.language.includes("Je veux apprendre") || answers.language.includes("Pas encore sûr")
    ? "prévoir une stratégie de langue avant de choisir l'université"
    : `chercher des programmes compatibles avec ${answers.language.slice(0, 2).join(" / ")}`;

  return {
    headline: `${answers.level} en ${answers.field} avec ${country} comme point de départ`,
    answer: `Votre profil ne doit pas être traité comme une simple recherche de programme. Le bon choix dépend surtout de votre budget (${answers.budget.toLowerCase()}), de votre priorité (${answers.priority.toLowerCase()}) et de la langue. La prochaine étape est de ${languagePlan}, puis de comparer 3 pays au lieu de choisir trop vite.`,
    challenge: answers.destination !== "Je suis ouvert" && answers.budget === "Budget serré"
      ? `Votre pays rêvé est important, mais il faut aussi garder une option alternative si ${answers.destination} dépasse le budget réel.`
      : "Votre idée est cohérente, mais elle doit être testée avec les conditions d'admission, le coût total et les délais de visa.",
  };
}

export function ProgramFinderClient() {
  const [stepIndex, setStepIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [answers, setAnswers] = useState<Answers>(initialAnswers);

  const adaptiveSteps = useMemo(() => {
    const reflectionStep = getReflectionStep(answers);
    return [...baseSteps, reflectionStep];
  }, [answers]);

  const activeStep = adaptiveSteps[stepIndex];
  const progress = completed ? 100 : Math.round(((stepIndex + 1) / adaptiveSteps.length) * 100);
  const insight = useMemo(() => createInsight(answers), [answers]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const applyBodyScrollLock = () => {
      document.body.style.overflow = window.innerWidth > 980 ? "hidden" : previousOverflow;
    };

    applyBodyScrollLock();
    window.addEventListener("resize", applyBodyScrollLock);

    return () => {
      window.removeEventListener("resize", applyBodyScrollLock);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const summary = useMemo(
    () => [
      answers.level,
      answers.field,
      answers.budget,
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

  const keepScrollStable = (event?: MouseEvent<HTMLButtonElement>) => {
    event?.currentTarget.blur();
    const scrollTop = window.scrollY;
    requestAnimationFrame(() => {
      window.scrollTo({ top: scrollTop, behavior: "auto" });
    });
  };

  const goNext = (event?: MouseEvent<HTMLButtonElement>) => {
    keepScrollStable(event);

    if (stepIndex === adaptiveSteps.length - 1) {
      setCompleted(true);
      return;
    }

    setStepIndex((current) => Math.min(current + 1, adaptiveSteps.length - 1));
  };

  const goBack = (event?: MouseEvent<HTMLButtonElement>) => {
    keepScrollStable(event);

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
            {adaptiveSteps.map((step, index) => {
              const isActive = index === stepIndex && !completed;
              const isDone = completed || index < stepIndex;
              return (
                <button
                  key={`${step.id}-${index}`}
                  type="button"
                  className={`${styles.progressStep} ${isActive ? styles.active : ""} ${isDone ? styles.done : ""}`}
                  onClick={(event) => {
                    keepScrollStable(event);
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
              <p>Deep Program Finder</p>
              <strong>{progress}% complété</strong>
            </div>
            <Link href="/study-abroad">Quitter</Link>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={completed ? "results" : `${activeStep.id}-${stepIndex}`}
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className={styles.stepContent}
            >
              {completed ? (
                <div className={styles.resultsView}>
                  <p className={styles.kicker}>Réponse personnalisée</p>
                  <h1>{insight.headline}</h1>
                  <p className={styles.description}>{insight.answer}</p>

                  <div className={styles.adviceGrid}>
                    <article>
                      <Lightbulb size={22} />
                      <strong>Idée à tester</strong>
                      <p>{insight.challenge}</p>
                    </article>
                    <article>
                      <WalletCards size={22} />
                      <strong>Budget</strong>
                      <p>Avant de décider, comparez frais d&apos;inscription, logement, visa, assurance et année de langue possible.</p>
                    </article>
                    <article>
                      <MessageCircleQuestion size={22} />
                      <strong>Question utile</strong>
                      <p>Demandez: est-ce que ce pays respecte mon budget et améliore réellement mes chances ?</p>
                    </article>
                  </div>

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
                    show: { transition: { staggerChildren: 0.025 } },
                  }}
                >
                  {languageOptions.map((language) => {
                    const selected = answers.language.includes(language.label);
                    return (
                      <motion.button
                        variants={{
                          hidden: { opacity: 0, y: 12 },
                          show: { opacity: 1, y: 0 },
                        }}
                        transition={{ duration: 0.2 }}
                        type="button"
                        key={language.label}
                        className={selected ? styles.selectedPill : ""}
                        onClick={() => toggleLanguage(language.label)}
                      >
                        <strong>{language.label}</strong>
                        <small>{language.detail}</small>
                        {selected ? <Check size={14} /> : null}
                      </motion.button>
                    );
                  })}
                </motion.div>
              ) : null}

              {!completed && activeStep.id !== "language" ? (
                <motion.div
                  className={`${styles.optionGrid} ${"imageGrid" in activeStep && activeStep.imageGrid ? styles.imageOptionGrid : ""}`}
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: {},
                    show: { transition: { staggerChildren: 0.055 } },
                  }}
                >
                  {activeStep.options.map((option) => {
                    const selected = answers[activeStep.id as Exclude<StepId, "language">] === option.label;
                    return (
                      <motion.button
                        variants={{
                          hidden: { opacity: 0, y: 18, scale: 0.98 },
                          show: { opacity: 1, y: 0, scale: 1 },
                        }}
                        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
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
              <button type="button" onClick={goBack} disabled={!completed && stepIndex === 0}>
                Retour
              </button>
              {completed ? (
                <Link href="/login" className={styles.actionLink}>
                  Sauvegarder
                  <ArrowRight size={18} />
                </Link>
              ) : (
                <button type="button" onClick={goNext}>
                  {stepIndex === adaptiveSteps.length - 1 ? "Voir ma réponse" : "Suivant"}
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
