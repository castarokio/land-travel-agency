import Link from "next/link";
import styles from "../legal-pages.module.css";

export const metadata = {
  title: "Services & Offers | Land Travel",
  description: "Explore Land Travel study, tourism, visa, flight, and Omra offers.",
};

const offers = [
  {
    title: "Study abroad",
    text: "Country selection, academic file preparation, language-test planning, admissions support, and visa readiness.",
    href: "/services/study-abroad",
  },
  {
    title: "Tour packages",
    text: "International and local travel packages with itinerary planning, hotels, transfers, insurance, and guided options.",
    href: "/services/tourism/international",
  },
  {
    title: "Visa assistance",
    text: "Document checklists, file organization, appointment preparation, translations guidance, and interview support.",
    href: "/services",
  },
  {
    title: "Omra",
    text: "Group and comfort Omra formulas with hotel coordination, visa support, transfers, and ziyarat organization.",
    href: "/services/omra",
  },
];

export default function OffersPage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <p className={styles.eyebrow}>Services</p>
        <h1 className={styles.title}>Services & Offers</h1>
        <p className={styles.intro}>
          Choose the Land Travel service that matches your next step. Each offer connects to a detailed page or
          contact flow so you can continue without guessing.
        </p>

        <div className={styles.grid}>
          {offers.map((offer) => (
            <section className={styles.panel} key={offer.title}>
              <h2>{offer.title}</h2>
              <p>{offer.text}</p>
              <p style={{ marginTop: 18 }}>
                <Link href={offer.href}>View details</Link>
              </p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
