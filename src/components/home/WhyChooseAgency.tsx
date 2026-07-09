import Image from "next/image";
import { homeStats } from "@/data/home";
import { asset } from "@/lib/assets";

export function WhyChooseAgency() {
  return (
    <section className="why-section section-space">
      <div className="container why-grid">
        <div className="why-art">
          <Image
            src={asset("why-choose-student-illustration.png")}
            width={520}
            height={360}
            alt="Étudiant lisant avec des icônes d'éducation"
            loading="eager"
          />
        </div>

        <div className="why-copy">
          <p className="section-label">Pourquoi nous choisir ?</p>
          <h2>Le seul bon choix</h2>
          <p>
            {"Nos étudiants et leurs parents apprécient notre connaissance approfondie des systèmes éducatifs et d'immigration mondiaux, ainsi que notre professionnalisme et notre dévouement."}
          </p>

          <div className="stats-grid">
            {homeStats.map((stat) => (
              <article key={stat.label} className="stat-card">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
