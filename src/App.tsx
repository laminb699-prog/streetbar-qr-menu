import { useState } from "react";
import MenuHeader from "./components/MenuHeader";
import MenuList from "./components/MenuList";
import CartBar from "./components/CartBar";
import Cart from "./components/Cart";

export default function App() {
  const [query, setQuery] = useState("");

  return (
    <div className="min-h-screen bg-[#0c0a10] text-[#f5f5f5]">
      <MenuHeader query={query} onQueryChange={setQuery} />
      <MenuList query={query} />
      <CartBar />
      <Cart />
    </div>
  );
}
