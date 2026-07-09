import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "primary" | "pink" | "yellow" | "orange" | "outline";
  className?: string;
}

export function Badge({ children, variant = "primary", className = "" }: BadgeProps) {
  const baseStyles = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide transition-colors duration-200";
  
  const variants = {
    primary: "bg-primary/10 text-primary border border-primary/20",
    pink: "bg-pink/10 text-pink border border-pink/20",
    yellow: "bg-yellow/20 text-orange border border-yellow/30",
    orange: "bg-orange/10 text-orange border border-orange/20",
    outline: "bg-transparent text-muted border border-border",
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
