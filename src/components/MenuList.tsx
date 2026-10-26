import { useEffect, useMemo, useRef, useState } from "react";
import { Minus, Plus, X } from "lucide-react";
import { categories } from "../data";
import { useCart } from "../cart/CartContext";
import { useLanguage } from "../i18n/LanguageContext";
import { useScrollSpy, useBodyScrollLock } from "../hooks/useReveal";

type LightboxState = { image: string; name: string } | null;
type OpenPhoto = (image: string, name: string) => void;

function Qty({ itemKey, name, price, image }: { itemKey: string; name: string; price: number; image: string }) {
  const { addItem, setQuantity, quantityFor } = useCart();
  const { t } = useLanguage();
  const qty = quantityFor(itemKey);

  if (qty === 0) {
    return (
      <button
        onClick={() => addItem({ key: itemKey, name, price, image })}
        aria-label={`${t.menu.add}: ${name}`}
        className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-plum-600 text-white shadow-md transition-transform active:scale-95 hover:bg-plum-700"
      >
        <Plus className="h-5 w-5" />
      </button>
    );
  }
  return (
    <div className="flex shrink-0 items-center gap-1 rounded-full bg-plum-100 p-1">
      <button
        onClick={() => setQuantity(itemKey, qty - 1)}
        aria-label={`${name}: −`}
        className="grid h-8 w-8 place-items-center rounded-full bg-plum-600 text-white active:scale-95"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="w-6 text-center text-sm font-bold tabular-nums" aria-live="polite">
        {qty}
      </span>
      <button
        onClick={() => setQuantity(itemKey, qty + 1)}
        aria-label={`${name}: +`}
        className="grid h-8 w-8 place-items-center rounded-full bg-plum-600 text-white active:scale-95"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}

function PhotoCard({
  categoryId, name, price, image, onOpenPhoto,
}: { categoryId: string; name: string; price: number; image: string; onOpenPhoto: OpenPhoto }) {
  return (
    <li className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-[0_8px_24px_-12px_rgba(87,26,134,0.35)] ring-1 ring-plum-100">
      <button
        onClick={() => onOpenPhoto(image, name)}
        aria-label={`${name}: view photo`}
        className="relative block aspect-square w-full overflow-hidden bg-plum-100"
      >
        <img src={image} alt="" loading="lazy" className="h-full w-full object-cover" />
        <span className="absolute bottom-2 end-2 rounded-full bg-plum-700 px-3 py-1 text-sm font-bold text-white shadow">
          <bdi>{price} DH</bdi>
        </span>
      </button>
      <div className="flex flex-1 items-center justify-between gap-2 p-3">
        <p className="min-w-0 text-sm font-semibold leading-snug">{name}</p>
        <Qty itemKey={`${categoryId}__${name}`} name={name} price={price} image={image} />
      </div>
    </li>
  );
}

function ListRow({
  categoryId, name, price, image,
}: { categoryId: string; name: string; price: number; image: string }) {
  return (
    <li className="flex items-center gap-3 py-3">
      <div className="flex min-w-0 flex-1 items-baseline gap-2">
        <span className="text-[15px] font-semibold leading-snug">{name}</span>
        <span aria-hidden="true" className="min-w-4 flex-1 translate-y-[-3px] border-b-2 border-dotted border-plum-300" />
        <span className="shrink-0 font-bold text-plum-600">
          <bdi>{price} DH</bdi>
        </span>
      </div>
      <Qty itemKey={`${categoryId}__${name}`} name={name} price={price} image={image} />
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

  const splitName = (name: string) => {
    const parts = name.trim().split(/\s+/);
    if (parts.length < 2) return [name, ""];
    const half = Math.ceil(parts.length / 2);
    return [parts.slice(0, half).join(" "), parts.slice(half).join(" ")];
  };

  return (
    <>
      <nav aria-label="Categories" className="sticky top-0 z-40 border-b border-plum-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-2xl gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {visible.map((c) => (
            <button
              key={c.id}
              ref={(el) => {
                tabRefs.current[c.id] = el;
              }}
              onClick={() => goTo(c.id)}
              aria-current={active === c.id}
              className={`min-h-11 shrink-0 rounded-full px-4 text-sm font-semibold transition-colors ${
                active === c.id
                  ? "bg-plum-600 text-white"
                  : "bg-plum-50 text-plum-700 ring-1 ring-plum-200 hover:bg-plum-100"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </nav>

      <main className="mx-auto max-w-2xl px-4 pb-32">
        {visible.length === 0 && (
          <p className="py-20 text-center text-plum-700/70">{t.menu.noResults}</p>
        )}

        {visible.map((c) => {
          const [first, second] = splitName(c.name);
          const withPhoto = c.products.filter((p) => p.hasPhoto);
          const noPhoto = c.products.filter((p) => !p.hasPhoto);
          return (
            <section key={c.id} id={c.id} className="scroll-mt-16 pt-8">
              <div className="mb-4 flex items-end justify-between gap-3">
                <h2 className="font-display text-[1.75rem] uppercase leading-none">
                  <span className="text-plum-900">{first}</span>{" "}
                  <span className="text-plum-500">{second}</span>
                </h2>
                <span className="shrink-0 rounded-full bg-plum-100 px-3 py-1 text-xs font-semibold text-plum-700">
                  {t.menu.items(c.products.length)}
                </span>
              </div>

              {withPhoto.length > 0 && (
                <ul className="grid grid-cols-2 gap-3">
                  {withPhoto.map((p) => (
                    <PhotoCard
                      key={p.name}
                      categoryId={c.id}
                      name={p.name}
                      price={p.price}
                      image={p.image}
                      onOpenPhoto={(image, name) => setLightbox({ image, name })}
                    />
                  ))}
                </ul>
              )}

              {noPhoto.length > 0 && (
                <ul className={`rounded-3xl bg-white px-4 ring-1 ring-plum-100 ${withPhoto.length ? "mt-3" : ""} divide-y divide-plum-100`}>
                  {noPhoto.map((p) => (
                    <ListRow key={p.name} categoryId={c.id} name={p.name} price={p.price} image={p.image} />
                  ))}
                </ul>
              )}
            </section>
          );
        })}
      </main>

      {lightbox && (
        <div
          className="fixed inset-0 z-[80] grid place-items-center bg-plum-900/90 p-4 backdrop-blur-sm sb-fade-in"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.name}
        >
          <button
            onClick={() => setLightbox(null)}
            aria-label="Close photo"
            className="absolute end-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/20 text-white hover:bg-white/30"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="flex max-h-[90vh] max-w-xl flex-col items-center gap-4" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.image} alt={lightbox.name} className="max-h-[75vh] w-auto rounded-2xl object-contain shadow-2xl" />
            <p className="font-display text-lg text-white">{lightbox.name}</p>
          </div>
        </div>
      )}
    </>
  );
}
