import { University } from "@/types";
import { asset } from "@/lib/assets";

export const universities: University[] = [
  {
    id: "oxford",
    name: "Université d'Oxford",
    country: "Royaume-Uni",
    city: "Oxford",
    programs: ["Humanités", "Médecine", "Droit & Sciences Politiques"],
    language: "Anglais",
    tuition: "À partir de 28 000 £ / an",
    status: "Featured",
    logo: asset("oxford.png"),
    image: asset("destination-united-kingdom.webp"),
    ranking: "QS World Rank #3"
  },
  {
    id: "harvard",
    name: "Université de Harvard",
    country: "États-Unis",
    city: "Cambridge, MA",
    programs: ["MBA / Business", "Droit", "Génie Logiciel & Data Science"],
    language: "Anglais",
    tuition: "À partir de 52 000 $ / an",
    status: "Popular",
    logo: asset("harvard-logo.png"),
    image: asset("why-choose-student-illustration.png"),
    ranking: "QS World Rank #4"
  },
  {
    id: "toronto",
    name: "Université de Toronto",
    country: "Canada",
    city: "Toronto",
    programs: ["Intelligence Artificielle", "Finance", "Génie Civil"],
    language: "Anglais",
    tuition: "À partir de 38 000 $CAD / an",
    status: "Recommended",
    logo: asset("toronto.png"),
    image: asset("Canada university campus.webp"),
    ranking: "QS World Rank #21"
  },
  {
    id: "mcgill",
    name: "Université McGill",
    country: "Canada",
    city: "Montréal",
    programs: ["Médecine & Neurosciences", "Génie Électrique", "Architecture"],
    language: "Anglais & Français",
    tuition: "À partir de 26 000 $CAD / an",
    status: "Popular",
    logo: asset("mcguill.png"),
    image: asset("airport.webp"),
    ranking: "QS World Rank #30"
  },
  {
    id: "heidelberg",
    name: "Université de Heidelberg",
    country: "Allemagne",
    city: "Heidelberg",
    programs: ["Physique & Astronomie", "Sciences de la Vie", "Philosophie"],
    language: "Allemand & Anglais",
    tuition: "Exonéré (Frais d'inscription ~150€/semestre)",
    status: "Featured",
    logo: asset("Heidelberg.png"),
    image: asset("destination-germany.webp"),
    ranking: "QS World Rank #87"
  },
  {
    id: "imperial",
    name: "Imperial College London",
    country: "Royaume-Uni",
    city: "Londres",
    programs: ["Génie Aérospatial", "Biomédecine", "Énergies Renouvelables"],
    language: "Anglais",
    tuition: "À partir de 31 000 £ / an",
    status: "Recommended",
    logo: asset("imperial.png"),
    image: asset("destination-united-kingdom.webp"),
    ranking: "QS World Rank #6"
  },
  {
    id: "cambridge",
    name: "Université de Cambridge",
    country: "Royaume-Uni",
    city: "Cambridge",
    programs: ["Mathématiques Pures", "Littérature Anglaise", "Génie Chimique"],
    language: "Anglais",
    tuition: "À partir de 30 000 £ / an",
    status: "Featured",
    logo: asset("combridge.png"),
    image: asset("destination-united-kingdom.webp"),
    ranking: "QS World Rank #2"
  },
  {
    id: "unsw",
    name: "UNSW Sydney",
    country: "Australie",
    city: "Sydney",
    programs: ["Photovoltaïque & Solaire", "Finance Quantitative", "Mining Engineering"],
    language: "Anglais",
    tuition: "À partir de 41 000 $AUD / an",
    status: "New",
    logo: asset("UNSW Sydney.svg"),
    image: asset("destination-australia.webp"),
    ranking: "QS World Rank #19"
  }
];
