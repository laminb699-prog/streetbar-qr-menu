import { Clock, Phone, Search, X } from "lucide-react";
import { PHONE } from "../data";
import { useLanguage } from "../i18n/LanguageContext";
import { languageNames, type Lang } from "../i18n/translations";
import { resolveItemImage } from "../lib/itemImage";

const logoMark = resolveItemImage("logo.png", "");
const langs: Lang[] = ["fr", "ar", "en"];

type Props = {
  query: string;
  onQueryChange: (q: string) => void;
};

export default function MenuHeader({ query, onQueryChange }: Props) {
  const { lang, setLang, t } = useLanguage();

  return (
    <header
      className="relative overflow-hidden px-5 pb-8 pt-5 text-center"
      style={{
        background:
          "radial-gradient(120% 90% at 50% 0%, #7d2bbd 0%, #4d1a78 55%, #2a0f45 100%)",
      }}
    >
      <div className="mx-auto flex max-w-xl items-center justify-between">
        <a
          href={`tel:+${PHONE}`}
          aria-label={t.qr.call}
          className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <Phone className="h-4 w-4" />
        </a>

        <div
          role="group"
          aria-label="Language"
          className="flex items-center gap-1 rounded-full border border-white/20 bg-white/10 p-1"
        >
          {langs.map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              aria-label={languageNames[l]}
              aria-pressed={lang === l}
              className={`min-w-11 rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white ${
                lang === l ? "bg-white text-[#3d1859]" : "text-white/80 hover:text-white"
              }`}
            >
              {l === "ar" ? "عربي" : l}
            </button>
          ))}
        </div>
      </div>

      {logoMark && (
        <img
          src={logoMark}
          alt="Street Bar"
          className="sb-logo-always-invert mx-auto mt-6 h-24 w-24 object-contain"
        />
      )}

      <h1 className="mt-4 font-display text-3xl font-bold leading-tight sb-neon-pink sm:text-4xl">
        Street Bar Crêpes
      </h1>
      <p className="mx-auto mt-2 max-w-xs text-sm text-white/80">{t.qr.tagline}</p>

      <p className="mx-auto mt-4 inline-flex items-center gap-2 rounded-full bg-black/25 px-4 py-2 text-xs text-white/90">
        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
        {t.qr.hours}
      </p>

      <div className="mx-auto mt-6 max-w-md">
        <label className="flex items-center gap-3 rounded-full bg-white px-5 py-3.5 text-[#1b1024] shadow-lg">
          <Search className="h-5 w-5 shrink-0 text-[#6c2ba0]" aria-hidden="true" />
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder={t.menu.searchPlaceholder}
            aria-label={t.menu.searchPlaceholder}
            className="w-full bg-transparent text-base outline-none placeholder:text-[#7a6a88]"
          />
          {query && (
            <button
              type="button"
              onClick={() => onQueryChange("")}
              aria-label="Clear search"
              className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-[#6c2ba0] hover:bg-[#f0e6fa]"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </label>
      </div>
    </header>
  );
}
