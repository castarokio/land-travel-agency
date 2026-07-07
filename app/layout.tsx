import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SiteInteractions } from "@/components/SiteInteractions";
import "./globals.css";
import "./styles/travel-pages.css";
import "./styles/tourism-destinations.css";
import "./styles/destination-detail.css";

export const metadata: Metadata = {
  title: "Land Travel | Études, tourisme et Omra",
  description: "Cabinet de conseil en éducation internationale, tourisme local/international et voyages Omra."
};

const travelFutura = localFont({
  src: "../public/fonts/FuturaBold.ttf",
  variable: "--font-travel-futura",
  display: "swap",
  weight: "700"
});

const travelBodoni = localFont({
  src: "../public/fonts/BodoniItalic.ttf",
  variable: "--font-travel-bodoni",
  display: "swap",
  style: "italic",
  weight: "400"
});

const travelArgent = localFont({
  src: "../public/fonts/Argent-Regular.woff",
  variable: "--font-travel-argent",
  display: "swap",
  weight: "400"
});

const travelBernSans = localFont({
  src: "../public/fonts/BernSansCT-Regular.otf",
  variable: "--font-travel-bern",
  display: "swap",
  weight: "400"
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className={`${travelFutura.variable} ${travelBodoni.variable} ${travelArgent.variable} ${travelBernSans.variable}`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <SiteInteractions />
      </body>
    </html>
  );
}
