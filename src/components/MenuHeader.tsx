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
    <header className="relative overflow-hidden bg-plum-600 px-5 pb-7 pt-4 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -end-16 -top-16 h-56 w-56 rounded-full bg-plum-500/60"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -start-10 h-48 w-48 rounded-full bg-plum-700/60"
      />

      <div className="relative mx-auto max-w-2xl">
        <div className="flex items-center justify-between">
          <div
            role="group"
            aria-label="Language"
            className="flex items-center gap-1 rounded-full bg-white/15 p-1"
          >
            {langs.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                aria-label={languageNames[l]}
                aria-pressed={lang === l}
                className={`min-w-11 rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-wide transition-colors ${
                  lang === l ? "bg-white text-plum-700" : "text-white/85 hover:text-white"
                }`}
              >
                {l === "ar" ? "عربي" : l}
              </button>
            ))}
          </div>
          <a
            href={`tel:+${PHONE}`}
            aria-label={t.header.call}
            className="grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
          >
            <Phone className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-6 flex items-center gap-4">
          {logoMark && (
            <span className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-plum-800 shadow-lg ring-2 ring-white/30">
              <img
                src={logoMark}
                alt=""
                className="logo-invert h-14 w-14 object-contain"
              />
            </span>
          )}
          <h1 className="font-display text-[2.6rem] uppercase leading-[0.95] tracking-tight">
            <span className="block text-white">Street Bar</span>
            <span className="block text-plum-200">Crêpes</span>
          </h1>
        </div>

        <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/85">
          {t.header.tagline}
        </p>

        <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-medium">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
          {t.header.hours}
        </p>

        <label className="mt-5 flex items-center gap-3 rounded-full bg-white px-5 py-3.5 text-plum-900 shadow-lg">
          <Search className="h-5 w-5 shrink-0 text-plum-500" aria-hidden="true" />
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder={t.header.searchPlaceholder}
            aria-label={t.header.searchPlaceholder}
            className="w-full bg-transparent text-base outline-none placeholder:text-plum-400"
          />
          {query && (
            <button
              type="button"
              onClick={() => onQueryChange("")}
              aria-label="Clear search"
              className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-plum-500 hover:bg-plum-100"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </label>
      </div>
    </header>
  );
}
