import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { siteConfig } from "@/data/site";
import styles from "./ClosingSection.module.css";

const services = [
  { label: "Tour Packages", href: "/services/tourism/international" },
  { label: "Study Abroad", href: "/services/study-abroad" },
  { label: "Visa Assistance", href: "/services" },
  { label: "Flight Booking", href: "/contact" },
];

const destinations = [
  { label: "Türkiye", href: "/universities/turkey" },
  { label: "Dubai", href: "/services/tourism/international" },
  { label: "Malaysia", href: "/universities/malaysia" },
  { label: "France", href: "/universities/france" },
];

const legalLinks = [
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
  { label: "Services/Offers", href: "/services" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/services/study-abroad" },
];

export function ClosingSection() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.closingSection} aria-labelledby="closing-section-title">
      <div className={styles.content}>
        <div className={styles.directory}>
          <nav aria-label="Footer services">
            <span className={styles.columnLabel}>Services</span>
            <div className={styles.directoryList}>
              {services.map((item) => (
                <Link className={styles.directoryLink} href={item.href} key={item.label}>
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          <nav aria-label="Footer destinations">
            <span className={styles.columnLabel}>Destinations</span>
            <div className={styles.directoryList}>
              {destinations.map((item) => (
                <Link className={styles.directoryLink} href={item.href} key={item.label}>
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          <div className={styles.contactColumn}>
            <span className={styles.columnLabel}>Contact</span>
            <a className={styles.emailLink} href={`mailto:${siteConfig.contact.email}`}>
              {siteConfig.contact.email}
            </a>
            <button className={styles.showreel} type="button" aria-label="Watch our story">
              <Image src="/assets/hero-study-consultation.webp" alt="" fill sizes="240px" />
              <span>Watch our story</span>
            </button>
          </div>
        </div>

        <div className={styles.utilityRow}>
          <nav className={styles.legalNav} aria-label="Footer legal links">
            {legalLinks.map((item) => (
              <Link className={styles.legalLink} href={item.href} key={item.label}>
                {item.label}
              </Link>
            ))}
          </nav>

        </div>
      </div>

      <div className={styles.wordmarkWrap}>
        <div className={styles.wordmarkLockup}>
          <Image
            src="/assets/landtravel-logo.png"
            alt=""
            width={1254}
            height={1254}
            className={styles.wordmarkLogo}
            sizes="clamp(54px,9vw,150px)"
          />
          <h2
            id="closing-section-title"
            className={`${styles.wordmark} text-[clamp(62px,12vw,170px)] font-bold leading-[0.8] tracking-[-0.07em]`}
          >
            LAND TRAVEL
          </h2>
        </div>
      </div>

      <Link className={styles.ctaRail} href="/services/tourism/international" aria-label="Find your next destination">
        <Image src="/assets/airport.webp" alt="" fill sizes="100vw" />
        <span className={styles.socials} aria-label="Social links">
          <span className={styles.socialLink} aria-label="Instagram">
            <Instagram size={18} strokeWidth={2.4} />
          </span>
          <span className={styles.socialLink} aria-label="LinkedIn">
            <Linkedin size={17} strokeWidth={2.4} />
          </span>
          <span className={styles.socialLink} aria-label="Facebook">
            <Facebook size={17} strokeWidth={2.4} />
          </span>
        </span>
        <span className={styles.ctaText}>Find your next destination</span>
        <span className={styles.copyright}>© {currentYear} Land Travel.</span>
      </Link>
    </footer>
  );
}
