import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`w-full max-w-[1120px] px-6 mx-auto ${className}`}>
      {children}
    </div>
  );
}
