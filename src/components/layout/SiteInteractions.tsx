"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";
import { gsap, shouldReduceMotion } from "@/components/home/animation";

const buttonSelector = [
  ".button",
  ".menu-button",
  ".carousel-controls button",
  ".testimonial-arrow",
  ".dots button",
  ".dest-action-btn",
  ".dest-itinerary-day-btn",
  ".dest-accordion-header",
  ".omra-card-btn"
].join(",");

const surfaceSelector = [
  ".dest-grid-card",
  ".quick-service-card",
  ".destination-card",
  ".placeholder-card",
  ".initiative-row",
  ".tour-card",
  ".package-card",
  ".omra-package-card",
  ".dest-related-card",
  ".proof-logo-card",
  ".testimonial-switcher button"
].join(",");

function bindHover(
  elements: Element[],
  enterVars: gsap.TweenVars,
  leaveVars: gsap.TweenVars
) {
  const cleanups: Array<() => void> = [];

  elements.forEach((element) => {
    const onEnter = () => gsap.to(element, { overwrite: "auto", ...enterVars });
    const onLeave = () => gsap.to(element, { overwrite: "auto", ...leaveVars });
    const onDown = () => gsap.to(element, { scale: 0.985, duration: 0.08, ease: "power2.out", overwrite: "auto" });
    const onUp = () => gsap.to(element, { scale: 1, duration: 0.18, ease: "power3.out", overwrite: "auto" });

    element.addEventListener("pointerenter", onEnter);
    element.addEventListener("pointerleave", onLeave);
    element.addEventListener("pointerdown", onDown);
    element.addEventListener("pointerup", onUp);
    element.addEventListener("pointercancel", onLeave);

    cleanups.push(() => {
      element.removeEventListener("pointerenter", onEnter);
      element.removeEventListener("pointerleave", onLeave);
      element.removeEventListener("pointerdown", onDown);
      element.removeEventListener("pointerup", onUp);
      element.removeEventListener("pointercancel", onLeave);
    });
  });

  return cleanups;
}

export function SiteInteractions() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();

  const hideInteractions = pathname?.startsWith("/program-finder");

  // GSAP micro-interactions
  useEffect(() => {
    if (hideInteractions) return;
    if (shouldReduceMotion()) return;

    const context = gsap.context(() => {
      const buttons = gsap.utils.toArray<Element>(buttonSelector);
      const surfaces = gsap.utils.toArray<Element>(surfaceSelector);

      gsap.set([...buttons, ...surfaces], {
        transformOrigin: "50% 50%",
        force3D: true
      });

      const cleanups = [
        ...bindHover(
          buttons,
          { y: -3, scale: 1.035, duration: 0.22, ease: "power3.out" },
          { y: 0, scale: 1, duration: 0.18, ease: "power2.out" }
        ),
        ...bindHover(
          surfaces,
          { y: -8, scale: 1.018, duration: 0.28, ease: "power3.out" },
          { y: 0, scale: 1, duration: 0.24, ease: "power2.out" }
        )
      ];

      return () => cleanups.forEach((cleanup) => cleanup());
    });

    return () => context.revert();
  }, [hideInteractions]);

  // Scroll handler for progress indicator and showing back to top button
  useEffect(() => {
    if (hideInteractions) return;
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;

      if (totalScroll > 0) {
        setScrollProgress((currentScroll / totalScroll) * 100);
      }

      setShowScrollTop(currentScroll > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hideInteractions]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  if (hideInteractions) {
    return null;
  }

  return (
    <>
      {/* Background Gradients */}
      <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden">
        {/* Top Right Ambient Glow */}
        <div className="absolute right-[-10%] top-[-10%] h-[50vw] w-[50vw] max-w-[600px] rounded-full bg-primary/5 blur-[120px] filter" />
        {/* Middle Left Ambient Glow */}
        <div className="absolute left-[-15%] top-[40%] h-[45vw] w-[45vw] max-w-[500px] rounded-full bg-yellow/5 blur-[100px] filter" />
        {/* Bottom Right Ambient Glow */}
        <div className="absolute bottom-[-10%] right-[-10%] h-[40vw] w-[40vw] max-w-[500px] rounded-full bg-pink/5 blur-[110px] filter" />
      </div>

      {/* Floating Buttons Bar */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
        {/* WhatsApp Button */}
        <a
          href="https://wa.me/2137856342788"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 active:scale-95"
          aria-label="Contactez-nous sur WhatsApp"
        >
          {/* Wave effect */}
          <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40 opacity-75" />
          
          {/* WhatsApp Logo Icon */}
          <svg
            className="relative z-10 h-7 w-7 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.528 2.012 14.077.99 11.45 1.055 6.012 1.055 1.59 5.424 1.585 10.853c-.001 1.762.48 3.483 1.393 5.011l-.995 3.634 3.737-.98c1.554.848 3.097 1.306 4.33 1.636zm11.367-7.854c-.3-.15-1.77-.875-2.04-.976-.27-.1-.47-.15-.67.15-.2.3-.77.976-.94 1.177-.17.2-.34.225-.64.075-.3-.15-1.27-.47-2.42-1.493-.89-.797-1.49-1.782-1.67-2.08-.18-.3-.02-.462.13-.612.135-.135.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.67-1.62-.92-2.2-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.075-.79.375-.27.3-1.03 1.002-1.03 2.443s1.05 2.83 1.2 3.03c.15.2 2.062 3.148 4.995 4.413.698.301 1.244.482 1.67.618.703.224 1.343.193 1.85.117.564-.085 1.77-.724 2.02-1.397.25-.672.25-1.25.17-1.373-.07-.123-.27-.2-.57-.35z" />
          </svg>

          {/* Tooltip */}
          <span className="pointer-events-none absolute right-16 top-1/2 -translate-y-1/2 scale-75 rounded bg-neutral-900 px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-md transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 whitespace-nowrap">
            Discuter avec nous
          </span>
        </a>

        {/* Scroll To Top Button with Progress Ring */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-white text-neutral-800 shadow-lg transition-transform hover:scale-110 active:scale-95"
            aria-label="Retour en haut"
          >
            {/* SVG Ring for Scroll Progress */}
            <svg className="absolute inset-0 h-full w-full -rotate-90">
              <circle
                cx="28"
                cy="28"
                r="24"
                className="stroke-neutral-100 fill-transparent"
                strokeWidth="3"
              />
              <circle
                cx="28"
                cy="28"
                r="24"
                className="stroke-primary fill-transparent transition-all duration-100"
                strokeWidth="3"
                strokeDasharray={2 * Math.PI * 24}
                strokeDashoffset={2 * Math.PI * 24 * (1 - scrollProgress / 100)}
                strokeLinecap="round"
              />
            </svg>

            {/* Icon */}
            <ArrowUp size={18} className="relative z-10 transition-transform group-hover:-translate-y-0.5" />
          </button>
        )}
      </div>
    </>
  );
}
