import { asset } from './assets';

export const services = [
  {
    title: "Choix d'Université",
    description: "Shortlist de pays, universités et programmes selon votre budget, vos notes et votre projet de carrière.",
    detail: "Profil, budget, délais",
    cta: "Construire ma shortlist",
    icon: "GraduationCap",
    color: "purple",
    href: "/universities"
  },
  {
    title: "Dossier Visa Étudiant",
    description: "Préparation du dossier consulaire, vérification des justificatifs et simulation avant rendez-vous.",
    detail: "Checklist + rendez-vous",
    cta: "Préparer mon visa",
    icon: "ShieldCheck",
    color: "blue",
    href: "/signup"
  },
  {
    title: "Voyages Sur Mesure",
    description: "Itinéraires, vols, hôtels et activités adaptés aux familles, groupes et voyageurs solo.",
    detail: "Vols, hôtels, circuits",
    cta: "Voir les voyages",
    icon: "Compass",
    color: "orange",
    href: "/#tourism"
  },
  {
    title: "Formules Omra",
    description: "Visa, billets, hébergement proche Haram, transferts et accompagnement Ziyarat de bout en bout.",
    detail: "Makkah, Madinah, Ziyarat",
    cta: "Planifier mon Omra",
    icon: "Kaaba",
    color: "green",
    href: "/services/omra"
  },
  {
    title: "IELTS, TOEFL & Langues",
    description: "Orientation vers le bon test, objectifs de score et plan de préparation selon les admissions visées.",
    detail: "Score cible + planning",
    cta: "Choisir mon test",
    icon: "BookOpen",
    color: "red",
    href: "/universities"
  },
  {
    title: "Suivi Jusqu'au Départ",
    description: "Relances, échéances, réponses d'admission, inscription finale et préparation avant le voyage.",
    detail: "Deadlines, emails, départ",
    cta: "Suivre mon dossier",
    icon: "FileCheck2",
    color: "indigo",
    href: "/signup"
  }
];

export const serviceJourney = [
  {
    id: "orientation",
    title: "Orientation académique",
    shortTitle: "Orientation Académique",
    description:
      "Nous clarifions votre profil, votre budget et vos ambitions pour choisir la spécialité, le pays et le parcours qui ont vraiment du sens.",
    detail:
      "Dès le premier échange, un conseiller analyse vos notes, vos préférences, votre budget et vos objectifs pour construire une direction réaliste.",
    image: asset("hero-study-consultation.webp"),
    href: "/services#orientation",
    cta: "Explorer"
  },
  {
    id: "admission",
    title: "Admission universitaire",
    shortTitle: "Admission Universitaire",
    description:
      "Nous préparons les candidatures, les traductions, les lettres et les échanges avec les universités jusqu'à la réponse d'admission.",
    detail:
      "Notre équipe suit les documents à fournir, les délais, les corrections et les échanges avec l'université pour éviter les erreurs coûteuses.",
    image: asset("Canada university campus.webp"),
    href: "/services#admission",
    cta: "Explorer"
  },
  {
    id: "visa",
    title: "Procédure de visa",
    shortTitle: "Procédures de visa",
    description:
      "Nous vérifions les justificatifs, organisons la checklist consulaire et préparons l'entretien pour sécuriser chaque étape du visa.",
    detail:
      "Chaque dossier est relu avec vous : ressources, admission, hébergement, assurance, formulaires et preuves nécessaires au rendez-vous.",
    image: asset("airport.webp"),
    href: "/services#visa",
    cta: "Explorer"
  },
  {
    id: "hebergement",
    title: "Hébergement",
    shortTitle: "Hébergement",
    description:
      "Nous vous aidons à comparer les options de logement : résidence, campus, famille d'accueil, hôtel ou solution indépendante.",
    detail:
      "Vous recevez des conseils pour choisir un logement selon la ville, la distance, le budget, les conditions de paiement et le calendrier.",
    image: asset("hotel near Kaaba.webp"),
    href: "/services#hebergement",
    cta: "Explorer"
  },
  {
    id: "accompagnement",
    title: "Accompagnement",
    shortTitle: "Accompagnement",
    description:
      "Nous restons présents après l'admission : relances, départ, billets, arrivée, installation et prochaines démarches.",
    detail:
      "Le suivi continue jusqu'au départ avec un point clair sur vos tâches restantes, vos échéances et les documents à garder prêts.",
    image: asset("hero-travel-agent.webp"),
    href: "/services#accompagnement",
    cta: "Explorer"
  }
];
