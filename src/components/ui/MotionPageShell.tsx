"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MotionPageShellProps {
  children: ReactNode;
  className?: string;
}

export function MotionPageShell({ children, className = "" }: MotionPageShellProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -25 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

