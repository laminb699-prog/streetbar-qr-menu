export type Lang = "en" | "fr" | "ar";

export const languageNames: Record<Lang, string> = {
  en: "English",
  fr: "Français",
  ar: "العربية",
};

export type TranslationDict = {
  nav: {
    home: string;
    menu: string;
    about: string;
    gallery: string;
    contact: string;
    orderNow: string;
  };
  hero: {
    badge: string;
    tagline: string;
    description: string;
    orderWhatsapp: string;
    viewMenu: string;
  };
  about: {
    eyebrow: string;
    title1: string;
    titleGold: string;
    title2: string;
    description: string;
    freshDaily: string;
    items: string[];
  };
  menu: {
    eyebrow: string;
    title1: string;
    titleGold: string;
    description: string;
    searchPlaceholder: string;
    all: string;
    viewItems: (n: number) => string;
    noResults: string;
    order: string;
  };
  gallery: {
    eyebrow: string;
    title1: string;
    titleGold: string;
    description: string;
  };
  contact: {
    eyebrow: string;
    title1: string;
    titleGold: string;
    location: string;
    phone: string;
    whatsapp: string;
    openingHours: string;
    everyDay: string;
  };
  footer: {
    description: string;
    contact: string;
    followUs: string;
    orderNow: string;
    rights: string;
  };
  order: {
    eyebrow: string;
    title1: string;
    titleGold: string;
    description: string;
    orderWhatsapp: string;
  };
  loader: {
    brand: string;
  };
  cart: {
    title: string;
    empty: string;
    emptyHint: string;
    addToCart: string;
    added: string;
    remove: string;
    subtotal: string;
    checkoutWhatsapp: string;
    clearCart: string;
    itemsCount: (n: number) => string;
    continueBrowsing: string;
  };
  qr: {
    menuTitle: string;
    tagline: string;
    viewOrder: string;
    hours: string;
    call: string;
    items: (n: number) => string;
  };
};

export const translations: Record<Lang, TranslationDict> = {
  en: {
    nav: {
      home: "Home",
      menu: "Menu",
      about: "About",
      gallery: "Gallery",
      contact: "Contact",
      orderNow: "Order Now",
    },
    hero: {
      badge: "DAKHLA • MOROCCO",
      tagline: "FOOD • DRINKS • SWEET",
      description:
        "Fresh drinks, delicious crêpes, pancakes, waffles and premium desserts — crafted fresh every day with quality ingredients.",
      orderWhatsapp: "Order on WhatsApp",
      viewMenu: "View Menu",
    },
    about: {
      eyebrow: "OUR STORY",
      title1: "A taste of",
      titleGold: "luxury",
      title2: "in every bite",
      description:
        "At Street Bar, we believe dessert is an experience. From silky premium crêpes and crisp bubble waffles to thick milkshakes, fresh juices, virgin mojitos, rich coffee, and indulgent ice cream — everything is prepared fresh every day using only quality ingredients.",
      freshDaily: "Fresh Daily",
      items: [
        "Premium Crêpes",
        "Bubble Waffles",
        "Milkshakes",
        "Fresh Juices",
        "Virgin Mojitos",
        "Coffee",
        "Desserts",
        "Ice Cream",
        "Pancakes",
      ],
    },
    menu: {
      eyebrow: "OUR MENU",
      title1: "Explore our",
      titleGold: "delights",
      description:
        "Browse by category or search for your favourite treat. Tap a category to see every product and order straight to WhatsApp.",
      searchPlaceholder: "Search crêpes, milkshakes, mojitos…",
      all: "All",
      viewItems: (n: number) => `View ${n} items`,
      noResults: "No products found. Try a different search.",
      order: "Order",
    },
    gallery: {
      eyebrow: "GALLERY",
      title1: "A feast for the",
      titleGold: "eyes",
      description: "Tap any photo to view it full screen.",
    },
    contact: {
      eyebrow: "CONTACT",
      title1: "Come",
      titleGold: "visit us",
      location: "Our Location",
      phone: "Phone",
      whatsapp: "WhatsApp",
      openingHours: "Opening Hours",
      everyDay: "Every day",
    },
    footer: {
      description:
        "Fresh drinks, delicious crêpes, pancakes, waffles and premium desserts — crafted with love in Dakhla, Morocco.",
      contact: "CONTACT",
      followUs: "FOLLOW US",
      orderNow: "Order Now",
      rights: "All rights reserved.",
    },
    order: {
      eyebrow: "ORDER NOW",
      title1: "Hungry?",
      titleGold: "Let's fix that.",
      description:
        "Send us a message on WhatsApp and we'll prepare your order fresh. Quick, easy, and delicious.",
      orderWhatsapp: "Order on WhatsApp",
    },
    loader: {
      brand: "STREET BAR",
    },
    cart: {
      title: "Your Order",
      empty: "Your cart is empty",
      emptyHint: "Browse the menu and add items you'd like to order.",
      addToCart: "Add",
      added: "Added",
      remove: "Remove",
      subtotal: "Total",
      checkoutWhatsapp: "Send order on WhatsApp",
      clearCart: "Clear cart",
      itemsCount: (n: number) => (n === 1 ? "1 item" : `${n} items`),
      continueBrowsing: "Continue browsing",
    },
    qr: {
      menuTitle: "Menu",
      tagline: "Pick your treats, send one order on WhatsApp",
      viewOrder: "View order",
      hours: "Open every day · 5:30 PM – 3:00 AM",
      call: "Call",
      items: (n: number) => (n === 1 ? "1 item" : `${n} items`),
    },
  },
  fr: {
    nav: {
      home: "Accueil",
      menu: "Menu",
      about: "À propos",
      gallery: "Galerie",
      contact: "Contact",
      orderNow: "Commander",
    },
    hero: {
      badge: "DAKHLA • MAROC",
      tagline: "FOOD • DRINKS • SWEET",
      description:
        "Boissons fraîches, crêpes délicieuses, pancakes, gaufres et desserts premium — préparés chaque jour avec des ingrédients de qualité.",
      orderWhatsapp: "Commander sur WhatsApp",
      viewMenu: "Voir le menu",
    },
    about: {
      eyebrow: "NOTRE HISTOIRE",
      title1: "Un goût de",
      titleGold: "luxe",
      title2: "à chaque bouchée",
      description:
        "Chez Street Bar, le dessert est une expérience. Des crêpes premium soyeuses et des bubble waffles croustillantes aux milkshakes onctueux, jus frais, mojitos sans alcool, café riche et glaces gourmandes — tout est préparé frais chaque jour avec des ingrédients de qualité.",
      freshDaily: "Frais chaque jour",
      items: [
        "Crêpes Premium",
        "Bubble Waffles",
        "Milkshakes",
        "Jus Frais",
        "Mojitos Sans Alcool",
        "Café",
        "Desserts",
        "Glaces",
        "Pancakes",
      ],
    },
    menu: {
      eyebrow: "NOTRE MENU",
      title1: "Découvrez nos",
      titleGold: "délices",
      description:
        "Parcourez par catégorie ou recherchez votre gourmandise préférée. Touchez une catégorie pour voir tous les produits et commander directement sur WhatsApp.",
      searchPlaceholder: "Rechercher crêpes, milkshakes, mojitos…",
      all: "Tout",
      viewItems: (n: number) => `Voir ${n} articles`,
      noResults: "Aucun produit trouvé. Essayez une autre recherche.",
      order: "Commander",
    },
    gallery: {
      eyebrow: "GALERIE",
      title1: "Un régal pour les",
      titleGold: "yeux",
      description: "Touchez une photo pour l'afficher en plein écran.",
    },
    contact: {
      eyebrow: "CONTACT",
      title1: "Venez",
      titleGold: "nous rendre visite",
      location: "Notre adresse",
      phone: "Téléphone",
      whatsapp: "WhatsApp",
      openingHours: "Horaires d'ouverture",
      everyDay: "Tous les jours",
    },
    footer: {
      description:
        "Boissons fraîches, crêpes délicieuses, pancakes, gaufres et desserts premium — préparés avec amour à Dakhla, Maroc.",
      contact: "CONTACT",
      followUs: "SUIVEZ-NOUS",
      orderNow: "Commander",
      rights: "Tous droits réservés.",
    },
    order: {
      eyebrow: "COMMANDER",
      title1: "Une petite faim ?",
      titleGold: "On s'en occupe.",
      description:
        "Envoyez-nous un message sur WhatsApp et nous préparons votre commande fraîche. Rapide, simple et délicieux.",
      orderWhatsapp: "Commander sur WhatsApp",
    },
    loader: {
      brand: "STREET BAR",
    },
    cart: {
      title: "Votre commande",
      empty: "Votre panier est vide",
      emptyHint: "Parcourez le menu et ajoutez les articles souhaités.",
      addToCart: "Ajouter",
      added: "Ajouté",
      remove: "Retirer",
      subtotal: "Total",
      checkoutWhatsapp: "Envoyer la commande sur WhatsApp",
      clearCart: "Vider le panier",
      itemsCount: (n: number) => (n === 1 ? "1 article" : `${n} articles`),
      continueBrowsing: "Continuer mes achats",
    },
    qr: {
      menuTitle: "Menu",
      tagline: "Choisissez, puis envoyez une seule commande sur WhatsApp",
      viewOrder: "Voir la commande",
      hours: "Ouvert tous les jours · 17h30 – 03h00",
      call: "Appeler",
      items: (n: number) => (n === 1 ? "1 article" : `${n} articles`),
    },
  },
  ar: {
    nav: {
      home: "الرئيسية",
      menu: "القائمة",
      about: "من نحن",
      gallery: "معرض الصور",
      contact: "اتصل بنا",
      orderNow: "اطلب الآن",
    },
    hero: {
      badge: "الداخلة • المغرب",
      tagline: "أكل • مشروبات • حلويات",
      description:
        "مشروبات منعشة، كريب لذيذ، بان كيك، وافل وحلويات فاخرة — تُحضّر طازجة كل يوم بمكونات عالية الجودة.",
      orderWhatsapp: "اطلب عبر واتساب",
      viewMenu: "شاهد القائمة",
    },
    about: {
      eyebrow: "قصتنا",
      title1: "طعم من",
      titleGold: "الفخامة",
      title2: "في كل قضمة",
      description:
        "في ستريت بار، الحلوى تجربة حقيقية. من الكريب الفاخر الناعم وبابل وافل المقرمش إلى الميلك شيك الكثيف، العصائر الطازجة، الموخيتو بدون كحول، القهوة الغنية، والآيس كريم اللذيذ — كل شيء يُحضّر طازجاً كل يوم بمكونات عالية الجودة فقط.",
      freshDaily: "طازج يومياً",
      items: [
        "كريب فاخر",
        "بابل وافل",
        "ميلك شيك",
        "عصائر طازجة",
        "موخيتو بدون كحول",
        "قهوة",
        "حلويات",
        "آيس كريم",
        "بان كيك",
      ],
    },
    menu: {
      eyebrow: "قائمتنا",
      title1: "اكتشف",
      titleGold: "ألذّ الأصناف",
      description:
        "تصفح حسب الفئة أو ابحث عن طبقك المفضل. اضغط على أي فئة لرؤية كل المنتجات والطلب مباشرة عبر واتساب.",
      searchPlaceholder: "ابحث عن كريب، ميلك شيك، موخيتو…",
      all: "الكل",
      viewItems: (n: number) => `عرض ${n} منتجات`,
      noResults: "لم يتم العثور على منتجات. جرّب بحثاً آخر.",
      order: "اطلب",
    },
    gallery: {
      eyebrow: "معرض الصور",
      title1: "متعة",
      titleGold: "للعين",
      description: "اضغط على أي صورة لعرضها بملء الشاشة.",
    },
    contact: {
      eyebrow: "اتصل بنا",
      title1: "تعال",
      titleGold: "لزيارتنا",
      location: "موقعنا",
      phone: "الهاتف",
      whatsapp: "واتساب",
      openingHours: "ساعات العمل",
      everyDay: "كل يوم",
    },
    footer: {
      description:
        "مشروبات منعشة، كريب لذيذ، بان كيك، وافل وحلويات فاخرة — تُحضّر بحب في الداخلة، المغرب.",
      contact: "اتصل بنا",
      followUs: "تابعنا",
      orderNow: "اطلب الآن",
      rights: "جميع الحقوق محفوظة.",
    },
    order: {
      eyebrow: "اطلب الآن",
      title1: "جوعان؟",
      titleGold: "خلينا نحل الموضوع.",
      description:
        "أرسل لنا رسالة عبر واتساب وسنحضّر طلبك طازجاً. سريع، سهل، ولذيذ.",
      orderWhatsapp: "اطلب عبر واتساب",
    },
    loader: {
      brand: "ستريت بار",
    },
    cart: {
      title: "طلبك",
      empty: "سلتك فارغة",
      emptyHint: "تصفح القائمة وأضف ما ترغب في طلبه.",
      addToCart: "إضافة",
      added: "تمت الإضافة",
      remove: "إزالة",
      subtotal: "المجموع",
      checkoutWhatsapp: "إرسال الطلب عبر واتساب",
      clearCart: "إفراغ السلة",
      itemsCount: (n: number) => `${n} منتجات`,
      continueBrowsing: "متابعة التصفح",
    },
    qr: {
      menuTitle: "القائمة",
      tagline: "اختر ما يعجبك وأرسل طلباً واحداً عبر واتساب",
      viewOrder: "عرض الطلب",
      hours: "مفتوح كل يوم · 5:30 م – 3:00 ص",
      call: "اتصل",
      items: (n: number) => `${n} منتجات`,
    },
  },
};
