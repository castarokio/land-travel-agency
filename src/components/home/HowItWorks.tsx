"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Building2,
  FileCheck2,
  GraduationCap,
  HandHeart,
  Hotel,
  Minus,
  Plus
} from "lucide-react";
import { serviceJourney } from "@/data/services";
import { routes } from "@/constants/routes";

const journeyIcons = [GraduationCap, Building2, FileCheck2, Hotel, HandHeart];

export function HowItWorks() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="services-section initiatives-section section-space" id="services">
      <div className="container initiatives-layout">
        <div className="initiatives-left">
          <div className="initiatives-heading">
            <p className="section-label">Services</p>
            <h2>Nos initiatives pour votre réussite !</h2>
          </div>

          <div className="initiatives-media">
            {serviceJourney.map((item, index) => (
              <Image
                className={index === activeIndex ? "active" : ""}
                src={item.image}
                alt={item.title}
                width={620}
                height={520}
                loading="eager"
                priority={index === 0}
                key={item.id}
              />
            ))}
          </div>
        </div>

        <div className="initiatives-accordion" aria-label="Initiatives de service">
          {serviceJourney.map((item, index) => {
            const Icon = journeyIcons[index] || GraduationCap;
            const isOpen = index === activeIndex;

            return (
              <article className={`initiative-row ${isOpen ? "active" : ""}`} key={item.id}>
                <button
                  className="initiative-trigger"
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`initiative-panel-${item.id}`}
                  onPointerDown={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                >
                  <span className="initiative-title">
                    <Icon size={32} strokeWidth={1.9} />
                    <span>{item.title}</span>
                  </span>
                  {isOpen ? <Minus size={22} /> : <Plus size={22} />}
                </button>

                <div
                  className="initiative-panel-wrapper"
                  style={{
                    display: "grid",
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    transition: "grid-template-rows 160ms cubic-bezier(0.2, 0.8, 0.2, 1)",
                    overflow: "hidden"
                  }}
                >
                  <div className="initiative-panel" style={{ minHeight: 0 }}>
                    <p>{item.description}</p>
                    <Link href={routes.services}>{item.cta}</Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="initiatives-bottom-actions">
        <Link className="button services-explore-btn-large" href={routes.services}>
          Explorer tous les services <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
