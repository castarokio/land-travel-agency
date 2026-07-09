import Link from "next/link";
import { ReactNode } from "react";

interface ConcaveButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary";
}

export function ConcaveButton({
  children,
  href,
  onClick,
  className = "",
  variant = "primary"
}: ConcaveButtonProps) {
  const baseStyle = "relative inline-flex items-center justify-center font-bold px-8 py-3.5 rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md transition-all duration-300 overflow-hidden group shadow-md hover:shadow-xl active:scale-95 text-center";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-primary-dark text-white",
    secondary: "bg-gradient-to-r from-orange to-yellow text-text-DEFAULT",
  };

  const content = (
    <>
      {/* Glossy overlay effect */}
      <span className="absolute inset-0 w-full h-full bg-white/10 transform -skew-x-12 -translate-x-full group-hover:animate-shine group-hover:translate-x-full transition-all duration-1000 ease-out" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`${baseStyle} ${variants[variant]} ${className}`} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={`${baseStyle} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {content}
    </button>
  );
}
