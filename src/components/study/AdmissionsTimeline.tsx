export function AdmissionsTimeline() {
  const steps = [
    {
      period: "Octobre - Novembre",
      title: "Orientation & Choix du Projet",
      desc: "Analyse approfondie de vos relevés de notes, entretien d'orientation individuel et sélection des pays et universités cibles."
    },
    {
      period: "Décembre - Février",
      title: "Soumission des Candidatures",
      desc: "Rédaction des lettres de motivation, montage de votre dossier (Campus France, portails universitaires) et dépôt officiel."
    },
    {
      period: "Mars - Avril",
      title: "Entretiens & Tests de Langue",
      desc: "Passage des entretiens académiques obligatoires et des tests linguistiques requis par vos établissements."
    },
    {
      period: "Mai - Juillet",
      title: "Lettres d'Acceptation & Visa",
      desc: "Réception de vos acceptations formelles, versement de l'acompte de scolarité et dépôt complet de votre dossier consulaire."
    },
    {
      period: "Août - Septembre",
      title: "Préparatifs de Départ & Accueil",
      desc: "Briefing avant départ, réservation de votre billet d'avion, recherche d'hébergement et installation finale dans votre pays d'accueil."
    }
  ];

  return (
    <section className="section-space" style={{ background: "var(--cream)/10" }}>
      <div className="container" style={{ maxWidth: "860px" }}>
        <div style={{ textAlign: "center", marginBottom: "54px" }}>
          <p className="section-label">Le Parcours</p>
          <h2>Calendrier Général des Démarches</h2>
          <p style={{ color: "var(--muted)", fontSize: "14px", marginTop: "8px" }}>
            Un projet réussi suit un calendrier précis. Préparez chaque étape au bon moment.
          </p>
        </div>

        <div style={{ position: "relative", paddingLeft: "32px", borderLeft: "2px dashed var(--border)" }}>
          {steps.map((step, idx) => (
            <div key={idx} style={{ position: "relative", marginBottom: "40px" }}>
              {/* Bullet Node */}
              <div 
                style={{ 
                  position: "absolute", 
                  left: "-42px", 
                  top: "2px",
                  width: "20px", 
                  height: "20px", 
                  borderRadius: "50%", 
                  background: idx === 3 || idx === 4 ? "var(--orange)" : "var(--primary)",
                  border: "4px solid #fff",
                  boxShadow: "0 0 8px rgba(0,0,0,0.1)",
                  zIndex: 2
                }} 
              />
              
              {/* Step Info */}
              <div>
                <span 
                  style={{ 
                    fontSize: "11px", 
                    fontWeight: "800", 
                    textTransform: "uppercase", 
                    color: idx === 3 || idx === 4 ? "var(--orange)" : "var(--primary)",
                    letterSpacing: "1px",
                    display: "block",
                    marginBottom: "4px"
                  }}
                >
                  {step.period}
                </span>
                
                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "var(--text)", marginBottom: "8px" }}>
                  {step.title}
                </h3>
                
                <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: "1.5" }}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
