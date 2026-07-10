"use client";

import { usePathname } from "next/navigation";
import { ClosingSection } from "./ClosingSection";

export function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/portal") || pathname?.startsWith("/program-finder")) {
    return null;
  }

  return <ClosingSection />;
}
