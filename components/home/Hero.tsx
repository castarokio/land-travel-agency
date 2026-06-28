"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap, shouldReduceMotion } from "@/components/home/animation";
import { SplitLine } from "@/components/home/SplitLine";
import collageTravel from "../../public/assets/collage-travel.jpg";
import collageUniversity from "../../public/assets/collage-university.jpg";
import collageStudent from "../../public/assets/collage-student.jpg";
import collageOmra from "../../public/assets/collage-omra.jpg";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!heroRef.current || shouldReduceMotion()) return;

    const context = gsap.context(() => {
      const planePath = heroRef.current?.querySelector(".plane-path path");
      const planeText = heroRef.current?.querySelector(".plane-path text");

      if (planePath instanceof SVGPathElement) {
        const pathLength = planePath.getTotalLength();
        gsap.set(planePath, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength
        });
      }

      gsap.set(".hero-eyebrow, .hero-copy > p:not(.hero-eyebrow), .hero-buttons > *, .collage, .col-img, .chip", {
        opacity: 0
      });
      gsap.set(".split-line-inner", { yPercent: 104 });
      gsap.set(".col-img", { scale: 0.94, y: 18, rotate: 0 });
      gsap.set(".chip", { scale: 0.9, y: 10 });
      if (planeText) {
        gsap.set(planeText, { opacity: 0, x: -14 });
      }

      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" }
      });

      timeline
        .add("hero-in")
        .to(".hero-eyebrow", { opacity: 1, y: 0, duration: 0.22 }, "hero-in")
        .to(".split-line-inner", { yPercent: 0, duration: 0.42, stagger: 0.028 }, "hero-in+=0.02")
        .to(".hero-copy > p:not(.hero-eyebrow)", { opacity: 1, y: 0, duration: 0.28 }, "hero-in+=0.12")
        .to(".hero-buttons > *", { opacity: 1, y: 0, duration: 0.28, stagger: 0.035 }, "hero-in+=0.16")
        .to(".collage", { opacity: 1, duration: 0.18 }, "hero-in")
        .to(".col-img", {
          opacity: 1,
          scale: 1,
          y: 0,
          rotate: (index: number) => [-2, 2.5, -1.5, 1.8][index] ?? 0,
          duration: 0.48,
          stagger: {
            each: 0.035,
            from: "center"
          }
        }, "hero-in+=0.02")
        .to(".chip", {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.28,
          stagger: 0.035
        }, "hero-in+=0.2");

      if (planePath) {
        timeline.to(planePath, { strokeDashoffset: 0, duration: 0.46, ease: "power2.out" }, "hero-in+=0.14");
      }

      if (planeText) {
        timeline.to(planeText, { opacity: 1, x: 0, duration: 0.24 }, "hero-in+=0.38");
      }
    }, heroRef);

    return () => context.revert();
  }, []);

  return (
    <section className="hero-section" ref={heroRef}>
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="hero-eyebrow">{"Études • Voyages • Omra"}</p>
          <h1 className="split-heading">
            <SplitLine text="Études, voyages" />
            <SplitLine text="et Omra" className="accent-line" />
            <SplitLine text="— avancez avec" />
            <SplitLine text="confiance" />
          </h1>
          <p>
            {"Un accompagnement complet pour vos projets d’études à l’étranger, vos voyages touristiques et vos séjours Omra, de la première question jusqu’au départ."}
          </p>
          <div className="hero-buttons">
            <Link className="button hero-button" href="#services">
              {"Découvrir nos services"}
            </Link>
            <Link className="button button-ghost hero-button-secondary" href="/contact">
              {"Parler à un conseiller"}
            </Link>
          </div>
        </div>
        <div className="collage" aria-label="Collage des services d'études, de tourisme et d'Omra">
          <div className="col-img a">
            <Image src={collageTravel} width={400} height={450} alt="Étudiant à l'aéroport" priority />
          </div>
          <div className="col-img b">
            <Image src={collageUniversity} width={300} height={220} alt="Campus universitaire" />
          </div>
          <div className="col-img c">
            <Image src={collageStudent} width={320} height={320} alt="Voyage méditerranéen" />
          </div>
          <div className="col-img d">
            <Image src={collageOmra} width={360} height={270} alt="Omra à La Mecque" />
          </div>

          <div className="chip etudes">
            <span className="chip-ico">🎓</span>
            <span>{"Études à l'étranger"}</span>
          </div>
          <div className="chip tourisme">
            <span className="chip-ico">🌴</span>
            <span>Tourisme</span>
          </div>
          <div className="chip omra">
            <span className="chip-ico">🕌</span>
            <span>Omra</span>
          </div>

          <svg className="plane-path" viewBox="0 0 400 200" fill="none" aria-hidden="true">
            <path d="M10 180 Q 150 40 380 80" stroke="#1e40af" strokeWidth="2" strokeDasharray="4 6" fill="none" />
            <text x="370" y="78" fontSize="18">✈️</text>
          </svg>
        </div>
      </div>
    </section>
  );
}
