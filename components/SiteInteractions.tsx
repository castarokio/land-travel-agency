"use client";

import { useEffect } from "react";
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
  ".hero-intent-panel",
  ".dest-grid-card",
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
  useEffect(() => {
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
  }, []);

  return null;
}
