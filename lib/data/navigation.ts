import {
  BadgeCheck,
  BookOpenCheck,
  Building2,
  FileCheck2,
  GraduationCap,
  Languages,
  Mail,
  Menu,
  Plane,
  Send,
  ShieldCheck,
  UserRoundCheck
} from "lucide-react";

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Study Abroad", href: "/services/study-abroad" },
  {
    label: "Tourism",
    href: "/services/tourism",
    children: [
      { label: "Local", href: "/services/tourism/local" },
      { label: "International", href: "/services/tourism/international" }
    ]
  },
  { label: "Omra", href: "/services/omra" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" }
];

export const icons = {
  BadgeCheck,
  BookOpenCheck,
  Building2,
  FileCheck2,
  GraduationCap,
  Languages,
  Mail,
  Menu,
  Plane,
  Send,
  ShieldCheck,
  UserRoundCheck
};
