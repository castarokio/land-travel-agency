import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { Destination } from "@/types";
import { Card } from "./Card";

interface DestinationCardProps {
  destination: Destination;
  className?: string;
}

export function DestinationCard({ destination, className = "" }: DestinationCardProps) {
  // Safe extraction of reviews count since it's an array
  const reviewsCount = destination.reviews?.length || 0;

  return (
    <Card className={`flex flex-col h-full group ${className}`} hoverable={true}>
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted/10">
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        
        {/* Top Overlay Badge */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold shadow-sm">
          <Star className="w-3.5 h-3.5 text-yellow fill-yellow shrink-0" />
          <span className="text-text">{destination.rating}</span>
          <span className="text-muted font-normal">({reviewsCount})</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-6">
        <h3 className="text-2xl font-bold text-text mb-2 group-hover:text-primary transition-colors duration-200">
          {destination.name}
        </h3>
        
        <p className="text-sm text-muted/95 line-clamp-2 mb-6">
          {destination.shortDesc || destination.intro}
        </p>

        {/* Pricing and Action */}
        <div className="pt-4 border-t border-border flex items-center justify-between mt-auto">
          <div>
            <span className="block text-[10px] uppercase tracking-wider text-muted font-bold">
              Starting from
            </span>
            <span className="text-xl font-extrabold text-primary">
              {destination.price}
            </span>
          </div>
          
          <Link
            href={`/services/tourism/destinations/${destination.id}`}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 transform active:scale-95"
            aria-label={`Explore ${destination.name}`}
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </Card>
  );
}
