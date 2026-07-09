"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Logo } from "@/components/Logo";
import { siteConfig } from "@/data/site";

export function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/portal") || pathname?.startsWith("/program-finder")) {
    return null;
  }
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer border-t border-neutral-100 bg-white">
      <div className="container footer-grid">
        {/* Brand Column */}
        <div className="footer-brand footer-brand-hover">
          <Logo />
          <p className="mt-4 text-neutral-600">
            {"Nos étudiants et parents apprécient notre connaissance approfondie des systèmes éducatifs et d'immigration mondiaux."}
          </p>
          <div className="socials flex gap-3 mt-4">
            <Link
              href={siteConfig.contact.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-primary hover:scale-110 transition-transform"
            >
              <Facebook size={18} />
            </Link>
            <Link
              href={siteConfig.contact.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-primary hover:scale-110 transition-transform"
            >
              <Instagram size={18} />
            </Link>
            <Link
              href={siteConfig.contact.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-primary hover:scale-110 transition-transform"
            >
              <Linkedin size={18} />
            </Link>
            <Link
              href={siteConfig.contact.social.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="text-primary hover:scale-110 transition-transform"
            >
              <Twitter size={18} />
            </Link>
          </div>
        </div>

        {/* Company Column */}
        <div className="footer-col-hover">
          <h3 className="text-sm font-bold text-neutral-900 mb-4 uppercase tracking-wider">Entreprise</h3>
          <div className="flex flex-col gap-2">
            <Link href="/about" className="hover:text-primary transition-colors">
              À Propos
            </Link>
            <Link href="/services" className="hover:text-primary transition-colors">
              Services
            </Link>
            <Link href="/contact" className="hover:text-primary transition-colors">
              Contact
            </Link>
          </div>
        </div>

        {/* Content Column */}
        <div className="footer-col-hover">
          <h3 className="text-sm font-bold text-neutral-900 mb-4 uppercase tracking-wider">Contenu</h3>
          <div className="flex flex-col gap-2">
            <Link href="/universities" className="hover:text-primary transition-colors">
              Universités
            </Link>
            <Link href="/services/tourism/local" className="hover:text-primary transition-colors">
              Tourisme Local
            </Link>
            <Link href="/services/tourism/international" className="hover:text-primary transition-colors">
              Tourisme International
            </Link>
            <Link href="/services/omra" className="hover:text-primary transition-colors">
              Omra
            </Link>
          </div>
        </div>

        {/* Contact Column */}
        <div className="footer-col-hover">
          <h3 className="text-sm font-bold text-neutral-900 mb-4 uppercase tracking-wider">Nous Contacter</h3>
          <div className="flex flex-col gap-3 text-neutral-600">
            <p className="contact-line flex items-center gap-2">
              <Phone size={14} className="text-primary" />
              <span>{siteConfig.contact.phone}</span>
            </p>
            <p className="contact-line flex items-center gap-2">
              <Mail size={14} className="text-primary" />
              <span>{siteConfig.contact.email}</span>
            </p>
            <p className="contact-line flex items-center gap-2">
              <MapPin size={14} className="text-primary" />
              <span>{siteConfig.contact.address}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="container mt-12 pt-6 border-t border-neutral-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-400">
        <p>© {currentYear} Land Travel. Tous droits réservés.</p>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-primary transition-colors">
            Politique de confidentialité
          </Link>
          <Link href="/terms" className="hover:text-primary transition-colors">
            Conditions d&apos;utilisation
          </Link>
        </div>
      </div>
    </footer>
  );
}
