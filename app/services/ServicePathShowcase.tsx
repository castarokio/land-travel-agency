"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./services.module.css";

type ServicePath = {
  title: string;
  description: string;
  image: string;
  place: string;
  year: string;
  href: string;
  cta: string;
};

gsap.registerPlugin(ScrollTrigger);

export function ServicePathShowcase({ projects }: { projects: ServicePath[] }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const panelRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const panels = panelRefs.current.filter(Boolean) as HTMLElement[];

    if (!section || !stage || panels.length === 0) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || window.innerWidth < 860) {
      gsap.set(panels, { clearProps: "all" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(panels, { autoAlpha: 0, scale: 1.12 });
      gsap.set(panels[0], { autoAlpha: 1, scale: 1 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: "top top",
          end: `+=${panels.length * 115}%`,
          scrub: 0.85,
          pin: true,
          anticipatePin: 1,
        },
      });

      panels.forEach((panel, index) => {
        if (index === panels.length - 1) {
          timeline.to(panel, { scale: 1, autoAlpha: 1, duration: 0.7 });
          return;
        }

        const nextPanel = panels[index + 1];

        timeline
          .to(panel, {
            scale: 0.18,
            autoAlpha: 0,
            filter: "blur(8px)",
            duration: 0.85,
            ease: "power2.inOut",
          })
          .fromTo(
            nextPanel,
            { scale: 1.16, autoAlpha: 0, filter: "blur(8px)" },
            { scale: 1, autoAlpha: 1, filter: "blur(0px)", duration: 0.85, ease: "power2.out" },
            "<0.28",
          );
      });
    }, section);

    return () => ctx.revert();
  }, [projects.length]);

  return (
    <section className={styles.showcase} ref={sectionRef} aria-labelledby="projects-title">
      <div className={styles.showcaseIntro}>
        <p className={styles.kicker}>Interactive paths</p>
        <h2 id="projects-title">Selected Service Paths</h2>
        <span>Scroll through the services. Each path becomes a focused full-screen preview.</span>
      </div>

      <div className={styles.showcaseStage} ref={stageRef}>
        {projects.map((project, index) => (
          <article
            className={styles.showcasePanel}
            key={project.title}
            ref={(node) => {
              panelRefs.current[index] = node;
            }}
          >
            <Image src={project.image} alt={project.title} fill sizes="100vw" priority={index === 0} />
            <div className={styles.showcaseShade} aria-hidden="true" />
            <div className={styles.showcaseContent}>
              <span className={styles.showcaseCount}>{String(index + 1).padStart(2, "0")}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <footer>
                <span><MapPin size={15} /> {project.place}</span>
                <span><CalendarDays size={15} /> {project.year}</span>
              </footer>
              <Link className={styles.showcaseButton} href={project.href}>
                {project.cta} <ArrowUpRight size={17} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
