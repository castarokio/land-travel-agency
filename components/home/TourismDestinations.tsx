"use client";

import { useEffect } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { gsap, ScrollTrigger, shouldReduceMotion } from "@/components/home/animation";
import { tourismDestinations } from "@/lib/site-data";

export function TourismDestinations() {
  useEffect(() => {
    if (shouldReduceMotion()) return;

    const context = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-tourism-stack-card]");
      const stage = document.querySelector<HTMLElement>("[data-tourism-stack-stage]");

      if (!cards.length || !stage) return;

      gsap.set(cards, {
        transformOrigin: "50% 50%",
        force3D: true
      });

      gsap.set(cards, { yPercent: 105, opacity: 1, scale: 1 });
      gsap.set(cards[0], { yPercent: 0 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: "top top",
          end: () => `+=${Math.max(1, cards.length - 1) * window.innerHeight}`,
          pin: true,
          scrub: 0.9,
          anticipatePin: 1
        }
      });

      cards.slice(1).forEach((card, index) => {
        timeline.to(card, {
          yPercent: 0,
          duration: 1,
          ease: "none"
        }, index);
      });

      cards.forEach((card) => {
        const image = card.querySelector("img");
        if (image) {
          gsap.to(image, {
            scale: 1.09,
            ease: "none",
            scrollTrigger: {
              trigger: stage,
              start: "top top",
              end: "bottom top",
              scrub: true
            }
          });
        }
      });

      ScrollTrigger.refresh();
    });

    return () => context.revert();
  }, []);

  return (
    <section className="tourism-destinations-section section-space" id="destinations-tourisme">
      <div className="container">
        <div className="tourism-stack-heading">
          <p className="section-label">Moments d&apos;Évasion</p>
          <h2>
            Votre prochaine aventure commence ici
          </h2>
          <p>
            Explorez nos destinations les plus demandées et laissez-nous organiser un voyage mémorable, du premier rêve jusqu&apos;au retour.
          </p>
        </div>

        <div className="tourism-stack-stage" data-tourism-stack-stage>
          {tourismDestinations.map((dest, index) => (
            <Link 
              key={dest.id} 
              href={`/tourism/destination/${dest.id}`} 
              className="tourism-stack-card"
              data-tourism-stack-card
              style={{ "--stack-index": index } as CSSProperties}
            >
              <Image 
                src={dest.image} 
                alt={dest.name} 
                width={1240}
                height={720}
                priority={dest.id === "maldives"} 
              />
              <span className="tourism-stack-shade" aria-hidden="true" />
              <span className="tourism-stack-number">{String(index + 1).padStart(2, "0")}</span>
              <span className="tourism-stack-meta">Séjour organisé</span>
              <span className="tourism-stack-copy">
                <span>{dest.tagline}</span>
                <strong>{dest.name}</strong>
                <small>{dest.shortDesc}</small>
              </span>
              <span className="tourism-stack-action" aria-hidden="true">
                  <ArrowRight size={22} />
              </span>
            </Link>
          ))}
        </div>

        <div className="destinations-bottom-cta">
          <Link href="/#tourism" className="button tourism-stack-cta">
            Voir nos offres touristiques <ArrowRight size={16} />
          </Link>
          <p>
            Des séjours organisés, des circuits sur mesure et un accompagnement avant le départ.
          </p>
        </div>
      </div>
    </section>
  );
}
