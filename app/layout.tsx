import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RouteBreadcrumb } from "@/components/layout/RouteBreadcrumb";
import { SiteInteractions } from "@/components/layout/SiteInteractions";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import "./globals.css";
import "./styles/travel-pages.css";
import "./styles/tourism-destinations.css";
import "./styles/destination-detail.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

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
    <html lang="fr" className={plusJakartaSans.variable}>
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
