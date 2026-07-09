import { Search } from "lucide-react";
import { ReactNode } from "react";
import { Button } from "./Button";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: ReactNode;
  className?: string;
}

export function EmptyState({
  title = "No results found",
  description = "We couldn't find what you were looking for. Try adjusting your filters or search terms.",
  actionLabel,
  onAction,
  icon,
  className = "",
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 border border-dashed border-border rounded-2xl bg-cream/5 ${className}`}>
      <div className="p-4 rounded-full bg-primary/5 text-primary mb-4">
        {icon || <Search className="w-8 h-8 opacity-75" />}
      </div>
      <h3 className="text-lg font-bold text-text mb-1">{title}</h3>
      <p className="text-sm text-muted max-w-sm mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="outline" size="sm">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
