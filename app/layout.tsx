import type { Metadata } from "next";
import { Coiny } from "next/font/google";
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

const heroCoiny = Coiny({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-hero-coiny",
  display: "swap"
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className={heroCoiny.variable}>
        <Header />
        <main>{children}</main>
        <Footer />
        <SiteInteractions />
      </body>
    </html>
  );
}
