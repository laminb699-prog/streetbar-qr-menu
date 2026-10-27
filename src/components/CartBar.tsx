import { ShoppingBag } from "lucide-react";
import { useCart } from "../cart/CartContext";
import { useLanguage } from "../i18n/LanguageContext";

export default function CartBar() {
  const { totalItems, totalPrice, openCart, isOpen } = useCart();
  const { t } = useLanguage();

  if (totalItems === 0 || isOpen) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 px-4 pt-3"
      style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
    >
      <button
        onClick={openCart}
        className="mx-auto flex min-h-14 w-full max-w-2xl items-center justify-between gap-3 rounded-full bg-plum-600 px-5 text-white shadow-[0_14px_40px_-10px_rgba(0,0,0,0.8)] transition-transform active:scale-[0.98] hover:bg-plum-700"
      >
        <span className="flex items-center gap-3 font-semibold">
          <span className="relative grid h-9 w-9 place-items-center rounded-full bg-white/20">
            <ShoppingBag className="h-5 w-5" aria-hidden="true" />
            <span className="absolute -end-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-white px-1 text-[11px] font-bold text-plum-700">
              {totalItems}
            </span>
          </span>
          {t.cart.viewOrder}
        </span>
        <span className="font-bold tabular-nums"><bdi>{totalPrice} DH</bdi></span>
      </button>
    </div>
  );
}
