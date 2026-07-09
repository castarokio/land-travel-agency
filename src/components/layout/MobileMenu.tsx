"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import { Logo } from "@/components/Logo";
import styles from "./MobileMenu.module.css";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const mobileLinks = [
  { label: "Accueil", href: "/" },
  { label: "Étudier à l'étranger", href: "/services/study-abroad" },
  { label: "Langues", href: "/services" },
  { label: "Cours", href: "/universities" },
  { label: "Événements", href: "/contact" },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className={styles.backdrop}
          />

          <motion.div
            initial={{ y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -24, opacity: 0 }}
            transition={{ type: "spring", damping: 24, stiffness: 180 }}
            className={styles.shell}
          >
            <div className={styles.topbar}>
              <Link href="/" onClick={onClose} className={styles.brand}>
                <Logo compact />
                <span>Land Travel</span>
              </Link>
              <button
                onClick={onClose}
                className={styles.closeButton}
                aria-label="Fermer le menu"
              >
                <X size={30} strokeWidth={2.4} />
              </button>
            </div>

            <nav className={styles.card}>
              {mobileLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`${styles.navLink} ${
                    isActive(item.href)
                      ? styles.navLinkActive
                      : ""
                  }`}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ))}

              <Link
                href="/signup"
                onClick={onClose}
                className={styles.applyButton}
              >
                Postuler
              </Link>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
