import { resolveItemImage } from "../lib/itemImage";

const logoMark = resolveItemImage("logo.png", "");

type LogoProps = {
  className?: string;
  showText?: boolean;
};

export default function Logo({ className = "", showText = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {logoMark ? (
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink-950/70 p-1.5 ring-1 ring-white/10">
          <img
            src={logoMark}
            alt="Street Bar logo"
            className="sb-logo-mark sb-logo-always-invert h-full w-full object-contain"
          />
        </span>
      ) : (
        <svg
          viewBox="0 0 64 64"
          className="h-11 w-11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <rect x="6" y="6" width="52" height="52" rx="14" stroke="currentColor" strokeWidth="2.5" />
          <path d="M20 24h24M20 32h24M20 40h24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="32" cy="32" r="3" fill="currentColor" />
        </svg>
      )}
      {showText && (
        <div className="leading-none">
          <div className="font-display text-xl font-bold tracking-[0.14em] sb-neon-pink">
            STREET BAR CRÊPES
          </div>
          <div className="mt-1 text-[10px] font-medium tracking-[0.3em] sb-muted">
            FOOD • DRINKS • SWEET
          </div>
        </div>
      )}
    </div>
  );
}
