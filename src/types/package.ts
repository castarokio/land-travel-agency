export type Package = {
  id: string;
  title: string;
  destination: string;
  duration: string;
  type: string;
  features: string[];
  priceFrom: number;
  image: string;
  featured?: boolean;
};
