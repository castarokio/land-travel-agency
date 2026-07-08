import DestinationDetailPageClient from "@/components/tourism/DestinationDetailPageClient";
import { tourismDestinations } from "@/lib/site-data";

export function generateStaticParams() {
  return tourismDestinations.map((destination) => ({ id: destination.id }));
}

export default function ServicesDestinationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return <DestinationDetailPageClient params={params} />;
}
