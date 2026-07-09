"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbProps {
  className?: string;
}

export function Breadcrumb({ className = "" }: BreadcrumbProps) {
  const pathname = usePathname();
  
  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav className={`flex items-center gap-1.5 text-xs md:text-sm font-medium text-muted/80 ${className}`} aria-label="Breadcrumb">
      <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
        <Home className="w-3.5 h-3.5" />
        <span className="sr-only">Home</span>
      </Link>

      {segments.map((segment, index) => {
        const href = `/${segments.slice(0, index + 1).join("/")}`;
        const isLast = index === segments.length - 1;
        
        // Format names nicely (e.g. study-abroad -> Study Abroad)
        const label = segment
          .replace(/-/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase());

        return (
          <div key={href} className="flex items-center gap-1.5">
            <ChevronRight className="w-3 h-3 opacity-60 shrink-0" />
            {isLast ? (
              <span className="text-primary font-semibold truncate max-w-[150px] md:max-w-xs" aria-current="page">
                {label}
              </span>
            ) : (
              <Link href={href} className="hover:text-primary transition-colors truncate max-w-[150px] md:max-w-xs">
                {label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
