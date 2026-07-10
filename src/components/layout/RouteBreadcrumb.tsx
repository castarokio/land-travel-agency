"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

const hiddenPrefixes = ["/login", "/signup", "/portal", "/program-finder"];

const labelMap: Record<string, string> = {
  about: "About",
  contact: "Contact",
  faq: "FAQ",
  offers: "Offers",
  omra: "Omra",
  privacy: "Privacy",
  services: "Services",
  "study-abroad": "Study Abroad",
  terms: "Terms",
  tourism: "Tourism",
  universities: "Universities",
  destination: "Destination",
  destinations: "Destinations",
  international: "International",
  local: "Local",
};

function formatSegment(segment: string) {
  return (
    labelMap[segment] ??
    decodeURIComponent(segment)
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase())
  );
}

export function RouteBreadcrumb() {
  const pathname = usePathname();

  if (!pathname || pathname === "/" || hiddenPrefixes.some((prefix) => pathname.startsWith(prefix))) {
    return null;
  }

  const segments = pathname.split("/").filter(Boolean);

  return (
    <div className="route-breadcrumb-shell" aria-label="Current page path">
      <nav className="route-breadcrumb" aria-label="Breadcrumb">
        <Link href="/" className="route-breadcrumb-home" aria-label="Home">
          <Home size={18} aria-hidden="true" />
        </Link>
        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          const isLast = index === segments.length - 1;
          const label = formatSegment(segment);

          return (
            <span className="route-breadcrumb-item" key={href}>
              <ChevronRight size={16} aria-hidden="true" />
              {isLast ? (
                <span aria-current="page">{label}</span>
              ) : (
                <Link href={href}>{label}</Link>
              )}
            </span>
          );
        })}
      </nav>
    </div>
  );
}
