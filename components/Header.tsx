"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { navItems } from "@/lib/site-data";
import { Logo } from "@/components/Logo";

export function Header() {
  const [open, setOpen] = useState(false);
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
          {navItems.map((item) => (
            <div className="nav-item-wrapper" key={item.label}>
              <Link
                href={item.href}
                className={`nav-item${isActive(item.href) ? " nav-item-active" : ""}`}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
                {item.children && <ChevronDown size={14} />}
              </Link>
              {item.children && (
                <div className="nav-dropdown">
                  {item.children.map((child) => (
                    <Link key={child.href} href={child.href}>
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
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
