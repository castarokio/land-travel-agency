"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

const panelVariants = {
  initial: { scaleY: 1 },
  animate: { scaleY: 0 },
};

const contentVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
};

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const disablePanels = pathname?.startsWith("/login");

  const colors = [
    "var(--primary)",
    "var(--primary-dark)",
    "var(--primary)",
    "var(--primary-dark)",
    "var(--primary)",
  ];

  return (
    <>
      <motion.div
        variants={contentVariants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="w-full"
      >
        {children}
      </motion.div>

      {!disablePanels && (
        <div className="fixed inset-0 pointer-events-none z-[9999] flex">
          {colors.map((color, i) => (
            <motion.div
              key={i}
              variants={panelVariants}
              initial="initial"
              animate="animate"
              transition={{
                duration: 0.7,
                ease: [0.76, 0, 0.24, 1],
                delay: i * 0.08,
              }}
              style={{
                originY: 0,
                backgroundColor: color,
              }}
              className="h-full flex-1"
            />
          ))}
        </div>
      )}
    </>
  );
}

export default PageTransition;
