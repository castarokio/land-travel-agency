import DestinationDetailPageClient from "@/components/tourism/DestinationDetailPageClient";
import { getTourismDestinations } from "@/lib/content/public-content";

export async function generateStaticParams() {
  const tourismDestinations = await getTourismDestinations();
  return tourismDestinations.map((destination) => ({ id: destination.id }));
}

export default async function ServicesDestinationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const tourismDestinations = await getTourismDestinations();
  return <DestinationDetailPageClient params={params} destinations={tourismDestinations} />;
}
