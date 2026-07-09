import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  glassmorphic?: boolean;
}

export function Card({
  children,
  className = "",
  hoverable = true,
  glassmorphic = false,
}: CardProps) {
  const baseStyle = "rounded-2xl border border-border overflow-hidden transition-all duration-300";
  const bgStyle = glassmorphic
    ? "bg-white/70 backdrop-blur-md shadow-premium/5"
    : "bg-white shadow-sm";
  const hoverStyle = hoverable
    ? "hover:-translate-y-1.5 hover:shadow-premium hover:border-primary/20"
    : "";

  return (
    <div className={`${baseStyle} ${bgStyle} ${hoverStyle} ${className}`}>
      {children}
    </div>
  );
}
