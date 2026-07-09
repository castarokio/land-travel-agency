import Image from "next/image";
import { proofLogos } from "@/data/home";

export function Proof() {
  // Duplicate logos list for infinite seamless scrolling
  const duplicatedLogos = [...proofLogos, ...proofLogos];

  return (
    <section className="proof-section">
      <div className="container">
        <p className="proof-title">
          Nos étudiants sont admis dans les meilleures universités du monde
        </p>
      </div>
      <div className="proof-ticker-container">
        <div className="proof-ticker-track">
          {duplicatedLogos.map((logo, index) => (
            <article className="proof-logo-card" key={`${logo.name}-${index}`}>
              <Image src={logo.src} width={180} height={72} alt={`${logo.name} logo`} loading="eager" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
