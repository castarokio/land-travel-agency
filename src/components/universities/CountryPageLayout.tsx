"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  FileText,
  GraduationCap,
  Languages,
  Landmark,
  MessageCircle,
  School,
  ShieldCheck,
  Star,
  UserRoundCheck,
} from "lucide-react";
import { University } from "@/types";
import { routes } from "@/constants/routes";
import { createWhatsappLink } from "@/lib/whatsapp";
import styles from "./CountryPageLayout.module.css";

interface CountryPageLayoutProps {
  countryInfo: {
    id: string;
    name: string;
    image: string;
    language: string;
    averageTuition: string;
    visaSuccessRate: string;
  };
  detail: {
    category?: string;
    status?: string;
    serviceTitle?: string;
    serviceSubtitle?: string;
    serviceName?: string;
    level: string;
    agencyFee: string;
    originalFee: string;
    discountBadge: string;
    duration: string;
    format?: string;
    openingDate?: string;
    startDate?: string;
    deadline?: string;
    serviceLanguage?: string;
    location?: string;
    admissionType: string;
    schoolStart: string;
    reqLevel: string;
    popularSpecs: string;
    description: string;
    aboutText: string;
    audienceText?: string;
    whyService: string;
    fraisText: string;
    afterPayment?: string;
    processingDelay?: string;
    importantNotes?: string;
    documentIntro?: string;
    refundPolicy?: string;
    supportText?: string;
    servicesInclus: string[];
    conditions: string[];
    documents: { name: string; type: "Obligatoire" | "Facultatif"; desc?: string }[];
    faqs: { question: string; answer: string }[];
    rating: number;
    reviewsCount: number;
    studentsCount: number;
  };
  countryUnis: University[];
}

const tabs = [
  { href: "#overview", label: "Overview" },
  { href: "#services", label: "Services" },
  { href: "#requirements", label: "Conditions" },
  { href: "#documents", label: "Documents" },
  { href: "#process", label: "Suivi" },
  { href: "#universities", label: "Universités" },
  { href: "#faq", label: "FAQs" },
];

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className={styles.sectionHeading}>
      <p>{eyebrow}</p>
      <h2>{title}</h2>
    </div>
  );
}

function FactItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof GraduationCap;
  label: string;
  value: string;
}) {
  return (
    <article className={styles.factItem}>
      <span>
        <Icon size={18} aria-hidden="true" />
      </span>
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
      </div>
    </article>
  );
}

export function CountryPageLayout({ countryInfo, detail, countryUnis }: CountryPageLayoutProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const applyHref = createWhatsappLink(
    `Bonjour Land Travel, je souhaite lancer la procédure pour étudier en ${countryInfo.name}.`
  );

  const facts = [
    { icon: GraduationCap, label: "Niveau", value: detail.level },
    { icon: CircleDollarSign, label: "Prix", value: detail.agencyFee },
    { icon: Landmark, label: "Pays", value: countryInfo.name },
    { icon: School, label: "Format", value: detail.format ?? "En ligne" },
    { icon: CalendarDays, label: "Date d'ouverture", value: detail.openingDate ?? detail.schoolStart },
    { icon: CalendarDays, label: "Date limite", value: detail.deadline ?? detail.schoolStart },
    { icon: BookOpen, label: "Durée", value: detail.duration },
    { icon: Languages, label: "Langue", value: detail.serviceLanguage ?? countryInfo.language },
    { icon: ShieldCheck, label: "Visa", value: countryInfo.visaSuccessRate },
  ];
  const title = detail.serviceTitle ?? `Étudier en ${countryInfo.name}`;
  const serviceName = detail.serviceName ?? `Étudier en ${countryInfo.name}`;

  return (
    <div className={styles.studyCountryPage}>
      <div className={styles.shell}>
        <header className={styles.breadcrumbBar}>
          <Link href={routes.studyAbroad} className={styles.backLink}>
            <ArrowLeft size={16} aria-hidden="true" />
            Études à l&apos;étranger
          </Link>
          <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
            <Link href="/">Accueil</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <Link href={routes.studyAbroad}>Pays d&apos;études</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span>{countryInfo.name}</span>
          </nav>
        </header>

        <section className={styles.heroPanel}>
          <div className={styles.heroImage}>
            <Image
              src={countryInfo.image}
              alt={`Étudier en ${countryInfo.name}`}
              fill
              priority
              sizes="(min-width: 1100px) 760px, 100vw"
            />
            <div className={styles.heroChips}>
              <span>{detail.category ?? "Étudier à l'étranger"}</span>
              <span>{detail.status ?? detail.discountBadge}</span>
              <span>{detail.level}</span>
            </div>
            <div className={styles.heroTitleCard}>
              <div className={styles.ratingLine}>
                <span>{serviceName}</span>
                <strong>
                  <Star size={15} fill="currentColor" aria-hidden="true" />
                  {detail.rating}/5
                </strong>
              </div>
              <h1>{title}</h1>
              <p>{detail.serviceSubtitle ?? detail.description}</p>
            </div>
          </div>

          <aside className={styles.applyCard} aria-label={`Dossier pour étudier en ${countryInfo.name}`}>
            <div>
              <p className={styles.kicker}>{detail.category ?? "Étudier à l'étranger"}</p>
              <h2>{title}</h2>
              <p>{detail.serviceSubtitle ?? detail.description}</p>
            </div>

            <div className={styles.applyFacts}>
              <FactItem icon={CircleDollarSign} label="Prix" value={detail.agencyFee} />
              <FactItem icon={Landmark} label="Pays" value={countryInfo.name} />
              <FactItem icon={School} label="Format" value={detail.format ?? "En ligne"} />
            </div>

            <div className={styles.priceBox}>
              <span>Prix</span>
              <div>
                <strong>{detail.agencyFee}</strong>
              </div>
            </div>

            <a href={applyHref} target="_blank" rel="noreferrer" className={styles.primaryAction}>
              <MessageCircle size={17} aria-hidden="true" />
              Postuler maintenant
            </a>
          </aside>
        </section>

        <nav className={styles.tabs} aria-label="Sections de la page">
          {tabs.map((tab) => (
            <a href={tab.href} key={tab.href}>
              {tab.label}
            </a>
          ))}
        </nav>

        <div className={styles.contentGrid}>
          <main className={styles.mainColumn}>
            <section className={styles.sectionBlock} id="overview">
              <SectionHeading
                eyebrow="Aperçu"
                title={serviceName}
              />
              <div className={styles.factGrid}>
                {facts.map((fact) => (
                  <FactItem key={fact.label} {...fact} />
                ))}
              </div>
            </section>

            <section className={styles.sectionBlock} id="services">
              <SectionHeading eyebrow="Services inclus" title="Ce que Land Travel prend en charge." />
              <div className={styles.serviceGrid}>
                {detail.servicesInclus.map((service) => (
                  <article key={service}>
                    <CheckCircle2 size={19} aria-hidden="true" />
                    <p>{service}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.storyGrid}>
              <article>
                <span>Description</span>
                <h3>Description</h3>
                <p>{detail.description}</p>
              </article>
              <article>
                <span>À propos</span>
                <h3>À propos</h3>
                <p>{detail.aboutText}</p>
              </article>
              <article>
                <span>Pour qui</span>
                <h3>Pour qui est ce service ?</h3>
                <p>{detail.audienceText ?? detail.whyService}</p>
              </article>
              <article>
                <span>Frais</span>
                <h3>Frais</h3>
                <p>{detail.fraisText}</p>
              </article>
            </section>

            <section className={styles.sectionBlock} id="requirements">
              <SectionHeading eyebrow="Conditions" title="Les prérequis à valider avant de démarrer." />
              <div className={styles.numberList}>
                {detail.conditions.map((condition, index) => (
                  <article key={condition}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p>{condition}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.sectionBlock} id="documents">
              <SectionHeading eyebrow="Documents" title="Chaque pièce demandée est rangée séparément." />
              {detail.documentIntro ? <p className={styles.sectionIntro}>{detail.documentIntro}</p> : null}
              <div className={styles.documentList}>
                {detail.documents.map((document) => (
                  <article key={document.name}>
                    <span className={styles.documentIcon}>
                      <FileText size={18} aria-hidden="true" />
                    </span>
                    <div>
                      <h3>{document.name}</h3>
                      <p>{document.desc ?? "À préparer en version lisible et traduite si nécessaire."}</p>
                    </div>
                    <strong>{document.type}</strong>
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.sectionBlock} id="process">
              <SectionHeading eyebrow="Après paiement" title="Que se passe-t-il après le paiement ?" />
              <div className={styles.processGrid}>
                {detail.afterPayment ? (
                  <article>
                    <span>Après paiement</span>
                    <p>{detail.afterPayment}</p>
                  </article>
                ) : null}
                {detail.processingDelay ? (
                  <article>
                    <span>Délais de traitement</span>
                    <p>{detail.processingDelay}</p>
                  </article>
                ) : null}
                {detail.importantNotes ? (
                  <article>
                    <span>Notes importantes</span>
                    <p>{detail.importantNotes}</p>
                  </article>
                ) : null}
                {detail.refundPolicy ? (
                  <article>
                    <span>Politique de remboursement</span>
                    <p>{detail.refundPolicy}</p>
                  </article>
                ) : null}
                {detail.supportText ? (
                  <article>
                    <span>Support</span>
                    <p>{detail.supportText}</p>
                  </article>
                ) : null}
              </div>
            </section>

            <section className={styles.sectionBlock} id="universities">
              <SectionHeading eyebrow="Universités" title={`Options disponibles en ${countryInfo.name}.`} />
              {countryUnis.length > 0 ? (
                <div className={styles.universityGrid}>
                  {countryUnis.map((university) => (
                    <article key={university.name}>
                      <div className={styles.universityImage}>
                        <Image
                          src={university.image ?? countryInfo.image}
                          alt={university.name}
                          fill
                          sizes="(min-width: 900px) 360px, 100vw"
                        />
                      </div>
                      <div className={styles.universityBody}>
                        <span>{university.city}</span>
                        <h3>{university.name}</h3>
                        <p>
                          <strong>Langue:</strong> {university.language}
                        </p>
                        <p>
                          <strong>Frais:</strong> {university.tuition}
                        </p>
                        <p>
                          <strong>Programmes:</strong> {university.programs.join(", ")}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className={styles.emptyState}>
                  Land Travel peut proposer une sélection adaptée après l&apos;audit du dossier.
                </div>
              )}
            </section>

            <section className={styles.sectionBlock} id="faq">
              <SectionHeading eyebrow="FAQs" title="Questions fréquentes." />
              <div className={styles.faqList}>
                {detail.faqs.map((faq, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <article key={faq.question}>
                      <button type="button" onClick={() => setOpenFaqIndex(isOpen ? null : index)} aria-expanded={isOpen}>
                        <span>{faq.question}</span>
                        <ChevronDown size={18} aria-hidden="true" />
                      </button>
                      {isOpen ? <p>{faq.answer}</p> : null}
                    </article>
                  );
                })}
              </div>
            </section>
          </main>

          <aside className={styles.sideColumn}>
            <section className={styles.sideCard}>
              <p className={styles.kicker}>Résumé</p>
              <h2>{title}</h2>
              <div className={styles.summaryBadges}>
                <span>{detail.category ?? "Étudier à l'étranger"}</span>
                <span>{detail.status ?? "Ouvert"}</span>
              </div>
              <div className={styles.scoreRow}>
                <strong>{detail.agencyFee}</strong>
              </div>
              <p>Des documents obligatoires sont demandés pour ce service.</p>
              <a href={applyHref} target="_blank" rel="noreferrer" className={styles.secondaryAction}>
                Postuler maintenant
              </a>
            </section>

            <section className={styles.mapCard}>
              <h2>Localisation du projet</h2>
              <div aria-hidden="true">
                <span />
                <span />
                <strong>Études en {countryInfo.name}</strong>
              </div>
            </section>

            <section className={styles.sideCard}>
              <p className={styles.kicker}>Niveau requis</p>
              <h2>{detail.reqLevel}</h2>
              <p>{detail.popularSpecs}</p>
              <div className={styles.smallMetric}>
                <UserRoundCheck size={16} aria-hidden="true" />
                {countryInfo.visaSuccessRate} taux visa indicatif
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
