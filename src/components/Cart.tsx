import { useEffect, useState } from "react";
import { Bike, MapPin, Minus, Plus, ShoppingBag, Store, Trash2, X } from "lucide-react";
import { useCart } from "../cart/CartContext";
import { useLanguage } from "../i18n/LanguageContext";
import { DELIVERY_FEE, WHATSAPP_URL } from "../data";
import { useBodyScrollLock } from "../hooks/useReveal";

type Mode = "pickup" | "delivery";

function buildOrderMessage(
  items: { name: string; price: number; quantity: number }[],
  subtotal: number,
  mode: Mode,
  info: { name: string; address: string; notes: string; mapsLink: string }
) {
  const fee = mode === "delivery" ? DELIVERY_FEE : 0;
  const lines = items.map((i) => `• ${i.name} x${i.quantity} — ${i.price * i.quantity} DH`);
  const text = [
    "Bonjour Street Bar Crêpes ! Je souhaite commander :",
    "",
    ...lines,
    "",
    `Sous-total : ${subtotal} DH`,
    ...(mode === "delivery" && fee > 0 ? [`Livraison : ${fee} DH`] : []),
    `Total : ${subtotal + fee} DH`,
    "",
    mode === "delivery" ? "🛵 LIVRAISON" : "🏪 Sur place / à emporter",
    ...(mode === "delivery"
      ? [
          `Nom : ${info.name.trim()}`,
          `Adresse : ${info.address.trim()}`,
          ...(info.notes.trim() ? [`Remarque : ${info.notes.trim()}`] : []),
          ...(info.mapsLink ? [`Position : ${info.mapsLink}`] : []),
        ]
      : []),
  ].join("\n");
  return `${WHATSAPP_URL}?text=${encodeURIComponent(text)}`;
}

export default function Cart() {
  const { items, removeItem, setQuantity, clearCart, totalPrice, isOpen, closeCart } = useCart();
  const { t, dir } = useLanguage();

  const [mode, setMode] = useState<Mode>("pickup");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [mapsLink, setMapsLink] = useState("");
  const [locMsg, setLocMsg] = useState("");
  const [triedSend, setTriedSend] = useState(false);

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

  const fee = mode === "delivery" ? DELIVERY_FEE : 0;
  const total = totalPrice + fee;
  const missing = mode === "delivery" && (!name.trim() || !address.trim());

  const shareLocation = () => {
    if (!navigator.geolocation) {
      setLocMsg(t.delivery.locationError);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setMapsLink(`https://maps.google.com/?q=${pos.coords.latitude},${pos.coords.longitude}`);
        setLocMsg(t.delivery.locationAdded);
      },
      () => setLocMsg(t.delivery.locationError),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const inputCls =
    "w-full rounded-2xl border border-plum-200 bg-white px-4 py-3 text-base text-plum-900 outline-none placeholder:text-plum-300 focus:border-plum-500";

  const modeBtn = (m: Mode, Icon: typeof Store, title: string, hint: string) => (
    <button
      type="button"
      onClick={() => setMode(m)}
      aria-pressed={mode === m}
      className={`flex flex-col items-start gap-1 rounded-2xl border-2 p-3 text-start transition-colors ${
        mode === m ? "border-plum-600 bg-plum-100" : "border-plum-100 bg-white hover:border-plum-300"
      }`}
    >
      <span className="flex items-center gap-2 text-sm font-bold">
        <Icon className="h-4 w-4 text-plum-600" aria-hidden="true" />
        {title}
      </span>
      <span className="text-xs text-plum-700/75">{hint}</span>
    </button>
  );

  return (
    <div
      className="fixed inset-0 z-[70] bg-plum-900/60 backdrop-blur-sm sb-fade-in"
      onClick={closeCart}
      role="dialog"
      aria-modal="true"
      aria-label={t.cart.title}
    >
      <div
        className={`absolute top-0 flex h-full w-full max-w-md flex-col bg-plum-50 text-plum-900 shadow-2xl ${
          dir === "rtl" ? "left-0" : "right-0"
        }`}
        style={{
          animation: `${dir === "rtl" ? "sb-slide-in-left" : "sb-slide-in-right"} 0.3s ease-out`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between bg-plum-600 px-5 py-4 text-white">
          <h2 className="font-display text-xl uppercase">{t.cart.title}</h2>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="grid h-10 w-10 place-items-center rounded-full bg-white/15 hover:bg-white/25"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center gap-3 px-6 py-20 text-center">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-plum-100 text-plum-600">
              <ShoppingBag className="h-7 w-7" />
            </div>
            <p className="font-display text-lg">{t.cart.empty}</p>
            <p className="text-sm text-plum-700/75">{t.cart.emptyHint}</p>
            <button
              onClick={closeCart}
              className="mt-2 rounded-full bg-plum-600 px-6 py-3 text-sm font-semibold text-white hover:bg-plum-700"
            >
              {t.cart.continueBrowsing}
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-5">
              <div className="flex flex-col gap-3">
                {items.map((item) => (
                  <div key={item.key} className="flex items-center gap-3 rounded-2xl bg-white p-3 ring-1 ring-plum-100">
                    <img src={item.image} alt="" className="h-14 w-14 shrink-0 rounded-xl object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{item.name}</p>
                      <p className="text-xs text-plum-700/75"><bdi>{item.price} DH</bdi></p>
                      <div className="mt-1.5 flex items-center gap-2">
                        <button
                          onClick={() => setQuantity(item.key, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="grid h-8 w-8 place-items-center rounded-full bg-plum-100 text-plum-700"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-5 text-center text-sm font-bold">{item.quantity}</span>
                        <button
                          onClick={() => setQuantity(item.key, item.quantity + 1)}
                          aria-label="Increase quantity"
                          className="grid h-8 w-8 place-items-center rounded-full bg-plum-600 text-white"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-sm font-bold text-plum-600"><bdi>{item.price * item.quantity} DH</bdi></span>
                      <button
                        onClick={() => removeItem(item.key)}
                        aria-label={t.cart.remove}
                        className="grid h-8 w-8 place-items-center rounded-full text-plum-400 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={clearCart} className="mt-3 text-xs text-plum-600 underline">
                {t.cart.clearCart}
              </button>

              <p className="mt-6 text-sm font-bold">{t.delivery.question}</p>
              <div className="mt-2 grid grid-cols-2 gap-3">
                {modeBtn("pickup", Store, t.delivery.pickup, t.delivery.pickupHint)}
                {modeBtn("delivery", Bike, t.delivery.delivery, t.delivery.deliveryHint)}
              </div>

              {mode === "delivery" && (
                <div className="mt-4 flex flex-col gap-3">
                  <label className="block text-sm font-semibold">
                    {t.delivery.name}
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t.delivery.namePlaceholder}
                      autoComplete="name"
                      className={`${inputCls} mt-1 font-normal`}
                    />
                  </label>
                  <label className="block text-sm font-semibold">
                    {t.delivery.address}
                    <input
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder={t.delivery.addressPlaceholder}
                      autoComplete="street-address"
                      className={`${inputCls} mt-1 font-normal`}
                    />
                  </label>
                  <label className="block text-sm font-semibold">
                    {t.delivery.notes}
                    <input
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={t.delivery.notesPlaceholder}
                      className={`${inputCls} mt-1 font-normal`}
                    />
                  </label>
                  <button
                    type="button"
                    onClick={shareLocation}
                    className="flex items-center justify-center gap-2 rounded-full border-2 border-plum-600 px-4 py-2.5 text-sm font-semibold text-plum-700 hover:bg-plum-100"
                  >
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                    {t.delivery.shareLocation}
                  </button>
                  {locMsg && <p className="text-xs text-plum-700" role="status">{locMsg}</p>}
                  <p className="text-xs text-plum-700/75">{t.delivery.feeNote}</p>
                  {triedSend && missing && (
                    <p className="text-sm font-semibold text-red-600" role="alert">{t.delivery.required}</p>
                  )}
                </div>
              )}
            </div>

            <div className="border-t border-plum-100 bg-white px-5 py-4">
              <div className="flex items-center justify-between text-sm">
                <span>{t.cart.subtotal}</span>
                <bdi>{totalPrice} DH</bdi>
              </div>
              {mode === "delivery" && DELIVERY_FEE > 0 && (
                <div className="mt-1 flex items-center justify-between text-sm">
                  <span>{t.cart.deliveryFee}</span>
                  <bdi>{DELIVERY_FEE} DH</bdi>
                </div>
              )}
              <div className="mt-1 flex items-center justify-between text-lg font-bold">
                <span>{t.cart.total}</span>
                <span className="text-plum-600"><bdi>{total} DH</bdi></span>
              </div>
              <a
                href={missing ? undefined : buildOrderMessage(items, totalPrice, mode, { name, address, notes, mapsLink })}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (missing) {
                    e.preventDefault();
                    setTriedSend(true);
                  }
                }}
                className="mt-3 flex items-center justify-center gap-2 rounded-full bg-[#25D366] py-3.5 text-sm font-bold text-white shadow-md hover:brightness-95"
              >
                {t.cart.send}
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
