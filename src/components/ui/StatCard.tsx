import * as Icons from "lucide-react";

import { ComponentType } from "react";

interface StatCardProps {
  value: string;
  label: string;
  icon?: string;
  className?: string;
}

export function StatCard({ value, label, icon, className = "" }: StatCardProps) {
  // Dynamically resolve icon component if specified
  const IconsRecord = Icons as unknown as Record<string, ComponentType<{ className?: string }>>;
  const IconComponent = icon && IconsRecord[icon] ? IconsRecord[icon] : null;

  return (
    <div className={`flex items-center gap-5 p-6 bg-white border border-border rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}>
      {IconComponent && (
        <div className="p-3.5 rounded-2xl bg-primary/5 text-primary shrink-0">
          <IconComponent className="w-6 h-6" />
        </div>
      )}
      <div>
        <span className="block text-3xl md:text-4xl font-extrabold text-text tracking-tight mb-0.5">
          {value}
        </span>
        <span className="block text-sm font-semibold text-muted leading-tight">
          {label}
        </span>
      </div>
    </div>
  );
}
