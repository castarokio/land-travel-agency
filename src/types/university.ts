export type University = {
  name: string;
  country: string;
  city: string;
  programs: string[];
  language: string;
  tuition: string;
  status: "open" | "closed" | string;
  image?: string;
};
