"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { studyFaqs } from "@/data/faqs";

export function StudyFAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="section-space" style={{ background: "#fff" }}>
      <div className="container" style={{ maxWidth: "860px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p className="section-label">FAQ</p>
          <h2>Foire Aux Questions Études</h2>
        </div>

        <div className="initiatives-accordion">
          {studyFaqs.map((faq, index) => {
            const isOpen = index === activeIndex;

            return (
              <article className={`initiative-row ${isOpen ? "active" : ""}`} key={index}>
                <button
                  className="initiative-trigger"
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => toggleFAQ(index)}
                  style={{ width: "100%", textAlign: "left" }}
                >
                  <span className="initiative-title" style={{ fontSize: "16px", fontWeight: "700" }}>
                    <span>{faq.question}</span>
                  </span>
                  {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                </button>

                <div
                  className="initiative-panel-wrapper"
                  style={{
                    display: "grid",
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    transition: "grid-template-rows 160ms cubic-bezier(0.2, 0.8, 0.2, 1)",
                    overflow: "hidden"
                  }}
                >
                  <div className="initiative-panel" style={{ minHeight: 0, paddingBottom: "16px" }}>
                    <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: "1.6" }}>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
