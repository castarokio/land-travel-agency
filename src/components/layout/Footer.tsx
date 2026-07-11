"use client";

import { usePathname } from "next/navigation";
import { ClosingSection } from "./ClosingSection";

export function Footer() {
  const pathname = usePathname();

  if (
    pathname?.startsWith("/portal") ||
    pathname?.startsWith("/program-finder") ||
    pathname?.startsWith("/tourism/destination") ||
    pathname?.startsWith("/services/tourism/destinations") ||
    pathname?.startsWith("/login") ||
    pathname?.startsWith("/signup")
  ) {
    return null;
  }

  return <ClosingSection />;
}
