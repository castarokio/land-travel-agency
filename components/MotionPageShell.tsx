"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type MotionPageShellProps = {
  children: ReactNode;
  className?: string;
};

export function MotionPageShell({ children, className = "" }: MotionPageShellProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`utility-page ${className}`}
    >
      <div className="container utility-card">
        {children}
      </div>
    </motion.section>
  );
}

