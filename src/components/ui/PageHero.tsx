import { ReactNode } from "react";
import { Container } from "./Container";
import { Breadcrumb } from "./Breadcrumb";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  overlayColor?: string;
  children?: ReactNode;
}

export function PageHero({
  title,
  subtitle,
  backgroundImage,
  overlayColor = "bg-primary-dark/80",
  children,
}: PageHeroProps) {
  const hasBg = !!backgroundImage;

  return (
    <section className="relative min-h-[300px] md:min-h-[380px] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Background image & gradient overlay */}
      {hasBg ? (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-scale duration-[10000ms] hover:scale-105"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-tr from-primary-dark via-primary to-[#1e3a8a]" />
      )}
      <div className={`absolute inset-0 ${overlayColor} mix-blend-multiply opacity-90`} />

      <Container className="relative z-10 flex flex-col items-center text-center text-white">
        <Breadcrumb className="mb-6 text-white/80 hover:text-white" />
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 max-w-4xl text-shadow-sm">
          {title}
        </h1>
        
        {subtitle && (
          <p className="text-lg md:text-xl text-white/90 font-medium max-w-2xl leading-relaxed text-shadow-xs">
            {subtitle}
          </p>
        )}

        {children}
      </Container>
      
      {/* Curved wave effect bottom mask */}
      <div className="absolute bottom-0 left-0 right-0 h-6 bg-white rounded-t-3xl" />
    </section>
  );
}
