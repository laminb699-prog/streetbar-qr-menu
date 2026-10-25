import { useEffect } from "react";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "../cart/CartContext";
import { useLanguage } from "../i18n/LanguageContext";
import { WHATSAPP_URL } from "../data";
import { useBodyScrollLock } from "../hooks/useReveal";

function buildOrderMessage(
  items: { name: string; price: number; quantity: number }[],
  total: number
) {
  const lines = items.map(
    (i) => `• ${i.name} x${i.quantity} — ${i.price * i.quantity} MAD`
  );
  const text = [
    "Hello Street Bar! I'd like to order:",
    "",
    ...lines,
    "",
    `Total: ${total} MAD`,
  ].join("\n");
  return `${WHATSAPP_URL}?text=${encodeURIComponent(text)}`;
}

export default function Cart() {
  const { items, removeItem, setQuantity, clearCart, totalPrice, isOpen, closeCart } =
    useCart();
  const { t, dir } = useLanguage();

  useBodyScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[70] bg-ink-950/70 backdrop-blur-sm sb-fade-in"
      onClick={closeCart}
      role="dialog"
      aria-modal="true"
      aria-label={t.cart.title}
    >
      <div
        className={`sb-surface absolute top-0 h-full w-full max-w-md overflow-y-auto border-white/10 shadow-2xl ${
          dir === "rtl" ? "left-0 border-r" : "right-0 border-l"
        }`}
        style={{
          animation: `${dir === "rtl" ? "sb-slide-in-left" : "sb-slide-in-right"} 0.3s ease-out`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b sb-border px-5 py-5">
          <h2 className="font-display text-xl font-bold">{t.cart.title}</h2>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="grid h-9 w-9 place-items-center rounded-full border sb-border sb-muted hover:text-gold-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center gap-3 px-6 py-20 text-center">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-gold-400/10 text-gold-300">
              <ShoppingBag className="h-7 w-7" />
            </div>
            <p className="font-display text-lg font-semibold">{t.cart.empty}</p>
            <p className="text-sm sb-muted">{t.cart.emptyHint}</p>
            <button
              onClick={closeCart}
              className="mt-2 rounded-full border sb-border px-5 py-2.5 text-sm font-semibold hover:border-gold-400/50 hover:text-gold-200"
            >
              {t.cart.continueBrowsing}
            </button>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4 px-5 py-5">
              {items.map((item) => (
                <div
                  key={item.key}
                  className="flex items-center gap-3 rounded-xl border sb-border p-3"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 shrink-0 rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{item.name}</p>
                    <p className="mt-0.5 text-xs sb-muted"><bdi>{item.price} MAD</bdi></p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={() => setQuantity(item.key, item.quantity - 1)}
                        aria-label="Decrease quantity"
                        className="grid h-7 w-7 place-items-center rounded-full border sb-border hover:border-gold-400/50 hover:text-gold-200"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-5 text-center text-sm font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(item.key, item.quantity + 1)}
                        aria-label="Increase quantity"
                        className="grid h-7 w-7 place-items-center rounded-full border sb-border hover:border-gold-400/50 hover:text-gold-200"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span dir="ltr" className="text-sm font-semibold text-gold-300">
                      {item.price * item.quantity} MAD
                    </span>
                    <button
                      onClick={() => removeItem(item.key)}
                      aria-label={t.cart.remove}
                      className="grid h-7 w-7 place-items-center rounded-full sb-muted hover:text-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={clearCart}
                className="self-start text-xs sb-muted underline hover:text-gold-300"
              >
                {t.cart.clearCart}
              </button>
            </div>

            <div className="sticky bottom-0 border-t sb-border sb-surface px-5 py-5">
              <div className="flex items-center justify-between text-base font-semibold">
                <span>{t.cart.subtotal}</span>
                <span dir="ltr" className="sb-text-gold text-lg">{totalPrice} MAD</span>
              </div>
              <a
                href={buildOrderMessage(items, totalPrice)}
                target="_blank"
                rel="noopener noreferrer"
                className="sb-btn-gold mt-4 flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold"
              >
                {t.cart.checkoutWhatsapp}
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
