import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { siteConfig } from "@/data/site";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact | Land Travel Agency",
  description: "Contactez Land Travel pour vos projets d'études, tourisme et Omra.",
};

export default function ContactPage() {
  const mapEmbedUrl =
    "https://www.openstreetmap.org/export/embed.html?bbox=4.026%2C36.68%2C4.09%2C36.735&layer=mapnik&marker=36.7118%2C4.0459";
  const contactCards = [
    {
      title: "Adresse",
      value: siteConfig.contact.address,
      text: "Agence principale Land Travel à Tizi Ouzou.",
      icon: MapPin,
    },
    {
      title: "Téléphone",
      value: siteConfig.contact.phone,
      text: "Appels et suivi administratif pendant les horaires d'ouverture.",
      icon: Phone,
    },
    {
      title: "WhatsApp",
      value: siteConfig.contact.whatsapp,
      text: "Réponse rapide pour études, tourisme, Omra et rendez-vous.",
      icon: MessageCircle,
    },
    {
      title: "E-mail",
      value: siteConfig.contact.email,
      text: "Demandes générales, documents et confirmations de rendez-vous.",
      icon: Mail,
    },
  ];

  return (
    <main className={styles.contactPage}>
      <section className={styles.hero}>
        <div className={styles.copy}>
          <Link className={styles.backHome} href="/">
            <ArrowLeft size={20} />
            <span>Retour à l&apos;accueil</span>
          </Link>
          <p>( CONTACT )</p>
          <h1>Contactez Land Travel</h1>
          <span>
            Notre agence vous accueille à Tizi Ouzou pour les études à
            l&apos;étranger, le tourisme local et international, les réservations
            Omra et le suivi de vos dossiers.
          </span>
        </div>

        <form className={styles.formCard}>
          <div className={styles.twoCol}>
            <label>
              Prénom
              <input placeholder="Votre prénom" />
            </label>
            <label>
              Nom
              <input placeholder="Votre nom" />
            </label>
          </div>
          <div className={styles.twoCol}>
            <label>
              Téléphone
              <input placeholder="+213 ..." />
            </label>
            <label>
              Adresse e-mail
              <input placeholder="votre@email.com" />
            </label>
          </div>
          <label>
            Service demandé
            <input placeholder="Études, tourisme, Omra, visa..." />
          </label>
          <label>
            Message
            <textarea placeholder="Expliquez votre besoin ou demande de rendez-vous" />
          </label>
          <button type="button">Envoyer la demande</button>
        </form>
      </section>

      <section className={styles.infoSection} aria-label="Informations de l'agence">
        <div className={styles.sectionHeader}>
          <p>Informations agence</p>
          <h2>Land Travel, Tizi Ouzou</h2>
          <span>
            Coordonnées principales et canaux officiels. Les informations
            ci-dessous sont prêtes à être remplacées par vos numéros réels si
            nécessaire.
          </span>
        </div>

        <div className={styles.infoGrid}>
          {contactCards.map((card) => {
            const Icon = card.icon;

            return (
              <article className={styles.infoCard} key={card.title}>
                <div className={styles.infoIcon}>
                  <Icon size={22} />
                </div>
                <h3>{card.title}</h3>
                <strong>{card.value}</strong>
                <p>{card.text}</p>
              </article>
            );
          })}
        </div>

        <div className={styles.agencyPanel}>
          <div className={styles.agencyCopy}>
            <p className={styles.panelEyebrow}>À propos de Land Travel</p>
            <h2>Une agence de conseil et de voyage basée en Kabylie.</h2>
            <p>
              Land Travel accompagne les étudiants, familles et pèlerins avec un
              suivi clair : orientation, constitution de dossier, réservation,
              préparation administrative et assistance après validation.
            </p>
            <div className={styles.detailsList}>
              <span><Clock size={17} /> {siteConfig.contact.workingHours}</span>
              <span><Mail size={17} /> {siteConfig.contact.admissionsEmail}</span>
              <span><Mail size={17} /> {siteConfig.contact.supportEmail}</span>
            </div>
            <div className={styles.socials} aria-label="Réseaux sociaux">
              <a href={siteConfig.contact.social.facebook}>Facebook <Facebook size={16} /></a>
              <a href={siteConfig.contact.social.instagram}>Instagram <Instagram size={16} /></a>
              <a href={siteConfig.contact.social.linkedin}>LinkedIn <Linkedin size={16} /></a>
            </div>
          </div>

          <div className={styles.mapCard}>
            <iframe
              title="Localisation Land Travel à Tizi Ouzou"
              src={mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className={styles.mapFallback}>
              <MapPin size={20} />
              <span>Land Travel - Tizi Ouzou, Algérie</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
