import { MapPin, Globe, BookOpen, GraduationCap } from "lucide-react";
import { University } from "@/types";
import { Card } from "./Card";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { routes } from "@/constants/routes";

interface UniversityCardProps {
  university: University;
  className?: string;
}

export function UniversityCard({ university, className = "" }: UniversityCardProps) {
  const isOpen = university.status.toLowerCase() === "open";

  return (
    <Card className={`flex flex-col h-full p-6 ${className}`} hoverable={true}>
      {/* Header Info */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-1 text-xs text-muted mb-1 font-medium">
            <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>{university.city}, {university.country}</span>
          </div>
          <h3 className="text-xl font-bold text-text line-clamp-2">
            {university.name}
          </h3>
        </div>

        <Badge variant={isOpen ? "primary" : "outline"} className="shrink-0">
          {university.status}
        </Badge>
      </div>

      {/* Main Specs */}
      <div className="space-y-3 mb-6 text-sm flex-grow">
        {/* Tuition */}
        <div className="flex items-center gap-2.5 text-muted">
          <GraduationCap className="w-4 h-4 text-muted/70 shrink-0" />
          <span>
            Tuition: <strong className="text-text">{university.tuition}</strong>
          </span>
        </div>

        {/* Language */}
        <div className="flex items-center gap-2.5 text-muted">
          <Globe className="w-4 h-4 text-muted/70 shrink-0" />
          <span>
            Language: <strong className="text-text">{university.language}</strong>
          </span>
        </div>

        {/* Programs */}
        <div className="flex items-start gap-2.5 text-muted">
          <BookOpen className="w-4 h-4 text-muted/70 shrink-0 mt-0.5" />
          <div>
            <span className="block text-xs font-semibold mb-1 text-muted/70">
              Popular Programs:
            </span>
            <div className="flex flex-wrap gap-1 mt-1">
              {university.programs.slice(0, 3).map((prog, idx) => (
                <span
                  key={idx}
                  className="inline-block text-[10px] font-bold bg-muted/5 border border-border px-2 py-0.5 rounded"
                >
                  {prog}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-4 border-t border-border mt-auto">
        <Button
          href={`${routes.contact}?service=study-abroad&university=${encodeURIComponent(university.name)}`}
          variant="primary"
          className="w-full"
          size="sm"
        >
          Apply with Land Travel
        </Button>
      </div>
    </Card>
  );
}
