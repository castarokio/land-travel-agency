import styles from "../legal-pages.module.css";

export const metadata = {
  title: "Terms & Conditions | Land Travel",
  description: "Terms and conditions for using Land Travel services.",
};

export default function TermsPage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <p className={styles.eyebrow}>Legal</p>
        <h1 className={styles.title}>Terms & Conditions</h1>
        <p className={styles.intro}>
          These terms explain how Land Travel supports study abroad, tourism, visa assistance, and Omra services.
          They are written to keep expectations clear before any file preparation or booking begins.
        </p>

        <div className={styles.grid}>
          <section className={styles.panel}>
            <h2>Service scope</h2>
            <p>
              Land Travel provides advisory, preparation, booking, and administrative support. Final decisions for
              admissions, visas, permits, refunds, and border entry remain with universities, consulates, airlines,
              hotels, and public authorities.
            </p>
          </section>

          <section className={styles.panel}>
            <h2>Client duties</h2>
            <p>
              Clients must provide accurate documents, valid contact details, truthful declarations, and timely
              responses. Delays or refusals caused by missing, false, expired, or late documents are outside the
              agency&apos;s control.
            </p>
          </section>

          <section className={styles.panel}>
            <h2>Payments</h2>
            <p>
              Agency fees cover the agreed support work. Third-party costs such as application fees, translations,
              courier fees, insurance, hotel deposits, flight tickets, and consular fees are billed separately unless
              clearly included in writing.
            </p>
          </section>

          <section className={styles.panel}>
            <h2>Changes and cancellations</h2>
            <p>
              Changes depend on supplier and authority rules. Some bookings, deposits, or application fees may be
              non-refundable after submission or confirmation.
            </p>
          </section>

          <section className={styles.widePanel}>
            <h2>Important notice</h2>
            <p>
              Land Travel works to strengthen each file, but does not guarantee a visa, admission, scholarship,
              flight availability, accommodation availability, or a specific processing time unless expressly stated
              in a signed agreement.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
