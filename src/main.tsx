import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/archivo-black/400.css';
import '@fontsource/outfit/400.css';
import '@fontsource/outfit/500.css';
import '@fontsource/outfit/600.css';
import '@fontsource/cairo/400.css';
import '@fontsource/cairo/600.css';
import './index.css';
import App from './App.tsx';
import { LanguageProvider } from './i18n/LanguageContext';
import { CartProvider } from './cart/CartContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </LanguageProvider>
  </StrictMode>
);
