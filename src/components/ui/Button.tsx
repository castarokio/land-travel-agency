import Link from "next/link";
import { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "text";
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
  onClick?: () => void;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  disabled?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className = "",
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const baseStyle = "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-dark hover:shadow-lg shadow-primary/20",
    secondary: "bg-pink text-white hover:bg-pink/90 hover:shadow-lg shadow-pink/20",
    outline: "bg-transparent text-primary border-2 border-primary hover:bg-primary/5",
    text: "bg-transparent text-primary hover:text-primary-dark p-0 hover:underline",
  };

  const sizes = {
    sm: "px-4 py-1.5 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-3 text-lg",
  };

  const finalClassName = `${baseStyle} ${sizes[size]} ${variant === "text" ? "" : variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={finalClassName} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={finalClassName}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
