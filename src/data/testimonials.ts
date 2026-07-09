import { Testimonial } from "@/types";
import { asset } from "@/lib/assets";

export const testimonials: Testimonial[] = [
  {
    name: "Aleya Kaif",
    place: "Université d'Aarhus, Danemark",
    avatar: asset("testimonial-student-01.webptestimonial-student-01.webp"),
    quote:
      "Mon expérience a été incroyable car j'ai obtenu mon visa en seulement 9 jours. Le personnel était très coopératif, le conseiller était bienveillant et l'équipe m'a beaucoup aidée à gérer mes documents et mes démarches de visa.",
    rating: 5
  },
  {
    name: "Rayan Mitchell",
    place: "Université McGill, Canada",
    avatar: asset("testimonial-student-02.webp"),
    quote:
      "Le processus est devenu clair dès le premier rendez-vous. Je savais quels documents comptaient, quelles universités me correspondaient et quand chaque candidature devait être soumise.",
    rating: 5
  },
  {
    name: "Sara Hoffmann",
    place: "Université de Heidelberg, Allemagne",
    avatar: asset("hero-graduate-student.webp"),
    quote:
      "Land Travel m'a donné une feuille de route pratique pour l'admission, la préparation du compte bloqué et le rendez-vous pour le visa. Cela m'a évité des semaines de confusion.",
    rating: 5
  },
  {
    name: "Maya Collins",
    place: "UNSW Sydney, Australie",
    avatar: asset("testimonial-student-01.webptestimonial-student-01.webp"),
    quote:
      "L'équipe a comparé les programmes de manière honnête et m'a aidée à choisir la meilleure option plutôt que la plus évidente. Chaque e-mail et chaque date limite ont été suivis de près.",
    rating: 5
  },
  {
    name: "Adam Pierce",
    place: "Imperial College London, Royaume-Uni",
    avatar: asset("testimonial-student-02.webp"),
    quote:
      "L'évaluation de mon profil a été détaillée et pratique. J'ai compris quels accomplissements mettre en valeur et comment améliorer ma candidature avant de la soumettre.",
    rating: 5
  }
];
