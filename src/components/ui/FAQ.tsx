"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  className?: string;
}

export function FAQ({ items, className = "" }: FAQProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={`space-y-4 max-w-3xl mx-auto w-full ${className}`}>
      {items.map((item, idx) => {
        const isOpen = activeIndex === idx;

        return (
          <div
            key={idx}
            className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
              isOpen
                ? "border-primary bg-primary/5 shadow-md shadow-primary/5"
                : "border-border bg-white hover:border-muted/40"
            }`}
          >
            <button
              type="button"
              onClick={() => toggleAccordion(idx)}
              className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className="text-base md:text-lg font-bold text-text">
                {item.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-muted transition-transform duration-300 shrink-0 ml-4 ${
                  isOpen ? "transform rotate-180 text-primary" : ""
                }`}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-5 pb-5 md:px-6 md:pb-6 text-sm md:text-base text-muted/90 border-t border-dashed border-primary/10 pt-4 leading-relaxed">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
