import type { ReactNode } from "react";

type MotionPageShellProps = {
  children: ReactNode;
  className?: string;
};

export function MotionPageShell({ children, className = "" }: MotionPageShellProps) {
  return (
    <section className={`utility-page ${className}`}>
      <div className="container utility-card">
        {children}
      </div>
    </section>
  );
}
