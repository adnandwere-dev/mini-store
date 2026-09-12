"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function AddToCartButton({ product }) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart(product)}
      className="flex-1 inline-flex items-center justify-center gap-2 bg-linear-to-r from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 dark:hover:from-blue-700 dark:hover:to-purple-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
    >
      <ShoppingCart size={18} aria-hidden="true" />
      Add to Cart
    </button>
  );
}
