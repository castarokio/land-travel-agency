import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ReactNode } from "react";

interface BackLinkProps {
  href: string;
  children?: ReactNode;
  className?: string;
}

export function BackLink({ href, children = "Back", className = "" }: BackLinkProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-primary transition-colors duration-200 group ${className}`}
    >
      <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-200" />
      <span>{children}</span>
    </Link>
  );
}
