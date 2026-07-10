import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CircleArrowDown, MapPin, CalendarDays, Plus, Minus } from "lucide-react";
import { MotionPageShell } from "@/components/ui/MotionPageShell";
import { asset } from "@/lib/assets";
import { routes } from "@/constants/routes";
import styles from "./services.module.css";

export const metadata: Metadata = {
  title: "Services | Land Travel Agency",
  description: "Explore Land Travel study abroad, tourism, visa, flight, and Omra support services.",
};

const serviceTypes = [
  {
    title: "Study Abroad Consulting",
    description: "Country selection, university shortlists, admissions, language test planning, and visa dossier support.",
    href: routes.studyAbroad,
  },
  {
    title: "Tourism Packages",
    description: "Local escapes, international holidays, hotel coordination, flight booking, and custom travel plans.",
    href: routes.tourism,
  },
  {
    title: "Omra Travel",
    description: "Visa handling, hotel booking near Haram, transfers, Ziyarat planning, and guided departure support.",
    href: routes.omra,
  },
  {
    title: "Visa & Departure Support",
    description: "Document checklists, appointment preparation, insurance, bookings, and final travel briefing.",
    href: routes.contact,
  },
];

const processSteps = [
  {
    title: "Profile & Trip Analysis",
    description: "We understand your destination, budget, deadline, file status, and personal expectations.",
    tags: ["Budget", "Destination", "Timeline"],
  },
  {
    title: "Custom Plan Design",
    description: "We build the right route: universities, package options, visa path, or Omra formula.",
    tags: ["Shortlist", "Documents", "Options"],
  },
  {
    title: "File Resolution & Delivery",
    description: "We prepare, review, submit, book, and follow each step until departure.",
    tags: ["Submission", "Booking", "Departure"],
  },
];

const projects = [
  {
    title: "France Student Admission File",
    description: "A complete admission and Campus France preparation path for undergraduate studies.",
    image: asset("Canada university campus.webp"),
    place: "Paris, France",
    year: "2026",
  },
  {
    title: "Maldives Family Holiday",
    description: "Resort selection, international flights, hotel booking, and full itinerary coordination.",
    image: asset("intl-maldives-resort.webp"),
    place: "Maldives",
    year: "2026",
  },
  {
    title: "Omra Comfort Departure",
    description: "Visa, hotels, transfers, and Ziyarat support for a guided spiritual journey.",
    image: asset("Kaaba pilgrims umrah.webp"),
    place: "Makkah, Saudi Arabia",
    year: "2026",
  },
  {
    title: "Local Sahara Experience",
    description: "A local desert route with accommodation, transport, guide planning, and schedule support.",
    image: asset("local-desert-sunset.webp"),
    place: "Djanet, Algeria",
    year: "2026",
  },
];

const faqs = [
  "How do we choose the best destination for my profile?",
  "Can you handle both university admission and visa preparation?",
  "Do you organize tourism and Omra packages from start to finish?",
  "Can I request a custom package instead of a ready offer?",
  "When should I contact you before travel or study intake?",
  "Do you help after acceptance, booking, or visa approval?",
];

export default function ServicesPage() {
  return (
    <MotionPageShell>
      <div className={styles.page}>
        <section className={styles.hero}>
          <Image
            src={asset("Canada university campus.webp")}
            alt="Modern university campus building"
            width={1280}
            height={640}
            priority
          />
          <div className={styles.heroGrid}>
            <h1>Travel, Study, and Pilgrimage Services Designed Around You</h1>
            <div>
              <p>
                We connect academic guidance, travel planning, visa preparation, and Omra coordination into one clear service path.
              </p>
              <Link className={styles.darkButton} href={routes.contact}>
                Let&apos;s talk <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.overview} aria-labelledby="service-overview-title">
          <div className={styles.statCard}>
            <strong>+90%</strong>
            <span>client files planned with clear next steps</span>
          </div>
          <div className={styles.overviewMedia}>
            <Image src={asset("hero-study-consultation.webp")} alt="Student service consultation" width={520} height={520} />
          </div>
          <div className={styles.overviewCopy}>
            <span>Service overview</span>
            <h2 id="service-overview-title">Do you need an agency that truly fits the way you travel?</h2>
            <CircleArrowDown size={22} />
            <p>
              We design every file with context: your country target, study level, budget, departure date, family needs, and document status.
            </p>
          </div>
        </section>

        <section className={styles.types} aria-labelledby="service-types-title">
          <p className={styles.kicker}>Project types</p>
          <h2 id="service-types-title">Land Travel Services We Design</h2>
          <div className={styles.typeList}>
            {serviceTypes.map((service, index) => (
              <Link className={styles.typeRow} href={service.href} key={service.title}>
                <span>
                  <strong>{service.title}</strong>
                  <small>{service.description}</small>
                </span>
                {index === 1 ? (
                  <span className={styles.typePreview}>
                    <Image src={asset("intl-swiss-alps.webp")} alt="" width={300} height={160} />
                    <em>Learn more <ArrowUpRight size={14} /></em>
                  </span>
                ) : null}
                <b>{String(index + 1).padStart(2, "0")}</b>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.process} aria-labelledby="process-title">
          <p className={styles.kicker}>Our process</p>
          <h2 id="process-title">How We Build Your Plan</h2>
          <div className={styles.processGrid}>
            {processSteps.map((step, index) => (
              <article className={styles.processCard} key={step.title}>
                <span>{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <div>
                  {step.tags.map((tag) => (
                    <small key={tag}>{tag}</small>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <Link className={styles.darkButton} href={routes.contact}>
            Let&apos;s talk <ArrowUpRight size={16} />
          </Link>
        </section>

        <section className={styles.projects} aria-labelledby="projects-title">
          <h2 id="projects-title">Selected Service Paths</h2>
          <div className={styles.projectGrid}>
            {projects.map((project) => (
              <article className={styles.projectCard} key={project.title}>
                <Image src={project.image} alt={project.title} width={640} height={420} />
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <footer>
                  <span><MapPin size={13} /> {project.place}</span>
                  <span><CalendarDays size={13} /> {project.year}</span>
                </footer>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.faq} aria-labelledby="faq-title">
          <h2 id="faq-title">Questions About Our Service</h2>
          <p>Clear answers to common questions about scope, process, and travel coordination.</p>
          <div className={styles.faqGrid}>
            {faqs.map((question, index) => (
              <article className={styles.faqItem} key={question}>
                <h3>{question}</h3>
                <button type="button" aria-label={`Open answer for ${question}`}>
                  {index === 0 ? <Minus size={15} /> : <Plus size={15} />}
                </button>
                {index === 0 ? (
                  <p>
                    We start with your goal, budget, deadline, and documents, then recommend only the options that match your real situation.
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section className={styles.cta}>
          <Image src={asset("airport.webp")} alt="" width={1280} height={520} />
          <div>
            <h2>Let&apos;s Explore the Right Approach.</h2>
            <p>Every project begins with listening. Share your goals and we will prepare the service path that fits.</p>
            <Link className={styles.darkButton} href={routes.contact}>
              Let&apos;s talk <ArrowUpRight size={16} />
            </Link>
          </div>
        </section>
      </div>
    </MotionPageShell>
  );
}
