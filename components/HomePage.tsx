"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, shouldReduceMotion } from "@/components/home/animation";
import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Initiatives";
import { Newsletter } from "@/components/home/Newsletter";
import {
  Destinations,
  OmraSection,
  Proof,
  WhyChoose
} from "@/components/home/HomeSections";
import { TourismDestinations } from "@/components/home/TourismDestinations";
import { Testimonials } from "@/components/home/Testimonials";

type RevealOptions = {
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  scrollTrigger?: Record<string, unknown>;
};

export function HomePage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pageRef.current || shouldReduceMotion()) return;

    const context = gsap.context(() => {
      const reveal = (
        selector: string,
        trigger: string,
        vars: RevealOptions = {}
      ) => {
        ScrollTrigger.batch(gsap.utils.toArray(selector), {
          start: "top 90%",
          once: true,
          ...vars.scrollTrigger,
          onEnter: (batch) => {
            gsap.fromTo(
              batch,
              {
                autoAlpha: 0,
                y: 18,
                scale: 0.99,
                ...vars.from
              },
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 0.38,
                ease: "power3.out",
                stagger: 0.035,
                overwrite: "auto",
                ...vars.to
              }
            );
          }
        });
      };

      reveal(".proof-logo-card", ".proof-section", {
        from: { y: 14, scale: 0.96 },
        to: { duration: 0.28, stagger: 0.02 }
      });

      reveal(".tourism-destinations-section .section-label, .tourism-destinations-section h2, .tourism-destinations-section p", ".tourism-destinations-section", {
        from: { y: 18 },
        to: { stagger: 0.05 }
      });

      reveal(".dest-grid-card", ".destinations-masonry-grid", {
        from: { y: 28, scale: 0.96 },
        to: { stagger: 0.04 }
      });

      reveal(".omra-section .placeholder-intro, .omra-section .placeholder-card", ".omra-section", {
        from: { y: 24, scale: 0.98 },
        to: { stagger: 0.04 }
      });

      reveal(".initiatives-heading > *, .initiatives-media", ".services-section", {
        from: { x: -24, y: 0 },
        to: { duration: 0.54, stagger: 0.06 }
      });

      reveal(".initiative-row", ".services-cards-grid", {
        from: { x: 18, y: 0 },
        to: { stagger: 0.055 }
      });

      reveal(".destination-section .section-heading-row", ".destination-section", {
        from: { y: 18 },
        to: { duration: 0.48 }
      });

      reveal(".destination-grid > article", ".destination-grid", {
        from: { y: 28, scale: 0.97 },
        to: { stagger: 0.08 }
      });

      reveal(".why-art", ".why-section", {
        from: { x: -28, y: 0, scale: 0.98 },
        to: { duration: 0.62 }
      });

      reveal(".why-copy > *", ".why-section", {
        from: { x: 24, y: 0 },
        to: { stagger: 0.06 }
      });

      reveal(
        ".testimonial-section .section-label, .testimonial-section h2, .testimonial-shell .testimonial-arrow, .testimonial-shell .dots, .testimonial-shell .testimonial-switcher",
        ".testimonial-section",
        {
          from: { y: 18 },
          to: { stagger: 0.045 }
        }
      );

      reveal(".testimonial-shell .testimonial-card", ".testimonial-shell .testimonial-card", {
        from: { scale: 0.94, y: 26 },
        to: { duration: 0.52 }
      });

      reveal(".newsletter-card > *", ".newsletter-section", {
        from: { y: 18 },
        to: { stagger: 0.05 }
      });
    }, pageRef);

    return () => context.revert();
  }, []);

  return (
    <div ref={pageRef}>
      <Hero />
      <Proof />
      <Services />
      <TourismDestinations />
      <OmraSection />
      <Destinations />
      <WhyChoose />
      <Testimonials />
      <Newsletter />
    </div>
  );
}
