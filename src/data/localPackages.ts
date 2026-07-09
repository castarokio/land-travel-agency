import { Package } from "@/types";
import { asset } from "@/lib/assets";

export const localPackages: Package[] = [
  {
    id: "desert-sunset",
    title: "Magie du Sahara & Nuit Étoilée à Djanet",
    price: "à partir de 320 € / 45 000 DA",
    duration: "5 Jours / 4 Nuits",
    category: "Local",
    image: asset("local-desert-sunset.webp"),
    description: "Une immersion complète dans le canyon de la Tassili n'Ajjer à Djanet. Randonnée au milieu des aiguilles de pierre, bivouac sous la voûte étoilée et thé traditionnel au coin du feu.",
    details: [
      "Vols domestiques Alger - Djanet inclus",
      "Hébergement en camp nomade de luxe sous tente",
      "Pension complète (cuisine locale saharienne préparée sur place)",
      "Guide saharien touareg francophone dédié",
      "Visite guidée des gravures rupestres mythiques (La vache qui pleure)"
    ],
    inclusions: [
      "Billet d'avion national A/R",
      "Logistique de bivouac & matériel",
      "Tous les repas et boissons",
      "Assistance locale Touareg"
    ]
  },
  {
    id: "casbah-culture",
    title: "Histoire d'Alger la Blanche & Ruines de Tipaza",
    price: "à partir de 130 € / 18 000 DA",
    duration: "3 Jours / 2 Nuits",
    category: "Local",
    image: asset("local-medina-culture.webp"),
    description: "Explorez la Casbah d'Alger, classée à l'UNESCO, ses ruelles chargées d'histoire, puis visitez le tombeau de la Chrétienne et les magnifiques ruines romaines de Tipaza en bord de mer.",
    details: [
      "Visite guidée privée de la Casbah d'Alger",
      "Nuitées dans un hôtel de charme au centre-ville d'Alger",
      "Excursion guidée d'une journée complète aux ruines de Tipaza",
      "Déjeuner traditionnel de poissons frais au port de Tipaza",
      "Transferts aéroport - hôtel privatifs inclus"
    ],
    inclusions: [
      "Hébergement 2 nuits avec petit-déjeuner",
      "Guide conférencier certifié",
      "Transport en berline climatisée",
      "Déjeuners traditionnels"
    ]
  },
  {
    id: "coastal-resort",
    title: "Échappée Côtière & Saveurs d'Oran la Radieuse",
    price: "à partir de 180 € / 25 000 DA",
    duration: "3 Jours / 2 Nuits",
    category: "Local",
    image: asset("local-coastal-resort.webp"),
    description: "Découvrez le fort Santa Cruz surplombant la magnifique baie d'Oran, flânez sur le front de mer et profitez d'instants de détente sur les plages de sable fin des Andalouses.",
    details: [
      "Hôtel 4* en front de mer avec piscine",
      "Visite guidée du fort Santa Cruz et de la chapelle de la Vierge",
      "Découverte du centre historique d'Oran et de la place d'Armes",
      "Dîner gastronomique de fruits de mer inclus",
      "Transferts aéroport d'Oran - hôtel inclus"
    ],
    inclusions: [
      "Hôtel 4* + Petit-déjeuner",
      "Visites guidées et frais d'accès",
      "Transferts aéroport A/R",
      "Dîner de fruits de mer"
    ]
  },
  {
    id: "mountain-hike",
    title: "Trekking au Djurdjura & Villages de Kabylie",
    price: "à partir = 160 € / 22 000 DA",
    duration: "4 Jours / 3 Nuits",
    category: "Local",
    image: asset("local-mountain-hike.webp"),
    description: "Une randonnée vivifiante au cœur du parc national du Djurdjura à Tikjda. Parcourez les forêts de cèdres, découvrez la flore sauvage de Kabylie et séjournez dans un gîte chaleureux.",
    details: [
      "Guide de moyenne montagne professionnel certifié",
      "Hébergement en chalet de montagne chaleureux à Tikjda",
      "Pension complète (repas montagnards traditionnels kabyles)",
      "Randonnées pédestres quotidiennes adaptées au niveau du groupe",
      "Découverte de l'artisanat local de poterie et bijoux traditionnels"
    ],
    inclusions: [
      "Hébergement en chalet typique",
      "Pension complète",
      "Accompagnateur certifié",
      "Assistance 24h/24"
    ]
  }
];
