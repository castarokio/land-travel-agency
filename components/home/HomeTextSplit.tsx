"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger, shouldReduceMotion } from "@/components/home/animation";

const splitTargets = [
  ".hero-copy .split-line-inner",
  ".hero-copy > p",
  ".proof-title",
  ".initiatives-heading h2",
  ".placeholder-intro h2",
  ".placeholder-intro > p:not(.section-label)",
  ".media-card-details h3",
  ".media-card-details p",
  ".section-heading-row h2",
  ".tourism-destinations-section .section-label",
  ".tourism-destinations-section h2",
  ".tourism-stack-heading > p:not(.section-label)",
  ".tourism-stack-copy strong",
  ".tourism-stack-copy small",
  ".destinations-bottom-cta > p",
  ".why-copy .section-label",
  ".why-copy h2",
  ".why-copy > p:not(.section-label)",
  ".stat-card strong",
  ".stat-card span",
  ".testimonial-shell > .section-label",
  ".testimonial-shell > h2",
  ".newsletter-card > .section-label",
  ".newsletter-card > h2"
].join(",");

const originalText = new WeakMap<Element, string>();

function splitElementIntoLines(element: Element) {
  if (element.classList.contains("split-line-inner")) {
    return [element];
  }

  const text = originalText.get(element) ?? element.textContent?.trim();

  if (!text) {
    return [];
  }

  originalText.set(element, text);

  const words = text.match(/\S+\s*/g) ?? [text];

  element.textContent = "";
  element.classList.add("text-line-split");

  const measuringFragment = document.createDocumentFragment();
  const wordSpans = words.map((word) => {
    const span = document.createElement("span");
    span.className = "text-line-measure";
    span.textContent = word;
    measuringFragment.appendChild(span);
    return span;
  });

  element.appendChild(measuringFragment);

  const lines = new Map<number, string[]>();

  wordSpans.forEach((span) => {
    const top = Math.round(span.offsetTop);
    const line = lines.get(top) ?? [];
    line.push(span.textContent ?? "");
    lines.set(top, line);
  });

  element.textContent = "";

  return Array.from(lines.values()).map((lineWords) => {
    const mask = document.createElement("span");
    const inner = document.createElement("span");

    mask.className = "text-line-mask";
    inner.className = "text-line-inner";
    inner.textContent = lineWords.join("").trimEnd();

    mask.appendChild(inner);
    element.appendChild(mask);

    return inner;
  });
}

function restoreElement(element: Element) {
  const text = originalText.get(element);

  if (text) {
    element.textContent = text;
    element.classList.remove("text-line-split");
  }
}

export function HomeTextSplit() {
  useEffect(() => {
    if (shouldReduceMotion()) return;

    let resizeTimer: number | undefined;
    let context: gsap.Context | undefined;
    let splitElements: Element[] = [];

    const build = () => {
      context?.revert();
      splitElements.forEach(restoreElement);

      context = gsap.context(() => {
        const targets = gsap.utils.toArray<Element>(splitTargets);
        splitElements = targets.filter((element) => !element.classList.contains("split-line-inner"));

        targets.forEach((element) => {
          const lines = splitElementIntoLines(element);

          if (!lines.length) return;

          gsap.set(lines, {
            yPercent: 112,
            opacity: 0.08,
            force3D: true
          });

          gsap.to(lines, {
            yPercent: 0,
            opacity: 1,
            duration: 0.82,
            stagger: 0.075,
            ease: "power4.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true
            }
          });
        });

        ScrollTrigger.refresh();
      });
    };

    const scheduleRebuild = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(build, 180);
    };

    void document.fonts.ready.then(build);
    window.addEventListener("resize", scheduleRebuild);

    return () => {
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", scheduleRebuild);
      context?.revert();
      splitElements.forEach(restoreElement);
    };
  }, []);

  return null;
}
