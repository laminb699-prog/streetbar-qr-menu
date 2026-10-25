# Street Bar Crêpes — QR menu (second site)

Mobile menu page: language switch (FR / AR / EN), category tabs, search, cart, one WhatsApp order.
Uses the same menu (src/data.ts) and photos as streetbar.store.

## Run it
    npm install
    npm run dev

## Add real photos per item
Same system as the main site: save a photo named like `jus__banane.jpg` into
`src/assets/menu/items/`. Copy your existing `items` folder from the main project here.

## Deploy (separate Vercel project)
1. Put this folder in its own GitHub repo.
2. On Vercel: Add New > Project > pick that repo > Deploy.
3. Project Settings > Domains: add `menu.streetbar.store` (or any address you like).
4. Print the QR code for that address.

## Change prices or items
Edit `src/data.ts`.
