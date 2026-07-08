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
        transformOrigin: "50% 100%",
        force3D: true
      });

      gsap.fromTo(
        cards,
        {
          y: 96,
          opacity: 0,
          rotate: (index) => [-3.5, 2.8, -2.2, 3][index] ?? 0,
          scale: 0.94
        },
        {
          y: 0,
          opacity: 1,
          rotate: (index) => [-1.6, 1.1, -0.8, 1.7][index] ?? 0,
          scale: 1,
          duration: 1,
          stagger: 0.12,
          ease: "power4.out",
          scrollTrigger: {
            trigger: stage,
            start: "top 78%",
            once: true
          }
        }
      );

      cards.forEach((card, index) => {
        const image = card.querySelector("img");

        gsap.to(card, {
          yPercent: -8 - index * 3,
          rotate: index % 2 === 0 ? -2.4 : 2.2,
          scale: 0.99 - index * 0.01,
          ease: "none",
          scrollTrigger: {
            trigger: stage,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });

        if (image) {
          gsap.to(image, {
            scale: 1.12,
            yPercent: index % 2 === 0 ? -5 : 5,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
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
          <div className="tourism-stack-ruler" aria-hidden="true" />
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
