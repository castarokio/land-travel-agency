import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RouteBreadcrumb } from "@/components/layout/RouteBreadcrumb";
import { SiteInteractions } from "@/components/layout/SiteInteractions";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import "./globals.css";
import "./styles/travel-pages.css";
import "./styles/tourism-destinations.css";
import "./styles/destination-detail.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Land Travel | Études, tourisme et Omra",
  description: "Cabinet de conseil en éducation internationale, tourisme local/international et voyages Omra.",
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/assets/landtravel-logo.png", type: "image/png" },
    ],
    apple: [{ url: "/assets/landtravel-logo.png", type: "image/png" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={cn("font-sans", geist.variable)}>
      <body className="font-sans antialiased">
        <ScrollToTop />
        <Header />
        <RouteBreadcrumb />
        <main>{children}</main>
        <Footer />
        <SiteInteractions />
      </body>
    </html>
  );
}
