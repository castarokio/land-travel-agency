import { StudyCountry } from "@/types";
import { asset } from "@/lib/assets";

export const studyCountries: StudyCountry[] = [
  {
    id: "france",
    name: "France",
    image: asset("destination-united-kingdom.webp"), // Fallback to available asset
    description: "Une destination de premier choix alliant prestige académique, culture historique et tarifs universitaires publics très attractifs.",
    popularPrograms: ["Management & Commerce", "Ingénierie", "Arts & Architecture"],
    averageTuition: "2 770 € - 3 770 € / an (Public)",
    language: "Français & Anglais",
    visaSuccessRate: "82%",
    requirements: ["Campus France", "Test de langue (TCF/DELF)", "Ressources financières stables"],
    availableMajors: [
      { name: "Management & Commerce", minBac: "12/20+", note: "Plus fort avec bonnes notes en langues et économie." },
      { name: "Ingénierie", minBac: "13/20+", note: "Maths et sciences doivent être solides." },
      { name: "Arts & Architecture", minBac: "11/20+", note: "Portfolio ou projet créatif souvent demandé." },
      { name: "Informatique", minBac: "12/20+", note: "Bon niveau en maths recommandé." }
    ]
  },
  {
    id: "canada",
    name: "Canada",
    image: asset("Canada university campus.webp"),
    description: "Des campus modernes exceptionnels, des opportunités de stage et des politiques d'immigration post-études très favorables.",
    popularPrograms: ["Informatique & IA", "Administration des affaires", "Sciences de l'environnement"],
    averageTuition: "15 000 $CAD - 28 000 $CAD / an",
    language: "Anglais & Français",
    visaSuccessRate: "78%",
    requirements: ["Lettre d'acceptation d'un EED", "Test IELTS ou TEF", "Preuve de fonds suffisants"],
    availableMajors: [
      { name: "Informatique & IA", minBac: "13/20+", note: "Maths, anglais et projet technique aident beaucoup." },
      { name: "Business Administration", minBac: "12/20+", note: "Bon dossier global et langue forte." },
      { name: "Sciences de l'environnement", minBac: "12/20+", note: "Sciences naturelles recommandées." },
      { name: "Génie civil", minBac: "13/20+", note: "Maths et physique importantes." }
    ]
  },
  {
    id: "uk",
    name: "Royaume-Uni",
    image: asset("destination-united-kingdom.webp"),
    description: "Le berceau des universités historiques d'excellence mondiale avec des diplômes reconnus sur tous les continents.",
    popularPrograms: ["Finance & Économie", "Droit", "Médecine & Santé"],
    averageTuition: "12 000 £ - 22 000 £ / an",
    language: "Anglais",
    visaSuccessRate: "85%",
    requirements: ["IELTS Academic", "Dossier UCAS ou Direct", "Confirmation of Acceptance for Studies (CAS)"],
    availableMajors: [
      { name: "Finance & Économie", minBac: "13/20+", note: "Maths et anglais académique demandés." },
      { name: "Droit", minBac: "13/20+", note: "Très bon anglais et personal statement fort." },
      { name: "Médecine & Santé", minBac: "15/20+", note: "Très sélectif, sciences fortes obligatoires." },
      { name: "Computing", minBac: "13/20+", note: "Maths et portfolio/projets valorisés." }
    ]
  },
  {
    id: "germany",
    name: "Allemagne",
    image: asset("destination-germany.webp"),
    description: "La gratuité des frais de scolarité dans les universités publiques alliée à une puissance technologique et industrielle de pointe.",
    popularPrograms: ["Génie mécanique", "Informatique", "Sciences physiques"],
    averageTuition: "Gratuit (Sauf contribution semestrielle ~300€)",
    language: "Allemand & Anglais",
    visaSuccessRate: "80%",
    requirements: ["Compte bloqué (Block account)", "Test de langue (TestDaF/DSH/IELTS)", "Reconnaissance de diplôme"],
    availableMajors: [
      { name: "Génie mécanique", minBac: "14/20+", note: "Maths/physique très importants, équivalence à vérifier." },
      { name: "Informatique", minBac: "13/20+", note: "Bon niveau maths et anglais/allemand." },
      { name: "Sciences physiques", minBac: "14/20+", note: "Dossier scientifique solide requis." },
      { name: "Business international", minBac: "12/20+", note: "Plus accessible en écoles privées ou programmes anglais." }
    ]
  },
  {
    id: "turkey",
    name: "Turquie",
    image: asset("destination-denmark.webp"), // Fallback to available asset
    description: "Une éducation de qualité aux normes européennes à la croisée de l'Orient et de l'Occident avec des coûts de vie très abordables.",
    popularPrograms: ["Médecine", "Architecture", "Relations internationales"],
    averageTuition: "1 000 $ - 4 000 $ / an",
    language: "Turc & Anglais",
    visaSuccessRate: "88%",
    requirements: ["Diplôme de baccalauréat", "Test de langue (TÖMER/IELTS)", "Examen YÖS ou SAT (optionnel)"],
    availableMajors: [
      { name: "Médecine", minBac: "14/20+", note: "Plus compétitif, budget et langue à confirmer." },
      { name: "Architecture", minBac: "12/20+", note: "Portfolio peut aider selon l'école." },
      { name: "Relations internationales", minBac: "11/20+", note: "Langue anglaise ou turque importante." },
      { name: "Informatique", minBac: "12/20+", note: "Options accessibles en anglais ou turc." }
    ]
  },
  {
    id: "russia",
    name: "Russie",
    image: asset("destination-australia.webp"), // Fallback to available asset
    description: "Des universités de recherche de classe mondiale, des laboratoires de pointe et un coût d'études particulièrement économique.",
    popularPrograms: ["Génie aéronautique", "Médecine générale", "Génie logiciel"],
    averageTuition: "1 500 $ - 3 500 $ / an",
    language: "Russe & Anglais",
    visaSuccessRate: "90%",
    requirements: ["Dossier scolaire légalisé", "Examen médical d'aptitude", "Année préparatoire linguistique (si cursus Russe)"],
    availableMajors: [
      { name: "Médecine générale", minBac: "12/20+", note: "Sciences fortes recommandées." },
      { name: "Génie aéronautique", minBac: "13/20+", note: "Maths et physique demandées." },
      { name: "Génie logiciel", minBac: "12/20+", note: "Année préparatoire possible." },
      { name: "Pharmacie", minBac: "12/20+", note: "Bon dossier scientifique conseillé." }
    ]
  },
  {
    id: "malaysia",
    name: "Malaisie",
    image: asset("destination-denmark.webp"), // Fallback to available asset
    description: "Un hub universitaire asiatique dynamique proposant des double-diplômes britanniques ou australiens à prix réduit.",
    popularPrograms: ["Technologies de l'information", "Hôtellerie & Tourisme", "Business international"],
    averageTuition: "3 000 $ - 6 000 $ / an",
    language: "Anglais",
    visaSuccessRate: "92%",
    requirements: ["Diplôme d'études secondaires", "Score IELTS / TOEFL", "Visa d'approbation d'étudiant (VAL)"],
    availableMajors: [
      { name: "Technologies de l'information", minBac: "11/20+", note: "Anglais et logique technique recommandés." },
      { name: "Hôtellerie & Tourisme", minBac: "10/20+", note: "Option accessible avec bon anglais." },
      { name: "Business international", minBac: "10/20+", note: "Bon choix pour budget maîtrisé." },
      { name: "Ingénierie", minBac: "12/20+", note: "Maths/sciences nécessaires." }
    ]
  }
];
