"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { testimonials } from "@/lib/site-data";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const testimonial = testimonials[index];

  return (
    <section className="testimonial-section section-space">
      <div className="container testimonial-shell">
        <p className="section-label">Témoignages</p>
        <h2>Faites confiance à nos clients</h2>

        <button
          className="testimonial-arrow testimonial-left"
          aria-label="Témoignage précédent"
          type="button"
          onClick={() => setIndex((value) => (value + testimonials.length - 1) % testimonials.length)}
        >
          <ArrowLeft size={18} />
        </button>

        <article className="testimonial-card">
          <Image src={testimonial.avatar} width={96} height={96} alt={testimonial.name} loading="eager" />
          <h3>
            {testimonial.name} / {testimonial.place}
          </h3>
          <div className="stars" aria-label="Évaluation de 5 étoiles">
            {Array.from({ length: 5 }).map((_, starIndex) => (
              <Star key={starIndex} size={18} fill="currentColor" />
            ))}
          </div>
          <p>{testimonial.quote}</p>
        </article>

        <button
          className="testimonial-arrow testimonial-right active"
          aria-label="Témoignage suivant"
          type="button"
          onClick={() => setIndex((value) => (value + 1) % testimonials.length)}
        >
          <ArrowRight size={18} />
        </button>

        <div className="dots" aria-label="Pagination des témoignages">
          {testimonials.map((item, dotIndex) => (
            <button
              key={item.name}
              type="button"
              aria-label={`Afficher le témoignage de ${item.name}`}
              className={dotIndex === index ? "active" : ""}
              onClick={() => setIndex(dotIndex)}
            />
          ))}
        </div>

        <div className="testimonial-switcher" aria-label="Changer de témoignage">
          {testimonials.map((item, thumbIndex) => (
            <button
              key={item.name}
              type="button"
              className={thumbIndex === index ? "active" : ""}
              onClick={() => setIndex(thumbIndex)}
            >
              <Image src={item.avatar} width={44} height={44} alt="" />
              <span>
                <strong>{item.name}</strong>
                <small>{item.place}</small>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

