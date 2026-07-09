import Image from "next/image";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="logo" aria-label="Land Travel">
      <span className="logo-mark">
        <Image
          src="/assets/landtravel-logo.png"
          alt=""
          width={1254}
          height={1254}
          sizes={compact ? "40px" : "52px"}
          priority
        />
      </span>
      {!compact && (
        <span className="logo-copy">
          <strong>Land</strong>
          <small>Travel</small>
        </span>
      )}
    </span>
  );
}
