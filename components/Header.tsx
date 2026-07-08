"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItems } from "@/lib/site-data";
import { Logo } from "@/components/Logo";

const menuTransition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001
} as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.classList.remove("nav-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      setScrolled(currentScrollY > 12);
      setHidden(!open && currentScrollY > 120 && delta > 8);

      if (Math.abs(delta) > 4) {
        lastScrollY.current = currentScrollY;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className={`site-header${scrolled ? " header-scrolled" : ""}${hidden ? " header-hidden" : ""}${open ? " header-open" : ""}`}>
      <div className="container header-inner">
        <Link href="/" className="brand-link" aria-label="Land Travel accueil">
          <Logo />
        </Link>

        <nav className="desktop-nav" aria-label="Navigation principale">
          <div className="desktop-menu-pill" onMouseLeave={() => setActiveMenu(null)}>
          {navItems.map((item) => (
            <div
              className="nav-item-wrapper"
              key={item.label}
              onMouseEnter={() => setActiveMenu(item.label)}
              onFocus={() => setActiveMenu(item.label)}
            >
              <motion.div
                transition={{ duration: 0.3 }}
                className={`nav-item-shell${isActive(item.href) ? " nav-item-active" : ""}`}
              >
                <Link
                  href={item.href}
                  className="nav-item"
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </motion.div>
              {activeMenu === item.label && item.children && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={menuTransition}
                  className="nav-dropdown-positioner"
                >
                  <motion.div
                    layoutId="active"
                    transition={menuTransition}
                    className="nav-dropdown"
                  >
                    <motion.div layout className="nav-dropdown-inner">
                      {item.children.map((child) => (
                        <Link key={child.href} href={child.href} className="nav-dropdown-link">
                          <Image
                            src={child.href.includes("local") ? "/assets/local-coastal-resort.webp" : "/assets/intl-maldives-resort.webp"}
                            alt=""
                            width={140}
                            height={70}
                            className="nav-dropdown-image"
                          />
                          <span>
                            <strong>{child.label}</strong>
                            <small>{child.href.includes("local") ? "Séjours en Algérie" : "Voyages monde"}</small>
                          </span>
                        </Link>
                      ))}
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </div>
          ))}
          </div>
        </nav>

        <div className="desktop-actions">
          <Link className="login-link" href="/login">
            Connexion
          </Link>
          <Link className="button button-small" href="/signup">
            {"S'inscrire"}
          </Link>
        </div>

        <button
          className="menu-button"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={toggleMenu}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="mobile-menu" id="mobile-menu">
          {navItems.map((item) => (
            <div className="mobile-nav-group" key={item.label}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className={isActive(item.href) ? "mobile-nav-active" : undefined}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
              {item.children?.map((child) => (
                <Link key={child.href} href={child.href} onClick={() => setOpen(false)}>
                  {child.label}
                </Link>
              ))}
            </div>
          ))}
          <Link href="/login" onClick={() => setOpen(false)}>
            Connexion
          </Link>
          <Link className="button" href="/signup" onClick={() => setOpen(false)}>
            {"S'inscrire"}
          </Link>
        </div>
      )}
    </header>
  );
}
