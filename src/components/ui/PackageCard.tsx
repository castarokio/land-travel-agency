import Image from "next/image";
import { Clock, MapPin, Check } from "lucide-react";
import { Package } from "@/types";
import { Card } from "./Card";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { routes } from "@/constants/routes";

interface PackageCardProps {
  pkg: Package;
  className?: string;
}

export function PackageCard({ pkg, className = "" }: PackageCardProps) {
  return (
    <Card className={`flex flex-col h-full ${className}`} hoverable={true}>
      {/* Image and Badge */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted/10">
        <Image
          src={pkg.image}
          alt={pkg.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
        <Badge
          variant={pkg.category.toLowerCase().includes("local") ? "orange" : "pink"}
          className="absolute top-4 left-4 z-10"
        >
          {pkg.category}
        </Badge>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-6">
        <div className="flex items-center gap-1 text-xs text-muted mb-2 font-medium">
          <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
          <span>{pkg.category} Package</span>
        </div>

        <h3 className="text-xl font-bold text-text mb-3 line-clamp-2 min-h-[3.5rem]">
          {pkg.title}
        </h3>

        <div className="flex items-center gap-1.5 text-xs font-semibold text-muted mb-4 bg-cream/30 border border-yellow/20 px-2.5 py-1.5 rounded-lg w-fit">
          <Clock className="w-4 h-4 text-orange" />
          <span>{pkg.duration}</span>
        </div>

        {/* Details Checklist */}
        <ul className="space-y-2 mb-6 text-sm text-muted/95 flex-grow">
          {pkg.details.slice(0, 4).map((feat, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span className="line-clamp-2">{feat}</span>
            </li>
          ))}
        </ul>

        {/* Price and Action */}
        <div className="pt-4 border-t border-border flex items-center justify-between mt-auto">
          <div>
            <span className="block text-[10px] uppercase tracking-wider text-muted font-bold">
              Rate
            </span>
            <span className="text-lg font-extrabold text-primary">
              {pkg.price}
            </span>
          </div>
          
          <Button
            href={`${routes.contact}?service=tourism&package=${encodeURIComponent(pkg.title)}`}
            variant="primary"
            size="sm"
          >
            Inquire Now
          </Button>
        </div>
      </div>
    </Card>
  );
}
