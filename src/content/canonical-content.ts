import { destinations as tourismDestinations } from "@/data/destinations";
import { contactFaqs, homeFaqs, omraFaqs, studyFaqs, tourismFaqs } from "@/data/faqs";
import { proofLogos, studyDestinations, homeStats } from "@/data/home";
import { internationalPackages } from "@/data/internationalPackages";
import { localPackages } from "@/data/localPackages";
import { navItems } from "@/data/navigation";
import { omraPackages } from "@/data/omraPackages";
import { services, serviceJourney } from "@/data/services";
import { siteConfig } from "@/data/site";
import { stats } from "@/data/stats";
import { studyCountries } from "@/data/studyCountries";
import { testimonials } from "@/data/testimonials";
import { universities } from "@/data/universities";

export const contentKeys = {
  siteConfig: "site.config",
  navigation: "navigation.items",
  services: "services.items",
  serviceJourney: "services.journey",
  proofLogos: "home.proofLogos",
  studyDestinations: "home.studyDestinations",
  homeStats: "home.stats",
  agencyStats: "agency.stats",
  testimonials: "home.testimonials",
  faqs: "faqs.groups",
  tourismDestinations: "tourism.destinations",
  localPackages: "packages.local",
  internationalPackages: "packages.international",
  omraPackages: "packages.omra",
  studyCountries: "study.countries",
  universities: "study.universities"
} as const;

export type ContentKey = (typeof contentKeys)[keyof typeof contentKeys];

export const canonicalContent = {
  [contentKeys.siteConfig]: siteConfig,
  [contentKeys.navigation]: navItems,
  [contentKeys.services]: services,
  [contentKeys.serviceJourney]: serviceJourney,
  [contentKeys.proofLogos]: proofLogos,
  [contentKeys.studyDestinations]: studyDestinations,
  [contentKeys.homeStats]: homeStats,
  [contentKeys.agencyStats]: stats,
  [contentKeys.testimonials]: testimonials,
  [contentKeys.faqs]: {
    home: homeFaqs,
    study: studyFaqs,
    tourism: tourismFaqs,
    omra: omraFaqs,
    contact: contactFaqs
  },
  [contentKeys.tourismDestinations]: tourismDestinations,
  [contentKeys.localPackages]: localPackages,
  [contentKeys.internationalPackages]: internationalPackages,
  [contentKeys.omraPackages]: omraPackages,
  [contentKeys.studyCountries]: studyCountries,
  [contentKeys.universities]: universities
} as const;

export type CanonicalContent = typeof canonicalContent;

export const canonicalEntries = Object.entries(canonicalContent).map(([key, data]) => ({
  key,
  type: key.split(".")[0] ?? "content",
  title: key,
  data
}));

export function getStaticContent<K extends keyof CanonicalContent>(key: K): CanonicalContent[K] {
  return canonicalContent[key];
}
