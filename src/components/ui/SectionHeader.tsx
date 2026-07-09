interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  label,
  title,
  description,
  align = "center",
  className = "",
}: SectionHeaderProps) {
  const alignment = align === "left" ? "text-left items-start" : "text-center items-center";

  return (
    <div className={`flex flex-col max-w-3xl ${alignment} ${className}`}>
      {label && (
        <span className="text-xs uppercase font-extrabold tracking-widest text-pink mb-2 bg-pink/5 px-3 py-1 rounded-full border border-pink/15">
          {label}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-text leading-tight mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-base md:text-lg text-muted font-normal leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
