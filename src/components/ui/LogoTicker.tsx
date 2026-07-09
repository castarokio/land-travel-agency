"use client";



interface LogoTickerProps {
  logos?: { src: string; alt: string }[];
  title?: string;
  className?: string;
}

// Fallback demo logos using common placeholder logos or descriptive names
const defaultLogos = [
  { src: "/logos/universities/oxford.svg", alt: "University of Oxford" },
  { src: "/logos/universities/harvard.svg", alt: "Harvard University" },
  { src: "/logos/universities/toronto.svg", alt: "University of Toronto" },
  { src: "/logos/universities/mcgill.svg", alt: "McGill University" },
  { src: "/logos/universities/heidelberg.svg", alt: "Heidelberg University" },
  { src: "/logos/universities/imperial.svg", alt: "Imperial College London" },
  { src: "/logos/universities/cambridge.svg", alt: "University of Cambridge" },
  { src: "/logos/universities/unsw.svg", alt: "UNSW Sydney" },
];

export function LogoTicker({
  logos = defaultLogos,
  title = "Partner Universities & Global Destinations",
  className = "",
}: LogoTickerProps) {
  // Duplicate logos list to allow infinite seamless scroll
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <div className={`w-full py-10 bg-cream/10 border-y border-border overflow-hidden ${className}`}>
      {title && (
        <h4 className="text-center text-xs uppercase font-extrabold tracking-widest text-muted mb-6">
          {title}
        </h4>
      )}
      
      {/* Ticker Outer Envelope */}
      <div className="relative w-full flex items-center overflow-hidden">
        {/* Gradient overlays to blur edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Ticker Inner Track */}
        <div className="flex gap-16 items-center w-max animate-ticker">
          {duplicatedLogos.map((logo, idx) => (
            <div key={idx} className="flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300 w-32 h-12 relative shrink-0">
              <span className="text-sm font-bold tracking-tight text-muted/80">{logo.alt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
