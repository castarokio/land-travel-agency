"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RouteBreadcrumb } from "@/components/layout/RouteBreadcrumb";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { SiteInteractions } from "@/components/layout/SiteInteractions";

export function ConditionalLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboardOrAdmin = pathname.startsWith("/admin") || pathname.startsWith("/portal") || pathname.startsWith("/login") || pathname.startsWith("/signup");

  if (isDashboardOrAdmin) {
    return (
      <div className="min-h-screen bg-[#F4F5F6]">
        {children}
        <SiteInteractions />
      </div>
    );
  }

  return (
    <>
      <ScrollToTop />
      <Header />
      <RouteBreadcrumb />
      <main>{children}</main>
      <Footer />
      <SiteInteractions />
    </>
  );
}
