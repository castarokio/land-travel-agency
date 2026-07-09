import { notFound } from "next/navigation";
import { studyCountries } from "@/data/studyCountries";
import { universities } from "@/data/universities";
import { CountryPageLayout } from "@/components/universities/CountryPageLayout";

interface CountryPageProps {
  params: Promise<{ country: string }>;
}

export async function generateStaticParams() {
  return [
    { country: "france" },
    { country: "canada" },
    { country: "uk" },
    { country: "germany" },
    { country: "turkey" },
    { country: "russia" },
    { country: "malaysia" },
  ];
}

const countryDetails: Record<string, {
  category?: string;
  status?: string;
  serviceTitle?: string;
  serviceSubtitle?: string;
  serviceName?: string;
  level: string;
  agencyFee: string;
  originalFee: string;
  discountBadge: string;
  duration: string;
  format?: string;
  openingDate?: string;
  startDate?: string;
  deadline?: string;
  serviceLanguage?: string;
  location?: string;
  admissionType: string;
  schoolStart: string;
  reqLevel: string;
  popularSpecs: string;
  description: string;
  aboutText: string;
  audienceText?: string;
  whyService: string;
  fraisText: string;
  afterPayment?: string;
  processingDelay?: string;
  importantNotes?: string;
  documentIntro?: string;
  refundPolicy?: string;
  supportText?: string;
  servicesInclus: string[];
  conditions: string[];
  documents: { name: string; type: "Obligatoire" | "Facultatif"; desc?: string }[];
  faqs: { question: string; answer: string }[];
  rating: number;
  reviewsCount: number;
  studentsCount: number;
}> = {
  france: {
    level: "Bachelor / Master",
    agencyFee: "12 000 DZD",
    originalFee: "18 000 DZD",
    discountBadge: "33% de réduction",
    duration: "3 Ans (Bachelor) / 2 Ans (Master)",
    admissionType: "Via Campus France & Direct",
    schoolStart: "Septembre",
    reqLevel: "Baccalauréat (ou équivalent)",
    popularSpecs: "Management, Ingénierie, Arts & Architecture",
    description: "Nous organisons votre dossier complet pour postuler en France en formation de niveau Licence, Bachelor ou Master. Notre expertise englobe la révision des dossiers scolaires et la soumission sur la plateforme Campus France.",
    aboutText: "L'enseignement supérieur français est réputé pour son excellence académique et ses frais d'inscription très attractifs au sein des universités publiques. Les étudiants bénéficient également d'aides au logement (CAF) et d'une sécurité sociale gratuite.",
    whyService: "Passer par Land Travel sécurise votre démarche d'admission. Nous connaissons les attentes précises des universités françaises et des commissions consulaires de visa. Nous auditons vos relevés de notes et simulons vos entretiens Campus France.",
    fraisText: "Les frais d'inscription dans les universités publiques sont réglementés (environ 2 770 €/an en Licence et 3 770 €/an en Master). Le coût de la vie en dehors de Paris est estimé à environ 600 € à 800 € par mois (loyer, nourriture, transport).",
    servicesInclus: [
      "Audit personnalisé des bulletins de notes & diplômes",
      "Assistance à la création et soumission du dossier Campus France",
      "Vérification des lettres de motivation et CV académiques",
      "Simulation d'entretien blanc avec nos experts agréés",
      "Accompagnement pour l'assurance voyage et l'hébergement initial"
    ],
    conditions: [
      "Être titulaire du Baccalauréat algérien (ou équivalent) avec de bons relevés de notes",
      "Avoir un niveau de français suffisant (TCF Tout Public ou DELF B2 minimum)",
      "Disposer d'un garant financier en Algérie ou à l'étranger (ressources mensuelles stables)"
    ],
    documents: [
      { name: "Passeport en cours de validité (plus de 15 mois)", type: "Obligatoire" },
      { name: "Diplômes de Baccalauréat et relevés de notes officiels", type: "Obligatoire" },
      { name: "Dernier bulletin ou relevé de notes universitaire", type: "Obligatoire" },
      { name: "Lettre de motivation rédigée spécifiquement", type: "Facultatif" },
      { name: "Attestation de réussite au test de langue TCF/DELF", type: "Obligatoire" }
    ],
    faqs: [
      {
        question: "Qu'est-ce que la procédure Campus France ?",
        answer: "C'est un portail en ligne obligatoire pour postuler dans la majorité des universités françaises et initier sa demande de visa étudiant."
      },
      {
        question: "Est-il possible de travailler pendant mes études ?",
        answer: "Oui, la législation française autorise les étudiants étrangers à travailler à temps partiel (jusqu'à 60% de la durée annuelle de travail)."
      }
    ],
    rating: 4.8,
    reviewsCount: 42,
    studentsCount: 120
  },
  canada: {
    category: "Étudier à l'étranger",
    status: "Ouvert",
    serviceTitle: "Étudier au Canada - Bachelor",
    serviceSubtitle: "Service de préparation et de suivi pour vos candidatures d'études au Canada.",
    serviceName: "Étudier au Canada",
    level: "Bachelor",
    agencyFee: "14 000 DZD",
    originalFee: "14 000 DZD",
    discountBadge: "Ouvert",
    duration: "Suivi administratif progressif",
    format: "En ligne",
    openingDate: "01 janvier 2026",
    startDate: "01 janvier 2026",
    deadline: "03 février 2029",
    serviceLanguage: "Français / Anglais",
    location: "Canada",
    admissionType: "Préparation du dossier",
    schoolStart: "01 janvier 2026",
    reqLevel: "Bachelor",
    popularSpecs: "Bachelor",
    description: "Accompagnement pour préparer un dossier d'études au Canada avec cadrage des étapes et documents.",
    aboutText: "Le service s'adresse aux candidats qui souhaitent sécuriser leur préparation avant dépôt auprès d'établissements canadiens.",
    audienceText: "Candidats bachelor et master souhaitant un cadre clair avant de déposer leur dossier.",
    whyService: "Votre demande est enregistrée puis revue par l'équipe. En cas d'acceptation, l'agence lance le suivi.",
    fraisText: "Les frais couvrent l'évaluation du profil, la préparation du dossier et le suivi administratif de base.",
    afterPayment: "Votre demande est enregistrée puis revue par l'équipe. En cas d'acceptation, l'agence lance le suivi.",
    processingDelay: "Traitement initial habituel sous 3 heures ouvrables.",
    importantNotes: "Les pièces complémentaires peuvent être demandées selon le programme visé.",
    documentIntro: "Certains documents sont obligatoires et devront être ajoutés pour finaliser la demande.",
    refundPolicy: "Aucun remboursement sauf erreur ou manquement de l'agence.",
    supportText: "Le support vous oriente sur WhatsApp avant et après validation.",
    servicesInclus: [
      "Analyse du profil",
      "Recommandation de parcours",
      "Préparation du dossier",
      "Suivi des prochaines étapes"
    ],
    conditions: [
      "Documents d'identité valides",
      "Coordonnées de contact exactes",
      "Disponibilité pour compléter les pièces si demandées"
    ],
    documents: [
      { name: "Passeport", type: "Obligatoire", desc: "Copie lisible de la page d'identité." },
      { name: "Dernier diplôme", type: "Obligatoire", desc: "Diplôme ou certificat correspondant au niveau demandé." },
      { name: "Relevés de notes", type: "Obligatoire", desc: "Copies des relevés les plus récents." }
    ],
    faqs: [
      {
        question: "Puis-je postuler sans tous les documents au départ ?",
        answer: "Oui, mais certains documents peuvent être exigés ensuite selon le traitement du dossier."
      }
    ],
    rating: 4.9,
    reviewsCount: 38,
    studentsCount: 95
  },
  uk: {
    level: "Bachelor / Master",
    agencyFee: "30 000 DZD",
    originalFee: "45 000 DZD",
    discountBadge: "33% de réduction",
    duration: "3 Ans",
    admissionType: "UCAS / Direct Admissions",
    schoolStart: "Septembre",
    reqLevel: "Baccalauréat (ou équivalent)",
    popularSpecs: "Finance, Droit, Médecine, Sciences de la Santé",
    description: "Nous gérons vos candidatures directes ou via le portail national UCAS pour les meilleures universités du Royaume-Uni. Nous validons vos références académiques et le document officiel CAS.",
    aboutText: "Le Royaume-Uni abrite des universités de renommée mondiale comme Oxford ou Cambridge. Le système universitaire britannique met l'accent sur l'analyse critique, le projet pratique et l'accès direct aux réseaux professionnels.",
    whyService: "Le processus UCAS requiert un essai personnel hautement académique. Nous vous aidons à le structurer et à le corriger en anglais. Nous vous guidons également pas à pas pour l'obtention du code CAS indispensable au visa.",
    fraisText: "Les frais de scolarité pour les étudiants internationaux oscillent entre 12 000 £ et 22 000 £ par an. Le coût de la vie mensuel est estimé à environ 1 000 £ à 1 300 £ selon les villes.",
    servicesInclus: [
      "Création du compte et gestion de la candidature UCAS",
      "Optimisation et correction linguistique du Personal Statement (anglais)",
      "Audit et soumission des lettres de recommandation d'enseignants",
      "Suivi des offres conditionnelles et inconditionnelles",
      "Guidance complète pour le paiement des frais de santé (IHS) et visa"
    ],
    conditions: [
      "Avoir d'excellents résultats académiques au Baccalauréat ou à l'Université",
      "Prouver son niveau d'anglais via le test IELTS Academic (généralement 6.0 à 6.5+)",
      "Disposer du budget nécessaire pour payer l'acompte universitaire initial"
    ],
    documents: [
      { name: "Passeport en cours de validité", type: "Obligatoire" },
      { name: "Relevés de notes officiels et traduction en anglais", type: "Obligatoire" },
      { name: "Essai personnel (Personal Statement) rédigé en anglais", type: "Obligatoire" },
      { name: "Résultats officiels du test IELTS Academic UKVI", type: "Obligatoire" },
      { name: "Lettre de confirmation CAS délivrée par l'établissement", type: "Obligatoire" }
    ],
    faqs: [
      {
        question: "Qu'est-ce que le document CAS ?",
        answer: "Le Confirmation of Acceptance for Studies (CAS) est un numéro de référence unique généré par l'université britannique après paiement de l'acompte, indispensable pour déposer la demande de visa."
      },
      {
        question: "Puis-je travailler au Royaume-Uni pendant mes études ?",
        answer: "Oui, les étudiants inscrits dans un établissement d'enseignement supérieur agréé peuvent travailler jusqu'à 20 heures par semaine pendant les trimestres."
      }
    ],
    rating: 4.7,
    reviewsCount: 29,
    studentsCount: 64
  },
  germany: {
    level: "Bachelor / Master",
    agencyFee: "18 000 DZD",
    originalFee: "25 000 DZD",
    discountBadge: "28% de réduction",
    duration: "3 Ans",
    admissionType: "Uni-Assist & Direct",
    schoolStart: "Octobre & Avril",
    reqLevel: "Baccalauréat + 1 ou 2 ans d'études supérieures",
    popularSpecs: "Génie Mécanique, Informatique, Physique",
    description: "Nous vous accompagnons pour étudier en Allemagne. Nous vous guidons dans l'ouverture obligatoire de votre compte bloqué (Block Account) et dans le dépôt sur le portail d'évaluation Uni-Assist.",
    aboutText: "L'Allemagne propose une scolarité quasi gratuite dans l'ensemble de ses universités publiques, y compris pour les étudiants hors Union Européenne. Les filières techniques et scientifiques allemandes comptent parmi les meilleures au monde.",
    whyService: "Les universités allemandes ont des critères d'admissibilité stricts concernant l'équivalence des diplômes étrangers. Nous évaluons vos notes selon la formule bavaroise pour vérifier votre admissibilité et vous aidons à ouvrir le compte bloqué rapidement.",
    fraisText: "Les frais universitaires sont nuls dans le public, à l'exception d'une cotisation semestrielle de 150 € à 350 € (incluant un abonnement de transport). Cependant, un compte bloqué d'environ 11 208 € est obligatoire pour le visa.",
    servicesInclus: [
      "Évaluation préliminaire des relevés de notes selon la formule bavaroise",
      "Préparation et traduction des dossiers académiques pour Uni-Assist",
      "Guidance complète pour l'ouverture du compte bloqué (Fintiba, Expatrio)",
      "Assistance pour la recherche de logement étudiant et l'assurance publique",
      "Dépôt et suivi des candidatures d'admissions directes"
    ],
    conditions: [
      "Avoir validé au moins une année d'études supérieures en Algérie après le Baccalauréat",
      "Présenter un test d'allemand (TestDaF B2/C1) ou d'anglais (IELTS 6.5+) selon le cursus choisi",
      "Avoir les fonds nécessaires pour alimenter le compte bloqué requis par le consulat"
    ],
    documents: [
      { name: "Passeport en cours de validité", type: "Obligatoire" },
      { name: "Diplômes traduits officiellement en allemand ou en anglais", type: "Obligatoire" },
      { name: "Attestation d'ouverture et de dépôt du Compte Bloqué (Sperrkonto)", type: "Obligatoire" },
      { name: "Certificat de langue officielle (IELTS, TestDaF ou DSH)", type: "Obligatoire" },
      { name: "Lettre d'admission universitaire (Zulassungsbescheid)", type: "Obligatoire" }
    ],
    faqs: [
      {
        question: "Qu'est-ce qu'un compte bloqué ?",
        answer: "C'est un compte bancaire allemand spécial sur lequel vous devez déposer une somme minimale exigée par l'État pour prouver que vous pouvez subvenir à vos besoins pendant un an."
      },
      {
        question: "Est-il obligatoire de parler allemand pour étudier en Allemagne ?",
        answer: "Non, il existe des centaines de programmes entièrement enseignés en anglais (International Programs), bien que des notions d'allemand facilitent la vie quotidienne."
      }
    ],
    rating: 4.8,
    reviewsCount: 33,
    studentsCount: 80
  },
  turkey: {
    level: "Bachelor / Master",
    agencyFee: "10 000 DZD",
    originalFee: "15 000 DZD",
    discountBadge: "33% de réduction",
    duration: "4 Ans",
    admissionType: "Baccalauréat / YÖS / SAT",
    schoolStart: "Septembre",
    reqLevel: "Baccalauréat (ou équivalent)",
    popularSpecs: "Médecine, Architecture, Relations Internationales",
    description: "Nous gérons vos demandes d'admission pour les universités turques publiques et privées. Nous coordonnons l'évaluation de vos relevés de notes du Bac et la planification linguistique.",
    aboutText: "La Turquie allie une éducation moderne conforme aux critères du processus de Bologne (normes européennes) à un coût de vie particulièrement attractif. Les diplômes obtenus y sont largement reconnus en Europe et à l'étranger.",
    whyService: "Nous disposons de partenariats directs avec de grandes universités privées en Turquie, ce qui nous permet d'obtenir des bourses d'études partielles allant jusqu'à 50% sur les frais de scolarité pour nos étudiants.",
    fraisText: "Les universités privées coûtent entre 2 000 $ et 8 000 $ par an selon les spécialités (la médecine étant plus chère). Les universités publiques coûtent entre 500 $ et 2 000 $ par an. Vivre en Turquie coûte environ 400 $ à 500 $ par mois.",
    servicesInclus: [
      "Évaluation et traduction officielle de vos diplômes en langue turque",
      "Soumission des dossiers dans les établissements privés partenaires (bourses assurées)",
      "Assistance à l'inscription à l'examen YÖS pour les universités publiques",
      "Coordination des démarches pour l'obtention du permis de séjour étudiant (Ikamet)",
      "Réservation d'hébergement en résidence universitaire privée ou d'État"
    ],
    conditions: [
      "Avoir obtenu son diplôme de Baccalauréat",
      "Pour les universités publiques : réussir l'examen YÖS ou avoir un excellent score au SAT",
      "Fournir un certificat linguistique en turc (TÖMER B2) ou en anglais (IELTS/TOEFL)"
    ],
    documents: [
      { name: "Passeport en cours de validité", type: "Obligatoire" },
      { name: "Diplôme de Baccalauréat original et sa traduction officielle", type: "Obligatoire" },
      { name: "Relevés de notes des classes de seconde, première et terminale", type: "Obligatoire" },
      { name: "Photos d'identité couleur récentes", type: "Obligatoire" },
      { name: "Lettre d'acceptation officielle de l'université turque", type: "Obligatoire" }
    ],
    faqs: [
      {
        question: "Qu'est-ce que l'examen YÖS ?",
        answer: "C'est l'examen officiel d'admission destiné aux étudiants étrangers souhaitant intégrer une université publique en Turquie. Il comporte principalement des épreuves de logique et de mathématiques."
      },
      {
        question: "Faut-il un visa pour étudier en Turquie ?",
        answer: "Oui, après obtention de votre lettre d'acceptation définitive, vous devez déposer une demande de visa d'études auprès du consulat de Turquie à Alger ou Oran."
      }
    ],
    rating: 4.6,
    reviewsCount: 51,
    studentsCount: 145
  },
  russia: {
    level: "Bachelor / Master",
    agencyFee: "10 000 DZD",
    originalFee: "15 000 DZD",
    discountBadge: "33% de réduction",
    duration: "4 Ans (+ 1 an de classe préparatoire)",
    admissionType: "Dépôt de dossier direct",
    schoolStart: "Septembre / Octobre",
    reqLevel: "Baccalauréat (ou équivalent)",
    popularSpecs: "Génie Aéronautique, Médecine, Informatique",
    description: "Nous gérons votre inscription directe dans les universités d'État en Russie. Nous coordonnons l'invitation officielle du ministère de l'Immigration indispensable pour obtenir le visa russe à 100%.",
    aboutText: "La Russie abrite des établissements de recherche de renommée mondiale. Le coût de la scolarité et du logement en dortoir universitaire y est particulièrement économique, ce qui en fait un excellent choix pour les budgets modérés.",
    whyService: "Nous obtenons l'invitation officielle ministérielle rapidement et assurons la traduction assermentée en russe de tous vos documents. De plus, notre représentant local vous accueille directement à l'aéroport et vous installe dans votre dortoir.",
    fraisText: "Les frais de scolarité en Russie sont très compétitifs (entre 1 500 $ et 3 500 $ par an). La chambre en dortoir universitaire coûte environ 30 $ à 100 $ par mois, et la vie courante nécessite environ 200 $ à 300 $ par mois.",
    servicesInclus: [
      "Obtention de la lettre d'invitation officielle du ministère de l'Intérieur russe",
      "Traduction assermentée en langue russe de toutes les pièces académiques",
      "Préparation complète du dossier consulaire de visa d'études",
      "Accueil physique par notre représentant à l'aéroport en Russie",
      "Assistance lors de l'enregistrement au dortoir et à l'université"
    ],
    conditions: [
      "Être titulaire d'un Baccalauréat ou diplôme universitaire valide",
      "Avoir un dossier médical d'aptitude générale et un test VIH négatif récent",
      "Être prêt à suivre une année préparatoire de langue russe (si cursus en russe)"
    ],
    documents: [
      { name: "Passeport original (valide plus de 18 mois)", type: "Obligatoire" },
      { name: "Diplôme de Baccalauréat et relevés traduits officiellement en russe", type: "Obligatoire" },
      { name: "Certificat médical d'aptitude générale et test VIH négatif", type: "Obligatoire" },
      { name: "Invitation officielle émise par le ministère russe", type: "Obligatoire" }
    ],
    faqs: [
      {
        question: "Comment se déroule la classe préparatoire (Fakultet) ?",
        answer: "C'est une année consacrée à l'apprentissage intensif de la langue russe et des matières scientifiques de base nécessaires pour votre futur cursus universitaire."
      },
      {
        question: "Le visa d'études russe est-il garanti ?",
        answer: "Oui, dès lors que vous possédez l'invitation officielle émise par le ministère, le visa d'études est délivré de manière systématique sous réserve que votre passeport soit valide."
      }
    ],
    rating: 4.7,
    reviewsCount: 68,
    studentsCount: 210
  },
  malaysia: {
    level: "Bachelor / Master",
    agencyFee: "15 000 DZD",
    originalFee: "22 000 DZD",
    discountBadge: "31% de réduction",
    duration: "3 Ans",
    admissionType: "EMGS / Direct",
    schoolStart: "Septembre & Février",
    reqLevel: "Baccalauréat (ou équivalent)",
    popularSpecs: "Technologies de l'Information, Tourisme, Business",
    description: "Nous gérons votre dossier académique pour la Malaisie et suivons l'approbation de votre Student Visa Approval Letter (VAL) auprès de l'organisme officiel EMGS.",
    aboutText: "La Malaisie est l'une des économies les plus dynamiques d'Asie du Sud-Est. Elle s'est imposée comme un pôle éducatif régional majeur, accueillant de prestigieux campus délocalisés d'universités britanniques et australiennes.",
    whyService: "Le processus d'immigration malaisien passe par le système centralisé EMGS qui requiert des vérifications strictes. Nous validons vos diplômes auprès des ministères compétents et suivons l'avancement de votre dossier d'approbation à 100%.",
    fraisText: "Les frais universitaires oscillent entre 3 000 $ et 6 000 $ par an pour la majorité des programmes. Le coût de la vie est modéré, estimé à environ 350 $ à 500 $ par mois pour se loger et se nourrir confortablement.",
    servicesInclus: [
      "Soumission des dossiers de candidatures dans les universités accréditées",
      "Suivi quotidien de la demande de visa (VAL) sur le portail officiel EMGS",
      "Assistance pour la réalisation des examens médicaux pré-départ obligatoires",
      "Légalisation des relevés de notes au niveau du Ministère des Affaires Étrangères",
      "Recherche d'hébergement étudiant sur le campus ou à proximité immédiate"
    ],
    conditions: [
      "Posséder un diplôme de fin d'études secondaires (Baccalauréat) ou universitaire",
      "Justifier d'un niveau d'anglais intermédiaire (score IELTS 5.5 minimum ou équivalent)",
      "Satisfaire aux exigences médicales obligatoires fixées par les autorités malaisiennes"
    ],
    documents: [
      { name: "Passeport complet (toutes les pages scannées en couleur)", type: "Obligatoire" },
      { name: "Diplôme de Baccalauréat et relevés traduits en anglais", type: "Obligatoire" },
      { name: "Attestation de réussite au test linguistique IELTS ou TOEFL", type: "Obligatoire" },
      { name: "Rapport d'examen médical pré-départ certifié", type: "Obligatoire" },
      { name: "Lettre d'approbation de visa (VAL) émise par l'EMGS", type: "Obligatoire" }
    ],
    faqs: [
      {
        question: "Qu'est-ce que l'EMGS ?",
        answer: "L'Education Malaysia Global Services (EMGS) est l'organisme officiel chargé d'évaluer les dossiers des étudiants étrangers et d'émettre les autorisations de visa d'études."
      },
      {
        question: "Puis-je obtenir un double diplôme en Malaisie ?",
        answer: "Oui, de nombreuses universités malaisiennes ont des accords de partenariat permettant d'obtenir le diplôme officiel d'universités partenaires en Australie ou au Royaume-Uni."
      }
    ],
    rating: 4.8,
    reviewsCount: 22,
    studentsCount: 55
  }
};

export default async function CountryUniversitiesPage({ params }: CountryPageProps) {
  const { country } = await params;
  const currentCountry = country.toLowerCase();
  
  const countryInfo = studyCountries.find(
    (c) => c.id.toLowerCase() === currentCountry
  );

  const detail = countryDetails[currentCountry];

  if (!countryInfo || !detail) {
    notFound();
  }

  const getCountryNameInDB = (id: string) => {
    switch (id) {
      case "france": return "France";
      case "canada": return "Canada";
      case "uk": return "Royaume-Uni";
      case "germany": return "Allemagne";
      case "turkey": return "Turquie";
      case "russia": return "Russie";
      case "malaysia": return "Malaisie";
      default: return "";
    }
  };

  const countryNameInDB = getCountryNameInDB(countryInfo.id);
  const countryUnis = universities.filter(
    (u) => u.country.toLowerCase() === countryNameInDB.toLowerCase()
  );

  const typedCountryInfo = {
    id: countryInfo.id || "",
    name: countryInfo.name || "",
    image: countryInfo.image || "",
    language: countryInfo.language || "",
    averageTuition: countryInfo.averageTuition || "",
    visaSuccessRate: countryInfo.visaSuccessRate || "Élevé",
    availableMajors: countryInfo.availableMajors ?? [],
  };

  return (
    <CountryPageLayout 
      countryInfo={typedCountryInfo} 
      detail={detail} 
      countryUnis={countryUnis} 
    />
  );
}
