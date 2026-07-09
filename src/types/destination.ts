export type Destination = {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  reviewsCount: number;
  duration: string;
  priceFrom: number;
  featured: boolean;
  bestTimeToVisit?: string;
  topPlaces?: string[];
  suggestedItinerary?: { day: number; title: string; description: string }[];
  includedServices?: string[];
};
