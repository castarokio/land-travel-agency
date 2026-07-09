import { Package } from "@/types";
import { asset } from "@/lib/assets";

export const internationalPackages: Package[] = [
  {
    id: "maldives-beach",
    title: "Paradis Tropical aux Maldives",
    price: "à partir de 1 890 €",
    duration: "8 Jours / 7 Nuits",
    category: "Tropical",
    image: asset("intl-maldives-resort.webp"),
    description: "Séjournez dans une luxueuse villa sur pilotis entourée d'eaux turquoise et de plages de sable blanc. Une parenthèse de détente absolue sous les tropiques.",
    details: [
      "Vols internationaux inclus",
      "Villa sur pilotis avec piscine privée",
      "Formule tout inclus (All-Inclusive)",
      "Transferts en hydravion ou speedboat",
      "Activités de snorkeling guidées"
    ],
    inclusions: [
      "Billet d'avion A/R",
      "Hébergement 5*",
      "Tous les repas & boissons",
      "Assurance voyage standard"
    ]
  },
  {
    id: "tokyo-lights",
    title: "Lumières & Traditions du Japon",
    price: "à partir de 2 150 €",
    duration: "10 Jours / 9 Nuits",
    category: "Asia",
    image: asset("intl-tokyo-streets.webp"),
    description: "Découvrez le contraste saisissant entre le Tokyo moderne illuminé de néons et les temples paisibles de Kyoto. Une aventure inoubliable au pays du Soleil-Levant.",
    details: [
      "Hôtels 4* idéalement situés",
      "Pass trains JR de 7 jours inclus",
      "Visites guidées privées (Tokyo & Kyoto)",
      "Expérience de cérémonie de thé traditionnelle",
      "Assistance 24h/24 francophone"
    ],
    inclusions: [
      "Billet d'avion A/R",
      "Hébergement & transferts",
      "Train à grande vitesse (Shinkansen)",
      "Guide local multilingue"
    ]
  },
  {
    id: "swiss-alps",
    title: "Évasion Alpine en Suisse",
    price: "à partir de 1 250 €",
    duration: "7 Jours / 6 Nuits",
    category: "Europe",
    image: asset("intl-swiss-alps.webp"),
    description: "Respirez le grand air des Alpes dans un chalet en bois niché face aux montagnes enneigées. Voyagez à bord de trains panoramiques d'exception.",
    details: [
      "Hébergement en chalet typique de montagne",
      "Pass de transport ferroviaire illimité",
      "Accès aux téléphériques et pistes",
      "Randonnées guidées en été ou ski en hiver",
      "Fondue traditionnelle offerte"
    ],
    inclusions: [
      "Vols ou trains régionaux",
      "Hébergement premium",
      "Swiss Travel Pass",
      "Dîner gastronomique"
    ]
  },
  {
    id: "safari-wildlife",
    title: "Grand Safari au Serengeti",
    price: "à partir de 2 450 €",
    duration: "7 Jours / 6 Nuits",
    category: "Adventure",
    image: asset("intl-safari-wildlife.webp"),
    description: "Vivez le spectacle de la faune sauvage en Tanzanie. Observez les 'Big Five' (lions, éléphants, léopards, rhinocéros, buffles) lors de safaris quotidiens en 4x4.",
    details: [
      "Hébergement en lodge de luxe et tentes safari",
      "Chauffeur-guide francophone certifié",
      "Safaris en 4x4 à toit ouvrant",
      "Entrées des parcs nationaux incluses",
      "Pension complète pendant le safari"
    ],
    inclusions: [
      "Vols A/R tanzaniens",
      "Pension complète en safari",
      "Assistance 24/7",
      "Assurance évacuation médicale"
    ]
  },
  {
    id: "rome-colosseum",
    title: "Rome Historique & Saveurs d'Italie",
    price: "à partir de 690 €",
    duration: "5 Jours / 4 Nuits",
    category: "Europe",
    image: asset("intl-rome-colosseum.webp"),
    description: "Parcourez la Ville Éternelle, du Colisée à la Basilique Saint-Pierre, et savourez la légendaire gastronomie italienne à travers nos cours de cuisine privés.",
    details: [
      "Boutique-hôtel de charme au centre-ville",
      "Billets coupe-file pour le Vatican et Colisée",
      "Cours privé de fabrication de pâtes & pizza",
      "Guide historique francophone",
      "Transferts aéroport privés"
    ],
    inclusions: [
      "Billet d'avion A/R",
      "Hôtel + petit-déjeuner",
      "Activités et entrées",
      "Carte de transports locaux"
    ]
  },
  {
    id: "istanbul-bosphorus",
    title: "Magie d'Istanbul & Vol en Cappadoce",
    price: "à partir de 950 €",
    duration: "7 Jours / 6 Nuits",
    category: "Europe",
    image: asset("intl-istanbul-bosphorus.webp"),
    description: "Explorez la métropole à cheval sur deux continents. Naviguez sur le Bosphore et envolez-vous en montgolfière au-dessus des cheminées de fées en Cappadoce.",
    details: [
      "Vols intérieurs Istanbul-Cappadoce inclus",
      "Hôtel troglodytique de luxe (Cappadoce)",
      "Croisière privée sur le Bosphore au coucher du soleil",
      "Visite guidée de la Mosquée Bleue & Sainte-Sophie",
      "Vol en montgolfière au lever du soleil"
    ],
    inclusions: [
      "Tous les vols (internationaux & internes)",
      "Hôtels 4* / 5*",
      "Petit-déjeuner inclus",
      "Guide professionnel francophone"
    ]
  }
];
