import { useEffect, useMemo, useRef, useState } from "react";
import { Minus, Plus, X } from "lucide-react";
import { categories } from "../data";
import { useCart } from "../cart/CartContext";
import { useLanguage } from "../i18n/LanguageContext";
import { useScrollSpy, useBodyScrollLock } from "../hooks/useReveal";

type LightboxState = { image: string; name: string } | null;

function ItemRow({
  categoryId,
  name,
  price,
  image,
  onOpenPhoto,
}: {
  categoryId: string;
  name: string;
  price: number;
  image: string;
  onOpenPhoto: (image: string, name: string) => void;
}) {
  const { addItem, setQuantity, quantityFor } = useCart();
  const { t } = useLanguage();
  const key = `${categoryId}__${name}`;
  const qty = quantityFor(key);

  return (
    <li className="flex items-center gap-4 py-3.5">
      <button
        onClick={() => onOpenPhoto(image, name)}
        aria-label={`${name}: view photo`}
        className="h-[72px] w-[72px] shrink-0 overflow-hidden rounded-2xl bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400"
      >
        <img
          src={image}
          alt=""
          loading="lazy"
          width={72}
          height={72}
          className="h-full w-full object-cover"
        />
      </button>

      <div className="min-w-0 flex-1">
        <p className="font-display text-base font-semibold leading-snug">{name}</p>
        <p className="mt-0.5 text-sm font-semibold text-gold-300"><bdi>{price} MAD</bdi></p>
      </div>

      {qty === 0 ? (
        <button
          onClick={() => addItem({ key, name, price, image })}
          aria-label={`${t.cart.addToCart}: ${name}`}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold-400 text-white shadow-md transition-transform active:scale-95 hover:bg-gold-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300"
        >
          <Plus className="h-5 w-5" />
        </button>
      ) : (
        <div className="flex shrink-0 items-center gap-1 rounded-full bg-gold-400/15 p-1 ring-1 ring-gold-400/40">
          <button
            onClick={() => setQuantity(key, qty - 1)}
            aria-label={`${name}: −`}
            className="grid h-9 w-9 place-items-center rounded-full bg-gold-400 text-white active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-300"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-6 text-center text-sm font-bold tabular-nums" aria-live="polite">
            {qty}
          </span>
          <button
            onClick={() => setQuantity(key, qty + 1)}
            aria-label={`${name}: +`}
            className="grid h-9 w-9 place-items-center rounded-full bg-gold-400 text-white active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-300"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      )}
    </li>
  );
}

export default function MenuList({ query }: { query: string }) {
  const { t } = useLanguage();
  const [lightbox, setLightbox] = useState<LightboxState>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useBodyScrollLock(lightbox !== null);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return categories
      .map((c) => ({
        ...c,
        products: q ? c.products.filter((p) => p.name.toLowerCase().includes(q)) : c.products,
      }))
      .filter((c) => c.products.length > 0);
  }, [query]);

  const ids = useMemo(() => visible.map((c) => c.id), [visible]);
  const active = useScrollSpy(ids, 110);

  useEffect(() => {
    tabRefs.current[active]?.scrollIntoView({ inline: "center", block: "nearest" });
  }, [active]);

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <nav
        aria-label="Categories"
        className="sticky top-0 z-40 border-b border-white/10 bg-[#0c0a10]/90 backdrop-blur"
      >
        <div className="mx-auto flex max-w-2xl gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {visible.map((c) => (
            <button
              key={c.id}
              ref={(el) => {
                tabRefs.current[c.id] = el;
              }}
              onClick={() => goTo(c.id)}
              aria-current={active === c.id}
              className={`min-h-11 shrink-0 rounded-full border px-4 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300 ${
                active === c.id
                  ? "border-gold-400 bg-gold-400 text-white"
                  : "border-white/15 text-white/75 hover:border-gold-400/60 hover:text-white"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </nav>

      <main className="mx-auto max-w-2xl px-5 pb-32">
        {visible.length === 0 && (
          <p className="py-20 text-center text-white/60">{t.menu.noResults}</p>
        )}

        {visible.map((c) => (
          <section key={c.id} id={c.id} className="scroll-mt-16 pt-8">
            <div className="flex items-baseline justify-between gap-3 border-b-2 border-gold-400/60 pb-2">
              <h2 className="font-display text-2xl font-bold">{c.name}</h2>
              <span className="text-xs text-white/50">{t.qr.items(c.products.length)}</span>
            </div>
            <ul className="divide-y divide-white/10">
              {c.products.map((p) => (
                <ItemRow
                  key={p.name}
                  categoryId={c.id}
                  name={p.name}
                  price={p.price}
                  image={p.image}
                  onOpenPhoto={(image, name) => setLightbox({ image, name })}
                />
              ))}
            </ul>
          </section>
        ))}
      </main>

      {lightbox && (
        <div
          className="fixed inset-0 z-[80] grid place-items-center bg-black/90 p-4 backdrop-blur-sm sb-fade-in"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.name}
        >
          <button
            onClick={() => setLightbox(null)}
            aria-label="Close photo"
            className="absolute end-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            <X className="h-5 w-5" />
          </button>
          <div
            className="flex max-h-[90vh] max-w-xl flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.image}
              alt={lightbox.name}
              className="max-h-[75vh] w-auto rounded-2xl object-contain shadow-2xl"
            />
            <p className="font-display text-lg font-semibold text-white">{lightbox.name}</p>
          </div>
        </div>
      )}
    </>
  );
}
