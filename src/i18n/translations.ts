export type Lang = "en" | "fr" | "ar";

export const languageNames: Record<Lang, string> = {
  en: "English",
  fr: "Français",
  ar: "العربية",
};

export type TranslationDict = {
  header: {
    tagline: string;
    hours: string;
    call: string;
    searchPlaceholder: string;
  };
  menu: {
    items: (n: number) => string;
    noResults: string;
    add: string;
    viewPhoto: string;
  };
  cart: {
    title: string;
    viewOrder: string;
    empty: string;
    emptyHint: string;
    continueBrowsing: string;
    clearCart: string;
    remove: string;
    subtotal: string;
    deliveryFee: string;
    total: string;
    send: string;
  };
  delivery: {
    question: string;
    pickup: string;
    pickupHint: string;
    delivery: string;
    deliveryHint: string;
    name: string;
    namePlaceholder: string;
    address: string;
    addressPlaceholder: string;
    notes: string;
    notesPlaceholder: string;
    shareLocation: string;
    locationAdded: string;
    locationError: string;
    feeNote: string;
    required: string;
  };
};

export const translations: Record<Lang, TranslationDict> = {
  fr: {
    header: {
      tagline:
        "Crêpes, bubble waffles, shakes et boissons maison. Touchez une photo pour la voir en grand.",
      hours: "Ouvert tous les jours · 17h30 – 03h00",
      call: "Appeler",
      searchPlaceholder: "Rechercher une crêpe, un shake…",
    },
    menu: {
      items: (n) => (n === 1 ? "1 article" : `${n} articles`),
      noResults: "Aucun article trouvé. Essayez une autre recherche.",
      add: "Ajouter",
      viewPhoto: "voir la photo",
    },
    cart: {
      title: "Votre commande",
      viewOrder: "Voir la commande",
      empty: "Votre panier est vide",
      emptyHint: "Ajoutez des articles depuis le menu.",
      continueBrowsing: "Retour au menu",
      clearCart: "Vider le panier",
      remove: "Retirer",
      subtotal: "Sous-total",
      deliveryFee: "Frais de livraison",
      total: "Total",
      send: "Envoyer la commande sur WhatsApp",
    },
    delivery: {
      question: "Comment souhaitez-vous recevoir votre commande ?",
      pickup: "Sur place / à emporter",
      pickupHint: "Vous passez la récupérer chez nous.",
      delivery: "Livraison",
      deliveryHint: "Un livreur vous l'apporte.",
      name: "Votre nom",
      namePlaceholder: "Nom et prénom",
      address: "Adresse de livraison",
      addressPlaceholder: "Quartier, rue, repère…",
      notes: "Remarque (facultatif)",
      notesPlaceholder: "Étage, sonnette, précisions…",
      shareLocation: "Partager ma position",
      locationAdded: "Position ajoutée",
      locationError: "Position indisponible. Écrivez votre adresse.",
      feeNote: "Les frais de livraison sont confirmés sur WhatsApp.",
      required: "Le nom et l'adresse sont obligatoires pour la livraison.",
    },
  },
  en: {
    header: {
      tagline:
        "Crêpes, bubble waffles, shakes and homemade drinks. Tap a photo to see it larger.",
      hours: "Open every day · 5:30 PM – 3:00 AM",
      call: "Call",
      searchPlaceholder: "Search a crêpe, a shake…",
    },
    menu: {
      items: (n) => (n === 1 ? "1 item" : `${n} items`),
      noResults: "No items found. Try a different search.",
      add: "Add",
      viewPhoto: "view photo",
    },
    cart: {
      title: "Your order",
      viewOrder: "View order",
      empty: "Your cart is empty",
      emptyHint: "Add items from the menu.",
      continueBrowsing: "Back to menu",
      clearCart: "Clear cart",
      remove: "Remove",
      subtotal: "Subtotal",
      deliveryFee: "Delivery fee",
      total: "Total",
      send: "Send order on WhatsApp",
    },
    delivery: {
      question: "How would you like to receive your order?",
      pickup: "Dine in / take away",
      pickupHint: "You pick it up at our place.",
      delivery: "Delivery",
      deliveryHint: "A rider brings it to you.",
      name: "Your name",
      namePlaceholder: "Full name",
      address: "Delivery address",
      addressPlaceholder: "Area, street, landmark…",
      notes: "Note (optional)",
      notesPlaceholder: "Floor, doorbell, details…",
      shareLocation: "Share my location",
      locationAdded: "Location added",
      locationError: "Location unavailable. Please type your address.",
      feeNote: "The delivery fee is confirmed on WhatsApp.",
      required: "Name and address are required for delivery.",
    },
  },
  ar: {
    header: {
      tagline:
        "كريب، بابل وافل، ميلك شيك ومشروبات منزلية. اضغط على أي صورة لرؤيتها بشكل أكبر.",
      hours: "مفتوح كل يوم · 5:30 م – 3:00 ص",
      call: "اتصل",
      searchPlaceholder: "ابحث عن كريب أو شيك…",
    },
    menu: {
      items: (n) => `${n} منتجات`,
      noResults: "لم يتم العثور على منتجات. جرّب بحثاً آخر.",
      add: "إضافة",
      viewPhoto: "عرض الصورة",
    },
    cart: {
      title: "طلبك",
      viewOrder: "عرض الطلب",
      empty: "سلتك فارغة",
      emptyHint: "أضف منتجات من القائمة.",
      continueBrowsing: "العودة للقائمة",
      clearCart: "إفراغ السلة",
      remove: "إزالة",
      subtotal: "المجموع الفرعي",
      deliveryFee: "رسوم التوصيل",
      total: "المجموع",
      send: "إرسال الطلب عبر واتساب",
    },
    delivery: {
      question: "كيف تريد استلام طلبك؟",
      pickup: "في المحل / للأخذ",
      pickupHint: "تمر لاستلامه من عندنا.",
      delivery: "توصيل",
      deliveryHint: "يوصله لك عامل التوصيل.",
      name: "اسمك",
      namePlaceholder: "الاسم الكامل",
      address: "عنوان التوصيل",
      addressPlaceholder: "الحي، الشارع، معلمة قريبة…",
      notes: "ملاحظة (اختياري)",
      notesPlaceholder: "الطابق، الجرس، تفاصيل…",
      shareLocation: "مشاركة موقعي",
      locationAdded: "تمت إضافة الموقع",
      locationError: "الموقع غير متاح. اكتب عنوانك.",
      feeNote: "تُؤكَّد رسوم التوصيل عبر واتساب.",
      required: "الاسم والعنوان مطلوبان للتوصيل.",
    },
  },
};
