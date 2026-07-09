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
    requirements: ["Campus France", "Test de langue (TCF/DELF)", "Ressources financières stables"]
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
    requirements: ["Lettre d'acceptation d'un EED", "Test IELTS ou TEF", "Preuve de fonds suffisants"]
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
    requirements: ["IELTS Academic", "Dossier UCAS ou Direct", "Confirmation of Acceptance for Studies (CAS)"]
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
    requirements: ["Compte bloqué (Block account)", "Test de langue (TestDaF/DSH/IELTS)", "Reconnaissance de diplôme"]
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
    requirements: ["Diplôme de baccalauréat", "Test de langue (TÖMER/IELTS)", "Examen YÖS ou SAT (optionnel)"]
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
    requirements: ["Dossier scolaire légalisé", "Examen médical d'aptitude", "Année préparatoire linguistique (si cursus Russe)"]
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
    requirements: ["Diplôme d'études secondaires", "Score IELTS / TOEFL", "Visa d'approbation d'étudiant (VAL)"]
  }
];
