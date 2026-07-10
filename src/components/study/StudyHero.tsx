import { asset } from "@/lib/assets";

export function StudyHero() {
  return (
    <section 
      className="service-hero study-hero"
      style={{ backgroundImage: `url(${asset("hero-study-consultation.webp")})` }}
    >
      <div className="container">
        <p className="section-label" style={{ color: "var(--orange)", marginBottom: "8px" }}>Études à l&apos;étranger</p>
        <h1>Construisez votre projet académique à l&apos;international</h1>
        <p>
          Du choix de l&apos;université jusqu&apos;à l&apos;obtention de votre visa étudiant, notre équipe vous accompagne dans chaque étape avec rigueur et transparence.
        </p>
      </div>
    </section>
  );
}
