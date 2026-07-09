import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/Logo";
import { siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand footer-brand-hover">
          <Logo />
          <p>{"Nos étudiants et parents apprécient notre connaissance approfondie des systèmes éducatifs et d'immigration mondiaux."}</p>
        </div>
        <div className="footer-col-hover">
          <h3>Entreprise</h3>
          <Link href="/about">À Propos</Link>
          <Link href="/services">Services</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className="footer-col-hover">
          <h3>Contenu</h3>
          <Link href="/universities">Universités</Link>
          <Link href="/services/tourism/local">Tourisme Local</Link>
          <Link href="/services/tourism/international">Tourisme International</Link>
        </div>
        <div className="footer-col-hover">
          <h3>Nous Contacter</h3>
          <p className="contact-line"><Phone size={14} /> {siteConfig.contact.phone}</p>
          <p className="contact-line"><Mail size={14} /> {siteConfig.contact.email}</p>
          <p className="contact-line"><MapPin size={14} /> {siteConfig.contact.address}</p>
        </div>
      </div>
    </footer>
  );
}
