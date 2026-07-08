import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { Logo } from "@/components/Logo";

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
          <p className="contact-line"><Phone size={14} /> 07856342788</p>
          <p className="contact-line"><Mail size={14} /> study@gmail.com</p>
          <p>Park Street, Londres</p>
        </div>
      </div>
    </footer>
  );
}
