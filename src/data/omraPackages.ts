import { OmraPackage } from "@/types";
import { asset } from "@/lib/assets";

export const omraPackages: OmraPackage[] = [
  {
    id: "confort",
    name: "Formule Omra Confort",
    priceRange: "1 290 € - 1 590 € / 180 000 DA - 220 000 DA",
    duration: "14 Jours (7 Makkah / 7 Madinah)",
    hotelMakkah: "Luluat Al-Bait 4* (ou similaire) - 900m avec navette H24",
    hotelMadinah: "Al-Eiman Nour 4* (ou similaire) - 250m de la mosquée",
    image: asset("collage-omra.jpg"),
    features: [
      "Billet d'avion A/R (compagnie régulière)",
      "Obtention du visa Omra inclus",
      "Navette bus gratuite de l'hôtel vers le Haram 24h/24",
      "Transferts internes en bus de tourisme climatisé",
      "Accompagnateur religieux francophone durant le voyage",
      "Visites guidées historiques (Ziyarat) à Makkah & Madinah"
    ]
  },
  {
    id: "prestige",
    name: "Formule Omra Prestige VIP",
    priceRange: "2 190 € - 2 690 € / 300 000 DA - 370 000 DA",
    duration: "14 Jours (7 Makkah / 7 Madinah)",
    hotelMakkah: "Swissôtel Al Maqam 5* (ou similaire) - Direct sur la cour du Haram",
    hotelMadinah: "Pullman Zamzam Madina 5* (ou similaire) - Face à la cour du Haram",
    image: asset("hotel near Kaaba.webp"),
    features: [
      "Billet d'avion A/R (Vol direct sur vol régulier)",
      "Visa Omra express avec assurance médicale complète",
      "Hôtels 5 étoiles situés à quelques mètres du Haram",
      "Petit-déjeuner buffet international haut de gamme inclus",
      "Transferts VIP privatifs en voiture de luxe (GMC)",
      "Accompagnement personnalisé H24 & Ziyarat privatives"
    ]
  },
  {
    id: "sur-mesure",
    name: "Formule Omra Sur Mesure / Famille",
    priceRange: "Sur devis personnalisé",
    duration: "À la carte (selon vos préférences)",
    hotelMakkah: "Hôtels de votre choix (3*, 4* ou 5*)",
    hotelMadinah: "Hôtels de votre choix (3*, 4* ou 5*)",
    image: asset("Kaaba pilgrims umrah.webp"),
    features: [
      "Choix libre de la date de départ et de retour",
      "Combinaison personnalisée vols et nuits d'hôtels",
      "Chambres familiales communicantes ou suites spacieuses",
      "Hébergements adaptés pour personnes âgées ou enfants",
      "Possibilité de prolonger le séjour (ex. Dubaï ou Istanbul)",
      "Flexibilité totale sur les excursions de visites religieuses"
    ]
  }
];
