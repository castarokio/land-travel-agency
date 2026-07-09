import { routes } from "@/constants/routes";
import { NavItem } from "@/types";

export const navItems: NavItem[] = [
  { label: "Home", href: routes.home },
  { label: "Study Abroad", href: routes.studyAbroad },
  {
    label: "Tourism",
    href: routes.tourism,
    children: [
      { label: "Local", href: routes.localTourism },
      { label: "International", href: routes.internationalTourism }
    ]
  },
  { label: "Omra", href: routes.omra },
  { label: "Universities", href: routes.universities },
  { label: "About", href: routes.about },
  { label: "Contact", href: routes.contact }
];
