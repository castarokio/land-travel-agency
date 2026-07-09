import { FileText, Landmark } from "lucide-react";

export function RequirementsChecklist() {
  const admissionsDocs = [
    "Dernier diplôme obtenu (Baccalauréat, Licence, Master)",
    "Relevés de notes officiels des 3 dernières années d'études",
    "Lettre de motivation rédigée avec soin (spécifique au projet)",
    "Curriculum Vitae (CV) académique à jour",
    "Attestations de niveau de langue (DELF, TCF, IELTS, TOEFL)",
    "Lettres de recommandation d'enseignants (fortement conseillées)"
  ];

  const visaDocs = [
    "Attestation de pré-inscription ou lettre d'acceptation officielle",
    "Justificatif d'hébergement pour les 3 premiers mois minimum",
    "Preuve de ressources financières suffisantes (Compte bloqué ou garant)",
    "Prise en charge financière légalisée (si garant familial)",
    "Passeport en cours de validité (plus de 15 mois restants)",
    "Formulaire de demande de visa de long séjour dûment complété"
  ];

  return (
    <section className="section-space" style={{ background: "#fff" }}>
      <div className="container" style={{ maxWidth: "1120px" }}>
        <div style={{ textAlign: "center", marginBottom: "54px" }}>
          <p className="section-label">Constitution du Dossier</p>
          <h2>Documents requis pour votre projet</h2>
          <p style={{ color: "var(--muted)", fontSize: "14px", marginTop: "8px", maxWidth: "560px", marginInline: "auto" }}>
            Pour maximiser vos chances de réussite académique et consulaire, préparez vos pièces justificatives à l&apos;avance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Column 1: Admissions */}
          <div 
            style={{ 
              border: "1px solid var(--border)", 
              borderRadius: "24px", 
              padding: "32px",
              background: "var(--cream)/5" 
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div style={{ padding: "8px", background: "var(--primary)/10", borderRadius: "10px", color: "var(--primary)" }}>
                <FileText className="w-6 h-6" />
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: "700", color: "var(--text)" }}>
                Dossier d&apos;Admission Universitaire
              </h3>
            </div>
            
            <ul className="space-y-4">
              {admissionsDocs.map((doc, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div 
                    style={{ 
                      width: "20px", 
                      height: "20px", 
                      borderRadius: "6px", 
                      border: "2px solid var(--primary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "11px",
                      fontWeight: "700",
                      color: "var(--primary)",
                      marginTop: "2px",
                      flexShrink: 0
                    }}
                  >
                    {idx + 1}
                  </div>
                  <span style={{ fontSize: "13px", color: "var(--muted)", lineHeight: "1.4" }}>
                    {doc}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Visa */}
          <div 
            style={{ 
              border: "1px solid var(--border)", 
              borderRadius: "24px", 
              padding: "32px",
              background: "var(--cream)/5" 
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div style={{ padding: "8px", background: "var(--orange)/10", borderRadius: "10px", color: "var(--orange)" }}>
                <Landmark className="w-6 h-6" />
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: "700", color: "var(--text)" }}>
                Dossier de Demande de Visa Étudiant
              </h3>
            </div>

            <ul className="space-y-4">
              {visaDocs.map((doc, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div 
                    style={{ 
                      width: "20px", 
                      height: "20px", 
                      borderRadius: "6px", 
                      border: "2px solid var(--orange)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "11px",
                      fontWeight: "700",
                      color: "var(--orange)",
                      marginTop: "2px",
                      flexShrink: 0
                    }}
                  >
                    {idx + 1}
                  </div>
                  <span style={{ fontSize: "13px", color: "var(--muted)", lineHeight: "1.4" }}>
                    {doc}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
