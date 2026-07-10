import styles from "../legal-pages.module.css";

export const metadata = {
  title: "Privacy Policy | Land Travel",
  description: "How Land Travel collects and uses client information.",
};

export default function PrivacyPage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <p className={styles.eyebrow}>Privacy</p>
        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.intro}>
          Land Travel collects only the information needed to assess your request, prepare your file, communicate
          with you, and coordinate services with trusted partners.
        </p>

        <div className={styles.grid}>
          <section className={styles.panel}>
            <h2>Information we collect</h2>
            <ul className={styles.list}>
              <li>Identity and contact details.</li>
              <li>Academic, travel, financial, and passport information when required for a service.</li>
              <li>Messages, forms, and documents you send to our team.</li>
            </ul>
          </section>

          <section className={styles.panel}>
            <h2>How we use it</h2>
            <p>
              We use client data to evaluate eligibility, prepare applications, book services, answer questions,
              organize follow-up, and comply with supplier or authority requirements.
            </p>
          </section>

          <section className={styles.panel}>
            <h2>Sharing</h2>
            <p>
              We may share necessary information with universities, hotels, airlines, visa centers, insurers,
              translators, payment processors, or official authorities when required for the requested service.
            </p>
          </section>

          <section className={styles.panel}>
            <h2>Retention</h2>
            <p>
              Documents are kept only as long as needed for service delivery, legal follow-up, accounting, or
              customer support. You may ask our team to review or delete eligible records.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
