import { Metadata } from "next";
import OmraPageClient from "@/components/omra/OmraPageClient";

export const metadata: Metadata = {
  title: "Formules Omra 2026 | Land Travel Agency",
  description: "Vivez le voyage de votre vie avec sérénité spirituelle. Découvrez nos formules d'Omra complètes, encadrées et sur-mesure avec assistance personnalisée.",
};

export default function ServicesOmraPage() {
  return <OmraPageClient />;
}
