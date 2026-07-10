import { contactFaqs, homeFaqs, omraFaqs, studyFaqs, tourismFaqs } from "@/data/faqs";
import styles from "../legal-pages.module.css";

export const metadata = {
  title: "FAQ | Land Travel",
  description: "Frequently asked questions about Land Travel services.",
};

const faqs = [...homeFaqs, ...studyFaqs, ...tourismFaqs, ...omraFaqs, ...contactFaqs];

export default function FaqPage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <p className={styles.eyebrow}>FAQ</p>
        <h1 className={styles.title}>Questions fréquentes</h1>
        <p className={styles.intro}>
          Quick answers about study abroad, tourism, Omra, visa support, remote follow-up, and working with Land Travel.
        </p>

        <div className={styles.faqList}>
          {faqs.map((faq) => (
            <article className={styles.faqItem} key={faq.question}>
              <h2>{faq.question}</h2>
              <p>{faq.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
