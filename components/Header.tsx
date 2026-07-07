"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { navItems } from "@/lib/site-data";
import { Logo } from "@/components/Logo";

export function Header() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand-link">
          <Logo />
        </Link>

        <nav className="desktop-nav">
          {navItems.map((item) => (
            <div className="nav-item-wrapper" key={item.label}>
              <Link href={item.href} className="nav-item">
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
          onClick={toggleMenu}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="mobile-menu">
          {navItems.map((item) => (
            <div className="mobile-nav-group" key={item.label}>
              <Link href={item.href} onClick={() => setOpen(false)}>
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

