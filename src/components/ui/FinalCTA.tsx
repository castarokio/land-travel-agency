import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface FinalCTAProps {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function FinalCTA({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: FinalCTAProps) {
  return (
    <section className="newsletter-section section-space">
      <div className="container">
        <div className="newsletter-card text-center" style={{ padding: "clamp(32px, 5vw, 64px) clamp(24px, 4vw, 48px)" }}>
          <p className="section-label">Prêt à partir ?</p>
          <h2 style={{ maxWidth: "720px", margin: "0 auto 16px", textWrap: "balance" }}>{title}</h2>
          <p style={{ color: "var(--muted)", fontSize: "15px", maxWidth: "540px", margin: "0 auto 32px", lineHeight: "1.6" }}>
            {description}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-fit mx-auto">
            <Link href={primaryHref} className="button" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <span>{primaryLabel}</span>
              <ArrowRight size={15} />
            </Link>

            {secondaryLabel && secondaryHref && (
              <Link href={secondaryHref} className="button" style={{ background: "transparent", border: "1px solid var(--border)", color: "var(--text)" }}>
                {secondaryLabel}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
