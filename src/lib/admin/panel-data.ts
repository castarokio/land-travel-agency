import {
  BarChart3,
  Bell,
  BookOpen,
  BriefcaseBusiness,
  FileText,
  Globe2,
  ImageIcon,
  LayoutDashboard,
  Mail,
  Map,
  Plane,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";
import { canonicalEntries } from "@/content/canonical-content";
import { tourismDestinations } from "@/lib/site-data";
import { services } from "@/data/services";
import { universities } from "@/data/universities";

export const adminNavItems = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Content", href: "/admin/content", icon: FileText },
  { label: "Leads", href: "/admin/leads", icon: Mail },
  { label: "Portal users", href: "/admin/portal", icon: Users },
  { label: "Media", href: "/admin/media", icon: ImageIcon },
  { label: "Settings", href: "/admin/settings", icon: Settings },
] as const;

export const adminStats = [
  {
    label: "Content collections",
    value: canonicalEntries.length,
    detail: "Homepage, services, study, tourism, Omra",
    icon: BookOpen,
  },
  {
    label: "Travel destinations",
    value: tourismDestinations.length,
    detail: "International destination pages",
    icon: Map,
  },
  {
    label: "Universities",
    value: universities.length,
    detail: "Study abroad catalog entries",
    icon: Globe2,
  },
  {
    label: "Service lines",
    value: services.length,
    detail: "Study, tourism, Omra workflows",
    icon: BriefcaseBusiness,
  },
] as const;

export const adminLeads = [
  {
    id: "LT-1048",
    name: "Sofia Benali",
    contact: "+213 555 72 91 10",
    email: "sofia.benali@example.com",
    service: "Tourism",
    request: "Maldives honeymoon package",
    source: "Destination page",
    status: "New",
    owner: "Unassigned",
    created: "Today, 10:42",
  },
  {
    id: "LT-1047",
    name: "Karim Ait",
    contact: "+213 661 44 08 22",
    email: "karim.ait@example.com",
    service: "Study abroad",
    request: "Canada master admission",
    source: "Program finder",
    status: "Contacted",
    owner: "Sarah",
    created: "Yesterday, 17:05",
  },
  {
    id: "LT-1046",
    name: "Meriem Haddad",
    contact: "+213 770 13 64 55",
    email: "meriem.haddad@example.com",
    service: "Omra",
    request: "Family Omra package",
    source: "WhatsApp CTA",
    status: "Qualified",
    owner: "Walid",
    created: "Jul 10, 2026",
  },
] as const;

export const adminPortalProfiles = [
  {
    id: "USR-4289",
    name: "Alexandre Laroche",
    email: "alexandre@example.com",
    service: "Study abroad",
    status: "Active",
    progress: "60%",
    nextAction: "Upload financial proof",
  },
  {
    id: "USR-4290",
    name: "Sofia Benali",
    email: "sofia.benali@example.com",
    service: "Tourism",
    status: "New",
    progress: "15%",
    nextAction: "Confirm trip dates",
  },
  {
    id: "USR-4291",
    name: "Meriem Haddad",
    email: "meriem.haddad@example.com",
    service: "Omra",
    status: "Waiting",
    progress: "35%",
    nextAction: "Passport scan required",
  },
] as const;

export const adminMediaAssets = [
  {
    name: "intl-maldives-resort.webp",
    kind: "Destination hero",
    category: "Tourism",
    path: "/assets/intl-maldives-resort.webp",
    status: "Published",
  },
  {
    name: "hero-study-consultation.webp",
    kind: "Homepage visual",
    category: "Study abroad",
    path: "/assets/hero-study-consultation.webp",
    status: "Published",
  },
  {
    name: "omra-masjid-nabawi.webp",
    kind: "Package visual",
    category: "Omra",
    path: "/assets/omra-masjid-nabawi.webp",
    status: "Published",
  },
] as const;

export const adminSettings = [
  {
    label: "Admin authentication",
    value: "Username/password",
    detail: "HTTP-only 8 hour session cookie",
    icon: ShieldCheck,
  },
  {
    label: "Lead notifications",
    value: "Manual review",
    detail: "Connect email/WhatsApp dispatch in next backend phase",
    icon: Bell,
  },
  {
    label: "Publishing",
    value: "Static content",
    detail: "Database models are ready for persisted CRUD",
    icon: Plane,
  },
  {
    label: "Analytics",
    value: "Not connected",
    detail: "Add Vercel Analytics or another source for live metrics",
    icon: BarChart3,
  },
] as const;

