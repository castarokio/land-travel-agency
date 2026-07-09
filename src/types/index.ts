export interface NavItem {
  label: string;
  href: string;
  children?: {
    label: string;
    href: string;
  }[];
}

export interface Service {
  title: string;
  description: string;
  detail: string;
  cta: string;
  icon: string; // Lucide icon name
  color: string;
  href: string;
}

export interface ServiceJourneyStep {
  id: string;
  title: string;
  shortTitle: string;
  description?: string;
  detail: string;
  image: string;
  href: string;
  cta: string;
}

export interface StudyCountry {
  id: string;
  name: string;
  image: string;
  description: string;
  popularPrograms: string[];
  averageTuition: string;
  language: string;
  visaSuccessRate?: string;
  requirements?: string[];
  availableMajors?: {
    name: string;
    minBac: string;
    note: string;
  }[];
}

export interface Destination {
  id: string;
  name: string;
  tagline: string;
  shortDesc: string;
  image: string;
  heroImage: string;
  intro: string;
  places: {
    name: string;
    image: string;
    description: string;
  }[];
  stats: {
    value: string;
    label: string;
  }[];
  hotels: {
    name: string;
    type: string;
    desc: string;
  }[];
  reviews: {
    author: string;
    rating: number;
    text: string;
    date: string;
  }[];
  collage: string[];
  itinerary: {
    title: string;
    subtitle: string;
    desc: string;
    image: string;
  }[];
  highlights: {
    title: string;
    desc: string;
  }[];
  whatsIncluded: {
    title: string;
    desc: string;
  }[];
  price: string;
  duration: string;
  placesCount: string;
  rating: string;
  location: string;
}

export interface University {
  id: string;
  name: string;
  country: string;
  city: string;
  programs: string[];
  language: string;
  tuition: string;
  status: string; // e.g. "Featured" | "Popular" | "Recommended"
  logo?: string;
  image?: string;
  ranking?: string;
}

export interface Package {
  id: string;
  title: string;
  price: string;
  duration: string;
  category: string; // e.g. "Local" | "Europe" | "Asia" | "Tropical" | "Adventure"
  image: string;
  description: string;
  details: string[];
  inclusions?: string[];
}

export interface OmraPackage {
  id: string;
  name: string;
  priceRange: string;
  duration: string;
  hotelMakkah: string;
  hotelMadinah: string;
  image: string;
  features: string[];
}

export interface Testimonial {
  name: string;
  place: string;
  avatar: string;
  quote: string;
  rating?: number;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Stat {
  value: string;
  label: string;
}
